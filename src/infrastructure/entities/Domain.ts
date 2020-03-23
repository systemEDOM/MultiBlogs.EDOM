import { Column, CreateDateColumn, Entity, EntitySchema, PrimaryGeneratedColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { DomainDTO } from "../../core/domain/entities/DomainDTO";
import slugify from "slugify";

@Entity({ name: "domains" })
export class Domain extends EntitySchema<DomainDTO> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 100, nullable: false })
    public name: string;

    @Column({ length: 150, nullable: false })
    public slug: string;

    @Column({ length: 150, nullable: false })
    public url: string;

    @CreateDateColumn({ type: "timestamp" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp" })
    public updatedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    public generateSlug = () => this.slug = slugify(this.name);
}
