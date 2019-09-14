class SaveUserUseCase {
    constructor(repository) {
        this.repository = repository;
    }

    handle($data) {
        return this.repository.create($data);
    }
}

//module.exports = new SaveUserUseCase(repository);
//export default SaveUserUseCase;