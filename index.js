const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./routes/UserRouter");
const { productRouter } = require("./routes/productRouter");
const { cartRouter } = require("./routes/cartRouter");
const { authenticate } = require("./middleware/authenticate");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use(authenticate);
app.use("/carts", cartRouter);
app.listen(8080, async () => {
    try {
        await connection;
        console.log("connection established");
        console.log("server listening on port 8080");
    } catch (error) {
        console.log(error);
    }
});
