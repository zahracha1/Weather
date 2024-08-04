import axios from 'axios';
 export const fetchHumidity = async (cityName: string, startDate: string, endDate: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`http://localhost:8000/weather/protected/relative_humidity/${cityName}/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Precipitation data');
    }
};