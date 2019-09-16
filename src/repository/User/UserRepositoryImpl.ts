import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository} from "typeorm";
import { UserRepositoryInterface } from "./UserRepositoryInterface";
import { injectable } from "inversify";
import { User } from "../../entity/User";

@EntityRepository(User)
@injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
    private userRepository: Repository<User>;
    
    constructor() {
        this.userRepository = getRepository(User);
    }

    findAll() {
        return this.userRepository.find();
    }

    create(user: User) {
        const userObj = this.userRepository.create(user);
        return this.userRepository.save(userObj);
    }

    findById(id: number) {
        return this.userRepository.findOneOrFail(id);
    }

    findByUsername(username: string) {
        return this.userRepository.findOneOrFail({username});
    }

    update(id: number, user: User) {
        return this.userRepository.findOne(id).then(res => {
            res.name = user.name;
            res.username = user.username;
            res.email = user.email;
            res.password = user.password;
            return this.userRepository.save(res);
        });
    }

    delete(id: number) {
        return this.userRepository.delete(id);
    }
}