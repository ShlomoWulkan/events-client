import axios from "axios";
import { IncidentTrendData } from "../types/yearsType";

export const fetchIncidentTrendsByYears = async (
  fromYear: number,
  toYear: number
): Promise<IncidentTrendData[] | undefined> => {
  try {
    const response = await axios.get<{ data: IncidentTrendData[] }>(
      `http://localhost:3000/api/analysis/incident-trends?from=${fromYear}&to=${toYear}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching incident trends by years", error);
  }
};

export const fetchIncidentTrendsByYearAndMonth = async (
  year: number,
  month?: number
): Promise<IncidentTrendData[] | undefined> => {
  try {
    const url = month
      ? `http://localhost:3000/api/analysis/incident-trends?year=${year}&month=${month}`
      : `http://localhost:3000/api/analysis/incident-trends?year=${year}`;

    const response = await axios.get<{ data: IncidentTrendData[] }>(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching incident trends by year and month", error);
  }
};
