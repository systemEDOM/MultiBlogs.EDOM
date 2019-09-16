import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate} from "typeorm";
import slugify from 'slugify';

export interface DomainDTO {
    id?: number;
    name: string;
    slug: string;
    url?: string;
    createdAt: Date;
    updatedAt: Date;
}


@Entity({name: "domains"})
export class Domain implements DomainDTO {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column({length: 150})
    slug: string;

    @Column({length: 150})
    url: string;

    @CreateDateColumn({type: "timestamp"})
    createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    updatedAt: Date;

    @BeforeInsert()
    public beforeInsert(): void {
        this.slug = slugify(this.name);
    }

    @BeforeUpdate()
    public beforeUpdate(): void {
        this.slug = slugify(this.name);
    }
}
