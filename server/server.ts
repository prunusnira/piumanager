import express from 'express';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import cors from 'cors';
import DBConn from './dbconn';
import commonval from './commondata';

const app = express();
const db = new DBConn();
autostart();

app.use(express.static(path.join(__dirname, '../build')));
app.use(express.json());
app.use(cors());

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

app.post('/d/log', function(req, res) {
    db.UserLog(req.body.name, req.body.type)
    .then(function(data) {
        res.sendStatus(200);
    });
});

app.post('/d/save/:name/:type/:lv/:date', function(req, res) {
    const p = req.params;
    const json = req.body.json;

    const dir = commonval.sharePath+p.name+"/";
    const path = commonval.sharePath+p.name+"/"+p.type+"_"+p.lv+"_"+p.date+'.json';

    // 경로가 없으면 dir 생성 - sync라도 문제 없음
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }

    // 파일 쓰기 진행
    fs.writeFile(path, json, (err) => {
        if(err) {
            res.send({"status":"error", "msg":err});
        }
        else {
            res.send({"status":"ok", "msg":"saved/"+p.name+"/"+p.type+"/"+p.lv+"/"+p.date});
        }
    });
});

app.get('/d/saved/:name/:type/:lv/:date', function(req,res) {
    const p = req.params;
    // 파일 열기
    const path = commonval.sharePath+p.name+"/"+p.type+"_"+p.lv+"_"+p.date+'.json';
    
    if(!fs.existsSync(path)) {
        res.send({"status":"error", "msg":"File not found"});
    }
    else {
        fs.readFile(path, (err, data) => {
            if(err) {
                res.send({"status":"error", "msg":"File read error"});
            }
            else {
                res.send({"status":"ok", "msg":data.toString()});
            }
        });
    }
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

app.listen(process.env.PORT || 8081);

function autostart() {
    setInterval(function() {
        glob(commonval.sharePath+"**/*", (err, res) => {
            if(err) {
                console.log(err);
            }
            else {
                for(let i = 0; i < res.length; i++) {
                    fs.lstat(res[i], (err, stats) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            if(stats.isDirectory()) {
                                // Do nothing
                            }
                            else if(stats.isFile()) {
                                // 파일의 최근 수정시간 확인
                                const diff = new Date().getTime() - stats.mtime.getTime();
                                if(diff > 1000*60*60*24*7) {
                                    // 파일 삭제
                                    fs.unlink(res[i], (err) => {
                                        if(err) {
                                            console.log(err);
                                        }
                                        else {
                                            console.log("Share file removed (more thean 1 week)");
                                        }
                                    });
                                }
                            }
                        }
                    });
                }
            }
        });
    }, 1000*60*60*24*7);
}