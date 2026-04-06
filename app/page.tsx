"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    window.dispatchEvent(new Event("play-music"));
    router.push("/quiz");
  };

  return (
    <div className="relative h-screen">
      
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/flower1.jpg')] bg-cover bg-center bg-no-repeat"></div>

      {/* Blur overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-black/10"></div>

      {/* Content */}
      <div className="relative flex items-center justify-center h-full">
        <div className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl text-center w-[320px]">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Personality Quiz
          </h1>

          <button
            onClick={handleStart}
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg w-full transition duration-200 shadow-md"
          >
            Start
          </button>
        </div>
      </div>

    </div>
  );
}