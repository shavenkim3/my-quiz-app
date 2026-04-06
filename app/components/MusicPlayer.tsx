"use client";
import { useRef, useState, useEffect } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // ⭐ ฟัง event จากหน้า Home
  useEffect(() => {
    const handlePlay = () => {
      if (!audioRef.current) return;

      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.log("play error:", err);
        });
    };

    window.addEventListener("play-music", handlePlay);

    return () => {
      window.removeEventListener("play-music", handlePlay);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 bg-black text-white px-3 py-2 rounded-full"
      >
        {isPlaying ? "🔊" : "🔇"}
      </button>
    </>
  );
}