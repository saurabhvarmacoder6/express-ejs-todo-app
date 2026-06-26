import {Task} from "../model/taskModel.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.render("list", { tasks });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};