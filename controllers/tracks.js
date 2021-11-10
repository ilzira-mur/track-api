const NotFoundError = require('../errors/NotFoundError');
const FaultRequest = require('../errors/FaultRequest');
const InternalServerError = require('../errors/InternalServerError');
const Track = require('../models/track');
const Forbidden = require('../errors/Forbidden');

const getTracks = (req, res, next) => {
  Track.find({})
    .then((tracks) => {
      res.send(tracks);
    })
    .catch((err) => {
      next(new InternalServerError(`${err.message}`));
    });
};

const createTrack = (req, res, next) => {
  const {
    id, date, company, name, phone, comment, ati,
  } = req.body;

  Track.create({
    id, date, company, name, phone, comment, ati,
  })
    .then((track) => res.send(track))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new FaultRequest(`${err.message}`));
      } else {
        next(new InternalServerError(`${err.message}`));
      }
    })
    .catch(next);
};

const deleteTrack = (req, res, next) => {
  Track.findById(req.params.id)
    .orFail(() => {
      throw new NotFoundError();
    })
    .then((track) => {
      if (track.owner.toString() === req.user.id) {
        Track.findByIdAndRemove(req.params.id)
          .then((trackDelete) => {
            res.send(trackDelete);
          })
          .catch((err) => {
            next(new InternalServerError(`${err.message}`));
          })
          .catch(next);
      } else {
        throw new Forbidden();
      }
      return res.send({ message: 'удален' });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new NotFoundError(`${err.message}`));
      }
    })
    .catch(next);
};

module.exports = {
  getTracks,
  createTrack,
  deleteTrack,
};
