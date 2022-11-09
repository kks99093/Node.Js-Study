"use strict"
const express = require("express");
const routes  = express.Router();
const ctrl = require("./board.ctrl");

routes.get("/board", ctrl.output.board);
routes.get("/write", ctrl.output.write);
routes.get("/detail", ctrl.output.detail);


routes.post("/writeProc", ctrl.process.write);
routes.post("/deleteProc", ctrl.process.delete);
routes.post("/updateProc", ctrl.process.update);

module.exports = routes;