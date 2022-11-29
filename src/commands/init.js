const fs = require('fs');
const inquirer = require('inquirer'); // 命令行交互工具
const chalk = require('chalk'); // 颜色显示工具
const downloadGitRepo = require("download-git-repo"); // 下载git 仓库代码工具
const ora = require("ora"); //加载工具

// node的 util 模块 promisify可以把回调promise化
const { promisify } = require("util");
const download = promisify(downloadGitRepo)

 const init  = (program) => {
    program
  .command('init')
  .alias('i')
  .description('初始化项目')
  .action(option => {
    console.log(option);
    // 该对象用于存储所有与用户交互的数据
    let config = {
      // 假设我们需要用户自定义项目名称
      projectName: option ? option : null,
    };
    // 使用chalk打印美化的版本信息
    console.log(chalk.default.bold('hello v1.0.0'));

    // 用于存储所有的交互步骤，例如让用户输入项目名称就是其中一个步骤
    let promps = [];
    if (config.projectName === null) {
      promps.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称',
        validate: input => {
          if (!input) {
            return '项目名称不能为空';
          }
          // 更新对象中属性的数据
          config.projectName = input;
          return true;
        }
      });
    }

    // 至此，与用户的所有交互均已完成，answers是收集到的用户所填的所有数据
    // 同时，这也是你开始操作的地方，这个cli工具的核心代码应该从这个地方开始
    inquirer.prompt(promps).then(async (answers) => {
      const repo = 'vuejs/awesome-vue'
      const dir =  answers.projectName
      const exist = fs.existsSync(dir)
      if(exist){
        console.log('路径已存在');
        process.exit()
      }
      clone(repo,dir)
    });
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