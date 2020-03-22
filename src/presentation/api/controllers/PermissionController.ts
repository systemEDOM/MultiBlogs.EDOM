import * as express from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { CreatePermissionUseCase } from "../../../core/application/usecases/permissions/CreatePermissionUseCase";
import { GetPermissionsUseCase } from "../../../core/application/usecases/permissions/GetPermissionsUseCase";
import { FindByIdPermissionUseCase } from "../../../core/application/usecases/permissions/FindByIdPermissionUseCase";
import { UpdatePermissionUseCase } from "../../../core/application/usecases/permissions/UpdatePermissionUseCase";
import { DeletePermissionUseCase } from "../../../core/application/usecases/permissions/DeletePermissionUseCase";

@controller("/permissions")
export class PermissionController extends BaseHttpController {
    private getPermissionsUseCase: GetPermissionsUseCase;
    private createPermissionUseCase: CreatePermissionUseCase;
    private findByIdPermissionUseCase: FindByIdPermissionUseCase;
    private updatePermissionUseCase: UpdatePermissionUseCase;
    private deletePermissionUseCase: DeletePermissionUseCase;

    public constructor(@inject(TYPES.GetPermissionsUseCase) getPermissionsUseCase: GetPermissionsUseCase,
        @inject(TYPES.CreatePermissionUseCase) createPermissionUseCase: CreatePermissionUseCase,
        @inject(TYPES.FindByIdPermissionUseCase) findByIdPermissionUseCase: FindByIdPermissionUseCase,
        @inject(TYPES.UpdatePermissionUseCase) updatePermissionUseCase: UpdatePermissionUseCase,
        @inject(TYPES.DeletePermissionUseCase) deletePermissionUseCase: DeletePermissionUseCase) {
        super();
        this.getPermissionsUseCase = getPermissionsUseCase;
        this.createPermissionUseCase = createPermissionUseCase;
        this.findByIdPermissionUseCase = findByIdPermissionUseCase;
        this.updatePermissionUseCase = updatePermissionUseCase;
        this.deletePermissionUseCase = deletePermissionUseCase;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get permissions"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permissions = await this.getPermissionsUseCase.execute();
            res.status(200).send(permissions);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create permissions"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.createPermissionUseCase.execute(req.body);
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show permissions"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.findByIdPermissionUseCase.execute(Number(req.params.id));
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit permissions"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.updatePermissionUseCase.execute(Number(req.params.id), req.body);
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete permissions"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const permission = await this.deletePermissionUseCase.execute(Number(req.params.id));
            res.status(200).send(permission);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
