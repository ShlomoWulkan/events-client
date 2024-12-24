import { AttackTypeData } from "../types/attackType";
import axios from "axios"; 

const apiUrl = import.meta.env.VITE_API_URL;

export const fetchAttackTypes = async (): Promise<AttackTypeData[] | undefined> => {
    try {
        const response = await axios.get<{ data: AttackTypeData[] }>(`${apiUrl}/analysis/deadliest-attack-types/`);    
        return response.data.data;
    } catch (error) {
        console.error("Error fetching attack types", error);
    }
};
