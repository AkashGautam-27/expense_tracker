
import { useState, useEffect, useMemo } from "react";

// Charts
import PieChartCustom from "../charts/PieChartCustom";
import BarChartSimple from "../charts/BarChartSimple";
import TreemapCustom from "../charts/TreemapCustom";
import RadialBarSimple from "../charts/RadialBarSimple";

export default function Dashboard({ darkMode }) {
  const [expenses, setExpenses] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const userId = localStorage.getItem("userId");

  // ================= FETCH =================
  useEffect(() => {
    fetch(`http://localhost:5000/api/expense/view/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setExpenses(data.expenses);
          setFilteredData(data.expenses);
        }
      })
      .catch(console.log);
  }, [userId]);

  // ================= FILTER =================
  const handleFilter = () => {
    if (!fromDate && !toDate) return setFilteredData(expenses);

    const start = fromDate ? new Date(fromDate) : null;
    const end = toDate ? new Date(toDate) : null;

    setFilteredData(
      expenses.filter((item) => {
        const d = new Date(item.date);
        if (start && end) return d >= start && d <= end;
        if (start) return d >= start;
        if (end) return d <= end;
        return true;
      })
    );
  };

  const resetFilter = () => {
    setFilteredData(expenses);
    setFromDate("");
    setToDate("");
  };

  // ================= DATA =================
  const categories = ["Food", "Travel", "Shopping", "Bills", "Others"];
  const colors = ["#ff6384", "#36a2eb", "#ffA500", "#4caf50", "#9c27b0"];

  const chartData = categories.map((cat, i) => ({
    name: cat,
    value: filteredData
      .filter(
        (ex) =>
          ex.category?.toLowerCase().trim() ===
          cat.toLowerCase().trim()
      )
      .reduce((s, x) => s + Number(x.amount || 0), 0),
    fill: colors[i],
  }));

  const totalExpenses = useMemo(
    () => filteredData.reduce((s, x) => s + Number(x.amount || 0), 0),
    [filteredData]
  );

  const today = new Date().toISOString().split("T")[0];
  const todaySpend = useMemo(
    () =>
      filteredData
        .filter((x) => x.date === today)
        .reduce((a, x) => a + Number(x.amount || 0), 0),
    [filteredData]
  );

  const highestSpend = useMemo(() => {
    const map = {};
    filteredData.forEach((x) => {
      map[x.date] = (map[x.date] || 0) + Number(x.amount || 0);
    });
    return Math.max(0, ...Object.values(map));
  }, [filteredData]);

  // ===================================================
  return (
     <div
      className={`min-h-screen px-4 py-4
      ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"}
      `}
    >
    <div
      className={`p-5 max-w-6xl mx-auto
      ${darkMode ? "text-white bg-gray-900" : " bg-gray-100 text-black"}`}
    >
      <h1 className="text-center text-3xl font-bold my-5">
        Welcome to Track Your Spending
      </h1>

      {/* ===== OVERVIEW ===== */}
     
       <h2 className="text-center text-xl font-semibold mt-10 mb-8">All Expenses Overview</h2>
    
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          ["Total Expenses", totalExpenses],
          ["Highest Spend in a day", highestSpend],
          ["Today's Spend", todaySpend],
        ].map(([title, value]) => (
          <div
            key={title}
            className={`p-4 rounded-xl text-center border-t-4 transition-all duration-300
              ${darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-300 hover:bg-gray-400"}
              hover:-translate-y-2 shadow  `}
          >
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xl font-bold">₹{value}</p>
          </div>
        ))}
      </div>

      {/* ===== CATEGORY ===== */}
       <h2 className="text-center text-xl mt-10 font-semibold mb-8">Categories Overview</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-8">
        {categories.map((cat, i) => (
          <div
            key={cat}
            className={`p-4 rounded-xl text-center border-t-4 transition-all duration-300
              ${darkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-300 hover:bg-gray-400"}
              hover:-translate-y-2 shadow`}
            style={{ borderColor: colors[i] }}
          >
            <h3 className="font-semibold">{cat}</h3>
            <p className="text-lg font-bold">
              ₹{chartData[i].value}
            </p>
          </div>
        ))}
      </div>

      {/* ===== FILTER ===== */}
      <div className="flex justify-center gap-3 mb-8 flex-wrap">
        <input type="date" className="border p-2 rounded-lg" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        <input type="date" className="border p-2 rounded-lg" value={toDate} onChange={(e) => setToDate(e.target.value)} />

        <button onClick={handleFilter} className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Filter
        </button>
        <button onClick={resetFilter} className="bg-green-600 text-white px-4 py-2 rounded-lg">
          Reset
        </button>
      </div>

      {/* ===== CHARTS ===== */}
       <h2 className="text-center text-xl mt-10 font-semibold mb-8">Charts Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <PieChartCustom data={chartData} colors={colors} darkMode={darkMode} />
        <BarChartSimple data={chartData} colors={colors} darkMode={darkMode}/>
        <TreemapCustom data={chartData} colors={colors} darkMode={darkMode}/>
        <RadialBarSimple data={chartData} colors={colors} darkMode={darkMode}/>
      </div>

      {/* ===== TABLE ===== */}
       <h2 className="text-center text-xl mt-10 font-semibold mb-8">Expenses Table Overview</h2>
      <div
        className={`shadow rounded-xl overflow-auto max-h-80 mb-10
        ${darkMode ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <table className="w-full">
          <thead className="bg-purple-600 text-white sticky top-0">
            <tr>
              <th className="p-3">Date</th>
              <th className="p-3">Category</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length ? (
              filteredData.map((ex, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="p-3">{ex.date}</td>
                  <td className="p-3">{ex.category}</td>
                  <td className="p-3">{ex.notes}</td>
                  <td className="p-3 font-semibold">₹{ex.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-400">
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

/* ===== SMALL COMPONENTS ===== */
function SectionTitle({ title }) {
  return (
    <h2 className="text-xl p-6 text-center text-black font-semibold mb-3">
      {title}
    </h2>
  );
}

function StatCard({ title, value, darkMode }) {
  return (
    <div
      className={`p-4 rounded-xl text-center transition-all duration-300
      ${darkMode
        ? "bg-gray-800 hover:bg-gray-700"
        : "bg-gray-200 hover:bg-gray-300"}
      hover:-translate-y-2 shadow`}
    >
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
