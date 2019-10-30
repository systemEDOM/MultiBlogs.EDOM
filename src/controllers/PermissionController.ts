import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import TYPES from '../types';

import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import container from '../inversify.config';
import { PermissionRepositoryInterface } from '../repository/Permission/PermissionRepositoryInterface';
import { PermissionService } from '../services/PermissionService/PermissionService';

@controller("/permissions")
export class PermissionController extends BaseHttpController {
    private permissionRepo: PermissionRepositoryInterface;
    private permissionService: PermissionService;

    constructor(@inject(TYPES.PermissionRepositoryInterface) permissionRepo: PermissionRepositoryInterface,
                @inject(TYPES.PermissionService) permissionService: PermissionService) {
        super();
        this.permissionRepo = permissionRepo;
        this.permissionService = permissionService;
    }

    @httpGet("/", TYPES.AuthMiddleware)
    public async index (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domains = await this.permissionService.findAll();
            res.status(200).send(domains);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware)
    public async store (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.permissionService.create(req.body);
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware)
    public async show (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.permissionService.findById(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware)
    public async update (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.permissionService.update(Number(req.params.id), req.body)
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware)
    public async destroy (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.permissionService.delete(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}