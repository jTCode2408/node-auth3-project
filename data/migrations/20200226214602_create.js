//user info table needs username, pass, dept(string, add index prop(?) for querying easier on this column)
exports.up = function(knex) {
    return knex.schema.createTable('authUsers', tbl => {
        tbl.increments()
        tbl.text('username', 155)
            .notNullable()
            .unique()
        
        tbl.text('password')
            .notNullable()
        
        tbl.string('department')
            .notNullable()
            .index()    
  })

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('authUsers')
};
