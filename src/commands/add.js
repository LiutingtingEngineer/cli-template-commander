
const inquirer = require('inquirer')
const fs = require('fs'); // 引入 fs 文件操作模块
const path = require('path'); // 引入 path 路径操作模块
const tpath = path.resolve(process.cwd(),'./template.json');// template.json 路径
let tpls = require(tpath); // 获取模板列表内容
const add = (program) =>{
    program
    .command('add')
    .description('add a template')
    .action((option) => {
        // 定制问答环节
        let questions = [
            {
                type:'input',
                name: 'tpl-name',
                message: '请输入模板名称',
                // 验证 必须输入 且 不能重复
                validate: (val) => {
                    if(val === ''){
                        return '模板名称不能为空';
                    }else if (tpls.filter(v => (v.name === val)).length > 0){
                        return '当前模板已经存在';
                    }else{
                        return true;
                    }
                }
            },
            {
                type:'input',
                name: 'tpl-url',
                message: '请输入模板地址',
                validate: (val) => {
                    if(val === ''){
                        return '模板地址不能为空';
                    }else{
                        return true;
                    }
                }
            }
        ];
        // 交互式问答 add 信息处理
        inquirer
            .prompt(questions).then(answers => {
                let tplName = answers['tpl-name'];
                let tplUrl = answers['tpl-url'];
                tpls.push({
                    name: tplName, url: tplUrl
                });
                fs.writeFileSync(tpath,JSON.stringify(tpls));
            })

        })
}

module.exports = add