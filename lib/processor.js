'use strict';

function substract(body, startKey, endKey) {
    const start = body.indexOf(startKey) + startKey.length;
    const end = body.indexOf(endKey, start);
    return start !== -1 ? body.substring(start, end).trim() : '0';
}

function getTPS(body) {
    return substract(body, 'Requests/sec:', '\n');
}

function getTPSAvg(body) {
    let line = substract(body, 'Req/Sec', '\n');
    return line.replace(/\s+/, ' ').split(' ')[0];
}

function getFailed(body) {
    return substract(body, 'Non-2xx or 3xx responses:', '\n');
}

function getLatencyAvg(body) {
    return substract(body, 'Latency', 'ms');
}

function getMetrics(body) {
    return {
        tps: getTPS(body),
        tpsAvg: getTPSAvg(body),
        latencyAvg: getLatencyAvg(body),
        failed: getFailed(body)
    };
}


module.exports = {getMetrics};
