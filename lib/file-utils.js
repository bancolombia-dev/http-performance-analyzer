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

function createLuaDefinition(options) {
    let data = `wrk.method = "${options.method}"`;
    if (options.body) {
        data += `\nwrk.body = '${options.body}'`;
    }
    if (options.headers) {
        options.headers.forEach(header => {
            data += `\nwrk.headers['${header.name}'] = '${header.value}'`;
        });
    }
    fs.writeFile(luaFile, data, err => {
        if (err) console.log(err);
    });
}


module.exports = {createFile, closeFile, writeMetrics, createLuaDefinition};
