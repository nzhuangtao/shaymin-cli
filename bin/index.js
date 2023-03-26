#!/usr/bin/env node

const { createReactComponent, createVueComponent, createDemo } = require('../module/index');
const { program } = require('commander');
program
    .name('shaymin-cli')
    .description('可爱的谢米来帮你开发')
    .version('0.8.0');

program
    .command('react')
    .description("创建react组件")
    .argument('<componentName>')
    .action((componentName) => {
        createReactComponent(componentName);
    });
program
    .command('vue')
    .description("创建vue组件")
    .argument('<componentName>')
    .action((componentName) => {
        createVueComponent(componentName);
    });
program
    .command('demo')
    .description("创建普通工程模板")
    .argument('<projectname>')
    .action((projectName) => {
        createDemo(projectName);
    });
program.parse();