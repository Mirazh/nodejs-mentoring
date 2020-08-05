import fs from 'fs';
import stream from 'stream';
import zlib from 'zlib';
import util from 'util'
// import readline from 'readline';

const pipeline = util.promisify(stream.pipeline);

async function run() {
    await pipeline(
        fs.createReadStream('./src/task-2.csv'),
        fs.createWriteStream('./src/task-2.2.json')
    );
}

run().catch(console.error);

// const fileReadStream = fs.createReadStream('./src/task-2.csv');
// const fileWriteStream = fs.createWriteStream('./src/task-2.2.json', { flags: 'a' })
// const rl = readline.createInterface(fileReadStream)
//
// rl.on('line', line => {
//     fileWriteStream.write(`${line}\n`)
// })
