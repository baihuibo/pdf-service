#!/usr/bin/env node

const minimist = require('minimist')
const Koa = require('koa');
const cors = require('koa2-cors');
const puppeteer = require("puppeteer-core");

const executablePath = require('./executable-path');
const createProxyService = require('./create-proxy-service');
const getHosts = require('./get-hosts');

async function init() {
    const localAddress = await getHosts();

    if (!localAddress) {
        throw '未能找到可以代理的ip地址，无法启动代理';
    }

    const browserWSEndpoint = await launchAndGetWSEndpoint();
    console.log()
    console.log('通过 puppeteer-core 启动浏览器成功');

    const customWSEndpoint = await createProxyService(browserWSEndpoint, localAddress); // create the server here
    console.log()
    console.log('本地代理建立成功');

    const app = new Koa();
    app.use(cors());
    app.use(function (ctx) {
        ctx.body = customWSEndpoint;
    });

    const argv = minimist(process.argv.slice(2));
    const PORT = +argv.port || 20822;
    app.listen(PORT, function () {
        console.log()
        console.log(`请通过 http://127.0.0.1:${PORT}、http://localhost:${PORT} 获取代理地址`);
        console.log()
    });
}

init().catch(e => console.error(e));

async function launchAndGetWSEndpoint() {
    const browser = await puppeteer.launch({
        executablePath: await executablePath(),
        ignoreHTTPSErrors: true
    });
    return browser.wsEndpoint();
}

