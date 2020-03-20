import * as express from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, injectHttpContext, interfaces, request, response } from "inversify-express-utils";
import { DomainRepository } from "../../../core/domain/interfaces/DomainRepository";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { GetDomainsUseCase } from "../../../core/application/usecases/domains/GetDomainsUseCase";
import { CreateDomainUseCase } from "../../../core/application/usecases/domains/CreateDomainUseCase";
import { FindByIdDomainUseCase } from "../../../core/application/usecases/domains/FindByIdDomainUseCase";
import { UpdateDomainUseCase } from "../../../core/application/usecases/domains/UpdateDomainUseCase";
import { DeleteDomainUseCase } from "../../../core/application/usecases/domains/DeleteDomainUseCase";

@controller("/domains")
export class DomainController extends BaseHttpController {

    @inject(TYPES.GetDomainsUseCase)
    public getDomainsUseCase: GetDomainsUseCase;

    @inject(TYPES.CreateDomainUseCase)
    public createDomainsUseCase: CreateDomainUseCase;

    @inject(TYPES.FindByIdDomainUseCase)
    public findByIdDomainsUseCase: FindByIdDomainUseCase;

    @inject(TYPES.UpdateDomainUseCase)
    public updateDomainsUseCase: UpdateDomainUseCase;

    @inject(TYPES.DeleteDomainUseCase)
    public deleteDomainsUseCase: DeleteDomainUseCase;

    @injectHttpContext public _httpContext: interfaces.HttpContext;
    private domainRepository: DomainRepository;

    public constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepository) {
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
