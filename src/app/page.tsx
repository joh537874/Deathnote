"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Phase =
  | "intro-white"
  | "intro-black"
  | "name"
  | "death"
  | "result";

const FONT_STYLE: React.CSSProperties = {
  fontFamily: "var(--font-handwritten), cursive",
};

export default function Home() {
  const [phase, setPhase] = useState<Phase>("intro-white");
  const [name, setName] = useState("");
  const [deathCause, setDeathCause] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const deathInputRef = useRef<HTMLInputElement>(null);

  // intro-white → intro-black (500ms)
  useEffect(() => {
    if (phase !== "intro-white") return;
    const t = setTimeout(() => setPhase("intro-black"), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // result → intro-white (3000ms, 루프)
  useEffect(() => {
    if (phase !== "result") return;
    const t = setTimeout(() => {
      setPhase("intro-white");
      setName("");
      setDeathCause("");
    }, 3000);
    return () => clearTimeout(t);
  }, [phase]);

  // name 단계 진입 시 input 포커스
  useEffect(() => {
    if (phase === "name") {
      const t = setTimeout(() => nameInputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  // death 단계 진입 시 input 포커스
  useEffect(() => {
    if (phase === "death") {
      const t = setTimeout(() => deathInputRef.current?.focus(), 200);
      return () => clearTimeout(t);
    }
  }, [phase]);

  const handleNameKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && name.trim()) {
        setPhase("death");
      }
    },
    [name]
  );

  const handleDeathKey = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && deathCause.trim()) {
        setPhase("result");
      }
    },
    [deathCause]
  );

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {/* 1. 인트로 - 흰 화면 */}
        {phase === "intro-white" && (
          <motion.div
            key="intro-white"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/intro-white.png"
              alt="Death Note"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* 2. 인트로 - 검은 화면 (클릭 시 이름 입력으로) */}
        {phase === "intro-black" && (
          <motion.div
            key="intro-black"
            className="absolute inset-0 cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            onClick={() => setPhase("name")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/intro-black.png"
              alt="Death Note"
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* 3. 이름 입력 화면 */}
        {phase === "name" && (
          <motion.div
            key="name"
            className="absolute inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
                <input
              ref={nameInputRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleNameKey}
              placeholder="이름"
              autoComplete="off"
              className="name-input"
              style={{
                ...FONT_STYLE,
                fontSize: "clamp(36px, 7vw, 90px)",
                background: "transparent",
                border: "none",
                outline: "none",
                color: "#ff0000",
                caretColor: "white",
                textAlign: "center",
                width: "80vw",
              }}
            />
          </motion.div>
        )}

        {/* 4. 사인 입력 화면 */}
        {phase === "death" && (
          <motion.div
            key="death"
            className="absolute inset-0 bg-black flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-8">
              {/* 이름 (고정) */}
              <div
                style={{
                  ...FONT_STYLE,
                  fontSize: "clamp(36px, 7vw, 90px)",
                  color: "#ff0000",
                }}
              >
                {name}
              </div>

              {/* 사인 입력 */}
              <input
                ref={deathInputRef}
                value={deathCause}
                onChange={(e) => setDeathCause(e.target.value)}
                onKeyDown={handleDeathKey}
                placeholder="사인"
                autoComplete="off"
                className="death-input"
                style={{
                  ...FONT_STYLE,
                  fontSize: "clamp(24px, 4.5vw, 58px)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: "#ffffff",
                  caretColor: "white",
                  textAlign: "center",
                  width: "80vw",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* 5. 결과 화면 - 류크 등장 */}
        {phase === "result" && (
          <motion.div
            key="result"
            className="absolute inset-0 bg-black flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* 류크 이미지: 작게 시작 → 풀스크린 확대 */}
            <motion.img
              src="/ryuk.png"
              alt="Ryuk"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 0.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
              }}
            />

            {/* 이름 + 사인 오버레이 */}
            <motion.div
              className="absolute flex flex-col items-center"
              style={{ top: "30%", left: "50%", transform: "translateX(-50%)" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div
                style={{
                  ...FONT_STYLE,
                  fontSize: "7vw",
                  color: "#ff0000",
                  textShadow: "0 0 20px rgba(255,0,0,0.5)",
                }}
              >
                {name}
              </div>
              <div
                style={{
                  ...FONT_STYLE,
                  fontSize: "4.5vw",
                  color: "#ffffff",
                  textShadow: "0 0 15px rgba(255,255,255,0.4)",
                  marginTop: "1rem",
                }}
              >
                {deathCause}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
