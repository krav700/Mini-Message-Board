const { Router } = require("express");
const messageController = require("../controllers/messageController")

const newRouter = Router();

newRouter.get("/", messageController.newMessage);
newRouter.post("/", messageController.insertMessage);

module.exports = newRouter;