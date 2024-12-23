import { useEffect, useState } from "react";
import { fetchIncidentTrendsByYears, fetchIncidentTrendsByYearAndMonth } from "../../services/yearsService";
import Filter from "./Filter";
import Chart from "./Chart";
import { FilterOption } from "../../types/yearsFilter";

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
        if (filter.month) {
          response = await fetchIncidentTrendsByYearAndMonth(filter.year, filter.month);
        } else {
          response = await fetchIncidentTrendsByYearAndMonth(filter.year);
        }
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

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-xl font-bold text-center mb-4">Incident Trends Graph</h1>
      {errorMessage && <div className="text-red-500 text-sm mb-2">{errorMessage}</div>}
      <Filter filter={filter} setFilter={setFilter} />
      <Chart data={data} />
    </div>
  );
}
