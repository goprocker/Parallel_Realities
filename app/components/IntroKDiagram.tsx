'use client';
import { useState } from 'react';

interface IntroKDiagramProps {
  onNavigate: (index: number) => void;
}

export default function IntroKDiagram({ onNavigate }: IntroKDiagramProps) {
  const [hoveredBranch, setHoveredBranch] = useState<'upper' | 'lower' | null>(null);

  const upperMilestones = [
    { label: '01 · Opportunity', dotX: 160, dotY: 241, textX: 160, textY: 224 },
    { label: '02 · Education & Jobs', dotX: 275, dotY: 169, textX: 275, textY: 152 },
    { label: '03 · Security & Choice', dotX: 390, dotY: 98, textX: 390, textY: 81 },
  ];

  const lowerMilestones = [
    { label: '01 · Limited Access', dotX: 160, dotY: 379, textX: 160, textY: 400 },
    { label: '02 · Unstable Work', dotX: 275, dotY: 451, textX: 275, textY: 472 },
    { label: '03 · Debt & Fewer Choices', dotX: 390, dotY: 522, textX: 390, textY: 543 },
  ];

  return (
    <div className="intro-k-diagram-wrapper">
      <svg
        viewBox="0 0 500 620"
        className="intro-k-svg"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Subtle Top & Bottom Reference Grid Lines */}
        <line x1="30" y1="20" x2="480" y2="20" stroke="rgba(26, 24, 22, 0.15)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="30" y1="600" x2="480" y2="600" stroke="rgba(26, 24, 22, 0.15)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Hover / Click Detection Hit-Boxes */}
        <polygon
          points="40,310 480,20 480,310 40,310"
          className="branch-hit-area"
          onMouseEnter={() => setHoveredBranch('upper')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onNavigate(2)}
          aria-label="Navigate to Upper Curve"
        />
        <polygon
          points="40,310 480,310 480,600 40,310"
          className="branch-hit-area"
          onMouseEnter={() => setHoveredBranch('lower')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onNavigate(5)}
          aria-label="Navigate to Lower Curve"
        />

        {/* ================= UPPER BRANCH ================= */}
        <g
          className={`branch-group upper-branch ${hoveredBranch === 'lower' ? 'is-dimmed' : ''} ${
            hoveredBranch === 'upper' ? 'is-active' : ''
          }`}
          onMouseEnter={() => setHoveredBranch('upper')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onNavigate(2)}
        >
          {/* Main Upper Trajectory Line */}
          <line
            x1="45"
            y1="310"
            x2="465"
            y2="48"
            className="k-trajectory-line upper-line"
            stroke={hoveredBranch === 'upper' ? '#801b1b' : '#221c17'}
            strokeWidth={hoveredBranch === 'upper' ? 3 : 1.75}
          />

          {/* Sequential Trajectory Milestones */}
          {upperMilestones.map((m, i) => (
            <g key={i} className="annotation-milestone">
              {/* Leader guide tick */}
              <line
                x1={m.dotX}
                y1={m.dotY}
                x2={m.textX}
                y2={m.textY + 4}
                stroke={hoveredBranch === 'upper' ? '#801b1b' : 'rgba(26, 24, 22, 0.2)'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Milestone Dot */}
              <circle
                cx={m.dotX}
                cy={m.dotY}
                r={hoveredBranch === 'upper' ? 4 : 2.75}
                className="milestone-dot"
                fill={hoveredBranch === 'upper' ? '#801b1b' : '#2e261f'}
                stroke="#fbf9f4"
                strokeWidth="1.5"
              />
              {/* Milestone Text */}
              <text
                x={m.textX}
                y={m.textY}
                textAnchor="middle"
                className="milestone-text upper-milestone-text"
                fill={hoveredBranch === 'upper' ? '#801b1b' : '#453d33'}
              >
                {m.label}
              </text>
            </g>
          ))}

          {/* Upper Right Endpoint Callout */}
          <g className="branch-endpoint-callout upper-callout">
            <text x="475" y="28" textAnchor="end" className="endpoint-title">
              THE UPPER CURVE ↗
            </text>
            <text x="475" y="42" textAnchor="end" className="endpoint-desc">
              More resources create more room to choose.
            </text>

            {hoveredBranch === 'upper' && (
              <g className="explore-indicator-badge">
                <rect x="330" y="50" width="145" height="22" rx="3" fill="#801b1b" />
                <text x="402" y="65" textAnchor="middle" fill="#fbf9f4" className="badge-text">
                  Explore Upper Curve →
                </text>
              </g>
            )}
          </g>
        </g>

        {/* ================= LOWER BRANCH ================= */}
        <g
          className={`branch-group lower-branch ${hoveredBranch === 'upper' ? 'is-dimmed' : ''} ${
            hoveredBranch === 'lower' ? 'is-active' : ''
          }`}
          onMouseEnter={() => setHoveredBranch('lower')}
          onMouseLeave={() => setHoveredBranch(null)}
          onClick={() => onNavigate(5)}
        >
          {/* Main Lower Trajectory Line */}
          <line
            x1="45"
            y1="310"
            x2="465"
            y2="572"
            className="k-trajectory-line lower-line"
            stroke={hoveredBranch === 'lower' ? '#801b1b' : '#221c17'}
            strokeWidth={hoveredBranch === 'lower' ? 3 : 1.75}
          />

          {/* Sequential Trajectory Milestones */}
          {lowerMilestones.map((m, i) => (
            <g key={i} className="annotation-milestone">
              {/* Leader guide tick */}
              <line
                x1={m.dotX}
                y1={m.dotY}
                x2={m.textX}
                y2={m.textY - 11}
                stroke={hoveredBranch === 'lower' ? '#801b1b' : 'rgba(26, 24, 22, 0.2)'}
                strokeWidth="1"
                strokeDasharray="2 2"
              />
              {/* Milestone Dot */}
              <circle
                cx={m.dotX}
                cy={m.dotY}
                r={hoveredBranch === 'lower' ? 4 : 2.75}
                className="milestone-dot"
                fill={hoveredBranch === 'lower' ? '#801b1b' : '#2e261f'}
                stroke="#fbf9f4"
                strokeWidth="1.5"
              />
              {/* Milestone Text */}
              <text
                x={m.textX}
                y={m.textY}
                textAnchor="middle"
                className="milestone-text lower-milestone-text"
                fill={hoveredBranch === 'lower' ? '#801b1b' : '#453d33'}
              >
                {m.label}
              </text>
            </g>
          ))}

          {/* Lower Right Endpoint Callout */}
          <g className="branch-endpoint-callout lower-callout">
            <text x="475" y="582" textAnchor="end" className="endpoint-title">
              THE LOWER CURVE ↘
            </text>
            <text x="475" y="596" textAnchor="end" className="endpoint-desc">
              Less security makes each setback harder to absorb.
            </text>

            {hoveredBranch === 'lower' && (
              <g className="explore-indicator-badge">
                <rect x="330" y="546" width="145" height="22" rx="3" fill="#801b1b" />
                <text x="402" y="561" textAnchor="middle" fill="#fbf9f4" className="badge-text">
                  Explore Lower Curve →
                </text>
              </g>
            )}
          </g>
        </g>

        {/* ================= INTERSECTION APEX ================= */}
        <g className="intersection-origin-group">
          {/* Concentric Apex Marker */}
          <circle cx="45" cy="310" r="4.5" fill="#1c1815" stroke="#fbf9f4" strokeWidth="1.5" />
          <circle cx="45" cy="310" r="8.5" fill="none" stroke="rgba(128, 27, 27, 0.45)" strokeWidth="1" />
          
          <g className="intersection-annotation">
            <text x="62" y="305" className="society-heading">
              SAME SOCIETY
            </text>
            <text x="62" y="320" className="society-sub">
              Different trajectories.
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
}
