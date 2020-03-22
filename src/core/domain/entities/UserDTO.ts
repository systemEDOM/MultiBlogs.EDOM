import { PostDTO } from "./PostDTO";
import { RoleDTO } from "./RoleDTO";

export interface UserDTO {
    id: number;
    name: string;
    username: string;
    email: string;
    photo: string;
    password: string;
    posts: any[];
    role: any;
    createdAt: Date;
    updatedAt: Date;
}
