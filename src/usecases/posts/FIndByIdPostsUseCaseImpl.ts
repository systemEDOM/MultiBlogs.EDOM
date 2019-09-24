import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { FindByIdPostsUseCaseInterface } from "./contracts/FindByIdPostsUseCaseInterface";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";

@injectable()
export class FindByIdPostsUseCaseImpl implements FindByIdPostsUseCaseInterface {
    private postRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) postRepository: PostRepositoryInterface) {
        this.postRepository = postRepository;
    }
    
    public handle(id: number) {
        return this.postRepository.findById(id);
    }
}