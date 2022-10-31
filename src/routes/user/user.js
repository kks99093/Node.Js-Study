"use strict";
const express = require("express");
const routes = express.Router();
const ctrl = require("./user.ctrl");

routes.get("/login", ctrl.output.login);

routes.post("/userIdDubleChk", ctrl.process.doubleChk);
routes.post("/joinProc", ctrl.process.join);

module.exports = routes;