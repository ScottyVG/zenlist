'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('lists', (table) => {
    table.increments();
    table.string('title')
      .notNullable()
      .defaultTo('');
    table.text('description')
      .notNullable()
      .defaultTo('');
    table.integer('priorityLevel')
      .notNullable()
      .defaultTo(1);
    table.integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.text('description', 10000);
    table.integer('lat');
    table.integer('lng');
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('lists');
};
