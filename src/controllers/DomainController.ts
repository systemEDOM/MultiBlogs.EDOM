import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController, injectHttpContext } from "inversify-express-utils";
import { DomainRepositoryInterface } from '../repository/Domain/DomainRepositoryInterface';
import TYPES from '../types';

import { GetDomainsUseCaseInterface } from '../usecases/domains/contracts/GetDomainsUseCaseInterface';
import { CreateDomainsUseCaseInterface } from '../usecases/domains/contracts/CreateDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseInterface } from '../usecases/domains/contracts/FindByIdDomainsUseCaseInterface';
import { UpdateDomainsUseCaseInterface } from '../usecases/domains/contracts/UpdateDomainsUseCaseInterface';
import { DeleteDomainsUseCaseInterface } from '../usecases/domains/contracts/DeleteDomainsUseCaseInterface';
import permit from '../middlewares/PermissionMiddleware';

@controller("/domains")
export class DomainController extends BaseHttpController {
    private domainRepository: DomainRepositoryInterface;

    @inject(TYPES.GetDomainsUseCaseInterface)
    getDomainsUseCase: GetDomainsUseCaseInterface;

    @inject(TYPES.CreateDomainsUseCaseInterface)
    createDomainsUseCase: CreateDomainsUseCaseInterface;

    @inject(TYPES.FindByIdDomainsUseCaseInterface)
    findByIdDomainsUseCase: FindByIdDomainsUseCaseInterface;

    @inject(TYPES.UpdateDomainsUseCaseInterface)
    updateDomainsUseCase: UpdateDomainsUseCaseInterface;

    @inject(TYPES.DeleteDomainsUseCaseInterface)
    deleteDomainsUseCase: DeleteDomainsUseCaseInterface;

    @injectHttpContext public _httpContext: interfaces.HttpContext;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        super();
        this.domainRepository = domainRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get domains"))
    public async index (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domains = await this.getDomainsUseCase.handle();
            res.status(200).send(domains);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create domains"))
    public async store (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.createDomainsUseCase.handle(req.body);
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show domains"))
    public async show (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.findByIdDomainsUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit domains"))
    public async update (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.updateDomainsUseCase.handle(Number(req.params.id), req.body)
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete domains"))
    public async destroy (@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.deleteDomainsUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}