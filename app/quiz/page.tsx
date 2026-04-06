"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

// ================= TYPES =================
type FlowerType =
  | "rose"
  | "sunflower"
  | "tulip"
  | "lily"
  | "lotus"
  | "daisy";

type Option = {
  text: string;
  type: FlowerType;
};

type Question = {
  question: string;
  options?: Option[];
  buttonText?: string;
};

// ================= DATA =================
const questions: Question[] = [
  {
    question:
      "คุณตื่นขึ้นมาในเช้าวันหนึ่ง 🌤️\nอากาศวันนี้ดูพิเศษกว่าปกติ...",
    buttonText: "เริ่มการเดินทาง 🌸",
  },
  {
    question: "สิ่งแรกที่คุณทำคือ?",
    options: [
      { text: "ลุกขึ้นทันที วางแผนวัน", type: "rose" },
      { text: "เปิดมือถือดูโซเชียล", type: "sunflower" },
      { text: "ค่อยๆ ลุกแบบสบายๆ", type: "daisy" },
      { text: "นอนคิดอะไรเงียบๆ", type: "lotus" },
    ],
  },
  {
    question:
      "คุณออกไปข้างนอก 🌳\nและเจอสวนดอกไม้ที่สวยมาก...",
    buttonText: "เข้าไปดู 🌼",
  },
  {
    question: "คุณจะทำอะไรในสวนนี้?",
    options: [
      { text: "เดินสำรวจทุกมุม", type: "lily" },
      { text: "ถ่ายรูปลงโซเชียล", type: "sunflower" },
      { text: "นั่งเงียบๆ คนเดียว", type: "lotus" },
      { text: "เดินเล่นชิลๆ", type: "daisy" },
    ],
  },
  {
    question:
      "อยู่ๆ ลมแรงก็พัดมา 🌬️\nดอกไม้รอบตัวปลิวไปหมด...",
    buttonText: "ตั้งสติ 😳",
  },
  {
    question: "คุณจะทำยังไง?",
    options: [
      { text: "ตั้งสติและแก้ปัญหา", type: "rose" },
      { text: "หัวเราะ มองเป็นเรื่องสนุก", type: "sunflower" },
      { text: "ค่อยๆ เก็บดอกไม้", type: "tulip" },
      { text: "ปล่อยให้มันเป็นไป", type: "lotus" },
    ],
  },
  {
    question: "สุดท้ายแล้ว คุณคิดว่าตัวเองเป็นคนแบบไหน?",
    options: [
      { text: "มั่นใจ เป็นผู้นำ", type: "rose" },
      { text: "สดใส เข้ากับคนง่าย", type: "sunflower" },
      { text: "อ่อนโยน ใส่ใจ", type: "tulip" },
      { text: "เรียบง่าย สบายๆ", type: "daisy" },
      { text: "สุภาพ มีระเบียบ", type: "lily" },
      { text: "ลึกซึ้ง ชอบอยู่คนเดียว", type: "lotus" },
    ],
  },
];

// ================= COMPONENT =================
export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  const [score, setScore] = useState<Record<FlowerType, number>>({
    rose: 0,
    sunflower: 0,
    tulip: 0,
    lily: 0,
    lotus: 0,
    daisy: 0,
  });

  const current = questions[step];
  const progress = ((step + 1) / questions.length) * 100;

  // ================= ANSWER =================
  const handleAnswer = (type: FlowerType) => {
    const newScore = { ...score };
    newScore[type]++;
    setScore(newScore);
    nextStep(newScore);
  };

  // ================= NEXT =================
  const nextStep = (finalScore = score) => {
    if (step + 1 < questions.length) {
      setStep(step + 1);
    } else {
      const result = Object.keys(finalScore).reduce((a, b) =>
        finalScore[a as FlowerType] > finalScore[b as FlowerType] ? a : b
      );

      localStorage.setItem("result", result);
      router.push("/result");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen px-4 text-center bg-white">

      {/* PROGRESS */}
      <div className="w-full max-w-md mb-6">
        <div className="h-2 bg-gray-200 rounded">
          <div
            className="h-2 bg-pink-400 rounded transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-sm text-gray-500 mt-2">
          {step + 1} / {questions.length}
        </p>
      </div>

      {/* QUESTION */}
      <h2 className="text-xl font-bold mb-8 whitespace-pre-line text-gray-800">
        {current.question}
      </h2>

      {/* OPTIONS / NEXT */}
      <div className="w-full max-w-md">
        {current.options ? (
          current.options.map((opt, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(opt.type)}
              className="w-full mb-3 p-4 bg-white border border-gray-200 rounded-xl shadow hover:bg-pink-50 transition"
            >
              {opt.text}
            </button>
          ))
        ) : (
          <button
            onClick={() => nextStep()}
            className="w-full p-4 bg-pink-500 hover:bg-pink-600 text-white rounded-xl transition"
          >
            {current.buttonText || "ถัดไป →"}
          </button>
        )}
      </div>

    </div>
  );
}