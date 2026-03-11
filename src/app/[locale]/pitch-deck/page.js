"use client";

import { useState } from "react";

export default function PitchDeckPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === "osanve2026") {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (authenticated) {
    return (
      <iframe
        src="/deck/OSANVE-MILSIM-DECK.html"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          border: "none",
          zIndex: 9999,
          background: "#0a0a0a",
        }}
        title="MILSIM.AI Pitch Deck"
      />
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#0a0a0a",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          padding: "48px",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          background: "#111111",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <div
          style={{
            fontFamily: "'Orbitron', var(--font-military), sans-serif",
            fontSize: "14px",
            letterSpacing: "4px",
            color: "#999",
            textTransform: "uppercase",
          }}
        >
          MILSIM.AI
        </div>
        <h1
          style={{
            fontSize: "22px",
            fontWeight: 600,
            color: "#e8e8e8",
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          Pitch Deck
        </h1>
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            textAlign: "center",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Enter the access code to view this document.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError(false);
          }}
          placeholder="Access Code"
          autoFocus
          style={{
            width: "100%",
            padding: "12px 16px",
            fontSize: "16px",
            fontFamily: "'Share Tech Mono', monospace",
            letterSpacing: "3px",
            background: "#0a0a0a",
            border: error
              ? "1px solid #FF3333"
              : "1px solid rgba(255, 255, 255, 0.2)",
            color: "#e8e8e8",
            outline: "none",
            textAlign: "center",
          }}
        />
        {error && (
          <span
            style={{
              fontSize: "13px",
              color: "#FF3333",
              fontFamily: "'Share Tech Mono', monospace",
            }}
          >
            ACCESS DENIED
          </span>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "14px",
            fontFamily: "'Rajdhani', sans-serif",
            fontWeight: 600,
            letterSpacing: "3px",
            textTransform: "uppercase",
            background: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            color: "#e8e8e8",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.5)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
            e.target.style.borderColor = "rgba(255, 255, 255, 0.3)";
          }}
        >
          Authorize
        </button>
      </form>
    </div>
  );
}
