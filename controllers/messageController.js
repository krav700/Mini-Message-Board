const db = require("../db/queries");
const { body, validationResult, matchedData } = require("express-validator");

const emptyErr = "must not be empty.";
const lengthErr = "must be betweeen 1 and 10 characters.";

const validateUser = [
    body("message")
        .trim()
        .notEmpty()
        .withMessage(`Message ${emptyErr}`)
        .isLength({ min: 1, max: 255 })
        .withMessage(`Message must be between 1 and 255 characters.`),
    body("username")
        .trim()
        .notEmpty()
        .withMessage(`Username ${emptyErr}`)
        .isLength({ min: 3, max: 30 })
        .withMessage(`Username must be between 3 and 30 characters.`),
];

async function getMessages(req, res) {
    const messages = await db.getAllMessages();
    if (!messages) {
        return res.render("index", { title: "MiniMessageBoard" });
    }
    return res.render("index", {
        title: "MiniMessageBoard",
        messages: messages,
    });
}

async function newMessage(req, res) {
    res.render("new", {});
}

const insertMessage = [
    validateUser,
    async (req, res) => {
        const { message, username } = req.body;

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("new", {
                message: message,
                username: username,
                errors: errors.array(),
            });
        }

        await db.insertMessage(message, username);
        res.redirect("/");
    },
];

exports.usersUpdatePost = [
    validateUser,
    (req, res) => {
        const user = usersStorage.getUser(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateUser", {
                title: "Update user",
                user: user,
                errors: errors.array(),
            });
        }
        const { firstName, lastName, email, age, bio } = matchedData(req);
        usersStorage.updateUser(req.params.id, {
            firstName,
            lastName,
            email,
            age,
            bio,
        });
        res.redirect("/");
    },
];

async function getMessageById(req, res) {
    const id = req.params.messageId;
    const messageById = await db.getMessageById(id);
    res.render("messages/messageId", { message: messageById });
}

async function deleteAllMessages(req, res) {
    await db.deleteAllMessages();
    res.redirect("/");
}

module.exports = {
    getMessages,
    newMessage,
    getMessageById,
    insertMessage,
    deleteAllMessages,
};
