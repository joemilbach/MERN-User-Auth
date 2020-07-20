const router = require("express").Router();
const auth = require("../middleware/auth");
const Todo = require("../models/todoModel");

router.post("/", auth, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ msg: "Missing title." });
    }
    const newTodo = new Todo({
      title,
      userID: req.user,
    });
    const saveTodo = await newTodo.save();
    res.json(saveTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/list", auth, async (req, res) => {
  const todos = await Todo.find({ userID: req.user });
  res.json(todos);
});

router.delete("/delete/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.user, _id: req.params.id });
    if (!todo) {
      return res.status(400).json({ msg: "No todo found" });
    }
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
    res.json(deletedTodo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
