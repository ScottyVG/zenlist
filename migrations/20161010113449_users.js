'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments();
    table.string('user_id', 255).notNullable().defaultTo('');
    table.string('firstName', 255).notNullable().defaultTo('');
    table.string('lastName', 255).notNullable().defaultTo('');
    table.string('email', 255).notNullable().defaultTo('');
    table.specificType('hashed_password', 'character(60)').notNullable();
    table.timestamps(true, true)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};
