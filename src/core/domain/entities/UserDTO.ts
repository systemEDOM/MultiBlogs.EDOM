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

    // tslint:disable-next-line:max-line-length
    constructor(id: number, name: string, username: string, email: string, photo: string, password: string, posts: PostDTO[], role: RoleDTO, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.email = email;
        this.photo = photo;
        this.password = password;
        this.posts = posts;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
