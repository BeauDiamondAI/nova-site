"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import "./SectionAbout.css";

type CardId = "card1" | "card2";

export default function SectionAbout() {
  const [flipped, setFlipped] = useState<Set<CardId>>(new Set());
  const card1Ref = useRef<HTMLDivElement | null>(null);
  const card2Ref = useRef<HTMLDivElement | null>(null);

  // Mouse tracking glow — only active when a card is flipped
  const handleMouseMove =
    (ref: React.RefObject<HTMLDivElement | null>, id: CardId) =>
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;                    // null-safe
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
  };

  const toggle = (id: CardId) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  // Make sure CSS vars are initialized so the glow has a position
  useEffect(() => {
    [card1Ref, card2Ref].forEach((r) => {
      if (r.current) {
        r.current.style.setProperty("--mx", "50%");
        r.current.style.setProperty("--my", "50%");
      }
    });
  }, []);

  return (
    <section className="about-wrap">
      <div className="about-heading">
        <h2 className="about-title">
          Thinks Deeper. Moves Faster. Deploys Intelligently.
        </h2>
        <p className="about-sub">
          <strong>NovaThink</strong> is building the{" "}
          <span className="about-accent">cognitive operating system</span> for
          the AI era.
        </p>
      </div>

      <div className="cards-grid">
        {/* Card 1 */}
        <div
          ref={card1Ref}
          className={`flip-card-container ${
            flipped.has("card1") ? "flipped" : ""
          }`}
          onMouseMove={handleMouseMove(card1Ref, "card1")}
        >
          <button
            type="button"
            aria-pressed={flipped.has("card1")}
            className="flip-card-button"
            onClick={() => toggle("card1")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle("card1");
              }
            }}
          >
            <div className="flip-card-inner">
              {/* front */}
              <div className="flip-face flip-front glassmorphic-card">
                <div className="face-content">
                  <h3 className="card-kicker">THE COGNITIVE OS LAYER</h3>
                  <p className="card-text">Between LLMs and execution.</p>
                </div>
                {/* hover cyan line/glow */}
                <div className="hover-glow" />
              </div>

              {/* back */}
              <div className="flip-face flip-back glassmorphic-card">
                <div className="face-content">
                  <h3 className="card-kicker">Deep System Context</h3>
                  <p className="card-text">
                    NovaThink orchestrates reasoning, budget, and latency across
                    providers with guardrailed execution and mission-critical
                    reliability.
                  </p>
                </div>
                {/* cyan mouse-tracking glow appears only when flipped */}
                <div
                  className={`tracked-glow ${
                    flipped.has("card1") ? "active" : ""
                  }`}
                />
              </div>
            </div>
          </button>
        </div>

        {/* Card 2 */}
        <div
          ref={card2Ref}
          className={`flip-card-container ${
            flipped.has("card2") ? "flipped" : ""
          }`}
          onMouseMove={handleMouseMove(card2Ref, "card2")}
        >
          <button
            type="button"
            aria-pressed={flipped.has("card2")}
            className="flip-card-button"
            onClick={() => toggle("card2")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                toggle("card2");
              }
            }}
          >
            <div className="flip-card-inner">
              {/* front */}
              <div className="flip-face flip-front glassmorphic-card">
                <div className="face-content">
                  <h3 className="card-kicker">BUILT FOR MISSION-CRITICAL</h3>
                  <p className="card-text">Cognitive infrastructure.</p>
                </div>
                <div className="hover-glow" />
              </div>

              {/* back */}
              <div className="flip-face flip-back glassmorphic-card">
                <div className="face-content">
                  <h3 className="card-kicker">Enterprise-Grade Controls</h3>
                  <p className="card-text">
                    Observability, policy enforcement, and rollback-safe
                    workflows with cyan comet glow tracking for focused reveal.
                  </p>
                </div>
                <div
                  className={`tracked-glow ${
                    flipped.has("card2") ? "active" : ""
                  }`}
                />
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="about-footer">
        <h3 className="about-claim">NovaThink is something fundamentally new:</h3>
        <p className="about-copy">
          An LLM-agnostic cognitive OS — the intelligence amplification layer
          that will define how humans and AI collaborate over the next decade.
        </p>
      </div>
    </section>
  );
}
