import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { fetchAttackTypes } from "../../services/attackTypeService"; // נניח שמיקמת את הפונקציה ב-services

// רישום הרכיבים של Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AttackTypes() {
  const [attackTypes, setAttackTypes] = useState<{ attackTypeName: string; count: number }[]>([]);
  const [selectedAttackTypes, setSelectedAttackTypes] = useState<string[]>([]); // שמירת סוגי התקיפות שנבחרו
  const [filteredData, setFilteredData] = useState<{ attackTypeName: string; count: number }[]>([]); // נתונים לאחר סינון

  useEffect(() => {
    const getAttackTypes = async () => {
      const data = await fetchAttackTypes();
      if (data) {
        setAttackTypes(data);
        setFilteredData(data); // הצגת כל הנתונים בהתחלה
      }
    };

    getAttackTypes();
  }, []);

  // עדכון נתוני הגרף לפי סוגי התקיפות שנבחרו
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedAttackTypes((prevSelected) =>
      prevSelected.includes(value) ? prevSelected.filter((item) => item !== value) : [...prevSelected, value]
    );
  };

  // כאשר בוחרים סוג התקפה, מבצעים סינון של הנתונים
  useEffect(() => {
    if (selectedAttackTypes.length === 0) {
      setFilteredData(attackTypes); // אם לא נבחרו סוגים, מציגים את כל הנתונים
    } else {
      setFilteredData(
        attackTypes.filter((item) => selectedAttackTypes.includes(item.attackTypeName))
      );
    }
  }, [selectedAttackTypes, attackTypes]);

  // נתונים עבור הגרף
  const chartData = {
    labels: filteredData.map((item) => item.attackTypeName),
    datasets: [
      {
        label: "Number of Attacks",
        data: filteredData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // כפתור ניקוי
  const handleClearSelection = () => {
    setSelectedAttackTypes([]);
  };

  return (
    <div className="max-w-4xl mx-auto my-8 bg-gray-100">
      <h2 className="text-center text-xl font-semibold mb-4">Deadliest Attack Types</h2>

      {/* Select for choosing attack types */}
      <div className="mb-4">
        <label className="block text-gray-700">Choose Attack Types:</label>
        <select
          className="mt-2 p-2 border rounded-md text-black"
          onChange={handleSelectChange}
          value=""
        >
          <option value="" disabled>
            Select attack type
          </option>
          {attackTypes.map((item) => (
            <option key={item.attackTypeName} value={item.attackTypeName}>
              {item.attackTypeName}
            </option>
          ))}
        </select>
        <button
          onClick={handleClearSelection}
          className="mt-2 bg-red-500 text-white py-1 px-4 rounded"
        >
          Clear Selection
        </button>
      </div>

      {/* Bar chart */}
      <div className="p-4 border rounded-lg shadow-lg">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}
