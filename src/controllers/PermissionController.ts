import * as express from 'express';
import { inject } from 'inversify';
import { controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import TYPES from '../types';

import { UserRepositoryInterface } from '../repository/User/UserRepositoryInterface';
import container from '../inversify.config';

@controller("/users")
export class UserController extends BaseHttpController {
    private domainRepository: UserRepositoryInterface;

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