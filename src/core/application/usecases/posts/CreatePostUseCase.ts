// tslint:disable-next-line:interface-name
export interface CreatePostUseCase<PostDTO> {
    execute(entity: PostDTO): Promise<PostDTO>;
}
