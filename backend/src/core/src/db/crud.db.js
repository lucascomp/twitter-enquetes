const createPouchDb = require('./pouch-db.factory');
const createEntity = require('./entity.factory');
const R = require('ramda');
const config = require('../../../../resources/config.json');
const path = require("path");
const mapper = require('./doc.mapper');

class CrudDB {

    constructor(dbpath) {
        this._db = createPouchDb(dbpath)();
    }

    createIndex(index) {
        return this._db.createIndex(index);
    }

    get(typeModel, _id) {
        return this._db.get(_id);
    }
    
    getAll(typeModel) {
        return this._db.allDocs({
            include_docs: true
        })
            .then((result) => mapper(result.rows, typeModel));
    }

    put(typeModel, obj) {
        const entity = createEntity(typeModel, obj);
        return this._db.put(entity);
    }

    delete(typeModel, _id) {
        return new Promise((resolve, reject) => {
            this._db.get(_id)
                .then((entity) => {
                    this._db.remove(entity).then(resolve, reject);
                }).catch(reject);
        });
    }

    listenChanges(filter, callback) {
        this._db.changes({
            since: 'now',
            live: true,
            include_docs: true,
            filter: filter
        })
            .on('change', (changes) => callback(changes.doc));
    }

}

module.exports = (dbname) => new CrudDB(path.resolve(config.basePath, 'db', dbname));