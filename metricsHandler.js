const { createCall } = require('bitcoind-client');
const { register } = require('prom-client');
require('isomorphic-fetch');
const {
    bestBlockIndexMetric,
    bestBlockTimeMetric,
    blockHeadersMetric,
    blockMetric,
    difficultyMetric,
    connectionsInMetric,
    connectionsOutMetric,
} = require('./metrics');

const {
    ticker = 'BTC',
    rpcuser = 'rpcuser',
    rpcpassword = 'rpcpassword',
    rpchost = '127.0.0.1',
    rpcport = '8332',
    rpcscheme = 'http',
} = process.env;

const call = createCall({
    rpcuser,
    rpcpassword,
    rpchost,
    rpcport,
    rpcscheme,
});

const metricsHandler = (req, res) => {
    res.set('Content-Type', register.contentType);

    const bestBlockPromise = call('getbestblockhash')
        .then(hash => call('getblock', hash))
        .then(bestBlockInfo => {
            bestBlockIndexMetric.set(bestBlockInfo.height);
            bestBlockTimeMetric.set(bestBlockInfo.time);
        })
    ;
    const blockChainInfoPromise = call('getblockchaininfo')
    .then(blockChainInfo => {
        blockHeadersMetric.set(blockChainInfo.headers);
        blockMetric.set(blockChainInfo.blocks);
    })
    const difficultyPromise = call('getdifficulty')
        .then(difficulty => difficultyMetric.set(difficulty))
    ;
    const peersPromise = call('getnetworkinfo')
    .then(peerConnections => {
        connectionsInMetric.set(peerConnections.connections_in);
        connectionsOutMetric.set(peerConnections.connections_out);
    })
    ;
    Promise.all([

        bestBlockPromise,
        blockChainInfoPromise,
        difficultyPromise,
        peersPromise,
    ])
        .then(() => res.end(register.metrics()))
        .catch((error) => {
            console.error(error);

            let code = 500;
            if (error.code === -28) {
                code = 503;
            } else if (error.code === 403) {
                code = 403;
            }

            return res.status(code).send(`# ${error.message}\n`)
        })
    ;
};

module.exports = metricsHandler;