
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

/* ---------- Custom Cell Content ---------- */
const renderContent = ({
  x,
  y,
  width,
  height,
  name,
  value,
  index,
  colors,
  darkMode,
}) => {
  return (
    <g>
      {/* Rectangle */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={10}
        style={{
          fill: colors[index] || "#8884d8",
          stroke: darkMode ? "#1f2937" : "#ffffff",
          strokeWidth: 2,
        }}
      />

      {/* TEXT LOGIC */}
      {width > 80 && height > 30 ? (
        /* Big box → Name + Amount */
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={darkMode ? "#f9fafb" : "#000"}
          fontSize={14}
          fontWeight="bold"
        >
          {name} (₹{value})
        </text>
      ) : width > 40 && height > 20 ? (
        /* Medium box → Only Name (Others bhi dikhega) */
        <text
          x={x + width / 2}
          y={y + height / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fill={darkMode ? "#f9fafb" : "#000"}
          fontSize={11}
          fontWeight="bold"
        >
          {name}(₹{value})
        </text>
      ) : null}
    </g>
  );
};

/* ---------- Main Component ---------- */
export default function TreemapCustom({
  data = [],
  colors = [],
  darkMode,
}) {
  return (
    <div
      className={`p-5 rounded-xl shadow transition-all duration-300 hover:-translate-y-2 hover:shadow-lg
        ${
          darkMode
            ? "bg-gray-800 text-gray-100"
            : "bg-gray-200 text-black hover:bg-gray-300"
        }`}
    >
      <h2 className="text-center font-semibold mb-3">
        Treemap Chart
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <Treemap
          data={data}
          dataKey="value"
          content={(props) =>
            renderContent({ ...props, colors, darkMode })
          }
        >
          {/* SAME TOOLTIP STYLE AS OTHER CHARTS */}
          <Tooltip
            formatter={(value, name) => [`₹ ${value}`, name]}
            contentStyle={{
              backgroundColor: darkMode ? "#d1d5db" : "#d1d5db",
              color: "#000000",
              borderRadius: "8px",
              border: "none",
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
