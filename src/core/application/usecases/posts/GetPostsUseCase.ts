import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";

@injectable()
export class GetPostsUseCase {
    private posRepository: PostRepository;

    public constructor(@inject(TYPES.PostRepositoryInterface) posRepository: PostRepository) {
        this.posRepository = posRepository;
    }

    public async execute(): Promise<PostDTO[]> {
        return this.posRepository.findAll();
    }
}
