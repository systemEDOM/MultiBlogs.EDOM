import { Entity, Unique, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Role } from "./Role";

export interface PermissionDTO {
    id?: number;
    name: string;
    slug?: string;
    roles: Role[];
    createdAt: Date;
    updatedAt: Date;
}

@Entity({name: "permissions"})
@Unique(["name", "slug"])
export class Permission implements PermissionDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    name: string;

    @Column({length: 150, nullable: false})
    slug?: string;

    @ManyToMany(type => Role, role => role.permissions)
    roles: Role[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
