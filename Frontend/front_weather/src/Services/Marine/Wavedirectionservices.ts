import axios from 'axios';
 export const fetchdailywavedirection = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/daily-max-wave-direction/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch daily-max-wave-height data');
    }
};