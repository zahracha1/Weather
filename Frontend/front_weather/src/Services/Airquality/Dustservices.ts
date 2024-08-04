import axios from 'axios';
 export const fetchdailydust = async (cityName: string): Promise<any> => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.get<any>(`/weather/protected/dust/${cityName}`,
        {headers:{
            Authorization: `Bearer ${token}`
         }
         });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch Precipitation data');
    }
};