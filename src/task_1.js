import readline from 'readline'

const rl = readline.createInterface(process.stdin)

rl.on('line', line => {
    process.stdout.write(line.split('').reverse().join('') + '\n')
})
