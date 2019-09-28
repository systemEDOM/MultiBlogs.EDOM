import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity, Unique, ManyToOne} from "typeorm";
import { User } from "./User";

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
    id: number;

    @Column({length: 100, nullable: false})
    name: string;

    @Column({length: 150, nullable: false})
    slug?: string;

    @Column({length: 150, nullable: false})
    image: string;

    @Column({length: 150, nullable: false})
    description?: string;

    @Column({type: "text", nullable: false})
    content?: string;

    @ManyToOne(type => User, user => user.posts, {
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
    })
    user: User;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
