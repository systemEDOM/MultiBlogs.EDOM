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

    @ManyToMany(type => Permission, permission => permission.roles, {
        cascade: true,
        eager: true
    })
    @JoinTable({
        name: "roles_permissions",
        joinColumn: {
            name: "roleId",
            referencedColumnName: "id"
        },
        inverseJoinColumn: {
            name: "permissionId",
            referencedColumnName: "id"
        }
    })
    permissions: Permission[];

    @OneToMany(type => User, user => user.role, {
        cascade: true,
    })
    users: User[];

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
