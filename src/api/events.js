// src/api/events.js

// モックデータ（GitHub Pages用）
const mockEvents = [
  {
    id: 1,
    title: "サンプルイベント1",
    date: "2025年1月1日〜1月3日",
    venue: "サンプル会場",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuaXoOeQpuekuuS4i+WbvueJhzwvdGV4dD4KPC9zdmc+",
    altText: "サンプルイベント1",
    url: "#",
    officialUrl: "#"
  },
  {
    id: 2,
    title: "サンプルイベント2",
    date: "2025年1月15日〜1月17日",
    venue: "サンプル会場2",
    image: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2Y0ZjRmNCIvPgogIDx0ZXh0IHg9IjE1MCIgeT0iMTAwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiM2NjY2NjYiIHRleHQtYW5jaG9yPSJtaWRkbGUiPuaXoOeQpuekuuS4i+WbvueJhzwvdGV4dD4KPC9zdmc+",
    altText: "サンプルイベント2",
    url: "#",
    officialUrl: "#"
  }
];

export async function fetchEvents(params = {}) {
  const { area = '', year = '', month = '', pages = 5 } = params;
  const queryParams = new URLSearchParams({
    area,
    year,
    month,
    pages
  }).toString();
  
  // 本番環境ではRailwayのURLを使用、開発環境ではプロキシを使用
  const apiUrl = process.env.NODE_ENV === 'production' 
    ? 'https://my-event-app.railway.internal/api/events'
    : '/api/events';
  
  const res = await fetch(`${apiUrl}?${queryParams}`);
  if (!res.ok) throw new Error('イベント取得失敗');
  return await res.json();
}

export async function fetchEventById(id) {
  const all = await fetchEvents({ aprorea:'', year:'', month:'' });
  return all.find(ev => ev.id === id) || null;
}