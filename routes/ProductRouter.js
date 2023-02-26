const { ProductModel } = require("../model/ProductModel");
const express = require("express");
const productRouter = express.Router();

productRouter.get("/createProduct", async (req, res) => {
    try {
        await ProductModel.insertMany();
        res.send("Data added successfully");
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/get/:count", async (req, res) => {
    try {
        let data = await ProductModel.find().limit(req.params.count);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/getLowToHigh/:count", async (req, res) => {
    try {
        let data = await ProductModel.find()
            .sort({ price: 1 })
            .limit(req.params.count);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/getHighToLow/:count", async (req, res) => {
    try {
        let data = await ProductModel.find()
            .sort({ price: -1 })
            .limit(req.params.count);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/getByid/:id", async (req, res) => {
    try {
        let data = await ProductModel.findById(req.params.id);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/priceSlash", async (req, res) => {
    try {
        let data = await ProductModel.find().sort({ price: 1 }).limit(4);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/pickDay", async (req, res) => {
    try {
        let data = await ProductModel.find().sort({ reviews: 1 }).limit(4);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});
productRouter.get("/topDeals", async (req, res) => {
    try {
        let data = await ProductModel.find().sort({ discount: -1 }).limit(4);
        res.send(data);
    } catch (error) {
        res.send("Sorry! Something went wrong");
    }
});

module.exports = {
    productRouter,
};
