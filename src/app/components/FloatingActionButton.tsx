import { Mic } from "lucide-react";

interface FloatingActionButtonProps {
  onClick: () => void;
  onTermsClick: () => void;
}

export function FloatingActionButton({ onClick, onTermsClick }: FloatingActionButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 pb-8 pt-4 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/90 to-transparent">
      <div className="flex flex-col items-center gap-3">
        {/* Main FAB Button */}
        <button
          onClick={onClick}
          className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#0066FF] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.6), 0 4px 20px rgba(0, 0, 0, 0.4)'
          }}
        >
          <Mic className="w-10 h-10 text-white" />
        </button>
        
        <div className="text-[#00D4FF] text-sm" style={{ lineHeight: 2 }}>
          AI鑑定
        </div>
        
        {/* Footer Links */}
        <div className="flex items-center gap-2 text-xs text-[#A0A0A0] mt-2">
          <button 
            onClick={onTermsClick}
            className="hover:text-[#00D4FF] transition-colors"
          >
            利用規約
          </button>
          <span>|</span>
          <button className="hover:text-[#00D4FF] transition-colors">
            プライバシーポリシー
          </button>
        </div>
      </div>
    </div>
  );
}