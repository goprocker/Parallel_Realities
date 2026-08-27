'use client';
import { useState, useEffect, useRef } from 'react';
import CloudShaderBackground from './components/CloudShaderBackground';
import CustomCursor from './components/CustomCursor';
import IntroKDiagram from './components/IntroKDiagram';
import { ambientSound } from './utils/ambientAudio';

export interface ArticleContent {
  paragraphs: string[];
  quote?: string;
  image?: string;
  imageCaption?: string;
  imageBadge?: string;
  imagePosition?: 'left' | 'right';
}

export interface PageData {
  id: number;
  kicker: string;
  title: string;
  subtitle: string;
  kind: 'home' | 'intro' | 'upper' | 'article' | 'lower' | 'print_spread_1' | 'print_spread_2' | 'end';
  articleNumber?: string;
  articleData?: ArticleContent;
}

const pages: readonly PageData[] = [
  {
    id: 1,
    kicker: '01 / THE K-SHAPED DIVIDE',
    title: 'A Journey\nWritten in Curves.',
    subtitle: '',
    kind: 'home',
  },
  {
    id: 2,
    kicker: '02 · INTRODUCTION · RICH VS POOR',
    title: 'A Few Notes Before We Begin.',
    subtitle: '',
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
    kicker: '04 · CASE 01: FREEDOM TO CHOOSE',
    title: 'Case 1: Freedom To Choose',
    subtitle: 'What happens when your career does not have to begin with survival?',
    kind: 'article',
    articleNumber: '01',
    articleData: {
      image: '/pics/abhimanyu.png',
      imageBadge: 'ARTICLE 01 · ABHIMANYU',
      imageCaption: 'Abhimanyu at his drawing desk, building made-up worlds through storytelling and illustration.',
      imagePosition: 'left',
      quote: 'Perhaps this is one of the quieter ways that inequality grows. Wealth does not give you more things to buy. It can give you choices, more time and more chances to fail without collapsing.',
      paragraphs: [
        'When I first met Abhimanyu, what caught my eye was the way he played games. For him games are more than fun. They can be a way to build made‑up worlds to look at ideas and to make sense of the world. His work shifts between storytelling, drawing, animation, comics and game design and he now brings that style into his classes at Srishti.',
        'What fascinated me was not what Abhimanyu does. It was the freedom that lies behind every choice. Abhimanyu has built a career around the things he truly wishes to explore. He can experiment, create, teach and chase ideas without every decision needing to ask: Will this pay enough to live?',
        'That freedom is easy to miss because it does not always look like money. It can look like time, education, family help, steady income or simply having space to take a risk. The power to try something to fail to change course and to try again is itself a kind of privilege.',
        'This does not make Abhimanyu a villain. Does it mean Abhimanyu’s work came without effort. Abhimanyu’s career is the result of Abhimanyu’s talent, choices and many years of work. The point is different: two people can share the ambition but have very different freedom to pursue it. One person may be able to take a risk on a dream; another may have to pick the job because someone, at home depends on their next paycheck.',
        'The difference is not always who works harder. Sometimes it is how room there is to choose what comes next.',
        'Maybe privilege is not always having more. Sometimes it is simply being able to choose.'
      ]
    }
  },
  {
    id: 5,
    kicker: '05 · CASE 02: CAN AFFORD TO FAIL',
    title: 'Case 2: Some people can afford to fail.',
    subtitle: 'Taking a risk requires something that isn\'t equally available to everyone — the ability to survive failure.',
    kind: 'article',
    articleNumber: '02',
    articleData: {
      image: '/pics/brikoven.png',
      imageBadge: 'ARTICLE 02 · BRIK OVEN',
      imageCaption: 'Risk & Consequences: Brik Oven storefront & wood-fired oven.',
      imagePosition: 'left',
      quote: 'Money doesn\'t only buy things; it can buy time, safety and the freedom to try again. And when one person can take more chances than another, they may also have more chances to succeed.',
      paragraphs: [
        'We often talk about success as if everyone reaches it through the same formula: work hard, take risks and keep trying. But taking a risk requires something that isn\'t equally available to everyone — the ability to survive failure.',
        'For someone with financial security, quitting a job to start a business, investing money, moving to a new city or spending years building a career can be a calculated risk. If it doesn\'t work, there may still be a home to return to, savings to fall back on, or family support to soften the loss. Failure can become a setback rather than a disaster.',
        'For someone living from one paycheck to the next, the same decision can have very different consequences. Quitting a stable job might mean losing the money needed for rent, food or a family\'s education. Starting a business may require capital they cannot afford to lose. The risk isn\'t necessarily bigger — the consequences of failure are.',
        'This is one of the quieter ways wealth can reproduce itself. Money doesn\'t only buy things; it can buy time, safety and the freedom to try again. And when one person can take more chances than another, they may also have more chances to succeed.',
        'The question isn\'t who is willing to take the risk. It\'s who can afford to lose.'
      ]
    }
  },
  {
    id: 6,
    kicker: '06 · LOWER CURVE',
    title: 'Follow The Descent.',
    subtitle: 'The Lower Curve (The Descent): How the poor goes down. Click the top box to go back to the upper curve, middle boxes for articles, or the bottom box to see the print edition.',
    kind: 'lower',
  },
  {
    id: 7,
    kicker: '07 · DESCENT CASE 01: CHURCH STREET',
    title: 'Case 1: Kid Labour from chruch street',
    subtitle: 'Why does one child selling something become an example of entrepreneurship, while another becomes an example of poverty?',
    kind: 'article',
    articleNumber: '03',
    articleData: {
      image: '/pics/churchstreet.jpg',
      imageBadge: 'ARTICLE 03 · CHURCH STREET',
      imageCaption: 'Street vending on Church Street: Perception, survival, and the visibility of poverty.',
      imagePosition: 'left',
      quote: 'If society is more willing to support someone when their poverty is hidden behind the language of entrepreneurship while becoming uncomfortable when poverty is directly visible, then the problem goes beyond one street or one seller.',
      paragraphs: [
        'On a stretch of Church Street two very different kinds of sellers can often be found trying to do the same thing: sell something to people passing. Yet the way customers respond to them can feel remarkably different. During my visit to Church Street I noticed customers stopping to look at products being sold by students, while paying less attention to children selling flowers on the street.',
        'At first the difference seems to be about the product... Looking closer it appeared to be more about who was selling it and how the act of selling was perceived. Students selling their handmade work can easily be seen as entrepreneurs. Their products are presented as something they have created. Buying from them can feel like supporting someone\'s creativity or small business. The interaction feels voluntary.',
        'The situation feels very different when a child is selling flowers as a means of earning money. The same act of selling is no longer necessarily perceived as entrepreneurship. Instead the child becomes associated with poverty, labour and vulnerability. Customers may feel hesitant buying from them, particularly when they suspect that the child is working because their family depends on the income.',
        'This creates a contradiction. Why does one child selling something become an example of entrepreneurship, while another becomes an example of poverty? The difference may not be the ability of the seller or even the value of what they are selling. It can be the circumstances behind the sale and the way those circumstances are visible to the customer.',
        'Appearance plays a role too. A well-dressed student carrying handmade products can fit easily into the image of a young entrepreneur. A child working on the street can immediately signal a different social position. Before the customer has even asked their story, assumptions may already have been made.',
        'There is another side to this. Perhaps customers are not simply rejecting children. Some may deliberately avoid buying from children because they believe that doing so encourages child labour. Others may feel that giving money to a child is closer to charity than purchasing a product. The question therefore is not as simple as whether people are willing to help or not. What matters is how we decide whom we are helping.',
        'On the street selling can represent creativity, entrepreneurship and independence for one person, while representing survival and necessity for another. The product may be similar... the story behind the seller changes how we see the transaction.',
        'Perhaps the real difference isn\'t what they are selling. Perhaps it is what we see when we look at the person selling it.'
      ]
    }
  },
  {
    id: 8,
    kicker: '08 · DESCENT CASE 02: THE POVERTY LOOP',
    title: 'Case Study 2: The Poverty Loop',
    subtitle: 'When help is there. You cannot wait to survive.',
    kind: 'article',
    articleNumber: '04',
    articleData: {
      image: '/pics/povertyloop.png',
      imageBadge: 'ARTICLE 04 · POVERTY LOOP',
      imageCaption: 'Panchayat & welfare execution: The gap between policy availability and daily survival.',
      imagePosition: 'left',
      quote: 'Sometimes poverty is not about not having a ladder to climb. It is about having no safety net while you try to climb that ladder.',
      paragraphs: [
        'Many people think poverty is about not having enough money... I think the real issue is not having a safety net to catch you. Karnataka has welfare schemes to help families who are struggling. Gruha Lakshmi for example gives ₹2,000 a month to women who lead their households. Anna Bhagya also gives food to families who qualify. These welfare schemes can really help people. However many reports show that payments are often late and food distribution can be messy.',
        'When a family has nothing even a tiny mistake can cause a huge disaster. If a Gruha Lakshmi payment is late a person might have to borrow money just to buy groceries. If Anna Bhagya food does not arrive they might have to pay higher prices at a shop. Even losing work for a few days can lead to debt.',
        'What starts as a trouble turns into a new cost. This new cost creates a problem. This is how the cycle works: low income leads to no savings, which leads to costs, which leads to borrowing, which leads to debt, which makes it even harder to save.',
        'I am not saying that government schemes do not work. I am also not saying that the people in charge do not care. Actually research shows that Karnataka\'s welfare programmes have truly helped families. The real trouble is the gap between having help available and being able to count on that help when things go wrong.',
        'If you have money in the bank a small problem is easy to fix... If you are already struggling there is no room to fall. Sometimes poverty is not about not having a ladder to climb. It is about having no safety net while you try to climb that ladder.'
      ]
    }
  },
  {
    id: 9,
    kicker: '09 · PRINT EDITION · BROADSHEET SPREAD 1',
    title: 'SMI Newspaper: Untold Stories & The Upper K',
    subtitle: 'Issue No. 777 (2026) · Left Page: Untold Stories · Right Page: The Upper K',
    kind: 'print_spread_1',
  },
  {
    id: 10,
    kicker: '10 · PRINT EDITION & EPILOGUE',
    title: 'The Lower K & Final Reflection',
    subtitle: 'Issue No. 777 (2026) · Left Page: The Lower K · Right Page: Until The Next Page',
    kind: 'print_spread_2',
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
        { x: 65, y: 65, label: '01', target: 2, title: '← Upper Curve' },
        { x: 125, y: 165, label: '02', target: 6, title: 'Kid Labour on Church Street' },
        { x: 195, y: 235, label: '03', target: 7, title: 'Case Study 2: The Poverty Loop' },
        { x: 265, y: 295, label: '04', target: 8, title: 'Print Edition (Broadsheet) →' },
      ]
    : [
        { x: 65, y: 295, label: '01', target: 1, title: '← Before Page' },
        { x: 125, y: 200, label: '02', target: 3, title: 'Case 1: Freedom To Choose' },
        { x: 195, y: 130, label: '03', target: 4, title: 'Case 2: Can Afford To Fail' },
        { x: 265, y: 65, label: '04', target: 5, title: 'Lower Curve →' },
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

  // Web Audio API Gentle Ambient Music Synthesizer
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);

  const openBook = () => {
    if (isOpening) return;
    setIsOpening(true);
    setTimeout(() => {
      setIsBookOpen(true);
      setIsOpening(false);
      setIndex(0);
    }, 700);
  };

  const closeBook = () => {
    setIsBookOpen(false);
    setIsOpening(false);
  };

  const startAmbientMusic = () => {
    const success = ambientSound.start();
    if (success) {
      setIsPlayingAudio(true);
    }
  };

  const stopAmbientMusic = () => {
    ambientSound.stop();
    setIsPlayingAudio(false);
  };

  const toggleSound = () => {
    if (isPlayingAudio) {
      stopAmbientMusic();
    } else {
      startAmbientMusic();
    }
  };

  const currIndexRef = useRef(index);
  useEffect(() => {
    currIndexRef.current = index;
  }, [index]);

  const currentPage = pages[index];
  const { kicker, title, subtitle, kind, articleNumber, articleData } = currentPage;

  const go = (next: number) => {
    // Clamp to valid range [0, pages.length - 1]
    const target = Math.max(0, Math.min(next, pages.length - 1));
    if (target === currIndexRef.current) return;
    setDirection(target > currIndexRef.current ? 'forward' : 'back');
    setIndex(target);
  };

  // Scroll & Touch driven page turn logic with debouncing
  useEffect(() => {
    let isCoolingDown = false;
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      // If book is not open, scrolling down opens the book!
      if (!isBookOpen) {
        if (e.deltaY > 20) {
          openBook();
        }
        return;
      }

      // Check if user is scrolling inside an article reader container
      const readerEl = (e.target as HTMLElement)?.closest('.article-reader-content');
      if (readerEl) {
        const { scrollTop, scrollHeight, clientHeight } = readerEl as HTMLElement;
        const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2;
        const isAtTop = scrollTop <= 2;

        // Only trigger page turn if scrolling DOWN at the bottom OR scrolling UP at the top
        if (e.deltaY > 0 && !isAtBottom) return;
        if (e.deltaY < 0 && !isAtTop) return;
      }

      if (isCoolingDown || Math.abs(e.deltaY) < 18) return;

      if (e.deltaY > 0) {
        // Strictly stop at last page (Page 10 / index 9) — Never loop back!
        if (currIndexRef.current >= pages.length - 1) {
          return;
        }
        isCoolingDown = true;
        setDirection('forward');
        setIndex((prev) => Math.min(prev + 1, pages.length - 1));
        setTimeout(() => {
          isCoolingDown = false;
        }, 700);
      } else if (e.deltaY < 0) {
        // Strictly stop at first page (Page 1 / index 0)
        if (currIndexRef.current <= 0) {
          return;
        }
        isCoolingDown = true;
        setDirection('back');
        setIndex((prev) => Math.max(prev - 1, 0));
        setTimeout(() => {
          isCoolingDown = false;
        }, 700);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isBookOpen) {
        const touchEndY = e.changedTouches[0].clientY;
        if (touchStartY - touchEndY > 40) {
          openBook();
        }
        return;
      }

      if (isCoolingDown) return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          // Strictly stop at last page on swipe up
          if (currIndexRef.current >= pages.length - 1) return;
          isCoolingDown = true;
          setDirection('forward');
          setIndex((prev) => Math.min(prev + 1, pages.length - 1));
          setTimeout(() => {
            isCoolingDown = false;
          }, 700);
        } else {
          // Strictly stop at first page on swipe down
          if (currIndexRef.current <= 0) return;
          isCoolingDown = true;
          setDirection('back');
          setIndex((prev) => Math.max(prev - 1, 0));
          setTimeout(() => {
            isCoolingDown = false;
          }, 700);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isBookOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault();
          openBook();
        }
        return;
      }
      if (e.key === 'Escape') {
        closeBook();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        if (currIndexRef.current >= pages.length - 1) return;
        go(currIndexRef.current + 1);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        if (currIndexRef.current <= 0) return;
        go(currIndexRef.current - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isBookOpen]);

  const isCurve = kind === 'upper' || kind === 'lower';
  const isImageLeft = kind === 'article' && articleData?.imagePosition === 'left';

  // Component for rendering visual card image
  const renderVisualCard = () => (
    <div className="article-visual-card">
      <div className="article-card-frame">
        <div className="sketch-header">
          <span className="sketch-badge">
            {articleData?.imageBadge || `ARTICLE IMAGE / SKETCH SLOT`}
          </span>
          <span className="sketch-id">ARTICLE {articleNumber}</span>
        </div>
        {articleData?.image ? (
          <div className="article-image-container">
            <img
              src={articleData.image}
              alt={title}
              className="article-featured-image"
            />
          </div>
        ) : (
          <div className="sketch-canvas placeholder-canvas">
            <div className="canvas-crosshatch">
              <span>+ Insert Visual / Graphic Here +</span>
            </div>
          </div>
        )}
        <p className="sketch-caption">
          {articleData?.imageCaption || `Visual asset placeholder for Article ${articleNumber}.`}
        </p>
      </div>
    </div>
  );

  // Component for rendering home right page (Opening Editorial Magazine Spread)
  const renderHomeRightPanel = () => (
    <div className="home-right-magazine-opener">
      <div className="magazine-stacked-headline">
        <span className="stack-sub">SAME CITY. SAME RULES.</span>
        <div className="stack-huge-title">
          <span className="strong-burgundy">DIFFERENT</span>
          <span className="strong-ink">ROOM TO</span>
          <span className="strong-ink">CHOOSE.</span>
        </div>
      </div>

      <div className="editorial-divider-line" aria-hidden="true" />

      <div className="magazine-core-thesis">
        <h3 className="thesis-lead">
          Wealth doesn&apos;t only change what you can buy.
        </h3>
        <p className="thesis-body">
          It can change how long you can wait, what risks you can take, how often you can fail, and what happens when you do.
        </p>
      </div>

      <div className="magazine-keyword-index">
        <div className="keyword-item"><span className="kw-num">01</span><span className="kw-word">CHOICE</span></div>
        <div className="keyword-item"><span className="kw-num">02</span><span className="kw-word">TIME</span></div>
        <div className="keyword-item"><span className="kw-num">03</span><span className="kw-word">RISK</span></div>
        <div className="keyword-item"><span className="kw-num">04</span><span className="kw-word">SECURITY</span></div>
        <div className="keyword-item"><span className="kw-num">05</span><span className="kw-word">FAILURE</span></div>
        <div className="keyword-item"><span className="kw-num">06</span><span className="kw-word">OPPORTUNITY</span></div>
      </div>

      <div className="magazine-next-transition">
        <button className="next-k-curve-btn" onClick={() => go(1)} aria-label="Turn to next page: The K-Curve">
          <span className="next-tag">NEXT:</span>
          <span className="next-label">THE K-CURVE</span>
          <span className="next-arrow">→</span>
        </button>
      </div>
    </div>
  );

  // Component for rendering text copy panel
  const renderCopyPanel = () => (
    <div className="copy-inner">
      <div className="number">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <i />
      </div>

      <p className="kicker">{kicker}</p>
      <h1 className="editorial-page-headline">{title}</h1>
      {subtitle ? <p className="description">{subtitle}</p> : null}

      {kind === 'home' && (
        <div className="home-editorial-layout">
          <p className="home-sub-lead">
            We like to believe that success begins at the same starting line.
          </p>

          <div className="home-rhythm-seq">
            <span className="rhythm-step step-1">WORK HARD.</span>
            <span className="rhythm-dot">·</span>
            <span className="rhythm-step step-2">TAKE RISKS.</span>
            <span className="rhythm-dot">·</span>
            <span className="rhythm-step step-3">KEEP TRYING.</span>
          </div>

          <div className="home-turning-point-block">
            <p className="home-turning-point">
              “But what if the cost of trying isn&apos;t the same for everyone?”
            </p>
          </div>

          <blockquote className="home-pull-quote">
            <p>“Some people have room to fail. Others cannot afford to.”</p>
          </blockquote>

          <p className="home-closing-statement">
            This is a story about the distance between those two realities.
          </p>
        </div>
      )}

      {kind === 'intro' && (
        <div className="intro-editorial-layout">
          {/* Subtle Pull Quote with oversized background quote mark & thin rule */}
          <div className="intro-pull-quote-wrapper">
            <span className="quote-mark-watermark" aria-hidden="true">“</span>
            <blockquote className="intro-pull-quote">
              <p className="quote-text">
                “The law, in its majestic equality, forbids the rich as well as the poor to sleep under bridges, to beg in the streets, and to steal bread.”
              </p>
              <cite className="quote-author">— Anatole France</cite>
            </blockquote>
          </div>

          {/* Provocative Turning Point */}
          <p className="intro-turning-point">
            …but why would the rich need to do all that in the first place?
          </p>

          {/* Bengaluru Section with Side-by-Side Large Stats */}
          <div className="bengaluru-stats-section">
            <h3 className="bengaluru-section-title">BENGALURU — A CITY OF CONTRADICTIONS</h3>
            
            <div className="stats-side-by-side">
              <div className="stat-column">
                <span className="stat-big-num">15–20%</span>
                <span className="stat-desc">Living in poverty</span>
              </div>
              <div className="stat-divider" aria-hidden="true" />
              <div className="stat-column">
                <span className="stat-big-num">13–17%</span>
                <span className="stat-desc">Going to bed without food</span>
              </div>
            </div>

            <p className="stats-summary-statement">
              Extreme wealth and everyday scarcity can exist within the same city.
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="intro-bottom-cta">
            <button className="editorial-explore-cta" onClick={() => go(2)}>
              <span>Explore the Divide</span>
              <span className="cta-arrow">→</span>
            </button>
          </div>
        </div>
      )}

      {kind === 'upper' && (
        <div className="upper-curve-guide">
          <div className="curve-flow-hints">
            <span className="flow-step">01 · Before Page</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">02 · Freedom To Choose</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">03 · Can Afford To Fail</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step highlight">04 · Lower Curve</span>
          </div>

          <div className="page-actions-group" style={{ marginTop: '18px' }}>
            <button className="primary action-btn" onClick={() => go(3)}>
              <span>Explore Case 01: Freedom To Choose</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
      )}

      {kind === 'article' && (
        <div className="article-body-container">
          {articleData ? (
            <div className="article-reader-content">
              <div className="article-meta-badge">ESSAY · CASE STUDY {articleNumber}</div>
              <div className="article-paragraphs">
                {articleData.paragraphs.slice(0, 3).map((p, idx) => (
                  <p key={idx} className={idx === 0 ? 'article-lead-p' : 'article-p'}>
                    {p}
                  </p>
                ))}
                {articleData.quote && (
                  <blockquote className="article-pull-quote">
                    <p>{articleData.quote}</p>
                  </blockquote>
                )}
                {articleData.paragraphs.slice(3).map((p, idx) => {
                  const isLast = idx + 3 === articleData.paragraphs.length - 1;
                  return (
                    <p key={idx + 3} className={isLast ? 'article-conclusion-p' : 'article-p'}>
                      {p}
                    </p>
                  );
                })}
              </div>
            </div>
          ) : (
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
            </div>
          )}

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
        <div className="lower-curve-guide">
          <div className="curve-flow-hints">
            <span className="flow-step">01 · Upper Curve</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">02 · Church Street</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step">03 · The Poverty Loop</span>
            <span className="flow-arrow">→</span>
            <span className="flow-step highlight">04 · Print Broadsheet</span>
          </div>

          <div className="curve-page-actions">
            <button className="outline btn-sm" onClick={() => go(2)}>
              ← Upper Curve
            </button>
            <button className="primary btn-sm" onClick={() => go(6)}>
              Explore Case 03 →
            </button>
            <button className="outline btn-sm" onClick={() => go(8)}>
              Print Edition →
            </button>
          </div>
        </div>
      )}

      {kind === 'end' && (
        <div className="end-actions">
          <button className="primary action-btn" onClick={() => go(0)}>
            Restart journey ↺
          </button>
        </div>
      )}
    </div>
  );

  if (!isBookOpen) {
    return (
      <main className="cover-stage-wrapper">
        {/* Custom Interactive Bookish Cursor */}
        <CustomCursor />

        {/* Volumetric Clouds WebGL Shader Background */}
        <CloudShaderBackground />

        <header className="site-header cover-header">
          <div className="header-brand-group">
            <span className="brand-logo">FIELD NOTES</span>
            <span className="brand-tag">THE RISE & THE DESCENT</span>
          </div>

          <div className="header-controls-group">
            <button
              className={`audio-toggle-btn ${isPlayingAudio ? 'is-playing' : ''}`}
              onClick={toggleSound}
              title={isPlayingAudio ? 'Mute ambient field notes music' : 'Play gentle ambient field notes music'}
              aria-label="Toggle background music"
            >
              <span className="sound-icon">{isPlayingAudio ? '🎵' : '🔇'}</span>
              <span className="sound-text">{isPlayingAudio ? 'Music: ON' : 'Music: OFF'}</span>
              {isPlayingAudio && (
                <span className="sound-waves" aria-hidden="true">
                  <span className="wave w1" />
                  <span className="wave w2" />
                  <span className="wave w3" />
                </span>
              )}
            </button>
          </div>
        </header>

        <div className={`closed-book-stage ${isOpening ? 'is-opening' : ''}`}>
          <div className="closed-cover-container" onClick={openBook}>
            {/* 3D Hardcover Book */}
            <div className="closed-hardcover-book">
              {/* Leather Spine on Left */}
              <div className="closed-spine">
                <div className="spine-rib" />
                <span className="spine-title">THE K-SHAPED DIVIDE · 2026</span>
                <div className="spine-rib" />
              </div>

              {/* Front Cover Face */}
              <div className="closed-front-face">
                {/* Gold Debossed Frame */}
                <div className="gold-frame-border">
                  <div className="corner-ornament top-left" />
                  <div className="corner-ornament top-right" />
                  <div className="corner-ornament bottom-left" />
                  <div className="corner-ornament bottom-right" />

                  <div className="cover-header-tag">
                    <span>SMI INVESTIGATIVE FIELD NOTEBOOK · 2026</span>
                  </div>

                  <div className="cover-title-group">
                    <h1 className="cover-main-title">THE K-SHAPED DIVIDE</h1>
                    <p className="cover-subtitle">A Visual Investigation on Wealth, Survival, and Choices in Bengaluru</p>
                  </div>

                  {/* Center Gold Foil Emblem */}
                  <div className="cover-emblem">
                    <svg viewBox="0 0 100 100" className="emblem-svg">
                      <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
                      <circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" strokeWidth="1" />
                      {/* Stylized K */}
                      <line x1="38" y1="26" x2="38" y2="74" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      <path d="M 38 50 L 64 28" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                      <path d="M 38 50 L 64 72" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                  </div>

                  <div className="cover-byline-group">
                    <span className="cover-byline">BY PRANITH VINCENT</span>
                    <span className="cover-issue">ISSUE NO. 777 · PRINT & DIGITAL NOTEBOOK</span>
                  </div>

                  {/* Interactive Open Seal Button */}
                  <button className="cover-open-btn" onClick={(e) => { e.stopPropagation(); openBook(); }} aria-label="Open Notebook">
                    <span className="open-btn-icon">📖</span>
                    <span className="open-btn-text">CLICK TO OPEN NOTEBOOK</span>
                    <span className="open-btn-arrow">→</span>
                  </button>
                </div>
              </div>

              {/* Stacked Pages Edge Depth on Right */}
              <div className="closed-pages-edge" />
            </div>
          </div>
        </div>

        {/* Ambient Floating Dust / Light Specks */}
        <div className="ambient-dust-field" aria-hidden="true">
          <span className="dust-particle dp-1" />
          <span className="dust-particle dp-2" />
          <span className="dust-particle dp-3" />
          <span className="dust-particle dp-4" />
          <span className="dust-particle dp-5" />
          <span className="dust-particle dp-6" />
        </div>
      </main>
    );
  }

  return (
    <main className="site-shell">
      {/* Custom Interactive Bookish Cursor */}
      <CustomCursor />

      {/* Volumetric Clouds WebGL Shader Background */}
      <CloudShaderBackground />

      <header className="site-header">
        <div className="header-brand-group">
          <span className="brand-logo">FIELD NOTES</span>
          <span className="brand-tag">THE RISE & THE DESCENT</span>
        </div>

        <div className="header-controls-group">
          <button
            className="close-book-header-btn"
            onClick={closeBook}
            title="Close notebook and return to cover"
            aria-label="Close notebook"
          >
            <span>📕 Close Cover</span>
          </button>
          <button
            className={`audio-toggle-btn ${isPlayingAudio ? 'is-playing' : ''}`}
            onClick={toggleSound}
            title={isPlayingAudio ? 'Mute ambient field notes music' : 'Play gentle ambient field notes music'}
            aria-label="Toggle background music"
          >
            <span className="sound-icon">{isPlayingAudio ? '🎵' : '🔇'}</span>
            <span className="sound-text">{isPlayingAudio ? 'Music: ON' : 'Music: OFF'}</span>
            {isPlayingAudio && (
              <span className="sound-waves" aria-hidden="true">
                <span className="wave w1" />
                <span className="wave w2" />
                <span className="wave w3" />
              </span>
            )}
          </button>
          <span className="page-counter">{String(index + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}</span>
        </div>
      </header>

      <div className="book-stage">
        <div className="book-cover-frame">
          {/* Stacked Pages Edges Depth underneath book */}
          <div className="book-pages-stack-left" aria-hidden="true" />
          <div className="book-pages-stack-right" aria-hidden="true" />

          {/* Hanging Silk Ribbon Bookmark (hidden on print spreads so it doesn't obstruct the pages) */}
          {kind !== 'print_spread_1' && kind !== 'print_spread_2' && (
            <div className="book-ribbon-bookmark" aria-hidden="true">
              <div className="ribbon-strip" />
              <div className="ribbon-tip" />
            </div>
          )}

          <section className={`plain-page ${direction} ${kind} ${isImageLeft ? 'image-left-layout' : ''}`} key={index}>
            {/* Physical 3D Paper Leaf overlay flipping over the book surface */}
            <div className="paper-turn-leaf" aria-hidden="true">
              <div className="leaf-front" />
              <div className="leaf-back" />
            </div>

            {/* Central Book Spine Crease & Binding Gutter */}
            <div className="book-spine-crease" aria-hidden="true">
              <div className="spine-stitch" />
            </div>

            {/* Spread 1: Left Page: Broadsheet 1 | Right Page: Broadsheet 2 */}
            {kind === 'print_spread_1' ? (
              <>
                {/* LEFT BOOK PAGE: Broadsheet 1 (Untold Stories Cover) */}
                <div className="visual visual-left book-page-left broadsheet-book-page">
                  <div className="broadsheet-book-frame">
                    <img
                      src="/pics/newspaper_intro.png"
                      alt="SMI Newspaper Issue 777: Untold Stories"
                      className="broadsheet-book-page-img"
                    />
                  </div>
                </div>

                {/* RIGHT BOOK PAGE: Broadsheet 2 (The Upper K) */}
                <div className="visual book-page-right broadsheet-book-page">
                  <div className="broadsheet-book-frame">
                    <img
                      src="/pics/newspaper_upper_k.png"
                      alt="SMI Newspaper: The Upper K"
                      className="broadsheet-book-page-img"
                    />
                  </div>
                  {/* Right Controls */}
                  <div className="controls wedge-split-controls">
                    <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                      ▲
                    </button>
                    <button className="ctrl-down" onClick={() => go(index + 1)} aria-label="Next page" title="Next page (▼)">
                      ▼
                    </button>
                  </div>
                </div>
              </>
            ) : kind === 'print_spread_2' ? (
              <>
                {/* LEFT BOOK PAGE: Broadsheet 3 (The Lower K) */}
                <div className="visual visual-left book-page-left broadsheet-book-page">
                  <div className="broadsheet-book-frame">
                    <img
                      src="/pics/newspaper_lower_k.png"
                      alt="SMI Newspaper: The Lower K"
                      className="broadsheet-book-page-img"
                    />
                  </div>
                </div>

                {/* RIGHT BOOK PAGE: Closing Reflection */}
                <div className="copy copy-right book-page-right epilogue-page-container">
                  <div className="page-header-running-head">
                    <span>THE K-SHAPED DIVIDE · EPILOGUE</span>
                  </div>

                  <div className="copy-inner epilogue-copy-inner">
                    <div className="number">
                      <span>10</span>
                      <i />
                    </div>
                    <p className="kicker">10 · FINAL REFLECTION</p>
                    <h1 className="epilogue-title">Until The Next Page.</h1>
                    <p className="description epilogue-desc">
                      A complete field notes & broadsheet anthology on the K-shaped economic divide.
                    </p>

                    <blockquote className="article-pull-quote epilogue-quote">
                      <p>“Perhaps the real difference isn&apos;t what they are selling. Perhaps it is what we see when we look at the person selling it.”</p>
                    </blockquote>

                    <div className="epilogue-meta-card">
                      <div className="epilogue-meta-item">
                        <span className="meta-badge">FIELDWORK</span>
                        <p className="meta-detail">Church Street, Srishti, Indiranagar & Gram Panchayat</p>
                      </div>

                      <div className="epilogue-meta-item author-item">
                        <span className="meta-badge author-badge">PROJECT AUTHOR</span>
                        <p className="meta-detail author-detail">
                          Researched, authored, and designed by <strong>Pranith Vincent</strong>
                          <span className="institution-tag">Srishti Manipal Institute of Art, Design & Technology · 2026</span>
                        </p>
                      </div>
                    </div>

                    <div className="epilogue-actions-row">
                      <button className="primary action-btn" onClick={() => go(0)}>
                        <span>Restart journey</span>
                        <span className="btn-icon">↺</span>
                      </button>
                      <button className="outline btn-sm" onClick={closeBook}>
                        <span>Close Cover</span>
                        <span className="btn-icon">📕</span>
                      </button>
                    </div>
                  </div>

                  <div className="page-bottom-folio">
                    <span>— 20 —</span>
                  </div>

                  {/* Right Controls */}
                  <div className="controls wedge-split-controls">
                    <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                      ▲
                    </button>
                    <button className="ctrl-down" onClick={() => go(0)} aria-label="Restart journey" title="Restart journey (↺)">
                      ↺
                    </button>
                  </div>
                </div>
              </>
            ) : isImageLeft ? (
              <>
                {/* LEFT PANEL: Image Card */}
                <div className="visual visual-left book-page-left">
                  <div className="page-header-running-head">
                    <span>FIELD NOTES · CASE {articleNumber}</span>
                  </div>
                  {renderVisualCard()}
                  <div className="page-bottom-folio">
                    <span>— {String(index * 2 + 1).padStart(2, '0')} —</span>
                  </div>
                </div>

                {/* RIGHT PANEL: Copy & Text & Controls */}
                <div className="copy copy-right book-page-right">
                  <div className="page-header-running-head">
                    <span>THE K-SHAPED DIVIDE</span>
                  </div>
                  {renderCopyPanel()}
                  <div className="page-bottom-folio">
                    <span>— {String(index * 2 + 2).padStart(2, '0')} —</span>
                  </div>
                </div>

                {/* Right Controls */}
                <div className="controls wedge-split-controls">
                  <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                    ▲
                  </button>
                  <button className="ctrl-down" onClick={() => go(index + 1)} aria-label="Next page" title="Next page (▼)">
                    ▼
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* DEFAULT LAYOUT: Copy on LEFT panel, Visual on RIGHT panel */}
                <div className="copy book-page-left">
                  <div className="page-header-running-head">
                    <span>FIELD NOTES · ENTRY {String(index + 1).padStart(2, '0')}</span>
                  </div>
                  {renderCopyPanel()}
                  <div className="page-bottom-folio">
                    <span>— {String(index * 2 + 1).padStart(2, '0')} —</span>
                  </div>
                </div>

                {/* RIGHT PANEL: Visual & Controls */}
                <div className="visual book-page-right">
                  <div className="page-header-running-head">
                    <span>{kind === 'home' ? 'THE IDEA' : 'THE K-SHAPED DIVIDE'}</span>
                  </div>
                  {isCurve ? (
                    <>
                      <Curve lower={kind === 'lower'} onNavigate={go} />
                      <div className="controls wedge-split-controls">
                        <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                          ▲
                        </button>
                        <button className="ctrl-down" onClick={() => go(index + 1)} aria-label="Next page" title="Next page (▼)">
                          ▼
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {kind === 'article' ? (
                        renderVisualCard()
                      ) : kind === 'intro' ? (
                        <IntroKDiagram onNavigate={go} />
                      ) : kind === 'home' ? (
                        renderHomeRightPanel()
                      ) : (
                        <div className="nav-wedge">
                          <svg viewBox="0 0 400 660" preserveAspectRatio="none" className="wedge-svg">
                            <line x1="400" y1="2" x2="0" y2="2" stroke="var(--ink)" strokeWidth="2" />
                            <line x1="400" y1="658" x2="0" y2="658" stroke="var(--ink)" strokeWidth="2" />
                            <path d="M400 0 L0 330 L400 660" fill="none" stroke="var(--ink)" strokeWidth="2" />
                          </svg>
                        </div>
                      )}

                      {/* Controls */}
                      <div className="controls wedge-split-controls">
                        <button className="ctrl-up" onClick={() => go(index - 1)} aria-label="Previous page" title="Previous page (▲)">
                          ▲
                        </button>
                        <button className="ctrl-down" onClick={() => go(index + 1)} aria-label="Next page" title="Next page (▼)">
                          ▼
                        </button>
                      </div>
                    </>
                  )}
                  <div className="page-bottom-folio">
                    <span>— {String(index * 2 + 2).padStart(2, '0')} —</span>
                  </div>
                </div>
              </>
            )}

          </section>
        </div>
      </div>

      <div className="book-bottom-nav">
        <nav className="dots" aria-label="Book page navigation">
          {pages.map((p, i) => (
            <button
              key={p.id}
              aria-label={`Turn to page ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 'forward' : 'back');
                setIndex(i);
              }}
              className={i === index ? 'active' : ''}
              title={`Page ${i + 1}: ${p.title}`}
            />
          ))}
        </nav>
      </div>
    </main>
  );
}


