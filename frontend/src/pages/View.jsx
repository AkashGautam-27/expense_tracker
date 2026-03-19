
import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function View({ darkMode }) {
  const [expenses, setExpenses] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [category, setCategory] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [editCategory, setEditCategory] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const [editNotes, setEditNotes] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    const userId = localStorage.getItem("userId");

    fetch(`https://expense-tracker-awv8.onrender.com/api/expense/view/${userId}`)
      .then(res => res.json())
      .then(data => setExpenses(data.expenses || []));
  }, []);

  // ================= FILTER =================
  const filteredExpenses = expenses.filter((item) => {
    const itemDate = item.date.split("T")[0];
    const matchCat = category ? item.category === category : true;
    const matchFrom = fromDate ? itemDate >= fromDate : true;
    const matchTo = toDate ? itemDate <= toDate : true;
    return matchCat && matchFrom && matchTo;
  });

  // ================= EDIT =================
  const openEdit = (item) => {
    setEditItem(item);
    setEditCategory(item.category);
    setEditAmount(item.amount);
    setEditNotes(item.notes);
    setShowPopup(true);
  };

  const handleUpdate = async () => {
    const res = await fetch(
      `https://expense-tracker-awv8.onrender.com/api/expense/update/${editItem._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: editCategory,
          amount: editAmount,
          notes: editNotes,
        }),
      }
    );

    const data = await res.json();
    if (data.success) {
      setExpenses((prev) =>
        prev.map((e) =>
          e._id === editItem._id
            ? { ...e, category: editCategory, amount: editAmount, notes: editNotes }
            : e
        )
      );
      setShowPopup(false);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    const res = await fetch(`https://expense-tracker-awv8.onrender.com/api/expense/delete/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();
    if (data.success) {
      setExpenses(expenses.filter((e) => e._id !== id));
    }
  };

  return (
    <div
      className={`px-4 pt-10 pb-0
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"}
      `}
    >
      <h2 className="text-3xl font-bold text-center mb-8">View Expenses</h2>

      {/* FILTER */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className={`border px-3 py-2 rounded-md
          ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white"}
          `}
        />

        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className={`border px-3 py-2 rounded-md
          ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white"}
          `}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`border px-3 py-2 rounded-md
          ${darkMode ? "bg-gray-800 text-white border-gray-600" : "bg-white"}
          `}
        >
          <option value="">All Category</option>
          <option value="food">Food</option>
          <option value="travel">Travel</option>
          <option value="shopping">Shopping</option>
          <option value="bills">Bills</option>
          <option value="others">Others</option>
        </select>
      </div>

      {/* TABLE */}
      <div
        className={`max-w-5xl mx-auto overflow-x-auto rounded-xl shadow
        ${darkMode ? "bg-gray-800" : "bg-gray-200"}
        `}
      >
        <table className="w-full">
          <thead className="bg-purple-600 text-white">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredExpenses.length ? (
              filteredExpenses.map((item) => (
                <tr
                  key={item._id}
                  className={`border-t text-center
                  ${darkMode ? "border-gray-700 hover:bg-gray-700" : "hover:bg-gray-300"}
                  `}
                >
                  <td className="p-3">{item.date.split("T")[0]}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">₹{item.amount}</td>
                  <td className="p-3">{item.notes}</td>
                  <td className="p-3 flex justify-center gap-4">
                    <FaEdit
                      className="cursor-pointer hover:scale-110"
                      onClick={() => openEdit(item)}
                    />
                    <FaTrash
                      className="cursor-pointer hover:scale-110"
                      onClick={() => handleDelete(item._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* EDIT POPUP */}
      {showPopup && (
        <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
          <div
            className={`p-6 rounded-xl w-80
            ${darkMode ? "bg-gray-600 text-white" : "bg-gray-300"}
            `}
          >
            <h3 className="font-semibold text-center text-lg mb-4">Edit Expense</h3>

            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
              className={`w-full mb-2 p-2 rounded
              ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200"}
              `}
            >
              <option value="food">Food</option>
              <option value="travel">Travel</option>
              <option value="shopping">Shopping</option>
              <option value="bills">Bills</option>
              <option value="others">Others</option>
            </select>

            <input
              type="number"
              value={editAmount}
              onChange={(e) => setEditAmount(e.target.value)}
              className={`w-full mb-2 p-2 rounded
              ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200"}
              `}
            />

            <input
              type="text"
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              className={`w-full mb-4 p-2 rounded
              ${darkMode ? "bg-gray-700 text-white" : "bg-gray-200"}
              `}
            />

            <div className="flex justify-evenly">
              <button
                onClick={handleUpdate}
                className="bg-purple-600 text-white px-4 py-1 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="bg-gray-500 text-white px-4 py-1 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
