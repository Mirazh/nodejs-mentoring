import fs from 'fs';
import readline from 'readline';

const fileReadStream = fs.createReadStream('./src/task-2.csv');
const fileWriteStream = fs.createWriteStream('./src/task-2.2.json', { flags: 'a' })
const rl = readline.createInterface(fileReadStream)

rl.on('line', line => {
    fileWriteStream.write(`${line}\n`)
})
