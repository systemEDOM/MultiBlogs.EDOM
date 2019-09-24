import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { DeletePostsUseCaseInterface } from "./contracts/DeletePostsUseCaseInterface";
import { PostRepositoryInterface } from "../../repository/post/PostRepositoryInterface";

@injectable()
export class DeletePostsUseCaseImpl implements DeletePostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }
    
    public handle(id: number) {
        return this.postRepository.delete(id);
    }
}