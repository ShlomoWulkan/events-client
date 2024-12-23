import { useEffect, useState } from "react";
import { fetchIncidentTrendsByYears, fetchIncidentTrendsByYearAndMonth } from "../../services/yearsService";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

interface FilterOption {
  type: "range" | "specific" | "last5" | "last10";
  year?: number;
  fromYear?: number;
  toYear?: number;
}

export default function YearsGraph() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState<FilterOption>({ type: "last5" });
  const [lastYearInData, setLastYearInData] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchLastYear = async () => {
    try {
      const response = await fetchIncidentTrendsByYears(0, new Date().getFullYear());
      if (response && response.length > 0) {
        const years = response.map((item) => item._id.year);
        setLastYearInData(Math.max(...years));
      }
    } catch (error) {
      console.error("Error fetching last year in data", error);
    }
  };

  const fetchData = async () => {
    try {
      setErrorMessage("");
      let response;
      if (filter.type === "last5" && lastYearInData) {
        response = await fetchIncidentTrendsByYears(lastYearInData - 5, lastYearInData);
      } else if (filter.type === "last10" && lastYearInData) {
        response = await fetchIncidentTrendsByYears(lastYearInData - 10, lastYearInData);
      } else if (filter.type === "range" && filter.fromYear && filter.toYear) {
        if (filter.fromYear > filter.toYear) {
          setErrorMessage("Invalid range: 'From Year' must be less than or equal to 'To Year'.");
          return;
        }
        response = await fetchIncidentTrendsByYears(filter.fromYear, filter.toYear);
      } else if (filter.type === "specific" && filter.year) {
        response = await fetchIncidentTrendsByYearAndMonth(filter.year);
      }
      if (response) setData(response);
    } catch (error) {
      console.error("Error fetching data for the graph", error);
    }
  };

  useEffect(() => {
    fetchLastYear();
  }, []);

  useEffect(() => {
    if (lastYearInData) {
      fetchData();
    }
  }, [filter, lastYearInData]);

  const handleFilterChange = (type: string, value?: number | [number, number]) => {
    if (type === "last5") {
      setFilter({ type: "last5" });
    } else if (type === "last10") {
      setFilter({ type: "last10" });
    } else if (type === "range" && Array.isArray(value)) {
      setFilter({ type: "range", fromYear: value[0], toYear: value[1] });
    } else if (type === "specific" && typeof value === "number") {
      setFilter({ type: "specific", year: value });
    }
  };

  const chartData = {
    labels: data.map((item) =>
      item._id.month ? `${item._id.year}-${item._id.month}` : item._id.year
    ),
    datasets: [
      {
        label: "Incidents",
        data: data.map((item) => item.count),
        borderColor: "#4F46E5",
        backgroundColor: "rgba(79, 70, 229, 0.5)",
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Incident Trends Graph</h1>

      <div className="mb-4">
        {errorMessage && (
          <div className="text-red-500 text-sm mb-2">{errorMessage}</div>
        )}
        <div className="flex flex-col gap-4">
          <div>
            <button
              onClick={() => handleFilterChange("last5")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Last 5 Years
            </button>
            <button
              onClick={() => handleFilterChange("last10")}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 ml-2"
            >
              Last 10 Years
            </button>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Range:</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="From Year"
                className="px-2 py-1 border rounded-md"
                onBlur={(e) =>
                  handleFilterChange("range", [
                    parseInt(e.target.value),
                    filter.toYear || 0,
                  ])
                }
              />
              <input
                type="number"
                placeholder="To Year"
                className="px-2 py-1 border rounded-md"
                onBlur={(e) =>
                  handleFilterChange("range", [
                    filter.fromYear || 0,
                    parseInt(e.target.value),
                  ])
                }
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Specific Year:</label>
            <input
              type="number"
              placeholder="Year"
              className="px-2 py-1 border rounded-md"
              onBlur={(e) =>
                handleFilterChange("specific", parseInt(e.target.value))
              }
            />
          </div>
        </div>
      </div>

      <Line data={chartData} />
    </div>
  );
}
