import {inject, injectable} from "inversify";
import {EntityRepository, getRepository} from "typeorm";
import {PostDTO} from "../../../core/domain/entities/PostDTO";
import { PostRepository } from "../../../core/domain/interfaces/PostRepository";
import {Post} from "../../entities/Post";
import {GenericRepositoryImpl} from "../GenericRepositoryImpl";

@EntityRepository(Post)
@injectable()
export class PostRepositoryImpl extends GenericRepositoryImpl<PostDTO, Post> implements PostRepository {
    public constructor() {
        super(getRepository(Post));
    }
}
