import axios from 'axios';
 export const fetchWind = async (cityName: string, startDate: string, endDate: string): Promise<any> => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.get<any>(`http://localhost:8000/weather/protected/wind_speed/${cityName}/${startDate}/${endDate}`,
        {headers:{
            Authorization: `Bearer ${token}`
         }
         });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch wind_speed data');
    }
};
 