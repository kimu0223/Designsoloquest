import { ArrowLeft, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

interface RewardsPageProps {
  onBack: () => void;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  rarity: 'common' | 'rare' | 'legendary';
}

export function RewardsPage({ onBack }: RewardsPageProps) {
  const [selectedReward, setSelectedReward] = useState<number | null>(null);

  const rewards: Reward[] = [
    {
      id: 1,
      title: '10分ゲーム延長券',
      description: 'ゲーム時間が10分増えるよ！',
      rarity: 'common'
    },
    {
      id: 2,
      title: '今日のおやつランクアップ',
      description: '特別なおやつがもらえる！',
      rarity: 'rare'
    },
    {
      id: 3,
      title: '新しい装備アイテム',
      description: 'レアな装備をゲット！',
      rarity: 'legendary'
    }
  ];

  const getRarityColors = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          border: '#FFD700',
          bg: 'from-[#FFD700] to-[#FFA500]',
          shadow: 'rgba(255, 215, 0, 0.6)',
          glow: 'rgba(255, 215, 0, 0.3)'
        };
      case 'rare':
        return {
          border: '#7B68EE',
          bg: 'from-[#7B68EE] to-[#9370DB]',
          shadow: 'rgba(123, 104, 238, 0.6)',
          glow: 'rgba(123, 104, 238, 0.3)'
        };
      default:
        return {
          border: '#00D4FF',
          bg: 'from-[#00D4FF] to-[#0088CC]',
          shadow: 'rgba(0, 212, 255, 0.6)',
          glow: 'rgba(0, 212, 255, 0.3)'
        };
    }
  };

  const handleSelectReward = (id: number) => {
    setSelectedReward(id);
    // Show celebration animation
    setTimeout(() => {
      setSelectedReward(null);
      onBack();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E] pb-20" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* Particles Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#FFD700] rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: window.innerHeight + 20,
              opacity: 0.8
            }}
            animate={{
              y: -20,
              opacity: 0
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 bg-gradient-to-b from-[#0A0A15] to-transparent px-5 pt-16 pb-4 z-10 border-b border-[#FFD700]/20">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#FFD700]" />
          </button>
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-[#FFD700]" />
            <h1 className="text-2xl text-[#FFD700]" style={{ lineHeight: 2 }}>
              ご褒美を選ぼう
            </h1>
          </div>
        </div>
      </div>

      <div className="px-5 pt-8">
        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-[#A0A0A0] mb-2" style={{ lineHeight: 2.2 }}>
            クエストクリア おめでとう！
          </p>
          <p className="text-white text-lg" style={{ lineHeight: 2.2 }}>
            好きなご褒美を<span className="text-[#FFD700]">1つ</span>選んでね
          </p>
        </div>

        {/* Reward Cards */}
        <div className="space-y-6">
          {rewards.map((reward, index) => {
            const colors = getRarityColors(reward.rarity);
            const isSelected = selectedReward === reward.id;

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15 }}
              >
                <button
                  onClick={() => handleSelectReward(reward.id)}
                  disabled={selectedReward !== null}
                  className="w-full relative"
                >
                  <motion.div
                    className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                      isSelected ? 'scale-105' : 'hover:scale-102'
                    }`}
                    style={{
                      borderColor: colors.border,
                      backgroundColor: '#0A0A15',
                      boxShadow: isSelected 
                        ? `0 0 40px ${colors.shadow}, 0 0 80px ${colors.glow}`
                        : `0 0 20px ${colors.glow}`
                    }}
                    animate={isSelected ? {
                      boxShadow: [
                        `0 0 40px ${colors.shadow}`,
                        `0 0 80px ${colors.shadow}`,
                        `0 0 40px ${colors.shadow}`
                      ]
                    } : {}}
                    transition={{ duration: 1, repeat: isSelected ? Infinity : 0 }}
                  >
                    {/* Floating Card Effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.bg} opacity-10`}
                      animate={{
                        opacity: [0.1, 0.2, 0.1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />

                    {/* Content */}
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        <div 
                          className={`w-16 h-16 rounded-xl bg-gradient-to-br ${colors.bg} flex items-center justify-center flex-shrink-0`}
                          style={{
                            boxShadow: `0 0 20px ${colors.glow}`
                          }}
                        >
                          <Sparkles className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1 text-left">
                          <h3 className="text-white text-lg mb-2" style={{ lineHeight: 2 }}>
                            {reward.title}
                          </h3>
                          <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 2 }}>
                            {reward.description}
                          </p>
                        </div>
                      </div>

                      {/* Rarity Badge */}
                      <div className="mt-4 flex justify-end">
                        <div 
                          className={`px-3 py-1 rounded-full text-xs bg-gradient-to-r ${colors.bg} text-white`}
                          style={{ fontFamily: 'Orbitron, sans-serif' }}
                        >
                          {reward.rarity === 'legendary' && '★★★ LEGENDARY'}
                          {reward.rarity === 'rare' && '★★ RARE'}
                          {reward.rarity === 'common' && '★ COMMON'}
                        </div>
                      </div>
                    </div>

                    {/* Selected Effect */}
                    {isSelected && (
                      <motion.div
                        className="absolute inset-0 rounded-2xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <div 
                          className="absolute inset-0 rounded-2xl"
                          style={{
                            background: `radial-gradient(circle at center, ${colors.glow} 0%, transparent 70%)`
                          }}
                        />
                      </motion.div>
                    )}
                  </motion.div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Info */}
        <div className="mt-8 p-4 bg-[#00D4FF]/10 rounded-xl border border-[#00D4FF]/30">
          <p className="text-[#A0A0A0] text-sm text-center" style={{ lineHeight: 2.2 }}>
            ご褒美は親御さんと相談して<br />
            受け取ってくださいね！
          </p>
        </div>
      </div>

      {/* Celebration Overlay */}
      {selectedReward !== null && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="text-center"
          >
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              🎉
            </motion.div>
            <div 
              className="text-3xl text-[#FFD700]"
              style={{ 
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 20px rgba(255, 215, 0, 0.8)'
              }}
            >
              GET!
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
