"use strict";
const express = require("express");
const routes = express.Router();
const ctrl = require('../board/board.ctrl');

routes.get("/", ctrl.output.totalBoard);

module.exports = routes;