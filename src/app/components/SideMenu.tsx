import { motion, AnimatePresence } from "motion/react";
import { CircleUser, Package, Gift, Settings, Lock, ChevronRight, X } from "lucide-react";

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: string) => void;
}

export function SideMenu({ isOpen, onClose, onNavigate }: SideMenuProps) {
  const menuItems = [
    { id: 'profile', label: 'プロフィール', icon: CircleUser },
    { id: 'inventory', label: 'インベントリ', icon: Package },
    { id: 'rewards', label: 'ごほうび', icon: Gift },
    { id: 'settings', label: 'せってい', icon: Settings },
  ];

  const handleNavigate = (page: string) => {
    onNavigate(page);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />

          {/* Side Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 left-0 bottom-0 w-80 bg-gradient-to-br from-[#0A0A15] to-[#1A1A2E] z-50 shadow-2xl"
            style={{
              boxShadow: '0 0 50px rgba(0, 212, 255, 0.3)',
              borderRight: '1px solid rgba(0, 212, 255, 0.3)'
            }}
          >
            {/* Hexagonal Pattern Overlay */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(0deg, transparent, transparent 20px, #00D4FF 20px, #00D4FF 21px),
                  repeating-linear-gradient(60deg, transparent, transparent 20px, #00D4FF 20px, #00D4FF 21px),
                  repeating-linear-gradient(120deg, transparent, transparent 20px, #00D4FF 20px, #00D4FF 21px)
                `
              }}
            />

            {/* Content */}
            <div className="relative h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b border-[#00D4FF]/30">
                <div className="flex items-center justify-between mb-2">
                  <h2 
                    className="text-xl text-[#00D4FF]"
                    style={{ 
                      fontFamily: 'Orbitron, sans-serif',
                      textShadow: '0 0 10px rgba(0, 212, 255, 0.5)'
                    }}
                  >
                    SYSTEM MENU
                  </h2>
                  <button
                    onClick={onClose}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-[#A0A0A0]" />
                  </button>
                </div>
                <p className="text-xs text-[#A0A0A0]" style={{ lineHeight: 2 }}>
                  システムウィンドウ
                </p>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#0A0A15]/50 border border-[#00D4FF]/20 hover:border-[#00D4FF] hover:bg-[#00D4FF]/10 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center group-hover:bg-[#00D4FF]/30 transition-colors">
                      <item.icon className="w-5 h-5 text-[#00D4FF]" />
                    </div>
                    <span className="flex-1 text-left text-white" style={{ lineHeight: 2 }}>
                      {item.label}
                    </span>
                    <ChevronRight className="w-5 h-5 text-[#A0A0A0] group-hover:text-[#00D4FF] transition-colors" />
                  </button>
                ))}
              </nav>

              {/* Admin Section */}
              <div className="p-4 border-t border-[#FF4444]/30">
                <button
                  onClick={() => handleNavigate('admin')}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-[#330000] to-[#1A0A0A] border border-[#FF4444]/30 hover:border-[#FF4444] transition-all duration-300 group"
                  style={{
                    boxShadow: '0 0 15px rgba(255, 68, 68, 0.2)'
                  }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#FF4444]/20 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-[#FF4444]" />
                  </div>
                  <span className="flex-1 text-left text-[#FF4444]" style={{ lineHeight: 2 }}>
                    ギルドマスター入口
                  </span>
                  <ChevronRight className="w-5 h-5 text-[#FF4444]/60 group-hover:text-[#FF4444] transition-colors" />
                </button>
                <p className="text-xs text-[#A0A0A0] text-center mt-2" style={{ lineHeight: 2 }}>
                  ※おとな専用エリア
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
