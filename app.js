/* ===================================================================
   nxttu. — shared app logic
   Page-aware: only touches elements that exist on the current page.
   Persists theme + language across pages via localStorage.
   =================================================================== */

const translations = {
  en: {
    "nav-about": "about", "nav-music": "music", "nav-stats": "stats", "nav-links": "links", "nav-theme": "theme",
    "hero-tag": "// experimental electronic artist · est. 2021 · ukraine",
    "hero-sub": "next to you.",
    "hero-desc": "Combining ambient textures, breakbeat rhythms and digital noise into emotional soundscapes — focused on atmosphere and raw feeling, not traditional fucked up structure.",
    "stat-plays": "plays", "stat-likes": "likes", "stat-tracks": "tracks", "stat-years": "years",
    "home-quick": "quick access",
    "label-about": "about",
    "about-title": "Started at 4<br>on my brother's<br>computer.",
    "about-p1": "It started at <em>age 4</em> — sitting on my brother's lap working on his computer, messing with melodies. At 6 I wrote my first \"track\": just a collection of cool sounds, but my brother saw something interesting in it.",
    "about-p2": "Then came my own computer, hours of dragging notes around in an editor. The old PC broke. I left music behind — until I downloaded <em>FL Studio</em> again and started messing around.",
    "about-p3": "First nickname: <em>Jonathan Fortile</em>. Then Bearonic, BEARN... until I landed on <em>nxttu.</em> (next to you / nty). Came up with it in class thinking about a friend sitting next to me.",
    "about-p4": "Now — <em>experimental electronic</em> producer from Ukraine. Open for collabs & deals.",
    "label-music": "discography",
    "era-1": "era I · 2021", "album-1-title": "Black Tracks", "album-1-desc": "The era where everything started. Was supposed to be 40 tracks — most were lost or deleted. First trials, errors, drafts. Nothing hidden.",
    "era-2": "era II · 2025–2026", "album-2-title": "White Tracks", "album-2-desc": "The most emotional period. Tracks made to get things out of my system — chaos and good moments. Each made in 1–2 hours. Raw and honest.",
    "era-3": "era III · 2026 — ???", "album-3-desc": "Something is being built. This era is still in progress — not sure where it's going yet, but it's coming.",
    "sc-listen": "Listen on SoundCloud", "modal-text": "To stay updated and follow my upcoming releases, please subscribe to my SoundCloud or TikTok.", "modal-close": "close",
    "label-stats": "stats by year",
    "stat-2021": "plays · 24 likes", "stat-2022": "plays · 24 likes", "stat-2023": "plays · 68 likes · 13 com.", "stat-2024": "plays · 15 likes", "stat-2025": "plays · 92 likes · 15 rep.",
    "label-links": "find me",
    "link-m": "Music", "link-ms": "Music / Store", "link-v": "Video", "link-sv": "Short Video", "link-vi": "Visual", "link-c": "Community", "link-g": "Gaming",
    "footer-left": "nxttu. · est. 2021 · ukraine", "footer-right-1": "all", "footer-right-2": "rights not fucking reserved", "footer-right-3": "open for deals",
    tl: [
      {y: "~2014", t: "First contact with music", d: "Age 4. Brother's computer. Melodies."},
      {y: "2016", t: "First \"track\"", d: "Age 6. A collection of cool melodies. Brother was impressed."},
      {y: "2021", t: "Jonathan Fortile → Bearonic", d: "FL Studio again. First nickname, first mistakes. Black era begins."},
      {y: "2023", t: "nxttu. is born", d: "New name, new sound. 924 plays — a record at the time."},
      {y: "2025–26", t: "White era — most emotional period", d: "Growing up, making mistakes, real life. 2GEEKED, drexgod, staticgrl, NIISAN."}
    ]
  },
  ua: {
    "nav-about": "про мене", "nav-music": "музика", "nav-stats": "статистика", "nav-links": "посилання", "nav-theme": "Теми",
    "hero-tag": "// експериментальний електронний артист · з 2021 · україна",
    "hero-sub": "поруч із тобою.",
    "hero-desc": "Поєднання ембієнтних текстур, брейкбіт-ритмів та цифрового шуму в емоційні звукові ландшафти — фокус на атмосфері та чистому почутті, а не на традиційній структурі.",
    "stat-plays": "прослуховувань", "stat-likes": "лайків", "stat-tracks": "треків", "stat-years": "років",
    "home-quick": "швидкий доступ",
    "label-about": "про мене",
    "about-title": "Почав у 4 роки<br>на комп'ютері<br>мого брата.",
    "about-p1": "Все почалося в <em>4 роки</em> — сидів на колінах у брата, бавився на його комп'ютері, підбирав мелодії. У 6 років написав перший \"трек\": просто набір прикольних звуків, але брат помітив у цьому щось цікаве.",
    "about-p2": "Потім з'явився власний комп, години перетягування нот в редакторі. Старий ПК зламався. Я закинув музику — поки знову не скачав <em>FL Studio</em> і не почав експериментувати.",
    "about-p3": "Перший нікнейм: <em>Jonathan Fortile</em>. Потім Bearonic, BEARN... поки не зупинився на <em>nxttu.</em> (next to you / nty). Вигадав на уроці, думаючи про друга, що сидів поруч.",
    "about-p4": "Зараз — <em>експериментальний електронний</em> продюсер з України. Відкритий до колаборацій та пропозицій.",
    "label-music": "дискографія",
    "era-1": "ера I · 2021", "album-1-title": "Black Tracks", "album-1-desc": "Ера, з якої все почалося. Мало бути 40 треків — більшість втрачено або видалено. Перші спроби, помилки, чернетки. Нічого прихованого.",
    "era-2": "ера II · 2025–2026", "album-2-title": "White Tracks", "album-2-desc": "Найбільш емоційний період. Треки, створені щоб виплеснути емоції — хаос і хороші моменти. Кожен зроблений за 1–2 години. Сиро та чесно.",
    "era-3": "ера III · 2026 — ???", "album-3-desc": "Щось будується. Ця ера ще в процесі — поки не знаю, куди вона приведе, але вона наближається.",
    "sc-listen": "Слухати на SoundCloud", "modal-text": "Щоб залишатися в курсі та стежити за моїми майбутніми релізами, будь ласка, підпишіться на мій SoundCloud або TikTok.", "modal-close": "закрити",
    "label-stats": "статистика",
    "stat-2021": "прослуховувань · 24 лайків", "stat-2022": "прослуховувань · 24 лайків", "stat-2023": "прослуховувань · 68 лайків · 13 ком.", "stat-2024": "прослуховувань · 15 лайків", "stat-2025": "прослуховувань · 92 лайків · 15 реп.",
    "label-links": "знайди мене",
    "link-m": "Музика", "link-ms": "Музика / Магазин", "link-v": "Відео", "link-sv": "Короткі Відео", "link-vi": "Візуал", "link-c": "Спільнота", "link-g": "Ігри",
    "footer-left": "nxttu. · з 2021 · україна", "footer-right-1": "усі", "footer-right-2": "права нахрен не захищені", "footer-right-3": "відкритий до пропозицій",
    tl: [
      {y: "~2014", t: "Перший контакт з музикою", d: "4 роки. Комп'ютер брата. Мелодії."},
      {y: "2016", t: "Перший \"трек\"", d: "6 років. Набір крутих мелодій. Брат був вражений."},
      {y: "2021", t: "Jonathan Fortile → Bearonic", d: "Знову FL Studio. Перший нік, перші факапи. Початок чорної ери."},
      {y: "2023", t: "Народження nxttu.", d: "Нове ім'я, новий звук. 920+ прослуховувань — рекорд на той час."},
      {y: "2025–26", t: "White era — найемоційніший період", d: "Дорослішання, помилки, реальне життя. 2GEEKED, drexgod, staticgrl, NIISAN."}
    ]
  },
  ru: {
    "nav-about": "обо мне", "nav-music": "музыка", "nav-stats": "статистика", "nav-links": "ссылки", "nav-theme": "тема",
    "hero-tag": "// экспериментальный электронный артист · с 2021 · украина",
    "hero-sub": "рядом с тобой.",
    "hero-desc": "Смешение эмбиентных текстур, брейкбит-ритмов и цифрового шума в эмоциональные звуковые ландшафты — фокус на атмосфере и чистом чувстве, а не на традиционной структуре.",
    "stat-plays": "прослушиваний", "stat-likes": "лайков", "stat-tracks": "треков", "stat-years": "лет",
    "home-quick": "быстрый доступ",
    "label-about": "обо мне",
    "about-title": "Начал в 4 года<br>на компьютере<br>моего брата.",
    "about-p1": "Все началось в <em>4 года</em> — сидел на коленях у брата, ковырялся в его компе, подбирал мелодии. В 6 лет написал первый \"трек\": просто набор прикольных звуков, но брат заметил в этом что-то интересное.",
    "about-p2": "Потом появился собственный комп, часы перетаскивания нот в редакторе. Старый ПК сломался. Я забросил музыку — пока снова не скачал <em>FL Studio</em> и не начал экспериментировать.",
    "about-p3": "First nickname: <em>Jonathan Fortile</em>. Then Bearonic, BEARN... until I landed on <em>nxttu.</em> (next to you / nty). Придумал на уроке, думая о подруге, сидящей рядом.",
    "about-p4": "Сейчас — <em>экспериментальный электронный</em> продюсер из Украины. Открыт для коллабораций и предложений.",
    "label-music": "дискография",
    "era-1": "эра I · 2021", "album-1-title": "Black Tracks", "album-1-desc": "Эра, с которой все началось. Должно было быть 40 треков — большинство потеряно или удалено. Первые пробы, ошибки, черновики. Ничего скрытого.",
    "era-2": "эра II · 2025–2026", "album-2-title": "White Tracks", "album-2-desc": "Самый эмоциональный период. Треки, созданные чтобы выплеснуть эмоции — хаос и хорошие моменты. Каждый сделан за 1–2 часа. Сыро и честно.",
    "era-3": "эра III · 2026 — ???", "album-3-desc": "Что-то строится. Эта эра еще в процессе — пока не знаю, куда она приведет, но она приближается.",
    "sc-listen": "Слушать на SoundCloud", "modal-text": "Чтобы оставаться в курсе и следить за моими будущими релизами, пожалуйста, подпишитесь на мой SoundCloud или TikTok.", "modal-close": "закрыть",
    "label-stats": "статистика",
    "stat-2021": "прослушиваний · 24 лайков", "stat-2022": "прослушиваний · 24 лайков", "stat-2023": "прослушиваний · 68 лайков · 13 ком.", "stat-2024": "прослушиваний · 15 лайков", "stat-2025": "прослушиваний · 92 лайков · 15 реп.",
    "label-links": "найти меня",
    "link-m": "Музыка", "link-ms": "Music / Store", "link-v": "Видео", "link-sv": "Короткие Видео", "link-vi": "Визуал", "link-c": "Сообщество", "link-g": "Игры",
    "footer-left": "nxttu. · с 2021 · украина", "footer-right-1": "все", "footer-right-2": "права нахрен не защищены", "footer-right-3": "открыт для предложений",
    tl: [
      {y: "~2014", t: "Первый контакт с музыкой", d: "4 года. Компьютер брата. Мелодии."},
      {y: "2016", t: "Первый \"трек\"", d: "6 лет. Набор крутых мелодий. Брат был впечатлен."},
      {y: "2021", t: "Jonathan Fortile → Bearonic", d: "Снова FL Studio. Первый ник, первые факапы. Начало черной эры."},
      {y: "2023", t: "Рождение nxttu.", d: "Новое имя, nuevo sound. 924 хита — рекорд на то время."},
      {y: "2025–26", t: "White era — самый эмоциональный период", d: "Взросление, ошибки, реальная жизнь. 2GEEKED, drexgod, staticgrl, NIISAN."}
    ]
  },
  pl: {
    "nav-about": "o mnie", "nav-music": "muzyka", "nav-stats": "statystyki", "nav-links": "linki", "nav-theme": "motyw",
    "hero-tag": "// eksperymentalny artysta elektroniczny · od 2021 · ukraina",
    "hero-sub": "obok ciebie.",
    "hero-desc": "Łączenie tekstur ambientowych, rytmów breakbeatowych i cyfrowego szumu w emocjonalne pejzaże dźwiękowe — skupienie na atmosferze, a no nie na tradycyjnej strukturze.",
    "stat-plays": "odtworzeń", "stat-likes": "polubień", "stat-tracks": "utworów", "stat-years": "lat",
    "home-quick": "szybki dostęp",
    "label-about": "o mnie",
    "about-title": "Zacząłem w wieku 4 lat<br>na komputerze<br>mojego brata.",
    "about-p1": "Zaczęło się w wieku <em>4 lat</em> — siedząc na kolanach brata, bawiłem się na jego komputerze, układałem melodie. W wieku 6 lat napisałem swój pierwszy \"utwór\": po prostu zbiór fajnych dźwięków, ale mój brat zauważył w tym coś ciekawego.",
    "about-p2": "Potem przyszedł własny komputer, godziny przeciągania nut w edytorze. Stary PC się zepsuł. Porzuciłem muzykę — dopóki znów nie pobrałem <em>FL Studio</em> i nie zacząłem eksperymentować.",
    "about-p3": "First nickname: <em>Jonathan Fortile</em>. Then Bearonic, BEARN... aż trafiłem na <em>nxttu.</em> (next to you / nty). Wymyśliłem to na lekcji, myśląc o koleżance siedzącej obok.",
    "about-p4": "Teraz — <em>eksperymentalny producent muzyki elektronicznej</em> z Ukrainy. Otwarty na współpracę i oferty.",
    "label-music": "dyskografia",
    "era-1": "era I · 2021", "album-1-title": "Black Tracks", "album-1-desc": "Blacha era.",
    "era-2": "era II · 2025–2026", "album-2-title": "White Tracks", "album-2-desc": "Najbardziej emocjonalny okres. Utwory stworzone, by wyrzucić z siebie emocje — chaos i dobre chwile. Każdy powstał w 1–2 godziny. Surowe i szczere.",
    "era-3": "era III · 2026 — ???", "album-3-desc": "Coś się buduje. Ta era wciąż trwa — nie wiem jeszcze, dokąd zmierza, ale nadchodzi.",
    "sc-listen": "Słuchaj na SoundCloud", "modal-text": "Aby być na bieżąco i śledzić moje nadchodzące wydania, zasubskrybuj mój SoundCloud lub TikTok.", "modal-close": "zamknij",
    "label-stats": "statystyki",
    "stat-2021": "odtworzeń · 24 polubienia", "stat-2022": "odtworzeń · 24 polubienia", "stat-2023": "odtworzeń · 68 polubień · 13 kom.", "stat-2024": "odtworzeń · 15 polubień", "stat-2025": "odtworzeń · 92 polubienia · 15 rep.",
    "label-links": "znajdź mnie",
    "link-m": "Muzyka", "link-ms": "Music / Store", "link-v": "Wideo", "link-sv": "Krótkie Wideo", "link-vi": "Wizualia", "link-c": "Społeczność", "link-g": "Gry",
    "footer-left": "nxttu. · od 2021 · ukraina", "footer-right-1": "wszystkie", "footer-right-2": "prawa nienachalnie zastrzeżone", "footer-right-3": "otwarty na oferty",
    tl: [
      {y: "~2014", t: "Pierwszy kontakt z muzyką", d: "Wiek 4 lat. Komputer brata. Melodie."},
      {y: "2016", t: "Pierwszy \"utwór\"", d: "Wiek 6 lat. Zbiór fajnych melodii. Brat był pod wrażeniem."},
      {y: "2021", t: "Jonathan Fortile → Bearonic", d: "Znów FL Studio. Pierwszy pseudonim, pierwsze błędy. Początek czarnej ery."},
      {y: "2023", t: "Narodziny nxttu.", d: "Nowa nazwa, nowy dźwięk. 924 odtworzenia — ówczesny rekord."},
      {y: "2025–26", t: "White era — najbardziej emocjonalny okres", d: "Dorastanie, błędy, prawdziwe życie. 2GEEKED, drexgod, staticgrl, NIISAN."}
    ]
  },
  it: {
    "nav-about": "info", "nav-music": "musica", "nav-stats": "statistiche", "nav-links": "link", "nav-theme": "tema",
    "hero-tag": "// artista elettronico sperimentale · dal 2021 · ucraina",
    "hero-sub": "accanto a te.",
    "hero-desc": "Unire texture ambient, ritmi breakbeat e rumore digitale in paesaggi sonori emotivi — focalizzato sull'atmosfera e sul sentimento puro, non sulla struttura tradizionale.",
    "stat-plays": "ascolti", "stat-likes": "like", "stat-tracks": "tracce", "stat-years": "anni",
    "home-quick": "accesso rapido",
    "label-about": "info",
    "about-title": "Iniziato a 4 anni<br>sul computer<br>di mio fratello.",
    "about-p1": "Tutto è iniziato a <em>4 anni</em> — seduto in braccio a mio fratello al computer, giocando con le melodie. A 6 anni ho scritto la mia prima \"traccia\": solo un insieme di bei suoni, ma mio fratello ci vide qualcosa di interessante.",
    "about-p2": "Poi è arrivato il mio computer, ore a trascinare note in un editor. Il vecchio PC si è rotto. Ho lasciato la musica — finché non ho riscaricato <em>FL Studio</em> e ho ricominciato a sperimentare.",
    "about-p3": "First nickname: <em>Jonathan Fortile</em>. Then Bearonic, BEARN... fino ad arrivare a <em>nxttu.</em> (next to you / nty). Mi è venuto in mente in classe pensando a un'amica seduta accanto a me.",
    "about-p4": "Ora — produttore <em>elettronico sperimentale</em> dall'Ucraina. Aperto a collaborazioni e contratti.",
    "label-music": "discografia",
    "era-1": "era I · 2021", "album-1-title": "Black Tracks", "album-1-desc": "L'era in cui tutto è iniziato. Doveva contenere 40 tracce — la maggior parte è andata persa o cancellata. Primi tentativi, errori, bozze. Nulla di nascosto.",
    "era-2": "era II · 2025–2026", "album-2-title": "White Tracks", "album-2-desc": "Il periodo più emotivo. Tracce create per sfogarsi — caos e bei momenti. Ognuna creata in 1–2 ore. Cruda e sincera.",
    "era-3": "era III · 2026 — ???", "album-3-desc": "Qualcosa si sta costruendo. Questa era è ancora in corso — non so ancora dove porterà, ma sta arrivando.",
    "sc-listen": "Ascolta su SoundCloud", "modal-text": "Per rimanere aggiornato e seguire le mie prossime uscite, iscriviti al mio SoundCloud o TikTok.", "modal-close": "chiudi",
    "label-stats": "statistiche",
    "stat-2021": "ascolti · 24 like", "stat-2022": "ascolti · 24 like", "stat-2023": "ascolti · 68 like · 13 com.", "stat-2024": "ascolti · 15 like", "stat-2025": "ascolti · 92 like · 15 rep.",
    "label-links": "trovami",
    "link-m": "Musica", "link-ms": "Music / Store", "link-v": "Video", "link-sv": "Video Brevi", "link-vi": "Visual", "link-c": "Community", "link-g": "Gaming",
    "footer-left": "nxttu. · dal 2021 · ucraina", "footer-right-1": "tutti i", "footer-right-2": "diritti non fottutamente riservati", "footer-right-3": "aperto a proposte",
    tl: [
      {y: "~2014", t: "Primo contatto con la musica", d: "Età 4 anni. Computer del fratello. Melodie."},
      {y: "2016", t: "Prima \"traccia\"", d: "Età 6 anni. Una raccolta di belle melodie. Mio fratello rimase colpito."},
      {y: "2021", t: "Jonathan Fortile → Bearonic", d: "Di nuovo FL Studio. Primo pseudonimo, primi errori. Inizia l'era nera."},
      {y: "2023", t: "Nasce nxttu.", d: "Nuovo nome, nuovo sound. 924 ascolti — un record all'epoca."},
      {y: "2025–26", t: "White era — il periodo più emotivo", d: "Crescer, fare errori, vita vera. 2GEEKED, drexgod, staticgrl, NIISAN."}
    ]
  },
  es: {
    "nav-about": "info", "nav-music": "música", "nav-stats": "estadísticas", "nav-links": "enlaces", "nav-theme": "tema",
    "hero-tag": "// artista electrónico experimental · desde 2021 · ucrania",
    "hero-sub": "al lado de ti.",
    "hero-desc": "Combinando texturas ambient, ritmos breakbeat y ruido digital en paisajes sonoros emocionales — enfocado en la atmósfera y el sentimiento puro, no en la estructura tradicional.",
    "stat-plays": "reproducciones", "stat-likes": "likes", "stat-tracks": "pistas", "stat-years": "años",
    "home-quick": "acceso rápido",
    "label-about": "sobre mí",
    "about-title": "Comenzó a los 4 años<br>en la computadora<br>de mi hermano.",
    "about-p1": "Todo empezó a los <em>4 años</em> — sentado en el regajo de mi hermano en su computadora, jugando con melodías. A los 6 escribí mi primera \"pista\": solo una colección de sonidos geniales, pero mi hermano vio algo interesante en ella.",
    "about-p2": "Luego vino mi propia computadora, horas arrastrando notas en un editor. La vieja PC se rompió. Dejé la música — hasta que volví a descargar <em>FL Studio</em> y comencé a experimentar.",
    "about-p3": "First nickname: <em>Jonathan Fortile</em>. Then Bearonic, BEARN... hasta que llegué a <em>nxttu.</em> (next to you / nty). Se me ocurrió en clase pensando en una amiga sentada a mi lado.",
    "about-p4": "Ahora — productor <em>electrónico experimental</em> de Ucrania. Abierto a colaboraciones y contratos.",
    "label-music": "discografía",
    "era-1": "era I · 2021", "album-1-title": "Black Tracks", "album-1-desc": "La era donde todo comenzó. Se suponía que serían 40 pistas — la mayoría se perdió o se eliminó. Primeras pruebas, errores, borradores. Nada oculto.",
    "era-2": "era II · 2025–2026", "album-2-title": "White Tracks", "album-2-desc": "El periodo más emocional. Pistas hechas para desahogarme — caos y buenos momentos. Cada una hecha en 1–2 horas. Crudo y honesto.",
    "era-3": "era III · 2026 — ???", "album-3-desc": "Algo se está construyendo. Esta era aún está en progreso — no estoy seguro de a dónde va, pero viene.",
    "sc-listen": "Escuchar en SoundCloud", "modal-text": "Para mantenerte actualizado и seguir mis próximos lanzamientos, por favor suscríbete a mi SoundCloud o TikTok.", "modal-close": "cerrar",
    "label-stats": "estadísticas",
    "stat-2021": "reproducciones · 24 likes", "stat-2022": "reproducciones · 24 likes", "stat-2023": "reproducciones · 68 likes · 13 com.", "stat-2024": "reproducciones · 15 likes", "stat-2025": "reproducciones · 92 likes · 15 rep.",
    "label-links": "encuéntrame",
    "link-m": "Música", "link-ms": "Music / Store", "link-v": "Video", "link-sv": "Video Corto", "link-vi": "Visual", "link-c": "Comunidad", "link-g": "Juegos",
    "footer-left": "nxttu. · desde 2021 · ucraina", "footer-right-1": "todos los", "footer-right-2": "derechos no jodidamente reservados", "footer-right-3": "abierto a negocios",
    tl: [
      {y: "~2014", t: "Primer contacto con la música", d: "Edad 4 años. Computadora de mi hermano. Melodías."},
      {y: "2016", t: "Primera \"pista\"", d: "Edad 6 años. Una colección de melodías geniales. Mi hermano quedó impresionado."},
      {y: "2021", t: "Jonathan Fortile → Bearonic", d: "FL Studio de nuevo. Primer apodo, primeros errores. Comienza la era negra."},
      {y: "2023", t: "Nace nxttu.", d: "Nuevo nombre, nuevo sonido. 924 reproducciones — un récord en ese momento."},
      {y: "2025–26", t: "White era — el periodo más emocional", d: "Creciendo, cometiendo errores, vida real. 2GEEKED, drexgod, staticgrl, NIISAN."}
    ]
  }
};

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.innerHTML = dict[key];
  });
  const aboutBody = document.getElementById('about-text');
  if (aboutBody && dict['about-p1']) {
    aboutBody.innerHTML = `<p>${dict['about-p1']}</p><p>${dict['about-p2']}</p><p>${dict['about-p3']}</p><p>${dict['about-p4']}</p>`;
  }
  const timelineBox = document.getElementById('timeline-box');
  if (timelineBox && dict.tl) {
    timelineBox.innerHTML = '';
    dict.tl.forEach(item => {
      const div = document.createElement('div');
      div.className = 'tl-item';
      div.innerHTML = `<span class="tl-year">${item.y}</span><div class="tl-content"><h4>${item.t}</h4><p>${item.d}</p></div>`;
      timelineBox.appendChild(div);
    });
  }
}

function applyTheme(theme) {
  if (theme === 'black') document.body.classList.add('black-theme');
  else document.body.classList.remove('black-theme');
}

function toggleTheme() {
  const isBlack = document.body.classList.contains('black-theme');
  const next = isBlack ? 'webcore' : 'black';
  localStorage.setItem('nxttu-theme', next);
  applyTheme(next);
}

/* ---------- Font switching (Format menu) ---------- */
const fontStacks = {
  w95: "'W95FA', 'MS Sans Serif', Tahoma, Verdana, sans-serif",
  tahoma: "Tahoma, Geneva, Verdana, sans-serif",
  verdana: "Verdana, Geneva, sans-serif",
  times: "'Times New Roman', Times, serif",
  courier: "'Courier New', Courier, monospace",
  comic: "'Comic Sans MS', 'Comic Sans', cursive"
};
function applyFont(key) {
  const stack = fontStacks[key] || fontStacks.w95;
  document.documentElement.style.setProperty('--app-font', stack);
  localStorage.setItem('nxttu-font', key);
}

/* ---------- Font dialog (Format → Font...) ---------- */
const fontChoices = [
  { key: 'w95', label: 'W95FA (Windows 95)' },
  { key: 'tahoma', label: 'Tahoma' },
  { key: 'verdana', label: 'Verdana' },
  { key: 'times', label: 'Times New Roman' },
  { key: 'courier', label: 'Courier New' },
  { key: 'comic', label: 'Comic Sans MS' }
];
function showFontDialog() {
  let overlay = document.getElementById('font-dialog');
  if (overlay) { overlay.classList.add('active'); return; }
  overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'font-dialog';
  const current = localStorage.getItem('nxttu-font') || 'w95';
  overlay.innerHTML = `
    <div class="win font-dialog-win">
      <div class="win-titlebar"><span class="win-title-text">Font</span><span class="win-controls"><span class="win-btn close">✕</span></span></div>
      <div class="win-body" style="padding:1rem;">
        <div class="font-dialog-label">Choose a font:</div>
        <div class="font-dialog-list"></div>
        <div class="font-dialog-actions">
          <button class="fd-ok">OK</button>
          <button class="fd-cancel">Cancel</button>
        </div>
      </div>
    </div>`;
  document.body.appendChild(overlay);
  const list = overlay.querySelector('.font-dialog-list');
  let selected = current;
  const prevFont = current;
  fontChoices.forEach(f => {
    const item = document.createElement('div');
    item.className = 'font-dialog-item' + (f.key === current ? ' selected' : '');
    item.textContent = f.label;
    item.addEventListener('click', () => {
      list.querySelectorAll('.font-dialog-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      selected = f.key;
      applyFont(f.key);
    });
    list.appendChild(item);
  });
  const close = restore => {
    if (restore) applyFont(prevFont);
    overlay.remove();
  };
  overlay.querySelector('.fd-ok').addEventListener('click', () => { applyFont(selected); close(false); });
  overlay.querySelector('.fd-cancel').addEventListener('click', () => close(true));
  overlay.querySelector('.win-btn.close').addEventListener('click', () => close(true));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(true); });
  requestAnimationFrame(() => overlay.classList.add('active'));
}

/* ---------- Clippy Q&A ---------- */
const clippyQA = {
  en: [
    {q: "It looks like you want to know nxttu. — want a quick intro?", a: "An experimental electronic artist from Ukraine, making music since 2021."},
    {q: "Where can I listen to the tracks?", a: "SoundCloud, Bandcamp, YouTube — open the Links page!"},
    {q: "What kind of music is this?", a: "Ambient textures, breakbeat and digital noise — emotional soundscapes, not traditional structure."},
    {q: "Is nxttu. open for collabs?", a: "Yes! Open for collabs & deals. Hit the Links page to reach out."}
  ],
  ua: [
    {q: "Схоже, ти хочеш дізнатись про nxttu. — коротка інфо?", a: "Експериментальний електронний артист з України, робить музику з 2021."},
    {q: "Де можна послухати треки?", a: "SoundCloud, Bandcamp, YouTube — відкрий сторінку Links!"},
    {q: "Який це жанр?", a: "Ембієнт, брейкбіт та цифровий шум — емоційні звукові ландшафти, не традиційна структура."},
    {q: "Чи відкритий nxttu. до колабів?", a: "Так! Відкритий до колаборацій та пропозицій — пиши на Links."}
  ]
};

const CLIPPY_SVG = `<svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
  <defs><linearGradient id="clipg" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f4f4fa"/><stop offset="0.5" stop-color="#c2c2d0"/><stop offset="1" stop-color="#9898a8"/>
  </linearGradient></defs>
  <path d="M40 24 V92 a14 14 0 0 0 28 0 V40 a9 9 0 0 0 -18 0 V82 a4 4 0 0 0 8 0 V48"
    fill="none" stroke="url(#clipg)" stroke-width="11" stroke-linecap="round"/>
  <path d="M40 24 V92 a14 14 0 0 0 28 0 V40 a9 9 0 0 0 -18 0 V82 a4 4 0 0 0 8 0 V48"
    fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.55"/>
  <g class="clippy-eye"><ellipse cx="45" cy="33" rx="7.5" ry="8.5" fill="#fff" stroke="#888" stroke-width="1"/><circle cx="46" cy="35" r="3" fill="#111"/></g>
  <g class="clippy-eye"><ellipse cx="62" cy="33" rx="7.5" ry="8.5" fill="#fff" stroke="#888" stroke-width="1"/><circle cx="63" cy="35" r="3" fill="#111"/></g>
  <path d="M38 25 Q45 21 52 25" stroke="#222" stroke-width="2.2" fill="none" stroke-linecap="round"/>
  <path d="M55 25 Q62 21 69 25" stroke="#222" stroke-width="2.2" fill="none" stroke-linecap="round"/>
</svg>`;

let clippyIdx = 0;
function showClippy() {
  let wrap = document.querySelector('.clippy-wrap');
  if (!wrap) {
    wrap = document.createElement('div');
    wrap.className = 'clippy-wrap';
    wrap.innerHTML = `
      <div class="clippy-bubble">
        <div class="clippy-q" id="clippy-q"></div>
        <div class="clippy-a" id="clippy-a"></div>
        <div class="clippy-nav">
          <span id="clippy-next">next ▸</span>
          <span class="clippy-x" id="clippy-close">close ✕</span>
        </div>
      </div>
      <div class="clippy-clip">${CLIPPY_SVG}</div>`;
    document.body.appendChild(wrap);
    document.getElementById('clippy-q').addEventListener('click', () =>
      document.getElementById('clippy-a').classList.toggle('show'));
    document.getElementById('clippy-next').addEventListener('click', () => { clippyIdx++; renderClippy(); });
    document.getElementById('clippy-close').addEventListener('click', () => wrap.classList.remove('show'));
  }
  wrap.classList.add('show');
  renderClippy();
}
function renderClippy() {
  const lang = localStorage.getItem('nxttu-lang') || 'en';
  const qa = clippyQA[lang] || clippyQA.en;
  const item = qa[clippyIdx % qa.length];
  document.getElementById('clippy-q').textContent = item.q;
  const a = document.getElementById('clippy-a');
  a.textContent = item.a;
  a.classList.add('show');
}

/* ---------- Window controls + taskbar ---------- */
let topZ = 100;
function bringFront(win) { win.style.zIndex = ++topZ; }

function makeDraggable(win) {
  const bar = win.querySelector('.win-titlebar');
  if (!bar) return;
  bar.addEventListener('mousedown', e => {
    if (e.target.closest('.win-btn') || e.target.closest('.win-menu') || win.classList.contains('maximized')) return;
    bringFront(win);
    const rect = win.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    win.style.position = 'fixed';
    win.style.left = rect.left + 'px';
    win.style.top = rect.top + 'px';
    win.style.width = rect.width + 'px';
    win.style.height = rect.height + 'px';
    win.style.margin = '0';
    const move = ev => {
      win.style.left = (rect.left + ev.clientX - sx) + 'px';
      win.style.top = (rect.top + ev.clientY - sy) + 'px';
    };
    const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
    document.addEventListener('mousemove', move);
    document.addEventListener('mouseup', up);
    e.preventDefault();
  });
}

function makeResizable(win) {
  ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'].forEach(dir => {
    const h = document.createElement('div');
    h.className = 'resize-handle rh-' + dir;
    h.addEventListener('mousedown', e => {
      if (win.classList.contains('maximized')) return;
      bringFront(win);
      const rect = win.getBoundingClientRect();
      const sx = e.clientX, sy = e.clientY;
      const sw = rect.width, sh = rect.height, sl = rect.left, st = rect.top;
      win.style.position = 'fixed';
      win.style.left = sl + 'px'; win.style.top = st + 'px';
      win.style.width = sw + 'px'; win.style.height = sh + 'px'; win.style.margin = '0';
      const move = ev => {
        const dx = ev.clientX - sx, dy = ev.clientY - sy;
        let nw = sw, nh = sh, nl = sl, nt = st;
        if (dir.includes('e')) nw = Math.max(200, sw + dx);
        if (dir.includes('s')) nh = Math.max(140, sh + dy);
        if (dir.includes('w')) { nw = Math.max(200, sw - dx); nl = sl + (sw - nw); }
        if (dir.includes('n')) { nh = Math.max(140, sh - dy); nt = st + (sh - nh); }
        win.style.width = nw + 'px'; win.style.height = nh + 'px';
        win.style.left = nl + 'px'; win.style.top = nt + 'px';
      };
      const up = () => { document.removeEventListener('mousemove', move); document.removeEventListener('mouseup', up); };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
      e.preventDefault(); e.stopPropagation();
    });
    win.appendChild(h);
  });
}

function tbBtn(id) { return document.querySelector(`.taskbar-btn[data-win="${id}"]`); }
function minimizeWin(id) { const w = document.getElementById(id); w.classList.add('minimized'); w.classList.remove('maximized'); tbBtn(id)?.classList.remove('active'); }
function closeWin(id) { const w = document.getElementById(id); w.classList.add('closed'); w.classList.remove('maximized'); tbBtn(id)?.classList.remove('active'); }
function restoreWin(id) { const w = document.getElementById(id); w.classList.remove('minimized', 'closed'); tbBtn(id)?.classList.add('active'); }
function toggleMaximize(id, btn) {
  const w = document.getElementById(id);
  w.classList.toggle('maximized');
  if (btn) btn.textContent = w.classList.contains('maximized') ? '❐' : '▢';
}

function initWindows() {
  const wins = Array.from(document.querySelectorAll('.win')).filter(w => !w.closest('.modal-overlay'));
  let taskbar = document.querySelector('.taskbar');
  if (!taskbar) {
    taskbar = document.createElement('div');
    taskbar.className = 'taskbar';
    const start = document.createElement('span');
    start.className = 'taskbar-start';
    start.textContent = 'nxttu.';
    start.addEventListener('click', () => location.href = 'index.html');
    taskbar.appendChild(start);
    document.body.appendChild(taskbar);
    document.body.style.paddingBottom = '3.2rem';
  }
  wins.forEach((win, i) => {
    if (!win.id) win.id = 'win-' + i;
    const title = win.querySelector('.win-title-text')?.textContent || 'window';
    const btn = document.createElement('button');
    btn.className = 'taskbar-btn active';
    btn.textContent = title;
    btn.dataset.win = win.id;
    btn.addEventListener('click', () => {
      if (win.classList.contains('minimized') || win.classList.contains('closed')) restoreWin(win.id);
      else minimizeWin(win.id);
    });
    taskbar.appendChild(btn);
    win.querySelectorAll('.win-btn').forEach(b => {
      b.addEventListener('click', () => {
        const t = b.textContent.trim();
        if (t === '_') minimizeWin(win.id);
        else if (t === '▢' || t === '❐') toggleMaximize(win.id, b);
        else if (t === '✕') closeWin(win.id);
      });
    });
    makeDraggable(win);
    makeResizable(win);
  });
  // modal close button (music page)
  document.querySelectorAll('.modal-overlay .win-btn.close').forEach(b =>
    b.addEventListener('click', () => document.getElementById('modal-container')?.classList.remove('active')));
}

/* ---------- Menus ---------- */
const zoom = { f: 100 };
function setZoom() { document.documentElement.style.fontSize = zoom.f + '%'; }
const menuConfig = {
  file: [
    { label: 'New', action: () => location.href = 'index.html' },
    { label: 'Open Music...', action: () => location.href = 'music.html' },
    { label: 'Open Links...', action: () => location.href = 'links.html' },
    { sep: true },
    { label: 'Exit', action: w => w.classList.add('closed') }
  ],
  edit: [
    { label: 'Copy', action: () => {} },
    { label: 'Select All', action: () => {} },
    { sep: true },
    { label: 'Toggle Theme', action: () => toggleTheme() }
  ],
  format: [
    { label: 'Word Wrap', action: () => document.body.classList.toggle('wrap') },
    { label: 'Font...', action: () => showFontDialog() }
  ],
  view: [
    { label: 'Zoom In', action: () => { zoom.f = Math.min(150, zoom.f + 10); setZoom(); } },
    { label: 'Zoom Out', action: () => { zoom.f = Math.max(70, zoom.f - 10); setZoom(); } },
    { label: 'Reset Zoom', action: () => { zoom.f = 100; setZoom(); } },
    { sep: true },
    { label: 'Toggle Theme', action: () => toggleTheme() }
  ],
  help: [
    { label: 'About nxttu.', action: () => location.href = 'about.html' },
    { sep: true },
    { label: 'Ask Clippy', action: () => showClippy() }
  ]
};
function closeAllDropdowns() { document.querySelectorAll('.menu-dropdown').forEach(d => d.remove()); }
function initMenus() {
  document.querySelectorAll('.win-menu').forEach(menu => {
    menu.querySelectorAll('span').forEach(item => {
      item.addEventListener('click', e => {
        e.stopPropagation();
        const existing = item.querySelector('.menu-dropdown');
        if (existing) { existing.remove(); return; }
        closeAllDropdowns();
        const key = item.textContent.trim().toLowerCase();
        if (key === 'help') { showClippy(); return; }
        const cfg = menuConfig[key];
        if (!cfg) return;
        const dd = document.createElement('div');
        dd.className = 'menu-dropdown';
        cfg.forEach(it => {
          if (it.sep) { const s = document.createElement('div'); s.className = 'menu-sep'; dd.appendChild(s); return; }
          const mi = document.createElement('div');
          mi.className = 'menu-item';
          mi.textContent = it.label;
          mi.addEventListener('click', ev => { ev.stopPropagation(); it.action(menu.closest('.win')); closeAllDropdowns(); });
          dd.appendChild(mi);
        });
        item.appendChild(dd);
      });
    });
  });
  document.addEventListener('click', closeAllDropdowns);
}

document.addEventListener('DOMContentLoaded', () => {
  // restore prefs
  const savedLang = localStorage.getItem('nxttu-lang') || 'en';
  const savedTheme = localStorage.getItem('nxttu-theme') || 'webcore';
  const langSelector = document.getElementById('lang-selector');
  if (langSelector) langSelector.value = savedLang;
  applyLanguage(savedLang);
  applyTheme(savedTheme);
  const savedFont = localStorage.getItem('nxttu-font');
  if (savedFont) applyFont(savedFont);

  if (langSelector) {
    langSelector.addEventListener('change', e => {
      localStorage.setItem('nxttu-lang', e.target.value);
      applyLanguage(e.target.value);
    });
  }

  const themeBtn = document.getElementById('theme-btn');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  initWindows();
  initMenus();

  const fuckTarget = document.getElementById('fuck-target');
  if (fuckTarget) {
    fuckTarget.addEventListener('click', () => window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'));
  }

  // modal (music page)
  const tbcTrigger = document.getElementById('tbc-trigger');
  const modal = document.getElementById('modal-container');
  const modalClose = document.getElementById('modal-close-btn');
  if (tbcTrigger && modal && modalClose) {
    tbcTrigger.addEventListener('click', e => { e.preventDefault(); modal.classList.add('active'); });
    modalClose.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.remove('active'); });
  }
});
