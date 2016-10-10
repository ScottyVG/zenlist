'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/zenlist_dev'
  },

  test: {
    client: 'pg',
    connection: 'postgres://localhost/zenlist_test'
  }
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  },
};
