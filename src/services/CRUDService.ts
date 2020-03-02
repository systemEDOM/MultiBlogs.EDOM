// tslint:disable-next-line:interface-name
export interface CRUDService {
    /**
     * Here i can add more methods for general use
     */
    findAll();
    // tslint:disable-next-line:ban-types
    create(entity: Object);
    findById(id: number);
    // tslint:disable-next-line:ban-types
    update(id: number, entity: Object);
    delete(id: number);
}