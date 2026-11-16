(() => {
  const data = window.WEDDING_DATA;
  const seen = new WeakSet();
  let scheduled = false;
  const visibility = new IntersectionObserver(entries => {
    for (const entry of entries) {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
    }
  }, { threshold: .15 });
  const copy = (node, value) => { if (node.textContent !== value) node.textContent = value; };
  function link(label, href, className = '') {
    const node = document.createElement('a'); node.textContent = label; node.href = href; node.className = className; return node;
  }
  function calendar(event) {
    const start = new Date(`${event.rawDate}T${event.rawTime}:00+05:30`);
    const endTimes = { Haldi: '12:00', Mehndi: '19:00', Baraat: '18:30' };
    const end = endTimes[event.name] ? new Date(`${event.rawDate}T${endTimes[event.name]}:00+05:30`) : start;
    const stamp = date => date.toISOString().replace(/[-:]/g, '').replace('.000', '');
    const params = new URLSearchParams({ action: 'TEMPLATE', text: `${event.name} · Rohit & Aditi`, dates: `${stamp(start)}/${stamp(end)}`, location: `${event.venue}, Jaipur`, details: `${event.time}. Wedding celebration of Rohit and Aditi.` });
    return 'https://calendar.google.com/calendar/render?' + params;
  }
  function enhance() {
    scheduled = false;
    const hindi = window.inviteLanguage?.get() === 'hi';
    const localized = window.inviteLanguage?.translate(data) || data;
    document.querySelectorAll('img').forEach(img => {
      if (seen.has(img)) return;
      seen.add(img); img.decoding = 'async';
      img.loading = img.closest('.hero') ? 'eager' : 'lazy';
    });
    const hero = document.querySelector('.hero');
    if (hero && !hero.querySelector('.floral-toran')) {
      const flowers = document.createElement('img');
      flowers.className = 'floral-toran'; flowers.src = 'resources/floral-toran.webp';
      flowers.alt = ''; flowers.setAttribute('aria-hidden', 'true'); flowers.width = 1400; flowers.height = 700;
      hero.append(flowers);
    }
    const heroCopy = document.querySelector('.hero-copy');
    if (heroCopy) {
      let details = heroCopy.querySelector('.hero-details');
      if (!details) { details = document.createElement('div'); details.className = 'hero-details'; heroCopy.append(details); }
      const date = new Intl.DateTimeFormat(hindi ? 'hi-IN' : 'en-IN', {day:'numeric',month:'long',year:'numeric',timeZone:'Asia/Kolkata'}).format(new Date(data.config.weddingDate));
      copy(details, `${date} · ${hindi ? 'ताज पैलेस, जयपुर' : 'Taj Palace, Jaipur'}`);
      let button = heroCopy.querySelector('.hero-action');
      if (!button) { button = link('', '#premium-events', 'hero-action'); heroCopy.append(button); }
      copy(button, hindi ? 'विवाह के कार्यक्रम देखें ↓' : 'Explore the celebrations ↓');
    }
    const cards = [...document.querySelectorAll('.event-video-card')];
    cards.forEach((card, index) => {
      const event = data.events[index]; if (!event) return;
      card.id = `ceremony-${index}`;
      if (!card.querySelector('.ceremony-photo')) {
        const photo = document.createElement('img');
        photo.className = 'ceremony-photo';
        photo.src = `resources/ceremonies/${event.name.toLowerCase()}.webp`;
        photo.alt = ''; photo.loading = 'lazy'; photo.decoding = 'async';
        photo.width = 960; photo.height = 1200;
        card.querySelector('.event-video-media')?.append(photo);
        visibility.observe(card);
      }
      let actions = card.querySelector('.event-actions');
      if (!actions) {
        actions = document.createElement('div'); actions.className = 'event-actions';
        const save = link('', calendar(event), 'calendar-link'); save.target = '_blank'; save.rel = 'noopener noreferrer';
        actions.append(save); card.querySelector('.event-overlay')?.append(actions);
      }
      copy(actions.querySelector('a'), hindi ? 'कैलेंडर में जोड़ें ↗' : 'Add to calendar ↗');

    });
    const events = document.querySelector('.events');
    if (events) {
      events.id = 'premium-events';
      let schedule = events.querySelector('.ceremony-nav');
      if (!schedule) { schedule = document.createElement('nav'); schedule.className = 'ceremony-nav'; schedule.setAttribute('aria-label', 'Wedding ceremonies'); events.prepend(schedule); }
      if (schedule.children.length !== cards.length) schedule.replaceChildren(...cards.map((_, i) => link('', `#ceremony-${i}`)));
      [...schedule.children].forEach((item, i) => copy(item, localized.events[i].name));
    }
    if (document.querySelector('.rsvp') && !document.querySelector('.premium-nav')) {
      const nav = document.createElement('nav'); nav.className = 'premium-nav'; nav.setAttribute('aria-label', 'Invitation sections');
      [['.invitation', 'invitation'], ['.events', 'events'], ['.rsvp', 'rsvp']].forEach(([selector, id]) => {
        const section = document.querySelector(selector); section.id = `premium-${id}`;
        nav.append(link('', `#premium-${id}`));
      });
      document.body.append(nav);
    }
    document.querySelectorAll('.premium-nav a').forEach((item, i) => copy(item, (hindi ? ['निमंत्रण','कार्यक्रम','उपस्थिति'] : ['Invitation','Events','RSVP'])[i]));
    const form = document.querySelector('.rsvp-form');
    if (form && !form.querySelector('.local-rsvp-note')) {
      const note = document.createElement('p'); note.className = 'local-rsvp-note'; form.prepend(note);
    }
    const note = document.querySelector('.local-rsvp-note');
    if (note) copy(note, hindi ? 'इस लोकल प्रीव्यू में जवाब इसी कंप्यूटर पर सुरक्षित होगा।' : 'In this local preview, your response is saved on this computer.');
  }
  function schedule() { if (!scheduled) { scheduled = true; requestAnimationFrame(enhance); } }
  new MutationObserver(schedule).observe(document.getElementById('root'), {childList:true,subtree:true});
  window.addEventListener('invite-language-change', schedule);
  // Keep keyboard focus inside the RSVP dialog until it closes.
  document.addEventListener('keydown', event => {
    const dialog = document.querySelector('.rsvp-dialog');
    if (!dialog || event.key !== 'Tab') return;
    const items = [...dialog.querySelectorAll('button:not([disabled]),input,select,textarea,a[href]')];
    const first = items[0], last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  document.addEventListener('visibilitychange', () => {
    document.body.classList.toggle('page-hidden', document.hidden);
  });
  enhance();
})();
