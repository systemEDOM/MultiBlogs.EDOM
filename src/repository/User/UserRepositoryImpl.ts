import * as bcrypt from "bcryptjs";
import { injectable } from "inversify";
import slugify from "slugify";
import {EntityRepository, getRepository, Repository} from "typeorm";
import { User } from "../../entity/User";
import { UserRepositoryInterface } from "./UserRepositoryInterface";

@EntityRepository(User)
@injectable()
export class UserRepositoryImpl implements UserRepositoryInterface {
    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getRepository(User);
    }

    public findAll() {
        return this.userRepository.find();
    }

    public async create(user: User) {
        user.username = slugify(user.username);
        user.password = await bcrypt.hash(user.password, 10);
        const userObj = this.userRepository.create(user);
        return this.userRepository.save(userObj);
    }

    public findById(id: number) {
        return this.userRepository.findOneOrFail(id);
    }

    public findByUsername(username: string) {
        return this.userRepository.findOneOrFail({username});
    }

    public async update(id: number, user: User) {
        user.username = slugify(user.username);
        user.password = await bcrypt.hash(user.password, 10);
        return this.userRepository.findOneOrFail(id).then((userResult) => {
            userResult.name = user.name;
            userResult.email = user.email;
            userResult.username = user.username;
            userResult.password = user.password;
            userResult.photo = user.photo;
            return this.userRepository.save(userResult);
        });
    }

    public delete(id: number) {
        return this.userRepository.delete(id);
    }
}
