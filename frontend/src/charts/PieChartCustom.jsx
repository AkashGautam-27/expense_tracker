



import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function PieChartCustom({ data = [], colors = [], darkMode }) {
  // label function
  const renderLabel = ({ name, percent }) =>
    `${name}: ${(percent * 100).toFixed(0)}%`;

  return (
    <div
      className={`p-5 rounded-xl  shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg
      ${darkMode ? "bg-gray-800 text-gray-100 " : "bg-gray-200 text-black hover:bg-gray-300"}
      `}
    >
      <h2 className="text-center font-semibold mb-3">
         Pie Chart
      </h2>

      <ResponsiveContainer width="100%" height={310}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={110}
            label={renderLabel}
          >
            {data.map((_, i) => (
              <Cell
                key={i}
                fill={colors[i] || "#8884d8"}   // ✅ fallback color
              />
            ))}
          </Pie>

          <Tooltip
           formatter={(value, name) => [`₹ ${value}`, name]}
           
            contentStyle={{
              backgroundColor: darkMode ? "#d1d5db" : "#d1d5db",
              color: darkMode ? "#000000" : "#000000",
              borderRadius: "8px",
              border: "none",
            }}
      
          />

          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

