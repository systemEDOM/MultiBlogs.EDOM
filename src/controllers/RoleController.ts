import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import TYPES from '../types';

import { RoleRepositoryInterface } from '../repository/Role/RoleRepositoryInterface';
import { RoleService } from '../services/RoleService/RoleService';

@controller("/roles")
export class RoleController extends BaseHttpController {
    private roleRepo: RoleRepositoryInterface;
    private roleService: RoleService;

    constructor(@inject(TYPES.RoleRepositoryInterface) roleRepo: RoleRepositoryInterface,
                @inject(TYPES.RoleService) roleService: RoleService) {
        super();
        this.roleRepo = roleRepo;
        this.roleService = roleService;
    }

    @httpGet("/", TYPES.AuthMiddleware)
    public async index (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domains = await this.roleService.findAll();
            res.status(200).send(domains);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware)
    public async store (@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.permissions = req.body.permissions.split(',');
            const permission = await this.roleService.create(req.body);
            res.status(200).send(permission);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware)
    public async show (@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.roleService.findById(Number(req.params.id));
            res.status(200).send(permission);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware)
    public async update (@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.permissions = req.body.permissions.split(',');
            const permission = await this.roleService.update(Number(req.params.id), req.body)
            res.status(200).send(permission);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware)
    public async destroy (@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.roleService.delete(Number(req.params.id));
            res.status(200).send(permission);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}