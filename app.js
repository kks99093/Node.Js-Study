"use strict";
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require("dotenv");
dotenv.config();


//라우터
const indexRouter = require('./src/routes/home/index');
const userRouter = require("./src/routes/user/user");


// View 셋팅
app.set('views', path.join(`${__dirname}/src`, 'views'));
app.set('view engine', 'ejs');


//미들웨어
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(`${__dirname}/src`, 'public')));

//라우터 세팅
app.use('/', indexRouter);
app.use("/user", userRouter);


module.exports = app;
