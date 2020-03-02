// tslint:disable-next-line:interface-name
export interface RepositoryInterface {
    /**
     * Here i can add more methods for general use
     */
    findAll();
    create(entity: Object);
    findById(id: number);
    update(id: number, entity: Object);
    delete(id: number);
}
