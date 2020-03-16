// tslint:disable-next-line:max-line-length
import {inject, injectable} from "inversify";
import slugify from "slugify";
import {EntityRepository, Repository as TypeOrmRepository} from "typeorm";
import {PostDTO} from "../../../core/domain/entities/PostDTO";
import { PostRepository } from "../../../core/domain/interfaces/PostRepository";
import TYPES from "../../../types";
import {Permission} from "../../entities/Permission";
import {Post} from "../../entities/Post";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Post)
@injectable()
export class PostRepositoryImpl extends GenericRepositoryImpl<PostDTO, Post> implements PostRepository {
    constructor(@inject(TYPES.DomainRepositoryInterface) repository: TypeOrmRepository<Post>) {
        super(repository);
    }
}
