'use strict';
const program = require('commander');
const { version } = require('../package.json')
const versionCmd =  require('../src/commands/version.js')

describe('测试使用',() => {
    beforeAll(() => {
        console.log = jest.fn();
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('cli version:',() => {
        expect(versionCmd(program)).toBe(version)
    })
})
