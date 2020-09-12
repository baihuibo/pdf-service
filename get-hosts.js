const os = require('os');
const prompts = require('prompts');

module.exports = async function () {
    const interfaces = os.networkInterfaces();
    const nets = Object.values(interfaces).flat(Infinity);
    const hosts = [];
    for (let i = 0; i < nets.length; i++) {
        const net = nets[i];
        if (net.family === 'IPv4' && !net.internal) {
            hosts.push(net.address)
        }
    }

    if (hosts.length > 1) {
        const choices = hosts.map(value => {
            return {title: value, value}
        })
        const response = await prompts({
            type: 'select',
            name: 'host',
            message: 'Pick a address',
            choices
        });
        return response.host;
    }

    return hosts[0]
}
