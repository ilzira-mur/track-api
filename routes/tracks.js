const trackRouter = require('express').Router();
const {
  getTracks,
  createTrack,
  deleteTrack,
} = require('../controllers/tracks');

trackRouter.get('/tracks', getTracks);

trackRouter.post('/tracks', createTrack);

trackRouter.delete('/tracks/:id', deleteTrack);

module.exports = trackRouter;
