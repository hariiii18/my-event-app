import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
const PORT = 5050;


const AREA_URL_MAP = {
  "北海道": "ar0101",
  "東北": "ar0200",
  "関東": "ar0300",
  "甲信越": "ar0400",
  "北陸": "ar0500",
  "東海": "ar0600",
  "関西": "ar0700",
  "中国": "ar0800",
  "四国": "ar0900",
  "九州": "ar1000"
};


const allowedOrigins = [
  'https://hariiii18.github.io',    // GitHub Pages
  'http://localhost:5173',          // Vite 開発サーバー
]

app.use(cors({
  origin(origin, cb) {
    if (!origin || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS: ' + origin))
    }
  }
}))


app.get('/api/events', async(req, res) => {
  const { area, year, month, genre, pages = 1 } = req.query;
  console.log('受信クエリ:', area, genre, year, month, 'ページ数:', pages);

  try {
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    let allEvents = [];

    for(let pageNum = 1; pageNum <= pages; pageNum++) {
      const areaCode = AREA_URL_MAP[area] || "ar0300";
      const yyyymm = `${year}${String(month).padStart(2, '0')}`;
      const urlBase = `https://www.walkerplus.com/event_list/${areaCode}/`;
      const url = pageNum === 1 ? `${urlBase}` : `${urlBase}${pageNum}.html`;

      console.log(`ページ ${pageNum}を取得中: ${url}`);
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

      const events = await page.evaluate(() => {
        const items = document.querySelectorAll('li.m-mainlist__item');
        return Array.from(items).map(item => {
          const getText = (selector) => item.querySelector(selector)?.textContent.trim() || '';
          const getAttr = (selector, attr) => item.querySelector(selector)?.getAttribute(attr) || '';
          return {
            title: getText('span.m-mainlist-item__ttl'),
            url: 'https://www.walkerplus.com' + getAttr('.m-mainlist-item__img', 'href'),
            date: (() => {
              const period = item.querySelector('.m-mainlist-item-event__period');
              if(!period) return '';
              const span = period.querySelector('span');
              if (span) span.remove();
              const text = period.textContent.trim();
              if (span) period.prepend(span);
              return text;
            })(),
            image: 'https:' + getAttr('img', 'src'),
            altText: getAttr('img', 'alt'),
            venue: getText('.m-mainlist-item-event__place'),
          };
        }).filter(e => e.title);
      });

      allEvents = allEvents.concat(events);
      console.log(`ページ ${pageNum}: ${events.length}件のイベントを取得`);
      if (pageNum < parseInt(pages)) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }




    for (let i = 0; i < allEvents.length; i++) {
      const event = allEvents[i];
      try {
        const detailUrl = event.url + 'data.html';
        await page.goto(detailUrl, { waitUntil: 'domcontentloaded', timeout: 10000});

        const officialUrl = await page.evaluate(() => {
          const link = Array.from(document.querySelectorAll('a')).find(a => a.textContent.includes('公式サイトほか、関連サイトはこちら'));
          return link ? link.href : console.log("取得できませんでした");;
        });
        console.log(officialUrl);

        event.officialUrl = officialUrl;
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch(e) {
        event.officialUrl = null;
      }
    }
    console.log("フィルター前:", allEvents.length);

    await browser.close();
    console.log(`合計 ${allEvents.length}件のイベントを返却`);
    res.json(allEvents);
  } catch (error) {
    console.error('スクレイピングエラー:', error);
    res.status(500).json({ error: 'イベント取得に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is runnning on http://localhost:${PORT}`);
});