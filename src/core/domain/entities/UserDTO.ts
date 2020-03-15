// tslint:disable-next-line:max-line-length
import { PostDTO } from "./PostDTO";
import { RoleDTO } from "./RoleDTO";

// tslint:disable-next-line:interface-name
export interface UserDTO {
    id: number;
    name: string;
    username: string;
    email: string;
    photo: string;
    password: string;
    posts: PostDTO[];
    role: RoleDTO;
    createdAt: Date;
    updatedAt: Date;
}
