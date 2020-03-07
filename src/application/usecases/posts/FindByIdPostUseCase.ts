// tslint:disable-next-line:interface-name
export interface FindByIdPostUseCase<PostDTO> {
    execute(id: number): Promise<PostDTO>;
}
