"use strict";
const express = require("express");
const routes = express.Router();
const ctrl = require('../board/board.ctrl');

routes.get("/", ctrl.output.board);

module.exports = routes;