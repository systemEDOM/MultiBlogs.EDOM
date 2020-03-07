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
}
