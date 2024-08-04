import {getFavorites , deleteFromFavorites ,addToFavorites}from '../controllers/FavorisController.js'
import express from 'express'
const favoritesRoutes = express.Router();
favoritesRoutes.get('/getFavoritesList',getFavorites )
favoritesRoutes.post('/addFavorite/:city',addToFavorites )
favoritesRoutes.delete('/deleteFavorite/:city',deleteFromFavorites)
export {favoritesRoutes} 