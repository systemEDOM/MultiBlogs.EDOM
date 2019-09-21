import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Request, Response, Put, Delete } from "inversify-express-utils";
import TYPES from '../types';

import { GetUsersUseCaseInterface } from '../usecases/users/contracts/GetUsersUseCaseInterface';
import { CreateUsersUseCaseInterface } from '../usecases/users/contracts/CreateUsersUseCaseInterface';
import { FindByIdUsersUseCaseInterface } from '../usecases/users/contracts/FindByIdUsersUseCaseInterface';
import { UpdateUsersUseCaseInterface } from '../usecases/users/contracts/UpdateUsersUseCaseInterface';
import { DeleteUsersUseCaseInterface } from '../usecases/users/contracts/DeleteUsersUseCaseInterface';

import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import { FindByUsernameUsersUseCaseInterface } from '../usecases/users/contracts/FindByUsernameUsersUseCaseInterface';

@injectable()
@Controller("/api/users")
export class UserController implements interfaces.Controller {
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

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: UserRepositoryInterface) {
        this.domainRepository = domainRepository;
    }

    @Get("/")
    public async index (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domains = await this.getUsersUseCase.handle();
            res.status(200).send(domains);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Post("/")
    public async store (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.createUsersUseCase.handle(req.body);
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Get("/:id")
    public async show (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.findByIdUsersUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Get("/by/:username")
    public async showByUsername (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.findByUsernameUsersUseCase.handle(req.params.username);
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Put("/:id")
    public async update (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.updateUsersUseCase.handle(Number(req.params.id), req.body)
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Delete("/:id")
    public async destroy (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.deleteUsersUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}