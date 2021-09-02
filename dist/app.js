"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require('cors');
const mysql = require('mysql');
const app = express();
app.use(cors());
app.get('/', (req, res) => {
    return res.send('Responding from server!');
});
app.listen(8000);
