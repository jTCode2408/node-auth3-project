const db = require('../data/dbConfig');

module.exports = {
  add,
  find,
  findBy,
  findById,
};

function find() {
  return db('authUsers').select('id', 'username', 'password', 'department');
}

function findBy(filter) {
  return db('authUsers').where(filter);
}

async function add(user) {
  const [id] = await db('authUsers').insert(user);

  return findById(id);
}

function findById(id) {
  return db('authUsers')
    .where({ id })
    .first();
}