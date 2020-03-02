// tslint:disable-next-line:max-line-length
import { injectable } from "inversify";
import slugify from "slugify";
import {EntityRepository, getRepository, Repository} from "typeorm";
import { Post } from "../../entity/Post";
import { PostRepositoryInterface } from "./PostRepositoryInterface";

@EntityRepository(Post)
@injectable()
export class PostRepositoryImpl implements PostRepositoryInterface {
    private postRepository: Repository<Post>;

    constructor() {
        this.postRepository = getRepository(Post);
    }

    public findAll() {
        return this.postRepository.find();
    }

    public async create(post: Post) {
        post.slug = slugify(post.name);
        const postObj = this.postRepository.create(post);
        return this.postRepository.save(postObj);
    }

    public findById(id: number) {
        return this.postRepository.findOneOrFail(id);
    }

    public async update(id: number, post: Post) {
        post.slug = slugify(post.name);
        return this.postRepository.findOneOrFail(id).then((postResult) => {
            postResult.name = post.name;
            postResult.slug = post.slug;
            postResult.image = post.image;
            postResult.description = post.description;
            postResult.content = post.content;
            return this.postRepository.save(postResult);
        });
    }

    public delete(id: number) {
        return this.postRepository.delete(id);
    }
}
