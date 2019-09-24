import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity, Unique} from "typeorm";

export interface UserDTO {
    id?: number;
    name: string;
    username?: string;
    email: string;
    photo: string;
    password?: string;
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

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
