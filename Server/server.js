"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
var express = require("express");
var cors = require("cors");
var user_route_1 = require("./Routes/user.route");
var book_route_1 = require("./Routes/book.route");
var image_route_1 = require("./Routes/image.route");
var mongoose_1 = require("mongoose");
var author_route_1 = require("./Routes/author.route");
var category_route_1 = require("./Routes/category.route");
var review_route_1 = require("./Routes/review.route");
var admin_route_1 = require("./Routes/admin.route");
// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();
var ATLAS_URI = process.env.ATLAS_URI;
if (!ATLAS_URI) {
    console.error("No ATLAS_URI environment variable has been defined in config.env");
    process.exit(1);
}
mongoose_1.default.set("strictPopulate", false);
mongoose_1.default
    .connect((_a = process.env.ATLAS_URI) !== null && _a !== void 0 ? _a : "")
    .then(function () {
    console.log("Database Connected");
    var app = express();
    app.use(cors());
    app.use("/Users", user_route_1.UserRouter);
    app.use("/Books", book_route_1.BookRouter);
    app.use("/Images", image_route_1.ImageRouter);
    app.use("/Authors", author_route_1.AuthorRouter);
    app.use("/Categories", category_route_1.CategoryRouter);
    app.use("/Reviews", review_route_1.ReviewRouter);
    app.use("/Admin", admin_route_1.AdminRouter);
    // Add a middleware function to log every request
    app.use(function (req, res, next) {
        console.log("".concat(req.method, " ").concat(req.url));
        next();
    });
    app.get("/pet", function (_req, res) {
        res.send("Hello from MongoDB Atlas!");
    });
    app.get("/", function (_req, res) {
        res.send("Hello from MongoDB Atlas!");
    });
    // start the Express server
    app.listen(5200, function () {
        console.log("Server running at ".concat(process.env.BackendServerUrl, "..."));
    });
})
    .catch(function (error) { return console.error(error); });

    export default app;
