import { Toaster } from "@/components/ui/sonner";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  useAddFlowersForAastha,
  useAddFlowersForBishal,
  useAddHandwrittenNote,
  useAddLetter,
  useDeleteHandwrittenNote,
  useDeleteLetter,
  useGetAllHandwrittenNotes,
  useGetAllLetters,
  useGetBouquetForAastha,
  useGetBouquetForBishal,
  useGetWeddingCertificate,
  useSetWeddingDate,
  useSignWeddingCertificateAsAastha,
  useSignWeddingCertificateAsBishal,
} from "./hooks/useQueries";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Tab = "home" | "bouquet" | "letters" | "notes" | "certificate";

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

// ─── Constants ─────────────────────────────────────────────────────────────────
const HEART_EMOJIS = [
  "💖",
  "💕",
  "💗",
  "💓",
  "💞",
  "🌸",
  "✨",
  "💫",
  "🌺",
  "🩷",
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
const PEN_COLORS = [
  "#1a1a2e",
  "#e91e8c",
  "#7c3aed",
  "#0ea5e9",
  "#16a34a",
  "#f59e0b",
  "#ef4444",
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
function formatTimestamp(nanoseconds: bigint): string {
  const ms = Number(nanoseconds / 1_000_000n);
  const date = new Date(ms);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// ─── FloatingHeartsBackground ──────────────────────────────────────────────────
function FloatingHeartsBackground({ count = 12 }: { count?: number }) {
  const [hearts] = useState<FloatingHeart[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: HEART_EMOJIS[i % HEART_EMOJIS.length],
      left: (i / count) * 100 + (i % 3) * 5,
      size: 1.2 + (i % 5) * 0.35,
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

// ─── ConfettiRain ──────────────────────────────────────────────────────────────
function ConfettiRain({ count = 30 }: { count?: number }) {
  const [pieces] = useState<ConfettiPiece[]>(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length],
      left: (i / count) * 100 + (i % 4) * 3,
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

// ─── LoveTimer ────────────────────────────────────────────────────────────────
const TOGETHER_SINCE = new Date("2025-05-21T00:00:00");

function useLoveTimer() {
  const [elapsed, setElapsed] = useState(() => {
    const now = new Date();
    return now.getTime() - TOGETHER_SINCE.getTime();
  });

  useEffect(() => {
    const id = setInterval(() => {
      setElapsed(new Date().getTime() - TOGETHER_SINCE.getTime());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const totalSeconds = Math.floor(elapsed / 1000);
  const seconds = totalSeconds % 60;
  const totalMinutes = Math.floor(totalSeconds / 60);
  const minutes = totalMinutes % 60;
  const totalHours = Math.floor(totalMinutes / 60);
  const hours = totalHours % 24;
  const totalDays = Math.floor(totalHours / 24);
  const years = Math.floor(totalDays / 365);
  const months = Math.floor((totalDays % 365) / 30);
  const days = totalDays % 30;

  return { years, months, days, hours, minutes, seconds };
}

// ─── HomeSection ──────────────────────────────────────────────────────────────
function HomeSection() {
  const { years, months, days, hours, minutes, seconds } = useLoveTimer();

  const units = [
    { label: "Years", value: years },
    { label: "Months", value: months },
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section
      data-ocid="timer.section"
      className="relative min-h-full flex flex-col items-center justify-start px-4 py-8 pb-28 overflow-hidden"
      style={{
        background:
          "linear-gradient(155deg, oklch(0.98 0.02 350) 0%, oklch(0.94 0.05 320) 40%, oklch(0.96 0.03 295) 100%)",
      }}
    >
      <FloatingHeartsBackground count={14} />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Sparkles header */}
        <div className="flex justify-center gap-3 mb-4 text-2xl">
          <span className="sparkle">✨</span>
          <span className="sparkle delay-200">💫</span>
          <span className="sparkle delay-400">⭐</span>
          <span className="sparkle delay-100">💫</span>
          <span className="sparkle delay-300">✨</span>
        </div>

        {/* Main heading */}
        <h1
          className="fade-in-up text-center text-5xl md:text-6xl font-bold mb-2 leading-tight"
          style={{
            fontFamily: "'Pacifico', Georgia, cursive",
            background:
              "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.65 0.2 320), oklch(0.72 0.14 295))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Bishal &amp; Aastha
        </h1>
        <div className="text-center text-3xl mb-1 sparkle">💖</div>

        <p
          className="text-center text-lg mb-6 fade-in-up"
          style={{
            fontFamily: "'Nunito', Georgia, sans-serif",
            fontStyle: "italic",
            color: "oklch(0.52 0.12 330)",
            animationDelay: "0.2s",
          }}
        >
          Together since 21st May 2025 🌸
        </p>

        {/* Couple card */}
        <div
          className="pookie-card p-6 mb-7 text-center fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <div className="text-center">
              <div className="text-4xl mb-1">🐻</div>
              <p
                className="text-base font-bold"
                style={{
                  fontFamily: "'Pacifico', Georgia, cursive",
                  color: "oklch(0.55 0.22 0)",
                }}
              >
                Bishal
              </p>
            </div>
            <div className="text-3xl bounce-gentle">💖</div>
            <div className="text-center">
              <div className="text-4xl mb-1">🌸</div>
              <p
                className="text-base font-bold"
                style={{
                  fontFamily: "'Pacifico', Georgia, cursive",
                  color: "oklch(0.65 0.2 320)",
                }}
              >
                Aastha
              </p>
            </div>
          </div>
          <p
            className="text-sm"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              color: "oklch(0.56 0.1 330)",
              fontStyle: "italic",
            }}
          >
            Every moment with you is my favourite 💕
          </p>
        </div>

        {/* Love Timer */}
        <div
          className="pookie-card p-6 fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          <h2
            className="text-center text-2xl font-bold mb-5"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.72 0.18 295))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Our Love Timer ⏰💕
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {units.map(({ label, value }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center rounded-2xl py-3 px-1"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.96 0.04 340 / 0.8), oklch(0.93 0.05 295 / 0.6))",
                  border: "1.5px solid oklch(0.85 0.08 340 / 0.4)",
                }}
              >
                <span
                  className="text-2xl sm:text-3xl font-black tabular-nums leading-none"
                  style={{
                    fontFamily: "'Nunito', Georgia, sans-serif",
                    background:
                      "linear-gradient(135deg, oklch(0.52 0.22 0), oklch(0.68 0.2 320))",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {String(value).padStart(2, "0")}
                </span>
                <span
                  className="text-xs mt-1 font-semibold"
                  style={{
                    color: "oklch(0.6 0.1 330)",
                    fontFamily: "'Nunito', Georgia, sans-serif",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p
            className="text-center text-sm mt-4"
            style={{
              color: "oklch(0.62 0.1 330)",
              fontFamily: "'Nunito', Georgia, sans-serif",
              fontStyle: "italic",
            }}
          >
            ...and counting forever 🌟
          </p>
        </div>

        {/* Emoji row */}
        <div className="flex justify-center gap-3 text-2xl mt-6">
          <span>🌹</span>
          <span className="sparkle">💖</span>
          <span>🌷</span>
          <span className="sparkle delay-300">💕</span>
          <span>🌸</span>
          <span className="sparkle delay-200">💗</span>
          <span>🌺</span>
        </div>
      </div>
    </section>
  );
}

// ─── BouquetSection ───────────────────────────────────────────────────────────
function BouquetSection() {
  const { data: bouquetAastha } = useGetBouquetForAastha();
  const { data: bouquetBishal } = useGetBouquetForBishal();
  const addForAastha = useAddFlowersForAastha();
  const addForBishal = useAddFlowersForBishal();

  const [bishalPicks, setBishalPicks] = useState<string[]>([]);
  const [aasthaPicks, setAasthaPicks] = useState<string[]>([]);

  // Load existing bouquets into local state
  useEffect(() => {
    if (bouquetAastha?.flowers?.length) setBishalPicks(bouquetAastha.flowers);
  }, [bouquetAastha]);

  useEffect(() => {
    if (bouquetBishal?.flowers?.length) setAasthaPicks(bouquetBishal.flowers);
  }, [bouquetBishal]);

  const handleSaveBishal = async () => {
    try {
      await addForAastha.mutateAsync(bishalPicks);
      toast.success("Bishal's bouquet saved for Aastha! 🌹");
    } catch {
      toast.error("Failed to save bouquet 😢");
    }
  };

  const handleSaveAastha = async () => {
    try {
      await addForBishal.mutateAsync(aasthaPicks);
      toast.success("Aastha's bouquet saved for Bishal! 🌻");
    } catch {
      toast.error("Failed to save bouquet 😢");
    }
  };

  return (
    <section
      className="min-h-full px-4 py-8 pb-28 overflow-auto"
      style={{
        background:
          "linear-gradient(155deg, oklch(0.97 0.025 350) 0%, oklch(0.93 0.05 330) 50%, oklch(0.96 0.03 295) 100%)",
      }}
    >
      <FloatingHeartsBackground count={8} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-6 fade-in-up">
          <div className="text-3xl mb-2">💐✨💐</div>
          <h2
            className="text-4xl font-bold mb-1"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.68 0.2 320))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Build a Bouquet 💐
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              color: "oklch(0.55 0.1 330)",
              fontStyle: "italic",
            }}
          >
            Pick flowers and surprise each other 🌸
          </p>
        </div>

        {/* Two bouquet builders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bishal's bouquet for Aastha */}
          <div className="pookie-card p-5">
            <h3
              className="text-lg font-bold text-center mb-3"
              style={{
                fontFamily: "'Pacifico', Georgia, cursive",
                background:
                  "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.7 0.2 320))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Bishal's for Aastha 🌹
            </h3>
            {/* Preview */}
            <div className="bouquet-preview p-3 mb-3 min-h-[80px] flex flex-wrap gap-1 items-center justify-center">
              {bishalPicks.length === 0 ? (
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.08 330)", fontStyle: "italic" }}
                >
                  Pick flowers below 👇
                </p>
              ) : (
                bishalPicks.map((f, i) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: bouquet items can repeat
                    key={`bp-${f}-${i}`}
                    type="button"
                    onClick={() =>
                      setBishalPicks((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                    className="text-2xl hover:opacity-60 transition-opacity"
                    title="Remove"
                  >
                    {f}
                  </button>
                ))
              )}
            </div>
            {/* Flower grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {FLOWERS.map((fl) => (
                <button
                  type="button"
                  key={fl.emoji}
                  onClick={() => setBishalPicks((prev) => [...prev, fl.emoji])}
                  className="pookie-card p-2 text-center hover:scale-105 transition-transform cursor-pointer border-0"
                >
                  <span className="text-2xl block">{fl.emoji}</span>
                  <span
                    className="text-xs"
                    style={{
                      color: "oklch(0.55 0.1 330)",
                      fontFamily: "'Nunito', Georgia, sans-serif",
                    }}
                  >
                    {fl.name}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              data-ocid="bouquet.bishal.primary_button"
              onClick={handleSaveBishal}
              disabled={bishalPicks.length === 0 || addForAastha.isPending}
              className="btn-pookie w-full text-sm font-bold"
              style={{ opacity: bishalPicks.length === 0 ? 0.5 : 1 }}
            >
              {addForAastha.isPending ? "Saving... 💾" : "Save Bouquet 💕"}
            </button>
          </div>

          {/* Aastha's bouquet for Bishal */}
          <div className="pookie-card p-5">
            <h3
              className="text-lg font-bold text-center mb-3"
              style={{
                fontFamily: "'Pacifico', Georgia, cursive",
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 295), oklch(0.75 0.18 260))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Aastha's for Bishal 🌻
            </h3>
            {/* Preview */}
            <div className="bouquet-preview p-3 mb-3 min-h-[80px] flex flex-wrap gap-1 items-center justify-center">
              {aasthaPicks.length === 0 ? (
                <p
                  className="text-sm"
                  style={{ color: "oklch(0.65 0.08 330)", fontStyle: "italic" }}
                >
                  Pick flowers below 👇
                </p>
              ) : (
                aasthaPicks.map((f, i) => (
                  <button
                    // biome-ignore lint/suspicious/noArrayIndexKey: bouquet items can repeat
                    key={`ap-${f}-${i}`}
                    type="button"
                    onClick={() =>
                      setAasthaPicks((prev) =>
                        prev.filter((_, idx) => idx !== i),
                      )
                    }
                    className="text-2xl hover:opacity-60 transition-opacity"
                    title="Remove"
                  >
                    {f}
                  </button>
                ))
              )}
            </div>
            {/* Flower grid */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {FLOWERS.map((fl) => (
                <button
                  type="button"
                  key={fl.emoji}
                  onClick={() => setAasthaPicks((prev) => [...prev, fl.emoji])}
                  className="pookie-card p-2 text-center hover:scale-105 transition-transform cursor-pointer border-0"
                >
                  <span className="text-2xl block">{fl.emoji}</span>
                  <span
                    className="text-xs"
                    style={{
                      color: "oklch(0.55 0.1 330)",
                      fontFamily: "'Nunito', Georgia, sans-serif",
                    }}
                  >
                    {fl.name}
                  </span>
                </button>
              ))}
            </div>
            <button
              type="button"
              data-ocid="bouquet.aastha.primary_button"
              onClick={handleSaveAastha}
              disabled={aasthaPicks.length === 0 || addForBishal.isPending}
              className="btn-pookie w-full text-sm font-bold"
              style={{
                opacity: aasthaPicks.length === 0 ? 0.5 : 1,
                background:
                  "linear-gradient(135deg, oklch(0.65 0.2 295), oklch(0.72 0.18 260))",
              }}
            >
              {addForBishal.isPending ? "Saving... 💾" : "Save Bouquet 💕"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── LettersSection ───────────────────────────────────────────────────────────
function LettersSection() {
  const { data: letters = [], isLoading } = useGetAllLetters();
  const addLetter = useAddLetter();
  const deleteLetter = useDeleteLetter();

  const [author, setAuthor] = useState<"Bishal" | "Aastha">("Bishal");
  const [content, setContent] = useState("");

  const handleSend = async () => {
    if (!content.trim()) {
      toast.error("Write something first! 💌");
      return;
    }
    try {
      await addLetter.mutateAsync({ author, content: content.trim() });
      setContent("");
      toast.success(`${author}'s letter sent! 💌`);
    } catch {
      toast.error("Couldn't send letter 😢");
    }
  };

  return (
    <section
      className="min-h-full px-4 py-8 pb-28 overflow-auto"
      style={{
        background:
          "linear-gradient(155deg, oklch(0.98 0.02 340) 0%, oklch(0.93 0.05 320) 50%, oklch(0.96 0.03 295) 100%)",
      }}
    >
      <FloatingHeartsBackground count={8} />
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-6 fade-in-up">
          <div className="text-3xl mb-1 sparkle">💌</div>
          <h2
            className="text-4xl font-bold"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.72 0.2 295))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Love Letters 💌
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              color: "oklch(0.55 0.1 330)",
              fontStyle: "italic",
            }}
          >
            Write sweet notes to each other 🌸
          </p>
        </div>

        {/* Compose */}
        <div
          className="pookie-card p-5 mb-6 fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <h3
            className="text-lg font-bold mb-3"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              color: "oklch(0.45 0.14 330)",
            }}
          >
            Write a Letter ✍️
          </h3>
          {/* Author toggle */}
          <div className="flex gap-3 mb-3" data-ocid="letters.author.toggle">
            {(["Bishal", "Aastha"] as const).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setAuthor(name)}
                className="flex-1 py-2 rounded-2xl font-bold text-sm transition-all"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  background:
                    author === name
                      ? name === "Bishal"
                        ? "linear-gradient(135deg, oklch(0.62 0.22 0), oklch(0.72 0.2 320))"
                        : "linear-gradient(135deg, oklch(0.65 0.18 295), oklch(0.72 0.16 260))"
                      : "oklch(0.95 0.02 340)",
                  color: author === name ? "white" : "oklch(0.55 0.1 330)",
                  border:
                    author === name
                      ? "none"
                      : "1.5px solid oklch(0.85 0.06 330)",
                  transform: author === name ? "scale(1.03)" : "scale(1)",
                }}
              >
                {name === "Bishal" ? "🐻 Bishal" : "🌸 Aastha"}
              </button>
            ))}
          </div>
          {/* Textarea */}
          <textarea
            data-ocid="letters.textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`Dear ${author === "Bishal" ? "Aastha" : "Bishal"}, I wanted to say... 💕`}
            rows={5}
            className="w-full rounded-2xl p-3 resize-none outline-none focus:ring-2"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              fontSize: "0.95rem",
              background: "oklch(0.99 0.01 340)",
              border: "1.5px solid oklch(0.88 0.05 330)",
              color: "oklch(0.32 0.08 340)",
            }}
          />
          <button
            type="button"
            data-ocid="letters.submit_button"
            onClick={handleSend}
            disabled={addLetter.isPending || !content.trim()}
            className="btn-pookie mt-3 w-full font-bold text-sm"
            style={{ opacity: !content.trim() ? 0.5 : 1 }}
          >
            {addLetter.isPending ? "Sending... 💌" : "Send Letter 💌"}
          </button>
        </div>

        {/* Letters list */}
        {isLoading && (
          <div data-ocid="letters.loading_state" className="text-center py-10">
            <span className="text-3xl sparkle">💌</span>
            <p
              style={{
                color: "oklch(0.6 0.1 330)",
                fontFamily: "'Nunito', Georgia, sans-serif",
                fontStyle: "italic",
              }}
            >
              Loading love letters...
            </p>
          </div>
        )}

        {!isLoading && letters.length === 0 && (
          <div
            data-ocid="letters.empty_state"
            className="pookie-card p-8 text-center"
          >
            <div className="text-5xl mb-3">💌</div>
            <p
              style={{
                color: "oklch(0.6 0.1 330)",
                fontFamily: "'Nunito', Georgia, sans-serif",
                fontStyle: "italic",
              }}
            >
              No letters yet... be the first to write! 🌸
            </p>
          </div>
        )}

        <div className="space-y-4">
          {letters.map((letter, index) => {
            const ocidItem =
              index === 0
                ? "letters.item.1"
                : index === 1
                  ? "letters.item.2"
                  : (`letters.item.${index + 1}` as const);
            const ocidDel =
              index === 0
                ? "letters.delete_button.1"
                : index === 1
                  ? "letters.delete_button.2"
                  : (`letters.delete_button.${index + 1}` as const);
            const isBishal = letter.author === "Bishal";
            return (
              <div
                key={String(letter.id)}
                data-ocid={ocidItem}
                className="pookie-card p-5 fade-in-up"
                style={{
                  background: isBishal
                    ? "linear-gradient(135deg, oklch(0.97 0.03 0 / 0.95), oklch(0.94 0.05 340 / 0.9))"
                    : "linear-gradient(135deg, oklch(0.97 0.03 295 / 0.95), oklch(0.94 0.04 280 / 0.9))",
                  borderColor: isBishal
                    ? "oklch(0.85 0.1 0 / 0.4)"
                    : "oklch(0.82 0.08 295 / 0.4)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className="font-bold text-sm"
                    style={{
                      fontFamily: "'Nunito', Georgia, sans-serif",
                      color: isBishal
                        ? "oklch(0.52 0.22 0)"
                        : "oklch(0.52 0.18 295)",
                    }}
                  >
                    {isBishal ? "🐻 Bishal" : "🌸 Aastha"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs"
                      style={{
                        color: "oklch(0.65 0.06 330)",
                        fontFamily: "'Nunito', Georgia, sans-serif",
                      }}
                    >
                      {formatTimestamp(letter.timestamp)}
                    </span>
                    <button
                      type="button"
                      data-ocid={ocidDel}
                      onClick={() => deleteLetter.mutate(letter.id)}
                      className="text-lg hover:scale-110 transition-transform"
                      title="Delete letter"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <p
                  className="leading-relaxed"
                  style={{
                    fontFamily: "'Nunito', Georgia, sans-serif",
                    color: "oklch(0.38 0.08 340)",
                    fontStyle: "italic",
                    fontSize: "0.95rem",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {letter.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── NotesSection ─────────────────────────────────────────────────────────────
function NotesSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const [penColor, setPenColor] = useState(PEN_COLORS[0]);
  const [penSize, setPenSize] = useState(3);
  const [author, setAuthor] = useState<"Bishal" | "Aastha">("Bishal");
  const [caption, setCaption] = useState("");

  const { data: notes = [], isLoading } = useGetAllHandwrittenNotes();
  const addNote = useAddHandwrittenNote();
  const deleteNote = useDeleteHandwrittenNote();

  const getPos = useCallback(
    (e: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if ("touches" in e) {
        const t = e.touches[0];
        return {
          x: (t.clientX - rect.left) * scaleX,
          y: (t.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Initialize white background
    ctx.fillStyle = "#fff9fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const onStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      isDrawing.current = true;
      lastPos.current = getPos(e, canvas);
    };

    const onMove = (e: MouseEvent | TouchEvent) => {
      e.preventDefault();
      if (!isDrawing.current || !lastPos.current) return;
      const pos = getPos(e, canvas);
      ctx.beginPath();
      ctx.moveTo(lastPos.current.x, lastPos.current.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.strokeStyle = penColor;
      ctx.lineWidth = penSize;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      lastPos.current = pos;
    };

    const onEnd = () => {
      isDrawing.current = false;
      lastPos.current = null;
    };

    canvas.addEventListener("mousedown", onStart);
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseup", onEnd);
    canvas.addEventListener("mouseleave", onEnd);
    canvas.addEventListener("touchstart", onStart, { passive: false });
    canvas.addEventListener("touchmove", onMove, { passive: false });
    canvas.addEventListener("touchend", onEnd);

    return () => {
      canvas.removeEventListener("mousedown", onStart);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseup", onEnd);
      canvas.removeEventListener("mouseleave", onEnd);
      canvas.removeEventListener("touchstart", onStart);
      canvas.removeEventListener("touchmove", onMove);
      canvas.removeEventListener("touchend", onEnd);
    };
  }, [penColor, penSize, getPos]);

  const handleClear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#fff9fb";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const handleSave = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const imageData = canvas.toDataURL("image/png");
    try {
      await addNote.mutateAsync({ author, imageData, caption: caption.trim() });
      setCaption("");
      handleClear();
      toast.success(`${author}'s note saved! ✏️`);
    } catch {
      toast.error("Failed to save note 😢");
    }
  };

  return (
    <section
      className="min-h-full px-4 py-8 pb-28 overflow-auto"
      style={{
        background:
          "linear-gradient(155deg, oklch(0.98 0.015 295) 0%, oklch(0.94 0.04 320) 50%, oklch(0.97 0.02 350) 100%)",
      }}
    >
      <FloatingHeartsBackground count={6} />
      <div className="relative z-10 max-w-xl mx-auto">
        <div className="text-center mb-6 fade-in-up">
          <div className="text-3xl mb-1">✏️💕</div>
          <h2
            className="text-4xl font-bold"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.7 0.18 295))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Handwritten Notes ✏️
          </h2>
          <p
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              color: "oklch(0.55 0.1 330)",
              fontStyle: "italic",
            }}
          >
            Draw sweet notes for each other 💕
          </p>
        </div>

        <div
          className="pookie-card p-5 mb-6 fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Author toggle */}
          <div className="flex gap-3 mb-3">
            {(["Bishal", "Aastha"] as const).map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setAuthor(name)}
                className="flex-1 py-2 rounded-2xl font-bold text-sm transition-all"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  background:
                    author === name
                      ? name === "Bishal"
                        ? "linear-gradient(135deg, oklch(0.62 0.22 0), oklch(0.72 0.2 320))"
                        : "linear-gradient(135deg, oklch(0.65 0.18 295), oklch(0.72 0.16 260))"
                      : "oklch(0.95 0.02 340)",
                  color: author === name ? "white" : "oklch(0.55 0.1 330)",
                  border:
                    author === name
                      ? "none"
                      : "1.5px solid oklch(0.85 0.06 330)",
                }}
              >
                {name === "Bishal" ? "🐻 Bishal" : "🌸 Aastha"}
              </button>
            ))}
          </div>

          {/* Canvas */}
          <div className="relative mb-3">
            <canvas
              ref={canvasRef}
              data-ocid="notes.canvas_target"
              width={600}
              height={300}
              className="w-full rounded-2xl cursor-crosshair"
              style={{
                border: "2px dashed oklch(0.78 0.12 330 / 0.5)",
                background: "#fff9fb",
                touchAction: "none",
              }}
            />
          </div>

          {/* Controls row */}
          <div className="flex flex-wrap gap-3 items-center mb-3">
            {/* Pen colors */}
            <div className="flex gap-2 items-center">
              <span
                className="text-xs font-semibold"
                style={{
                  color: "oklch(0.55 0.1 330)",
                  fontFamily: "'Nunito', Georgia, sans-serif",
                }}
              >
                Pen:
              </span>
              {PEN_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  onClick={() => setPenColor(c)}
                  className="w-6 h-6 rounded-full border-2 transition-transform hover:scale-110"
                  style={{
                    background: c,
                    borderColor:
                      penColor === c ? "oklch(0.4 0.12 330)" : "transparent",
                    transform: penColor === c ? "scale(1.3)" : "scale(1)",
                  }}
                />
              ))}
            </div>
            {/* Size */}
            <div className="flex gap-2 items-center flex-1 min-w-[120px]">
              <span
                className="text-xs font-semibold"
                style={{
                  color: "oklch(0.55 0.1 330)",
                  fontFamily: "'Nunito', Georgia, sans-serif",
                }}
              >
                Size:
              </span>
              <input
                type="range"
                min={1}
                max={16}
                value={penSize}
                onChange={(e) => setPenSize(Number(e.target.value))}
                className="flex-1 accent-pink-400"
              />
              <span
                className="text-xs tabular-nums"
                style={{ color: "oklch(0.55 0.1 330)" }}
              >
                {penSize}px
              </span>
            </div>
            {/* Clear */}
            <button
              type="button"
              data-ocid="notes.clear_button"
              onClick={handleClear}
              className="py-1 px-3 rounded-2xl text-sm font-semibold transition-all hover:scale-105"
              style={{
                background: "oklch(0.95 0.03 0 / 0.8)",
                border: "1.5px solid oklch(0.8 0.12 0 / 0.4)",
                color: "oklch(0.52 0.18 0)",
                fontFamily: "'Nunito', Georgia, sans-serif",
              }}
            >
              🗑️ Clear
            </button>
          </div>

          {/* Caption */}
          <input
            type="text"
            data-ocid="notes.caption.input"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Add a cute caption... 💕"
            className="w-full rounded-2xl px-3 py-2 mb-3 outline-none"
            style={{
              fontFamily: "'Nunito', Georgia, sans-serif",
              fontSize: "0.9rem",
              background: "oklch(0.99 0.01 340)",
              border: "1.5px solid oklch(0.88 0.05 330)",
              color: "oklch(0.32 0.08 340)",
            }}
          />

          {/* Save */}
          <button
            type="button"
            data-ocid="notes.save_button"
            onClick={handleSave}
            disabled={addNote.isPending}
            className="btn-pookie w-full font-bold text-sm"
          >
            {addNote.isPending ? "Saving... 💾" : "Save Note ✏️💕"}
          </button>
        </div>

        {/* Notes gallery */}
        {isLoading && (
          <div data-ocid="notes.loading_state" className="text-center py-10">
            <span className="text-3xl sparkle">✏️</span>
            <p
              style={{
                color: "oklch(0.6 0.1 330)",
                fontFamily: "'Nunito', Georgia, sans-serif",
                fontStyle: "italic",
              }}
            >
              Loading your notes...
            </p>
          </div>
        )}

        {!isLoading && notes.length === 0 && (
          <div
            data-ocid="notes.empty_state"
            className="pookie-card p-8 text-center"
          >
            <div className="text-5xl mb-3">✏️</div>
            <p
              style={{
                color: "oklch(0.6 0.1 330)",
                fontFamily: "'Nunito', Georgia, sans-serif",
                fontStyle: "italic",
              }}
            >
              No notes yet! Draw the first one 🌸
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {notes.map((note, index) => {
            const ocidItem =
              index === 0
                ? "notes.item.1"
                : (`notes.item.${index + 1}` as const);
            const ocidDel =
              index === 0
                ? "notes.delete_button.1"
                : (`notes.delete_button.${index + 1}` as const);
            return (
              <div
                key={String(note.id)}
                data-ocid={ocidItem}
                className="fade-in-up"
                style={{
                  background: "white",
                  borderRadius: "1rem",
                  padding: "10px",
                  paddingBottom: "14px",
                  boxShadow:
                    "0 4px 20px oklch(0.62 0.22 0 / 0.12), 0 8px 30px rgba(0,0,0,0.06)",
                  border: "2px solid oklch(0.92 0.04 340)",
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <img
                  src={note.imageData}
                  alt={note.caption || "Note"}
                  className="w-full rounded-xl mb-2"
                  style={{ aspectRatio: "2/1", objectFit: "cover" }}
                />
                {note.caption && (
                  <p
                    className="text-xs text-center font-semibold mb-1"
                    style={{
                      color: "oklch(0.45 0.14 330)",
                      fontFamily: "'Nunito', Georgia, sans-serif",
                      fontStyle: "italic",
                    }}
                  >
                    {note.caption}
                  </p>
                )}
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{
                      color: "oklch(0.62 0.1 330)",
                      fontFamily: "'Nunito', Georgia, sans-serif",
                    }}
                  >
                    {note.author === "Bishal" ? "🐻" : "🌸"} {note.author}
                  </span>
                  <button
                    type="button"
                    data-ocid={ocidDel}
                    onClick={() => deleteNote.mutate(note.id)}
                    className="text-sm hover:scale-110 transition-transform"
                    title="Delete note"
                  >
                    🗑️
                  </button>
                </div>
                <p
                  className="text-xs text-center mt-1"
                  style={{
                    color: "oklch(0.72 0.04 330)",
                    fontFamily: "'Nunito', Georgia, sans-serif",
                  }}
                >
                  {formatTimestamp(note.timestamp)}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── CertificateSection ───────────────────────────────────────────────────────
function CertificateSection() {
  const { data: cert, isLoading } = useGetWeddingCertificate();
  const setDate = useSetWeddingDate();
  const signBishal = useSignWeddingCertificateAsBishal();
  const signAastha = useSignWeddingCertificateAsAastha();

  const [weddingDate, setWeddingDate] = useState(cert?.weddingDate || "");

  useEffect(() => {
    if (cert?.weddingDate) setWeddingDate(cert.weddingDate);
  }, [cert?.weddingDate]);

  const bothSigned = cert?.bishalSigned && cert?.aasthaSigned;

  const handleDateChange = async (newDate: string) => {
    setWeddingDate(newDate);
    if (newDate) {
      try {
        await setDate.mutateAsync(newDate);
        toast.success("Wedding date set! 💍");
      } catch {
        toast.error("Couldn't save date 😢");
      }
    }
  };

  const handleSignBishal = async () => {
    try {
      await signBishal.mutateAsync();
      toast.success("Bishal says I Do! 💍");
    } catch {
      toast.error("Couldn't sign 😢");
    }
  };

  const handleSignAastha = async () => {
    try {
      await signAastha.mutateAsync();
      toast.success("Aastha says I Do! 💍");
    } catch {
      toast.error("Couldn't sign 😢");
    }
  };

  return (
    <section
      className="min-h-full px-4 py-8 pb-28 overflow-auto"
      style={{
        background:
          "linear-gradient(155deg, oklch(0.97 0.025 60) 0%, oklch(0.94 0.04 340) 40%, oklch(0.96 0.03 295) 100%)",
      }}
    >
      {bothSigned && <ConfettiRain count={25} />}
      <FloatingHeartsBackground count={10} />

      <div className="relative z-10 max-w-2xl mx-auto">
        <div className="text-center mb-6 fade-in-up">
          <div className="text-3xl mb-1">
            <span className="sparkle">💍</span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: "'Pacifico', Georgia, cursive",
              background:
                "linear-gradient(135deg, oklch(0.55 0.22 0), oklch(0.72 0.18 80))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Certificate of Love 💍
          </h2>
        </div>

        {/* Both signed celebration */}
        {bothSigned && (
          <div
            className="pookie-card p-6 mb-6 text-center fade-in-up"
            style={{
              background:
                "linear-gradient(135deg, oklch(0.94 0.08 80 / 0.95), oklch(0.92 0.07 340 / 0.9))",
              border: "2px solid oklch(0.82 0.14 80 / 0.5)",
            }}
          >
            <div className="text-5xl mb-2">🎉💒✨</div>
            <p
              className="text-2xl font-bold"
              style={{
                fontFamily: "'Pacifico', Georgia, cursive",
                background:
                  "linear-gradient(135deg, oklch(0.52 0.22 0), oklch(0.6 0.18 80))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              We&apos;re Official! 💒✨
            </p>
            <p
              style={{
                fontFamily: "'Nunito', Georgia, sans-serif",
                color: "oklch(0.45 0.14 340)",
                fontStyle: "italic",
              }}
            >
              Bishal & Aastha — forever and always 💖
            </p>
          </div>
        )}

        {/* Certificate */}
        <div
          className="fade-in-up"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.99 0.015 60), oklch(0.98 0.02 340))",
            border: "3px solid oklch(0.82 0.14 80 / 0.7)",
            borderRadius: "2rem",
            padding: "2rem",
            boxShadow:
              "0 8px 40px oklch(0.82 0.14 80 / 0.2), inset 0 0 60px oklch(0.98 0.02 60 / 0.5)",
            position: "relative",
            overflow: "hidden",
            animationDelay: "0.3s",
          }}
        >
          {/* Decorative corner hearts */}
          {[
            "top-3 left-4",
            "top-3 right-4",
            "bottom-3 left-4",
            "bottom-3 right-4",
          ].map((pos, i) => (
            <span
              key={pos}
              className={`absolute ${pos} text-2xl opacity-60 sparkle`}
              style={{ animationDelay: `${i * 0.3}s` }}
            >
              💖
            </span>
          ))}

          {/* Title */}
          <div className="text-center mb-4">
            <div className="flex justify-center gap-3 text-xl mb-2">
              <span>🌸</span>
              <span className="sparkle">💍</span>
              <span>🌸</span>
            </div>
            <h3
              className="text-2xl md:text-3xl font-bold mb-1"
              style={{
                fontFamily: "'Pacifico', Georgia, cursive",
                background:
                  "linear-gradient(135deg, oklch(0.52 0.2 0), oklch(0.65 0.18 80))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Certificate of Love &amp; Eternal Bond
            </h3>
            <p
              className="text-sm italic"
              style={{
                color: "oklch(0.56 0.12 330)",
                fontFamily: "'Nunito', Georgia, sans-serif",
              }}
            >
              We promise to love each other forever and ever 🌟
            </p>
          </div>

          {/* Decorative line */}
          <div
            className="w-full my-4"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, oklch(0.82 0.14 80), oklch(0.72 0.2 320), transparent)",
            }}
          />

          {/* Names */}
          <div className="flex items-center justify-center gap-6 mb-5">
            <div className="text-center">
              <div className="text-3xl mb-1">🐻</div>
              <p
                className="text-xl font-bold"
                style={{
                  fontFamily: "'Pacifico', Georgia, cursive",
                  color: "oklch(0.52 0.22 0)",
                }}
              >
                Bishal Dey
              </p>
              <p
                className="text-xs"
                style={{
                  color: "oklch(0.65 0.1 0)",
                  fontFamily: "'Nunito', Georgia, sans-serif",
                }}
              >
                Groom
              </p>
              {cert?.bishalSigned && (
                <div
                  className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "oklch(0.92 0.08 130 / 0.8)",
                    color: "oklch(0.35 0.18 140)",
                    border: "1.5px solid oklch(0.75 0.18 140 / 0.5)",
                  }}
                >
                  ✅ Signed
                </div>
              )}
            </div>
            <div className="text-3xl bounce-gentle">💍</div>
            <div className="text-center">
              <div className="text-3xl mb-1">🌸</div>
              <p
                className="text-xl font-bold"
                style={{
                  fontFamily: "'Pacifico', Georgia, cursive",
                  color: "oklch(0.55 0.2 320)",
                }}
              >
                Aastha Sarkar
              </p>
              <p
                className="text-xs"
                style={{
                  color: "oklch(0.65 0.1 320)",
                  fontFamily: "'Nunito', Georgia, sans-serif",
                }}
              >
                Bride
              </p>
              {cert?.aasthaSigned && (
                <div
                  className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    background: "oklch(0.92 0.08 130 / 0.8)",
                    color: "oklch(0.35 0.18 140)",
                    border: "1.5px solid oklch(0.75 0.18 140 / 0.5)",
                  }}
                >
                  ✅ Signed
                </div>
              )}
            </div>
          </div>

          {/* Wedding date */}
          <div className="text-center mb-5">
            <label
              htmlFor="wedding-date-input"
              className="block text-sm font-bold mb-2"
              style={{
                color: "oklch(0.52 0.14 330)",
                fontFamily: "'Nunito', Georgia, sans-serif",
              }}
            >
              💒 Wedding Date
            </label>
            <input
              id="wedding-date-input"
              type="date"
              data-ocid="certificate.date.input"
              value={weddingDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="rounded-2xl px-4 py-2 outline-none text-center"
              style={{
                fontFamily: "'Nunito', Georgia, sans-serif",
                background: "oklch(0.99 0.01 60)",
                border: "2px solid oklch(0.82 0.12 80 / 0.5)",
                color: "oklch(0.38 0.1 340)",
                fontSize: "1rem",
              }}
            />
            {weddingDate && (
              <p
                className="text-xs mt-1"
                style={{
                  color: "oklch(0.62 0.1 330)",
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  fontStyle: "italic",
                }}
              >
                {new Date(weddingDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
                🌸
              </p>
            )}
          </div>

          {/* Decorative line */}
          <div
            className="w-full mb-5"
            style={{
              height: "2px",
              background:
                "linear-gradient(90deg, transparent, oklch(0.82 0.14 80), oklch(0.72 0.2 320), transparent)",
            }}
          />

          {/* Sign buttons */}
          {isLoading ? (
            <div
              data-ocid="certificate.loading_state"
              className="text-center py-4"
            >
              <span className="text-2xl sparkle">💍</span>
              <p
                style={{
                  color: "oklch(0.6 0.1 330)",
                  fontFamily: "'Nunito', Georgia, sans-serif",
                }}
              >
                Loading...
              </p>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                type="button"
                data-ocid="certificate.bishal.primary_button"
                onClick={handleSignBishal}
                disabled={signBishal.isPending || cert?.bishalSigned}
                className="btn-pookie font-bold text-sm flex-1 sm:flex-none sm:px-6"
                style={{
                  opacity: cert?.bishalSigned ? 0.6 : 1,
                  cursor: cert?.bishalSigned ? "not-allowed" : "pointer",
                }}
              >
                {cert?.bishalSigned
                  ? "Bishal Signed 💍✅"
                  : signBishal.isPending
                    ? "Signing... 💍"
                    : "Bishal Says I Do 💍"}
              </button>
              <button
                type="button"
                data-ocid="certificate.aastha.primary_button"
                onClick={handleSignAastha}
                disabled={signAastha.isPending || cert?.aasthaSigned}
                className="btn-pookie font-bold text-sm flex-1 sm:flex-none sm:px-6"
                style={{
                  opacity: cert?.aasthaSigned ? 0.6 : 1,
                  cursor: cert?.aasthaSigned ? "not-allowed" : "pointer",
                  background:
                    "linear-gradient(135deg, oklch(0.65 0.18 295), oklch(0.72 0.16 260))",
                }}
              >
                {cert?.aasthaSigned
                  ? "Aastha Signed 💍✅"
                  : signAastha.isPending
                    ? "Signing... 💍"
                    : "Aastha Says I Do 💍"}
              </button>
            </div>
          )}

          {/* Signed timestamps */}
          {(cert?.bishalSignedAt || cert?.aasthaSignedAt) && (
            <div className="mt-4 space-y-1">
              {cert?.bishalSignedAt && (
                <p
                  className="text-xs text-center"
                  style={{
                    color: "oklch(0.6 0.1 330)",
                    fontFamily: "'Nunito', Georgia, sans-serif",
                  }}
                >
                  🐻 Bishal signed on {formatTimestamp(cert.bishalSignedAt)}
                </p>
              )}
              {cert?.aasthaSignedAt && (
                <p
                  className="text-xs text-center"
                  style={{
                    color: "oklch(0.6 0.1 295)",
                    fontFamily: "'Nunito', Georgia, sans-serif",
                  }}
                >
                  🌸 Aastha signed on {formatTimestamp(cert.aasthaSignedAt)}
                </p>
              )}
            </div>
          )}

          <div className="flex justify-center gap-3 text-xl mt-4">
            <span className="sparkle">🌹</span>
            <span className="sparkle delay-100">💍</span>
            <span className="sparkle delay-200">🌸</span>
            <span className="sparkle delay-300">💖</span>
            <span className="sparkle delay-400">🌷</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────
const NAV_ITEMS: { tab: Tab; emoji: string; label: string; ocid: string }[] = [
  { tab: "home", emoji: "🏠", label: "Home", ocid: "nav.home.tab" },
  { tab: "bouquet", emoji: "💐", label: "Bouquet", ocid: "nav.bouquet.tab" },
  { tab: "letters", emoji: "💌", label: "Letters", ocid: "nav.letters.tab" },
  { tab: "notes", emoji: "✏️", label: "Notes", ocid: "nav.notes.tab" },
  {
    tab: "certificate",
    emoji: "💍",
    label: "Certificate",
    ocid: "nav.certificate.tab",
  },
];

function BottomNav({
  active,
  onSelect,
}: {
  active: Tab;
  onSelect: (t: Tab) => void;
}) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50"
      style={{
        background:
          "linear-gradient(90deg, oklch(0.98 0.02 350 / 0.97), oklch(0.96 0.04 320 / 0.97))",
        backdropFilter: "blur(16px)",
        borderTop: "1.5px solid oklch(0.88 0.07 330 / 0.5)",
        boxShadow: "0 -4px 20px oklch(0.62 0.22 0 / 0.1)",
      }}
    >
      <div className="flex items-center justify-around max-w-lg mx-auto py-2 px-2">
        {NAV_ITEMS.map(({ tab, emoji, label, ocid }) => {
          const isActive = active === tab;
          return (
            <button
              key={tab}
              type="button"
              data-ocid={ocid}
              onClick={() => onSelect(tab)}
              className="flex flex-col items-center justify-center px-2 py-1 rounded-2xl transition-all duration-200"
              style={{
                background: isActive
                  ? "linear-gradient(135deg, oklch(0.62 0.22 0 / 0.15), oklch(0.72 0.18 320 / 0.1))"
                  : "transparent",
                transform: isActive
                  ? "scale(1.08) translateY(-2px)"
                  : "scale(1)",
                minWidth: "56px",
              }}
            >
              <span
                className="text-2xl leading-none mb-0.5"
                style={{
                  filter: isActive
                    ? "drop-shadow(0 2px 4px oklch(0.62 0.22 0 / 0.4))"
                    : "none",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                  display: "block",
                  transition: "all 0.2s ease",
                }}
              >
                {emoji}
              </span>
              <span
                className="text-xs font-semibold leading-none"
                style={{
                  fontFamily: "'Nunito', Georgia, sans-serif",
                  color: isActive
                    ? "oklch(0.52 0.22 0)"
                    : "oklch(0.62 0.08 330)",
                  fontWeight: isActive ? 800 : 600,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

// ─── App Root ──────────────────────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");

  return (
    <div
      className="relative min-h-screen"
      style={{ overscrollBehavior: "none" }}
    >
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            fontFamily: "'Nunito', Georgia, sans-serif",
            background: "oklch(0.99 0.01 340)",
            border: "1.5px solid oklch(0.85 0.08 330)",
            color: "oklch(0.35 0.1 330)",
            borderRadius: "1.5rem",
          },
        }}
      />

      {/* Main scrollable area */}
      <main className="min-h-screen overflow-y-auto">
        {activeTab === "home" && <HomeSection />}
        {activeTab === "bouquet" && <BouquetSection />}
        {activeTab === "letters" && <LettersSection />}
        {activeTab === "notes" && <NotesSection />}
        {activeTab === "certificate" && <CertificateSection />}
      </main>

      {/* Bottom navigation */}
      <BottomNav active={activeTab} onSelect={setActiveTab} />

      {/* Footer */}
      <footer
        className="fixed bottom-[62px] left-0 right-0 text-center text-xs z-40 pointer-events-none"
        style={{ color: "oklch(0.7 0.08 330 / 0.6)" }}
      >
        <span className="pointer-events-auto">
          © {new Date().getFullYear()} Built with{" "}
          <span style={{ color: "oklch(0.62 0.22 0)" }}>💕</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "oklch(0.62 0.22 0)", textDecoration: "underline" }}
          >
            caffeine.ai
          </a>
        </span>
      </footer>
    </div>
  );
}
