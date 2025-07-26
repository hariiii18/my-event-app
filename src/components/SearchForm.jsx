import React, { useState } from "react";

const AREAS = [
  "北海道", "東北", "関東", "甲信越", "東海", "北陸", 
  "関西", "中国", "四国", "九州",
];

// 地域別ジャンル設定
const AREA_GENRES = {
  "北海道": ["雪まつり", "花火大会", "グルメフェス", "アウトドア", "温泉"],
  "東北": ["祭り", "花火大会", "グルメフェス", "温泉", "アウトドア"],
  "関東": ["アニメ・ゲーム", "美術展", "グルメフェス", "花火大会", "音楽フェス"],
  "甲信越": ["温泉", "アウトドア", "グルメフェス", "祭り", "花火大会"],
  "東海": ["グルメフェス", "祭り", "花火大会", "アウトドア", "温泉"],
  "北陸": ["温泉", "グルメフェス", "祭り", "花火大会", "アウトドア"],
  "関西": ["グルメフェス", "祭り", "花火大会", "アニメ・ゲーム", "温泉"],
  "中国": ["グルメフェス", "祭り", "花火大会", "アウトドア", "温泉"],
  "四国": ["グルメフェス", "祭り", "花火大会", "アウトドア", "温泉"],
  "九州": ["グルメフェス", "祭り", "花火大会", "温泉", "アウトドア"],
};

export default function SearchForm({ onSearch }) {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [area, setArea] = useState("");
  const [genre, setGenre] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!area) {
      alert("エリアを選択してください");
      return;
    }
    onSearch({ area, year, month, genre });
  };

  // 地域が変更されたらジャンルをリセット
  const handleAreaChange = (selectedArea) => {
    setArea(selectedArea);
    setGenre("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "white",
        padding: 32,
        borderRadius: 16,
        maxWidth: 600,
        margin: "0 auto",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
      }}
    >
      {/* エリア選択 */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          fontWeight: "bold",
          fontSize: "1.2em",
          marginBottom: 8,
        }}>
          エリアを選択
        </div>

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          background: "#f8f9fa",
          padding: "20px 16px",
          borderRadius: 6,
        }}>
          {AREAS.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => handleAreaChange(a)}
              style={{
                fontWeight: area === a ? "bold" : "normal",
                fontSize: "1.1em",
                color: area === a ? "#222" : "#555",
                background: area === a ? "#e3f2fd" : "none",
                border: area === a ? "2px solid #2196f3" : "2px solid transparent",
                borderRadius: "8px",
                padding: "8px 16px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* ジャンル選択（エリアが選択されている場合のみ表示） */}
      {area && (
        <div style={{ marginBottom: 20 }}>
          <div style={{
            fontWeight: "bold",
            fontSize: "1.2em",
            marginBottom: 8,
          }}>
            ジャンルを選択（任意）
          </div>

          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 12,
            background: "#f8f9fa",
            padding: "16px",
            borderRadius: 6,
          }}>
            <button
              type="button"
              onClick={() => setGenre("")}
              style={{
                fontWeight: genre === "" ? "bold" : "normal",
                fontSize: "1em",
                color: genre === "" ? "#222" : "#555",
                background: genre === "" ? "#e8f5e8" : "none",
                border: genre === "" ? "2px solid #4caf50" : "2px solid transparent",
                borderRadius: "6px",
                padding: "6px 12px",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              すべて
            </button>
            {AREA_GENRES[area]?.map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGenre(g)}
                style={{
                  fontWeight: genre === g ? "bold" : "normal",
                  fontSize: "1em",
                  color: genre === g ? "#222" : "#555",
                  background: genre === g ? "#e8f5e8" : "none",
                  border: genre === g ? "2px solid #4caf50" : "2px solid transparent",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 年選択 */}
      <div style={{ marginBottom: 18 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
          年
        </label>
        <select
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        >
          {Array.from({ length: 5 }).map((_, i) => {
            const y = new Date().getFullYear() + i;
            return <option key={y} value={y}>{y}年</option>;
          })}
        </select>
      </div>

      {/* 月選択 */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ display: "block", marginBottom: 6, fontWeight: "bold" }}>
          月
        </label>
        <select
          value={month}
          onChange={(e) => setMonth(Number(e.target.value))}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        >
          {Array.from({ length: 12 }).map((_, idx) => {
            const m = idx + 1;
            return (
              <option key={m} value={m}>
                {m}月
              </option>
            );
          })}
        </select>
      </div>

      {/* 検索ボタン */}
      <button
        type="submit"
        style={{
          width: "100%",
          background: "#2563eb",
          color: "white",
          fontWeight: "bold",
          padding: "16px",
          fontSize: "1.2em",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          transition: "background-color 0.2s"
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
        onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
      >
        検索
      </button>
    </form>
  );
}