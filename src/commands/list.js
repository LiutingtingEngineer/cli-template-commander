
const fs = require('fs');
const path = require('path');
const tpath = path.resolve(process.cwd(),'./template.json');
let tlps = require(tpath); 
const chalk = require('chalk');

const list = (program) => {
    program
        .command('list')
        .description('delete a template')
        .action(()=> {
            tlps.forEach(v => {
                console.log(chalk`模板名称：{green ${v.name}}，模板地址：{yellow ${v.url}}`);
            })
        })
}

module.exports = list;