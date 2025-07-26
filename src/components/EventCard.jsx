// src/components/EventCard.jsx
import React from 'react';

function EventCard({ event, onClick }) {
  return (
    <div 
      onClick={onClick} 
      style={{ 
        border: '1px solid #ccc', 
        padding: '1rem', 
        marginBottom: '1rem', 
        textAlign: 'center',
        height: '420px',
        overflow: 'hidden scroll',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onMouseOver={onClick ? (e) => {
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      } : undefined}
      onMouseOut={onClick ? (e) => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      } : undefined}
    >
      {/* タイトル */}
      <h2 style={{ 
        margin: '0 0 1rem 0', 
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#333'
      }}>
        {event.title}
      </h2>
      
      {/* 画像 */}
      <div style={{ 
        flex: '1', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: '1rem'
      }}>
        <img 
          src={event.image} 
          alt={event.altText} 
          style={{ 
            maxWidth: '100%', 
            maxHeight: '200px',
            objectFit: 'cover',
            borderRadius: '4px'
          }} 
        />
      </div>
      
      {/* 情報とリンク */}
      <div style={{ width: '100%' }}>
        <p style={{ 
          color: 'red', 
          margin: '0.5rem 0',
          fontWeight: 'bold'
        }}>
          {event.date}
        </p>
        <p style={{ 
          margin: '0.5rem 0',
          fontSize: '0.9rem',
          color: '#666'
        }}>
          開催場所 : {event.venue}
        </p>
        {event.officialUrl &&
          <a
            href={event.officialUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ 
              display: 'inline-block',
              marginTop: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              textDecoration: 'none',
              borderRadius: '4px',
              fontSize: '0.9rem'
            }}
          >
            公式サイト
          </a>
        }
      </div>
    </div>
  );
}

export default EventCard;