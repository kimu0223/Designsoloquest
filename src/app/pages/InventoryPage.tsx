import { ArrowLeft, Sword, Shield, Sparkles } from "lucide-react";

interface InventoryPageProps {
  onBack: () => void;
}

interface Item {
  id: number;
  name: string;
  description: string;
  type: 'weapon' | 'armor' | 'item';
  rarity: 'common' | 'rare' | 'legendary';
  equipped: boolean;
}

export function InventoryPage({ onBack }: InventoryPageProps) {
  const items: Item[] = [
    {
      id: 1,
      name: '初心者の剣',
      description: '最初に手に入れた剣',
      type: 'weapon',
      rarity: 'common',
      equipped: true
    },
    {
      id: 2,
      name: '勇気の盾',
      description: 'がんばった証の盾',
      type: 'armor',
      rarity: 'rare',
      equipped: true
    },
    {
      id: 3,
      name: '光の結晶',
      description: 'キラキラ光る魔法の石',
      type: 'item',
      rarity: 'legendary',
      equipped: false
    },
    {
      id: 4,
      name: '鉄の剣',
      description: '少し強い剣',
      type: 'weapon',
      rarity: 'common',
      equipped: false
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weapon':
        return Sword;
      case 'armor':
        return Shield;
      default:
        return Sparkles;
    }
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '#FFD700';
      case 'rare':
        return '#7B68EE';
      default:
        return '#00D4FF';
    }
  };

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
            インベントリ
          </h1>
        </div>
      </div>

      <div className="px-5 pt-6">
        {/* Stats Summary */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-[#0A0A15] rounded-xl p-4 border border-[#00D4FF]/20 text-center">
            <div 
              className="text-2xl text-[#00D4FF] mb-1"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {items.length}
            </div>
            <div className="text-[#A0A0A0] text-xs" style={{ lineHeight: 2 }}>
              所持アイテム
            </div>
          </div>
          <div className="bg-[#0A0A15] rounded-xl p-4 border border-[#7B68EE]/20 text-center">
            <div 
              className="text-2xl text-[#7B68EE] mb-1"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {items.filter(i => i.equipped).length}
            </div>
            <div className="text-[#A0A0A0] text-xs" style={{ lineHeight: 2 }}>
              装備中
            </div>
          </div>
          <div className="bg-[#0A0A15] rounded-xl p-4 border border-[#FFD700]/20 text-center">
            <div 
              className="text-2xl text-[#FFD700] mb-1"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              {items.filter(i => i.rarity === 'legendary').length}
            </div>
            <div className="text-[#A0A0A0] text-xs" style={{ lineHeight: 2 }}>
              レア装備
            </div>
          </div>
        </div>

        {/* Items Grid */}
        <div className="space-y-4">
          {items.map((item) => {
            const Icon = getTypeIcon(item.type);
            const color = getRarityColor(item.rarity);

            return (
              <div
                key={item.id}
                className="bg-[#0A0A15] rounded-xl p-5 border-2 transition-all duration-300 hover:scale-102"
                style={{
                  borderColor: `${color}40`,
                  boxShadow: `0 0 15px ${color}20`
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div 
                    className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: `${color}20`,
                      border: `2px solid ${color}40`,
                      boxShadow: `0 0 10px ${color}30`
                    }}
                  >
                    <Icon className="w-8 h-8" style={{ color }} />
                  </div>

                  {/* Info */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-white" style={{ lineHeight: 2 }}>
                        {item.name}
                      </h3>
                      {item.equipped && (
                        <span 
                          className="px-2 py-1 rounded-full text-xs bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50"
                          style={{ lineHeight: 1.5 }}
                        >
                          装備中
                        </span>
                      )}
                    </div>
                    <p className="text-[#A0A0A0] text-sm mb-3" style={{ lineHeight: 2 }}>
                      {item.description}
                    </p>

                    {/* Rarity and Type */}
                    <div className="flex items-center gap-2">
                      <span 
                        className="px-2 py-1 rounded text-xs"
                        style={{ 
                          backgroundColor: `${color}20`,
                          color,
                          fontFamily: 'Orbitron, sans-serif'
                        }}
                      >
                        {item.rarity === 'legendary' && '★★★'}
                        {item.rarity === 'rare' && '★★'}
                        {item.rarity === 'common' && '★'}
                      </span>
                      <span className="text-[#A0A0A0] text-xs">
                        {item.type === 'weapon' && '武器'}
                        {item.type === 'armor' && '防具'}
                        {item.type === 'item' && 'アイテム'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-6 p-4 bg-[#00D4FF]/10 rounded-xl border border-[#00D4FF]/30">
          <p className="text-[#A0A0A0] text-sm text-center" style={{ lineHeight: 2.2 }}>
            クエストをクリアすると<br />
            新しいアイテムが手に入るよ！
          </p>
        </div>
      </div>
    </div>
  );
}
