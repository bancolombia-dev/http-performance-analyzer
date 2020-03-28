'use strict';

function substract(body, startKey, endKey) {
    const start = body.indexOf(startKey) + startKey.length;
    const end = body.indexOf(endKey, start);
    return body.substring(start, end).trim();
}

function getTPS(body) {
    return substract(body, 'Requests/sec:', '\n');
}

function getTPSAvg(body) {
    let line = substract(body, 'Req/Sec', '\n');
    return line.replace(/\s+/, ' ').split(' ')[0];
}

function getLatencyAvg(body) {
    return substract(body, 'Latency', 'ms');
}

function getMetrics(body) {
    return {
        tps: (getTPS(body)),
        tpsAvg: (getTPSAvg(body)),
        latencyAvg: (getLatencyAvg(body))
    };
}


module.exports = {getMetrics};
