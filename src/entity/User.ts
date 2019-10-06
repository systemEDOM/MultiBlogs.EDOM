import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity, Unique, OneToMany} from "typeorm";
import { Post } from "./Post";

export interface UserDTO {
    id?: number;
    name: string;
    username?: string;
    email: string;
    photo: string;
    password?: string;
    posts: Post[];
    createdAt: Date;
    updatedAt: Date;
}


@Entity({name: "users"})
@Unique(["username", "email"])
export class User implements UserDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    name: string;

    @Column({length: 150, nullable: false})
    username?: string;

    @Column({length: 150, nullable: false})
    email: string;

    @Column({length: 200, nullable: false})
    photo: string;

    @Column({length: 150, nullable: false})
    password: string;

    @OneToMany(type => Post, post => post.user, {
        cascade: true,
        eager: true,
    })
    posts: Post[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
