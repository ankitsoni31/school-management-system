const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config(); // 🔥 important

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DB CONNECT ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

/* ================= STUDENT SCHEMA ================= */
const studentSchema = new mongoose.Schema({
  name: String,
  class: String,
  gender: String,
  batchYear: Number
});

const Student = mongoose.model("Student", studentSchema);

/* ================= TASK SCHEMA ================= */
const taskSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  task: String,
  completed: {
    type: Boolean,
    default: false
  }
});

const Task = mongoose.model("Task", taskSchema);

/* ================= AUTH ================= */
const ADMIN = {
  email: "admin@gmail.com",
  password: "123456"
};

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === ADMIN.email && password === ADMIN.password) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return res.json({ token });
  }

  res.status(401).json({ message: "Invalid credentials" });
});

/* ================= STUDENT APIs ================= */

// CREATE
app.post("/students", async (req, res) => {
  try {
    const { name, class: studentClass, batchYear, gender } = req.body;

    const newStudent = new Student({
      name,
      class: studentClass,
      gender,
      batchYear: Number(batchYear)
    });

    await newStudent.save();
    res.json(newStudent);

  } catch (err) {
    res.status(500).json({ message: "Error saving student" });
  }
});

// READ ALL
app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// READ ONE
app.get("/students/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});

// UPDATE
app.put("/students/:id", async (req, res) => {
  const { name, class: studentClass, batchYear, gender } = req.body;

  const updated = await Student.findByIdAndUpdate(
    req.params.id,
    {
      name,
      class: studentClass,
      gender,
      batchYear: Number(batchYear)
    },
    { new: true }
  );

  res.json(updated);
});

// DELETE + CASCADE 🔥
app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;

  try {
    await Student.findByIdAndDelete(studentId);

    await Task.deleteMany({ studentId });

    res.json({ message: "Student and tasks deleted" });

  } catch (err) {
    res.status(500).json({ message: "Error deleting student" });
  }
});

/* ================= TASK APIs ================= */

// CREATE TASK
app.post("/tasks", async (req, res) => {
  const { studentId, task } = req.body;

  const newTask = new Task({ studentId, task });
  await newTask.save();

  res.json(newTask);
});

// GET TASKS
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find().populate("studentId");
  res.json(tasks);
});

// MARK COMPLETE
app.put("/tasks/:id", async (req, res) => {
  const updated = await Task.findByIdAndUpdate(
    req.params.id,
    { completed: true },
    { new: true }
  );
  res.json(updated);
});

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});