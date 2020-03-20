import * as express from "express";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../../types";


import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
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

    @inject(TYPES.GetUsersUseCase)
    public getUsersUseCase: GetUsersUseCase;

    @inject(TYPES.CreateUserUseCase)
    public createUsersUseCase: CreateUserUseCase;

    @inject(TYPES.FindByIdUserUseCase)
    public findByIdUsersUseCase: FindByIdUserUseCase;

    @inject(TYPES.FindByUsernameUserUseCase)
    public findByUsernameUsersUseCase: FindByUsernameUserUseCase;

    @inject(TYPES.UpdateUserUseCase)
    public updateUsersUseCase: UpdateUserUseCase;

    @inject(TYPES.DeleteUserUseCase)
    public deleteUsersUseCase: DeleteUserUseCase;
    private domainRepository: UserRepository;

    public constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: UserRepository) {
        super();
        this.domainRepository = domainRepository;
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
            const user = await this.findByUsernameUsersUseCase.execute(req.params.username);
            res.status(200).send(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    // tslint:disable-next-line:max-line-length
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
