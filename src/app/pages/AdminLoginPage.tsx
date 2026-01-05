import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface AdminLoginPageProps {
  onBack: () => void;
  onLogin: () => void;
}

export function AdminLoginPage({ onBack, onLogin }: AdminLoginPageProps) {
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [error, setError] = useState(false);
  const correctPin = '1234'; // In real app, this would be securely stored

  const handleNumberClick = (num: string) => {
    const emptyIndex = pin.findIndex(p => p === '');
    if (emptyIndex !== -1) {
      const newPin = [...pin];
      newPin[emptyIndex] = num;
      setPin(newPin);

      // Check if complete
      if (emptyIndex === 3) {
        const enteredPin = newPin.join('');
        if (enteredPin === correctPin) {
          setTimeout(() => {
            onLogin();
          }, 300);
        } else {
          setError(true);
          setTimeout(() => {
            setPin(['', '', '', '']);
            setError(false);
          }, 1000);
        }
      }
    }
  };

  const handleClear = () => {
    setPin(['', '', '', '']);
    setError(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1A0A0A] to-[#0A0A15]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* Restricted Pattern Overlay */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(45deg, #FF4444 0px, #FF4444 2px, transparent 2px, transparent 10px)
          `
        }}
      />

      {/* Header */}
      <div className="relative px-5 pt-16 pb-4 border-b border-[#FF4444]/30">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#FF4444]" />
          </button>
          <div className="flex items-center gap-2">
            <Lock className="w-6 h-6 text-[#FF4444]" />
            <h1 className="text-2xl text-[#FF4444]" style={{ lineHeight: 2 }}>
              ギルドマスター認証
            </h1>
          </div>
        </div>
      </div>

      <div className="relative px-5 pt-12">
        {/* Warning */}
        <div className="mb-8 p-4 bg-[#FF4444]/10 border border-[#FF4444]/30 rounded-xl">
          <p className="text-[#FF4444] text-center" style={{ lineHeight: 2.2 }}>
            ⚠️ おとなの人が操作してください
          </p>
        </div>

        {/* PIN Display */}
        <div className="mb-12">
          <p className="text-[#A0A0A0] text-center mb-6" style={{ lineHeight: 2 }}>
            4桁のPINコードを入力してください
          </p>
          <div className="flex justify-center gap-4">
            {pin.map((digit, index) => (
              <motion.div
                key={index}
                className={`w-16 h-20 rounded-xl border-2 flex items-center justify-center transition-all duration-300 ${
                  error
                    ? 'border-red-500 bg-red-500/20'
                    : digit
                    ? 'border-[#FF4444] bg-[#FF4444]/20'
                    : 'border-[#3A3A4E] bg-[#1A1A2E]'
                }`}
                style={{
                  boxShadow: digit && !error ? '0 0 15px rgba(255, 68, 68, 0.3)' : 'none'
                }}
                animate={error ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                {digit && (
                  <div 
                    className={`text-3xl ${error ? 'text-red-500' : 'text-[#FF4444]'}`}
                    style={{ fontFamily: 'Orbitron, sans-serif' }}
                  >
                    •
                  </div>
                )}
              </motion.div>
            ))}
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-center mt-4 text-sm"
              style={{ lineHeight: 2 }}
            >
              PINコードが正しくありません
            </motion.p>
          )}
        </div>

        {/* Keypad */}
        <div className="max-w-xs mx-auto">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                disabled={pin.every(p => p !== '')}
                className="h-16 rounded-xl bg-[#2A2A3E] border border-[#FF4444]/30 text-white text-2xl hover:bg-[#FF4444]/20 hover:border-[#FF4444] transition-all duration-300 active:scale-95 disabled:opacity-50"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {num}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div />
            <button
              onClick={() => handleNumberClick('0')}
              disabled={pin.every(p => p !== '')}
              className="h-16 rounded-xl bg-[#2A2A3E] border border-[#FF4444]/30 text-white text-2xl hover:bg-[#FF4444]/20 hover:border-[#FF4444] transition-all duration-300 active:scale-95 disabled:opacity-50"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              0
            </button>
            <button
              onClick={handleClear}
              className="h-16 rounded-xl bg-[#3A3A4E] border border-[#A0A0A0]/30 text-[#A0A0A0] text-sm hover:bg-[#A0A0A0]/20 hover:border-[#A0A0A0] transition-all duration-300 active:scale-95"
            >
              クリア
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="mt-12 p-4 bg-[#FF4444]/10 rounded-xl border border-[#FF4444]/30">
          <p className="text-[#A0A0A0] text-xs text-center" style={{ lineHeight: 2.2 }}>
            デモ用PIN: 1234<br />
            本番環境では安全な認証方法を使用してください
          </p>
        </div>
      </div>
    </div>
  );
}
