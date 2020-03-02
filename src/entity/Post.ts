// tslint:disable-next-line:max-line-length
import {BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import { User } from "./User";

// tslint:disable-next-line:interface-name
export interface PostDTO {
    id?: number;
    name: string;
    slug?: string;
    image: string;
    description?: string;
    content?: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

@Entity({name: "posts"})
@Unique(["name", "slug"])
export class Post implements PostDTO {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug?: string;

    @Column({length: 150, nullable: false})
    public image: string;

    @Column({length: 150, nullable: false})
    public description?: string;

    @Column({type: "text", nullable: false})
    public content?: string;

    @ManyToOne((type) => User, (user) => user.posts, {
        onUpdate: "CASCADE",
        // tslint:disable-next-line:object-literal-sort-keys
        onDelete: "CASCADE",
    })
    public user: User;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
