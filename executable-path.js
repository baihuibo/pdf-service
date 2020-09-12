const findChrome = require('carlo/lib/find_chrome');

module.exports = async function () {
    return process.env.CHROME_PATH || (await findChrome({})).executablePath
};
