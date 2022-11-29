// help 指令
const chalk = require('chalk');

const command = chalk.bold.blue;
const description = chalk.blue

module.exports = (program)=> {
    program
    .command('help')
    .alias('h')
    .description('帮助文档')
    .action(() => {
        console.log(`abc`);
    })
}