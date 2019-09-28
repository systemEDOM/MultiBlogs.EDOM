import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { CreatePostsUseCaseInterface } from "./contracts/CreatePostsUseCaseInterface";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import { Post } from "../../entity/Post";
import * as multer from 'multer';
import * as path from 'path';

@injectable()
export class CreatePostsUseCaseImpl implements CreatePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }
    
    public handle(post: Post) {
        return this.postRepository.create(post);
    }
}