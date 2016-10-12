'use strict'

var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var humps = require('humps');

function validPassword(password, dbPassword) {
  return bcrypt.compareSync(password, dbPassword);
}

function isLoggedIn(req, res, next) {
<<<<<<< HEAD
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
            'title': req.body.titletolist,
            'user_id': req.user.id
        })
        .first()
        .then((list) => {
            console.log('list', list);
            var newTask = {
                title: req.body.title,
                task: req.body.task,
                user_id: list.user_id,
                list_id: list.id
            }
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

            const {
                title,
                description,
                priorityLevel
            } = req.body;

            console.log('unedited list', list);
            console.log(title, description, priorityLevel);
            var list_id = list.id;
            if (title) {
                list.title = title
            }
            if (description) {
                list.description = description
            }
            if (priorityLevel) {
                list.priorityLevel = priorityLevel
            }
            var editedList = list;
            delete editedList.id
            console.log('edited list', list);
            knex('lists')
                .update(editedList, '*')
                .where({
                    'id': list_id,
                    'user_id': req.user.id
                })
                .then(() => {
                    res.redirect('/users')
                })
        })
        .catch((err) => {
            return err
        })
}

function renderUser(req, res) {
    var user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    }
    var tasks
    var lists
    console.log(tasks);
    knex('lists')
        .where({
            'user_id': req.user.id
        })
        .orderBy('id')
        .then((allLists) => {
            lists = allLists
            knex('tasks')
                .where({
                    'user_id': req.user.id
                })
                .orderBy('list_id')
                .then((task) => {
                    tasks = task
                    console.log('function', tasks);
                    res.render('users', {
                        user,
                        lists,
                        tasks
                    })
                })
                .catch((err) => {
                    return err
                })
        })
        .catch((err) => {
            return err
        })

    // console.log('this is the renderd list',lists);
}
/*
*******************************************************************************
**************  Note To Self - going to have to write custom handlebar helpers
****************************** to render the lists i believe
****************************** OR
**************               - going to have to make the innerjoin return something i can render staight in with hbs or maybe run a subquery

look in to see how ryan did it.......
*******************************************************************************
*/
function testforjoin(req, res) {
    knex('lists')
    .innerJoin('tasks','lists.user_id',req.user.id)
    .first()
    // .where({
    //   'tasks.list_id': 'lists.id',
    // })
        .then((tasks) => {
          console.log('testjoin',tasks);
            // console.log(tasks);
            return tasks
        })
        .catch((err) => {
            return err
        })
}
// function getLists(req,res){
//   knex('lists')
//     .where({'user_id':req.user.id})
//     .then((lists)=>{
//       console.log('function',lists);
//       return lists
//     })
//     .catch((err)=>{
//       return err
//     })
// }
// function editTasks(req,res){
//   console.log(req.body);
// knex('lists')
//   .where({'title':req.body.titleOfList,'user_id':req.user.id})
//   .first()
//   .then((list)=>{
//     var list_id = list.id;
//     // var editedList = list;
//     // delete editedList.id
//     console.log('edited list',list);
//     knex('tasks')
//     // .update(editedList,'*')
//     .where({'id':list_id,'user_id':req.user.id,'title':req.body.title})
//     .then((task)=>{
//       // res.redirect('/users')
//       const {title,tasks} = req.body;
//       if(title){
//         task.
//       }
//     })
//   })
//   .catch((err)=>{
//     return err
//   })
// }

/*

const {title,description,priorityLevel} = req.body;


if(title){
  list.title = title
}
if(task){
  list.task = description
}
if(priorityLevel){
  list.priorityLevel = priorityLevel
=======
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
>>>>>>> 3351c1a5dcf891f8c3df10b1a0bba37733dafa5c
}
************************************
knex('tasks')
.update(editedList,'*')
.where({'id':list_id,'user_id':req.user.id})
.then(()=>{
  res.redirect('/users')
})
*/
module.exports = {
<<<<<<< HEAD
    validPassword,
    createUser,
    isLoggedIn,
    createLists,
    createTasks,
    editLists,
    renderUser,
    testforjoin
    // getLists
=======
  validPassword,
  createUser,
  isLoggedIn,
  createLists,
  createTasks,
  editLists
>>>>>>> 3351c1a5dcf891f8c3df10b1a0bba37733dafa5c
};
