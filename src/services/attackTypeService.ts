import { AttackTypeData } from "../types/attackType";
import axios from "axios"; 

export const fetchAttackTypes = async (): Promise<AttackTypeData[] | undefined> => {
    try {
        const response = await axios.get<{ data: AttackTypeData[] }>("http://localhost:3000/api/analysis/deadliest-attack-types/");    
        return response.data.data;
    } catch (error) {
        console.error("Error fetching attack types", error);
    }
};
