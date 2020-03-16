import * as express from "express";
import { inject, injectable } from "inversify";
// tslint:disable-next-line:max-line-length
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, injectHttpContext, interfaces, request, response } from "inversify-express-utils";
import { DomainRepository } from "../../../core/domain/interfaces/DomainRepository";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { CreateDomainUseCase } from "../../../core/application/usecases/domains/Contracts/CreateDomainUseCase";
import { DeleteDomainUseCase } from "../../../core/application/usecases/domains/Contracts/DeleteDomainUseCase";
import { FindByIdDomainUseCase } from "../../../core/application/usecases/domains/Contracts/FindByIdDomainUseCase";
import { GetDomainsUseCase } from "../../../core/application/usecases/domains/Contracts/GetDomainsUseCase";
import { UpdateDomainsUseCase } from "../../../core/application/usecases/domains/Contracts/UpdateDomainsUseCase";

@controller("/domains")
export class DomainController extends BaseHttpController {

    @inject(TYPES.GetDomainsUseCaseInterface)
    public getDomainsUseCase: GetDomainsUseCase<any>;

    @inject(TYPES.CreateDomainsUseCaseInterface)
    public createDomainsUseCase: CreateDomainUseCase<any>;

    @inject(TYPES.FindByIdDomainsUseCaseInterface)
    public findByIdDomainsUseCase: FindByIdDomainUseCase<any>;

    @inject(TYPES.UpdateDomainsUseCaseInterface)
    public updateDomainsUseCase: UpdateDomainsUseCase<any>;

    @inject(TYPES.DeleteDomainsUseCaseInterface)
    public deleteDomainsUseCase: DeleteDomainUseCase<any>;

    // tslint:disable-next-line:variable-name
    @injectHttpContext public _httpContext: interfaces.HttpContext;
    private domainRepository: DomainRepository;

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
        super();
        this.domainRepository = domainRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get domains"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domains = await this.getDomainsUseCase.execute();
            res.status(200).send(domains);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create domains"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.createDomainsUseCase.execute(req.body);
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show domains"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.findByIdDomainsUseCase.execute(Number(req.params.id));
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit domains"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.updateDomainsUseCase.execute(Number(req.params.id), req.body);
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete domains"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const domain = await this.deleteDomainsUseCase.execute(Number(req.params.id));
            res.status(200).send(domain);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
