import { useState, useEffect } from "react";

export default function About({ darkMode }) {
  return (
    <div
      className={`min-h-screen px-6 py-10
        ${darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-black"}
      `}
    >
      <div className="max-w-5xl mx-auto">

        {/* ===== Title ===== */}
        <h2 className="text-3xl font-bold text-center mb-10">
          Welcome to Expense Tracker
        </h2>

        {/* ===== Tagline ===== */}
        <div className="grid gap-10 mb-10 text-center">
          {[
            {
              title: "“Track Your Expenses, Save More”",
              desc: "Easily manage your income, expenses, and savings in one place."
            },
            {
              title: "🧾 Expense Tracker?",
              desc:"An Expense Tracker is a digital tool that helps users record and analyze their daily income and expenses. It keeps track of financial activities so users  can understand their spending patterns and savings easily."
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 shadow-md rounded-xl transition-all duration-300
                ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-300"}
                hover:-translate-y-2 hover:shadow-lg`}
            >
              <h3 className="text-xl font-semibold text-center">
                {item.title}
              </h3>
              <p
                className={`text-center mt-2
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ===== Why + Features ===== */}
        <div className="grid md:grid-cols-2  gap-10 mb-10">
          {[
            {
              title: "❓ Why is it Needed?",
              desc: `
              ~ Maintain daily financial records.
              ~ Understand spending habits.
              ~ Control unnecessary expenses.
              ~ Plan monthly or yearly budgets.
              ~ Achieve financial discipline.
              `
            },
            {
              title: "⚙ Uses / Features",
              desc: `
              ~ Add & store income and expenses.
              ~ View totals & remaining balance.
              ~ Analyze spending using charts.
              ~ Monthly & yearly summaries.
              ~ Clear financial overview.
              `
            }
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 shadow-md rounded-xl transition-all duration-300
                ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-300"}
                hover:-translate-y-2 hover:shadow-lg`}
            >
              <h3 className="text-lg sm:text-xl md:text-xl  text-center font-semibold">{item.title}</h3>
              <p
                className={` ml-15 text-sm sm:text-base leading-relaxed whitespace-pre-line
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* ===== Image Slider ===== */}
        <div className="mb-12">
          <ImageSlider darkMode={darkMode} />
        </div>

        {/* ===== Steps ===== */}
        <h2 className="text-2xl text-center font-semibold mb-4">
          📌 How to Add an Expense
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {[
            ["1. Go to “Add Expense” Page", "Click Add from Header menu."],
            ["2. Fill Expense Details", "Title, Amount, Category, Date & Description."],
            ["3. Save Expense", "Expense will be stored in database."],
            ["4. Check Your Expense", "View, filter, edit & update expenses."]
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 shadow-md rounded-xl transition-all duration-300
                ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-300"}
                hover:-translate-y-2 hover:shadow-lg`}
            >
              <h3 className="text-xl font-semibold text-center">
                {item[0]}
              </h3>
              <p
                className={`text-center mt-2
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {item[1]}
              </p>
            </div>
          ))}
        </div>

        {/* ===== Pages ===== */}
        <h2 className="text-2xl font-semibold text-center mb-4">
          🎯 Features
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            ["Dashboard Page", "  Shows total income, total expenses, balance & recent transactions through Summary cards & charts."],
            ["Add Page", "Add expenses easily. Users can add expenses by entering amount, category, date, and description."],
            ["View Page", "  Shows all transactions with options to filter, View, edit & delete expenses."],
            ["Setting Page", "Show yours profile & simple Logout."]
          ].map((item, i) => (
            <div
              key={i}
              className={`p-6 shadow-md rounded-xl transition-all duration-300
                ${darkMode
                  ? "bg-gray-800 hover:bg-gray-700"
                  : "bg-white hover:bg-gray-300"}
                hover:-translate-y-2 hover:shadow-lg`}
            >
              <h3 className="text-xl font-semibold text-center">
                {item[0]}
              </h3>
              <p
                className={`text-center mt-2
                  ${darkMode ? "text-gray-300" : "text-gray-700"}
                `}
              >
                {item[1]}
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* ===== Image Slider ===== */
function ImageSlider({ darkMode }) {
  const images = [
    { src: "/about/Chart.png", title: "Charts Overview" },
    { src: "/about/Overview.png", title: "All Expenses Overview" },
    { src: "/about/Add.png", title: "Add Expense Page" },
    { src: "/about/View.png", title: "View Expenses Page" },
    { src: "/about/Setting.png", title: "Settings & Profile" },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`shadow-md rounded-xl p-4
        ${darkMode ? "bg-gray-800" : "bg-gray-300"}
      `}
    >
      <h3 className="text-xl font-semibold text-center mb-4">
         Application Preview
      </h3>

      <div className="relative w-full h-320px overflow-hidden rounded-lg">
        <img
          src={images[index].src}
          alt="preview"
          className="w-full h-full object-contain"
        />

        <button
          onClick={() =>
            setIndex(index === 0 ? images.length - 1 : index - 1)
          }
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
        >
          ‹
        </button>

        <button
          onClick={() => setIndex((index + 1) % images.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded"
        >
          ›
        </button>
      </div>

      <p className="text-center mt-3 font-medium">
        {images[index].title}
      </p>
    </div>
  );
}

