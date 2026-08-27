'use client';
import { useState } from 'react';

interface IntroKDiagramProps {
  onNavigate: (index: number) => void;
}

export default function IntroKDiagram({ onNavigate }: IntroKDiagramProps) {
  const [hoveredBranch, setHoveredBranch] = useState<'upper' | 'lower' | null>(null);

  const upperMilestones = [
    {
      badge: '01 · OPPORTUNITY',
      title: 'Family Cushion & Time',
      desc: 'Room to explore careers without survival pressure',
      dotX: 160,
      dotY: 238,
      cardX: 90,
      cardY: 140,
    },
    {
      badge: '02 · CALCULATED RISK',
      title: 'Freedom to Fail',
      desc: 'Setbacks become lessons rather than disasters',
      dotX: 285,
      dotY: 132,
      cardX: 215,
      cardY: 42,
    },
    {
      badge: '03 · COMPOUNDING',
      title: 'Security & Choice',
      desc: 'Capital and networks multiply over time',
      dotX: 410,
      dotY: 74,
      cardX: 340,
      cardY: 8,
    },
  ];

  const lowerMilestones = [
    {
      badge: '01 · VULNERABILITY',
      title: 'Immediate Necessity',
      desc: 'Every decision must answer: will this pay today?',
      dotX: 160,
      dotY: 382,
      cardX: 90,
      cardY: 430,
    },
    {
      badge: '02 · UNSTABLE WORK',
      title: 'No Room to Fall',
      desc: 'A single illness or job disruption leads to debt',
      dotX: 285,
      dotY: 488,
      cardX: 215,
      cardY: 532,
    },
    {
      badge: '03 · THE POVERTY LOOP',
      title: 'Fewer Choices',
      desc: 'High borrowing costs make saving impossible',
      dotX: 410,
      dotY: 546,
      cardX: 340,
      cardY: 575,
    },
  ];

  const upperPath = 'M 50 310 C 120 310, 180 200, 285 132 C 340 96, 385 75, 475 62';
  const lowerPath = 'M 50 310 C 120 310, 180 420, 285 488 C 340 524, 385 545, 475 558';

  return (
    <div className="intro-k-diagram-container">
      <div className="diagram-top-bar">
        <span className="diagram-kicker">INFOGRAPHIC · THE K-CURVE MODEL</span>
        <span className="diagram-hint">HOVER OR CLICK TO EXPLORE TRAJECTORIES</span>
      </div>

      <svg
        viewBox="0 0 520 640"
        className="intro-k-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          {/* Subtle Grid Pattern */}
          <pattern id="archGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="40" y2="0" stroke="rgba(26, 24, 22, 0.04)" strokeWidth="1" />
            <line x1="0" y1="0" x2="0" y2="40" stroke="rgba(26, 24, 22, 0.04)" strokeWidth="1" />
          </pattern>

          {/* Gradients */}
          <linearGradient id="upperGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1c1815" />
            <stop offset="60%" stopColor="#801b1b" />
            <stop offset="100%" stopColor="#b32424" />
          </linearGradient>

          <linearGradient id="lowerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1c1815" />
            <stop offset="60%" stopColor="#4a3f35" />
            <stop offset="100%" stopColor="#2b241e" />
          </linearGradient>
        </defs>

        {/* Background Grid */}
        <rect x="20" y="20" width="480" height="600" fill="url(#archGrid)" rx="6" />

        {/* Horizontal Neutral Baseline */}
        <line x1="30" y1="310" x2="490" y2="310" stroke="rgba(26, 24, 22, 0.12)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Vertical Stage Guidelines */}
        <line x1="160" y1="40" x2="160" y2="600" stroke="rgba(26, 24, 22, 0.06)" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="285" y1="40" x2="285" y2="600" stroke="rgba(26, 24, 22, 0.06)" strokeWidth="1" strokeDasharray="2 4" />
        <line x1="410" y1="40" x2="410" y2="600" stroke="rgba(26, 24, 22, 0.06)" strokeWidth="1" strokeDasharray="2 4" />

        {/* ================= UPPER BRANCH ================= */}
        <g
          className={`diagram-branch upper-branch ${hoveredBranch === 'lower' ? 'is-dimmed' : ''} ${
            hoveredBranch === 'upper' ? 'is-active' : ''
          }`}
          onMouseEnter={() => setHoveredBranch('upper')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onNavigate(2)}
          style={{ cursor: 'pointer' }}
        >
          {/* Broad Transparent Hit Area */}
          <path d={upperPath} fill="none" stroke="transparent" strokeWidth="48" />

          {/* Glow Behind Curve */}
          <path
            d={upperPath}
            fill="none"
            stroke={hoveredBranch === 'upper' ? 'rgba(128, 27, 27, 0.25)' : 'rgba(201, 168, 106, 0.15)'}
            strokeWidth={hoveredBranch === 'upper' ? '8' : '4'}
            strokeLinecap="round"
          />

          {/* Main Upper Trajectory Curve */}
          <path
            d={upperPath}
            fill="none"
            stroke={hoveredBranch === 'upper' ? 'url(#upperGrad)' : '#241e19'}
            strokeWidth={hoveredBranch === 'upper' ? '3' : '2'}
            strokeLinecap="round"
          />

          {/* Upper Milestone Leader Ticks & Dots */}
          {upperMilestones.map((m, i) => (
            <g key={i} className="diagram-milestone-group">
              {/* Leader tick */}
              <line
                x1={m.dotX}
                y1={m.dotY}
                x2={m.dotX}
                y2={m.cardY + 36}
                stroke={hoveredBranch === 'upper' ? '#801b1b' : 'rgba(26, 24, 22, 0.22)'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Node Circle */}
              <circle
                cx={m.dotX}
                cy={m.dotY}
                r={hoveredBranch === 'upper' ? '5.5' : '4'}
                fill={hoveredBranch === 'upper' ? '#801b1b' : '#fbf9f4'}
                stroke={hoveredBranch === 'upper' ? '#fff' : '#1c1815'}
                strokeWidth="2"
              />

              {/* Milestone Card Box */}
              <g className="milestone-card-box" transform={`translate(${m.cardX}, ${m.cardY})`}>
                <rect
                  x="0"
                  y="0"
                  width="135"
                  height="34"
                  rx="4"
                  fill="#ffffff"
                  stroke={hoveredBranch === 'upper' ? '#801b1b' : '#ded5c2'}
                  strokeWidth="1"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.06))"
                />
                <text x="8" y="13" className="card-badge" fill="#801b1b">
                  {m.badge}
                </text>
                <text x="8" y="26" className="card-title" fill="#1c1815">
                  {m.title}
                </text>
              </g>
            </g>
          ))}

          {/* Upper Trajectory Endpoint Title */}
          <g className="endpoint-callout upper-end" transform="translate(480, 52)">
            <text x="0" y="0" textAnchor="end" className="end-badge" fill="#801b1b">
              THE UPPER CURVE ↗
            </text>
            <text x="0" y="14" textAnchor="end" className="end-sub" fill="#544c41">
              Resources multiply optionality
            </text>
          </g>
        </g>

        {/* ================= LOWER BRANCH ================= */}
        <g
          className={`diagram-branch lower-branch ${hoveredBranch === 'upper' ? 'is-dimmed' : ''} ${
            hoveredBranch === 'lower' ? 'is-active' : ''
          }`}
          onMouseEnter={() => setHoveredBranch('lower')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onNavigate(5)}
          style={{ cursor: 'pointer' }}
        >
          {/* Broad Transparent Hit Area */}
          <path d={lowerPath} fill="none" stroke="transparent" strokeWidth="48" />

          {/* Glow Behind Curve */}
          <path
            d={lowerPath}
            fill="none"
            stroke={hoveredBranch === 'lower' ? 'rgba(128, 27, 27, 0.25)' : 'rgba(201, 168, 106, 0.15)'}
            strokeWidth={hoveredBranch === 'lower' ? '8' : '4'}
            strokeLinecap="round"
          />

          {/* Main Lower Trajectory Curve */}
          <path
            d={lowerPath}
            fill="none"
            stroke={hoveredBranch === 'lower' ? 'url(#upperGrad)' : '#241e19'}
            strokeWidth={hoveredBranch === 'lower' ? '3' : '2'}
            strokeLinecap="round"
          />

          {/* Lower Milestone Leader Ticks & Dots */}
          {lowerMilestones.map((m, i) => (
            <g key={i} className="diagram-milestone-group">
              {/* Leader tick */}
              <line
                x1={m.dotX}
                y1={m.dotY}
                x2={m.dotX}
                y2={m.cardY}
                stroke={hoveredBranch === 'lower' ? '#801b1b' : 'rgba(26, 24, 22, 0.22)'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />

              {/* Node Circle */}
              <circle
                cx={m.dotX}
                cy={m.dotY}
                r={hoveredBranch === 'lower' ? '5.5' : '4'}
                fill={hoveredBranch === 'lower' ? '#801b1b' : '#fbf9f4'}
                stroke={hoveredBranch === 'lower' ? '#fff' : '#1c1815'}
                strokeWidth="2"
              />

              {/* Milestone Card Box */}
              <g className="milestone-card-box" transform={`translate(${m.cardX}, ${m.cardY})`}>
                <rect
                  x="0"
                  y="0"
                  width="135"
                  height="34"
                  rx="4"
                  fill="#ffffff"
                  stroke={hoveredBranch === 'lower' ? '#801b1b' : '#ded5c2'}
                  strokeWidth="1"
                  filter="drop-shadow(0 2px 5px rgba(0,0,0,0.06))"
                />
                <text x="8" y="13" className="card-badge" fill="#801b1b">
                  {m.badge}
                </text>
                <text x="8" y="26" className="card-title" fill="#1c1815">
                  {m.title}
                </text>
              </g>
            </g>
          ))}

          {/* Lower Trajectory Endpoint Title */}
          <g className="endpoint-callout lower-end" transform="translate(480, 568)">
            <text x="0" y="0" textAnchor="end" className="end-badge" fill="#801b1b">
              THE LOWER CURVE ↘
            </text>
            <text x="0" y="14" textAnchor="end" className="end-sub" fill="#544c41">
              Scarcity removes the safety net
            </text>
          </g>
        </g>

        {/* ================= INTERSECTION ORIGIN ================= */}
        <g className="intersection-origin" transform="translate(50, 310)">
          {/* Target rings */}
          <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(128, 27, 27, 0.25)" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="0" cy="0" r="8" fill="#fbf9f4" stroke="#801b1b" strokeWidth="2" />
          <circle cx="0" cy="0" r="3.5" fill="#801b1b" />

          {/* Origin Annotation Callout */}
          <g transform="translate(20, -18)">
            <rect x="0" y="0" width="118" height="34" rx="4" fill="#1c1815" />
            <text x="8" y="14" fill="#c9a86a" className="origin-badge">
              STARTING POINT
            </text>
            <text x="8" y="26" fill="#f7f3ea" className="origin-title">
              Same City, Same Effort
            </text>
          </g>
        </g>
      </svg>

      {/* Bottom Exploration Prompts */}
      <div className="diagram-footer-strip">
        <button className="footer-branch-btn upper" onClick={() => onNavigate(2)}>
          <span className="btn-dot upper" />
          <span className="btn-txt">Upper Curve (The Rise)</span>
          <span className="btn-arr">↗</span>
        </button>
        <button className="footer-branch-btn lower" onClick={() => onNavigate(5)}>
          <span className="btn-dot lower" />
          <span className="btn-txt">Lower Curve (The Descent)</span>
          <span className="btn-arr">↘</span>
        </button>
      </div>
    </div>
  );
}
