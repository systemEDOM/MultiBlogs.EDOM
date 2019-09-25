import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { CreatePostsUseCaseInterface } from "./contracts/CreatePostsUseCaseInterface";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import { Post } from "../../entity/Post";
import * as express from 'express';
import * as multer from 'multer';
import * as path from 'path';

@injectable()
export class CreatePostsUseCaseImpl implements CreatePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }
    
    public handle(post: Post, req: express.Request) {
        //let storage = this.storeWithOriginalName(req.body.image, req);
        const multerSingle = multer().single('avatar');
        multerSingle(req, undefined, async (error) => {
            req.body.image = this.getFullnameImage(req.body.image);
            return this.postRepository.create(req.body);
        });
    }

    public getFullnameImage(file) {
        return `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
    }

    public storeWithOriginalName(file, req: express.Request) {
        let storage = multer.diskStorage({
            destination: (req, file, done) => {
                done(null, path.join(__dirname, './../../public/assets/img/blog'))
            },
            file: (req, file, done) => {
                done(null, this.getFullnameImage(file));
            }
        });

        return storage;
    }
}