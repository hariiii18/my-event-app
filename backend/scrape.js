import puppeteer from 'puppeteer';

const AREA_PREFS = {
  "北海道": ["北海道"],
  "東北": ["青森", "岩手", "宮城", "秋田", "山形", "福島"],
  "関東": ["東京", "神奈川", "千葉", "埼玉", "茨城", "栃木", "群馬"],
  "甲信越": ["山梨", "長野", "新潟"],
  "東海": ["愛知", "岐阜", "三重", "静岡"],
  "北陸": ["石川", "富山", "福井"],
  "関西": ["大阪", "京都", "兵庫", "滋賀", "奈良", "和歌山"],
  "中国": ["広島", "岡山", "山口", "鳥取", "島根"],
  "四国": ["香川", "愛媛", "徳島", "高知"],
  "九州": ["福岡", "佐賀", "長崎", "熊本", "大分", "宮崎", "鹿児島", "沖縄"],
};

const area = process.argv[2] || null;

(async () => {
  const browser = await puppeteer.launch({ headless:false });
  const page = await browser.newPage();
  await page.goto('https://www.walkerplus.com/event_list/', {
    waitUntil: 'networkidle0'
  });

  const events = await page.evaluate(() => {
    const items = document.querySelectorAll('.event-list-item');
    return Array.from(items).map(item => {
      const getText = (selector) => item.querySelector(selector)?.textContent.trim() || '';
      const getAttr = (selector, attr) => item.querySelector(selector)?.getAttribute(attr) || '';
      return {
        title: getText('.m-mainlist-item__ttl'),
        url: 'https://www.walkerplus.com' + getAttr('.m-mainlist-item__ttl a', 'href'),
        data: item.querySelector('.m-mainlist-item-evetn__period')?.innerText.trim() || '',
        image: 'https:' + getAttr('img', 'src'),
        altText: getAttr('img', 'alt'),
        venue: getText('.m-mainlist-item-event__place'),
      };
    }).filter(e => e.title);
  });

  let filteredEvents = events;
  if(area && AREA_PREFS[area]) {
    const areaPrefs = AREA_PREFS[area];
    filterdEvents = events.filter(event => {
      return areaPrefs.some(pref =>
      (event.venue && event.venue.includes(pref)) ||
      (event.title && event.title.includes(pref))
      );
    });
  }

  console.log(filteredEvents);
  await browser.close();
})();