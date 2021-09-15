const { Gauge } = require('prom-client');

const bestBlockIndexMetric = new Gauge({
    name: 'bitcoin_best_block_index',
    help: 'The block height or index',
});
const bestBlockTimeMetric = new Gauge({
    name: 'bitcoin_best_block_timestamp_seconds',
    help: 'The block time in seconds since epoch (Jan 1 1970 GMT)',
});
const blockHeadersMetric = new Gauge({
    name: 'bitcoin_chain_header',
    help: 'The block header value downloaded before new blocks or IBD',
});

const blockMetric = new Gauge({
    name: 'bitcoin_chain_block',
    help: 'The block height from getblockchaininfo',
});

const difficultyMetric = new Gauge({
    name: 'bitcoin_chain_difficulty',
    help: 'The proof-of-work difficulty as a multiple of the minimum difficulty',
});


const connectionsInMetric = new Gauge({
    name: `bitcoin_connections_in`,
    help: `Number of peers`,
    labelNames: ['peers']
});
const connectionsOutMetric = new Gauge({
    name: `bitcoin_connections_out`,
    help: `Number of peers`,
    labelNames: ['peers']
});


module.exports = {
    bestBlockIndexMetric,
    bestBlockTimeMetric,
    blockHeadersMetric,
    blockMetric,
    difficultyMetric,
    connectionsInMetric,
    connectionsOutMetric,
}
