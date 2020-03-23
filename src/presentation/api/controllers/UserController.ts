import * as express from "express";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../../types";


import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { UploadSingleFile } from "../../../util/UploadSingleFile";
import { GetUsersUseCase } from "../../../core/application/usecases/users/GetUsersUseCase";
import { CreateUserUseCase } from "../../../core/application/usecases/users/CreateUserUseCase";
import { FindByIdUserUseCase } from "../../../core/application/usecases/users/FindByIdUserUseCase";
import { FindByUsernameUserUseCase } from "../../../core/application/usecases/users/FindByUsernameUserUseCase";
import { UpdateUserUseCase } from "../../../core/application/usecases/users/UpdateUserUseCase";
import { DeleteUserUseCase } from "../../../core/application/usecases/users/DeleteUserUseCase";

@controller("/users")
export class UserController extends BaseHttpController {

    public static fileName: string;

    public getUsersUseCase: GetUsersUseCase;
    public createUsersUseCase: CreateUserUseCase;
    public findByIdUsersUseCase: FindByIdUserUseCase;
    public findByUsernameUserUseCase: FindByUsernameUserUseCase;
    public updateUsersUseCase: UpdateUserUseCase;
    public deleteUsersUseCase: DeleteUserUseCase;

    public constructor(@inject(TYPES.GetUsersUseCase) getUsersUseCase: GetUsersUseCase,
        @inject(TYPES.CreateUserUseCase) createUserUseCase: CreateUserUseCase,
        @inject(TYPES.FindByIdUserUseCase) findByIdUserUseCase: FindByIdUserUseCase,
        @inject(TYPES.FindByUsernameUserUseCase) findByUsernameUserUseCase: FindByUsernameUserUseCase,
        @inject(TYPES.UpdateUserUseCase) updateUserUseCase: UpdateUserUseCase,
        @inject(TYPES.DeleteUserUseCase) deleteUserUseCase: DeleteUserUseCase) {
        super();
        this.getUsersUseCase = getUsersUseCase;
        this.createUsersUseCase = createUserUseCase;
        this.findByIdUsersUseCase = findByIdUserUseCase;
        this.findByUsernameUserUseCase = findByUsernameUserUseCase;
        this.updateUsersUseCase = updateUserUseCase;
        this.deleteUsersUseCase = deleteUserUseCase;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get users"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const users = await this.getUsersUseCase.execute();
            res.status(200).send(users);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", UploadSingleFile.getInstance().uploadFile(UserController, "./public/assets/img/avatars/", "photo"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.photo = UserController.fileName;
            const user = await this.createUsersUseCase.execute(req.body);
            res.status(200).send(user);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/avatars/" + req.body.photo);
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show users"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = await this.findByIdUsersUseCase.execute(Number(req.params.id));
            res.status(200).send(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/by/:username", TYPES.AuthMiddleware, permit("show users"))
    public async showByUsername(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = await this.findByUsernameUserUseCase.execute(req.params.username);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit users"), UploadSingleFile.getInstance().uploadFile(UserController, "./public/assets/img/avatars/", "photo"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.photo = UserController.fileName;
            const user = await this.updateUsersUseCase.execute(Number(req.params.id), req.body);
            res.status(200).send(user);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/avatars/" + req.body.photo);
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete users"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = await this.deleteUsersUseCase.execute(Number(req.params.id));
            res.status(200).send(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
