require("dotenv").config()
const aiRoutes = require("./routes/ai")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Task = require("./models/Task");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/ai", aiRoutes);


// 🔥 PASTE your MongoDB connection string here
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
// 📌 Get all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// 📌 Add new task
app.post("/tasks", async (req, res) => {
 const newTask = new Task({
  title: req.body.title,
  dueDate: req.body.dueDate,
});
  await newTask.save();
  res.json(newTask);
});
// ✅ Update task (mark complete/incomplete)
app.put("/tasks/:id", async (req, res) => {

  try {

    const updatedTask =
      await Task.findByIdAndUpdate(

        req.params.id,

        {
          title: req.body.title,
          dueDate: req.body.dueDate,
          completed: req.body.completed,
        },

        { new: true }

      )

    res.json(updatedTask)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }
})
app.post("/register", async (req, res) => {
  try {
    // Validate required fields
    if (!req.body.name || !req.body.email || !req.body.password) {
      return res.status(400).json({
        error: "Name, email, and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        error: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      req.body.password,
      10
    );

    // Create user
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();

    res.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      error: error.message || "Registration failed",
    });
  }
});
app.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({
      email: req.body.email,
    });

    // User not found
    if (!user) {
      return res.status(400).json({
        error: "User not found",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    // Wrong password
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({
      error: "Login failed",
    });
  }
});
app.delete("/tasks/:id", async (req, res) => {
  try {

    await Task.findByIdAndDelete(req.params.id)

    res.json({
      message: "Task deleted successfully"
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })
  }
})