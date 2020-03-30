'use strict';

const exec = require('child_process').exec;
const CliProgress = require('cli-progress');
const {getMetrics} = require('./processor');
const graphAll = require('./metrics');
const {createFile, closeFile, writeMetrics, createLuaDefinition} = require('./file-utils');
const progress = new CliProgress.SingleBar({}, CliProgress.Presets.shades_classic);

/**
 * Ejecuta un comando enviado por parámetro
 * @param {string} cmd comando a ejecutar
 */
function execShellCommand(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout) => {
            if (error) reject(error);
            try {
                resolve(getMetrics(stdout));
            } catch (error) {
                console.log(error);
                resolve({tps: 0, tpsAvg: 0, latencyAvg: 0});
            }
        });
    });
}

/**
 * Función principal para la ejecución del benchmark. Tiene actualmente un salto de 7
 * para la ejecución de cada medición.
 */
async function startBenchmark(options) {
    console.log('benchmark');
    createFile();
    progress.start(options.benchmark.iterations);
    createLuaDefinition(options.request);

    let fixedParams = `-s test.lua -d${options.benchmark.duration} ${options.request.apiUrl}`;

    for (let conn = options.benchmark.initialIter; conn <= options.benchmark.iterations; conn += options.benchmark.connIncrement) {
        let realThreads = conn < options.benchmark.threads ? conn : options.benchmark.threads;

        let cmd = `wrk -t${realThreads} -c${conn} ${fixedParams}`;

        await execShellCommand(cmd).then(metrics => {
            metrics.conn = conn;
            writeMetrics(metrics);
        });

        progress.update(conn);
    }

    closeFile();
    progress.stop();
    console.log('graphics');
    await graphAll();
}

module.exports = {startBenchmark};
