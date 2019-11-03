import * as express from 'express';
import * as fs from 'fs';
import { injectable, inject } from 'inversify';
import { interfaces, controller, httpGet, httpPost, request, response, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import TYPES from '../types';


import { PostRepositoryInterface } from '../repository/Post/PostRepositoryInterface';
import { GetPostsUseCaseInterface } from '../usecases/posts/contracts/GetPostsUseCaseInterface';
import { CreatePostsUseCaseInterface } from '../usecases/posts/contracts/CreatePostsUseCaseInterface';
import { FindByIdPostsUseCaseInterface } from '../usecases/posts/contracts/FindByIdPostsUseCaseInterface';
import { UpdatePostsUseCaseInterface } from '../usecases/posts/contracts/UpdatePostsUseCaseInterface';
import { DeletePostsUseCaseInterface } from '../usecases/posts/contracts/DeletePostsUseCaseInterface';
import { UploadSingleFile } from '../util/UploadSingleFile';
import permit from '../middlewares/PermissionMiddleware';

@controller("/posts")
export class PostController extends BaseHttpController {
    private postRepository: PostRepositoryInterface;

    @inject(TYPES.GetPostsUseCaseInterface)
    getPostsUseCase: GetPostsUseCaseInterface;

    @inject(TYPES.CreatePostsUseCaseInterface)
    createPostsUseCase: CreatePostsUseCaseInterface;

    @inject(TYPES.FindByIdPostsUseCaseInterface)
    findByIdPostsUseCase: FindByIdPostsUseCaseInterface;

    @inject(TYPES.UpdatePostsUseCaseInterface)
    updatePostsUseCase: UpdatePostsUseCaseInterface;

    @inject(TYPES.DeletePostsUseCaseInterface)
    deletePostsUseCase: DeletePostsUseCaseInterface;

    static fileName: string;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        super();
        this.postRepository = postRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get posts"))
    public async index (@request() req: express.Request, @response() res: express.Response) {
        try {
            const posts = await this.getPostsUseCase.handle();
            res.status(200).send(posts);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPost("/", TYPES.AuthMiddleware, permit("create posts"), UploadSingleFile.getInstance().uploadFile(PostController, './public/assets/img/blog/', 'image'))
    public async store (@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.image = PostController.fileName;
            const post = await this.createPostsUseCase.handle(req.body);
            res.status(200).send(post);
        } catch(error) {
            fs.unlinkSync('./public/assets/img/blog/'+req.body.image);
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show posts"))
    public async show (@request() req: express.Request, @response() res: express.Response) {
        try {
            const post = await this.findByIdPostsUseCase.handle(Number(req.params.id));
            res.status(200).send(post);
        } catch(error) {
            res.status(400).json(error);
        }
    }

    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit posts"), UploadSingleFile.getInstance().uploadFile(PostController, './public/assets/img/blog/', 'image'))
    public async update (@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.image = PostController.fileName;
            const post = await this.updatePostsUseCase.handle(Number(req.params.id), req.body)
            res.status(200).send(post);
        } catch(error) {
            fs.unlinkSync('./public/assets/img/blog/'+req.body.image);
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete posts"))
    public async destroy (@request() req: express.Request, @response() res: express.Response) {
        try {
            const post = await this.deletePostsUseCase.handle(Number(req.params.id));
            res.status(200).send(post);
        } catch(error) {
            res.status(400).json(error);
        }
    }
}