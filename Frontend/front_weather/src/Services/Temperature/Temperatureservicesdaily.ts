import axios from 'axios';
 export const fetchdailyTemperature = async (cityName: string): Promise<any> => {
    try {
        //ugger
        const response = await axios.get<any>(`/weather/protected/daily-max-temperatures/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};



/*import axios from 'axios';
import axiosClient from '../../api/Axiosclient';
 export const fetchdailyTemperature = async (cityName: string): Promise<any> => {
    try {
        const response = await axiosClient(`/weather/protected/daily-max-temperatures/${cityName}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};*/