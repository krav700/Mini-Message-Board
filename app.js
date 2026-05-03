const path = require("node:path");
const express = require("express");
const app = express();
const newRouter = require("./routes/newRouter.js");

const messages = [
    {
        text: "Hi, there!",
        user: "Amando",
        added: new Date(),
    },
    {
        text: "Hello, World!",
        user: "Charles",
        added: new Date(),
    },
];

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.use("/new", newRouter);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", { title: "MiniMessageBoard", messages: messages });
});

app.post("/new", (req, res) => {
    console.log(req.body);
    // const { text, user } = req.body;
    const text = req.body?.text;
    const user = req.body?.user;
    messages.push({ text, user, added: new Date() });
    res.redirect("/");
});

app.get("/:user/open/:text/:added", (req, res) => {
    const text = req.params?.text;
    const user = req.params?.user;
    const added = req.params?.added;
    const message = { text, user, added };
    console.log("Message: ", message);
    res.render("open", { message: message });
});

const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }
    console.log(`My first Express app - listening on port ${PORT}!`);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});
