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
 addEventListener(type,callback){this.listeners||(this.listeners={});this.listeners[type]=callback;},setPointerCapture(){},querySelectorAll(){return []},
 getBoundingClientRect(){return {left:0,width:700}}
});
const bodyClasses=new Set();
const document={
 body:{classList:{
  toggle(name,enabled){if(enabled)bodyClasses.add(name);else bodyClasses.delete(name);},
  contains(name){return bodyClasses.has(name);}
 }},
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
   '[data-toggle-group]':get('#tracks').innerHTML+get('#timelineEvents').innerHTML+get('#studyHighlights').innerHTML+'<button data-toggle-group="context"></button>',
   '[data-quick-toggle-group]':get('#tracks').innerHTML+get('#timelineEvents').innerHTML+get('#studyHighlights').innerHTML,
   '[data-simple-filter]':get('#simpleSectionsMenu').innerHTML,
   '[data-simple-fold]':get('#simpleSectionsMenu').innerHTML,
   '[data-filter]':get('#filters').innerHTML,
   '[data-hide-person]':get('#tracks').innerHTML,
   '[data-hide-event]':get('#timelineEvents').innerHTML,
   '[data-view-event]':get('#timelineEvents').innerHTML,
   '[data-read-event]':get('#timelineEvents').innerHTML,
   '[data-view-study]':get('#studyHighlights').innerHTML,
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
const window={innerWidth:800,addEventListener(){},matchMedia(query){return {matches:query==='(max-width:600px)'&&this.innerWidth<=600}}};
const sandbox={document,window};
const api=vm.runInNewContext(sources.join('\n')+'\n({setupEra,zoomTo,jumpToEvent,jumpToStudyHighlight,inspect:()=>({mode:viewMode,era:eraId,year:selectedYear,start:START,end:END,zoom:zoomLevel,events:events.length,hiddenPeople:[...hiddenPeople],categories:[...visibleCategories],hidden:[...hiddenEvents],collapsed:[...collapsedTimelineGroups],study:selectedStudyHighlight?.label||null})})',sandbox);
const list=(name)=>callbacks['[data-'+name+']']||[];
const control=(name,value)=>list(name).find(e=>Object.values(e.dataset).includes(String(value)));
for(const era of ['jaredites','patriarchs','kings','jerusalem','exile','lehi','christ','aftermath']){
 api.setupEra(era);
 assert.equal(list('hide-event').length,api.inspect().events,'every event has an individual row: '+era);
 assert.equal(list('view-event').length,api.inspect().events,'every event has an action: '+era);
 assert.equal(list('read-event').length,api.inspect().events,'every event has a mobile Read action: '+era);
}
api.setupEra('jerusalem');
assert.equal(api.inspect().events,19);
assert.equal(list('view-study').length,10,'Daniel & exile study shelf lists 10 linked readings');
assert(get('#studyHighlights').innerHTML.includes('Connected Study · Daniel & Exile'));
assert(get('#eventJump').innerHTML.includes('CONNECTED STUDY · Daniel 1–7 & exile'));
assert(get('#eventJump').innerHTML.includes('Daniel 3 · The fiery furnace'));
assert(get('#eventJump').innerHTML.includes('Daniel 4 · Nebuchadnezzar’s humbling'));
assert(get('#eventJump').innerHTML.includes('Ezekiel 37 · Valley of dry bones'));
assert(get('#eventJump').innerHTML.includes('Psalm 137 · Exile, lament, and hope'));
assert(get('#eventJump').innerHTML.includes('Isaiah 40–55 · Return, comfort, and Cyrus'));
const studyStart=api.inspect();
get('#eventJump').listeners.change({target:{value:'study:4'}}); // Select Daniel 5 through the actual picker handler.
assert.equal(api.inspect().year,studyStart.year,'cross-era study must not move Jerusalem year to 539 BC');
assert.equal(api.inspect().start,studyStart.start,'study must preserve the visible era');
assert.equal(api.inspect().study,'Daniel 5 · Belshazzar and the writing on the wall');
assert(get('#contextTitle').textContent.includes('Connected study'));
assert(get('#events').innerHTML.includes('after this era'));
assert(get('#events').innerHTML.includes('Daniel 5'));
assert(get('#eventJump').value==='study:4');
control('toggle-group','study').onclick();
assert(get('#studyHighlights').innerHTML.includes('timeline-group-body-study" class="timeline-group-body" hidden'));
control('view-study',2).onclick(); // Select the undated fiery furnace through its study shelf button.
assert(get('#events').innerHTML.includes('Date not established'));
assert.equal(api.inspect().year,studyStart.year);
api.jumpToStudyHighlight(8); // Exile Psalm 137 has no securely dated composition.
assert(get('#events').innerHTML.includes('Date not established'));
api.jumpToEvent(0);
assert.equal(api.inspect().study,null,'ordinary event navigation clears cross-era focus');
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
api.setupEra('exile');
assert.equal((get('#studyHighlights').innerHTML.match(/data-view-study=/g)||[]).length,0,'study shelf is not duplicated in Exile & Return');
assert(get('#studyHighlights').innerHTML==='','cross-era shelf only shows in Jerusalem');
api.setupEra('jerusalem');api.zoomTo(1);
const zoom=api.inspect();
control('hide-event',2).onclick();
control('toggle-group','events').onclick();
assert.equal(api.inspect().year,zoom.year,'hiding and collapsing do not change selected year');
assert.equal(api.inspect().start,zoom.start,'hiding and collapsing do not change zoom');
assert.equal(api.inspect().end,zoom.end);
assert(!file('timeline-groups.css').match(/max-height\s*:\s*\d+px|overflow-y\s*:\s*(auto|scroll)/),'no nested vertical scrolling');
assert(html.includes('SIGNIFICANT EVENTS'),'significant events label preserved');
assert(html.includes('id="eraNotes"'),'historical notes disclosure exists');
const css=file('timeline-groups.css');
assert(css.includes('@media (max-width:600px)'),'mobile-only CSS block defined');
assert(css.includes('grid-template-columns:minmax(0,1fr) auto'),'mobile event title spans the width instead of 84px');
assert(css.includes('white-space:nowrap;overflow:hidden;text-overflow:ellipsis'),'exceptionally long event names do not wrap to many lines');
assert(css.includes('.event-read-button'),'visible mobile Read action styled');
assert(css.includes('.era-notes>summary'),'historical notes summary styled');
window.innerWidth=390;
api.setupEra('kings');
assert(api.inspect().collapsed.includes('events'),'event section starts collapsed on phone');
assert(!get('#eraNotes').open,'historical notes start closed on phone');
assert(get('#timelineEvents').innerHTML.includes('timeline-group-body-events" class="timeline-group-body" hidden'));
assert.equal(list('read-event').length,api.inspect().events);
control('toggle-group','events').onclick();
assert(!api.inspect().collapsed.includes('events'),'can expand event section on phone');
const firstRead=control('read-event',0);
assert(firstRead&&typeof firstRead.onclick==='function','Read action has a working handler');
firstRead.onclick({stopPropagation(){}});
assert(get('#events').innerHTML.includes('Selected event'),'Read opens the corresponding study card');
api.setupEra('jerusalem');
assert(api.inspect().collapsed.includes('study'),'connected Daniel study starts collapsed on phone');
assert.equal(list('view-study').length,10,'collapsed study shelf retains its linked readings');
assert(!get('#eraNotes').open);
control('toggle-group','events').onclick();
control('hide-event',0).onclick();
assert(get('#timelineEvents').innerHTML.includes('(18 of 19)</span>'),'mobile hiding keeps visible-of-total counts');
assert(get('#hiddenTracks').innerHTML.includes('data-restore-event="0"'),'mobile hidden event appears at top');
control('restore-event',0).onclick();
assert.equal(api.inspect().hidden.length,0,'mobile restore returns event row');
assert.equal(list('read-event').length,19,'Read controls return when hidden event is restored');
window.innerWidth=800;
api.setupEra('jerusalem');
assert(!api.inspect().collapsed.includes('events'),'events start expanded on desktop');
assert(!api.inspect().collapsed.includes('study'),'study shelf starts expanded on desktop');
assert(get('#eraNotes').open,'historical notes remain open on desktop');

assert(html.includes('id="viewDetailed"')&&html.includes('id="viewSimple"'),'two view controls exist');
assert(html.includes('id="simpleYearLabel"')&&html.includes('id="simpleWindowNote"'),'inline year and compact range exist');
assert(html.includes('id="simpleSectionsControl"'),'Sections menu exists');
assert(css.includes('.simplified-view .legend')&&css.includes('.simplified-view footer'),'simplified hides legend and footnotes');
assert(css.includes('.simplified-view #eraNotes'),'simplified hides historical notes');
assert(css.includes('.simplified-view #timelineTouch .timeline-group-toggle{display:none}'),'simplified hides headings');
assert(css.includes('.simplified-view .person-name'),'simplified uses category colors for person names');
assert(css.includes('.simplified-view .scale{grid-template-columns:0 minmax(0,1fr);gap:0}'),'mobile axis aligns with full-width bars');
window.innerWidth=390;
api.setupEra('jerusalem');
const detailedBefore=api.inspect();
get('#viewSimple').onclick();
assert.equal(api.inspect().mode,'simple');
assert(bodyClasses.has('simplified-view'),'simplified CSS class set');
assert.equal(get('#viewSimple').attributes['aria-pressed'],'true');
assert(api.inspect().collapsed.includes('context'),'Scripture Context collapsed until needed');
assert(api.inspect().collapsed.includes('events'),'event list starts collapsed in simplified');
assert(get('#simpleSectionsMenu').innerHTML.includes('data-simple-filter="prophets"'));
assert(get('#simpleSectionsMenu').innerHTML.includes('data-simple-fold="prophets"'));
get('#simpleSectionsControl').open=true;
control('simple-fold','prophets').onclick();
assert(api.inspect().collapsed.includes('prophets'),'Sections menu folds category');
assert(get('#simpleSectionsControl').open,'Sections menu stays open after use');
control('simple-filter','foreign').onclick();
assert(!api.inspect().categories.includes('foreign'),'Sections menu also filters categories');
control('hide-person','Jeremiah').onclick();
assert(api.inspect().hiddenPeople.includes('Jeremiah'),'individual hide remains active');
control('quick-toggle-group','kings').onclick();
assert(api.inspect().collapsed.includes('kings'),'tiny colored handle can fold a category');
api.zoomTo(1);
const simpleBefore=api.inspect();
get('#viewDetailed').onclick();
const detailedAfter=api.inspect();
assert.equal(detailedAfter.mode,'detailed');
assert(!bodyClasses.has('simplified-view'));
assert.equal(detailedAfter.year,simpleBefore.year);
assert.equal(detailedAfter.start,simpleBefore.start);
assert.equal(detailedAfter.end,simpleBefore.end);
assert.equal(detailedAfter.zoom,simpleBefore.zoom);
assert(detailedAfter.hiddenPeople.includes('Jeremiah'));
assert(!detailedAfter.categories.includes('foreign'));
assert(!detailedAfter.collapsed.includes('prophets')&&!detailedAfter.collapsed.includes('kings'),
 'the detailed view retains its independent fold state');
get('#viewSimple').onclick();
assert(api.inspect().collapsed.includes('kings')&&api.inspect().collapsed.includes('prophets'),
 'the simplified fold state is preserved on return');
assert.equal(get('#simpleYearLabel').textContent, '597 BC');
assert(get('#simpleWindowNote').textContent.includes('25y'),'compact zoom range remains synchronized');
api.jumpToEvent(0);
assert(!api.inspect().collapsed.includes('context'),'event selection expands Scripture Context in simplified');
get('#collapseAllGroups').onclick();
assert(api.inspect().collapsed.includes('context'));
get('#expandAllGroups').onclick();
assert(!api.inspect().collapsed.includes('context'),'Expand All restores context even without visible header');
api.setupEra('exile');
assert.equal(api.inspect().mode,'simple','view choice persists when switching eras');
assert(api.inspect().collapsed.includes('context'),'new era gets fresh simplified fold defaults');
get('#viewDetailed').onclick();
assert.equal(api.inspect().mode,'detailed');
assert(!api.inspect().collapsed.includes('context'));

console.log('Event layout checks passed: 8 eras, 19 Jerusalem rows, 10 Daniel links, mobile and desktop views, section toggles, and state retention.');
