const express = require("express");
const route = express.Router();

const listController = require("./src/controllers/list");
const taskController = require("./src/controllers/task");

route.get("/", listController.list);

route.get("/task", taskController.index);
route.post("/task", taskController.create);
route.get("/task/:id", taskController.updateIndex);
route.post("/task/:id", taskController.update);
route.get("/delete/:id", taskController.delete);

module.exports = route;
