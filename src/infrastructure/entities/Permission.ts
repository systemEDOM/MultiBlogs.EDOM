// tslint:disable-next-line:max-line-length
import {
    Column,
    CreateDateColumn,
    Entity,
    EntitySchema,
    ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import {PermissionDTO} from "../../core/domain/entities/PermissionDTO";
import { Role } from "./Role";

@Entity({name: "permissions"})
@Unique(["name", "slug"])
export class Permission extends EntitySchema<PermissionDTO> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug: string;

    @ManyToMany((type) => Role, (role) => role.permissions)
    public roles: Role[];

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
