import * as express from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { RoleRepository } from "../../../core/domain/interfaces/RoleRepository";
import { RoleService } from "../../core/application/services/interfaces/RoleService";

@controller("/roles")
export class RoleController extends BaseHttpController {
    private roleRepo: RoleRepository;
    private roleService: RoleService;

    public constructor(@inject(TYPES.RoleRepositoryInterface) roleRepo: RoleRepository,
        @inject(TYPES.RoleService) roleService: RoleService) {
        super();
        this.roleRepo = roleRepo;
        this.roleService = roleService;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get roles"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const roles = await this.roleService.findAll();
            res.status(200).send(roles);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create roles"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.permissions = req.body.permissions.split(",");
            const role = await this.roleService.create(req.body);
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show roles"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const role = await this.roleService.findById(Number(req.params.id));
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit roles"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.permissions = req.body.permissions.split(",");
            const role = await this.roleService.update(Number(req.params.id), req.body);
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete roles"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const role = await this.roleService.delete(Number(req.params.id));
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
