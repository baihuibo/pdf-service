const httpProxy = require("http-proxy");

module.exports = async function (target, localAddress) {
    const port = Math.floor(Math.random() * 10000 + 40000);
    await httpProxy.createServer({
        target, localAddress, ws: true
    }).listen(port);
    return `ws://${localAddress}:${port}`;
}