import {EntityRepository, Repository, EntityManager, createConnection, Connection, ConnectionOptions, getRepository, getManager} from "typeorm";
import { PostRepositoryInterface } from "./PostRepositoryInterface";
import { Post } from "../../entity/Post";
import { injectable } from "inversify";
import slugify from "slugify";
import * as bcrypt from 'bcryptjs';

@EntityRepository(Post)
@injectable()
export class PostRepositoryImpl implements PostRepositoryInterface {
    private postRepository: Repository<Post>;
    
    constructor() {
        this.postRepository = getRepository(Post);
    }

    findAll() {
        return this.postRepository.find();
    }

    async create(post: Post) {
        post.slug = slugify(post.name);
        const postObj = this.postRepository.create(post);
        return this.postRepository.save(postObj);
    }

    findById(id: number) {
        return this.postRepository.findOneOrFail(id);
    }

    async update(id: number, post: Post) {
        post.name = slugify(post.name);
        return this.postRepository.update(id, post);
    }

    delete(id: number) {
        return this.postRepository.delete(id);
    }
}