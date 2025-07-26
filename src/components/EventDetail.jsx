// src/components/EventDetail.jsx
import React from 'react';

export default function EventDetail({ event }) {
  if (!event) return <p>イベントが選択されていません。</p>;
  return (
    <div className="p-4 border rounded">
      <h2 className="text-2xl font-bold mb-2">{event.title}</h2>
      <p className="mb-1"><strong>日付：</strong>{event.date}</p>
      <p className="mb-1"><strong>住所：</strong>{event.address}</p>
      {event.officialUrl && (
        <p className="mt-2">
          <a
            href={event.officialUrl}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 hover:underline"
          >
            公式サイトを見る
          </a>
        </p>
      )}
    </div>
  );
}