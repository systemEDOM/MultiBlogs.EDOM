// tslint:disable-next-line:max-line-length
import { PostDTO } from "./PostDTO";
import { RoleDTO } from "./RoleDTO";

export class UserDTO {
    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public photo: string;
    public password: string;
    public posts: PostDTO[];
    public role: RoleDTO;
    public createdAt: Date;
    public updatedAt: Date;
}
