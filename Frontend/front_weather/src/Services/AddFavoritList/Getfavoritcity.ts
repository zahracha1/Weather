import axios from 'axios';
export const getFavoritesList = async (): Promise<any> => {
    debugger
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.get<any>( `http://localhost:8000/favorites/getFavoritesList`,
            {headers:{
                Authorization: `Bearer ${token}`
             }  }
            );
        return response.data;
    } catch (error) {
        console.error('Error adding favorite city:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
import { useQuery } from 'react-query';


export const useFavoritesList = () => {
  return useQuery('favoritesList', async () => {
    const token = localStorage.getItem('Token');
    const response = await axios.get<any>('http://localhost:8000/favorites/getFavoritesList', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  });
};

