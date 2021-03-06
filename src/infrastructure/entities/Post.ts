import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    EntitySchema,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import {PostDTO} from "../../core/domain/entities/PostDTO";
import { User } from "./User";
import slugify from "slugify";

@Entity({name: "posts"})
@Unique(["name", "slug"])
export class Post extends EntitySchema<PostDTO> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public slug: string;

    @Column({length: 150, nullable: false})
    public image: string;

    @Column({length: 150, nullable: false})
    public description: string;

    @Column({type: "text", nullable: false})
    public content: string;

    @ManyToOne( type => User, user => user.posts, {
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
    })
    public user: User;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;

    @BeforeInsert()
    public generateSlug = () => this.slug = slugify(this.name);
}
