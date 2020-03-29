'use strict';

const {startBenchmark} = require('./lib/benchmark');

console.log(process.argv);

let options = {
    request: {
        apiUrl: 'http://localhost:8082/client/apps/app/features/feature',
        method: 'POST',
        body: '{"properties":{"age":19}}',
        type: 'application/json'
    },
    benchmark: {
        duration: '3s', // Tiempo de duración de cada request de medición
        threads: 12, // Cantidad de hilos utilizados por Wrk
        iterations: 50, // Cantidad de iteraciones de la medición
        initialIter: 1, // Punto de inicio de la medición
        connIncrement: 7 // incremento de conexiones
    }
};

console.log(JSON.stringify(options, null, 4));

if (process.argv[2]) {
    options = require(process.argv[2]);
}

startBenchmark(options)
    .then(() => {
        console.log('END');
    })
    .catch(err => console.log(err));
