import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ITEMS = [
  { id: "i", badge: "I", title: "EDUCATION", subtitle: "B.E. Computer Engineering", rank: 3 },
  { id: "ii", badge: "II", title: "SKILLS", subtitle: "SQL / Unity / C++ / Python", rank: 4 },
  { id: "iii", badge: "III", title: "PROJECTS", subtitle: "ML, GameDev & AI Models", rank: 5 },
  { id: "iv", badge: "IV", title: "EXPERIENCE", subtitle: "LSOYS / Trainee / Hackathons", rank: 2 },
];

const DETAIL_PANELS = [
  {
    title: "EDUCATION LOG",
    progress: "7.95 GPA",
    rows: [
      { index: "01", title: "Computer Engineering", status: "Complete" },
      { index: "02", title: "Siddhant College Eng.", status: "7.95 CGPA" },
      { index: "03", title: "SPPU University", status: "Pune, IN" },
      { index: "04", title: "B.E. Degree", status: "2021-2025" }
    ],
    bullets: [
      "- Strong foundation in software engineering, OOP, and databases.",
      "- Focused on problem-solving, UI design, and systems optimization.",
      "- Passionate about gaming architectures and data analysis."
    ]
  },
  {
    title: "TECHNICAL SKILLS",
    progress: "LEVEL S",
    rows: [
      { index: "01", title: "SQL & Databases", status: "Expert" },
      { index: "02", title: "GameDev (Unity & C#)", status: "Advanced" },
      { index: "03", title: "C++, C#, Python", status: "Skilled" },
      { index: "04", title: "Git, JIRA, VS, Blender", status: "Tools" }
    ],
    bullets: [
      "- SQL: CRUD, Joins, Triggers, Views, Functions, Indexing, Procedures, TCL/DCL.",
      "- Game Development: Unity, C#, 2D games, physics, UI, AI state machines.",
      "- Soft Skills: Technical documentation, problem-solving, communication & leadership."
    ]
  },
  {
    title: "FEATURED WORK",
    progress: "3 ACTIVE",
    rows: [
      { index: "01", title: "Asteroid Path Model", status: "Patent App" },
      { index: "02", title: "Kyūen (2D Roguelike)", status: "Unity / C#" },
      { index: "03", title: "Techathon AI Teacher", status: "Django / LLM" }
    ],
    bullets: [
      "- Asteroid: Hybrid trajectory prediction combining statistics & ML with ensemble simulation.",
      "- Kyūen: Skewed-action roguelike, state AI, parallax effects, resource upgrades.",
      "- Techathon: Offline voice-to-voice educational assistant returning visual answers."
    ]
  },
  {
    title: "EXPERIENCE LOG",
    progress: "ACTIVE",
    rows: [
      { index: "01", title: "LSOYS Gaming (Game Intern)", status: "Jan-Apr 24" },
      { index: "02", title: "QSpiders (Data Trainee)", status: "Sep 24-Pres" },
      { index: "03", title: "Codement24 AR & AI", status: "Hackathon" }
    ],
    bullets: [
      "- LSOYS: Built Balloon Runner gameplay, dynamic health system & interactive zones.",
      "- Codement24: Developed Unity AR educational application and AI student assistant.",
      "- QSpiders: Full stack python developer trainee analyzing & visualizing data."
    ]
  }
];

export default function ResumePage({ src }) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialActive = location.state?.activeTab !== undefined ? location.state.activeTab : 1;
  const [active, setActive] = useState(initialActive);
  const [opened, setOpened] = useState(-1);
  const [mounted, setMounted] = useState(false);
  const [showMask, setShowMask] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 80);
    const maskTimer = setTimeout(() => setShowMask(false), 1500); // Unmount duplicate video after transition
    return () => {
      clearTimeout(t);
      clearTimeout(maskTimer);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowUp") setActive((i) => Math.max(-1, i - 1));
      if (e.key === "ArrowDown") setActive((i) => Math.min(ITEMS.length - 1, i + 1));
      if (e.key === "ArrowLeft") navigate("/");
      if (e.key === "Enter") {
        if (active === -1) navigate("/");
        else setOpened(active);
      }
      if (e.key === "Escape" || e.key === "Backspace") {
        if (opened !== -1) setOpened(-1);
        else navigate("/");
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, opened, navigate]);

  return (
    <div id="menu-screen">
      <video src={src} autoPlay loop muted playsInline style={{ pointerEvents: 'none', willChange: 'transform', transform: 'translateZ(0)' }} />
      {showMask && (
        <div className="resume-entry-mask" aria-hidden="true">
          <video className="resume-entry-video" src={src} autoPlay loop muted playsInline style={{ pointerEvents: 'none', willChange: 'transform', transform: 'translateZ(0)' }} />
        </div>
      )}
      <a
        href="#"
        className={`p3-home-btn${active === -1 ? " active" : ""}`}
        onClick={(e) => { e.preventDefault(); navigate("/"); }}
        onMouseEnter={() => {
          setActive(-1);
          setOpened(-1);
        }}
      >
        <div className="p3-home-btn-shadow" />
        <div className="p3-home-btn-bg" />
        <span className="p3-home-btn-text">◄ MENU</span>
      </a>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Bebas+Neue&display=swap');

        .p3-home-btn {
          position: absolute;
          top: 20px;
          left: 24px;
          z-index: 100;
          cursor: pointer;
          pointer-events: all;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 20px;
          font-style: italic;
          letter-spacing: 2px;
          padding: 8px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          color: #3ce2ff;
          transition: transform 0.2s ease, color 0.12s ease;
          transform: skewX(-15deg);
        }
        .p3-home-btn-shadow {
          position: absolute;
          inset: 0;
          background: rgba(235, 80, 120, 0.85);
          z-index: 1;
          transform: translate(-4px, 4px);
          transition: transform 0.2s ease, opacity 0.2s ease;
          opacity: 0;
          clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
        }
        .p3-home-btn-bg {
          position: absolute;
          inset: 0;
          background: #111;
          z-index: 2;
          clip-path: polygon(0 0, 100% 0, 90% 100%, 10% 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          transition: background 0.2s ease, transform 0.2s ease;
        }
        .p3-home-btn-text {
          position: relative;
          z-index: 3;
          white-space: nowrap;
          user-select: none;
        }
        .p3-home-btn:hover, .p3-home-btn.active {
          color: #6b0010;
          transform: skewX(-15deg) scale(1.05);
        }
        .p3-home-btn:hover .p3-home-btn-shadow, .p3-home-btn.active .p3-home-btn-shadow {
          opacity: 1;
          transform: translate(-8px, 6px);
        }
        .p3-home-btn:hover .p3-home-btn-bg, .p3-home-btn.active .p3-home-btn-bg {
          background: #ffffff;
          border-color: #ffffff;
        }

        .resume-entry-mask {
          position: absolute;
          inset: 0;
          z-index: 9;
          overflow: hidden;
          background: #0047FF;
          clip-path: circle(0 at 50% 50%);
          animation: resume-entry-reveal 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          pointer-events: none;
        }

        .resume-entry-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes resume-entry-reveal {
          from { clip-path: circle(0 at 50% 50%); }
          to { clip-path: circle(150vmax at 50% 50%); }
        }

        .resume-overlay {
          position: absolute;
          inset: 0;
          z-index: 10;
          pointer-events: none;
        }

        .resume-stack {
          position: absolute;
          top: 9vh;
          left: 2.8vw;
          width: min(33vw, 500px);
          display: flex;
          flex-direction: column;
          gap: 10px;
          pointer-events: none;
          transform: scale(0.9);
          transform-origin: top left;
        }

        .resume-list-tag {
          font-family: 'Anton', sans-serif;
          font-size: 92px;
          line-height: 0.9;
          color: #f6fbff;
          letter-spacing: 2px;
          margin: 0 0 6px 12px;
          text-shadow: 0 2px 0 rgba(0,0,0,0.18);
          opacity: 0;
          transform: translateX(-24px);
          transition: opacity 0.35s ease, transform 0.35s ease;
        }
        .resume-list-tag.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card-wrap {
          position: relative;
          opacity: 0;
          transform: translateX(-48px);
          transition: opacity 0.4s ease, transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          pointer-events: all;
          cursor: pointer;
        }
        .resume-card-wrap.mounted {
          opacity: 1;
          transform: translateX(0);
        }

        .resume-card {
          position: relative;
          height: 112px;
          background: #10185f;
          clip-path: polygon(0 0, 97% 0, 100% 100%, 3% 100%);
          box-shadow: 0 8px 0 rgba(5, 13, 59, 0.85);
          transition: transform 0.22s ease, background 0.22s ease, box-shadow 0.22s ease;
          overflow: visible;
        }
        .resume-card-wrap.active .resume-card {
          background: #ffffff;
          box-shadow: 10px 8px 0 #d63232;
          transform: translateX(6px);
        }

        .resume-card-inner {
          position: absolute;
          inset: 0;
          padding: 14px 22px 14px 62px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .resume-badge {
          position: absolute;
          top: 10px;
          left: -10px;
          width: 56px;
          height: 70px;
          background: #0b113d;
          border: 3px solid #9cf7ff;
          clip-path: polygon(14% 0, 100% 0, 84% 100%, 0 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-8deg);
          box-shadow: 0 4px 0 rgba(0,0,0,0.28);
          transition: background 0.22s ease, border-color 0.22s ease;
        }
        .resume-badge-text {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #d2fdff;
          letter-spacing: 1px;
          transform: rotate(8deg);
        }
        .resume-card-wrap.active .resume-badge {
          background: #000;
          border-color: #000;
        }
        .resume-card-wrap.active .resume-badge-text {
          color: #fff;
        }

        .resume-title {
          font-family: 'Anton', sans-serif;
          font-size: 56px;
          line-height: 0.9;
          letter-spacing: 1px;
          color: #a5f6ff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-title {
          color: #000;
        }

        .resume-rank {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 2px;
          flex-shrink: 0;
        }
        .resume-rank-label {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 2px;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-rank-number {
          font-family: 'Anton', sans-serif;
          font-size: 70px;
          line-height: 0.82;
          color: #9ffbff;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-rank-label,
        .resume-card-wrap.active .resume-rank-number {
          color: #000;
        }

        .resume-subtitle-bar {
          position: absolute;
          left: 64px;
          right: 14px;
          bottom: 12px;
          height: 34px;
          background: #85f4ff;
          clip-path: polygon(0 0, 100% 0, calc(100% - 10px) 100%, 0 100%);
          display: flex;
          align-items: center;
          padding: 0 18px;
          transition: background 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle-bar {
          background: #000;
        }

        .resume-subtitle {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          line-height: 1;
          letter-spacing: 1px;
          color: #041238;
          transition: color 0.22s ease;
        }
        .resume-card-wrap.active .resume-subtitle {
          color: #fff;
        }

        .resume-detail-panel {
          position: absolute;
          top: 9.5vh;
          right: 4.5vw;
          width: min(35vw, 558px);
          min-height: 67vh;
          z-index: 12;
          padding: 20px 22px;
          background: linear-gradient(180deg, rgba(80, 50, 0, 0.96) 0%, rgba(40, 25, 0, 0.97) 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 18px) 100%, 0 100%);
          box-shadow:
            inset 0 0 0 1px rgba(255, 165, 0, 0.4),
            16px 16px 0 rgba(20, 10, 0, 0.55);
          overflow: hidden;
        }
        .resume-detail-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(135deg, rgba(255, 165, 0, 0.15) 0 15%, transparent 15% 100%),
            linear-gradient(180deg, rgba(255,255,255,0.05), transparent 24%);
          pointer-events: none;
        }
        .resume-detail-top {
          position: relative;
          display: grid;
          grid-template-columns: 70px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 92px;
          padding: 0 18px;
          background: linear-gradient(90deg, #FFA500 0%, #FFC04D 100%);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          color: #261800;
          box-shadow: 10px 0 0 rgba(200, 80, 0, 0.88);
        }
        .resume-detail-top-index {
          font-family: 'Anton', sans-serif;
          font-size: 46px;
          line-height: 1;
        }
        .resume-detail-top-title {
          font-family: 'Anton', sans-serif;
          font-size: 42px;
          line-height: 0.92;
          letter-spacing: 1px;
        }
        .resume-detail-top-progress {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 42px;
          letter-spacing: 2px;
          line-height: 1;
        }
        .resume-detail-list {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 18px;
        }
        .resume-detail-row {
          display: grid;
          grid-template-columns: 50px 1fr auto;
          align-items: center;
          gap: 14px;
          min-height: 56px;
          padding: 0 14px;
          background: rgba(90, 55, 0, 0.96);
          clip-path: polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255, 165, 0, 0.3);
          transition: transform 0.16s ease, background 0.16s ease;
        }
        .resume-detail-row:hover {
          transform: translateX(4px);
          background: rgba(120, 75, 0, 1);
        }
        .resume-detail-row-index {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 26px;
          letter-spacing: 1px;
          color: #FFC04D;
        }
        .resume-detail-row-title {
          font-family: 'Anton', sans-serif;
          font-size: 28px;
          line-height: 1;
          color: #FFF3E0;
        }
        .resume-detail-status {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 22px;
          line-height: 1;
          letter-spacing: 1.1px;
          color: #261800;
          background: #FFA500;
          padding: 7px 12px;
          clip-path: polygon(0 0, 100% 0, calc(100% - 8px) 100%, 0 100%);
        }
        .resume-detail-bottom {
          position: relative;
          margin-top: 22px;
          padding: 18px;
          background: rgba(50, 32, 0, 0.97);
          clip-path: polygon(0 0, 100% 0, calc(100% - 16px) 100%, 0 100%);
          box-shadow: inset 0 0 0 1px rgba(255, 165, 0, 0.3);
        }
        .resume-detail-bottom-title {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 30px;
          letter-spacing: 2px;
          color: #FFA500;
          margin-bottom: 14px;
        }
        .resume-detail-bullets {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .resume-detail-bullet {
          font-family: 'Anton', sans-serif;
          font-size: 21px;
          line-height: 1.15;
          color: #FFE6CC;
        }

        .resume-mobile-controls {
          display: none;
        }

        .resume-mobile-btn {
          border: 1px solid rgba(255, 255, 255, 0.28);
          background: rgba(6, 13, 55, 0.8);
          color: #fff;
          font-family: 'Bebas Neue', sans-serif;
          letter-spacing: 1.2px;
          font-size: 13px;
          padding: 7px 12px;
          border-radius: 8px;
          min-width: 84px;
        }

        @media (max-width: 768px) {
          .resume-mobile-controls {
            position: fixed;
            left: 8px;
            right: 8px;
            bottom: max(8px, env(safe-area-inset-bottom));
            z-index: 20;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            gap: 8px;
            pointer-events: all;
          }
        }

      `}</style>

      <div className="resume-overlay">
        <div className="resume-stack">
          <div className={`resume-list-tag${mounted ? " mounted" : ""}`}>LIST</div>
          {ITEMS.map((item, index) => (
            <div
              key={item.id}
              className={`resume-card-wrap${active === index ? " active" : ""}${mounted ? " mounted" : ""}`}
              style={{ transitionDelay: `${index * 55}ms` }}
              onMouseEnter={() => {
                setActive(index);
              }}
              onClick={() => {
                setActive(index);
                setOpened(index);
              }}
            >
              <div className="resume-card">
                <div className="resume-badge">
                  <div className="resume-badge-text">{item.badge}</div>
                </div>
                <div className="resume-card-inner">
                  <div className="resume-title">{item.title}</div>
                  <div className="resume-rank">
                    <div className="resume-rank-label">RANK</div>
                    <div className="resume-rank-number">{item.rank}</div>
                  </div>
                </div>
                <div className="resume-subtitle-bar">
                  <div className="resume-subtitle">{item.subtitle}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {(() => {
          if (opened === -1) return null;
          const currentIndex = active === -1 ? opened : active;
          const panel = DETAIL_PANELS[currentIndex];
          if (!panel) return null;
          return (
            <div className="resume-detail-panel">
              <div className="resume-detail-top">
                <div className="resume-detail-top-index">0{currentIndex + 1}</div>
                <div className="resume-detail-top-title">{panel.title}</div>
                <div className="resume-detail-top-progress">{panel.progress}</div>
              </div>

              <div className="resume-detail-list">
                {panel.rows.map((row) => (
                  <div className="resume-detail-row" key={row.index}>
                    <div className="resume-detail-row-index">{row.index}</div>
                    <div className="resume-detail-row-title">{row.title}</div>
                    <div className="resume-detail-status">{row.status}</div>
                  </div>
                ))}
              </div>

              <div className="resume-detail-bottom">
                <div className="resume-detail-bottom-title">DETAILS</div>
                <div className="resume-detail-bullets">
                  {panel.bullets.map((bullet, idx) => (
                    <div className="resume-detail-bullet" key={idx}>{bullet}</div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}

      </div>

      <div className="resume-mobile-controls" aria-label="Resume mobile controls">
        <button className="resume-mobile-btn" type="button" onClick={() => navigate(-1)}>
          BACK
        </button>
      </div>
    </div>
  );
}