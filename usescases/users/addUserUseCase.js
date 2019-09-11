const User = require('../../models').User;
const UserRepository = require('../../repositories/UserRepository');

class AddUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    handle($data) {
        return this.repository.create($data);
    }
}

module.exports = AddUserUseCase;