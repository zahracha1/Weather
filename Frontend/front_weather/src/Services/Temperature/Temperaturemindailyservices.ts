import axios from 'axios';
 export const fetchdailyminTemperature = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/daily-min-temperatures/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};