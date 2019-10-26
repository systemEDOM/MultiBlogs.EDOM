import { Entity, Unique, CreateDateColumn, UpdateDateColumn, Column, PrimaryGeneratedColumn } from "typeorm";

export interface PermissionDTO {
    id?: number;
    name: string;
    slug?: string;
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

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;
}
