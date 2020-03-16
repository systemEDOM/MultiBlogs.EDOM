import {inject, injectable} from "inversify";
import {EntityRepository, Repository as TypeOrmRepository} from "typeorm";
import {UserDTO} from "../../../core/domain/entities/UserDTO";
import { UserRepository } from "../../../core/domain/interfaces/UserRepository";
import TYPES from "../../../types";
import {User} from "../../entities/User";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(User)
@injectable()
export class UserRepositoryImpl extends GenericRepositoryImpl<UserDTO, User> implements UserRepository {
    constructor(@inject(TYPES.DomainRepositoryInterface) repository: TypeOrmRepository<User>) {
        super(repository);
    }

    public async findByUsername(username: string): Promise<User> {
        return await this.repository.findOneOrFail(username);
    }
}
