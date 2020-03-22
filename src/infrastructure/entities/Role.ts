import {
    Column,
    CreateDateColumn,
    Entity,
    EntitySchema,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import {RoleDTO} from "../../core/domain/entities/RoleDTO";
import {Permission} from "./Permission";
import { User } from "./User";

@Entity({name: "roles"})
@Unique(["name", "slug"])
export class Role extends EntitySchema<RoleDTO> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug?: string;

    @ManyToMany( type => Permission, permission => permission.roles, {
        cascade: true,
        eager: true,
    })
    @JoinTable({
        name: "roles_permissions",
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

    @OneToMany( type => User, user => user.role, {
        cascade: true,
    })
    public users: User[];

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
