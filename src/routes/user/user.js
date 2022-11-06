"use strict";
const express = require("express");
const routes = express.Router();
const ctrl = require("./user.ctrl");

routes.get("/login", ctrl.output.login);
routes.get("/logout", ctrl.process.logout); // 테스트용


routes.post("/userIdDubleChk", ctrl.process.doubleChk);
routes.post("/joinProc", ctrl.process.join);
routes.post("/loginProc", ctrl.process.login);
routes.post("/logout", ctrl.process.logout);

module.exports = routes;