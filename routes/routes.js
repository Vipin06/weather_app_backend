const express = require('express');
const router = express.Router();
const formController = require('../controler/formPostApi');

router.post('/sigin', formController.login);
router.post('/signup', formController.submitForm);

module.exports = router;
