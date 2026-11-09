import {readFileSync,mkdirSync,writeFileSync,copyFileSync} from 'node:fs';
const files={'/index.html':'text/html; charset=utf-8','/app.js':'text/javascript; charset=utf-8','/styles.css':'text/css; charset=utf-8','/creative-performance-lka.png':'image/png','/comment-center/index.html':'text/html; charset=utf-8','/comment-center/app.js':'text/javascript; charset=utf-8','/comment-center/styles.css':'text/css; charset=utf-8'};
const assets=Object.fromEntries(Object.entries(files).map(([path,type])=>[path,{type,body:readFileSync('dist'+path).toString('base64')}]));
assets['/']=assets['/index.html'];assets['/comment-center/']=assets['/comment-center/index.html'];
mkdirSync('dist/server',{recursive:true});mkdirSync('dist/.openai',{recursive:true});
const client=JSON.parse(readFileSync('.openai/hosting.json')).project_id==='appgprj_6ae8e5e98634819183067554c20f394b'?'enotecca':'lka';
writeFileSync('dist/server/index.js','const CLIENT='+JSON.stringify(client)+';\nconst assets='+JSON.stringify(assets)+';\n'+readFileSync('worker/index.mjs','utf8'));
copyFileSync('.openai/hosting.json','dist/.openai/hosting.json');

