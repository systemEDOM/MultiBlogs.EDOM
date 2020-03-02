// tslint:disable-next-line:max-line-length
import {BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn} from "typeorm";
import { Post } from "./Post";
import { Role } from "./Role";

// tslint:disable-next-line:interface-name
export interface UserDTO {
    id?: number;
    name: string;
    username?: string;
    email: string;
    photo: string;
    password?: string;
    posts: Post[];
    role: Role;
    createdAt: Date;
    updatedAt: Date;
}

@Entity({name: "users"})
@Unique(["username", "email"])
export class User implements UserDTO {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public username?: string;

    @Column({length: 150, nullable: false})
    public email: string;

    @Column({length: 200, nullable: false})
    public photo: string;

    @Column({length: 150, nullable: false})
    public password: string;

    @OneToMany((type) => Post, (post) => post.user, {
        cascade: true,
        eager: true,
    })
    public posts: Post[];

    @ManyToOne((type) => Role, (role) => role.users, {
        onUpdate: "CASCADE",
        // tslint:disable-next-line:object-literal-sort-keys
        onDelete: "CASCADE",
        eager: true,
    })
    public role: Role;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
