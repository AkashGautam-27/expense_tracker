

import {
  RadialBarChart,
  RadialBar,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function RadialBarSimple({
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
        Radial Bar Chart
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="15%"
          outerRadius="90%"
          barSize={15}
          data={data.map((d, i) => ({
            ...d,
            fill: colors[i] || "#8884d8",
          }))}
        >
          <RadialBar
            minAngle={15}
            label
            background
            clockWise
            dataKey="value"
          />

          <Legend />

          <Tooltip
             formatter={(value) => [`₹ ${value}`, "Amount"]}
  labelFormatter={(label, payload) =>
    payload && payload.length ? payload[0].payload.name : label
  }
            contentStyle={{
              backgroundColor: darkMode ? "#d1d5db" : "#d1d5db",
              color: darkMode ? "#000000" : "#000000",
              borderRadius: "8px",
              border: "none",
            }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}




