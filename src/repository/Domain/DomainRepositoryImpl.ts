import {EntityRepository, Repository} from "typeorm";
import {Domain} from "../../entity/Domain";
import { DomainRepositoryInterface } from "./DomainRepositoryInterface";

@EntityRepository(Domain)
export class DomainRepositoryImpl extends Repository<Domain> {//implements DomainRepositoryInterface<Domain> {
    
}