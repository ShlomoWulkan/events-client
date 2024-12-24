import axios from "axios";

export const fetchDeadliestGang = async (
    gname: string
): Promise<string | undefined> => {
    try {
        const response = await axios.get<{ data: string }>(`http://localhost:3000/api/relationships/deadliest-countries?gname=${gname}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching deadliest gang", error);
    }
};