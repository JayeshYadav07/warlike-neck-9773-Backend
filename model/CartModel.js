const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
    userID: { type: String },
    productID: { type: String },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    discount: Number,
    discountedPrice: Number,
});
const CartModel = mongoose.model("cart", cartSchema);
module.exports = { CartModel };
