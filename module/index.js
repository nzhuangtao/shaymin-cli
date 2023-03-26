const fs = require('fs');
const path = require('path');
const process = require('process');

const REACT_COMPONENT_PATH = path.join(__dirname,'../template/react/index.jsx');
const REACT_COMPONENT_CSS_PATH = path.join(__dirname,'../template/react/index.module.css');

const VUE_COMPONENT_PATH = path.join(__dirname,'../template/vue/index.vue');

const DMEO_HTML_PATH = path.join(__dirname,'../template/demo/index.html');
const DMEO_CSS_PATH = path.join(__dirname,'../template/demo/index.css');
const DMEO_JS_PATH = path.join(__dirname,'../template/demo/index.js');
const createReactComponent = (componentName)=>{
    componentName = componentName.replace(/^[a-zA-Z]/g,componentName[0].toUpperCase());
    fs.readFile(REACT_COMPONENT_PATH,{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.error("读取组件模板失败");
            return 0;
        };
        data = data.replace(/index/g,componentName);
        writeFile(componentName,'.jsx',data);
    });
    fs.readFile(REACT_COMPONENT_CSS_PATH,(err,data)=>{
        if(err){
            console.error("读取组件样式模板失败");
            return 0;
        };
        writeFile(componentName,'.module.css',data);
    });
};

const createVueComponent = (componentName)=>{
    componentName = componentName.replace(/^[a-zA-Z]/g,componentName[0].toUpperCase());
    fs.readFile(VUE_COMPONENT_PATH,{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.error("读取组件模板失败");
            return 0;
        };
        writeFile(componentName,'.vue',data);
    });
};

const createDemo = (demoName)=>{
    fs.readFile(DMEO_HTML_PATH,{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.error("读取html模板失败");
            return 0;
        };
        data = data.replace(/index/g,demoName);
        writeFile(demoName,'.html',data);
    });
    fs.readFile(DMEO_CSS_PATH,{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.error("读取css模板失败");
            return 0;
        };
        writeFile(demoName,'.css',data);
    });
    fs.readFile(DMEO_JS_PATH,{encoding:"utf-8"},(err,data)=>{
        if(err){
            console.error("读取js模板失败");
            return 0;
        };
        writeFile(demoName,'.js',data);
    });
}
function writeFile(filename,suffix,data){
    let dir = createDir(filename);
    let filePath = dir+`/${filename+suffix}`;
    fs.writeFile(filePath,data,(err)=>{
        if(err){
            console.error(`写入${filePath}失败`);
            return 0;
        };
        console.log(`写入${filePath}成功`);
    });
};

function createDir(filename){
    let dir = path.join(process.cwd(),filename);
    let isExist = fs.existsSync(dir);
    if(!isExist){
        fs.mkdirSync(dir);
    };
    return dir;
};

module.exports = {
    createReactComponent,
    createVueComponent,
    createDemo,
};