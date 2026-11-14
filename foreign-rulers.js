/* Historical-context ruler overlay for Scripture Context Version 12.
 * Add rulers of neighboring empires only when they materially shape the
 * scriptural history being studied. "Kings" = Israel/Judah; "foreign" = empire.
 * Reigns are historical ranges; they are not personal lifespans.
 */
const foreignRulerReferences={
 'Shalmaneser V':{keys:['2k17','2k18'],note:'2 Kings 17 and 18 identify Shalmaneser as the Assyrian ruler during the siege of Samaria. Attribution of the final conquest is debated.'},
 'Sargon II':{keys:['2k17'],note:'Sargon II claimed the conquest of Samaria in Assyrian inscriptions; Kings recounts the fall without naming him. His role in the final capture remains debated.'},
 'Sennacherib':{keys:['2k18','isa36'],note:'Kings and Isaiah give parallel narratives of Assyria’s campaign during Hezekiah’s reign.'},
 'Necho II':{keys:['2k23_34','2ch36'],note:'Pharaoh Necho II deposed Jehoahaz and appointed Eliakim, renaming him Jehoiakim.'},
 'Nebuchadnezzar II':{keys:['2k24_17','2ch36','dan1'],note:'Nebuchadnezzar II removed Jehoiachin, renamed Mattaniah Zedekiah, and controlled Judah during the Babylonian crisis.'},
 'Cyrus II':{keys:['ezra1','isa45'],note:'Ezra recounts Cyrus’s authorization for the return; Isaiah 44–45 refers to Cyrus by name, with disputed composition chronology.'},
 'Jehoiakim':{keys:['2k23_34','2k24_1'],note:'Installed by Necho II under the name Jehoiakim; he later became subject to Babylon.'},
 'Zedekiah':{keys:['2k24_17','2ch36'],note:'Mattaniah was made king and renamed Zedekiah by Nebuchadnezzar II.'},
 'Nabonidus':{keys:['dan5'],note:'Nabonidus was the Babylonian king; his son Belshazzar served as regent and appears in Daniel 5.'},
 'Belshazzar (regent)':{keys:['dan5','dan7','dan8'],note:'Belshazzar was a royal regent, not a separate reigning king; Daniel calls him king in the narrative.'}
};

function enhanceForeignRulers(){
  const base='https://www.churchofjesuschrist.org/study/scriptures/';
  const add=(key,label,path)=>{refs[key]=[label,base+path+'?lang=eng']};
  [
    ['2k23_34','2 Kings 23:34–35','ot/2-kgs/23'],
    ['2k24_1','2 Kings 24:1–2','ot/2-kgs/24'],
    ['2k24_17','2 Kings 24:17','ot/2-kgs/24'],
    ['2ch36','2 Chronicles 36:4, 10–13','ot/2-chr/36']
  ].forEach(([key,label,path])=>add(key,label,path));

  const T=(name,a,b,note)=>({name,a,b,c:'foreign',uncertain:false,note});
  const F=(a,b,title,detail,keys,kind='historical')=>E(a,b,title,detail,keys,'foreign',kind);
  const addFilter=(era,label)=>{if(!era.categories.some(([id])=>id==='foreign'))era.categories.push(['foreign',label])};
  colors.foreign='#ef9a74';

  const kings=eraConfig.kings;
  kings.categories=kings.categories.map(([id,label])=>[id,id==='kings'?'Israel & Judah rulers':label]);
  addFilter(kings,'Foreign rulers');
  kings.tracks.push(
    T('Shalmaneser V',727,722,'Assyrian king who besieged Samaria under Hoshea. The conquest and succession chronology are debated.'),
    T('Sargon II',722,705,'Assyrian king who claimed the capture of Samaria; whether he or Shalmaneser V completed the conquest is debated.'),
    T('Sennacherib',705,681,'Assyrian king whose 701 BC campaign threatened Hezekiah’s Judah.'),
    T('Necho II',610,595,'Egyptian pharaoh who intervened after Josiah’s death and installed Jehoiakim in 609 BC.'),
    T('Nebuchadnezzar II',605,562,'Babylonian king; the early years of his reign overlap the end of this era. He later installed Zedekiah in 597 BC.')
  );
  kings.events.push(
    F(724,722,'Shalmaneser V besieges Samaria','Second Kings identifies Shalmaneser V in the siege of Samaria. The precise sequence of Samaria’s fall and Assyrian succession is disputed.',['2k17','2k18'],'approximate'),
    F(722,720,'Sargon II claims Samaria’s conquest','Sargon II claims the conquest in his inscriptions; biblical accounts mention Shalmaneser’s earlier campaign. We cannot definitively assign every stage to one king.',['2k17'],'approximate'),
    F(609,609,'Necho II appoints Jehoiakim','After Josiah’s death, Necho II deposes Jehoahaz, appoints Eliakim king of Judah, and changes his name to Jehoiakim.',['2k23_34','2ch36']),
    F(605,600,'Babylon challenges Egyptian control of Judah','Nebuchadnezzar’s rise brings Judah under Babylonian domination during Jehoiakim’s reign. The exact stages of Judah’s submission are debated.',['2k24_1','jer25'],'approximate')
  );
  // Existing event categories must follow the ruler whose action is described.
  for(const title of ['Samaria falls to Assyria','Sennacherib invades Judah']){
    const e=kings.events.find(item=>item.title===title);
    if(e)e.cat='foreign';
  }

  const jerusalem=eraConfig.jerusalem;
  jerusalem.categories=jerusalem.categories.map(([id,label])=>[id,id==='kings'?'Judah rulers':label]);
  addFilter(jerusalem,'Foreign rulers');
  jerusalem.tracks.push(
    T('Necho II',610,595,'Egyptian pharaoh; replaced Jehoahaz with Eliakim, renamed Jehoiakim, in 609 BC.'),
    T('Nebuchadnezzar II',605,562,'Babylonian king who removed Jehoiachin and installed Mattaniah as Zedekiah in 597 BC.')
  );
  jerusalem.events.push(
    F(609,609,'Necho II installs and renames Jehoiakim','Pharaoh Necho II deposes Jehoahaz and renames Eliakim as Jehoiakim, illustrating Egyptian control of Judah.',['2k23_34','2ch36']),
    F(605,598,'Babylon exerts control over Jehoiakim','Nebuchadnezzar brings Jehoiakim under Babylonian authority; Jehoiakim later rebels.',['2k24_1'],'approximate')
  );
  const appointment=jerusalem.events.find(e=>e.title==='Zedekiah becomes king');
  if(appointment){
    appointment.title='Nebuchadnezzar II installs Zedekiah';
    appointment.detail='Nebuchadnezzar II deposes Jehoiachin and installs his uncle Mattaniah as Babylonian vassal king, renaming him Zedekiah in 597 BC.';
    appointment.refs=['2k24_17','2ch36'];
  }
  jerusalem.note+=' Foreign rulers are shown separately from Judah’s rulers; Necho II and Nebuchadnezzar II each installed and renamed a king of Judah.';

  const exile=eraConfig.exile;
  // Exile & Return was previously using "kings" for foreign rulers. Retag the
  // existing imperial tracks before adding a distinct local-dynasty category.
  exile.tracks=exile.tracks.flatMap(t=>{
    if(t.name==='Nabonidus / Belshazzar')return [
      T('Nabonidus',556,539,'Last reigning king of Neo-Babylonia; his son Belshazzar acted as regent.'),
      {name:'Belshazzar (regent)',a:553,b:539,c:'foreign',uncertain:true,note:'Son of Nabonidus and regent in Babylon; not a separate independent king. Years are approximate.'}
    ];
    if(t.c==='kings')return [{...t,c:'foreign'}];
    return [t];
  });
  exile.tracks.push(
    T('Necho II',610,595,'Egyptian pharaoh whose influence in Judah preceded Babylonian control.'),
    {name:'Jehoiakim',a:609,b:598,c:'kings',uncertain:true,note:'Judah’s king installed by Necho II in 609 BC; later came under Babylonian authority.'},
    {name:'Jehoiachin',a:598,b:597,c:'kings',uncertain:true,note:'Judah’s king deported by Nebuchadnezzar II in 597 BC; regnal conventions vary.'},
    {name:'Zedekiah',a:597,b:586,c:'kings',uncertain:true,note:'Mattaniah was appointed and renamed Zedekiah by Nebuchadnezzar II; the last reigning king before Jerusalem fell.'}
  );
  exile.events=exile.events.map(e=>e.cat==='kings'?{...e,cat:'foreign'}:e);
  exile.events.push(
    F(597,597,'Nebuchadnezzar II makes Mattaniah king as Zedekiah','After deporting Jehoiachin, Nebuchadnezzar appoints his uncle Mattaniah as Judah’s vassal ruler and changes his name to Zedekiah.',['2k24_17','2ch36']),
    F(609,605,'Egyptian rule gives way to Babylonian power','Judah’s shift from Necho II’s Egyptian influence to Nebuchadnezzar’s Babylonian control forms the background of Jeremiah, Daniel, and the final kings of Judah.',['2k23_34','2k24_1'],'approximate')
  );
  exile.categories=exile.categories.map(([id,label])=>[id,id==='kings'?'Judah rulers':label]);
  addFilter(exile,'Foreign rulers');
  exile.categories.sort((a,b)=>({prophets:0,kings:1,foreign:2,restoration:3,bom:4}[a[0]]??5)-({prophets:0,kings:1,foreign:2,restoration:3,bom:4}[b[0]]??5));
  exile.note+=' The ruler filters distinguish Judah’s final kings from Assyrian, Babylonian, Egyptian, and Persian rulers; Belshazzar is labeled regent rather than independent monarch.';
}
