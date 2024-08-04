
import express from 'express';
import { messaging } from '../services/FirebaseService.js';

const router = express.Router();

router.post('/register-token', async (req, res) => {
  console.log('helllo token ', token)
  const { token } = req.body;

  if (!token) { 
    return res.status(400).send('Token is required');
  }
try{
  messaging.subscribeToTopic(token, "/topics/smartCity")
  return res.status(200).send('Token registered successfully');
}catch(err){
  return res.status(500).send('error while register token ');
}

});

export default router;
