#! /usr/bin/env node

const program = require('commander');
const init = require('./src/commands/init');
const version = require('./src/commands/version');
const help = require('./src/commands/help')

init(program)
version(program)
help(program)

program.parse(process.argv);
