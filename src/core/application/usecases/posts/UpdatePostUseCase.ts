import * as fs from "fs";
import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import { UserRepository } from "../../../domain/interfaces/UserRepository";

@injectable()
export class UpdatePostUseCase {
    private postRepository: PostRepository;
    private userRepository: UserRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepository,
        @inject(TYPES.UserRepositoryInterface) userRepository: UserRepository) {
        this.postRepository = postRepository;
        this.userRepository = userRepository;
    }

    public async execute(id: number, post: PostDTO): Promise<PostDTO> {
        await this.postRepository.findById(id).then( postDTO => {
            if (postDTO.image !== null) {
                fs.unlinkSync("./public/assets/img/blog/" + postDTO.image);
            }
        });
        if (post.user) {
            post.user = await this.userRepository.findById(Number(post.user)).then( user => user);
        }
        return await this.postRepository.update(id, post);
    }
}
