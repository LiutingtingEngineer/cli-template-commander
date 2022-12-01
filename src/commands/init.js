const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer'); // 命令行交互工具
const chalk = require('chalk'); // 颜色显示工具
const downloadGitRepo = require("download-git-repo"); // 下载git 仓库代码工具
const ora = require("ora"); //加载工具
const tpath = path.resolve(process.cwd(),'./template.json');
let tlps = require(tpath);

// node的 util 模块 promisify可以把回调promise化
const { promisify } = require("util");
const download = promisify(downloadGitRepo)

 const init  = (program) => {
    program
    .command('init')
    .description('init project')
    .usage('<template-name> [project-name]')
    .action(option => {
      if(program.args.length < 1){
        program.help();
        return;
      }

      let tName = program.args[1];
      let pName = program.args[2];

      // 校验输入的模板名称
      if(tlps.filter(v => (v.name === tName)).length == 0){
        console.log(chalk.red("模板名称不存在，请使用 tke list 命令查看可输入的模板"));
        return
      }
      // 校验输入的项目名称 是否存在
      if(!pName){
        console.log(chalk.red('项目文件夹名称不能为空'));
        return
      }

      let url = tlps.filter(v => (tName === v.name))[0].url;
      console.log(chalk.yellow('开始创建项目'));

      clone(url,pName)
  });
}

/**
 * 
 * @param {*} repo git的地址
 * @param {*} dir  文件夹目录结构
 * @param {*} opotions 传递相关的参数
 */
const clone = async function(repo, dir, opotions = {}) {
  const process = ora(`开始下载 ${chalk.blue(repo)}`);
  process.start();
  process.color = "yellow";
  process.text = `正在下载..... ${chalk.yellow(repo)} `;
  try {
    await download(repo, dir, opotions);
    process.color = "green";
    process.text = `下载成功 ${chalk.green(repo)} `;
    process.succeed();
  } catch (error) {
    process.color = "red";
    process.text = "下载失败";
    process.fail();
  }
};

module.exports = init