import { Post } from "../../../entity/Post";
import * as express from 'express';

export interface CreatePostsUseCaseInterface {
    handle(post: Post, req: express.Request);
}