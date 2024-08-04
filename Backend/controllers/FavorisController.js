import {   addCityToFavorites ,deleteCityFromFavorites ,getCityFromFavorites} from '../services/weatherService.js';
import { jwtDecode } from "jwt-decode";


async function addToFavorites(req, res) {
  console.log('heloooooooo')
  const JWT_KEY_Token = req.headers.authorization;
  const { city } = req.params;
  console.log('city' , city )
  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;

    await addCityToFavorites(preferred_username, city);
    res.send(`Favorite city ${city} added for user ${preferred_username}`);
  } catch (error) {
    console.error('Error adding city to favorites:', error);
    res.status(500).send('Error adding city to favorites');
  }
}

async function deleteFromFavorites(req, res) {
  const JWT_KEY_Token = req.headers.authorization;
  const { city } = req.params;

  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;

    await deleteCityFromFavorites(preferred_username, city);
    res.send(`Favorite city ${city} removed for user ${preferred_username}`);
  } catch (error) {
    console.error('Error removing city from favorites:', error);
    res.status(500).send('Error removing city from favorites');
  }
}


async function getFavorites(req, res) {
  const JWT_KEY_Token = req.headers.authorization;

  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;

    const favorites = await getCityFromFavorites(preferred_username);
    res.json(favorites);
  } catch (error) {
    console.error('Error getting favorite cities:', error);
    res.status(500).send('Error getting favorite cities');
  }
}
export {getFavorites,deleteFromFavorites,addToFavorites}