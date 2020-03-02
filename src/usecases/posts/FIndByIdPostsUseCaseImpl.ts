import { inject, injectable } from "inversify";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";
import TYPES from "../../types";
import { FindByIdPostsUseCaseInterface } from "./contracts/FindByIdPostsUseCaseInterface";

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
