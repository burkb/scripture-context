/* Visual grouping only: the existing year scale, filtering, tracks and events
 * remain the source of truth. Folding is independent of filtering/hiding rows. */
const collapsedTimelineGroups=new Set();

const timelineGroupIconPaths={
 kings:'<path d="m2 8 4 3 6-7 6 7 4-3-2 11H4L2 8Z"/><path d="M4 22h16"/>',
 foreign:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 0 0 18M12 3a15 15 0 0 1 0 18"/>',
 prophets:'<path d="m3 10 9-7 9 7"/><path d="M5 10v10M10 10v10M14 10v10M19 10v10M3 21h18"/>',
 bom:'<path d="m3 20 9-17 9 17H3Z"/><path d="M12 3v17M8 20l4-7 4 7"/>',
 nephites:'<path d="m3 20 9-17 9 17H3Z"/><path d="M12 3v17M8 20l4-7 4 7"/>',
 mulek:'<path d="M3 18h18l-3 3H6l-3-3ZM12 3v15M5 14l7-10v10H5Z"/><path d="M3 23h18"/>',
 events:'<path d="M8 4h11a3 3 0 0 1 3 3v11H8a4 4 0 1 1 0-8h9"/><path d="M8 10V4a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h14"/>',
 context:'<path d="M12 5c-3-2-6-2-10-1v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1ZM12 5v16"/>',
 jaredites:'<path d="m2 16 3 2 4-2 4 2 4-2 4 2M2 21l3-2 4 2 4-2 4 2 4-2M12 3v10M5 13h14l-2 3H7l-2-3Z"/>',
 patriarchs:'<circle cx="12" cy="7" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2M2 11l3 3M22 11l-3 3"/>',
 nt:'<path d="M12 5c-3-2-6-2-10-1v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1ZM12 5v16"/>',
 apostles:'<path d="M12 5c-3-2-6-2-10-1v16c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1ZM12 5v16"/>',
 restoration:'<path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-7h6v7M5 11h14"/>'
};
function timelineGroupIcon(category){
 const paths=timelineGroupIconPaths[category]||timelineGroupIconPaths.nt;
 return '<svg class="timeline-group-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+paths+'</svg>';
}
function timelineGroupLabel(category,label,era){
 if(category==='kings'){
  if(era==='jerusalem'||era==='exile')return 'Kings of Judah';
  if(era==='kings')return 'Kings of Israel & Judah';
 }
 if(category==='foreign')return 'Foreign Rulers';
 if(category==='bom')return 'Lehi & Nephi';
 if(category==='nephites'&&era==='christ')return 'Book of Mormon Parallels';
 return label;
}
function timelineGroupPanel(category,title,count,body,color){
 const collapsed=collapsedTimelineGroups.has(category);
 const bodyId='timeline-group-body-'+category;
 return `<section class="timeline-group" data-group="${category}" style="--group-color:${color}">
  <button type="button" class="timeline-group-toggle" data-toggle-group="${category}" aria-expanded="${!collapsed}" aria-controls="${bodyId}">
   ${timelineGroupIcon(category)}
   <span class="timeline-group-title">${title} <span class="timeline-group-count">(${count})</span></span>
   <span class="timeline-group-chevron" aria-hidden="true"></span>
  </button>
  <div id="${bodyId}" class="timeline-group-body" ${collapsed?'hidden':''}>${body}</div>
 </section>`;
}
function bindTimelineGroupControls(){
 const toggles=[...document.querySelectorAll('[data-toggle-group]')];
 toggles.forEach(button=>{
  button.onclick=()=>{
   const category=button.dataset.toggleGroup;
   if(collapsedTimelineGroups.has(category))collapsedTimelineGroups.delete(category);
   else collapsedTimelineGroups.add(category);
   render(); // Selected year, filters, zoom and individually hidden people are unchanged.
   document.querySelector('[data-toggle-group="'+category+'"]')?.focus();
  };
 });
 const categories=toggles.map(button=>button.dataset.toggleGroup);
 const expand=document.querySelector('#expandAllGroups');
 const collapse=document.querySelector('#collapseAllGroups');
 expand.disabled=categories.every(category=>!collapsedTimelineGroups.has(category));
 collapse.disabled=categories.every(category=>collapsedTimelineGroups.has(category));
 expand.onclick=()=>{
  categories.forEach(category=>collapsedTimelineGroups.delete(category));
  render();
  expand.focus();
 };
 collapse.onclick=()=>{
  categories.forEach(category=>collapsedTimelineGroups.add(category));
  render();
  collapse.focus();
 };
}
