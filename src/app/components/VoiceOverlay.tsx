import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface VoiceOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function VoiceOverlay({ isOpen, onClose }: VoiceOverlayProps) {
  const [bars, setBars] = useState<number[]>(Array(12).fill(0));

  useEffect(() => {
    if (!isOpen) return;

    const interval = setInterval(() => {
      setBars(Array(12).fill(0).map(() => Math.random()));
    }, 100);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end"
      onClick={onClose}
    >
      {/* Backdrop - Blurred and dimmed */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full bg-gradient-to-t from-[#0A0A15] to-[#1A1A2E] rounded-t-3xl shadow-2xl"
        style={{
          boxShadow: '0 -10px 50px rgba(0, 212, 255, 0.2)'
        }}
      >
        <div className="px-6 pt-8 pb-10">
          {/* Title */}
          <h2 
            className="text-2xl text-[#00D4FF] text-center mb-8"
            style={{ 
              lineHeight: 2,
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
            }}
          >
            AIが鑑定中...
          </h2>

          {/* Audio Visualization */}
          <div className="flex items-center justify-center gap-1 h-32 mb-8">
            {bars.map((height, i) => (
              <motion.div
                key={i}
                className="w-2 rounded-full"
                animate={{
                  height: `${20 + height * 80}%`,
                  background: i % 2 === 0 
                    ? 'linear-gradient(to top, #00D4FF, #7B68EE)' 
                    : 'linear-gradient(to top, #7B68EE, #00D4FF)'
                }}
                transition={{ duration: 0.1 }}
                style={{
                  boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                }}
              />
            ))}
          </div>

          {/* Instruction Text */}
          <p 
            className="text-[#A0A0A0] text-center mb-8"
            style={{ lineHeight: 2.2 }}
          >
            「〇〇をがんばったよ」とはなしかけてね
          </p>

          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl border-2 border-[#A0A0A0] text-[#A0A0A0] hover:border-[#00D4FF] hover:text-[#00D4FF] transition-all duration-300"
          >
            キャンセル
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
