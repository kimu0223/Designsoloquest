import { User, Menu } from "lucide-react";

interface HeaderProps {
  level: number;
  currentXP: number;
  nextLevelXP: number;
  onMenuClick: () => void;
}

export function Header({ level, currentXP, nextLevelXP, onMenuClick }: HeaderProps) {
  const progress = (currentXP / nextLevelXP) * 100;
  const remainingXP = nextLevelXP - currentXP;

  return (
    <div className="px-5 pt-16 pb-6 bg-gradient-to-b from-[#0A0A15] to-transparent">
      {/* Menu Button */}
      <button
        onClick={onMenuClick}
        className="absolute top-16 left-5 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors z-10"
        style={{
          border: '1px solid rgba(0, 212, 255, 0.3)',
          boxShadow: '0 0 10px rgba(0, 212, 255, 0.2)'
        }}
      >
        <Menu className="w-5 h-5 text-[#00D4FF]" />
      </button>

      <div className="flex items-center gap-4 mb-4">
        {/* Avatar Icon */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center shadow-lg shadow-[#00D4FF]/30">
          <User className="w-8 h-8 text-white" />
        </div>
        
        {/* Level Display */}
        <div>
          <div className="text-[#A0A0A0] text-xs mb-1" style={{ lineHeight: 2 }}>
            初心者プレイヤー
          </div>
          <div 
            className="text-3xl text-white tracking-wider"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
            }}
          >
            Lv.{String(level).padStart(2, '0')}
          </div>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="space-y-2">
        <div className="relative h-8 bg-[#0A0A15] rounded-full overflow-hidden border-2 border-[#00D4FF]/30">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#00D4FF] to-[#00A8CC] transition-all duration-500 ease-out"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 20px rgba(0, 212, 255, 0.6)'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span 
              className="text-white text-sm z-10"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 4px rgba(0, 0, 0, 0.8)'
              }}
            >
              {currentXP} / {nextLevelXP} XP
            </span>
          </div>
        </div>
        <p className="text-[#00D4FF] text-sm text-center" style={{ lineHeight: 2 }}>
          次のレベルまであと {remainingXP} XP
        </p>
      </div>
    </div>
  );
}