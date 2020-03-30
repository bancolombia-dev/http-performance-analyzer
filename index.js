'use strict';

const {startBenchmark} = require('./lib/benchmark');

// let options = {
//     request: {
//         apiUrl: '<protocol>://<hostname>:<port>/<path>', // endpoint
//         method: 'POST', // Http Method
//         body: '{"properties":{"age":19}}', // Request body
//         headers: [{name: 'Content-Type', value: 'application/json'}] // Headers
//     },
//     benchmark: {
//         duration: '3s', // Tiempo de duración de cada request de medición
//         threads: 12, // Cantidad de hilos utilizados por Wrk
//         iterations: 50, // Cantidad de iteraciones de la medición
//         initialIter: 1, // Punto de inicio de la medición
//         connIncrement: 7 // incremento de conexiones
//     }
// };

if (!process.argv[2]) {
    return console.log('Usage: npm start options.json');
}

const options = require(`${__dirname}/${process.argv[2]}`);

startBenchmark(options)
    .then(() => {
        console.log('END');
    })
    .catch(err => console.log(err));
