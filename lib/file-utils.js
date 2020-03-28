'use strict';
const fs = require('fs');
const fileName = 'out/metrics.json';
const luaFile = 'test.lua';

function createFile() {
    if (!fs.existsSync('out')) {
        fs.mkdirSync('out');
    }
    fs.writeFile(fileName, '[', err => {
        if (err) console.log(err);
    });
}

function writeMetrics(res) {
    fs.appendFile(fileName, `${JSON.stringify(res)},`, err => {
        if (err) console.log(err);
    });
}

function closeFile() {
    fs.appendFile(fileName, '{}]', err => {
        if (err) console.log(err);
    });
}

function createLuaDefinition(method, body, type) {
    if (method === 'GET') {
        return;
    }
    let data = `wrk.method = "${method}"`;
    if (body) {
        data += `\nwrk.body = '${body}'`;
    }
    if (type) {
        data += `\nwrk.headers['Content-Type'] = '${type}'`;
    }
    fs.writeFile(luaFile, data, err => {
        if (err) console.log(err);
    });
}


module.exports = {createFile, closeFile, writeMetrics, createLuaDefinition};
