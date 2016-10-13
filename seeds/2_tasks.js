/* eslint-disable camelcase, max-len */

'use strict';

exports.seed = function(knex) {
  return knex('tasks').del()
    .then(() => {
      return knex('tasks').insert([{
        id: 1,
        title: 'Hammers',
        task: "Buy hammers",
        user_id: 1,
        list_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 2,
        title: 'Nails',
        task: "Buy nails",
        user_id: 1,
        list_id: 1,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 3,
        title: 'Bananas',
        task: "Buy Bananas",
        user_id: 1,
        list_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 4,
        title: 'Coconuts',
        task: "Buy coconuts",
        user_id: 1,
        list_id: 2,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 5,
        title: 'finish q2 project',
        task: "Get her done",
        user_id: 1,
        list_id: 3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 6,
        title: 'graduate to Q3',
        task: "complete all Q2 params",
        user_id: 1,
        list_id: 3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }, {
        id: 7,
        title: 'Beer',
        task: "go drink a beer with friends",
        user_id: 1,
        list_id: 3,
        created_at: new Date('2016-06-26 14:26:16 UTC'),
        updated_at: new Date('2016-06-26 14:26:16 UTC')
      }]);
    })
    .then(() => {
      // return knex.raw(
      //   "SELECT setval('zenlist_dev', (SELECT MAX(id) FROM lists));"
      // );
    });
};
