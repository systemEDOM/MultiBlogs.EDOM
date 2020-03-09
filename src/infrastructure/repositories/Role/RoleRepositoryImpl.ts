// tslint:disable-next-line:max-line-length
import { injectable } from "inversify";
import slugify from "slugify";
import {EntityRepository, getRepository, Repository} from "typeorm";
import { Role } from "../../domain/entity/Role";
import { RoleRepository } from "../../../core/domain/interfaces/RoleRepository";

@EntityRepository(Role)
@injectable()
export class RoleRepositoryImpl implements RoleRepository {
    private roleRepository: Repository<Role>;

    constructor() {
        this.roleRepository = getRepository(Role);
    }

    public findAll() {
        return this.roleRepository.find();
    }

    public create(role: Role) {
        role.slug = slugify(role.name);
        const roleObj = this.roleRepository.create(role);
        return this.roleRepository.save(roleObj);
    }

    public findById(id: number) {
        return this.roleRepository.findOneOrFail(id);
    }

    public update(id: number, role: Role) {
        role.slug = slugify(role.name);
        return this.roleRepository.update(id, {...role});
    }

    public delete(id: number) {
        return this.roleRepository.delete(id);
    }
}
