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
const groupScript=fs.readFileSync(path.join(root,'timeline-groups.js'),'utf8');
const groupStyle=fs.readFileSync(path.join(root,'timeline-groups.css'),'utf8');
const foreign=fs.readFileSync(path.join(root,'foreign-rulers.js'),'utf8');
const study=fs.readFileSync(path.join(root,'study-data.js'),'utf8');
new Function(study);
new Function(extra);
new Function(foreign);
new Function(groupScript);
const inline=html.match(/<script>([\s\S]*?)<\/script>/);
assert(inline,'Inline timeline script exists');
new Function(inline[1]);
assert(html.includes('<script src="version12.js"></script>'));
assert(html.includes('enhanceVersion12();'));
assert(html.includes('<script src="foreign-rulers.js"></script>'));
assert(html.includes('enhanceForeignRulers();'));
assert(html.includes('<script src="timeline-groups.js"></script>'));
assert(html.includes('<link rel="stylesheet" href="timeline-groups.css">'));
assert(html.includes('bindTimelineGroupControls();'));
assert(html.includes('id="expandAllGroups"')&&html.includes('id="collapseAllGroups"'));
assert(html.includes('timelineGroupPanel(cat,timelineGroupLabel(cat,label,eraId)'));
assert(html.includes("timelineGroupPanel('events','Writings & Events'"));
assert(html.includes('collapsedTimelineGroups.clear();'));
assert(groupStyle.includes('color:var(--group-color)'));
assert(html.includes('VERSION 12'));

const original=['nephi10','twonephi25','omni','hel8','jer1','jer25','kings22','kings24','kings25','jer38'];
const refs=Object.fromEntries(original.map(k=>[k,[k,'https://example.org/'+k]]));
const eraConfig={
  kings:{tracks:[],events:[],related:[],note:''},
  jerusalem:{tracks:[],events:[{a:597,b:597,title:'Zedekiah becomes king',detail:'Babylon installs Zedekiah.',refs:['kings24'],cat:'kings',kind:'historical'}],related:[],note:''}
};
const colors={};
const settings={};
const E=(a,b,title,detail,keys,cat,kind)=>({a,b,title,detail,refs:keys,cat,kind});
const R=(year,title,detail,keys)=>({year,title,detail,refs:keys});
const context={refs,eraConfig,colors,settings,E,R};
vm.runInNewContext(extra+'\nenhanceVersion12();',context,{filename:'version12.js'});
vm.runInNewContext(foreign+'\nenhanceForeignRulers();',context,{filename:'foreign-rulers.js'});
const exile=eraConfig.exile;
assert(exile,'Exile & Return era exists');
const studyLinks=eraConfig.jerusalem.studyHighlights;
assert.equal(studyLinks.length,10,'Jerusalem has ten cross-era study links');
assert.equal(studyLinks.filter(link=>link.group==='Daniel 1–7').length,7,'Daniel chapters 1–7 are all linked');
for(const link of studyLinks){
 assert(exile.events.includes(link.event),'each study entry references the Exile & Return source event');
 assert(!eraConfig.jerusalem.events.includes(link.event),'later/undated stories are not inserted as Jerusalem timeline events');
 for(const key of link.event.refs)assert(refs[key],'missing study scripture reference '+key);
}
assert(studyLinks.some(link=>link.event.title==='Nebuchadnezzar’s humbling'&&link.event.undated));
assert(studyLinks.some(link=>link.event.title==='The fiery furnace'&&link.event.undated));
assert(studyLinks.some(link=>link.event.title==='The valley of dry bones'&&link.event.undated));
assert(studyLinks.some(link=>link.event.title==='Exile, lament, and hope in the Psalms'&&link.event.undated));
assert(studyLinks.some(link=>link.event.title==='Isaiah’s promises of return and Cyrus'&&link.event.undated));
assert(studyLinks.some(link=>link.label.includes('Daniel 5')&&link.event.a<580),'Daniel 5 is correctly later than Jerusalem era');
assert(studyLinks.findIndex(link=>link.label.includes('Daniel 7'))>studyLinks.findIndex(link=>link.label.includes('Daniel 5')),'study chapter sequence is distinct from chronology');

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
for(const era of [eraConfig.kings,eraConfig.jerusalem,exile]){
 assert(era.categories.some(([cat])=>cat==='foreign'),'foreign category missing in '+era.title);
 assert(era.tracks.some(t=>t.c==='foreign'),'foreign rulers missing in '+era.title);
}
const jerusalem=eraConfig.jerusalem;
assert(jerusalem.tracks.some(t=>t.name==='Nebuchadnezzar II'));
assert(jerusalem.tracks.some(t=>t.name==='Necho II'));
assert(jerusalem.events.some(e=>e.title==='Nebuchadnezzar II installs Zedekiah'&&e.refs.includes('2k24_17')));
assert(jerusalem.events.some(e=>e.title.includes('Necho II installs')));
assert(eraConfig.kings.tracks.some(t=>t.name==='Sennacherib'&&t.c==='foreign'));
assert(eraConfig.kings.tracks.some(t=>t.name==='Shalmaneser V'));
assert(eraConfig.kings.tracks.some(t=>t.name==='Sargon II'));
assert(exile.tracks.some(t=>t.name==='Cyrus II'&&t.c==='foreign'));
assert(exile.tracks.some(t=>t.name==='Zedekiah'&&t.c==='kings'));
assert(exile.tracks.some(t=>t.name==='Belshazzar (regent)'&&t.c==='foreign'));
assert(!exile.tracks.some(t=>t.name==='Nabonidus / Belshazzar'));
for (const era of [eraConfig.kings,jerusalem,exile]){
 const validCats=new Set(era.categories.map(([cat])=>cat));
 for(const item of [...era.tracks,...era.events]){
  assert(validCats.has(item.cat||item.c),'unknown category '+(item.cat||item.c)+' for '+(item.title||item.name));
  assert(item.a>=item.b,'reversed dates '+(item.title||item.name));
  for(const key of item.refs||[])assert(refs[key],'missing scripture link '+key);
 }
}
const groupResult={};
vm.runInNewContext(groupScript+`
groupResult.expanded=timelineGroupPanel('prophets','Prophets',6,'<p>Jeremiah</p>','#40cbb7');
collapsedTimelineGroups.add('prophets');
groupResult.collapsed=timelineGroupPanel('prophets','Prophets',6,'<p>Jeremiah</p>','#40cbb7');
groupResult.kingsTitle=timelineGroupLabel('kings','Judah rulers','jerusalem');
groupResult.jarediteTitle=timelineGroupLabel('jaredites','Jaredites','jaredites');
`,{groupResult},{filename:'timeline-groups.js'});
assert(groupResult.expanded.includes('Prophets <span class="timeline-group-count">(6)</span>'));
assert(groupResult.expanded.includes('aria-expanded="true"'));
assert(groupResult.collapsed.includes('aria-expanded="false"'));
assert(groupResult.collapsed.includes(' hidden>'));
assert.equal((groupResult.expanded.match(/<svg /g)||[]).length,1,'one icon in heading');
assert.equal(groupResult.kingsTitle,'Kings of Judah');
assert.equal(groupResult.jarediteTitle,'Jaredites');
console.log('Timeline group smoke checks passed: accessible headings, counts, collapse state, shared era labels.');
console.log('Version 12 foreign-rulers checks passed: '+exile.tracks.length+' exile tracks, '+exile.events.length+' exile events.');
