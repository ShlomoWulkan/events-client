import axios from "axios";
import { GangCountryData } from "../types/gangCountryType";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGangCountryData = async (
    country: string,
    top?: number
): Promise<GangCountryData[] | undefined> => {
    try {
        const url = top 
        ? `${apiUrl}/analysis/highest-casualty-regions/${country}?top=${top}` 
        : `${apiUrl}/analysis/highest-casualty-regions/${country}`;
        const response = await axios.get<{ data: GangCountryData[] }>(url);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching gang country data", error);
    }
};
