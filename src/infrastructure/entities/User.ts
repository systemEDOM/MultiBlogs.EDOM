// tslint:disable-next-line:max-line-length
import {
    Column,
    CreateDateColumn,
    Entity,
    EntitySchema,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
    BeforeInsert,
    AfterLoad,
    BeforeUpdate,
} from "typeorm";
import {UserDTO} from "../../core/domain/entities/UserDTO";
import { Post } from "./Post";
import { Role } from "./Role";
import slugify from "slugify";
import * as bcrypt from "bcrypt";

@Entity({name: "users"})
@Unique(["username", "email"])
export class User extends EntitySchema<UserDTO> {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({length: 100, nullable: false})
    public name: string;

    @Column({length: 150, nullable: false})
    public username?: string;

    @Column({length: 150, nullable: false})
    public email: string;

    @Column({length: 200, nullable: false})
    public photo: string;

    @Column({length: 150, nullable: false})
    public password: string;

    @OneToMany( type => Post, post => post.user, {
        cascade: true,
        eager: true,
    })
    public posts: Post[];

    @ManyToOne( type => Role, role => role.users, {
        onUpdate: "CASCADE",
        // tslint:disable-next-line:object-literal-sort-keys
        onDelete: "CASCADE",
        eager: true,
    })
    public role: Role;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;

    @BeforeInsert()
    public generateUsername = () => this.username = slugify(this.username);

    @BeforeInsert()
    public generatePasswordHash = () => bcrypt.hash(this.password, 10).then( result => this.password = result);
}
