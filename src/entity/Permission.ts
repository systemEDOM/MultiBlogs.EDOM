// tslint:disable-next-line:max-line-length
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Role } from "./Role";

// tslint:disable-next-line:interface-name
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
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug?: string;

    @ManyToMany((type) => Role, (role) => role.permissions)
    public roles: Role[];

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
