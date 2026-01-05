import { ArrowLeft, Trophy, Target, Star, TrendingUp, Award, Lightbulb } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from "recharts";

interface MonthlyReportPageProps {
  onBack: () => void;
}

export function MonthlyReportPage({ onBack }: MonthlyReportPageProps) {
  // Comparison data: Last month vs This month
  const growthData = [
    { 
      subject: 'やさしさ\nKindness', 
      lastMonth: 60, 
      thisMonth: 75,
      fullMark: 100 
    },
    { 
      subject: 'ゆうき\nCourage', 
      lastMonth: 50, 
      thisMonth: 65,
      fullMark: 100 
    },
    { 
      subject: 'ちえ\nWisdom', 
      lastMonth: 70, 
      thisMonth: 85,
      fullMark: 100 
    },
    { 
      subject: 'てつだい\nHelpfulness', 
      lastMonth: 55, 
      thisMonth: 70,
      fullMark: 100 
    },
    { 
      subject: 'じりつ\nIndependence', 
      lastMonth: 45, 
      thisMonth: 60,
      fullMark: 100 
    },
  ];

  const mvpMoment = {
    date: '1月15日',
    rank: 'S',
    transcript: 'いもうとが ころんで ないていたから、ばんそうこうを はってあげて、なでなでした',
    aiFeedback: '素晴らしい思いやりと行動力です。相手の気持ちを察して、自分で考えて行動できました。'
  };

  const stats = [
    { 
      id: 1,
      label: 'Total XP',
      value: '1,240',
      subLabel: '今月獲得',
      icon: TrendingUp,
      color: '#00D4FF',
      bgColor: 'rgba(0, 212, 255, 0.2)'
    },
    { 
      id: 2,
      label: 'Quests Cleared',
      value: '42',
      subLabel: 'クエスト達成',
      icon: Target,
      color: '#FFD700',
      bgColor: 'rgba(255, 215, 0, 0.2)'
    },
    { 
      id: 3,
      label: 'Hidden Quests',
      value: '3',
      subLabel: '隠しクエスト発見',
      icon: Star,
      color: '#7B68EE',
      bgColor: 'rgba(123, 104, 238, 0.2)'
    },
  ];

  const aiAdvice = {
    title: 'マスター・ジンからのアドバイス',
    content: `今月は特に「優しさ」と「知恵」の成長が目覚ましかったです。小さい子への配慮や、自分で考えて行動する場面が増えてきました。

来月の目標として、「自立心」をさらに伸ばすことをおすすめします。朝の準備を完全に一人で行う、宿題の時間を自分で決めるなど、自己管理のクエストを増やしてみましょう。

この調子で成長を続ければ、次のレベルアップまであと少しです！`
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-[#0A0A15] to-[#1A1A2E] pb-20"
      style={{ fontFamily: "'Noto Sans JP', sans-serif" }}
    >
      {/* Decorative Background */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #FFD700 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Header */}
      <div className="relative px-5 pt-16 pb-6 border-b border-[#FFD700]/20">
        <button
          onClick={onBack}
          className="absolute top-16 left-5 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors border border-[#00D4FF]/30"
        >
          <ArrowLeft className="w-5 h-5 text-[#00D4FF]" />
        </button>

        <div className="text-center pt-6">
          {/* Avatar */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] mb-4"
            style={{
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.4)'
            }}
          >
            <div className="w-18 h-18 rounded-full bg-[#1A1A2E] flex items-center justify-center">
              <span 
                className="text-3xl"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  background: 'linear-gradient(135deg, #FFD700, #00D4FF)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Lv.1
              </span>
            </div>
          </div>

          <h1 className="text-2xl text-white mb-2" style={{ lineHeight: 1.8 }}>
            1月のせいちょうレポート
          </h1>
          <p className="text-[#FFD700] text-sm" style={{ lineHeight: 1.8 }}>
            January Growth Report
          </p>
        </div>
      </div>

      <div className="relative px-5 pt-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="bg-[#0A0A15] rounded-xl p-4 border"
                style={{
                  borderColor: `${stat.color}40`,
                  boxShadow: `0 0 15px ${stat.color}20`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto"
                  style={{ backgroundColor: stat.bgColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: stat.color }} />
                </div>
                <div 
                  className="text-2xl text-white text-center mb-1"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-[#A0A0A0] text-center" style={{ lineHeight: 1.6 }}>
                  {stat.subLabel}
                </div>
              </div>
            );
          })}
        </div>

        {/* Radar Chart - Growth Comparison */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 mb-6 border border-[#00D4FF]/20"
          style={{
            boxShadow: '0 0 30px rgba(0, 212, 255, 0.15)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-lg text-white" style={{ lineHeight: 1.8 }}>
              成長グラフ
            </h2>
          </div>

          <div className="h-80 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={growthData}>
                <PolarGrid stroke="#00D4FF" strokeOpacity={0.2} />
                <PolarAngleAxis 
                  dataKey="subject" 
                  tick={{ fill: '#FFFFFF', fontSize: 11 }}
                  style={{ lineHeight: 1.6 }}
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 100]} 
                  tick={{ fill: '#A0A0A0', fontSize: 10 }}
                />
                {/* Last Month - Faint outline */}
                <Radar
                  name="先月"
                  dataKey="lastMonth"
                  stroke="#A0A0A0"
                  fill="#A0A0A0"
                  fillOpacity={0.2}
                  strokeWidth={1}
                  strokeDasharray="5 5"
                />
                {/* This Month - Bold glowing line */}
                <Radar
                  name="今月"
                  dataKey="thisMonth"
                  stroke="#00D4FF"
                  fill="#00D4FF"
                  fillOpacity={0.5}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[#A0A0A0] opacity-50" style={{ borderTop: '2px dashed #A0A0A0' }} />
              <span className="text-xs text-[#A0A0A0]">先月 (Last Month)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-1 bg-[#00D4FF] rounded-full" style={{ boxShadow: '0 0 8px rgba(0, 212, 255, 0.6)' }} />
              <span className="text-xs text-[#00D4FF]">今月 (This Month)</span>
            </div>
          </div>
        </div>

        {/* MVP Moment */}
        <div className="bg-gradient-to-br from-[#FFD700]/10 to-[#FFA500]/10 rounded-2xl p-6 mb-6 border border-[#FFD700]/30"
          style={{
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.15)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Trophy className="w-6 h-6 text-[#FFD700]" />
            <h2 className="text-lg text-[#FFD700]" style={{ lineHeight: 1.8 }}>
              今月のMVP (Best Moment)
            </h2>
          </div>

          <div className="bg-[#0A0A15] rounded-xl p-5 border border-[#FFD700]/20">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center text-white font-bold"
                style={{ 
                  fontFamily: 'Orbitron, sans-serif',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)'
                }}
              >
                S
              </div>
              <div>
                <div className="text-[#FFD700] text-sm" style={{ lineHeight: 1.6 }}>
                  {mvpMoment.date}
                </div>
                <div className="text-[#A0A0A0] text-xs">
                  史上最高ランク達成！
                </div>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-xs text-[#00D4FF] mb-2">子供の報告</div>
              <div className="text-white bg-[#1A1A2E] rounded-lg p-4 border border-[#00D4FF]/20" style={{ lineHeight: 2 }}>
                「{mvpMoment.transcript}」
              </div>
            </div>

            <div>
              <div className="text-xs text-[#FFD700] mb-2">AIの評価</div>
              <div className="text-[#A0A0A0] bg-[#1A1A2E] rounded-lg p-4 border border-[#FFD700]/20" style={{ lineHeight: 2 }}>
                {mvpMoment.aiFeedback}
              </div>
            </div>
          </div>
        </div>

        {/* AI Advice for Parents */}
        <div className="bg-[#0A0A15] rounded-2xl p-6 border border-[#7B68EE]/20"
          style={{
            boxShadow: '0 0 30px rgba(123, 104, 238, 0.15)'
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-[#7B68EE]" />
            <h2 className="text-lg text-white" style={{ lineHeight: 1.8 }}>
              {aiAdvice.title}
            </h2>
          </div>

          <div className="bg-gradient-to-br from-[#7B68EE]/10 to-[#9370DB]/10 rounded-xl p-5 border border-[#7B68EE]/30">
            <div className="text-[#E0E0E0] whitespace-pre-line" style={{ lineHeight: 2.2 }}>
              {aiAdvice.content}
            </div>
          </div>

          <div className="mt-4 p-4 bg-[#FFD700]/10 rounded-lg border border-[#FFD700]/30">
            <p className="text-[#FFD700] text-sm text-center" style={{ lineHeight: 2 }}>
              ⭐ この調子で頑張りましょう！ ⭐
            </p>
          </div>
        </div>

        {/* Premium Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#FFD700]/20 to-[#FFA500]/20 border border-[#FFD700]/50">
            <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
            <span className="text-xs text-[#FFD700]" style={{ fontFamily: 'Orbitron, sans-serif' }}>
              PREMIUM REPORT
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
