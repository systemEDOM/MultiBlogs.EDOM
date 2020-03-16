// tslint:disable-next-line:interface-name
export interface DeletePostUseCase<PostDTO> {
    execute(id: number): Promise<PostDTO>;
}
