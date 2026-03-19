import express from "express";
import Expense from "../models/Expense.js";

const router = express.Router();

// ➤ Add Expense
router.post("/add", async (req, res) => {
  try {
    const { userId, date, category, amount, notes } = req.body;

    if (!userId) {
      return res.json({ success: false, message: "User ID missing" });
    }

    await Expense.create({
      userId,
      date,
      category,
      amount,
      notes
    });

    res.json({ success: true, message: "Expense Saved!" });
  } catch (err) {
    res.json({ success: false, message: "Server Error", error: err });
  }
});

router.get("/view/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    res.json({
      success: true,
      expenses
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});


// ======================= UPDATE ==========================
router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Expense.findByIdAndUpdate(id, req.body);

    res.json({ success: true, message: "Expense Updated" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// ======================= DELETE ==========================
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Expense.findByIdAndDelete(id);

    res.json({ success: true, message: "Expense Deleted" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export default router;
