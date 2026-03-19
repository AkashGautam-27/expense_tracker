

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function BarChartSimple({
  data = [],
  colors = [],
  darkMode,
}) {
  return (
    <div
      className={`p-5 rounded-xl shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg
      ${darkMode ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-black hover:bg-gray-300"}`}
    >
      <h2 className="text-center font-semibold mb-3">
        Bar Chart
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={darkMode ? "#374151" : "#ccc"}
          />

          <XAxis
            dataKey="name"
            stroke={darkMode ? "#e5e7eb" : "#000"}
          />
          <YAxis stroke={darkMode ? "#e5e7eb" : "#000"} />

          <Tooltip
             formatter={(value) => [`₹ ${value}`, "Amount"]}
              labelFormatter={(label) => `${label}`}
            contentStyle={{
              backgroundColor: darkMode ? "#d1d5db" : "#d1d5db",
              color: darkMode ? "#000000" : "#000000",
              borderRadius: "8px",
              border: "none",
            }}
          />

          <Bar dataKey="value">
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={colors[i] || "#8884d8"} // fallback
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


