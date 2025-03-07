import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectToDB from "../todo-app/db.js";
import { Todo, todoSchema } from "./models/todo.js";
const app = express();
const port = process.env.port || 3001;

// addMiddleware
app.use(express.json());

connectToDB();

// TODO APIs
app.get("/todos", async (req, res) => {
  try {
    const result = await Todo.find();
    res.send({
      success: true,
      message: "Todo lists retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo lists failed",
      data: result,
    });
  }
});

app.post("/create-todo", async (req, res) => {
  const todoDetails = req.body;
  try {
    const result = await Todo.create(todoDetails);
    res.send({
      success: true,
      message: "Todo list created successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo list was not added",
      data: result,
    });
  }
});

app.get("/:id", async (req, res) => {
  const todoId = req.params.todoId;
  try {
    const result = await Todo.findById(todoId);
    res.send({
      success: true,
      message: "Todo id retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo id not retrieved",
      data: result,
    });
  }
});

app.patch("/:id", async (req, res) => {
  const todoId = req.params.todoId;
  const updatedTodo = req.body;
  try {
    const result = await Todo.findByIdAndUpdate(todoId, updatedTodo, {
      new: true,
    });
    res.send({
      success: true,
      message: "Todo is updated successfully",
      data: result,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Todo is not updated",
      data: result,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
