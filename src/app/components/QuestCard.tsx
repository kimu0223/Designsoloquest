interface QuestCardProps {
  rank: string;
  rankColor: string;
  title: string;
  completed: boolean;
  onComplete: () => void;
}

export function QuestCard({ rank, rankColor, title, completed, onComplete }: QuestCardProps) {
  return (
    <div 
      className="relative bg-[#0A0A15] rounded-xl p-4 border-2 transition-all duration-300"
      style={{
        borderColor: completed ? '#FFD700' : rankColor,
        boxShadow: completed 
          ? '0 0 20px rgba(255, 215, 0, 0.3)' 
          : `0 0 15px ${rankColor}40`
      }}
    >
      {/* Rank Badge */}
      <div className="flex items-center gap-4">
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center border-2"
          style={{ 
            borderColor: rankColor,
            backgroundColor: `${rankColor}15`,
            boxShadow: `0 0 10px ${rankColor}40`
          }}
        >
          <span 
            className="font-bold"
            style={{ 
              fontFamily: 'Orbitron, sans-serif',
              color: rankColor,
              fontSize: '18px'
            }}
          >
            {rank}
          </span>
        </div>

        {/* Quest Title */}
        <div className="flex-1">
          <p 
            className={`text-white ${completed ? 'line-through opacity-60' : ''}`}
            style={{ lineHeight: 2.2 }}
          >
            {title}
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={onComplete}
          disabled={completed}
          className={`px-6 py-3 rounded-lg border-2 transition-all duration-300 ${
            completed 
              ? 'border-[#FFD700] bg-[#FFD700]/20 text-[#FFD700]' 
              : 'border-[#00D4FF] bg-transparent text-[#00D4FF] hover:bg-[#00D4FF]/10'
          }`}
          style={{
            boxShadow: completed 
              ? '0 0 10px rgba(255, 215, 0, 0.3)' 
              : '0 0 10px rgba(0, 212, 255, 0.3)',
            minWidth: '90px'
          }}
        >
          {completed ? '完了!' : 'できた！'}
        </button>
      </div>
    </div>
  );
}
