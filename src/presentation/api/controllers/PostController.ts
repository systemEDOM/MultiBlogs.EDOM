import * as express from "express";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { PostRepository } from "../../../core/domain/interfaces/PostRepository";
import { CreatePostUseCase } from "../../../core/application/usecases/posts/Contracts/CreatePostUseCase";
import { DeletePostUseCase } from "../../../core/application/usecases/posts/Contracts/DeletePostUseCase";
import { FindByIdPostUseCase } from "../../../core/application/usecases/posts/Contracts/FindByIdPostUseCase";
import { GetPostUseCase } from "../../../core/application/usecases/posts/Contracts/GetPostsUseCase";
import { UpdatePostUseCase } from "../../../core/application/usecases/posts/Contracts/UpdatePostUseCase";
import { UploadSingleFile } from "../../../util/UploadSingleFile";

@controller("/posts")
export class PostController extends BaseHttpController {

    public static fileName: string;

    @inject(TYPES.GetPostsUseCaseInterface)
    public getPostsUseCase: GetPostUseCase;

    @inject(TYPES.CreatePostsUseCaseInterface)
    public createPostsUseCase: CreatePostUseCase;

    @inject(TYPES.FindByIdPostsUseCaseInterface)
    public findByIdPostsUseCase: FindByIdPostUseCase;

    @inject(TYPES.UpdatePostsUseCaseInterface)
    public updatePostsUseCase: UpdatePostUseCase;

    @inject(TYPES.DeletePostsUseCaseInterface)
    public deletePostsUseCase: DeletePostUseCase;
    private postRepository: PostRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        super();
        this.postRepository = postRepository;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get posts"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const posts = await this.getPostsUseCase.handle();
            res.status(200).send(posts);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    // tslint:disable-next-line:max-line-length
    @httpPost("/", TYPES.AuthMiddleware, permit("create posts"), UploadSingleFile.getInstance().uploadFile(PostController, "./public/assets/img/blog/", "image"))
    public async store(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.image = PostController.fileName;
            const post = await this.createPostsUseCase.handle(req.body);
            res.status(200).send(post);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/blog/" + req.body.image);
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show posts"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const post = await this.findByIdPostsUseCase.handle(Number(req.params.id));
            res.status(200).send(post);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    // tslint:disable-next-line:max-line-length
    @httpPut("/:id", TYPES.AuthMiddleware, permit("edit posts"), UploadSingleFile.getInstance().uploadFile(PostController, "./public/assets/img/blog/", "image"))
    public async update(@request() req: express.Request, @response() res: express.Response) {
        try {
            req.body.image = PostController.fileName;
            const post = await this.updatePostsUseCase.handle(Number(req.params.id), req.body);
            res.status(200).send(post);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/blog/" + req.body.image);
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete posts"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const post = await this.deletePostsUseCase.handle(Number(req.params.id));
            res.status(200).send(post);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
