import axios from "axios";
import { IncidentTrendData } from "../types/yearsType";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchIncidentTrendsByYears = async (
  fromYear: number,
  toYear: number
): Promise<IncidentTrendData[] | undefined> => {
  try {
    const response = await axios.get<{ data: IncidentTrendData[] }>(
      `${apiUrl}/analysis/incident-trends?from=${fromYear}&to=${toYear}`
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
      ? `${apiUrl}/analysis/incident-trends?year=${year}&month=${month}`
      : `${apiUrl}/analysis/incident-trends?year=${year}`;

    const response = await axios.get<{ data: IncidentTrendData[] }>(url);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching incident trends by year and month", error);
  }
};
