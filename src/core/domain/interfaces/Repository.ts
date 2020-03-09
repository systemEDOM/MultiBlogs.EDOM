// tslint:disable-next-line:interface-name
export interface Repository<T> {
    findAll(): Promise<T[]>;
    create(entity: T): Promise<T>;
    findById(id: number): Promise<T>;
    update(id: number, entity: T): Promise<T>;
    delete(id: number): Promise<T>;
    /**
     * Here i can add more methods for general use
     */
}
