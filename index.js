
const catalog = require('./src/catalog');
const deals = require('./src/deals');
const glossary = require('./src/glossary');
const search = require('./src/search');
const top = require('./src/top');

async function start() {
const devices = await catalog.getBrands();
console.log(devices);
}
start();
console.log('hello')