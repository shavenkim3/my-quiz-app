"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const flowers = ["🌸", "🌼", "🌺", "🌻", "💐", "☁️", "🌷", "🍃"];

type FlowerItem = {
  id: number;
  emoji: string;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
};

export default function Home() {
  const router = useRouter();
  const [flowerItems, setFlowerItems] = useState<FlowerItem[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleStart = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isAnimating) return;

    window.dispatchEvent(new Event("play-music"));
    setIsAnimating(true);

    const btn = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(btn.clientWidth, btn.clientHeight);

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - btn.getBoundingClientRect().left - diameter / 2}px`;
    circle.style.top = `${e.clientY - btn.getBoundingClientRect().top - diameter / 2}px`;
    circle.className = "ripple";

    btn.appendChild(circle);

    setTimeout(() => {
      router.push("/quiz");
    }, 1400);
  };

  useEffect(() => {
    const items: FlowerItem[] = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      emoji: flowers[Math.floor(Math.random() * flowers.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 14 + Math.random() * 36,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 5,
      drift: (Math.random() - 0.5) * 80,
    }));

    setFlowerItems(items);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-[#F0FFF0] font-[var(--font-mali)]">

      {/* 🌸 background */}
      <div className="absolute inset-0 pointer-events-none">
        {flowerItems.map((f) => (
          <span
            key={f.id}
            className="flower"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              fontSize: `${f.size}px`,
              animationDuration: `${f.duration}s`,
              animationDelay: `${f.delay}s`,
              ["--drift" as any]: `${f.drift}px`,
            }}
          >
            {f.emoji}
          </span>
        ))}
      </div>

      {/* 🧠 center (NO CARD ANYMORE) */}
      <div className="relative flex items-center justify-center h-full">

        <div className="text-center font-[var(--font-mali)]">

          {/* 🐱 cat */}
          <div className="flex flex-col items-center mb-6">

            <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-56 md:h-56 mb-4">
              <Image
                src="/Cat.png"
                alt="cat"
                fill
                priority
                sizes="(max-width: 640px) 112px, (max-width: 768px) 128px, 160px"
                className="object-contain drop-shadow-xl cat-float"
              />
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
              Personality Quiz
            </h1>

          </div>

          {/* 🚀 BUTTON + 🐰 TRACK */}
          <div className="relative w-full h-14 overflow-hidden flex justify-center">

            {/* 🐰 rabbit */}
            <div
              className={`
                absolute top-2 left-0
                transition-all duration-[1800ms] ease-in-out
                ${isAnimating ? "translate-x-56" : "translate-x-0"}
              `}
            >
              <div className="text-4xl drop-shadow-lg">
                🐰
              </div>
            </div>

            {/* 🚀 button */}
            <button
              onClick={handleStart}
              disabled={isAnimating}
              className={`
                absolute top-0 left-0
                h-11 px-8
                rounded-full
                bg-[#E9967A] hover:bg-[#E6886F]
                text-white shadow-lg
                transition-all duration-[1400ms] ease-in-out
                z-10
                ${isAnimating ? "translate-x-64 scale-95 opacity-80" : ""}
              `}
            >
              {isAnimating ? "Loading..." : "Start"}
            </button>

          </div>

        </div>
      </div>

      {/* 🎨 styles */}
      <style jsx>{`
        .flower {
          position: absolute;
          opacity: 0.7;
          animation: float linear infinite;
        }

        @keyframes float {
          0% { transform: translate3d(0,0,0); }
          50% { transform: translate3d(var(--drift), -60px, 0); }
          100% { transform: translate3d(0,0,0); }
        }

        .cat-float {
          animation: catFloat 3s ease-in-out infinite;
        }

        @keyframes catFloat {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
          100% { transform: translateY(0px); }
        }

        .ripple {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 600ms linear;
          background: rgba(255,255,255,0.6);
        }

        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}