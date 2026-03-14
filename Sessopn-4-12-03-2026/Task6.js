// 6. Service Layer Design Challenge
// You have this controller:]

async function createUser(req, res) {
    const user = await User.create(req.body);
    res.json(user);
}

// a) Why is this controller violating Separation of Concerns?
// Ans :- because in the controller we need to import the business logic from the services we don't need to write the business logic inside the controller so it violating Separation of Concerns.

// b) Refactor the architecture using Route, Controller, and Service.

// UserService :-

const User = require("../models/User");

async function createUser(req,res) {
    const user = await User.create(req.body);
    return user;
}

module.exports = { createUser };

// Controller :-

const userService = require("../Services/UserService");

async function createUser(req,res){
    try{
        const user = await userService.createUser(req.body);
        if(user){
            res.status(200).json(user);
        }else{
            throw new Error("User Can't create!!");
        }
    }catch(err){
        next(err);
    }
}

module.exports = { createUser };


// Route

const express = require("express");
const router = express.Router();
const userController = require("../Controller/userController");

router.post("/users", userController.createUser);

module.exports = router;


// c) Explain one advantage of the Service Layer pattern.
// Ans :- One advantage of the Service Layer pattern is code reusability and maintainability. Business logic is centralized in the service layer, making the application easier to maintain, test, and reuse across multiple controllers.