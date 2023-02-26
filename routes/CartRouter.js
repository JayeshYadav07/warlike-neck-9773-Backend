const express = require("express");
const { CartModel } = require("../model/CartModel");
const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
    try {
        const posts = await CartModel.find({ userID: req.body.userID });
        res.send(posts);
    } catch (error) {
        res.send(error.message);
    }
});
cartRouter.get("/:id", async (req, res) => {
    try {
        const posts = await CartModel.findById(req.params.id);
        res.send(posts);
    } catch (error) {
        res.send(error.message);
    }
});
cartRouter.get("/find/:productID", async (req, res) => {
    try {
        const posts = await CartModel.find({
            userID: req.body.userID,
            productID: req.params.productID,
        });
        res.send(posts);
    } catch (error) {
        res.send(error.message);
    }
});

cartRouter.post("/create", async (req, res) => {
    const payload = req.body;
    try {
        const post = new CartModel(payload);
        await post.save();
        res.send({ msg: `Post created successfully`, user: payload.userID });
    } catch (error) {
        res.send({ msg: "Something went wrong", error: error.message });
    }
});

cartRouter.patch("/update/:id", async (req, res) => {
    const payload = req.body;
    try {
        await CartModel.findByIdAndUpdate(req.params.id, payload);
        res.send({ msg: `Post updated successfully` });
    } catch (error) {
        res.send({ msg: "Something went wrong", error: error.message });
    }
});

cartRouter.delete("/delete/:id", async (req, res) => {
    try {
        await CartModel.findByIdAndDelete(req.params.id);
        res.send({ msg: "Post deleted successfully" });
    } catch (error) {
        res.send(error.message);
    }
});

// testing purposes
cartRouter.delete("/deleteall", async (req, res) => {
    try {
        await CartModel.deleteMany({ userID: req.body.userID });
        res.send({ msg: `Post deleted successfully` });
    } catch (error) {
        res.send({ msg: "Something went wrong", error: error.message });
    }
});

module.exports = { cartRouter };
