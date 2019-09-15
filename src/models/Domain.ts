import * as Sequelize from 'sequelize';

export interface DomainAttributes {
    id?: number;
    name: string;
    url: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DomainInterface extends Sequelize.Instance<DomainInterface, DomainAttributes> {
};

export const User = sequelize.define<DomainInterface, DomainAttributes>('domain', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    email: Sequelize.STRING,
    password: Sequelize.STRING
})