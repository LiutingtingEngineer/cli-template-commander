const {version } = require('../../package.json')
module.exports = (program) => {
    // 本身可以实现 --version  -V
    program.version(version)
    return version
}