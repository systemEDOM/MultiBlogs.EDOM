import { Entity, Unique, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

export interface RoleDTO {
    id?: number;
    name: string;
    slug?: string;
    permissions: Permission[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
}

@Entity({name: "roles"})
@Unique(["name", "slug"])
export class Role implements RoleDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, nullable: false})
    name: string;

    @Column({length: 150, nullable: false})
    slug?: string;

    @ManyToMany(type => Permission)
    @JoinTable({name: "roles_permissions"})
    permissions: Permission[];

    @OneToMany(type => User, user => user.role, {
        cascade: true,
        eager: true,
    })
    users: User[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
