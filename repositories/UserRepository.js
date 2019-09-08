class UserRepository {
    constructor(model) {
        this.model = model;
    }

    all() {
        return this.model.findAll();
    }

    create(data) {
        return this.model.create(data);
    }

    getById(id) {
        return this.model.findByPk(id);
    }

    getByUsername(username) {
        return this.model.findOne({
            where: {username}
        });
    }

    update(data, id) {
        return this.model.update(data, {
            where: {id}
        });
    }

    destroy(id) {
        return this.model.destroy({
            where: {id}
        });
    }
}

module.exports = UserRepository;