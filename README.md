# Scripture Context

**Version 12** is an interactive historical-context timeline connecting significant people, events, and teachings across the Bible and Book of Mormon.

Choose an era, then use the category buttons to show or hide tracks and events. Drag or tap the timeline to select a year, or use **Jump to an event** to open its study card. **Fit All** restores the full era at the current year. The range label shows the span between the endpoints, with one year between 1 BC and AD 1.

The collapsible **Scripture Context** panel sits beneath the timeline. Its cards link to passages and distinguish broad study windows from events with unknown calendar dates. In the Christ era, separate event lanes keep the New Testament and Book of Mormon accounts visible together. The background legend identifies the regional or narrative setting for each view.

## What's new in Version 12

- **Exile & Return (605–400 BC):** Daniel, Ezekiel, Jerusalem's destruction, Babylonian and Persian rulers, Ezra, Nehemiah, Esther, and rebuilding the temple.
- **Daniel in narrative chronological order:** Daniel 7–8 precede the fall of Babylon in Daniel 5; narratives with no reliable calendar date stay undated.
- **Expanded Kings & Prophets:** Elijah, Elisha, Jonah, Amos, Hosea, Micah, Huldah, Nahum, Zephaniah, Habakkuk, and key royal/historical transitions.
- **Book of Mormon connections** remain visible beside biblical events.
- **[Coverage and chronology policy](COVERAGE.md):** Sources, dating conventions, limitations, and an initial 2026 *Come, Follow Me* Old Testament coverage audit.

Open `index.html` in a browser to preview. GitHub Pages serves `index.html`, `study-data.js`, and `version12.js` together from the repository root. There is no build step.

Run `node tests/version12.test.js` to perform basic regression checks. A local browser check is recommended before publishing.
