import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchGangs = async (): Promise<string[]> => {
    try {
        const response = await axios.get<{ data: { _id: string }[] }>(`${apiUrl}/relationships/all-gangs`);
        return response.data.data.map((item) => item._id);
    } catch (error) {
        console.error("Error fetching gangs", error);
        return [];
    }
};

export const fetchGangByYear = async (year?: number, gname?: string): Promise<any> => {
    try {
        const url = year 
            ? `${apiUrl}/groups-by-year?year=${year}`
            : `${apiUrl}/groups-by-year?gname=${encodeURIComponent(gname || "")}`;
        const response = await axios.get<{ data: any }>(url);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching gang by year", error);
        return [];
    }
};
