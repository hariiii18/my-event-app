import React, { useEffect, useState } from 'react';
import EventCard from 'EventCard'; // イベントカード表示用コンポーネント

function Events() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5050/api/events?pages=1')
      .then((res) => {
        if (!res.ok) throw new Error('データの取得に失敗しました');
        return res.json();
      })
      .then((data) => {
        setEvents(data);
      })
      .catch((err) => {
        console.error(err);
        setError('イベントの取得に失敗しました');
      });
  }, []);

  if (error) return <div>{error}</div>;
  if (events.length === 0) return <div>読み込み中...</div>;

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
      <h1 style={{ width: '100%' }}>イベント一覧</h1>
      {events.map((event, index) => (
        <div key={index} style={{ flex: '0 1 calc(35% - 1rem)', boxSizing: 'border-box' }}>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}

export default Events;