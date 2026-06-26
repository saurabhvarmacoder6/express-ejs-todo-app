import express from "express";
import path from "path";
import mongoose from "mongoose";
const app = express();
const pathname = path.resolve();
import { getTasks } from "./controller/taskController.js";
import { Task } from "./model/taskModel.js";

mongoose.connect("mongodb://localhost:27017/tasks").then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(path.join(pathname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("navbar")
});

app.get("/update/:id", async (req, res) => {
  const id = req.params.id
  const data = await Task.findById(id)
  res.render("update", { data })
});

app.get("/addTask", (req, res) => {
  res.render("addTask")
});



app.get("/tasks", getTasks);

app.post("/add", async (req, res) => {
  await Task.create(req.body);
  res.redirect("/tasks");
});

app.get("/delete/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks")
})

app.post("/edit/:id", async (req, res) => {
  const id = req.params.id
  const updatedData = await Task.findByIdAndUpdate(id, req.body)
  res.redirect("/tasks")
})

app.listen(3000, () => {
  console.log("localhost:3000");
});