import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { GangCountryData } from "../../types/gangCountryType";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface GraphSectionProps {
  selectedCountry: string;
  handleCountryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  topGroups: GangCountryData[] | undefined;
  isTop5: boolean;
  setIsTop5: React.Dispatch<React.SetStateAction<boolean>>;
}

const GraphSection: React.FC<GraphSectionProps> = ({
  selectedCountry,
  handleCountryChange,
  handleSelectChange,
  topGroups,
  isTop5,
  setIsTop5,
}) => {
  const chartData = {
    labels: topGroups?.map((group) => group._id) || [],
    datasets: [
      {
        label: "Number of Events",
        data: topGroups?.map((group) => group.count) || [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="w-1/2 p-4 pt-20">
      {/* Search Section */}
      <div className="mb-4 text-black">
        <input
          type="text"
          placeholder="Search for a country..."
          value={selectedCountry}
          onChange={handleCountryChange}
          className="input input-bordered w-full mb-4"
        />
        <select onChange={handleSelectChange} value={selectedCountry} className="select select-bordered w-full mb-4">
          <option value="">Select a country</option>
          {topGroups?.map((group) => (
            <option key={group._id} value={group._id}>
              {group._id}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons */}
      <div className="flex mb-4">
        <button
          onClick={() => setIsTop5(true)}
          className={`btn ${isTop5 ? "btn-primary" : "btn-outline"} mr-2`}
        >
          Top 5
        </button>
        <button
          onClick={() => setIsTop5(false)}
          className={`btn ${!isTop5 ? "btn-primary" : "btn-outline"}`}
        >
          All Groups
        </button>
      </div>

      {/* Bar Chart */}
      <div className="p-4 border rounded-lg shadow-lg">
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default GraphSection;
