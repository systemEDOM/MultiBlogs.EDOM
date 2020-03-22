import * as express from "express";
import * as fs from "fs";
import { inject, injectable } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost, httpPut, interfaces, request, response } from "inversify-express-utils";
import TYPES from "../../../types";

import permit from "../../../infrastructure/middlewares/PermissionMiddleware";
import { UploadSingleFile } from "../../../util/UploadSingleFile";
import { GetPostsUseCase } from "../../../core/application/usecases/posts/GetPostsUseCase";
import { CreatePostUseCase } from "../../../core/application/usecases/posts/CreatePostUseCase";
import { FindByIdPostUseCase } from "../../../core/application/usecases/posts/FindByIdPostUseCase";
import { UpdatePostUseCase } from "../../../core/application/usecases/posts/UpdatePostUseCase";
import { DeletePostUseCase } from "../../../core/application/usecases/posts/DeletePostUseCase";

@controller("/posts")
export class PostController extends BaseHttpController {

    public static fileName: string;

    public getPostsUseCase: GetPostsUseCase;
    public createPostsUseCase: CreatePostUseCase;
    public findByIdPostsUseCase: FindByIdPostUseCase;
    public updatePostsUseCase: UpdatePostUseCase;
    public deletePostsUseCase: DeletePostUseCase;

    public constructor(@inject(TYPES.GetPostsUseCase) getPostsUseCase: GetPostsUseCase,
        @inject(TYPES.CreatePostUseCase) createPostsUseCase: CreatePostUseCase,
        @inject(TYPES.FindByIdPostUseCase) findByIdPostsUseCase: FindByIdPostUseCase,
        @inject(TYPES.UpdatePostUseCase) updatePostsUseCase: UpdatePostUseCase,
        @inject(TYPES.DeletePostUseCase) deletePostsUseCase: DeletePostUseCase) {
        super();
        this.getPostsUseCase = getPostsUseCase;
        this.createPostsUseCase = createPostsUseCase;
        this.findByIdPostsUseCase = findByIdPostsUseCase;
        this.updatePostsUseCase = updatePostsUseCase;
        this.deletePostsUseCase = deletePostsUseCase;
    }

    @httpGet("/", TYPES.AuthMiddleware, permit("get posts"))
    public async index(@request() req: express.Request, @response() res: express.Response) {
        try {
            const posts = await this.getPostsUseCase.execute();
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
            const post = await this.createPostsUseCase.execute(req.body);
            res.status(200).send(post);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/blog/" + req.body.image);
            res.status(400).json(error);
        }
    }

    @httpGet("/:id", TYPES.AuthMiddleware, permit("show posts"))
    public async show(@request() req: express.Request, @response() res: express.Response) {
        try {
            const post = await this.findByIdPostsUseCase.execute(Number(req.params.id));
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
            const post = await this.updatePostsUseCase.execute(Number(req.params.id), req.body);
            res.status(200).send(post);
        } catch (error) {
            fs.unlinkSync("./public/assets/img/blog/" + req.body.image);
            res.status(400).json(error);
        }
    }

    @httpDelete("/:id", TYPES.AuthMiddleware, permit("delete posts"))
    public async destroy(@request() req: express.Request, @response() res: express.Response) {
        try {
            const post = await this.deletePostsUseCase.execute(Number(req.params.id));
            res.status(200).send(post);
        } catch (error) {
            res.status(400).json(error);
        }
    }
}
