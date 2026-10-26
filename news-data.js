/* ===================================================================
   NEWS FEED — the only file you need to touch to post news.

   To add an entry: copy one block below, paste it at the TOP of the
   list (newest first) and edit the fields.

     date  — free text, shown exactly as written        e.g. "26.10.2026"
     link  — optional URL; a link button appears when set
     en    — required block: { tag?, title, text }
     ua / ru / pl / it / es — optional; a missing language
              falls back to the `en` block for that entry.

   `tag` is the small badge (e.g. release / site / links) and is
   optional. Keep the shape simple — plain strings, no HTML needed.
   =================================================================== */

const NEWS = [
  {
    date: "26.10.2026",
    en: {
      tag: "site",
      title: "New site is live",
      text: "The whole page was rebuilt: a Windows 95 desktop, 22 colour themes, 6 languages and windows you can actually drag around. The news page is new too — everything I post lands right here."
    },
    ua: {
      tag: "сайт",
      title: "Новий сайт уже тут",
      text: "Всю сторінку перебудовано: десктоп у стилі Windows 95, 22 теми оформлення, 6 мов і вікна, які реально можна тягати. Сторінка новин теж нова — усе, що я публікую, буде саме тут."
    },
    ru: {
      tag: "сайт",
      title: "Новый сайт уже здесь",
      text: "Вся страница переделана: десктоп в стиле Windows 95, 22 темы оформления, 6 языков и окна, которые реально можно перетаскивать. Страница новостей тоже новая — всё, что я публикую, будет именно здесь."
    },
    pl: {
      tag: "strona",
      title: "Nowa strona już działa",
      text: "Cała strona została przebudowana: pulpit w stylu Windows 95, 22 motywy kolorystyczne, 6 języków i okna, które naprawdę można przesuwać. Strona aktualności też jest nowa — wszystko, co publikuję, trafi właśnie tutaj."
    },
    it: {
      tag: "sito",
      title: "Il nuovo sito è online",
      text: "Tutta la pagina è stata ricostruita: desktop in stile Windows 95, 22 temi di colore, 6 lingue e finestre che puoi davvero trascinare. Anche la pagina novità è nuova — tutto quello che pubblico finisce qui."
    },
    es: {
      tag: "sitio",
      title: "La nueva web ya está aquí",
      text: "Toda la página se reconstruyó: un escritorio estilo Windows 95, 22 temas de color, 6 idiomas y ventanas que de verdad puedes arrastrar. La página de noticias también es nueva — todo lo que publique aparece aquí."
    }
  },
  {
    date: "18.10.2026",
    link: "https://www.soundcloud.com/nxttoyo",
    en: {
      tag: "release",
      title: "White era — new tracks in the works",
      text: "The most emotional period so far. Tracks made in one sitting, raw and honest: 2GEEKED, drexgod, staticgrl, NIISAN. More coming soon."
    },
    ua: {
      tag: "реліз",
      title: "Біла ера — нові треки в роботі",
      text: "Найемоційніший період поки що. Треки, зроблені за один підхід, сиро та чесно: 2GEEKED, drexgod, staticgrl, NIISAN. Далі буде більше."
    },
    ru: {
      tag: "релиз",
      title: "Белая эра — новые треки в работе",
      text: "Самый эмоциональный период пока что. Треки, сделанные за один заход, сыро и честно: 2GEEKED, drexgod, staticgrl, NIISAN. Дальше будет больше."
    },
    pl: {
      tag: "wydanie",
      title: "Biała era — nowe utwory w drodze",
      text: "Najbardziej emocjonalny okres do tej pory. Utwory zrobione za jednym posiedzeniem, surowe i szczere: 2GEEKED, drexgod, staticgrl, NIISAN. Więcej wkrótce."
    },
    it: {
      tag: "uscita",
      title: "Era bianca — nuove tracce in arrivo",
      text: "Il periodo più emotivo finora. Tracce fatte in una sola sessione, crude e sincere: 2GEEKED, drexgod, staticgrl, NIISAN. Altro in arrivo."
    },
    es: {
      tag: "lanzamiento",
      title: "Era blanca — nuevas pistas en camino",
      text: "El periodo más emocional hasta ahora. Pistas hechas de una sentada, crudas y honestas: 2GEEKED, drexgod, staticgrl, NIISAN. Pronto habrá más."
    }
  },
  {
    date: "07.10.2026",
    link: "https://discord.gg/KMVt2C9zRx",
    en: {
      tag: "links",
      title: "Webring buttons + Discord",
      text: "Three more sites joined the links page — trippy.nekoweb.org, 0mnibus.net and sava28.neocities.org. The Discord server is open too, come say hi."
    },
    ua: {
      tag: "посилання",
      title: "Кнопки вебринг + Discord",
      text: "На сторінці посилань з'явились ще три сайти — trippy.nekoweb.org, 0mnibus.net і sava28.neocities.org. Discord-сервер теж відкритий, заходь привітатись."
    },
    ru: {
      tag: "ссылки",
      title: "Кнопки вебринг + Discord",
      text: "На странице ссылок появились ещё три сайта — trippy.nekoweb.org, 0mnibus.net и sava28.neocities.org. Discord-сервер тоже открыт, заходи поздороваться."
    },
    pl: {
      tag: "linki",
      title: "Przyciski webringu + Discord",
      text: "Na stronie linków pojawiły się trzy kolejne serwisy — trippy.nekoweb.org, 0mnibus.net i sava28.neocities.org. Serwer Discord też jest otwarty, wpadnij się przywitać."
    },
    it: {
      tag: "link",
      title: "Bottoni webring + Discord",
      text: "Altri tre siti sono entrati nella pagina link — trippy.nekoweb.org, 0mnibus.net e sava28.neocities.org. Anche il server Discord è aperto, passa a salutare."
    },
    es: {
      tag: "enlaces",
      title: "Botones de webring + Discord",
      text: "Tres sitios más se sumaron a la página de enlaces — trippy.nekoweb.org, 0mnibus.net y sava28.neocities.org. El servidor de Discord también está abierto, pasa a saludar."
    }
  }
];
