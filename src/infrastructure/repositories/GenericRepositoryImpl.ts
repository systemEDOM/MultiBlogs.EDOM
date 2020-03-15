import {injectable, unmanaged} from "inversify";
import {Repository as TypeOrmRepository} from "typeorm";
import {Repository} from "../../core/domain/interfaces/Repository";

@injectable()
export class GenericRepositoryImpl<EntityDTO, EntityORM> implements Repository<EntityDTO> {

    private readonly repository: TypeOrmRepository<EntityORM>;

    public constructor(@unmanaged() repository: TypeOrmRepository<EntityORM>) {
        this.repository = repository;
    }

    public async create(entity: EntityDTO): Promise<EntityDTO> {
        const model = await this.repository.create(entity);
        await this.repository.save(model);
        return model;
    }

    public async delete(id: number): Promise<EntityDTO> {
        const entity = await this.repository.findOneOrFail(id);
        await this.repository.delete(id);
        return this.dataMapper.toDomain(entity);
    }

    public async findAll(): Promise<EntityDTO[]> {
        const entities = await this.repository.find();
    }

    public async findById(id: number): Promise<EntityDTO> {
        const entity = await this.repository.findOneOrFail(id);
    }

    public async update(id: number, entity: EntityDTO): Promise<EntityDTO> {
        await this.repository.update(id, entity);
        const entityORM = await this.repository.findOneOrFail(id);
    }
}
