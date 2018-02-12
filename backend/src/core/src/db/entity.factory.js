const uuidv4 = require('uuid/v4');
const R = require('ramda');

let entityFactory = (typeModel, obj) => {
  let entity = R.clone(obj);
  if(!entity._id) {
    entity._id = uuidv4();
    entity.typeModel = typeModel;
    entity.createdAt = new Date();
  }
  entity.updatedAt = new Date();
  return entity;
};

module.exports = entityFactory;