import * as fs from "fs";
import { inject, injectable } from "inversify";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import TYPES from "../../types";
import { DeletePostsUseCaseInterface } from "./contracts/DeletePostsUseCaseInterface";

@injectable()
export class DeletePostsUseCaseImpl implements DeletePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }

    public handle(id: number) {
        this.postRepository.findById(id).then((post) => {
            if (post.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + post.image);
            }
        });
        return this.postRepository.delete(id);
    }
}
