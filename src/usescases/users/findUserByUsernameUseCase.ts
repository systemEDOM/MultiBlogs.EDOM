const User = require('../../models').User;
const UserRepository = require('../../repositories/UserRepository');

let userRepository = new UserRepository(User);

module.exports = {
    handle: (username) => {
        return userRepository.getByUsername(username);
    }
}