const express = require('express');
const { header } = require('express-validator');

const validator = require('../../../middlewares/validator.mw');
const RegionSecretMiddleware = require('../../../middlewares/checkRegionSecret.mw');

const AppController = require('../../../controllers/app/app.controller');

const router = express.Router();

module.exports = (app) => {
    router.post('/', AppController.create);
    router.delete('/', AppController.delete);

    app.use('/v1.0/apps',
        header('apiKey').not().isEmpty(),
        validator.showError,
        RegionSecretMiddleware.checkRegionSecret,
        router
    );
}