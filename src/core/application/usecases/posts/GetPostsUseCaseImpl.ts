import { inject, injectable } from "inversify";
import TYPES from "../../../../types";
import {PostDTO} from "../../../domain/entities/PostDTO";
import { PostRepository } from "../../../domain/interfaces/PostRepository";
import {GetPostsUseCase} from "./Contracts/GetPostsUseCase";

@injectable()
export class GetPostsUseCaseImpl implements GetPostsUseCase<PostDTO> {
    private posRepository: PostRepository;

    constructor(@inject(TYPES.PostRepositoryInterface) posRepository: PostRepository) {
        this.posRepository = posRepository;
    }

    public async execute(): Promise<PostDTO[]> {
        return this.posRepository.findAll();
    }
}
