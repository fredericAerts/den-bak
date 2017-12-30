const express = require('express');
const ClientModel = require('../models/client.model');
const indexController = require('../controllers/index.controller')(ClientModel);


/*  Routing
    ======================================================== */
const router = () => {
  const indexRouter = express.Router();

  /*  Home
      ================================================== */
  indexRouter.route('/')
    .get(indexController.get)
    .post(indexController.post);

  return indexRouter;
};

module.exports = router;
