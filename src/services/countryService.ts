import { CountryData } from '../types/country';
import axios from "axios";

export const fetchCountryData = async (): Promise<CountryData[] | undefined> => {
  try {
    const response = await axios.get<{ data: CountryData[] }>("http://localhost:3000/api/analysis/highest-casualty-regions/");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching casualty data", error);
  }
};

export const fetchCountryById = async (countryId: string): Promise<CountryData | undefined> => {
  try {
    const response = await axios.get<{ data: CountryData }>(`http://localhost:3000/api/analysis/highest-casualty-regions/${countryId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching country by ID", error);
  }
};