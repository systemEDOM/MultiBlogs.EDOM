// tslint:disable-next-line:interface-name
import {UserDTO} from "./UserDTO";

// tslint:disable-next-line:interface-name
export interface PostDTO {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    content: string;
    user: UserDTO;
    createdAt: Date;
    updatedAt: Date;
}
