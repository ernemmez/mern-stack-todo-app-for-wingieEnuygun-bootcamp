const express = require('express');
const Todo = require('../models/TodoModel');
require('dotenv').config();
const router = express.Router(); // import the router
const Joi = require('@hapi/joi'); //For Check datas


const addTodoSchema = Joi.object({ //For Check datas
    title: Joi.string().required(),
    text: Joi.string(),
    byUsername: Joi.string().required(),
    addedDate:Joi.string(),
    toBeCompDate:Joi.string(),
});


//FETCH Todos
router.get('/', (req, res) => { //  todos/  
    Todo.find()
    .then(todos => {
        res.json(todos);
    }).catch(err => {
        res.send(err);
    })
})

router.get('/:id', (req, res) => { // todos/:id  
    Todo.findById(req.params.id)
    .then(todo => {
        res.json(todo);
    }).catch(err => {
        res.send(err);
    })
})


//CREATE Todo
router.post('/add', (req, res) => { // todos/add 

    const { error } = addTodoSchema.validate(req.body); // validate the request body
    if(error) { // if error
        res.status(400).send(error.details[0].message); // send the error
        return;
    }
    else{
        const todo = new Todo({  // create a new todo
            ...req.body,
            status:false
        });
        todo.save() // save the db todo
        .then(() => {
            res
           .json({ // send the todo
               message: 'Todo Added Succesfull: ',
               todo,
           }); 
            
        }).catch((err) => {
            res.json(err);
        })

    }
})


//UPDATE Todo
router.put('/update/:id', (req, res) => { // todos/update/:id 
    Todo.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            text: req.body.text,
            toBeCompDate:req.body.toBeCompDate,
            updated:true,
            status:req.body.status
        }
    })
    .then(() => {
        res.send('Todo Updated: ' + req.body.title);
    }).catch((err) => {
        res.send(err);
    })
})


//DELETE Todo
router.delete('/delete/:id', (req, res) => { // todos/delete/:id
    Todo.findByIdAndRemove(req.params.id)
    .then(() => {
        res.send('Todo Deleted.');
    }).catch((err) => {
        res.send(err);
    })
})

module.exports = router;