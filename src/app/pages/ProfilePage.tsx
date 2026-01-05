import { ArrowLeft, Award } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface ProfilePageProps {
  onBack: () => void;
}

export function ProfilePage({ onBack }: ProfilePageProps) {
  const stats = [
    { subject: 'やさしさ', value: 75, fullMark: 100 },
    { subject: 'ゆうき', value: 60, fullMark: 100 },
    { subject: 'ちえ', value: 85, fullMark: 100 },
    { subject: 'せいけつ', value: 70, fullMark: 100 },
    { subject: 'てつだい', value: 65, fullMark: 100 },
  ];

  const titles = [
    { id: 1, name: 'はじめての歯磨き', rank: 'E' },
    { id: 2, name: 'お片付けの達人', rank: 'D' },
    { id: 3, name: '朝の準備マスター', rank: 'D' },
    { id: 4, name: '勇敢なる挑戦者', rank: 'C' },
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
            プロフィール
          </h1>
        </div>
      </div>

      <div className="px-5 pt-6">
        {/* Character Illustration */}
        <div className="mb-8 flex justify-center">
          <div 
            className="w-48 h-48 rounded-full bg-gradient-to-br from-[#00D4FF] to-[#7B68EE] flex items-center justify-center"
            style={{
              boxShadow: '0 0 40px rgba(0, 212, 255, 0.4)'
            }}
          >
            <div className="w-44 h-44 rounded-full bg-[#1A1A2E] flex items-center justify-center">
              <div className="text-center">
                <div 
                  className="text-6xl mb-2"
                  style={{ 
                    fontFamily: 'Orbitron, sans-serif',
                    background: 'linear-gradient(135deg, #00D4FF, #FFD700)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  Lv.1
                </div>
                <div className="text-[#A0A0A0] text-sm" style={{ lineHeight: 2 }}>
                  初心者プレイヤー
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Radar Chart */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 mb-6 border border-[#00D4FF]/20">
          <h2 className="text-lg text-[#00D4FF] mb-4" style={{ lineHeight: 2 }}>
            能力値グラフ
          </h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={stats}>
                <PolarGrid stroke="#00D4FF" strokeOpacity={0.3} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#FFFFFF', fontSize: 14 }}
                  style={{ lineHeight: 2 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#A0A0A0', fontSize: 12 }}
                />
                <Radar
                  name="ステータス"
                  dataKey="value"
                  stroke="#00D4FF"
                  fill="#00D4FF"
                  fillOpacity={0.6}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earned Titles */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 border border-[#FFD700]/20">
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-lg text-[#FFD700]" style={{ lineHeight: 2 }}>
              獲得称号
            </h2>
          </div>
          <div className="space-y-3">
            {titles.map((title) => (
              <div
                key={title.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#1A1A2E] border border-[#FFD700]/30"
              >
                <div 
                  className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {title.rank}
                </div>
                <span className="flex-1 text-white" style={{ lineHeight: 2 }}>
                  {title.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-[#00D4FF]/10 to-[#7B68EE]/10 rounded-xl border border-[#00D4FF]/30">
          <p className="text-[#A0A0A0] text-sm text-center" style={{ lineHeight: 2.2 }}>
            クエストをクリアすることで、<br />
            各能力値が成長していきます！
          </p>
        </div>
      </div>
    </div>
  );
}
