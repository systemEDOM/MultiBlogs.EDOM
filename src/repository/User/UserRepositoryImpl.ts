import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager} from "typeorm";
import { UserRepositoryInterface } from "./UserRepositoryInterface";
import { injectable } from "inversify";
import { User } from "../../entity/User";
import slugify from "slugify";
import * as bcrypt from 'bcryptjs';

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

    async create(user: User) {
        user.username = slugify(user.username);
        user.password = await bcrypt.hash(user.password, 10);
        const userObj = this.userRepository.create(user);
        return this.userRepository.save(userObj);
    }

    findById(id: number) {
        return this.userRepository.findOneOrFail(id);
    }

    findByUsername(username: string) {
        return this.userRepository.findOneOrFail({username});
    }

    async update(id: number, user: User) {
        user.username = slugify(user.username);
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.findOneOrFail(id).then(userResult => {
            userResult.name = user.name;
            userResult.email = user.email;
            userResult.username = user.username;
            userResult.password = user.password;
            userResult.photo = user.photo;
            return this.userRepository.save(userResult);
        })
    }

    delete(id: number) {
        return this.userRepository.delete(id);
    }
}