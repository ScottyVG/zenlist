process.env.NODE_ENV = 'dev';

const request = require('supertest');
const expect = require('chai').expect;
const app = require('../app');
const knex = require('../db/knex');

beforeEach(done => {
  Promise.all([
    knex('users').insert({
      id: 1,
      firstName: 'Jerry',
      lastName: 'Seinfeld',
      email: 'jerry@comedians.com',
      password: 'secret1'
    }),
    knex('users').insert({
      id: 2,
      firstName: 'Elaine',
      lastName: 'Benes',
      email: 'elaine@peterman.com',
      password: 'secret2'
    }),
    knex('users').insert({
      id: 3,
      firstName: 'George',
      lastName: 'Costanza',
      email: 'George@yankees.com',
      password: 'secret3'
    }),
    knex('users').insert({
      id: 4,
      firstName: 'Kramer',
      lastName: 'Kramer',
      email: 'Kramer@Kramer.com',
      password: 'secret4'
    })
  ]).then(() => done());
});

afterEach(done => {
  knex('users').del().then(() => done())
});

describe('GET /users', () => {
  it('responds with JSON', done => {
    request(app)
      .get('/users')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('returns an array of all user objects when responding with JSON', done => {
    request(app)
      .get('/users')
      .end((err, res) => {
        expect(res.body).to.deep.equal([{
          id: 1,
          firstName: 'Jerry',
          lastName: 'Seinfeld',
          email: 'jerry@comedians.com',
          password: 'secret1'
        }, {
          id: 2,
          firstName: 'Elaine',
          lastName: 'Benes',
          email: 'elaine@peterman.com',
          password: 'secret2'
        }, {
          id: 3,
          firstName: 'George',
          lastName: 'Costanza',
          email: 'George@yankees.com',
          password: 'secret3'
        }, {
          id: 4,
          firstName: 'Kramer',
          lastName: 'Kramer',
          email: 'Kramer@Kramer.com',
          password: 'secret4'
        }]);
        done();
      });
  });
});

describe('GET /users/:id', () => {
  it("check first users json object", (done) => {
    request(app)
      .get('/users/1')
      .end((err, res) => {
        expect(res.body).to.deep.equal({
          id: 1,
          firstName: 'Jerry',
          lastName: 'Seinfeld',
          email: 'jerry@comedians.com',
          password: 'secret1'
        });
        done();
      });
  });
});

describe('POST /users', () => {

  var newUser = {
    user: {
      id: 5,
      firstName: 'Newman',
      lastName: 'Newman',
      email: 'newman@usps.gov',
      password: 'secret5'
    }
  };

  it('responds with JSON', done => {
    request(app)
      .post('/users')
      .type('form')
      .send(newUser)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('adds the new user to the database', done => {
    request(app)
      .post('/users')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        knex('user').select().then(users => {
          expect(users).to.have.lengthOf(5);
          expect(users).to.deep.include(newUser.user);
          done();
        });
      });
  });

});

describe('PUT /user/:id', () => {

  var updatedUser = {
    user: {
      firstName: 'Super',
      lastName: 'Man',
      email: 'jerryseinfeld@comedians.com'
    }
  };

  it('responds with JSON', done => {
    request(app)
      .put('/users/1')
      .type('form')
      .send(updatedUser)
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('updates the user in the database', done => {
    request(app)
      .put('/users/1')
      .type('form')
      .send(updatedUsers)
      .end((err, res) => {
        knex('users').where('id', 1).first().then(user => {
          expect(user.firstName).to.equal(updatedUser.user.firstNameame);
          expect(user.lastName).to.equal(updatedUser.user.age);
          expect(user.email).to.equal(updatedUser.user.email);
          done();
        });
      });
  });

});

describe('DELETE /users/:id', (done) => {
  it('responds with JSON', done => {
    request(app)
      .del('/users/1')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect((res) => {
        delete res.body.createdAt;
        delete res.body.updatedAt;
      })
      .expect(200, {
        id: 1,
        firstName: 'Jerry',
        lastName: 'Seinfeld',
        email: 'jerry@comedians.com',
        password: 'secret1'
      }, done);
  });
});
