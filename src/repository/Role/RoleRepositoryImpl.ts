import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager, getConnection} from "typeorm";
import {Permission} from "../../entity/Permission";
import { injectable } from "inversify";
import slugify from "slugify";
import { RoleRepositoryInterface } from "./RoleRepositoryInterface";
import { Role } from "../../entity/Role";

@EntityRepository(Role)
@injectable()
export class RoleRepositoryImpl implements RoleRepositoryInterface {
    private roleRepository: Repository<Role>;
    
    constructor() {
        this.roleRepository = getRepository(Role);
    }

    findAll() {
        return this.roleRepository.find();
    }

    create(role: Role) {
        role.slug = slugify(role.name);
        const roleObj = this.roleRepository.create(role);
        return this.roleRepository.save(roleObj);
    }

    findById(id: number) {
        return this.roleRepository.findOneOrFail(id);
    }

    update(id: number, role: Role) {
        role.slug = slugify(role.name);
        return this.roleRepository.update(id, {...role});
    }

    delete(id: number) {
        return this.roleRepository.delete(id);
    }
}