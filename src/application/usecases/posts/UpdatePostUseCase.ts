// tslint:disable-next-line:interface-name
export interface UpdatePostUseCase<PostDTO> {
    execute(id: number, entity: PostDTO): Promise<PostDTO>;
}
