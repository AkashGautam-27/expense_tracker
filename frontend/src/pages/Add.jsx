import React, { useState } from "react";

export default function Add({darkMode}) {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");  
    if (!userId) {
      alert("User not logged in");
      return;
    }

    const expenseData = { userId, date, category, amount, notes };

    const res = await fetch("https://expense-tracker-awv8.onrender.com/api/expense/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expenseData),
    });

    const data = await res.json();

    if (data.success) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1000);
      handleReset();
    } else {
      alert(data.message || "Failed to save");
    }
  };

  const handleReset = () => {
    setDate("");
    setCategory("");
    setAmount("");
    setNotes("");
  };

  return (
    <div className={`flex justify-center 
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-transparent text-black"}
      `} >
      <div className={`shadow-xl rounded-xl mt-20 mb-15 p-8 w-[90%] max-w-md
        ${darkMode ? "bg-gray-800" : "bg-gray-300"}
        `}>
        <h2 className="text-center text-2xl font-bold mb-6">Add Expense</h2>

        <form onSubmit={handleSubmit}>
          {/* Date */}
          <label className="font-semibold">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
              className={`w-full p-3 border rounded-lg mb-4 outline-none
            ${darkMode
              ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
              : "bg-gray-300 text-black focus:ring-green-400"}
            focus:ring`}
         />

          {/* Category */}
          <label className="font-semibold">Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className={`w-full p-3 border rounded-lg mb-4
            ${darkMode
              ? "bg-gray-700 text-white border-gray-600"
              : "bg-gray-300 text-black"}
            `}
          >
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="shopping">Shopping</option>
            <option value="bills">Bills</option>
            <option value="others">Others</option>
          </select>

          {/* Amount */}
          <label className="font-semibold">Amount (₹):</label>
          <input
            type="number"
            value={amount}
            placeholder="Enter amount"
            required
            min="1"
            max="100000000"
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full p-3 border rounded-lg mb-4 outline-none
            ${darkMode
              ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
              : "bg-gray-300 text-black focus:ring-green-400"}
            focus:ring`}
          />

          {/* Notes */}
          <label className="font-semibold">Notes:</label>
          <textarea
            rows="3"
            value={notes}
            placeholder="Write something..."
            onChange={(e) => setNotes(e.target.value)}
           className={`w-full p-3 border rounded-lg mb-4 outline-none
            ${darkMode
              ? "bg-gray-700 text-white border-gray-600 focus:ring-green-500"
              : "bg-gray-300 text-black focus:ring-green-400"}
            focus:ring`}
          ></textarea>

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="w-[48%] bg-green-500  py-2 rounded-lg font-semibold hover:scale-105 transition"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleReset}
               className={`w-[48%] py-2 rounded-lg font-semibold
              ${darkMode ? "bg-gray-600 text-white" : "bg-gray-500 text-black"}
              `}
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-50">
          <div 
           className={`p-4 rounded-xl shadow-lg animate-bounce font-semibold text-center
            ${darkMode ? "bg-gray-500 text-black" : "bg-gray-800 text-white"}
            `}
          >
            ✅ Expense Saved Successfully!
          </div>
        </div>
      )}
    </div>
  );
}


