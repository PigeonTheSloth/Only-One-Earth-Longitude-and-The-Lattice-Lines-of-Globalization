

  // Rulebook rule text — stylized recreation, written in period voice.
  // Not a facsimile of the actual 1863 FA rules — a period-feeling paraphrase.
  const RULES = [
    "The maximum length of the ground shall be 200 yards, the maximum breadth 100 yards.",
    "The winner of the toss shall have the choice of goals. The game shall be commenced by a place-kick from the centre of the ground.",
    "After a goal is won, the losing side shall kick off, and goals shall be changed at the half.",
    "A goal shall be won when the ball passes between the two posts, under the string at such height as the captains shall agree.",
    "When the ball is in touch the first player who touches it shall throw it from the point on the boundary where it left the ground.",
    "No player shall run with the ball in his hands, nor shall any player be held or tripped."
  ];

  const ruleEls = document.querySelectorAll('#rules-list .rule');
  const voice = document.getElementById('voice');
  const pbar = document.getElementById('pbar');
  const plabel = document.getElementById('plabel');
  const replayBtn = document.getElementById('replay');
  const skipBtn = document.getElementById('skip');

  let currentRule = 0;
  let charIdx = 0;
  let timer = null;
  let cursorEl = null;

  function clearCursors() {
    document.querySelectorAll('.typing-cursor').forEach(c => c.remove());
  }

  function updateProgress() {
    const done = Math.min(currentRule, RULES.length);
    pbar.style.width = ((done / RULES.length) * 100) + '%';
    plabel.textContent = done + ' / ' + RULES.length;
  }

  function typeNextChar() {
    const rule = RULES[currentRule];
    if (!rule) return finish();
    const el = ruleEls[currentRule].querySelector('.ink');
    if (!cursorEl) {
      clearCursors();
      cursorEl = document.createElement('span');
      cursorEl.className = 'typing-cursor';
      ruleEls[currentRule].querySelector('.txt').appendChild(cursorEl);
      ruleEls[currentRule].classList.add('lit');
    }
    if (charIdx < rule.length) {
      el.textContent = rule.substring(0, charIdx + 1);
      charIdx++;
      const c = rule[charIdx - 1];
      const delay = c === '.' ? 220 : c === ',' ? 110 : 18 + Math.random() * 22;
      timer = setTimeout(typeNextChar, delay);
    } else {
      clearCursors();
      cursorEl = null;
      currentRule++;
      charIdx = 0;
      updateProgress();
      timer = setTimeout(typeNextChar, 500);
    }
  }

  function finish() {
    clearCursors();
    cursorEl = null;
    voice.classList.add('lit');
    updateProgress();
  }

  function start() {
    clearTimeout(timer);
    clearCursors();
    cursorEl = null;
    currentRule = 0;
    charIdx = 0;
    ruleEls.forEach(el => {
      el.classList.remove('lit');
      el.querySelector('.ink').textContent = '';
    });
    voice.classList.remove('lit');
    updateProgress();
    timer = setTimeout(typeNextChar, 800);
  }

  function skip() {
    clearTimeout(timer);
    clearCursors();
    cursorEl = null;
    ruleEls.forEach((el, i) => {
      el.classList.add('lit');
      el.querySelector('.ink').textContent = RULES[i];
    });
    currentRule = RULES.length;
    updateProgress();
    voice.classList.add('lit');
  }

  replayBtn.addEventListener('click', start);
  skipBtn.addEventListener('click', skip);

  // Defer start so the reveal has time to settle.
  window.addEventListener('load', () => {
    setTimeout(start, 900);
  });


(async function() {
  try {
    const world = await d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json');
    const transform = d3.geoTransform({
      point: function(lon, lat) {
        this.stream.point(250 + lon * (500 / 360), 120 - lat * (240 / 180));
      }
    });
    const path = d3.geoPath(transform);
    const g = d3.select('#worldMiniContours');
    g.append('path')
      .datum(topojson.feature(world, world.objects.land))
      .attr('fill', '#2a4a3a')
      .attr('opacity', '0.9')
      .attr('d', path);
    g.append('path')
      .datum(topojson.mesh(world, world.objects.countries, (a, b) => a !== b))
      .attr('fill', 'none')
      .attr('stroke', '#3d6b50')
      .attr('stroke-width', '0.4')
      .attr('d', path);
  } catch(e) { console.warn('World map CDN unavailable:', e); }
})();
