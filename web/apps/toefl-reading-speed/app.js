/* Reading Speed Trainer: measure words per minute with a comprehension check, and train with paced reading. */
(function () {
  'use strict';
  const KEY = 'toefl-reading-speed.runs';
  const wpm = (words, seconds) => Math.round((words * 60) / Math.max(1, seconds));
  // Show one sentence at a time at a target speed: how long each sentence stays on screen.
  const paceMs = (sentence, target) => Math.round((SK.text.wordCount(sentence) / target) * 60000);
  const App = {
    about: 'Reading speed matters on a timed test, but only with understanding. This app times how fast you read an academic passage, then checks understanding with its questions. Your speed counts only if you get them right. A paced mode shows one sentence at a time at a speed you choose, to build a steady rhythm.',
    how: ['In **Speed test**, press Start, read the passage at your normal pace, press Done, then answer.', 'Watch the history: aim to raise speed while keeping answers right.', 'In **Paced reading**, choose a speed a little above your own and follow the sentences.'],
    tabs: [
      { id: 'test', label: 'Speed test', render(el, ctx) {
        const p = SK.pick(SK.rng(SK.seedNow()), ctx.data.toefl_passages);
        const n = SK.text.wordCount(p.text);
        let t0 = 0;
        const body = SK.h('div', {});
        const start = SK.btn('Start reading', () => {
          t0 = Date.now(); start.remove();
          body.appendChild(SK.h('div', { class: 'sk-passage', text: p.text }));
          body.appendChild(SK.h('div', { style: { marginTop: '10px' } }, SK.btn('Done reading', () => {
            const secs = (Date.now() - t0) / 1000;
            SK.clear(body);
            SK.quiz(body, p.questions.map((q) => Object.assign({ stem: '' }, q)), { title: 'Check understanding (the passage is hidden)', mode: 'practice', review: false, onFinish: (sum) => {
              const speed = wpm(n, secs), runs = SK.store.get(KEY, []);
              runs.push({ day: SK.dayKey(), wpm: speed, pct: sum.pct }); SK.store.set(KEY, runs.slice(-200));
              body.prepend(SK.card('Your speed', SK.stats([['Words', n], ['Time', SK.formatTime(secs)], ['Words per minute', speed], ['Understanding', sum.pct + '%']]), sum.pct < 60 ? SK.note('Slow down a little: speed only helps when you understand.', 'wrong') : null));
            } });
          }, '', { 'data-auto': 'once' })));
        }, '', { 'data-auto': 'once' });
        const runs = SK.store.get(KEY, []);
        el.appendChild(SK.card('Reading speed test', SK.h('p', { class: 'sk-muted', text: p.title + ' (' + n + ' words). Press Start, read once, then answer without looking back.' }), start, body));
        if (runs.length) el.appendChild(SK.card('History', SK.chart.line(runs.slice(-20).map((r) => ({ y: r.wpm, label: r.day })), { label: 'Words per minute' })));
      } },
      { id: 'paced', label: 'Paced reading', render(el, ctx) {
        let target = 180;
        const box = SK.h('div', { class: 'sk-passage', style: { minHeight: '120px', fontSize: '1.2rem' } });
        let tid = null;
        SK.cleanup(() => clearTimeout(tid));
        const run = () => {
          clearTimeout(tid);
          const sents = SK.text.sentences(SK.pick(SK.rng(SK.seedNow()), ctx.data.toefl_passages).text);
          let i = 0;
          const step = () => { if (i >= sents.length) { box.textContent = 'Finished. Try a faster speed next time.'; SK.logPractice(1, 'Paced reading'); return; } box.textContent = sents[i]; tid = setTimeout(step, paceMs(sents[i++], target)); };
          step();
        };
        el.appendChild(SK.card('Paced reading', SK.select([[120, '120 words per minute'], [150, '150'], [180, '180'], [220, '220'], [260, '260'], [300, '300']], target, (v) => { target = Number(v); }, 'Speed'), SK.h('div', { style: { margin: '10px 0' } }, SK.btn('Start', run, '', { 'data-auto': 'once' }), ' ', SK.btn('Stop', () => clearTimeout(tid), 'ghost')), box));
      } },
    ],
    wpm, paceMs,
    checks: { 'speed and pacing arithmetic': (data, assert) => { assert.equal(wpm(300, 60), 300); assert.equal(wpm(150, 90), 100); assert.equal(paceMs('one two three four five six', 180), 2000); } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
