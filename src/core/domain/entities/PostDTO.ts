// tslint:disable-next-line:interface-name
import {UserDTO} from "./UserDTO";

export class PostDTO {
    public id: number;
    public name: string;
    public slug: string;
    public image: string;
    public description: string;
    public content: string;
    public user: UserDTO;
    public createdAt: Date;
    public updatedAt: Date;

    // tslint:disable-next-line:max-line-length
    constructor(id: number, name: string, slug: string, image: string, description: string, content: string, user: UserDTO, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.image = image;
        this.description = description;
        this.content = content;
        this.user = user;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
