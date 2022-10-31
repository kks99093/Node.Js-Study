"use strict";
const express = require("express");
const routes = express.Router();
const ctrl = require('./index.ctrl');

routes.get("/", ctrl.output.index);

module.exports = routes;