const Domain = require('../models').Domain;
const DomainRepository = require('../repositories/DomainRepository');

let domainRepository = new DomainRepository(Domain); 

module.exports = {
    index: (req, res) => {
        domainRepository.all().then(domains => res.status(200).json(domains))
        .catch(error => res.status(400).json(error.message));
    },
    store: (req, res) => {
        domainRepository.create(req.body).then(domain => res.status(200).json(domain))
        .catch(error => res.status(400).json(error.message));
    },
    show: (req, res) => {
        domainRepository.getById(req.params.id).then(domain => res.status(200).json(domain))
        .catch(error => res.status(400).json(error.message));
    },
    update: (req, res) => {
        domainRepository.update(req.body, req.params.id).then(domain => res.status(200).json(domain))
        .catch(error => res.status(200).json(error.message));
    },
    destroy: (req, res) => {
        domainRepository.destroy(req.params.id).then(elementsDeleted => res.status(200).json(elementsDeleted))
        .catch(error => res.status(400).json(error.message));
    }
};