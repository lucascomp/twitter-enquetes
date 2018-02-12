const PouchDb = require("pouchdb");
PouchDb.plugin(require('pouchdb-find'));
PouchDb.plugin(require('pouchdb-upsert'));
PouchDb.plugin(require('pouchdb-adapter-memory'));

module.exports = (dbname, config) => () => new PouchDb(dbname, config);