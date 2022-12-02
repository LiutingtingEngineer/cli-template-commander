
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const tpath = path.resolve(process.cwd(),'./template.json');
let tlps = require(tpath); 
const chalk = require('chalk');

const deleteTpl = (program) => {
    program
        .command('delete')
        .description('delete a template')
        .action(()=> {
            let questions = [
                {
                    type:'input',
                    name: 'tpl-name',
                    message: '请输入要删除的模板名称',
                    validate: (val) => {
                        if(val === ''){
                            return '模板名称不能为空';
                        }else if(tlps.filter(v => v.name == val).length == 0){
                            return ' 当前要删除的模板不存在';
                        }else{
                            return true;
                        }
                    }
                }
            ];
        
            inquirer
                .prompt(questions).then(answers => {
                    let tplName = answers['tpl-name'];
                    fs.writeFileSync(tpath,JSON.stringify(tlps.filter(v => (v.name !== tplName))));
                    console.log(chalk.green('删除成功'));
                })
        })
}

module.exports = deleteTpl;