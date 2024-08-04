import axios from 'axios';
 export const fetchdailycarbononoxide = async (cityName: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/carbon_monoxide/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Precipitation data');
    }
};