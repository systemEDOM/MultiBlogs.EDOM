import * as express from 'express';
import { injectable, inject } from 'inversify';
import { interfaces, Controller, Get, Post, Request, Response, Put, Delete, RequestBody } from "inversify-express-utils";
import { PostRepositoryInterface } from '../repository/Post/PostRepositoryInterface';
import TYPES from '../types';
import * as multer from 'multer';

import { GetPostsUseCaseInterface } from '../usecases/posts/contracts/GetPostsUseCaseInterface';
import { CreatePostsUseCaseInterface } from '../usecases/posts/contracts/CreatePostsUseCaseInterface';
import { FindByIdPostsUseCaseInterface } from '../usecases/posts/contracts/FindByIdPostsUseCaseInterface';
import { UpdatePostsUseCaseInterface } from '../usecases/posts/contracts/UpdatePostsUseCaseInterface';
import { DeletePostsUseCaseInterface } from '../usecases/posts/contracts/DeletePostsUseCaseInterface';

@injectable()
@Controller("/posts")
export class PostController implements interfaces.Controller {
    private postRepository: PostRepositoryInterface;

    @inject(TYPES.GetPostsUseCaseInterface)
    getPostssUseCase: GetPostsUseCaseInterface;

    @inject(TYPES.CreatePostsUseCaseInterface)
    createPostsUseCase: CreatePostsUseCaseInterface;

    @inject(TYPES.FindByIdPostsUseCaseInterface)
    findByIdPostsUseCase: FindByIdPostsUseCaseInterface;

    @inject(TYPES.UpdatePostsUseCaseInterface)
    updatePostsUseCase: UpdatePostsUseCaseInterface;

    @inject(TYPES.DeletePostsUseCaseInterface)
    deletePostsUseCase: DeletePostsUseCaseInterface;

    prueba: multer;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }

    @Get("/")
    public async index (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const Posts = await this.getPostssUseCase.handle();
            res.status(200).send(Posts);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Post("/", multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/assets/img/blog/')
            },
            filename: function (req, file, cb) {
                this.prueba = file;
                cb(null, file.originalname + '-' + Date.now())
            }
        })
    }).single("image"))
    public async store (@Request() req: express.Request, @Response() res: express.Response) {
        //var imagePath = req.files.file.image.path.replace(/^public\//, '');
        return res.send(this.prueba.filename);
        
    }

    @Get("/:id")
    public async show (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const post = await this.findByIdPostsUseCase.handle(Number(req.params.id));
            res.status(200).send(post);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Put("/:id")
    public async update (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const post = await this.updatePostsUseCase.handle(Number(req.params.id), req.body)
            res.status(200).send(post);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @Delete("/:id")
    public async destroy (@Request() req: express.Request, @Response() res: express.Response) {
        try {
            const post = await this.deletePostsUseCase.handle(Number(req.params.id));
            res.status(200).send(post);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}