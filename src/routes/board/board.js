"use strict"
const express = require("express");
const routes  = express.Router();
const ctrl = require("./board.ctrl");

routes.get("/board", ctrl.output.board);
routes.get("/write", ctrl.output.write)


routes.post("/writeProc", ctrl.process.write);

module.exports = routes;