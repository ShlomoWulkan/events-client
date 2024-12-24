import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchDeadliestGang = async (
    gname: string
): Promise<string | undefined> => {
    try {
        const response = await axios.get<{ data: string }>(`${apiUrl}/relationships/deadliest-countries?gname=${gname}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching deadliest gang", error);
    }
};