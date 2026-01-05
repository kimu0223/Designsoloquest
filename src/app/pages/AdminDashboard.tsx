import { ArrowLeft, Plus, Edit2, Trash2, Users, TrendingUp, Clock, Activity, Brain, SlidersHorizontal, Gift, FileText } from "lucide-react";
import { useState } from "react";

interface AdminDashboardProps {
  onBack: () => void;
  onLogout: () => void;
  onViewReport?: () => void;
}

interface QuestTemplate {
  id: number;
  title: string;
  rank: 'E' | 'D' | 'C' | 'B' | 'A' | 'S';
  xpReward: number;
  active: boolean;
}

interface ActivityLog {
  id: number;
  time: string;
  rank: string;
  transcript: string;
  aiFeedback: string;
  rankColor: string;
}

interface Reward {
  id: number;
  title: string;
  description: string;
  requiresApproval: boolean;
  usageLimit: string;
}

type AIPersona = 'jin' | 'operator' | 'will';

export function AdminDashboard({ onBack, onLogout, onViewReport }: AdminDashboardProps) {
  const [quests, setQuests] = useState<QuestTemplate[]>([
    { id: 1, title: 'はみがきを する', rank: 'E', xpReward: 20, active: true },
    { id: 2, title: 'じぶんで ふくを きる', rank: 'E', xpReward: 20, active: true },
    { id: 3, title: 'しゅくだいを おわらせる', rank: 'D', xpReward: 30, active: true },
    { id: 4, title: 'おてつだいを する', rank: 'D', xpReward: 30, active: true },
  ]);

  const [activityLogs] = useState<ActivityLog[]>([
    {
      id: 1,
      time: '18:30',
      rank: 'S',
      transcript: 'いもうとの くつを はかせて あげた',
      aiFeedback: '素晴らしい優しさです！自分より小さい子を助けるのは勇気ある行動ですね。',
      rankColor: '#FFD700'
    },
    {
      id: 2,
      time: '17:45',
      rank: 'A',
      transcript: 'しゅくだいを ぜんぶ おわらせた',
      aiFeedback: '完璧な集中力でした。最後まであきらめない姿勢が素晴らしいです。',
      rankColor: '#7B68EE'
    },
    {
      id: 3,
      time: '16:20',
      rank: 'B',
      transcript: 'おかあさんの おてつだいを した',
      aiFeedback: '自発的に手伝う気持ちが見られました。家族の一員として頼もしいですね。',
      rankColor: '#00D4FF'
    },
    {
      id: 4,
      time: '15:10',
      rank: 'C',
      transcript: 'はみがきを した',
      aiFeedback: '基本的なクエストをクリアしました。続けることが大切です。',
      rankColor: '#4CAF50'
    },
    {
      id: 5,
      time: '14:30',
      rank: 'D',
      transcript: 'おもちゃを かたづけた',
      aiFeedback: 'よくできました。次回はもう少し速くできるといいですね。',
      rankColor: '#FFA500'
    }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: 1,
      title: '10分ゲーム延長券',
      description: 'ゲーム時間を10分延長',
      requiresApproval: false,
      usageLimit: '無制限'
    },
    {
      id: 2,
      title: '今日のおやつランクアップ',
      description: '特別なおやつを選択可能',
      requiresApproval: true,
      usageLimit: '週3回まで'
    },
    {
      id: 3,
      title: '好きな場所へお出かけ',
      description: '週末のお出かけ先を選べる',
      requiresApproval: true,
      usageLimit: '月1回まで'
    }
  ]);

  const [aiPersona, setAiPersona] = useState<AIPersona>('will');
  const [praiseIntensity, setPraiseIntensity] = useState(65);

  const rankLabels = ['E', 'D', 'C', 'B', 'A', 'S'];
  
  const getRankValue = (rank: string): number => {
    return rankLabels.indexOf(rank);
  };

  const handleRankChange = (questId: number, newValue: number) => {
    setQuests(quests.map(q => 
      q.id === questId ? { ...q, rank: rankLabels[newValue] as any } : q
    ));
  };

  const toggleQuestActive = (id: number) => {
    setQuests(quests.map(q => q.id === id ? { ...q, active: !q.active } : q));
  };

  const toggleRewardApproval = (id: number) => {
    setRewards(rewards.map(r => 
      r.id === id ? { ...r, requiresApproval: !r.requiresApproval } : r
    ));
  };

  const aiPersonas = [
    { id: 'jin' as AIPersona, name: '熱血Jin', emoji: '🔥', description: '情熱的で励ましが多い' },
    { id: 'operator' as AIPersona, name: '冷静オペレーター', emoji: '🧊', description: '論理的で客観的' },
    { id: 'will' as AIPersona, name: '慈愛Will', emoji: '💝', description: '優しく包み込む' }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A15]" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
      {/* Control Room Grid Background */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, rgba(0, 212, 255, .3) 25%, rgba(0, 212, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .3) 75%, rgba(0, 212, 255, .3) 76%, transparent 77%),
            linear-gradient(90deg, transparent 24%, rgba(0, 212, 255, .3) 25%, rgba(0, 212, 255, .3) 26%, transparent 27%, transparent 74%, rgba(0, 212, 255, .3) 75%, rgba(0, 212, 255, .3) 76%, transparent 77%)
          `,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Header */}
      <div className="relative bg-gradient-to-r from-[#1A1A2E] to-[#0A0A15] px-5 pt-16 pb-6 border-b border-[#00D4FF]/20">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors border border-[#00D4FF]/30"
            >
              <ArrowLeft className="w-5 h-5 text-[#00D4FF]" />
            </button>
            <div>
              <h1 className="text-2xl text-white mb-1" style={{ lineHeight: 1.5 }}>
                Guild Master Control Panel
              </h1>
              <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.5 }}>
                管理者ダッシュボード
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-lg bg-[#FF4444]/20 text-[#FF4444] border border-[#FF4444]/50 hover:bg-[#FF4444]/30 transition-colors text-sm"
          >
            ログアウト
          </button>
        </div>
      </div>

      <div className="relative px-5 pt-6 pb-20">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-[#1A1A2E] rounded-lg p-4 border border-[#00D4FF]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#00D4FF]/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#00D4FF]" />
              </div>
              <div>
                <div 
                  className="text-xl text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  1
                </div>
                <div className="text-[#A0A0A0] text-xs">ユーザー</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A2E] rounded-lg p-4 border border-[#FFD700]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFD700]/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#FFD700]" />
              </div>
              <div>
                <div 
                  className="text-xl text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  75%
                </div>
                <div className="text-[#A0A0A0] text-xs">達成率</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1A1A2E] rounded-lg p-4 border border-[#7B68EE]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#7B68EE]/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-[#7B68EE]" />
              </div>
              <div>
                <div 
                  className="text-xl text-white"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {activityLogs.length}
                </div>
                <div className="text-[#A0A0A0] text-xs">今日の活動</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity Log - THE MOST IMPORTANT SECTION */}
        <div className="bg-[#1A1A2E] rounded-lg p-6 border border-[#00D4FF]/30 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Clock className="w-5 h-5 text-[#00D4FF]" />
            <h2 className="text-lg text-white">Recent Activity Log</h2>
            <span className="text-xs text-[#A0A0A0] ml-2">最近のAI鑑定履歴</span>
          </div>

          <div className="space-y-4">
            {activityLogs.map((log, index) => (
              <div key={log.id} className="relative">
                {/* Timeline Line */}
                {index < activityLogs.length - 1 && (
                  <div 
                    className="absolute left-5 top-12 bottom-[-16px] w-0.5 bg-gradient-to-b from-[#00D4FF]/50 to-[#00D4FF]/10"
                  />
                )}

                {/* Log Entry */}
                <div className="flex gap-4">
                  {/* Time & Rank Badge */}
                  <div className="flex flex-col items-center gap-2 w-20 flex-shrink-0">
                    <div 
                      className="text-xs text-[#A0A0A0]"
                      style={{ fontFamily: 'Orbitron, sans-serif' }}
                    >
                      {log.time}
                    </div>
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold relative z-10"
                      style={{ 
                        backgroundColor: log.rankColor,
                        boxShadow: `0 0 15px ${log.rankColor}60`,
                        fontFamily: 'Orbitron, sans-serif'
                      }}
                    >
                      {log.rank}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 bg-[#0A0A15] rounded-lg p-4 border border-[#00D4FF]/20">
                    <div className="mb-3">
                      <div className="text-xs text-[#00D4FF] mb-1">子供の報告</div>
                      <div className="text-white" style={{ lineHeight: 1.8 }}>
                        「{log.transcript}」
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-[#FFD700] mb-1">AIの評価</div>
                      <div className="text-[#A0A0A0] text-sm" style={{ lineHeight: 1.8 }}>
                        {log.aiFeedback}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activityLogs.length === 0 && (
            <div className="text-center py-8 text-[#A0A0A0]">
              まだ活動履歴がありません
            </div>
          )}
        </div>

        {/* Quest Management */}
        <div className="bg-[#1A1A2E] rounded-lg p-6 border border-[#00D4FF]/20 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg text-white">Quest Management</h2>
            <button className="px-3 py-2 rounded-lg bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 hover:bg-[#00D4FF]/30 transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          <div className="space-y-4">
            {quests.map((quest) => (
              <div
                key={quest.id}
                className="bg-[#0A0A15] rounded-lg p-4 border border-[#00D4FF]/20"
              >
                <div className="flex items-start gap-4 mb-3">
                  {/* Active Toggle */}
                  <button
                    onClick={() => toggleQuestActive(quest.id)}
                    className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center transition-all flex-shrink-0 ${
                      quest.active 
                        ? 'border-[#00D4FF] bg-[#00D4FF]/20' 
                        : 'border-[#3A3A4E] bg-[#1A1A2E]'
                    }`}
                  >
                    <div 
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        quest.active ? 'bg-[#00D4FF]' : 'bg-[#3A3A4E]'
                      }`}
                      style={{
                        boxShadow: quest.active ? '0 0 8px rgba(0, 212, 255, 0.6)' : 'none'
                      }}
                    />
                  </button>

                  {/* Quest Info */}
                  <div className="flex-1">
                    <div className="text-white mb-1" style={{ lineHeight: 1.5 }}>
                      {quest.title}
                    </div>
                    <div className="text-[#A0A0A0] text-xs">
                      報酬: {quest.xpReward} XP
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-lg bg-[#00D4FF]/20 text-[#00D4FF] flex items-center justify-center hover:bg-[#00D4FF]/30 transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="w-8 h-8 rounded-lg bg-[#FF4444]/20 text-[#FF4444] flex items-center justify-center hover:bg-[#FF4444]/30 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Difficulty Rank Slider */}
                <div className="pl-14">
                  <div className="flex items-center gap-3">
                    <label className="text-xs text-[#A0A0A0] w-16">Rank:</label>
                    <div className="flex-1 flex items-center gap-3">
                      <input
                        type="range"
                        min="0"
                        max="5"
                        value={getRankValue(quest.rank)}
                        onChange={(e) => handleRankChange(quest.id, Number(e.target.value))}
                        className="flex-1 h-1.5 rounded-full appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, #00D4FF 0%, #00D4FF ${(getRankValue(quest.rank) / 5) * 100}%, #3A3A4E ${(getRankValue(quest.rank) / 5) * 100}%, #3A3A4E 100%)`,
                        }}
                      />
                      <span 
                        className="w-8 text-center text-sm font-bold text-[#00D4FF]"
                        style={{ fontFamily: 'Orbitron, sans-serif' }}
                      >
                        {quest.rank}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-[#A0A0A0] mt-1 pl-16">
                    <span>Easy</span>
                    <span>Hard</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Personality Settings */}
        <div className="bg-[#1A1A2E] rounded-lg p-6 border border-[#7B68EE]/20 mb-6">
          <div className="flex items-center gap-2 mb-5">
            <Brain className="w-5 h-5 text-[#7B68EE]" />
            <h2 className="text-lg text-white">AI Personality Control</h2>
          </div>

          {/* Persona Selection */}
          <div className="mb-6">
            <label className="text-sm text-[#A0A0A0] mb-3 block">AIキャラクター</label>
            <div className="grid grid-cols-3 gap-3">
              {aiPersonas.map((persona) => (
                <button
                  key={persona.id}
                  onClick={() => setAiPersona(persona.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    aiPersona === persona.id
                      ? 'border-[#7B68EE] bg-[#7B68EE]/20'
                      : 'border-[#3A3A4E] bg-[#0A0A15] hover:border-[#7B68EE]/50'
                  }`}
                >
                  <div className="text-3xl mb-2">{persona.emoji}</div>
                  <div className={`text-sm mb-1 ${
                    aiPersona === persona.id ? 'text-[#7B68EE]' : 'text-[#A0A0A0]'
                  }`}>
                    {persona.name}
                  </div>
                  <div className="text-xs text-[#A0A0A0]" style={{ lineHeight: 1.5 }}>
                    {persona.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Praise Intensity Slider */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <SlidersHorizontal className="w-4 h-4 text-[#7B68EE]" />
              <label className="text-sm text-[#A0A0A0]">Praise Intensity - 賞賛の強度</label>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={praiseIntensity}
              onChange={(e) => setPraiseIntensity(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #7B68EE 0%, #7B68EE ${praiseIntensity}%, #3A3A4E ${praiseIntensity}%, #3A3A4E 100%)`,
              }}
            />
            <div className="flex justify-between mt-2">
              <span className="text-xs text-[#A0A0A0]">Logical (論理的)</span>
              <span 
                className="text-sm text-[#7B68EE]"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {praiseIntensity}%
              </span>
              <span className="text-xs text-[#A0A0A0]">Enthusiastic (熱狂的)</span>
            </div>
          </div>
        </div>

        {/* Reward Treasury */}
        <div className="bg-[#1A1A2E] rounded-lg p-6 border border-[#FFD700]/20">
          <div className="flex items-center gap-2 mb-5">
            <Gift className="w-5 h-5 text-[#FFD700]" />
            <h2 className="text-lg text-white">Reward Treasury</h2>
          </div>

          <div className="space-y-3">
            {rewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-[#0A0A15] rounded-lg p-4 border border-[#FFD700]/20"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-white mb-1" style={{ lineHeight: 1.5 }}>
                      {reward.title}
                    </div>
                    <div className="text-[#A0A0A0] text-sm mb-2" style={{ lineHeight: 1.5 }}>
                      {reward.description}
                    </div>
                    <div className="text-xs text-[#A0A0A0]">
                      {reward.usageLimit}
                    </div>
                  </div>
                  <button className="px-3 py-1 rounded-lg bg-[#00D4FF]/20 text-[#00D4FF] border border-[#00D4FF]/50 text-xs hover:bg-[#00D4FF]/30 transition-colors">
                    編集
                  </button>
                </div>

                {/* Manual Approval Toggle */}
                <div className="flex items-center justify-between pt-3 border-t border-[#FFD700]/10">
                  <span className="text-xs text-[#A0A0A0]">Manual Approval Required</span>
                  <button
                    onClick={() => toggleRewardApproval(reward.id)}
                    className={`relative w-12 h-6 rounded-full transition-all ${
                      reward.requiresApproval ? 'bg-[#FFD700]' : 'bg-[#3A3A4E]'
                    }`}
                  >
                    <div
                      className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all ${
                        reward.requiresApproval ? 'left-6' : 'left-0.5'
                      }`}
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full mt-4 py-3 rounded-lg bg-[#FFD700]/20 text-[#FFD700] border border-[#FFD700]/50 hover:bg-[#FFD700]/30 transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Reward
          </button>
        </div>
      </div>

      {/* CSS for Range Inputs */}
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00D4FF;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #00D4FF;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(0, 212, 255, 0.6);
        }
      `}</style>
    </div>
  );
}