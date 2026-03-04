import { useCallback, useEffect, useRef, useState } from "react";
import { useSaveBouquet, useSaveProposalResponse } from "./hooks/useQueries";

// ─── Types ────────────────────────────────────────────────────────────────────
type Step = 0 | 1 | 2 | 3 | 4;

interface FloatingHeart {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

interface ConfettiPiece {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const HEART_EMOJIS = [
  "💖",
  "💕",
  "💗",
  "💓",
  "💞",
  "🌸",
  "✨",
  "⭐",
  "💫",
  "🌺",
];
const CONFETTI_EMOJIS = [
  "💖",
  "🎉",
  "✨",
  "💐",
  "🌸",
  "💍",
  "🎊",
  "🌟",
  "💕",
  "💎",
  "🥂",
  "💗",
];

const FLOWERS = [
  { emoji: "🌹", name: "Rose" },
  { emoji: "🌻", name: "Sunflower" },
  { emoji: "🌷", name: "Tulip" },
  { emoji: "🌸", name: "Cherry Blossom" },
  { emoji: "💐", name: "Bouquet" },
  { emoji: "🌼", name: "Daisy" },
  { emoji: "🌺", name: "Hibiscus" },
  { emoji: "🍀", name: "Clover" },
  { emoji: "🌿", name: "Greenery" },
];

// ─── Floating Hearts Background ───────────────────────────────────────────────
function FloatingHeartsBackground({ count = 12 }: { count?: number }) {
  const [hearts] = useState<FloatingHeart[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      left: (i / count) * 100 + Math.random() * (100 / count),
      size: 1.2 + (i % 5) * 0.4,
      duration: 8 + (i % 7) * 1.5,
      delay: (i % 9) * 0.9,
    })),
  );

  return (
    <div className="pointer-events-none" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}rem`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            bottom: "-10vh",
          }}
        >
          {h.emoji}
        </span>
      ))}
    </div>
  );
}

// ─── Confetti Rain ─────────────────────────────────────────────────────────────
function ConfettiRain({ count = 30 }: { count?: number }) {
  const [pieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      left: (i / count) * 100 + Math.random() * (100 / count),
      size: 1.2 + (i % 4) * 0.5,
      duration: 4 + (i % 6) * 0.8,
      delay: (i % 8) * 0.75,
    })),
  );

  return (
    <div className="pointer-events-none" aria-hidden="true">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="confetti-piece"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

// ─── Step 0: Welcome Page ──────────────────────────────────────────────────────
function WelcomePage({ onNext }: { onNext: () => void }) {
  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.97 0.03 350) 0%, oklch(0.93 0.05 320) 50%, oklch(0.95 0.04 295) 100%)",
      }}
    >
      {/* Background romantic image */}
      <div
        className="absolute inset-0 opacity-20 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/assets/generated/romantic-bg.dim_1920x1080.jpg')",
        }}
        aria-hidden="true"
      />

      <FloatingHeartsBackground count={16} />

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* Top sparkles */}
        <div className="flex justify-center gap-4 mb-6 text-3xl fade-in">
          <span className="sparkle delay-100">✨</span>
          <span className="sparkle delay-300">💫</span>
          <span className="sparkle delay-500">⭐</span>
          <span className="sparkle delay-200">💫</span>
          <span className="sparkle delay-400">✨</span>
        </div>

        {/* Main title */}
        <h1
          className="fade-in-up text-5xl md:text-7xl font-bold mb-4 leading-tight"
          style={{
            fontFamily: "'Pacifico', Georgia, cursive",
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.65 0.2 320), oklch(0.78 0.16 295))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Hey Aastha 🌸
        </h1>

        {/* Subtitle */}
        <p
          className="fade-in-up delay-300 text-xl md:text-2xl mb-3"
          style={{
            fontFamily: "'Nunito', Georgia, sans-serif",
            fontStyle: "italic",
            color: "oklch(0.5 0.12 330)",
            opacity: 0,
          }}
        >
          I made something special, just for you 💖
        </p>

        <p
          className="fade-in-up delay-500 text-base md:text-lg mb-10"
          style={{
            fontFamily: "'Nunito', Georgia, sans-serif",
            color: "oklch(0.55 0.08 330)",
            opacity: 0,
          }}
        >
          Take a deep breath, relax, and let the magic begin ✨🐻💕
        </p>

        {/* Bear emoji */}
        <div
          className="bounce-gentle text-6xl mb-8"
          style={{ animationDelay: "0.5s" }}
        >
          🐻
        </div>

        {/* Begin button */}
        <button
          type="button"
          data-ocid="welcome.primary_button"
          onClick={onNext}
          className="btn-pookie glow-btn fade-in delay-700 text-white font-bold text-lg px-10 py-4"
          style={{
            opacity: 0,
            background:
              "linear-gradient(135deg, oklch(0.62 0.22 0), oklch(0.7 0.2 320), oklch(0.78 0.16 295))",
          }}
        >
          Begin 💝
        </button>

        {/* Bottom emoji row */}
        <div
          className="mt-10 flex justify-center gap-3 text-2xl fade-in delay-1000"
          style={{ opacity: 0 }}
        >
          <span>🌹</span>
          <span>💖</span>
          <span>🌷</span>
          <span>💕</span>
          <span>🌸</span>
          <span>💗</span>
          <span>🌺</span>
        </div>
      </div>
    </div>
  );
}

// ─── Step 1: Bouquet Builder ───────────────────────────────────────────────────
function BouquetBuilder({
  onNext,
  bouquet,
  setBouquet,
}: {
  onNext: () => void;
  bouquet: string[];
  setBouquet: (b: string[]) => void;
}) {
  const saveBouquetMutation = useSaveBouquet();

  const addFlower = (emoji: string) => {
    setBouquet([...bouquet, emoji]);
  };

  const removeFlower = (index: number) => {
    const next = [...bouquet];
    next.splice(index, 1);
    setBouquet(next);
  };

  const handleNext = async () => {
    try {
      await saveBouquetMutation.mutateAsync(bouquet);
    } catch (e) {
      console.error("Failed to save bouquet", e);
    }
    onNext();
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start pt-8 pb-16 px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.97 0.025 350) 0%, oklch(0.94 0.04 330) 50%, oklch(0.96 0.03 295) 100%)",
      }}
    >
      <FloatingHeartsBackground count={10} />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 fade-in-up">
          <div className="text-3xl mb-2">💐✨💐</div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-2"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.68 0.2 320))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Aastha&apos;s Bouquet 🌸
          </h2>
          <p
            className="text-lg"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              fontStyle: "italic",
              color: "oklch(0.55 0.1 330)",
            }}
          >
            Pick your favourite flowers, Aastha 🌷💕
          </p>
        </div>

        {/* Bouquet Preview */}
        <div className="bouquet-preview p-6 mb-8 min-h-[140px] fade-in-up delay-200">
          <p
            className="text-sm font-semibold mb-3 text-center"
            style={{ color: "oklch(0.6 0.12 330)" }}
          >
            🌿 Your Bouquet ({bouquet.length} flowers) 🌿
          </p>
          {bouquet.length === 0 ? (
            <div
              className="text-center text-3xl opacity-40"
              data-ocid="bouquet.empty_state"
            >
              <p
                className="text-sm mb-2"
                style={{ color: "oklch(0.65 0.08 330)", fontSize: "0.9rem" }}
              >
                Click flowers below to build your bouquet! 👇
              </p>
              <span>🌱</span>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2 justify-center">
              {bouquet.map((flower, index) => (
                <button
                  // biome-ignore lint/suspicious/noArrayIndexKey: bouquet items can repeat same emoji
                  key={`${flower}-${index}`}
                  type="button"
                  onClick={() => removeFlower(index)}
                  title="Click to remove"
                  className="text-3xl rounded-full transition-all duration-200 hover:scale-125 hover:opacity-70"
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "4px",
                  }}
                >
                  {flower}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Flower Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {FLOWERS.map((flower, index) => {
            const ocidKeys = [
              "bouquet.item.1",
              "bouquet.item.2",
              "bouquet.item.3",
              "bouquet.item.4",
              "bouquet.item.5",
              "bouquet.item.6",
              "bouquet.item.7",
              "bouquet.item.8",
              "bouquet.item.9",
            ] as const;
            return (
              <button
                type="button"
                key={flower.emoji}
                data-ocid={ocidKeys[index]}
                onClick={() => addFlower(flower.emoji)}
                className="pookie-card p-4 text-center transition-all duration-200 hover:scale-105 hover:-translate-y-1 active:scale-95 fade-in-up"
                style={{
                  animationDelay: `${0.1 * index}s`,
                  cursor: "pointer",
                  border: "none",
                  opacity: 0,
                }}
              >
                <span className="text-4xl block mb-1">{flower.emoji}</span>
                <span
                  className="text-xs font-semibold"
                  style={{ color: "oklch(0.55 0.12 330)" }}
                >
                  {flower.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Next button */}
        <div
          className="text-center fade-in-up delay-500"
          style={{ opacity: 0 }}
        >
          {bouquet.length === 0 && (
            <p
              className="text-sm mb-4"
              style={{ color: "oklch(0.62 0.1 330)", fontStyle: "italic" }}
            >
              Add at least one flower first! 🌸
            </p>
          )}
          <button
            type="button"
            data-ocid="bouquet.primary_button"
            onClick={handleNext}
            disabled={bouquet.length === 0 || saveBouquetMutation.isPending}
            className="btn-pookie text-white font-bold text-lg"
            style={{
              opacity: bouquet.length === 0 ? 0.5 : 1,
              cursor: bouquet.length === 0 ? "not-allowed" : "pointer",
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 0), oklch(0.7 0.2 320))",
            }}
          >
            {saveBouquetMutation.isPending ? "Saving... 💾" : "Next 💌"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Step 2: Proposal Message ──────────────────────────────────────────────────
function ProposalMessagePage({ onNext }: { onNext: () => void }) {
  const [revealed, setRevealed] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 1200);
    const t2 = setTimeout(() => setShowButton(true), 3000);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.96 0.03 320) 0%, oklch(0.93 0.05 340) 50%, oklch(0.97 0.03 295) 100%)",
      }}
    >
      <FloatingHeartsBackground count={14} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        <div className="text-4xl mb-6 sparkle">💌</div>

        <h2
          className="text-3xl md:text-5xl font-bold mb-8 fade-in-up"
          style={{
            fontFamily: "'Pacifico', Georgia, cursive",
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.7 0.18 295))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          A Message From My Heart 💖
        </h2>

        <div
          className="pookie-card p-8 md:p-12 text-left"
          style={{
            opacity: revealed ? 1 : 0,
            transition: "opacity 1s ease-in-out",
          }}
        >
          {revealed && (
            <div className="reveal-message space-y-5">
              <p
                className="text-xl md:text-2xl leading-relaxed"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  fontStyle: "italic",
                  color: "oklch(0.35 0.1 330)",
                }}
              >
                My dearest Aastha, my sweetest, my most favourite person in the
                entire world... 🌍💕
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  color: "oklch(0.4 0.1 330)",
                }}
              >
                For 9 magical months, you&apos;ve made every single day
                brighter, Aastha. 🌸 You are my sunshine when the sky is grey,
                my laughter in the quiet moments, and the warmest hug at the end
                of every day. 🌻
              </p>
              <p
                className="text-lg md:text-xl leading-relaxed"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  color: "oklch(0.4 0.1 330)",
                }}
              >
                In these 9 months, I&apos;ve fallen more in love with you every
                single day. 🐻💗 I love the way you smile, the way you care, the
                way you make everything so much brighter just by being you. ✨
              </p>
              <p
                className="text-xl md:text-2xl font-semibold leading-relaxed"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  fontStyle: "italic",
                  color: "oklch(0.5 0.18 340)",
                }}
              >
                You are my sunshine, my everything, my pookie bear, Aastha...
                🐻💕
              </p>

              <div className="flex justify-center gap-3 text-3xl pt-2">
                <span className="sparkle">💖</span>
                <span className="sparkle delay-200">💕</span>
                <span className="sparkle delay-400">💗</span>
                <span className="sparkle delay-100">💓</span>
                <span className="sparkle delay-300">💞</span>
              </div>

              <p
                className="text-xl md:text-2xl font-bold text-center pt-2"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  color: "oklch(0.5 0.2 340)",
                }}
              >
                Will you make me the happiest person in the world, Aastha? 🌟
              </p>
            </div>
          )}

          {!revealed && (
            <div className="text-center py-12">
              <span className="text-5xl sparkle">💌</span>
              <p
                className="mt-4"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  color: "oklch(0.6 0.1 330)",
                }}
              >
                Opening your letter, Aastha...
              </p>
            </div>
          )}
        </div>

        {showButton && (
          <div className="mt-10 fade-in">
            <button
              type="button"
              onClick={onNext}
              className="btn-pookie glow-btn text-white font-bold text-lg"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.62 0.22 0), oklch(0.7 0.2 320), oklch(0.78 0.16 295))",
              }}
            >
              Read the Question 💍
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Step 3: The Proposal ──────────────────────────────────────────────────────
function ProposalPage({
  onYes,
}: {
  onYes: () => void;
}) {
  const [noPos, setNoPos] = useState<{ x: number; y: number } | null>(null);
  const [noSize, setNoSize] = useState(1);
  const [clickCount, setClickCount] = useState(0);
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const saveProposalMutation = useSaveProposalResponse();

  const getRandomPos = useCallback(() => {
    const margin = 80;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    return {
      x: margin + Math.random() * (maxX - 2 * margin),
      y: margin + Math.random() * (maxY - 2 * margin),
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!noButtonRef.current) return;
      const btn = noButtonRef.current.getBoundingClientRect();
      const btnCenterX = btn.left + btn.width / 2;
      const btnCenterY = btn.top + btn.height / 2;
      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (dist < 160) {
        const newPos = getRandomPos();
        setNoPos(newPos);
        setNoSize((prev) => Math.max(0.3, prev - 0.07));
      }
    },
    [getRandomPos],
  );

  const handleNoClick = () => {
    setClickCount((c) => c + 1);
    const newPos = getRandomPos();
    setNoPos(newPos);
    setNoSize((prev) => Math.max(0.25, prev - 0.1));
  };

  const handleYes = async () => {
    try {
      await saveProposalMutation.mutateAsync(true);
    } catch (e) {
      console.error("Failed to save response", e);
    }
    onYes();
  };

  const noMessages = [
    "No...",
    "Still no! 😜",
    "Nope! 🙈",
    "Nahh~ 😅",
    "Try again! 😂",
    "Psych! 🤣",
    "Nuh-uh 😝",
    "Hehe no 🙊",
  ];
  const noLabel = noMessages[Math.min(clickCount, noMessages.length - 1)];

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.95 0.04 330) 0%, oklch(0.97 0.03 295) 50%, oklch(0.94 0.05 350) 100%)",
      }}
      onMouseMove={handleMouseMove}
    >
      <FloatingHeartsBackground count={18} />

      {/* Ring image */}
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <div className="ring-float mb-6">
          <img
            src="/assets/generated/ring-hero.dim_600x600.png"
            alt="Engagement ring"
            className="w-40 h-40 md:w-52 md:h-52 mx-auto object-contain"
          />
        </div>

        <h2
          className="text-4xl md:text-6xl font-bold mb-4 fade-in-up"
          style={{
            fontFamily: "'Pacifico', Georgia, cursive",
            background:
              "linear-gradient(135deg, oklch(0.52 0.22 0), oklch(0.65 0.2 320), oklch(0.78 0.16 295))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Will You Marry Me?
        </h2>

        <div className="flex justify-center gap-3 text-3xl my-4 sparkle">
          💍✨💍
        </div>

        <p
          className="text-lg mb-10 fade-in-up delay-300"
          style={{
            fontFamily: "'Nunito', Georgia, sans-serif",
            fontStyle: "italic",
            color: "oklch(0.5 0.12 330)",
            opacity: 0,
          }}
        >
          Aastha, you are the love of my life, my best friend, my forever person
          💕🐻
        </p>

        {/* Yes button */}
        <div className="flex justify-center mb-8">
          <button
            type="button"
            data-ocid="proposal.primary_button"
            onClick={handleYes}
            disabled={saveProposalMutation.isPending}
            className="yes-throb text-white font-bold rounded-full px-12 py-5 text-xl border-none cursor-pointer"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.62 0.22 0), oklch(0.72 0.2 320), oklch(0.78 0.16 295))",
              boxShadow:
                "0 0 30px 8px oklch(0.62 0.22 0 / 0.45), 0 0 60px 15px oklch(0.72 0.18 320 / 0.25)",
            }}
          >
            {saveProposalMutation.isPending ? "💖 ..." : "Yes, forever! 💖"}
          </button>
        </div>

        {/* No button — either in flow or floating */}
        <div className="flex justify-center">
          <button
            type="button"
            ref={noButtonRef}
            data-ocid="proposal.secondary_button"
            onClick={handleNoClick}
            className="rounded-full border-2 font-semibold cursor-pointer transition-all duration-200"
            style={{
              position: noPos ? "fixed" : "relative",
              left: noPos ? `${noPos.x}px` : undefined,
              top: noPos ? `${noPos.y}px` : undefined,
              transform: noPos
                ? `translate(-50%, -50%) scale(${noSize})`
                : `scale(${noSize})`,
              zIndex: 100,
              padding: `${0.5 * noSize}rem ${1.5 * noSize}rem`,
              fontSize: `${0.9 * noSize}rem`,
              color: "oklch(0.55 0.1 330)",
              borderColor: "oklch(0.75 0.08 330)",
              background: "oklch(0.97 0.02 330 / 0.8)",
              pointerEvents: noSize < 0.35 ? "none" : "auto",
            }}
          >
            {noLabel}
          </button>
        </div>

        {noSize < 0.6 && (
          <p
            className="text-sm mt-6 fade-in"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              fontStyle: "italic",
              color: "oklch(0.62 0.1 330)",
            }}
          >
            Come on Aastha, I think we both know the answer 😏💖
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Step 4: Celebration ───────────────────────────────────────────────────────
function CelebrationPage({ bouquet }: { bouquet: string[] }) {
  return (
    <div
      data-ocid="celebration.section"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.94 0.06 340) 0%, oklch(0.92 0.07 320) 50%, oklch(0.95 0.05 295) 100%)",
      }}
    >
      <ConfettiRain count={35} />
      <FloatingHeartsBackground count={20} />

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Big celebration title */}
        <div className="text-5xl mb-4 bounce-gentle">🎉</div>

        <h1
          className="text-5xl md:text-7xl font-bold mb-4 fade-in-up"
          style={{
            fontFamily: "'Pacifico', Georgia, cursive",
            background:
              "linear-gradient(135deg, oklch(0.52 0.22 0), oklch(0.68 0.2 320), oklch(0.8 0.14 80))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Aastha Said YES!
        </h1>

        <div className="flex justify-center gap-3 text-4xl my-4">
          <span className="sparkle">🎉</span>
          <span className="sparkle delay-100">💍</span>
          <span className="sparkle delay-200">💖</span>
          <span className="sparkle delay-300">🥂</span>
          <span className="sparkle delay-400">🎊</span>
        </div>

        <p
          className="text-xl md:text-2xl mb-8 fade-in-up delay-300"
          style={{
            fontFamily: "'Nunito', Georgia, sans-serif",
            fontStyle: "italic",
            color: "oklch(0.42 0.14 330)",
            opacity: 0,
          }}
        >
          The most beautiful answer to the most important question 💕✨
        </p>

        {/* Celebration card */}
        <div
          className="pookie-card p-8 mb-8 fade-in-up delay-500"
          style={{ opacity: 0 }}
        >
          <div className="text-4xl mb-4">💍🌸💍</div>
          <p
            className="text-2xl font-bold mb-2"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.52 0.22 0), oklch(0.68 0.2 320))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            We&apos;re getting married! 🎊
          </p>
          <p
            className="text-lg"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              fontStyle: "italic",
              color: "oklch(0.5 0.12 330)",
            }}
          >
            Forever starts today, Aastha 🐻💕
          </p>

          <div className="flex justify-center gap-2 text-3xl mt-4">
            <span className="sparkle">💖</span>
            <span className="sparkle delay-100">💕</span>
            <span className="sparkle delay-200">💗</span>
            <span className="sparkle delay-300">💓</span>
            <span className="sparkle delay-400">💞</span>
          </div>
        </div>

        {/* Bouquet display */}
        {bouquet.length > 0 && (
          <div
            className="bouquet-preview p-6 mb-8 fade-in-up delay-700"
            style={{ opacity: 0 }}
          >
            <p
              className="text-sm font-semibold mb-3"
              style={{ color: "oklch(0.55 0.12 330)" }}
            >
              💐 Your Special Bouquet 💐
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-4xl">
              {bouquet.map((flower, i) => (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: bouquet items can repeat same emoji
                  key={`celebration-${flower}-${i}`}
                  className="sparkle"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  {flower}
                </span>
              ))}
            </div>
            <p
              className="text-sm mt-3"
              style={{
                fontFamily: "'Nunito', Georgia, sans-serif",
                fontStyle: "italic",
                color: "oklch(0.6 0.1 330)",
              }}
            >
              Made with so much love, just for you, Aastha 🌿💖
            </p>
          </div>
        )}

        {/* Forever message */}
        <div
          className="text-center fade-in-up delay-1000"
          style={{ opacity: 0 }}
        >
          <div className="text-5xl mb-3">🥂</div>
          <p
            className="text-lg"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              color: "oklch(0.48 0.14 330)",
            }}
          >
            Here&apos;s to forever, my Aastha 🐻✨💍
          </p>
          <div className="flex justify-center gap-3 text-2xl mt-4">
            <span>🌹</span>
            <span>💍</span>
            <span>🌸</span>
            <span>💖</span>
            <span>🌷</span>
            <span>🎊</span>
            <span>🌺</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [step, setStep] = useState<Step>(0);
  const [bouquet, setBouquet] = useState<string[]>([]);

  const goNext = useCallback(() => {
    setStep((prev) => (prev < 4 ? ((prev + 1) as Step) : prev));
  }, []);

  return (
    <div className="relative min-h-screen">
      {step === 0 && <WelcomePage onNext={goNext} />}
      {step === 1 && (
        <BouquetBuilder
          onNext={goNext}
          bouquet={bouquet}
          setBouquet={setBouquet}
        />
      )}
      {step === 2 && <ProposalMessagePage onNext={goNext} />}
      {step === 3 && <ProposalPage onYes={goNext} />}
      {step === 4 && <CelebrationPage bouquet={bouquet} />}

      {/* Footer */}
      <footer
        className="fixed bottom-2 left-0 right-0 text-center text-xs z-50 pointer-events-none"
        style={{ color: "oklch(0.7 0.08 330 / 0.7)" }}
      >
        <span className="pointer-events-auto">
          © {new Date().getFullYear()} Built with{" "}
          <span style={{ color: "oklch(0.62 0.22 0)" }}>love</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.62 0.22 0)", textDecoration: "underline" }}
          >
            caffeine.ai
          </a>{" "}
          💕
        </span>
      </footer>
    </div>
  );
}
