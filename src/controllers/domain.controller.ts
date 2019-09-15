import models from '../models';
import {DomainRepositoryImpl} from '../repository/Domain/DomainRepositoryImpl';
import { Request, Response } from 'express';
import { getManager, getCustomRepository, getRepository } from 'typeorm';
import { Domain } from '../entity/Domain';

export class DomainController {
    constructor() {
        
    }

    public static async index (req: Request, res: Response) {
        let domainRepository = getRepository(Domain); 
        return await res.send(domainRepository.findOne({where: {id:2}}));
    }

    public static store (req: Request, res: Response) {
        /*return domainRepository.create(req.body).then(domain => res.status(200).json(domain))
        .catch(error => res.status(400).json(error.message));*/
    }

    public static show (req: Request, res: Response) {
        /*domainRepository.getById(req.params.id).then(domain => res.status(200).json(domain))
        .catch(error => res.status(400).json(error.message));*/
    }

    public static update (req: Request, res: Response) {
        /*domainRepository.update(req.body, req.params.id).then(domain => res.status(200).json(domain))
        .catch(error => res.status(200).json(error.message));*/
    }

    public static destroy (req: Request, res: Response) {
        /*domainRepository.destroy(req.params.id).then(elementsDeleted => res.status(200).json(elementsDeleted))
        .catch(error => res.status(400).json(error.message));*/
    }
}