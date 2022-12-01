#! /usr/bin/env node

const program = require('commander');
const init = require('./src/commands/init');
const version = require('./src/commands/version');
const help = require('./src/commands/help')
const add = require('./src/commands/add')
const deleteTpl = require('./src/commands/delete')
const list = require('./src/commands/list')

init(program)
version(program)
help(program)
add(program)
deleteTpl(program)
list(program)

program.parse(process.argv);
