// tslint:disable-next-line:max-line-length
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

// tslint:disable-next-line:interface-name
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
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug?: string;

    @ManyToMany((type) => Permission, (permission) => permission.roles, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: "roles_permissions",
        // tslint:disable-next-line:object-literal-sort-keys
        joinColumn: {
            name: "roleId",
            referencedColumnName: "id",
        },
        inverseJoinColumn: {
            name: "permissionId",
            referencedColumnName: "id",
        },
    })
    public permissions: Permission[];

    @OneToMany((type) => User, (user) => user.role, {
        cascade: true,
    })
    public users: User[];

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
