'use strict';
const fs = require('fs');
const CliProgress = require('cli-progress');
const chartMaker = require('c3-chart-maker');
const progress = new CliProgress.SingleBar({}, CliProgress.Presets.shades_classic);

const metrics = 'out/metrics.json';

async function graph(data) {
    const graphPath = `out/${data}.png`;
    if (fs.existsSync(graphPath)) {
        fs.unlinkSync(graphPath);
    }
    await new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
    await chartMaker(metrics,
        {
            data: {
                colors: {
                    tps: '#ff0000',
                    tpsAvg: '#ff0000',
                    latencyAvg: '#ff0000'
                },
                keys: {
                    value: [data]
                }
            }
        },
        graphPath);
}

async function graphAll() {
    progress.start(3, 0);
    await graph('tps');
    progress.update(1);
    await graph('tpsAvg');
    progress.update(2);
    await graph('latencyAvg');
    progress.update(3);
    progress.stop();
}

module.exports = graphAll;
