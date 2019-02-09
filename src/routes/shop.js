/* Routes => Shop.js */

const express = require('express');

const homePageController = require('../controllers/products').homePageController;

const router = express.Router();
router.get('/', homePageController);

module.exports = { router };
