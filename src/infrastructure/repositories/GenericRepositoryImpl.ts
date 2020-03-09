import {injectable, unmanaged} from "inversify";
import {Repository as TypeOrmRepository} from "typeorm";
import {Repository} from "../../core/domain/interfaces/Repository";
import {EntityDataMapper} from "../interfaces/EntityDataMapper";

@injectable()
export class GenericRepositoryImpl<EntityDTO, EntityORM> implements Repository<EntityDTO> {

    private readonly repository: TypeOrmRepository<EntityORM>;
    private readonly dataMapper: EntityDataMapper<EntityDTO, EntityORM>;

    public constructor(@unmanaged() repository: TypeOrmRepository<EntityORM>,
                       @unmanaged() dataMapper: EntityDataMapper<EntityDTO, EntityORM>) {
        this.repository = repository;
        this.dataMapper = dataMapper;
    }

    public async create(entity: EntityDTO): Promise<EntityDTO> {
        // const model = this.dataMapper.toORMEntity(entity);
        const model = await this.repository.create(entity);
        const entityDTO = await this.repository.save(model);
        return this.dataMapper.toDomain(entityDTO);
    }

    public async delete(id: number): Promise<EntityDTO> {
        const entity = await this.repository.findOneOrFail(id);
        await this.repository.delete(id);
        return this.dataMapper.toDomain(entity);
    }

    public async findAll(): Promise<EntityDTO[]> {
        const entities = await this.repository.find();
        return entities.map((e) => this.dataMapper.toDomain(e));
    }

    public async findById(id: number): Promise<EntityDTO> {
        const entity = await this.repository.findOneOrFail(id);
        return this.dataMapper.toDomain(entity);
    }

    public async update(id: number, entity: EntityDTO): Promise<EntityDTO> {
        await this.repository.update(id, entity);
        const entityORM = await this.repository.findOneOrFail(id);
        return this.dataMapper.toDomain(entityORM);
    }
}
