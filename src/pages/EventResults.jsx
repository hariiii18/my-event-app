import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchEvents } from "../api/events";
import "../styles/index.css";
import EventCard from "../components/EventCard";

function EventResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // URLパラメータから検索条件を取得
  const searchParams = new URLSearchParams(location.search);
  const area = searchParams.get("area");
  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const genre = searchParams.get("genre");

  useEffect(() => {
    const loadEvents = async () => {
      if (!area || !year || !month) {
        setError("検索条件が不足しています");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await fetchEvents({ area, year, month });
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError("イベントの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [area, year, month]);

  // ジャンルフィルタリング
  useEffect(() => {
    if (genre) {
      const filtered = events.filter((event) => {
        // イベントタイトルや説明にジャンルが含まれているかチェック
        const eventText = `${event.title} ${event.altText || ""}`.toLowerCase();
        const genreKeywords = {
          雪まつり: ["雪", "まつり", "snow"],
          花火大会: ["花火", "fireworks"],
          グルメフェス: ["グルメ", "フェス", "food", "食べ物"],
          アウトドア: ["アウトドア", "outdoor", "キャンプ", "ハイキング"],
          温泉: ["温泉", "onsen"],
          祭り: ["祭り", "まつり", "festival"],
          "アニメ・ゲーム": ["アニメ", "ゲーム", "anime", "game"],
          美術展: ["美術", "展覧会", "art", "museum"],
          音楽フェス: ["音楽", "フェス", "music", "concert"],
        };

        const keywords = genreKeywords[genre] || [];
        return keywords.some((keyword) => eventText.includes(keyword));
      });
      setFilteredEvents(filtered);
    } else {
      setFilteredEvents(events);
    }
  }, [events, genre]);

  const handleBackToSearch = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <div className="loader">Loading...</div>
        <p>数分かかる恐れがあります。</p>
        <button
          onClick={handleBackToSearch}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          検索ページに戻る
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>エラー</h2>
        <p>{error}</p>
        <button
          onClick={handleBackToSearch}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          検索ページに戻る
        </button>
      </div>
    );
  }

  const displayEvents = genre ? filteredEvents : events;

  return (
    <div style={{ padding: "1rem" }}>
      {/* ヘッダー */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          minHeight: "80px",
          marginBottom: "2rem",
          padding: "1rem",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.5rem" }}>
            「{area}」の{year}年<br />{month}月のイベント一覧
            {genre && <span style={{ color: "#4caf50" }}>（{genre}）</span>}
          </h1>
          <p style={{ margin: "0.5rem 0 0 0", color: "#666" }}>
            {displayEvents.length}件のイベントが見つかりました
          </p>
        </div>
        <button
          onClick={handleBackToSearch}
          style={{
            margin: "0",
            height:'100%',
            backgroundColor: "#6c757d",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "1.1rem",
            padding: "0 2em",
          }}
        >
          検索条件を変更
        </button>
      </div>

      {/* イベント一覧 */}
      {displayEvents.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {displayEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            padding: "3rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <h3>イベントが見つかりませんでした</h3>
          <button
            onClick={handleBackToSearch}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            検索条件を変更
          </button>
        </div>
      )}
    </div>
  );
}

export default EventResults;
