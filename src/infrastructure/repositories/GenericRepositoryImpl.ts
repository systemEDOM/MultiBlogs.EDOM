import {injectable, unmanaged} from "inversify";
import {Repository} from "typeorm";
import {GenericRepository} from "../../core/domain/interfaces/GenericRepository";
import slugify from "slugify";


@injectable()
export class GenericRepositoryImpl<EntityDTO, EntityORM> implements GenericRepository<EntityDTO> {

    public readonly repository: Repository<EntityORM>;

    public constructor(@unmanaged() repository: Repository<EntityORM>) {
        this.repository = repository;
    }

    public async create(entity: EntityDTO): Promise<EntityORM> {
        const model = this.repository.create(entity);
        return await this.repository.save(model);
    }

    public async delete(id: number): Promise<EntityORM> {
        const entity = await this.repository.findOneOrFail(id);
        await this.repository.delete(id);
        return entity;
    }

    public async findAll(): Promise<EntityORM[]> {
        return await this.repository.find();
    }

    public async findById(id: number): Promise<EntityORM> {
        return await this.repository.findOneOrFail(id);
    }

    public async update(id: number, entity: EntityDTO): Promise<EntityORM> {
        const e = await this.repository.findOneOrFail(id);
        Object.keys(entity).forEach(key => {
            e[key] = entity[key];
            if (key == "name") {
                e["slug"] = slugify(entity[key]);
            }
        });
        return await this.repository.save(e);
    }
}
