import * as express from "express";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../types";

import { CreateUserUseCase } from "../../application/usecases/users/CreateUserUseCase";
import { DeleteUserUseCase } from "../../application/usecases/users/DeleteUserUseCase";
import { FindByIdUserUseCase } from "../../application/usecases/users/FindByIdUserUseCase";
import { GetUsersUseCase } from "../../application/usecases/users/GetUsersUseCase";
import { UpdateUserUseCase } from "../../application/usecases/users/UpdateUserUseCase";

import permit from "../middlewares/PermissionMiddleware";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import { FindByUsernameUserUseCase } from "../../application/usecases/users/FindByUsernameUserUseCase";
import { UploadSingleFile } from "../../util/UploadSingleFile";

@controller("/users")
export class UserController extends BaseHttpController {

    public static fileName: string;

    @inject(TYPES.GetUsersUseCaseInterface)
    public getUsersUseCase: GetUsersUseCase;

    @inject(TYPES.CreateUsersUseCaseInterface)
    public createUsersUseCase: CreateUserUseCase;

    @inject(TYPES.FindByIdUsersUseCaseInterface)
    public findByIdUsersUseCase: FindByIdUserUseCase;

    @inject(TYPES.FindByUsernameUsersUseCaseInterface)
    public findByUsernameUsersUseCase: FindByUsernameUserUseCase;

    @inject(TYPES.UpdateUsersUseCaseInterface)
    public updateUsersUseCase: UpdateUserUseCase;

    @inject(TYPES.DeleteUsersUseCaseInterface)
    public deleteUsersUseCase: DeleteUserUseCase;
    private domainRepository: UserRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: UserRepository) {
        super();
        this.domainRepository = domainRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get users"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const users = await this.getUsersUseCase.handle();
            res.status(200).send(users);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    // tslint:disable-next-line:max-line-length
    @httpPost("/", TYPES.AuthMiddleware, permit("create users"), UploadSingleFile.getInstance().uploadFile(UserController, "./public/assets/img/avatars/", "photo"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.photo = UserController.fileName;
            const user = await this.createUsersUseCase.handle(req.body);
            res.status(200).send(user);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/avatars/" + req.body.photo);
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show users"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = await this.findByIdUsersUseCase.handle(Number(req.params.id));
            res.status(200).send(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/by/:username", TYPES.AuthMiddleware, permit("show users"))
    public async showByUsername(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = await this.findByUsernameUsersUseCase.handle(req.params.username);
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
            const user = await this.updateUsersUseCase.handle(Number(req.params.id), req.body);
            res.status(200).send(user);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/avatars/" + req.body.photo);
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete users"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const user = await this.deleteUsersUseCase.handle(Number(req.params.id));
            res.status(200).send(user);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
