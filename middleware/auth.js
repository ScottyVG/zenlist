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
            'id': req.params.id,
            'user_id': req.user.id
        })
        .first()
        .then((list) => {
            // console.log('list', list);
            var newTask = {
                    title: req.body.title,
                    task: req.body.task,
                    user_id: list.user_id,
                    list_id: list.id
                }
                // console.log(newTask);
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
            'id': req.params.id,
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

function editTasks(req, res) {
    console.log(req.body);
    knex('tasks')
        .where({
            'id': req.params.id,
            'user_id': req.user.id
        })
        .first()
        .then((tasks) => {

            const {
                title,
                task
            } = req.body;

            // console.log('unedited list', list);
            // console.log(title, description, priorityLevel);
            // var list_id = list.id;
            if (title) {
                tasks.title = title
            }
            if (task) {
                tasks.task = task
            }

            var editedList = task;
            // delete editedList.id
            // console.log('edited list', list);
            knex('tasks')
                .update(editedList, '*')
                .where({
                    'id': req.params.id,
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

function renderUserObj(req, res) {
    var user = {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        email: req.user.email
    }
    var tasks
    var lists
        // console.log(tasks);
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
                    var userObj = [lists, tasks];
                    console.log('function', userObj);
                    return userObj

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

function getLists(req, res) {
    knex('lists')
        .where({
            'user_id': req.user.id
        })
        .then((lists) => {
            console.log('function', lists);
            return lists
        })
        .catch((err) => {
            return err
        })
}

function getTasks(req, res) {
    knex('lists')
        .where({
            'list_id': req.params.id
        })
        .then((lists) => {
            console.log('function', lists);
            return lists
        })
        .catch((err) => {
            return err
        })
}

function deleteTasks(req, res) {
    knex('tasks')
        .where({
            'id': req.params.id
        })
        .first()
        .then((task) => {
            if (!task) {
                return next()
            }
            return knex('task')
                .del()
                .where({
                    'id': req.params.id
                })

        })
        .then(() => {
            res.redirect('/users')
        })
        .catch((err) => {

        })
}

function deleteLists(req, res) {
    knex('lists')
        .where({
            'id': req.params.id
        })
        .first()
        .then((list) => {
            if (!list) {
                return next()
            }
            return knex('lists')
                .del()
                .where({
                    'id': req.params.id
                })

        })
        .then(() => {
            res.redirect('/users')
        })
        .catch((err) => {

        })
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
    var userLists = []
    knex('lists')
        .where('lists.user_id', req.user.id)
        .then(lists => {
                knex('tasks')
                    .where('tasks.user_id', req.user.id)
                    .then(tasks => {
                            lists.forEach(list => {
                                    list.listTasks = [];
                                    tasks.forEach(task => {
                                            if (task.list_id == list.id) {
                                                list.listTasks.push(task)
                                            }
                                        })
                                        userLists.push(list);
                                        // console.log('usersLists', userLists);
                                        // console.log('tasks',list.listTasks);
                                    })

                                    console.log('userLists',userLists);
                                    res.render('users',{userLists})
                            })
                    })


            //     knex('lists')
            //     .innerJoin('tasks','lists.user_id', 'tasks.user_id')
            //     .where({
            //       'tasks.user_id': req.user.id,
            //       'lists.user_id': req.user.id
            //     })
            //     .then((tasks) => {
            //           console.log('testjoin',tasks);
            //             // console.log(tasks);
            // // return tasks
            //         })
            //         .catch((err) => {
            //             return err
            //         })
        }

    module.exports = {

        validPassword,
        createUser,
        isLoggedIn,
        createLists,
        createTasks,
        editLists,
        renderUserObj,
        testforjoin
        // getLists

    };
