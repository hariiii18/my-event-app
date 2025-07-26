import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchForm from '../components/SearchForm';

export default function HomeSearch() {
  const navigate = useNavigate();

  // 検索実行時の処理
  const handleSearch = ({ area, year, month, genre }) => {
    // 検索結果ページに遷移（URLパラメータ付き）
    const params = new URLSearchParams({
      area: area,
      year: year,
      month: month
    });
    
    if (genre) {
      params.append('genre', genre);
    }
    
    navigate(`/results?${params.toString()}`);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto',
        textAlign: 'center'
      }}>
        <h1 style={{ 
          color: 'white', 
          fontSize: '2.5rem', 
          marginBottom: '1rem',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          イベント検索
        </h1>
        <p style={{ 
          color: 'white', 
          fontSize: '1.2rem', 
          marginBottom: '3rem',
          opacity: 0.9
        }}>
          地域とジャンルを選んで、お気に入りのイベントを見つけましょう
        </p>
        
        <SearchForm onSearch={handleSearch} />
      </div>
    </div>
  );
}