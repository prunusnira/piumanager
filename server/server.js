const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./dbconn');

const app = express();

app.use(express.static(path.join(__dirname, '../build')));

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get('/d/over/:type', function(req, res) {
    // 난이도 별 데이터 가져오기
    db.GetPatternsOver(req.params.type)
    .then(function(data) {
        if(data !== undefined) {
            res.send(data);
        }
        else res.send("nodata");
    });
});

app.get('/d/:type/:lv', function(req, res) {
    db.GetPatterns(req.params.type, req.params.lv)
    .then(function(data) {
        if(data !== undefined) {
            res.send(data);
        }
        else res.send("nodata");
    });
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8081);