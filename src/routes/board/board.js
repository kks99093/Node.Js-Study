"use strict"
const express = require("express");
const routes  = express.Router();
const ctrl = require("./board.ctrl");

routes.get("/totalboard", ctrl.output.totalBoard);
routes.get("/write", ctrl.output.write)

module.exports = routes;