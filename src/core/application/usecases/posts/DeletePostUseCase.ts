import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";

@injectable()
export class DeletePostUseCase {
    private postRepository: PostRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository) {
        this.postRepository = postRepository;
    }

    public async execute(id: number): Promise<PostDTO> {
        this.postRepository.findById(id).then( post => {
            if (post.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + post.image);
            }
        });
        return this.postRepository.delete(id);
    }
}
