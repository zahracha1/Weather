
export const AddFavoriteCity = async (cityName: string): Promise<any> => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.post<any>(
            `http://localhost:8000/favorites/addFavorite/${cityName }`,{},
            {headers:{
                Authorization: `Bearer ${token}`
             }
             }
            );
        return response.data;
    } catch (error) {
        console.error('Error adding favorite city:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};




import { useMutation } from 'react-query';
import axios from 'axios';

export const useAddFavoriteCity = () => {
  return useMutation(async (cityName: string) => {
    const token = localStorage.getItem('Token');
    const response = await axios.post<any>(
      `http://localhost:8000/favorites/addFavorite/${cityName}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return response.data;
  });
};


