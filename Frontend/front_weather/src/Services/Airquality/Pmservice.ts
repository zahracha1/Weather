import axios from 'axios';
 export const fetchdailypm = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/pm_10/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};