import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, BaseEntity} from "typeorm";
import slugify from 'slugify';

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
    id: number;

    @Column({length: 100, nullable: false})
    name: string;

    @Column({length: 150, nullable: false})
    slug?: string;

    @Column({length: 150, nullable: false})
    url: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    public beforeUpdate() {
        this.slug = slugify(this.name);
    }
}
