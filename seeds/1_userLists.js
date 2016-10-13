/* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('lists').del()
    .then(() => {
      return knex('lists').insert([{
        id: 1,
        title: 'Home Depot',
        description: "Tools, hardware and stuff",
        priorityLevel: 1,
        user_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        title: 'Store',
        description: "Groceries",
        priorityLevel: 2,
        user_id: 1,
        created_at: new Date('2016-06-26 14:27:16 UTC'),
        updated_at: new Date('2016-06-26 14:27:16 UTC')
      }, {
        id: 3,
        title: 'G School',
        description: "galvanize homework and stuff",
        priorityLevel: 3,
        user_id: 1,
        created_at: new Date('2016-06-26 14:28:16 UTC'),
        updated_at: new Date('2016-06-26 14:28:16 UTC')
      }]);
    })
    .then(() => {
      // return knex.raw(
      //   "SELECT setval('zenlist_dev', (SELECT MAX(id) FROM lists));"
      // );
    });
};
