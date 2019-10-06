import * as express from 'express';
import * as fs from 'fs';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import TYPES from '../types';

import { GetUsersUseCaseInterface } from '../usecases/users/contracts/GetUsersUseCaseInterface';
import { CreateUsersUseCaseInterface } from '../usecases/users/contracts/CreateUsersUseCaseInterface';
import { FindByIdUsersUseCaseInterface } from '../usecases/users/contracts/FindByIdUsersUseCaseInterface';
import { UpdateUsersUseCaseInterface } from '../usecases/users/contracts/UpdateUsersUseCaseInterface';
import { DeleteUsersUseCaseInterface } from '../usecases/users/contracts/DeleteUsersUseCaseInterface';

import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import { FindByUsernameUsersUseCaseInterface } from '../usecases/users/contracts/FindByUsernameUsersUseCaseInterface';
import { UploadSingleFile } from '../util/UploadSingleFile';
import container from '../inversify.config';

@controller("/users")
export class UserController extends BaseHttpController {
    private domainRepository: UserRepositoryInterface;

    @inject(TYPES.GetUsersUseCaseInterface)
    getUsersUseCase: GetUsersUseCaseInterface;

    @inject(TYPES.CreateUsersUseCaseInterface)
    createUsersUseCase: CreateUsersUseCaseInterface;

    @inject(TYPES.FindByIdUsersUseCaseInterface)
    findByIdUsersUseCase: FindByIdUsersUseCaseInterface;

    @inject(TYPES.FindByUsernameUsersUseCaseInterface)
    findByUsernameUsersUseCase: FindByUsernameUsersUseCaseInterface;

    @inject(TYPES.UpdateUsersUseCaseInterface)
    updateUsersUseCase: UpdateUsersUseCaseInterface;

    @inject(TYPES.DeleteUsersUseCaseInterface)
    deleteUsersUseCase: DeleteUsersUseCaseInterface;

    static fileName: string;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: UserRepositoryInterface) {
        super();
        this.domainRepository = domainRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware)
    public async index (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domains = await this.getUsersUseCase.handle();
            res.status(200).send(domains);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, UploadSingleFile.getInstance().uploadFile(UserController, './public/assets/img/avatars/', 'photo'))
    public async store (@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.photo = UserController.fileName;
            const domain = await this.createUsersUseCase.handle(req.body);
            res.status(200).send(domain);
        } catch(error) {
            fs.unlinkSync('./public/assets/img/avatars/'+req.body.photo);
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware)
    public async show (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.findByIdUsersUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/by/:username", TYPES.AuthMiddleware)
    public async showByUsername (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.findByUsernameUsersUseCase.handle(req.params.username);
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, UploadSingleFile.getInstance().uploadFile(UserController, './public/assets/img/avatars/', 'photo'))
    public async update (@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.photo = UserController.fileName;
            const domain = await this.updateUsersUseCase.handle(Number(req.params.id), req.body)
            res.status(200).send(domain);
        } catch(error) {
            fs.unlinkSync('./public/assets/img/avatars/'+req.body.photo);
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware)
    public async destroy (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.deleteUsersUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}