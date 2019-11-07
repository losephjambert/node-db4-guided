
exports.up = function (knex) {
  return knex.schema
    .createTable('species', table => {
      // the type of the Primary Key is: integer without negative values, also called unsigned
      table.increments()
      table.string('name', 255).notNullable()
    })
    .createTable('animals', table => {
      table.increments()
      table.string('name', 255).notNullable()

      // Foreign Key
      table
        .integer('species_id')
        .unsigned()
        .references('id')
        .inTable('species')
        .onDelete('RESTRICT') // about deleting the record from the primary key table -- `RESTRICT`, `NO ACTION`, `SET NULL`, `CASCADE`
        .onUpdate('CASCADE') // about changing the value of the primary key

      // we have bears and a few animals that are bears
    })
    .createTable('zoos', table => {
      table.increments() // id
      table.string('name', 255).notNullable()
      table.string('address', 255).notNullable()
    })
    .createTable('animal_zoos', table => {
      table.increments()
      table.date('from')
      table.date('to')

      // zoo foreign key
      table
        .integer('zoo_id')
        .unsigned()
        .references('id')
        .inTable('zoo')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')

      // species foreign key
      table
        .integer('species_id')
        .unsigned()
        .references('id')
        .inTable('species')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
    })
};

exports.down = function (knex) {

};
