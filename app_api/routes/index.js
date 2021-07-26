const express = require('express');
const router = express.Router();
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

const authController = require('../controllers/authentication');
const tripsController = require('../controllers/trips');
// const { get } = require('mongoose');

router
    .route('/login')
    .post(authController.login);

router
    .route('/register')
    .post(authController.register);
router
    .route('/trips')
    .get(tripsController.tripsList)
    .post(auth, tripsController.tripsAddTrip);

router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindCode)
    .put(auth, tripsController.tripsUpdateTrip);

var jwt = require('express-jwt');

app.get('/protected',
    jwt({ secret: 'shhhhhhared-secret', algorithms: ['HS256'] }),
    function (req, res) {
        if (!req.user.admin) return res.sendStatus(401);
        res.sendStatus(200);
    });

module.exports = router;