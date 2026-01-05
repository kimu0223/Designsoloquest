import { ArrowLeft, Volume2 } from "lucide-react";
import { useState } from "react";

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [showFurigana, setShowFurigana] = useState(true);
  const [aiPersonality, setAiPersonality] = useState<'passionate' | 'calm' | 'gentle'>('gentle');
  const [volume, setVolume] = useState(70);
  const [notifications, setNotifications] = useState(true);

  const personalities = [
    { id: 'passionate', label: '熱血', emoji: '🔥' },
    { id: 'calm', label: '冷静', emoji: '🧊' },
    { id: 'gentle', label: '慈愛', emoji: '💝' }
  ];

  return (
    <div className="min-h-screen bg-[#1A1A2E] pb-20" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-[#0A0A15] to-transparent px-5 pt-16 pb-4 z-10 border-b border-[#00D4FF]/20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#00D4FF]" />
          </button>
          <h1 className="text-2xl text-white" style={{ lineHeight: 2 }}>
            せってい
          </h1>
        </div>
      </div>

      <div className="px-5 pt-6 space-y-6">
        {/* Furigana Toggle */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 border border-[#00D4FF]/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1" style={{ lineHeight: 2 }}>
                ふりがなを表示
              </h3>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 2 }}>
                漢字の上に読み方を表示します
              </p>
            </div>
            <button
              onClick={() => setShowFurigana(!showFurigana)}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                showFurigana ? 'bg-[#00D4FF]' : 'bg-[#3A3A4E]'
              }`}
              style={{
                boxShadow: showFurigana ? '0 0 15px rgba(0, 212, 255, 0.5)' : 'none'
              }}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${
                  showFurigana ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* AI Personality */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 border border-[#00D4FF]/20">
          <h3 className="text-white mb-4" style={{ lineHeight: 2 }}>
            AIのせいかく
          </h3>
          <div className="flex gap-3">
            {personalities.map((personality) => (
              <button
                key={personality.id}
                onClick={() => setAiPersonality(personality.id as any)}
                className={`flex-1 p-4 rounded-xl border-2 transition-all duration-300 ${
                  aiPersonality === personality.id
                    ? 'border-[#00D4FF] bg-[#00D4FF]/20'
                    : 'border-[#3A3A4E] bg-[#1A1A2E] hover:border-[#00D4FF]/50'
                }`}
                style={{
                  boxShadow: aiPersonality === personality.id ? '0 0 15px rgba(0, 212, 255, 0.3)' : 'none'
                }}
              >
                <div className="text-3xl mb-2">{personality.emoji}</div>
                <div 
                  className={`text-sm ${
                    aiPersonality === personality.id ? 'text-[#00D4FF]' : 'text-[#A0A0A0]'
                  }`}
                  style={{ lineHeight: 2 }}
                >
                  {personality.label}
                </div>
              </button>
            ))}
          </div>
          <p className="text-[#A0A0A0] text-xs mt-4" style={{ lineHeight: 2 }}>
            AIがあなたに話しかける時の性格を選べ��す
          </p>
        </div>

        {/* Volume Control */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 border border-[#00D4FF]/20">
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-5 h-5 text-[#00D4FF]" />
            <h3 className="text-white" style={{ lineHeight: 2 }}>
              音量レベル
            </h3>
          </div>
          
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #00D4FF 0%, #00D4FF ${volume}%, #3A3A4E ${volume}%, #3A3A4E 100%)`,
                outline: 'none'
              }}
            />
            <style>{`
              input[type="range"]::-webkit-slider-thumb {
                appearance: none;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #00D4FF;
                cursor: pointer;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
              }
              input[type="range"]::-moz-range-thumb {
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #00D4FF;
                cursor: pointer;
                border: none;
                box-shadow: 0 0 10px rgba(0, 212, 255, 0.6);
              }
            `}</style>
          </div>

          <div className="flex justify-between mt-2">
            <span className="text-[#A0A0A0] text-xs">0</span>
            <span 
              className="text-[#00D4FF]"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {volume}%
            </span>
            <span className="text-[#A0A0A0] text-xs">100</span>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 border border-[#00D4FF]/20">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white mb-1" style={{ lineHeight: 2 }}>
                通知設定
              </h3>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 2 }}>
                クエストのリマインダーを受け取る
              </p>
            </div>
            <button
              onClick={() => setNotifications(!notifications)}
              className={`relative w-14 h-8 rounded-full transition-all duration-300 ${
                notifications ? 'bg-[#00D4FF]' : 'bg-[#3A3A4E]'
              }`}
              style={{
                boxShadow: notifications ? '0 0 15px rgba(0, 212, 255, 0.5)' : 'none'
              }}
            >
              <div
                className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all duration-300 ${
                  notifications ? 'left-7' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={onBack}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00D4FF] to-[#0088CC] text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#00D4FF]/50"
            style={{
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)'
            }}
          >
            保存して戻る
          </button>
        </div>

        {/* Info */}
        <div className="p-4 bg-[#00D4FF]/10 rounded-xl border border-[#00D4FF]/30">
          <p className="text-[#A0A0A0] text-xs text-center" style={{ lineHeight: 2.2 }}>
            設定は自動的に保存されます
          </p>
        </div>
      </div>
    </div>
  );
}
