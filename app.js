require('dotenv').config()
const fs = require("fs");
const { scheduleJob } = require('node-schedule');
const path = require("path");
const { getAllDynamic, getAllStatic } = require('./api');

const outputDir = process.env.DATA_OUT_DIR

fs.mkdirSync(path.resolve(outputDir, 'war1'), { recursive: true });
fs.mkdirSync(path.resolve(outputDir, 'war2'), { recursive: true });

scheduleJob('*/10 * * * * *', () => { // Updates once every 10 seconds
  getAllDynamic(1).then(data => {
    fs.writeFile(path.join(outputDir, 'war1', 'dynamic.json'), JSON.stringify(data, null, 2), (err) => { if (err) console.log(err) })
  })
  getAllDynamic(2).then(data => {
    fs.writeFile(path.join(outputDir, 'war2', 'dynamic.json'), JSON.stringify(data, null, 2), (err) => { if (err) console.log(err) })
  })
});

scheduleJob('*/10 * * * *', () => { // Updates once every 10 minutes
  getAllStatic(1).then(data => {
    fs.writeFile(path.join(outputDir, 'war1', 'static.json'), JSON.stringify(data, null, 2), (err) => { if (err) console.log(err) })
  })
  getAllStatic(2).then(data => {
    fs.writeFile(path.join(outputDir, 'war2', 'static.json'), JSON.stringify(data, null, 2), (err) => { if (err) console.log(err) })
  })
});
