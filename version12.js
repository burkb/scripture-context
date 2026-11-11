/* Scripture Context V12: curated historical coverage.
 * Dates are approximate unless a record explicitly anchors a regnal year.
 * A track represents documented/traditionally proposed activity, not a lifespan.
 * Never turn an undated narrative into a precise event merely to draw a bar.
 * Come, Follow Me 2026 is a coverage audit, not the chronological data model.
 */
function enhanceVersion12(){
  const base='https://www.churchofjesuschrist.org/study/scriptures/';
  const add=(id,label,path)=>{refs[id]=[label,base+path+'?lang=eng']};
  [
    ['1k17','1 Kings 17–19','ot/1-kgs/17'],['2k2','2 Kings 2','ot/2-kgs/2'],
    ['2k5','2 Kings 5','ot/2-kgs/5'],['1k12','1 Kings 12','ot/1-kgs/12'],
    ['2k17','2 Kings 17','ot/2-kgs/17'],['2k18','2 Kings 18–19','ot/2-kgs/18'],
    ['2k22','2 Kings 22:14–20','ot/2-kgs/22'],['2ch36','2 Chronicles 36','ot/2-chr/36'],
    ['amos1','Amos 1–2','ot/amos/1'],['amos5','Amos 5','ot/amos/5'],
    ['hos1','Hosea 1–3','ot/hosea/1'],['mic3','Micah 3–4','ot/micah/3'],
    ['mic5','Micah 5','ot/micah/5'],['jon1','Jonah 1–4','ot/jonah/1'],
    ['nah1','Nahum 1–3','ot/nahum/1'],['zeph1','Zephaniah 1–3','ot/zeph/1'],
    ['hab1','Habakkuk 1–3','ot/hab/1'],['isa7','Isaiah 7','ot/isa/7'],
    ['isa36','Isaiah 36–39','ot/isa/36'],['isa40','Isaiah 40–55','ot/isa/40'],
    ['jer25','Jeremiah 25','ot/jer/25'],['jer29','Jeremiah 29','ot/jer/29'],
    ['jer39','Jeremiah 39','ot/jer/39'],['jer52','Jeremiah 52','ot/jer/52'],
    ['lam1','Lamentations 1–5','ot/lam/1'],['ezek1','Ezekiel 1','ot/ezek/1'],
    ['ezek37','Ezekiel 37','ot/ezek/37'],['ezek40','Ezekiel 40','ot/ezek/40'],
    ['dan1','Daniel 1','ot/dan/1'],['dan2','Daniel 2','ot/dan/2'],
    ['dan3','Daniel 3','ot/dan/3'],['dan4','Daniel 4','ot/dan/4'],
    ['dan5','Daniel 5','ot/dan/5'],['dan6','Daniel 6','ot/dan/6'],
    ['dan7','Daniel 7','ot/dan/7'],['dan8','Daniel 8','ot/dan/8'],
    ['dan9','Daniel 9','ot/dan/9'],['dan10','Daniel 10–12','ot/dan/10'],
    ['isa45','Isaiah 44:28–45:7','ot/isa/45'],['ezra1','Ezra 1–2','ot/ezra/1'],
    ['ezra3','Ezra 3','ot/ezra/3'],['ezra4','Ezra 4–6','ot/ezra/4'],
    ['ezra6','Ezra 6','ot/ezra/6'],['ezra7','Ezra 7–10','ot/ezra/7'],
    ['neh1','Nehemiah 1–2','ot/neh/1'],['neh6','Nehemiah 6','ot/neh/6'],
    ['neh8','Nehemiah 8–10','ot/neh/8'],['est1','Esther 1–10','ot/esth/1'],
    ['hag1','Haggai 1–2','ot/hag/1'],['zech1','Zechariah 1–8','ot/zech/1'],
    ['mal1','Malachi 1–4','ot/mal/1'],['ps137','Psalm 137','ot/ps/137'],
    ['obad1','Obadiah 1','ot/obad/1'],['joel2','Joel 2','ot/joel/2']
  ].forEach(([id,label,path])=>add(id,label,path));
  const T=(name,a,b,c,note,uncertain=true)=>({name,a,b,c,note,uncertain});
  const event=(a,b,title,detail,keys,cat,kind='approximate')=>E(a,b,title,detail,keys,cat,kind);
  const undated=(a,b,title,detail,keys,cat)=>({...event(a,b,title,detail,keys,cat,'traditional'),undated:true,phase:'Undated within this historical setting'});
  const earlier=eraConfig.kings;
  earlier.note='Curated survey of kings, prophets, and key events. Prophetic books are placed by their historical setting, not canonical order; some dates and authorship are disputed. Use Jump to an event for references.';
  earlier.tracks.push(
    T('Daniel (Babylon / Persia)',605,536,'prophets','Daniel’s early Babylonian court narrative begins near the end of this era. His recorded activity continues under Persian rule; see Exile & Return for the full span.'),
    T('Elijah',875,850,'prophets','Approximate ministry under Ahab and Ahaziah in northern Israel.'),
    T('Elisha',850,800,'prophets','Approximate ministry in northern Israel; not a lifespan.'),
    T('Jonah',790,750,'prophets','2 Kings 14:25 connects Jonah with Jeroboam II; the narrative in Jonah is not precisely dated.'),
    T('Amos',765,750,'prophets','Ministry in the reigns of Uzziah and Jeroboam II; approximate.'),
    T('Hosea',755,715,'prophets','Ministry spanning Israel’s final decades; end date uncertain.'),
    T('Micah',735,700,'prophets','Active in the reigns of Jotham, Ahaz, and Hezekiah; approximate.'),
    T('Hezekiah',715,686,'kings','Approximate reign of Judah’s king; overlaps debated coregencies.'),
    T('Manasseh',697,642,'kings','Reign dates vary depending on coregency assumptions.'),
    T('Huldah',622,622,'prophets','Prophetess consulted about the book of the law; this is an episode, not a lifespan.'),
    T('Nahum',660,612,'prophets','Broad setting before Nineveh fell; precise ministry years unknown.'),
    T('Zephaniah',640,609,'prophets','Prophet during Josiah’s reign; broad period.'),
    T('Habakkuk',612,597,'prophets','Broad late-Judah placement, not an exact dated ministry.'),
    T('Jeremiah',627,600,'prophets','Ministry begins in 627 BC and continues beyond this era.',false)
  );
  earlier.events.push(
    event(605,597,'Daniel enters Babylonian court service','Daniel 1 places Daniel and his companions at the Babylonian court during Judah’s final years. The dating is debated; follow the continuing narrative in Exile & Return.',['dan1','2ch36'],'prophets','traditional'),
    event(875,850,'Elijah confronts idolatry in Israel','Elijah ministers under Ahab and encounters the prophets of Baal on Mount Carmel. The event cannot be fixed to a calendar year.',['1k17'],'prophets'),
    event(850,800,'Elisha ministers in northern Israel','Accounts of Elisha include the healing of Naaman and succession after Elijah; exact dates of episodes are uncertain.',['2k2','2k5'],'prophets'),
    event(790,750,'Jonah and Nineveh','Jonah’s prophetic context is associated with Jeroboam II, but the narrative offers no secure year for his mission.',['jon1'],'prophets','traditional'),
    event(765,750,'Amos warns Israel','Amos condemns injustice and empty worship in the northern kingdom.',['amos1','amos5'],'prophets'),
    event(755,715,'Hosea warns and calls Israel back','Hosea’s marriage symbolism and covenant appeals address Israel in its final decades.',['hos1'],'prophets'),
    event(735,700,'Micah prophesies about Zion and a future ruler','Micah ministers alongside the later period of Isaiah; his messages include both judgment and hope.',['mic3','mic5'],'prophets'),
    event(740,700,'Isaiah speaks during the Assyrian threat','Compare Isaiah with the kingdom histories for the reigns of Ahaz and Hezekiah.',['isa7','isa36','2k18'],'prophets'),
    event(722,720,'Samaria falls to Assyria','The northern kingdom of Israel falls to Assyria, after a series of campaigns and deportations.',['2k17'],'kings'),
    event(701,701,'Sennacherib invades Judah','Hezekiah’s reign intersects the Assyrian campaign; Isaiah and Kings record Jerusalem’s crisis.',['2k18','isa36'],'kings','historical'),
    event(660,612,'Nahum prophesies against Nineveh','Nahum addresses the fall of Assyria’s capital; the precise date of composition is disputed.',['nah1'],'prophets'),
    event(640,609,'Zephaniah warns in Josiah’s reign','Zephaniah’s prophecies belong to the reign of Josiah; precise years are uncertain.',['zeph1'],'prophets'),
    event(622,622,'Huldah consulted during Josiah’s reforms','Huldah is called a prophetess and confirms the gravity of the rediscovered law.',['2k22','kings22'],'prophets','approximate'),
    event(612,597,'Habakkuk questions violence and injustice','Habakkuk wrestles with the rise of the Chaldeans and God’s justice.',['hab1'],'prophets'),
    event(627,600,'Jeremiah begins and continues his ministry','Jeremiah is called under Josiah and witnesses the crisis leading to Judah’s fall.',['jer1','jer25'],'prophets')
  );
  earlier.related.push(
    R(722,'Later reflection on the fall of Israel','The historical narrative explains the fall of the northern kingdom in covenant terms.',['2k17']),
    R(701,'Parallel accounts of Hezekiah’s crisis','Kings and Isaiah recount the same Assyrian crisis from overlapping perspectives.',['2k18','isa36'])
  );

  // The Jerusalem view intersects the opening of Daniel's Babylonian story.
  const j=eraConfig.jerusalem;
  j.tracks.push(T('Daniel (in Babylon)',605,580,'prophets','Daniel’s traditional early-exile setting; activity continues after this view ends. Exact arrival year is debated.'));
  j.tracks.push(T('Huldah',622,622,'prophets','Prophetess consulted during Josiah’s reforms; an episode, not a lifespan.'));
  j.events.push(
    event(622,622,'Huldah interprets the book of the law','The prophetess is consulted during Josiah’s reform movement.',['2k22'],'prophets'),
    event(605,597,'Daniel taken to Babylon (traditional placement)','Daniel 1 introduces Daniel and his companions at the Babylonian court. The opening regnal chronology is debated, and 605 BC is a traditional approximation.',['dan1','2ch36'],'prophets','traditional'),
    event(597,597,'Jehoiachin deported to Babylon','The 597 BC deportation places Ezekiel among the exiles. Daniel’s narrative also belongs in the Babylonian setting.',['kings24','ezek1'],'kings','historical')
  );
  // A standalone Exile & Return era keeps parallel narratives visible over the long gap.
  eraConfig.exile={
    title:'Exile & Return',period:'c. 605–400 BC',
    description:'Read Daniel, Ezekiel, Jeremiah, and the books of restoration alongside Babylonian and Persian history and Book of Mormon departures.',
    note:'Narrative dates are placed by historical setting rather than chapter order. Some dates are debated. Daniel 7–8 occur before Daniel 5 in the narrated regnal sequence; Daniel 3 is undated. The identity of Darius the Mede remains historically disputed. Book of Mormon dates use a separate traditional chronology.',
    sources:[
      ['Come, Follow Me 2026 · Old Testament','https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/000-contents?lang=eng'],
      ['Scripture chronology (Bible Dictionary)','https://www.churchofjesuschrist.org/study/scriptures/bd/chronology?lang=eng']
    ],
    start:605,end:400,defaultYear:539,
    categories:[['prophets','Prophets & visions'],['kings','Rulers & empires'],['restoration','Return & rebuilding'],['bom','Book of Mormon parallels']],
    tracks:[
      T('Jeremiah (Judah)',605,580,'prophets','Jeremiah remains associated with Judah and its aftermath; ending year is not known.'),
      T('Ezekiel (exile)',593,571,'prophets','Explicit dated visions run from about 593 to 571 BC; this is not a lifespan.'),
      T('Daniel (Babylon / Persia)',605,536,'prophets','Traditional narrative span from Babylonian court education to third year of Cyrus; first-year chronology debated.'),
      T('Nebuchadnezzar II',605,562,'kings','Babylonian king; regnal dates are historically anchored.',false),
      T('Nabonidus / Belshazzar',556,539,'kings','Nabonidus was king; Belshazzar was his son and served as regent.'),
      T('Cyrus II',539,530,'kings','Years shown are Cyrus’s rule over Babylon, not the start of his Persian reign.',false),
      T('Darius I',522,486,'kings','Persian king, distinct from the disputed Darius the Mede in Daniel.',false),
      T('Xerxes I (Ahasuerus)',486,465,'kings','Commonly identified with Esther’s Ahasuerus; narrative chronology has interpretive questions.',false),
      T('Artaxerxes I',465,424,'kings','Persian king associated with Ezra 7 and Nehemiah 2 in the conventional chronology.',false),
      T('Zerubbabel',538,516,'restoration','Leader of returning exiles; approximate span of recorded activity.'),
      T('Joshua / Jeshua the high priest',538,516,'restoration','High priest associated with temple rebuilding; approximate span.'),
      T('Haggai',520,520,'prophets','Messages dated to the second year of Darius I.',false),
      T('Zechariah',520,518,'prophets','Early dated visions under Darius I; later oracles not assigned an exact year.'),
      T('Esther / Mordecai',486,465,'restoration','Narrative set in Xerxes’ reign; this is a setting, not a lifespan.'),
      T('Ezra',458,440,'restoration','Conventional Artaxerxes I chronology; alternate dating proposals exist.'),
      T('Nehemiah',445,432,'restoration','Approximate governorship and rebuilding chronology under Artaxerxes I.'),
      T('Malachi',460,400,'prophets','Often placed in the Persian period; no fixed date is given in the book.'),
      T('Lehi and Nephi (departure)',600,580,'bom','Traditional Book of Mormon frame; Zedekiah’s accession is historically 597 BC.')
    ],
    events:[
      event(605,597,'Daniel and companions enter Babylonian service','Daniel 1 introduces the court training of Daniel, Hananiah, Mishael, and Azariah. Dating the opening to exactly 605 BC is traditional and debated.',['dan1'],'prophets','traditional'),
      event(605,562,'Nebuchadnezzar’s dream of the image','Daniel interprets the king’s dream of successive kingdoms; the chapter is placed early in the Babylonian court narrative but cannot be precisely dated.',['dan2'],'prophets','traditional'),
      undated(605,562,'The fiery furnace','Daniel 3 relates Shadrach, Meshach, and Abed-nego refusing the image. No regnal year is specified; do not infer one from chapter position.',['dan3'],'prophets'),
      undated(605,562,'Nebuchadnezzar’s humbling','Daniel 4 portrays the king’s pride, affliction, and acknowledgment of Heaven. Its specific year is not given.',['dan4'],'prophets'),
      event(597,597,'Deportation of Jehoiachin and Judahites','Babylon removes Jehoiachin and establishes Zedekiah as king in Judah; Ezekiel counts years from this exile.',['kings24','ezek1'],'kings','historical'),
      event(593,593,'Ezekiel’s inaugural vision among the exiles','Ezekiel is called by the river Chebar in the fifth year of Jehoiachin’s exile.',['ezek1'],'prophets','approximate'),
      event(588,586,'Babylon besieges Jerusalem','Jeremiah witnesses the final siege; the dating of the city’s destruction is commonly 587 or 586 BC.',['jer38','jer39'],'kings','approximate'),
      event(587,586,'Jerusalem and the temple destroyed','The fall of Jerusalem ends the kingdom of Judah and anchors the exile narratives. Lamentations mourns the catastrophe.',['kings25','jer52','lam1'],'kings','approximate'),
      event(587,580,'Mulek departs Jerusalem (traditional account)','Omni and Helaman look back on Mulek, a son of Zedekiah, leaving at the time of Jerusalem’s fall; no exact departure year is given.',['omni','hel8'],'bom','traditional'),
      event(573,573,'Ezekiel’s temple vision','Ezekiel dates the vision to the twenty-fifth year of exile, following Jerusalem’s fall.',['ezek40'],'prophets','approximate'),
      undated(593,571,'The valley of dry bones','Ezekiel 37 promises restoration to Israel. The vision has no explicit calendar year and should not be forced into chronological sequence.',['ezek37'],'prophets'),
      event(553,553,'Daniel sees the four beasts (Daniel 7)','The vision is set in the first year of Belshazzar, before the fall of Babylon narrated in Daniel 5. Approximate year based on a common regnal reconstruction.',['dan7'],'prophets','approximate'),
      event(551,551,'Daniel sees the ram and he-goat (Daniel 8)','The vision is placed in the third year of Belshazzar; the exact BCE correlation is approximate.',['dan8'],'prophets','approximate'),
      event(539,539,'Babylon falls to Persia','Cyrus’s forces take Babylon. Daniel 5 narrates Belshazzar’s feast and the end of Babylonian rule.',['dan5'],'kings','historical'),
      event(539,538,'Daniel in the lions’ den','Daniel 6 narrates events under Darius the Mede, a figure whose historical identification is disputed. Not the same person as Persian king Darius I.',['dan6'],'prophets','traditional'),
      event(539,538,'Daniel’s prayer and seventy weeks','Daniel 9 places the prayer in the first year of Darius son of Ahasuerus, whom the narrative calls a Mede; the precise identification is debated.',['dan9','jer25'],'prophets','traditional'),
      event(538,538,'Cyrus permits the return from exile','Ezra records Cyrus’s proclamation and the return under leaders including Sheshbazzar and Zerubbabel.',['ezra1','isa45'],'restoration','approximate'),
      event(536,536,'Daniel’s final dated vision','Daniel 10 explicitly places the vision in the third year of Cyrus, preceding the later prophecies in chapters 11–12.',['dan10'],'prophets','approximate'),
      event(536,535,'Altar restored and temple foundation laid','Ezra describes renewed worship and the foundation amid mixed rejoicing and mourning; exact BCE correlation varies.',['ezra3'],'restoration'),
      event(520,520,'Haggai and Zechariah encourage temple rebuilding','Their dated messages coincide with Darius I’s reign and a renewed effort to finish the temple.',['hag1','zech1','ezra4'],'prophets','approximate'),
      event(516,515,'Second temple completed','Ezra 6 dates completion to Darius I’s sixth year, commonly 516 BC.',['ezra6'],'restoration','approximate'),
      event(486,465,'Esther and Mordecai in the Persian court','The story is set under Ahasuerus, commonly identified as Xerxes I. This is a reign-length study window, not the date of each episode.',['est1'],'restoration','traditional'),
      event(458,457,'Ezra returns to Jerusalem (traditional chronology)','Ezra 7 gives the seventh year of Artaxerxes; many reconstructions identify Artaxerxes I, while some propose a different chronology.',['ezra7'],'restoration','traditional'),
      event(445,444,'Nehemiah rebuilds Jerusalem’s wall','Nehemiah receives authorization in Artaxerxes’ twentieth year and supervises rebuilding.',['neh1','neh6'],'restoration','approximate'),
      event(445,432,'Public reading and renewal of the covenant','Nehemiah 8–10 describes Ezra teaching the law and the people renewing commitments; precise placement is debated.',['neh8'],'restoration','traditional'),
      event(460,400,'Malachi challenges covenant neglect','The book addresses temple worship, justice, tithes, and the coming messenger; a precise year is unknown.',['mal1'],'prophets','traditional'),
      undated(605,400,'Exile, lament, and hope in the Psalms','Psalm 137 voices remembrance of Zion in exile; its composition cannot be assigned to a particular year on the timeline.',['ps137'],'prophets'),
      undated(605,400,'Isaiah’s promises of return and Cyrus','Isaiah 40–55 describes comfort and restoration and names Cyrus. Scholarly and traditional accounts differ on the passages’ date of composition.',['isa40','isa45'],'prophets')
    ],
    related:[
      R(587,'Lehi and Nephi prophesy of Jerusalem’s fall','1 Nephi looks toward the destruction; 2 Nephi later reflects on the destruction of Jerusalem. Book of Mormon chronology is independently traditional.',['nephi10','twonephi25']),
      R(587,'Mulek’s escape recalled centuries later','Omni and Helaman record the migration retrospectively; neither passage was written in 587 BC.',['omni','hel8']),
      R(538,'Isaiah names Cyrus in a prophecy of return','Isaiah 44–45 names Cyrus in an oracle associated with the return from exile; interpretations of authorship and dating differ.',['isa45']),
      R(516,'Ezra records the completion of the temple','Ezra 6 gives a regnal date for the temple completion; the narrative is not necessarily composed in the same year.',['ezra6'])
    ]
  };
  colors.restoration='#e69dca';
  settings.exile=[
    [605,539,'Neo-Babylonian rule','#876a44'],
    [539,400,'Persian imperial period','#527ead']
  ];
  // The earlier Jeremiah and Daniel stories span multiple displayed eras.
  eraConfig.jerusalem.note+=' Daniel’s story starts during the Babylonian crisis and continues in the Exile & Return era.';
  // Warn about particular books that cannot be responsibly assigned a strict date.
  eraConfig.kings.note+=' Joel and Obadiah are not assigned dated markers: their proposed historical settings differ substantially.';
  eraConfig.exile.note+=' The book of Lamentations and Psalms of exile are linked by setting; precise composition dates are not claimed.';
}
