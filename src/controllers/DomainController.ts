import * as express from "express";
import { inject, injectable } from "inversify";
// tslint:disable-next-line:max-line-length
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, injectHttpContext, interfaces, request, response } from "inversify-express-utils";
import { DomainRepositoryInterface } from "../repository/Domain/DomainRepositoryInterface";
import TYPES from "../types";

import permit from "../middlewares/PermissionMiddleware";
import { CreateDomainsUseCaseInterface } from "../usecases/domains/contracts/CreateDomainsUseCaseInterface";
import { DeleteDomainsUseCaseInterface } from "../usecases/domains/contracts/DeleteDomainsUseCaseInterface";
import { FindByIdDomainsUseCaseInterface } from "../usecases/domains/contracts/FindByIdDomainsUseCaseInterface";
import { GetDomainsUseCaseInterface } from "../usecases/domains/contracts/GetDomainsUseCaseInterface";
import { UpdateDomainsUseCaseInterface } from "../usecases/domains/contracts/UpdateDomainsUseCaseInterface";

@controller("/domains")
export class DomainController extends BaseHttpController {

    @inject(TYPES.GetDomainsUseCaseInterface)
    public getDomainsUseCase: GetDomainsUseCaseInterface;

    @inject(TYPES.CreateDomainsUseCaseInterface)
    public createDomainsUseCase: CreateDomainsUseCaseInterface;

    @inject(TYPES.FindByIdDomainsUseCaseInterface)
    public findByIdDomainsUseCase: FindByIdDomainsUseCaseInterface;

    @inject(TYPES.UpdateDomainsUseCaseInterface)
    public updateDomainsUseCase: UpdateDomainsUseCaseInterface;

    @inject(TYPES.DeleteDomainsUseCaseInterface)
    public deleteDomainsUseCase: DeleteDomainsUseCaseInterface;

    // tslint:disable-next-line:variable-name
    @injectHttpContext public _httpContext: interfaces.HttpContext;
    private domainRepository: DomainRepositoryInterface;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        super();
        this.domainRepository = domainRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get domains"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domains = await this.getDomainsUseCase.handle();
            res.status(200).send(domains);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create domains"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.createDomainsUseCase.handle(req.body);
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show domains"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.findByIdDomainsUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit domains"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.updateDomainsUseCase.handle(Number(req.params.id), req.body);
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete domains"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.deleteDomainsUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
