import axios from 'axios';
export const deleteFavorite = async (cityName: string): Promise<any> => {
    const token = localStorage.getItem("Token")
    try {
        const response = await axios.delete<any>(
            `http://localhost:8000/favorites/deleteFavorite/${cityName }`,
            {headers:{
                Authorization: `Bearer ${token}`
             }
             }
            );
        return response.data;
    } catch (error) {
        console.error('Error delete favorite city:', error);
        throw error; // Rethrow the error to be handled by the caller
    }
};
