"use strict";
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();

app.use(session({
//    secure : true, //https에서만 session정보를 주고 받음
    key : 'sid',
    secret : 'secret',
    resave : false,
    saveUninitialized : true, // 세션에 저장할게 없더라도 처음부터 세션 생성
    cookie : {
        httpOnly : true, //자바스크립트를 통해 세션 쿠키 사용 못하게
        Secure : true
    }
}))


//라우터
const indexRouter = require('./src/routes/home/index');
const userRouter = require("./src/routes/user/user");
const boardRouter = require("./src/routes/board/board");

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
app.use("/board", boardRouter);


module.exports = app;
