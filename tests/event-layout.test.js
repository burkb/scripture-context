/* No external packages required. Run: node tests/event-layout.test.js */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const root=path.join(__dirname,'..');
const file=name=>fs.readFileSync(path.join(root,name),'utf8');
const html=file('index.html');
const inline=html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
assert(inline,'inline timeline script found');
assert(html.includes('data-toggle-group="context"'),'Scripture Context shares group header controls');
assert(!html.includes('<details class="panel context-panel"'),'old details widget removed');
const sources=[file('study-data.js'),file('version12.js'),file('foreign-rulers.js'),file('timeline-groups.js'),inline];
sources.forEach(src=>new Function(src));
const nodes={};
const callbacks={};
const get=key=>nodes[key]||(nodes[key]={
 innerHTML:'',textContent:'',value:'',dataset:{},disabled:false,hidden:false,
 attributes:{},classList:{toggle(){}},focus(){},setAttribute(k,v){this.attributes[k]=v},
 addEventListener(){},setPointerCapture(){},querySelectorAll(){return []},
 getBoundingClientRect(){return {left:0,width:700}}
});
const document={
 querySelector(sel){
  if(sel.startsWith('#'))return get(sel);
  const match=sel.match(/^\[data-([a-z-]+)="([^"]+)"\]$/);
  if(match){
   const property=match[1].replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
   return Object.values(callbacks).flat().find(e=>e.dataset?.[property]===match[2])||null;
  }
  return null;
 },
 querySelectorAll(sel){
  const sections={
   '[data-toggle-group]':get('#tracks').innerHTML+get('#timelineEvents').innerHTML+'<button data-toggle-group="context"></button>',
   '[data-filter]':get('#filters').innerHTML,
   '[data-hide-person]':get('#tracks').innerHTML,
   '[data-hide-event]':get('#timelineEvents').innerHTML,
   '[data-view-event]':get('#timelineEvents').innerHTML,
   '[data-show-person]':get('#hiddenTracks').innerHTML,
   '[data-restore-event]':get('#hiddenTracks').innerHTML
  };
  const attr=sel.slice(1,-1);
  const field=attr.replace(/^data-/,'').replace(/-([a-z])/g,(_,c)=>c.toUpperCase());
  callbacks[sel]=[...(sections[sel]||'').matchAll(new RegExp(attr+'="([^"]+)"','g'))]
   .map(m=>({dataset:{[field]:m[1]},focus(){},onclick:null}));
  return callbacks[sel];
 }
};
const window={innerWidth:800,addEventListener(){}};
const sandbox={document,window};
const api=vm.runInNewContext(sources.join('\n')+'\n({setupEra,zoomTo,jumpToEvent,inspect:()=>({year:selectedYear,start:START,end:END,events:events.length,hidden:[...hiddenEvents],collapsed:[...collapsedTimelineGroups]})})',sandbox);
const list=(name)=>callbacks['[data-'+name+']']||[];
const control=(name,value)=>list(name).find(e=>Object.values(e.dataset).includes(String(value)));
for(const era of ['jaredites','patriarchs','kings','jerusalem','exile','lehi','christ','aftermath']){
 api.setupEra(era);
 assert.equal(list('hide-event').length,api.inspect().events,'every event has an individual row: '+era);
 assert.equal(list('view-event').length,api.inspect().events,'every event has an action: '+era);
}
api.setupEra('jerusalem');
assert.equal(api.inspect().events,19);
assert(get('#timelineEvents').innerHTML.includes('(19)</span>'));
const before=api.inspect();
control('hide-event',0).onclick();
assert.equal(api.inspect().hidden.length,1);
assert(get('#timelineEvents').innerHTML.includes('(18 of 19)</span>'));
assert(get('#hiddenTracks').innerHTML.includes('data-restore-event="0"'));
control('toggle-group','events').onclick();
assert(get('#timelineEvents').innerHTML.includes('id="timeline-group-body-events" class="timeline-group-body" hidden'));
control('toggle-group','context').onclick();
assert(get('#timeline-group-body-context').hidden);
assert.equal(get('#contextToggle').attributes['aria-expanded'],'false');
api.jumpToEvent(0); // Hidden entries must stay searchable in the Jump picker.
assert.equal(api.inspect().hidden.length,1);
assert(get('#eventJump').innerHTML.includes('Jeremiah begins his ministry'));
assert(!get('#timeline-group-body-context').hidden,'selecting an event reopens Scripture Context');
control('restore-event',0).onclick();
assert.equal(api.inspect().hidden.length,0);
assert.equal(list('hide-event').length,19);
api.setupEra('jerusalem');api.zoomTo(1);
const zoom=api.inspect();
control('hide-event',2).onclick();
control('toggle-group','events').onclick();
assert.equal(api.inspect().year,zoom.year,'hiding and collapsing do not change selected year');
assert.equal(api.inspect().start,zoom.start,'hiding and collapsing do not change zoom');
assert.equal(api.inspect().end,zoom.end);
assert(!file('timeline-groups.css').match(/max-height\s*:\s*\d+px|overflow-y\s*:\s*(auto|scroll)/),'no nested vertical scrolling');
console.log('Event layout checks passed: 8 eras, 19 Jerusalem rows, hidden restore, context collapse, jump and zoom.');
