"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as htmlToImage from "html-to-image";

// 🌸 ข้อมูลผลลัพธ์
const flowerData: Record<string, { emoji: string; title: string; desc: string }> = {
  rose: {
    emoji: "🌹",
    title: "คุณคือกุหลาบ",
    desc: "มั่นใจ เป็นผู้นำ กล้าตัดสินใจ และโดดเด่นในแบบของตัวเอง",
  },
  sunflower: {
    emoji: "🌻",
    title: "คุณคือทานตะวัน",
    desc: "สดใส ร่าเริง อยู่กับใครก็ทำให้บรรยากาศดีขึ้น",
  },
  tulip: {
    emoji: "🌷",
    title: "คุณคือทิวลิป",
    desc: "อ่อนโยน น่ารัก ใส่ใจความรู้สึกของคนรอบข้าง",
  },
  lily: {
    emoji: "🌸",
    title: "คุณคือลิลลี่",
    desc: "สุภาพ เรียบร้อย มีระเบียบ และดูน่าเชื่อถือ",
  },
  lotus: {
    emoji: "🪷",
    title: "คุณคือดอกบัว",
    desc: "ลึกซึ้ง รักความสงบ มีโลกส่วนตัวสูง",
  },
  daisy: {
    emoji: "🌼",
    title: "คุณคือเดซี่",
    desc: "เรียบง่าย ชิลๆ เป็นตัวของตัวเอง และสบายใจที่จะอยู่แบบธรรมชาติ",
  },
};

export default function ResultPage() {
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();
  const captureRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const data = localStorage.getItem("result");
    if (!data) router.push("/");
    else setResult(data);
  }, []);

  // 📸 บันทึกรูป
  const handleDownloadImage = async () => {
    if (!captureRef.current) return;

    const dataUrl = await htmlToImage.toPng(captureRef.current, {
      pixelRatio: 2,
    });

    const link = document.createElement("a");
    link.download = "ig-story.png";
    link.href = dataUrl;
    link.click();
  };

  if (!result) return null;
  const data = flowerData[result];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">

      {/* 📱 IG STORY 9:16 */}
      <div
        ref={captureRef}
        className="relative w-[360px] h-[640px] rounded-3xl overflow-hidden shadow-2xl"
      >
        {/* 🌸 Background image */}
        <div className="absolute inset-0 bg-[url('/flower1.jpg')] bg-cover bg-center" />

        {/* 🔥 overlay blur */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* CONTENT */}
        <div className="relative flex flex-col items-center justify-center h-full text-center px-6 text-white">
          
          <div className="text-7xl mb-4">{data.emoji}</div>

          <h1 className="text-3xl font-bold mb-3">
            {data.title}
          </h1>

          <p className="text-sm opacity-90 mb-8">
            {data.desc}
          </p>

          <div className="text-xs opacity-80">
            เล่นได้ที่เว็บไซต์นี้ 👇
          </div>
        </div>

        {/* 🔖 CREDIT */}
        <span className="absolute bottom-3 right-4 text-[10px] text-white/70">
          @dd0rnor & kkimmyz
        </span>
      </div>

      {/* BUTTON */}
      <div className="mt-6 flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => router.push("/")}
          className="bg-gray-500 text-white px-5 py-2 rounded-xl"
        >
          เล่นอีกครั้ง
        </button>

        <button
          onClick={handleDownloadImage}
          className="bg-pink-500 text-white px-5 py-2 rounded-xl"
        >
          บันทึก IG Story
        </button>
      </div>
    </div>
  );
}