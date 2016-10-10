'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('tasks', (table) => {
    table.increments();
    table.text('task', 255)
      .notNullable()
      .defaultTo('');
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .index();
    table.integer('list_id')
      .notNullable()
      .references('id')
      .inTable('lists')
      .onDelete('CASCADE')
      .index();
    table.text('description', 10000);
    table.timestamps(true, true);
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('tasks');
};
