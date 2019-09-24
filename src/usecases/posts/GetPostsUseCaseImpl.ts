import { GetPostsUseCaseInterface } from "./contracts/GetPostsUseCaseInterface";
import TYPES from "../../types";
import { inject, injectable } from "inversify";
import { PostRepositoryInterface } from "../../repository/Post/PostRepositoryInterface";

@injectable()
export class GetPostsUseCaseImpl implements GetPostsUseCaseInterface {
    private posRepository: PostRepositoryInterface;

    constructor(@inject(TYPES.PostRepositoryInterface) posRepository: PostRepositoryInterface) {
        this.posRepository = posRepository;
    }
    
    public handle() {
        return this.posRepository.findAll();
    }
}