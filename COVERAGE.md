# Scripture Context coverage and chronology policy (Version 12)

## Purpose
Scripture Context is a curated **historical-context index**, not a concordance or an attempt to assign a date to every chapter. A visitor who selects a period should discover significant people, events, and parallel scriptural accounts—even when those accounts appear in different books.

## Inclusion criteria
Include a person, event, or passage when it (1) supplies substantial historical context, (2) connects parallel accounts, (3) anchors an important chronological transition, or (4) is a significant part of the relevant Come, Follow Me coverage. A ruler and a prophetess such as Huldah may be as important for context as the author of a biblical book. Do not assume one book equals one timeline row.

## Chronology conventions
- Positive numeric years mean BC; negative numeric years mean AD (there is no year zero).
- Tracks represent a reign, documented activity, a traditional narrative range, or a broad study setting **not necessarily lifespans**.
- Events are placed according to the **historical setting of the narrative**, not canonical chapter order or the date an account was recorded.
- Historically anchored, approximate, and traditional/uncertain placements remain distinguishable.
- Undated narratives retain an explicit `undated` flag and remain available through the event picker without a falsely precise marker.
- Scripture written later about an earlier event belongs in **Later references**, with an explanatory note. The underlying event may also link to the later text; linking does not imply contemporary composition.
- Broad BC periods in the Jaredite and Book of Mormon datasets are explicitly traditional; synchronize with external history only when a reliable correlation exists.

## Daniel cross-check
| Account | Narrative historical setting | Placement policy |
| --- | --- | --- |
| Daniel 1–2 | Early reign of Nebuchadnezzar | Broad/approximate early-Babylonian setting; exact date disputed |
| Daniel 3–4 | Nebuchadnezzar | Undated, discoverable without a point marker |
| Daniel 7 | First year of Belshazzar | Before Daniel 5, approx. 553 BC |
| Daniel 8 | Third year of Belshazzar | Before Daniel 5, approx. 551 BC |
| Daniel 5 | Babylon's fall | 539 BC |
| Daniel 6 and 9 | Darius the Mede | Approx. 539–538 BC; identification disputed, **not** Darius I |
| Daniel 10–12 | Third year of Cyrus | Approx. 536 BC |

## Initial 2026 Come, Follow Me Old Testament audit
The [2026 reading schedule](https://www.churchofjesuschrist.org/study/manual/come-follow-me-for-home-and-church-old-testament-2026/000-contents?lang=eng) is **a checklist, not the site's organizing structure**.

| Scriptural coverage | Current status | Where |
| --- | --- | --- |
| Genesis / patriarchal accounts | Selected, dates highly uncertain | Patriarchs & Early Israel |
| Exodus / Moses | Selected, chronology disputed | Patriarchs & Early Israel |
| Joshua, Judges, Ruth | Further audit needed | Not yet systematically covered |
| Samuel, Kings, Chronicles | Selected rulers and transitions | Kings & Prophets; Jerusalem; Exile & Return |
| Isaiah, Hosea, Amos, Micah | Added historical ministry context | Kings & Prophets |
| Elijah, Elisha, Jonah, Nahum, Zephaniah, Habakkuk | Added historical ministry context | Kings & Prophets |
| Jeremiah, Lamentations, Ezekiel | Overlapping exile, fall of Jerusalem | Jerusalem; Exile & Return |
| Daniel | Major narratives and dated visions cross-checked | Exile & Return |
| Ezra, Nehemiah, Esther | Return, reform, Persian court | Exile & Return |
| Haggai, Zechariah, Malachi | Temple rebuilding and postexilic ministry | Exile & Return |
| Joel, Obadiah | Historical placement disputed; **not forced into arbitrary year** | Pending undated-context treatment |
| Job, Psalms, Proverbs, Ecclesiastes, Song of Solomon | Wisdom/poetry requires genre-aware coverage | Further audit needed |

A checked row means **representative material is indexed**, not that every lesson passage has been captured. The next audit pass should concentrate on Joshua–Ruth, wisdom literature, and difficult-to-date prophetic books before claiming comprehensive Old Testament coverage.

## Foreign rulers and vassal kings

Historical context includes Egyptian, Assyrian, Babylonian, and Persian rulers **when their actions directly affect scriptural people or events**. It does not attempt a complete succession list of every empire. The interactive filters distinguish *Israel/Judah rulers*, *Foreign rulers*, and *Prophets* (plus other context categories).

- **Necho II (609 BC):** deposed Jehoahaz and installed Eliakim, renaming him Jehoiakim (2 Kings 23:34–35; 2 Chronicles 36:4).
- **Nebuchadnezzar II (597 BC):** removed Jehoiachin, appointed his uncle Mattaniah and renamed him Zedekiah (2 Kings 24:17; 2 Chronicles 36:10–13). The same Babylonian king is associated with Daniel’s early narrative and Jerusalem’s eventual destruction.
- **Samaria, c. 722–720 BC:** biblical passages associate Shalmaneser V with the siege; Sargon II claimed the conquest. Their exact roles in the final conquest remain disputed rather than forced into one unqualified date.
- **Sennacherib (701 BC):** his campaign against Judah overlaps Hezekiah and Isaiah (2 Kings 18–19; Isaiah 36–37).
- **Cyrus II (539–538 BC):** conquered Babylon and authorized the return of exiles according to Ezra 1.

**Reigns vs. titles:** Belshazzar is shown separately as a *regent* under Nabonidus; he was not an independent king. In the Exile & Return era, Judah’s local royal figures are deliberately distinct from the imperial rulers.

A ruler who acted across two views appears in both, and event cards provide primary scriptural links. This overlap is intentional rather than duplicate people.

## Overlapping scriptural narratives and study links

Jerusalem's Final Years (630–580 BC) intentionally includes a **Connected Study · Daniel & Exile** shelf alongside dated timeline rows. The shelf links to the same underlying source entries in Exile & Return rather than duplicating those entries as dated Jerusalem events. It makes the current Daniel 1–7 study passages and related Ezekiel 37, Psalm 137, and Isaiah 40–55 readings accessible directly from Jerusalem's view and the end of its **Jump to an Event** menu.

The chapter reading order (Daniel 1–7) is distinct from event chronology: Daniel 7 describes an earlier reign of Belshazzar than the end-of-Babylon scene in Daniel 5, and Daniel 5–6 take place after Jerusalem’s 630–580 BC period. The fiery furnace, Nebuchadnezzar’s humbling, the valley of dry bones, the exile Psalms, and Isaiah’s restoration oracles are not assigned invented fixed dates. The user's selected Jerusalem year and zoom stay unchanged when browsing those connected readings.

## How to validate
Run `node tests/version12.test.js` from the repository root. Open `index.html` locally for interactive checks of the era picker, category filters, event jump, zoom, and scripture links. GitHub Pages serves the source files as-is; no build step is required.
