import axios from 'axios';
 export const fetchmeanTemperature = async (cityName: string): Promise<any> => {
    //debugger
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.get<any>(`/weather/temperature_hourly/${cityName}`,
     {headers:{
        Authorization: `Bearer ${token}`
     }
     }
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch temperature data');
    }
};