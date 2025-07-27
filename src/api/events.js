// src/api/events.js
export async function fetchEvents(params = {}) {
  const { area = '', year = '', month = '', pages = 5 } = params;
  const queryParams = new URLSearchParams({
    area,
    year,
    month,
    pages
  }).toString();
  
  const res = await fetch(`/api/events?${queryParams}`);
  if (!res.ok) throw new Error('イベント取得失敗');
  return await res.json();
}

export async function fetchEventById(id) {
  const all = await fetchEvents({ aprorea:'', year:'', month:'' });
  return all.find(ev => ev.id === id) || null;
}