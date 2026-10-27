(() => {
  const storageKey = 'heritage-invite-language';
  let language = 'hi';
  try { language = localStorage.getItem(storageKey) === 'en' ? 'en' : 'hi'; } catch {}
  const hindi = {
    hero: { connector: 'और', tagline: 'विवाह के बंधन में बंधने जा रहे हैं' },
    invitation: {
      blessing: '॥ श्री गणेशाय नमः ॥',
      opening: 'ईश्वर और हमारे प्रिय परिवारजनों के आशीर्वाद से,\nहम आपको सादर आमंत्रित करते हैं',
      scriptTitle: 'निमंत्रण', connector: 'और', eventsHeading: 'हमारे शुभ विवाह के कार्यक्रम',
      sonOfLine: '({father} एवं {mother} के सुपुत्र)', daughterOfLine: '({father} एवं {mother} की सुपुत्री)',
      grandSonOfLine: '', grandDaughterOfLine: ''
    },
    ui: { eventsLabel: 'विवाह के कार्यक्रम', celebrationLabel: 'उत्सव', playMusicLabel: 'संगीत चलाएँ', pauseMusicLabel: 'संगीत रोकें', expandPlayerLabel: 'संगीत प्लेयर खोलें', collapsePlayerLabel: 'संगीत प्लेयर बंद करें', previousSlideLabel: 'पिछला कार्यक्रम', nextSlideLabel: 'अगला कार्यक्रम', eventDotLabel: 'कार्यक्रम देखें', daysLabel: 'दिन', hoursLabel: 'घंटे', minutesLabel: 'मिनट', secondsLabel: 'सेकंड' },
    story: { eyebrow: 'मिलिए', subtitle: 'दूल्हा और दुल्हन से', title: 'हमारी कहानी', body: 'एक मुलाकात से अपनी कहानी बनी,\nढलती शामों में चाहत सुहानी बनी।\nछोटी खुशियों से सपनों का घर बुन लिया,\nअब हर कल के लिए साथ चुन लिया।', galleryAlt: 'रोहित और अदिति', openPhotoLabel: 'तस्वीर खोलें', closePhotoLabel: 'तस्वीर बंद करें' },
    rsvp: { eyebrow: 'आपकी उपस्थिति', title: 'क्या आप हमारे साथ शामिल होंगे?', body: 'आपकी उपस्थिति हमारे उत्सव को और खास बनाएगी। कृपया बताएँ कि क्या आप आ रहे हैं।', buttonLabel: 'उपस्थिति बताएँ', tapLabel: 'यहाँ दबाएँ', formTitle: 'खुशियों में शामिल हों', formIntro: 'कृपया नीचे अपनी जानकारी भरें।', nameLabel: 'आपका नाम', mobileLabel: 'मोबाइल नंबर', attendanceLabel: 'क्या आप आएँगे?', attendingLabel: 'हाँ, खुशी से आऊँगा/आऊँगी', notAttendingLabel: 'शामिल नहीं हो सकूँगा/सकूँगी', guestCountLabel: 'मेहमानों की संख्या', foodLabel: 'भोजन संबंधी जानकारी', foodPlaceholder: 'एलर्जी या पसंद', messageLabel: 'वर-वधू के लिए संदेश', messagePlaceholder: 'दिल से कुछ लिखें', submitLabel: 'जवाब भेजें', sendingLabel: 'भेजा जा रहा है…', successTitle: 'धन्यवाद!', successMessage: 'आपका जवाब मिल गया है। आपके साथ उत्सव मनाने का इंतज़ार रहेगा।', errorMessage: 'आपका जवाब सेव नहीं हो सका। कृपया फिर कोशिश करें।', doneLabel: 'पूरा हुआ', closeLabel: 'फॉर्म बंद करें' },
    countdown: { title: 'शुभ दिन का इंतज़ार' },
    music: { trackTitle: 'विवाह संगीत' }
  };
  const eventNames = { Haldi: 'हल्दी', Mehndi: 'मेहंदी', Sangeet: 'संगीत', Baraat: 'बारात', Wedding: 'विवाह' };
  const venues = { 'Courtyard, Taj Palace': 'प्रांगण, ताज पैलेस', 'Garden Pavilion, Taj Palace': 'गार्डन पवेलियन, ताज पैलेस', 'Grand Ballroom, Taj Palace': 'ग्रैंड बॉलरूम, ताज पैलेस', 'Main Entrance, Taj Palace': 'मुख्य द्वार, ताज पैलेस', 'Wedding Mandap, Taj Palace': 'विवाह मंडप, ताज पैलेस' };
  const times = { '10:00 AM – 12:00 PM': 'सुबह 10:00 – दोपहर 12:00', '4:00 PM – 7:00 PM': 'शाम 4:00 – 7:00', '7:00 PM onwards': 'शाम 7:00 बजे से', '5:00 PM – 6:30 PM': 'शाम 5:00 – 6:30' };
  const syncDocument = () => { document.documentElement.lang = language; };
  window.inviteLanguage = {
    get: () => language,
    set(next) {
      language = next === 'hi' ? 'hi' : 'en';
      try { localStorage.setItem(storageKey, language); } catch {}
      syncDocument();
      window.dispatchEvent(new Event('invite-language-change'));
    },
    translate(source) {
      const data = structuredClone(source);
      data.language = language;
      data.events = data.events.map(event => ({ ...event, theme: event.name.toLowerCase() }));
      if (language === 'en') return data;
      for (const [section, values] of Object.entries(hindi)) Object.assign(data[section], values);
      data.events = data.events.map(event => ({ ...event, name: eventNames[event.name] || event.name, date: event.date.replace('August', 'अगस्त'), time: times[event.time] || event.time, venue: venues[event.venue] || event.venue }));
      data.couple.groom.name = data.couple.groom.firstName = 'रोहित';
      data.couple.bride.name = data.couple.bride.firstName = 'अदिति';
      data.couple.groom.father = 'रमेश शर्मा'; data.couple.groom.mother = 'सुनीता शर्मा';
      data.couple.bride.father = 'राजेश वर्मा'; data.couple.bride.mother = 'कविता वर्मा';
      data.social.hashtag = '#रोहितऔरअदिति';
      data.meta.titleTemplate = 'रोहित और अदिति | शुभ विवाह';
      data.meta.descriptionTemplate = '22 अगस्त 2027 को ताज पैलेस में रोहित और अदिति के शुभ विवाह में सादर आमंत्रित हैं।';
      return data;
    }
  };
  syncDocument();
})();
