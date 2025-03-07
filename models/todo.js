import mongoose, { model, Schema } from "mongoose";

export const todoSchema = new Schema({
  text: { type: String, required: true },
  priority: { type: String, required: true },
  deadLine: { type: String, required: true },
});

export const Todo = mongoose.models.Todo || new model("Todo", todoSchema);