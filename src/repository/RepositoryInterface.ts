import {EntityRepository, Repository} from "typeorm";
import { Domain } from "../entity/Domain";

export interface RepositoryInterface {
    /**
     * Here i can add more methods for general use
     */
    findAll();
    create(domain: Domain);
    findById(id: number);
    update(id: number, domain: Domain);
    delete(id: number);
}