const User = require('../../models').User;
const UserRepository = require('../../repositories/UserRepository');

let userRepository = new UserRepository(User);

module.exports = {
    handle: (data, id) => {
        return userRepository.update(data, id);
    }
}