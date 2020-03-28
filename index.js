const exec = require('child_process').exec;
const CliProgress = require('cli-progress');
const {getMetrics} = require('./lib/processor');
const graphAll = require('./lib/metrics');
const {createFile, closeFile, writeMetrics, createLuaDefinition} = require('./lib/file-utils');
const progress = new CliProgress.SingleBar({}, CliProgress.Presets.shades_classic);

const duration = '3s'; // Tiempo de duración de cada request de medición
const threads = 12; // Cantidad de hilos utilizados por Wrk
const iterations = 15; // Cantidad de iteraciones de la medición
const initialIter = 1; // Punto de inicio de la medición
const connIncrement = 7; // incremento de conexiones


const apiUrl = 'https://reqres.in/api/users?page=2&per_page=1';
const method = 'POST';
const body = '{"properties":{"age":19}}';
const type = 'application/json';

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
async function startBenchmark() {
    createLuaDefinition(method, body, type);
    createFile();
    progress.start(iterations, 0);
    for (let conn = initialIter; conn <= iterations; conn += connIncrement) {
        let realThreads = conn < threads ? conn : threads;

        let cmd = `wrk -t${realThreads} -c${conn} -d${duration} ${apiUrl}`;
        await execShellCommand(cmd).then(metrics => {
            metrics.conn = conn;
            writeMetrics(metrics);
        });
        progress.update(conn);
    }
    closeFile();
    progress.stop();
    await graphAll();
}

startBenchmark()
    .then(() => {
        console.log('END');
    })
    .catch(err => console.log(err));
