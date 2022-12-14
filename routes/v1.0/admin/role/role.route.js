const express = require('express');
const { body, header } = require('express-validator');

const validator = require('../../../../middlewares/validator.mw');
const APIKeyMiddleware = require('../../../../middlewares/checkAPIKey.mw');

const RoleController = require('../../../../controllers/role/role.controller');

const router = express.Router();

module.exports = (app) => {
    router.get('/', RoleController.findAll);
    router.post('/',
        [
            body('role').not().isEmpty(),
            body('name').not().isEmpty()
        ],
        validator.showError,
        RoleController.create
    );

    router
        .route('/:role')
        .get(RoleController.findOne)
        .put(
            [
                body('name').optional().not().isEmpty()
            ],
            validator.showError,
            RoleController.update
        )
        .delete(RoleController.delete);

    app.use('/v1.0/admin/roles',
        header('apiKey').not().isEmpty(),
        validator.showError,
        APIKeyMiddleware.checkAPIKey,
        router
    );
}