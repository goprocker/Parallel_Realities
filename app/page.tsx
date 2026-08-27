'use client';
import { useState } from 'react';

export interface PageData {
  id: number;
  kicker: string;
  title: string;
  subtitle: string;
  kind: 'home' | 'intro' | 'upper' | 'article' | 'lower' | 'end';
  articleNumber?: string;
}

const pages: readonly PageData[] = [
  {
    id: 1,
    kicker: '01 · HERO PAGE',
    title: 'A Journey Written In Curves.',
    subtitle: 'Step into a visual notebook journey where every curve opens another chapter of ideas.',
    kind: 'home',
  },
  {
    id: 2,
    kicker: '02 · INTRODUCTION',
    title: 'A Few Notes Before We Begin.',
    subtitle: 'Follow the drawn lines. Pause at marked moments along the curve to reveal dedicated story notes. Use the wedge buttons above and below to navigate.',
    kind: 'intro',
  },
  {
    id: 3,
    kicker: '03 · UPPER CURVE',
    title: 'Follow The Rise.',
    subtitle: 'The Upper Curve (The Rise): How the rich goes up. Click the bottom box to go back, middle boxes for articles, or the top box to proceed to the next stage.',
    kind: 'upper',
  },
  {
    id: 4,
    kicker: '04 · UPPER ARTICLE (01)',
    title: 'Article Title Placeholder 01',
    subtitle: 'Your custom article content goes here. Easily add your story text, notes, and visual assets.',
    kind: 'article',
    articleNumber: '01',
  },
  {
    id: 5,
    kicker: '05 · UPPER ARTICLE (02)',
    title: 'Article Title Placeholder 02',
    subtitle: 'Your custom article content goes here. Continue writing your narrative before moving downward.',
    kind: 'article',
    articleNumber: '02',
  },
  {
    id: 6,
    kicker: '06 · LOWER CURVE',
    title: 'Follow The Descent.',
    subtitle: 'The Lower Curve (The Descent): How the poor goes down. Click the top box to go back to the upper curve, middle boxes for articles, or the bottom box to finish.',
    kind: 'lower',
  },
  {
    id: 7,
    kicker: '07 · LOWER ARTICLE',
    title: 'Article Title Placeholder 03',
    subtitle: 'Your custom article content from the descent. Insert your final analysis or article notes here.',
    kind: 'article',
    articleNumber: '03',
  },
  {
    id: 8,
    kicker: '08 · CLOSING NOTE',
    title: 'Until The Next Page.',
    subtitle: 'A final reflection and summary of the notebook journey. Ready to start from the beginning?',
    kind: 'end',
  },
] as const;

interface CurveProps {
  lower: boolean;
  onNavigate: (pageIndex: number) => void;
}

function Curve({ lower, onNavigate }: CurveProps) {
  const path = lower
    ? 'M 30 45 C 95 50, 125 175, 195 235 S 265 315, 325 315'
    : 'M 30 315 C 95 315, 125 190, 195 130 S 265 50, 325 45';

  const nodes = lower
    ? [
        { x: 65, y: 65, label: '01', target: 4, title: '← Before Page' },
        { x: 125, y: 165, label: '02', target: 6, title: 'Lower Article' },
        { x: 195, y: 235, label: '03', target: 6, title: 'Lower Article' },
        { x: 265, y: 295, label: '04', target: 6, title: 'Next Page →' },
      ]
    : [
        { x: 65, y: 295, label: '01', target: 1, title: '← Before Page' },
        { x: 125, y: 200, label: '02', target: 3, title: 'Upper Article 01' },
        { x: 195, y: 130, label: '03', target: 4, title: 'Upper Article 02' },
        { x: 265, y: 65, label: '04', target: 3, title: 'Next Page →' },
      ];


  return (
    <div className="curve-wrap" aria-label={lower ? 'Lower Curve: The Descent' : 'Upper Curve: The Rise'}>
      <div className="curve-canvas">
        <svg viewBox="0 0 350 365" className="curve-svg">
          <path d={path} className="curve-path-main" />
          <path d={path} className="curve-path-glow" />
          {nodes.map((n) => (
            <g key={n.label} className="curve-node-group">
              <circle cx={n.x} cy={n.y} r="18" className="curve-node-outer" />
              <circle cx={n.x} cy={n.y} r="6" className="curve-node-inner" />
            </g>
          ))}
        </svg>

        {/* Card Boxes along the smooth curve */}
        {nodes.map((node, i) => (
          <button
            key={i}
            className={`curve-card-node ${i === 0 ? 'node-prev' : i === 3 ? 'node-next' : 'node-article'}`}
            style={{
              left: `calc(${(node.x / 350) * 100}% - 26px)`,
              top: `calc(${(node.y / 365) * 100}% - 26px)`,
            }}
            onClick={() => onNavigate(node.target)}
            aria-label={`${node.title}`}
            title={node.title}
          >
            <span className="card-node-badge">{node.label}</span>
            <span className="card-node-icon" />
            <span className="card-node-tooltip">{node.title}</span>
          </button>
        ))}
      </div>
      <div className="curve-instruction">
        <span>{lower ? 'Descent Curve (Poor goes down) — Click boxes to navigate' : 'Rise Curve (Rich goes up) — Click boxes to navigate'}</span>
      </div>
    </div>
  );
}

export default function Home() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  const currentPage = pages[index];
  const { kicker, title, subtitle, kind, articleNumber } = currentPage;

  const go = (next: number) => {
    const target = (next + pages.length) % pages.length;
    setDirection(target > index ? 'forward' : 'back');
    setIndex(target);
  };

  const isCurve = kind === 'upper' || kind === 'lower';

  return (
    <main className="site-shell">
      <header className="site-header">
        <span className="brand-logo">FIELD NOTES</span>
        <span className="brand-tag">THE RISE & THE DESCENT</span>
        <span className="page-counter">{String(index + 1).padStart(2, '0')} / 08</span>
      </header>

      <section className={`plain-page ${direction} ${kind}`} key={index}>
        {/* Physical 3D Paper Leaf overlay flipping over the book surface */}
        <div className="paper-turn-leaf" aria-hidden="true">
          <div className="leaf-front" />
          <div className="leaf-back" />
        </div>

        {/* LEFT PANEL: Copy & Actions */}
        <div className="copy">
          <div className="number">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <i />
          </div>

          <p className="kicker">{kicker}</p>
          <h1>{title}</h1>
          <p className="description">{subtitle}</p>

          {/* Action buttons matching exact user instructions */}
          {kind === 'home' && (
            <button className="primary action-btn" onClick={() => go(1)}>
              Start journey →
            </button>
          )}

          {kind === 'intro' && (
            <div className="intro-actions">
              <button className="primary action-btn" onClick={() => go(2)}>
                Open Upper Curve (The Rise) →
              </button>
            </div>
          )}

          {kind === 'upper' && (
            <div className="curve-page-actions">
              <button className="outline btn-sm" onClick={() => go(1)}>
                ← Back to Intro
              </button>
              <button className="primary btn-sm" onClick={() => go(5)}>
                Go to Lower Curve →
              </button>
            </div>
          )}

          {/* Clean, spacious empty article placeholder for user content */}
          {kind === 'article' && (
            <div className="article-placeholder-container">
              <div className="placeholder-badge">EMPTY ARTICLE SLOT {articleNumber}</div>
              <div className="placeholder-content-box">
                <p className="placeholder-notice">
                  [ Your article text goes here. Add your custom narrative, observations, and detailed notes for Article {articleNumber}. ]
                </p>
                <div className="article-ruled-paper">
                  <i /><i /><i /><i />
                </div>
              </div>

              <div className="article-actions">
                <button className="outline btn-sm" onClick={() => go(index <= 4 ? 2 : 5)}>
                  ← Back to Curve
                </button>
                <button className="primary btn-sm" onClick={() => go(index + 1)}>
                  Next Page →
                </button>
              </div>
            </div>
          )}

          {kind === 'lower' && (
            <div className="curve-page-actions">
              <button className="outline btn-sm" onClick={() => go(2)}>
                ← Back to Upper Curve
              </button>
              <button className="primary btn-sm" onClick={() => go(7)}>
                Go to Closing Note →
              </button>
            </div>
          )}

          {kind === 'end' && (
            <div className="end-actions">
              <button className="primary action-btn" onClick={() => go(0)}>
                Restart journey ↺
              </button>
            </div>
          )}

          {/* Ruled Notebook Lines */}
          <div className="notebook-ruled-lines">
            <i />
            <i />
            <i />
          </div>

          {/* Navigation Dots */}
          <nav className="dots" aria-label="Page navigation">
            {pages.map((p, i) => (
              <button
                key={p.id}
                aria-label={`Go to page ${i + 1}`}
                onClick={() => {
                  setDirection(i > index ? 'forward' : 'back');
                  setIndex(i);
                }}
                className={i === index ? 'active' : ''}
              />
            ))}
          </nav>
        </div>

        {/* RIGHT PANEL: Visual & Controls */}
        <div className="visual">
          {isCurve ? (
            <Curve lower={kind === 'lower'} onNavigate={go} />
          ) : (
            <>
              {kind === 'article' ? (
                <div className="article-visual-card">
                  <div className="article-card-frame">
                    <div className="sketch-header">
                      <span className="sketch-badge">ARTICLE IMAGE / SKETCH SLOT</span>
                      <span className="sketch-id">ARTICLE {articleNumber}</span>
                    </div>
                    <div className="sketch-canvas placeholder-canvas">
                      <div className="canvas-crosshatch">
                        <span>+ Insert Visual / Graphic Here +</span>
                      </div>
                    </div>
                    <p className="sketch-caption">Visual asset placeholder for Article {articleNumber}.</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* Right Navigation Wedge SVG (Left-pointing chevron <) for Hero / Intro / End */}
                  <div className="nav-wedge">
                    <svg viewBox="0 0 400 660" preserveAspectRatio="none" className="wedge-svg">
                      <line x1="400" y1="2" x2="0" y2="2" stroke="var(--ink)" strokeWidth="2" />
                      <line x1="400" y1="658" x2="0" y2="658" stroke="var(--ink)" strokeWidth="2" />
                      <path d="M400 0 L0 330 L400 660" fill="none" stroke="var(--ink)" strokeWidth="2" />
                    </svg>
                  </div>
                </>
              )}

              {/* Controls: Left-side button positioning for Pages 1, 2, and 8 (Hero, Intro, End) */}
              {kind === 'home' || kind === 'intro' || kind === 'end' ? (
                <div className="controls wedge-split-controls intro-left-controls">
                  <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                    ▲
                  </button>
                  <button className="ctrl-down" onClick={() => go(index + 1)} aria-label="Next page" title="Next page (▼)">
                    ▼
                  </button>
                </div>
              ) : (
                <div className="controls wedge-split-controls">
                  <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                    ▲
                  </button>
                  <button className="ctrl-down" onClick={() => go(index + 1)} aria-label="Next page" title="Next page (▼)">
                    ▼
                  </button>
                </div>
              )}


            </>
          )}
        </div>

      </section>

      <p className="hint">
        {index === 1
          ? 'Use the UP (▲) button in the top angle and DOWN (▼) button in the bottom angle of the wedge to navigate.'
          : 'Interactive curve boxes open article slots or navigate between curves.'}
      </p>
    </main>
  );
}
