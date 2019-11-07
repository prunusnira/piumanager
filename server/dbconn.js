const mariadb = require('mariadb');
const commonval = require('./commondata.js');
// This file has critical info - like db username or password

const dbpool = mariadb.createPool({
    host: commonval.DBAddr,
    port: commonval.DBPort,
    user: commonval.DBUser,
    password: commonval.DBPass,
    connectionLimit: 5
});

// DB쿼리
function CreateQueryGetPatterns(type, level) {
    return "SELECT\
                a.id as ptid,\
                b.id as musicid,\
                b.title_en as title_en,\
                b.title_ko as title_ko,\
                b.artist as artist,\
                a.type as type,\
                a.lv as lv,\
                a.difftype as difftype,\
                a.steptype as steptype,\
                b.songtype as songtype,\
                a.removed as removed\
            FROM piu_lvtable AS a\
            JOIN (SELECT * FROM piu_songlist where removed=0) AS b\
            WHERE\
                a.type = "+type+" AND\
                a.lv = "+level+" AND\
                a.musicid = b.id";
}

function CreateQueryUserLog(name, type) {
    return "INSERT INTO piu_userlog\
                SET name='"+name+"', type='"+type+"', time=NOW()"
}

// DB 쿼리별 메소드
async function UserLog(name, type) {
    try {
        const query = CreateQueryUserLog(name, type);
        con = await dbpool.getConnection();
        con.query("USE piumanager");
        con.query(query);
    }
    catch(err) {
        throw err;
    }
    finally {
        if(con) con.end();
    }
}

async function GetPatterns(type, level) {
    let con, row;
    try {
        const query = CreateQueryGetPatterns(type == "s" ? 0 : 1, level);
        con = await dbpool.getConnection();
        con.query("USE piumanager");
        row = await con.query(query);
    }
    catch(err) {
        throw err;
    }
    finally {
        if(con) con.end();
        return row;
    }
}

async function GetPatternsOver(type) {
    let con;
    let row = [];
    try {
        const itype = type == "s" ? 0 : 1;
        con = await dbpool.getConnection();
        con.query("USE piumanager");

        if(itype === 0) {
            const query1 = CreateQueryGetPatterns(itype, 24);
            const query2 = CreateQueryGetPatterns(itype, 25);
            const query3 = CreateQueryGetPatterns(itype, 26);

            await con.query(query1).then(function(d) {
                row = row.concat(d)
            });
            await con.query(query2).then(function(d) {
                row = row.concat(d)
            });
            await con.query(query3).then(function(d) {
                row = row.concat(d)
            });
        }
        else {
            const query1 = CreateQueryGetPatterns(itype, 25);
            const query2 = CreateQueryGetPatterns(itype, 26);
            const query3 = CreateQueryGetPatterns(itype, 27);
            const query4 = CreateQueryGetPatterns(itype, 28);

            await con.query(query1).then(function(d) {
                row = row.concat(d)
            });
            await con.query(query2).then(function(d) {
                row = row.concat(d)
            });
            await con.query(query3).then(function(d) {
                row = row.concat(d)
            });
            await con.query(query4).then(function(d) {
                row = row.concat(d)
            });
        }
    }
    catch(err) {
        throw err;
    }
    finally {
        if(con) con.end();
        return row;
    }
}

module.exports = {
    GetPatterns: GetPatterns,
    GetPatternsOver: GetPatternsOver,
    UserLog: UserLog
}