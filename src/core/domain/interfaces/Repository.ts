// tslint:disable-next-line:interface-name
export interface Repository<T> {
    findAll(): Promise<any[]>;
    create(entity: T): Promise<any>;
    findById(id: number): Promise<any>;
    update(id: number, entity: T): Promise<any>;
    delete(id: number): Promise<any>;
    /**
     * Here i can add more methods for general use
     */
}
