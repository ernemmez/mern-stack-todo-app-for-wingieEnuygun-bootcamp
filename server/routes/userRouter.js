const express = require('express');
const User = require('../models/UserModel');
require('dotenv').config();
const Joi = require('@hapi/joi'); //For Check datas
const bcrypt = require('bcrypt'); //For encrypt password
const jwt = require('jsonwebtoken'); //For generate acces token
const router = express.Router(); // import the router



const userRegisterSchema = Joi.object({ //For Check datas
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(99).required(),
});
const userLoginSchema = Joi.object({ //For Check datas
    username: Joi.string(),
    password: Joi.string(),
    rememberMe: Joi.boolean()
});




//FETCH USERS
router.get('/users', (req, res) => { //users route
    User.find()
    .then(users => {
        res.json(users);
        console.log(users);
    }).catch(err => {
        res.send(err);
    })
})
router.get('/users/:id', (req, res) => { //users/:id route
    User.findById(req.params.id)
    .then(user => {
        res.json(user);
    }).catch(err => {
        res.send(err);
    })
})


//CREATE USERS
router.post('/user/createAccount', (req, res) => { //user create route
    const { error } = userRegisterSchema.validate(req.body); // validate the request body
    if(error) { // if error
        res.status(400).send(error.details[0].message); // send the error
        return;
    }else{
        const salt = bcrypt.genSaltSync(10); // generate salt
        const hashedPassword = bcrypt.hashSync(req.body.password, salt); // encrypt password

        const user = new User({  // create a new user
            ...req.body,
            password:hashedPassword,
        });
        user.save() // save the user
        .then(() => {
            const tkn = jwt.sign({_id: user._id}, process.env.USER_LOGIN_JWT); // generate acces token
               
            res
           .header('Authorization',tkn)
           .json({ // send the admin
               message: 'User Created Successful: ' + user.username,
               accesToken: tkn ,
               user,
           }); 
            
        }).catch((err) => {
            res.json(err);
        })

    }
})
router.post('/user/login', (req, res) => {
    const {username,password} = req.body;
    const { error } = userLoginSchema.validate(req.body); // validate the request body

    if(error) { // if error
        res.status(400).send(error.details[0].message); // send the error
        return;
    }else{
        User.findOne({username}) // find the user
        .then((user) => {
            if(!user) { // if user not found
                res.status(400).send('Invalid name or password!'); //name is wrong
                return;
            }else {
                const validPassword = bcrypt.compareSync(password, user.password); // compare the password
                if(!validPassword) { // if password is not valid
                    res.status(400).send('Invalid name or password!'); // password is wrong
                    return;
                }else { // if password and name is valid
                    const tkn = jwt.sign({_id: user._id}, process.env.USER_LOGIN_JWT); // generate acces token
                   
                    res
                   .header('Authorization',tkn)
                   .json({ // send the admin
                       message: 'Login Successful!',
                       accesToken: tkn,
                       user,
                   }); 
               }
            }
        }).catch((err) => { // if error
            res 
            .status(400)
            .send('Invalid Username or password!');
        })
    }
})

//UPDATE USERS
router.put('/users/:id', (req, res) => { //user update route
    User.findByIdAndUpdate(req.params.id, {
        $set: {
            username: req.body.username,
            password: req.body.password,
        }
    })
    .then(() => {
        res.send('User Updated' + req.body.username);
    }).catch((err) => {
        res.send(err);
    })
})


//DELETE USERS
router.delete('/users/:id', (req, res) => { //user delete route
    User.findByIdAndRemove(req.params.id)
    .then(() => {
        res.send('User Deleted');
    }).catch((err) => {
        res.send(err);
    })
})





module.exports = router;