import axios from 'axios';
 export const fetchdailyozone = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/Ozone/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Precipitation data');
    }
};