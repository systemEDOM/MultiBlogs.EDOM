// tslint:disable-next-line:max-line-length
import {BaseEntity, BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

// tslint:disable-next-line:interface-name
export interface DomainDTO {
    id?: number;
    name: string;
    slug?: string;
    url?: string;
    createdAt: Date;
    updatedAt: Date;
}

@Entity({name: "domains"})
export class Domain implements DomainDTO {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug?: string;

    @Column({length: 150, nullable: false})
    public url: string;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
