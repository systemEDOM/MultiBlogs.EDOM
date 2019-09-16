import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Request, Response, Put, Delete } from "inversify-express-utils";
import { DomainRepositoryInterface } from '../repository/Domain/DomainRepositoryInterface';
import TYPES from '../types';

import { GetDomainsUseCaseInterface } from '../usescases/domains/contracts/GetDomainsUseCaseInterface';
import { CreateDomainsUseCaseInterface } from '../usescases/domains/contracts/CreateDomainsUseCaseInterface';
import { FindByIdDomainsUseCaseInterface } from '../usescases/domains/contracts/FindByIdDomainsUseCaseInterface';
import { UpdateDomainsUseCaseInterface } from '../usescases/domains/contracts/UpdateDomainsUseCaseInterface';
import { DeleteDomainsUseCaseInterface } from '../usescases/domains/contracts/DeleteDomainsUseCaseInterface';

@injectable()
@Controller("/api/domains")
export class DomainController implements interfaces.Controller {
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

    constructor(@inject(TYPES.DomainRepositoryInterface) domainRepository: DomainRepositoryInterface) {
        this.domainRepository = domainRepository;
    }

    @Get("/")
    public async index (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domains = await this.getDomainsUseCase.handle();
            res.status(200).send(domains);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Post("/")
    public async store (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.createDomainsUseCase.handle(req.body);
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Get("/:id")
    public async show (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.findByIdDomainsUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Put("/:id")
    public async update (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.updateDomainsUseCase.handle(Number(req.params.id), req.body)
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Delete("/:id")
    public async destroy (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const domain = await this.deleteDomainsUseCase.handle(Number(req.params.id));
            res.status(200).send(domain);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}