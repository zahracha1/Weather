import axios from 'axios';
 export const fetchdailynitrogendioxide = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/nitrogen_dioxide/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};