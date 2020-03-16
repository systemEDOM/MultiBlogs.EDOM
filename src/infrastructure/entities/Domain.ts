// tslint:disable-next-line:max-line-length
import {Column, CreateDateColumn, Entity, EntitySchema, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {DomainDTO} from "../../core/domain/entities/DomainDTO";

@Entity({name: "domains"})
export class Domain extends EntitySchema<DomainDTO> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug: string;

    @Column({length: 150, nullable: false})
    public url: string;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;
}
