const { UserModel } = require("../model/UserModel");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRouter = express.Router();
userRouter.get("/", async (req, res) => {
    const user = await UserModel.find();
    res.send(user);
});
// Register user
userRouter.post("/register", async (req, res) => {
    const { name, email, pass } = req.body;
    const checkUser = await UserModel.find({ email });
    if (checkUser.length === 0) {
        bcrypt.hash(pass, 5, async (error, hash) => {
            if (error) {
                res.send({ msg: "Something went wrong", error: error.message });
            } else {
                try {
                    const user = new UserModel({ name, email, pass: hash });
                    await user.save();
                    res.send({
                        msg: "New user has been registered successfully ",
                    });
                } catch (error) {
                    res.send({
                        msg: "Something went wrong",
                        error: error.message,
                    });
                }
            }
        });
    } else {
        res.send({ msg: "User already exist, please login" });
    }
});

// user Login
userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await UserModel.find({ email });
        if (user.length > 0) {
            bcrypt.compare(pass, user[0].pass, (error, result) => {
                if (result) {
                    const token = jwt.sign({ userID: user[0]._id }, "Jayesh");
                    console.log(token);
                    res.send({
                        msg: "User Successfully logged in",
                        token: token,
                        email: email,
                    });
                } else {
                    res.send(error);
                }
            });
        } else {
            res.send("Not able to login ! Please check");
        }
    } catch (error) {
        res.send({ msg: "Something went wrong", error: error.message });
    }
});
module.exports = { userRouter };
