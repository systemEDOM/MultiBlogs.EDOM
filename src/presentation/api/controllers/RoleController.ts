import * as express from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { RoleRepository } from "../../../core/domain/interfaces/RoleRepository";
import { GetRolesUseCase } from "../../../core/application/usecases/roles/GetRolesUseCase";
import { FindByIdRoleUseCase } from "../../../core/application/usecases/roles/FindByIdRoleUseCase";
import { CreateRoleUseCase } from "../../../core/application/usecases/roles/CreateRoleUseCase";
import { UpdateRoleUseCase } from "../../../core/application/usecases/roles/UpdateRoleUseCase";
import { DeleteRoleUseCase } from "../../../core/application/usecases/roles/DeleteRoleUseCase";

@controller("/roles")
export class RoleController extends BaseHttpController {
    private getRolesUseCase: GetRolesUseCase;
    private createRoleUseCase: CreateRoleUseCase;
    private findByIdRoleUseCase: FindByIdRoleUseCase;
    private updateRoleUseCase: UpdateRoleUseCase;
    private deleteRoleUseCase: DeleteRoleUseCase;

    public constructor(@inject(TYPES.GetRolesUseCase) getRolesUseCase: GetRolesUseCase,
        @inject(TYPES.CreateRoleUseCase) createRoleUseCase: CreateRoleUseCase,
        @inject(TYPES.FindByIdRoleUseCase) findByIdRoleUseCase: FindByIdRoleUseCase,
        @inject(TYPES.UpdateRoleUseCase) updateRoleUseCase: UpdateRoleUseCase,
        @inject(TYPES.DeleteRoleUseCase) deleteRoleUseCase: DeleteRoleUseCase) {
        super();
        this.getRolesUseCase = getRolesUseCase;
        this.createRoleUseCase = createRoleUseCase;
        this.findByIdRoleUseCase = findByIdRoleUseCase;
        this.updateRoleUseCase = updateRoleUseCase;
        this.deleteRoleUseCase = deleteRoleUseCase;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get roles"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const roles = await this.getRolesUseCase.execute();
            res.status(200).send(roles);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create roles"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.permissions = req.body.permissions.split(",");
            const role = await this.createRoleUseCase.execute(req.body);
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show roles"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const role = await this.findByIdRoleUseCase.execute(Number(req.params.id));
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit roles"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.permissions = req.body.permissions.split(",");
            const role = await this.updateRoleUseCase.execute(Number(req.params.id), req.body);
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete roles"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const role = await this.deleteRoleUseCase.execute(Number(req.params.id));
            res.status(200).send(role);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
