'use strict'

var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var humps = require('humps');

function validPassword(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

function createUser(req, res) {
  const hash = bcrypt.hashSync(req.body.password, 12);
  knex('users')
    .where('email', req.body.email)
    .first()
    .then((user) => {
      if (!user) {
        console.log('email, pass', req.body.email, req.body.password);
        let newUser = {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          hashedPassword: hash
        }
        console.log(newUser);
        return knex('users')
          .insert((newUser), '*');
      }
      return next(err)
    })
    .then((rows) => {
      if (!rows) {
        return next(err)
      }
      console.log('createUsers row', rows);
      var nUser = rows[0];
      req.login(nUser, function() {
        return res.redirect('/users');
      })
    })
    .catch((err) => {
      return (err);
    });
}


function createLists(req, res) {
  var newList = {
    title: req.body.title,
    description: req.body.description,
    priorityLevel: req.body.priorityLevel,
    user_id: req.user.id

  }
  knex('lists')
    .insert(newList, '*')
    .then((list) => {
      console.log('the crearted list', list);
      res.redirect('/users')
    })
    .catch((err) => {
      return err;
    })
}

function createTasks(req, res) {
  knex('lists')
    .where({
      'title': req.body.title,
      'user_id': req.user.id
    })
    .first()
    .then((list) => {
      console.log('list', list);
      var newTask = {
          task: req.body.task,
          user_id: list.user_id,
          list_id: list.id
        }
        // if(!list){
        //   return next(err)
        // }
      console.log(newTask);
      knex('tasks')
        .insert(newTask, '*')
        .then(() => {
          res.redirect('/users')
        })
    })
    .catch((err) => {
      return err;
    })
}

function editLists(req, res) {
  console.log(req.body);
  knex('lists')
    .where({
      'title': req.body.titleToEdit,
      'user_id': req.user.id
    })
    .first()
    .then((list) => {
      console.log(list);
      // delete req.body.titleToEdit;
      var {
        title,
        description,
        priorityLevel
      } = req.body;
      var editedList = {};

      if (title) {
        editedList.title = req.body.title
      }
      if (description) {
        editedList.description = req.body.description
      }
      if (priorityLeve) {
        editedList.priorityLevel = req.body.priorityLevel
      }
      return knex('lists')
        .update(editedList, '*')
        .where({
          'title': req.body.titleToEdit,
          'user_id': req.user.id
        })
        .then(() => {
          res.redirect('/user')
        })
    })
    .catch((err) => {
      return err
    })
}
module.exports = {
  validPassword,
  createUser,
  isLoggedIn,
  createLists,
  createTasks,
  editLists
};
