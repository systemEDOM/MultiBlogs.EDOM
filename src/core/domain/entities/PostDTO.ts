import {UserDTO} from "./UserDTO";

export interface PostDTO {
    id: number;
    name: string;
    slug: string;
    image: string;
    description: string;
    content: string;
    user: any;
    createdAt: Date;
    updatedAt: Date;
}
