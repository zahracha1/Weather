import axios from 'axios';
 export const fetchdailyweathercodes = async (cityName: string, startDate: string, endDate: string): Promise<any> => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.get<any>(`/weather/protected/weatherCodes/${cityName}/${startDate}/${endDate}`,
        {headers:{
            Authorization: `Bearer ${token}`
         }
         });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};