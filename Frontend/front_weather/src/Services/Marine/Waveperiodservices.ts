import axios from 'axios';
 export const fetchdailywaveperiod = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/daily-max-wave-period/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch daily-max-wave-period data');
    }
};