import express from "express";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.js";
import cors from "cors";
import dotenv from "dotenv";
import expenseRoutes from "./routes/expense.js";
import path from "path";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

const _dirname = path.resolve();

// AUTH ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);

// app.get("/", (req, res) => {
//   res.send("Backend Running...");
// });

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.use((req,res)=>{
  res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
