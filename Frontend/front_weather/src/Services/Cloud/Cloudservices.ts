import axios from 'axios';
 export const fetchcloud = async (cityName: string, startDate: string, endDate: string): Promise<any> => {
    try {
        const response = await axios.get<any>(`/weather/protected/cloud/${cityName}/${startDate}/${endDate}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Precipitation data');
    }
};