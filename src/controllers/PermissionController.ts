import * as express from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import TYPES from "../types";

import permit from "../middlewares/PermissionMiddleware";
import { PermissionRepositoryInterface } from "../repository/Permission/PermissionRepositoryInterface";
import { PermissionService } from "../services/PermissionService/PermissionService";

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

    @httpGet("/", TYPES.AuthMiddleware, permit("get permissions"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permissions = await this.permissionService.findAll();
            res.status(200).send(permissions);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create permissions"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.permissionService.create(req.body);
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show permissions"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.permissionService.findById(Number(req.params.id));
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit permissions"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.permissionService.update(Number(req.params.id), req.body);
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete permissions"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.permissionService.delete(Number(req.params.id));
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
