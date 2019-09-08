const slug = require('slug');
const UseCaseGetUsers = require('../usescases/users/getUsersUseCase');
const UseCaseSaveUser = require('../usescases/users/saveUserUseCase');
const UseCaseUpdateUser = require('../usescases/users/updateUserUseCase');
const UseCaseFindUser = require('../usescases/users/findUserUseCase');
const UseCaseFindUserByUsername = require('../usescases/users/findUserByUsernameUseCase');
const UseCaseDeleteUser = require('../usescases/users/deleteUserUseCase');


module.exports = {
    index: (req, res) => {
        UseCaseGetUsers.handle().then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error.message));
    },
    store: (req, res) => {
        UseCaseSaveUser.handle(req.body).then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error.message));
    },
    show: (req, res) => {
        UseCaseFindUser.handle(req.params.id).then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error.message));
    },
    showByUsername: (req, res) => {
        UseCaseFindUserByUsername.handle(slug(req.params.username)).then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error.message));
    },
    update: (req, res) => {
        UseCaseUpdateUser.handle(req.body, req.params.id).then(user => res.status(200).json(user))
        .catch(error => res.status(200).json(error.message));
    },
    destroy: (req, res) => {
        UseCaseDeleteUser.handle(req.params.id).then(elementsDeleted => res.status(200).json(elementsDeleted))
        .catch(error => res.status(400).json(error.message));
    }
};