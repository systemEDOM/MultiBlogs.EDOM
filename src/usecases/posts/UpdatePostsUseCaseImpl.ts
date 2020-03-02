import * as fs from "fs";
import { inject, injectable } from "inversify";
import { Post } from "../../entity/Post";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import TYPES from "../../types";
import { UpdatePostsUseCaseInterface } from "./contracts/UpdatePostsUseCaseInterface";

@injectable()
export class UpdatePostsUseCaseImpl implements UpdatePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }

    public handle(id: number, post: Post) {
        this.postRepository.findById(id).then((post) => {
            if (post.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + post.image);
            }
        });
        return this.postRepository.update(id, post);
    }
}
