import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import { UpdatePostUseCase } from "./Contracts/UpdatePostUseCase";

@injectable()
export class UpdatePostUseCaseImpl implements UpdatePostUseCase<PostDTO> {
    private postRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(id: number, post: PostDTO): Promise<PostDTO> {
        // tslint:disable-next-line:no-shadowed-variable
        this.postRepository.findById(id).then((post) => {
            if (post.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + post.image);
            }
        });
        return this.postRepository.update(id, post);
    }
}
