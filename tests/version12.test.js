/* Node.js smoke/regression checks for the curated V12 data.
 * Run: node tests/version12.test.js
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
const extra=fs.readFileSync(path.join(root,'version12.js'),'utf8');
const study=fs.readFileSync(path.join(root,'study-data.js'),'utf8');
new Function(study);
new Function(extra);
const inline=html.match(/<script>([\s\S]*?)<\/script>/);
assert(inline,'Inline timeline script exists');
new Function(inline[1]);
assert(html.includes('<script src="version12.js"></script>'));
assert(html.includes('enhanceVersion12();'));
assert(html.includes('VERSION 12'));

const original=['nephi10','twonephi25','omni','hel8','jer1','jer25','kings22','kings24','kings25','jer38'];
const refs=Object.fromEntries(original.map(k=>[k,[k,'https://example.org/'+k]]));
const eraConfig={
  kings:{tracks:[],events:[],related:[],note:''},
  jerusalem:{tracks:[],events:[],related:[],note:''}
};
const colors={};
const settings={};
const E=(a,b,title,detail,keys,cat,kind)=>({a,b,title,detail,refs:keys,cat,kind});
const R=(year,title,detail,keys)=>({year,title,detail,refs:keys});
const context={refs,eraConfig,colors,settings,E,R};
vm.runInNewContext(extra+'\nenhanceVersion12();',context,{filename:'version12.js'});
const exile=eraConfig.exile;
assert(exile,'Exile & Return era exists');
assert.equal(exile.start,605);
assert.equal(exile.end,400);
assert(exile.tracks.some(t=>t.name.startsWith('Daniel')));
assert(exile.events.find(e=>e.title.includes('Daniel sees the four beasts')).a>exile.events.find(e=>e.title.includes('Babylon falls')).a);
assert(exile.events.find(e=>e.title.includes('fiery furnace')).undated);
assert(exile.events.find(e=>e.title.includes('dry bones')).undated);
assert(exile.events.some(e=>e.title.includes('Malachi')));
assert(eraConfig.kings.tracks.some(t=>t.name==='Huldah'));
assert(eraConfig.kings.tracks.some(t=>t.name.startsWith('Daniel')&&t.a>=eraConfig.kings.end&&t.b<eraConfig.kings.end));
assert(eraConfig.kings.events.some(e=>e.title.includes('Daniel enters Babylonian court service')));
assert(html.includes("'jerusalem','exile','lehi'"),'Exile & Return is ordered between Jerusalem and Lehi in the picker');
assert(eraConfig.jerusalem.tracks.some(t=>t.name.startsWith('Daniel')));
assert(settings.exile?.length===2);
for (const era of [exile,eraConfig.kings,eraConfig.jerusalem]){
 for (const item of [...era.tracks,...era.events]){
  assert(item.a>=item.b,'date bounds reversed for '+(item.title||item.name));
  if(item.refs)for(const key of item.refs)assert(refs[key],'unknown scripture reference '+key);
 }
}
for(const t of exile.tracks)assert(exile.categories.some(([cat])=>cat===t.c),'invalid category '+t.c);
console.log('Version 12 smoke checks passed: '+exile.tracks.length+' exile tracks, '+exile.events.length+' exile events.');
