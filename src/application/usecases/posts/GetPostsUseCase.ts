// tslint:disable-next-line:interface-name
export interface GetPostsUseCase<PostDTO> {
    execute(): Promise<PostDTO[]>;
}
