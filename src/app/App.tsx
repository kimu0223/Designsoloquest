import { useState } from "react";
import { Header } from "./components/Header";
import { QuestCard } from "./components/QuestCard";
import { FloatingActionButton } from "./components/FloatingActionButton";
import { VoiceOverlay } from "./components/VoiceOverlay";
import { TermsModal } from "./components/TermsModal";
import { SideMenu } from "./components/SideMenu";
import { ProfilePage } from "./pages/ProfilePage";
import { InventoryPage } from "./pages/InventoryPage";
import { RewardsPage } from "./pages/RewardsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { AdminLoginPage } from "./pages/AdminLoginPage";
import { AdminDashboard } from "./pages/AdminDashboard";
import { MonthlyReportPage } from "./pages/MonthlyReportPage";

interface Quest {
  id: number;
  rank: string;
  rankColor: string;
  title: string;
  completed: boolean;
}

type Page = 'dashboard' | 'profile' | 'inventory' | 'rewards' | 'settings' | 'admin' | 'admin-dashboard' | 'monthly-report';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isVoiceOverlayOpen, setIsVoiceOverlayOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [quests, setQuests] = useState<Quest[]>([
    {
      id: 1,
      rank: "[E]",
      rankColor: "#00D4FF",
      title: "はみがきを する",
      completed: false
    },
    {
      id: 2,
      rank: "[E]",
      rankColor: "#00D4FF",
      title: "じぶんで ふくを きる",
      completed: false
    },
    {
      id: 3,
      rank: "[D]",
      rankColor: "#FFD700",
      title: "しゅくだいを おわらせる",
      completed: false
    },
    {
      id: 4,
      rank: "[D]",
      rankColor: "#FFD700",
      title: "おてつだいを する",
      completed: false
    }
  ]);

  const [playerLevel] = useState(1);
  const [currentXP, setCurrentXP] = useState(20);
  const [nextLevelXP] = useState(100);

  const handleCompleteQuest = (questId: number) => {
    setQuests(prevQuests =>
      prevQuests.map(quest =>
        quest.id === questId ? { ...quest, completed: true } : quest
      )
    );
    
    // Add XP for completing quest
    setCurrentXP(prev => Math.min(prev + 20, nextLevelXP));
  };

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
  };

  const handleBackToDashboard = () => {
    setCurrentPage('dashboard');
  };

  const handleAdminLogin = () => {
    setCurrentPage('admin-dashboard');
  };

  const handleAdminLogout = () => {
    setCurrentPage('dashboard');
  };

  const handleViewReport = () => {
    setCurrentPage('monthly-report');
  };

  // Render different pages based on currentPage state
  if (currentPage === 'profile') {
    return <ProfilePage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'inventory') {
    return <InventoryPage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'rewards') {
    return <RewardsPage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'settings') {
    return <SettingsPage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'admin') {
    return (
      <AdminLoginPage 
        onBack={handleBackToDashboard}
        onLogin={handleAdminLogin}
      />
    );
  }

  if (currentPage === 'monthly-report') {
    return <MonthlyReportPage onBack={handleBackToDashboard} />;
  }

  if (currentPage === 'admin-dashboard') {
    return (
      <AdminDashboard 
        onBack={handleBackToDashboard}
        onLogout={handleAdminLogout}
        onViewReport={handleViewReport}
      />
    );
  }

  // Main Dashboard
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{ 
        backgroundColor: '#1A1A2E',
        fontFamily: "'Noto Sans JP', sans-serif"
      }}
    >
      {/* Background pattern */}
      <div 
        className="fixed inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, #00D4FF 1px, transparent 1px),
            linear-gradient(-45deg, #00D4FF 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }}
      />

      {/* Header */}
      <Header 
        level={playerLevel}
        currentXP={currentXP}
        nextLevelXP={nextLevelXP}
        onMenuClick={() => setIsSideMenuOpen(true)}
      />

      {/* Main Content - Scrollable */}
      <div className="px-5 pb-40 pt-4">
        {/* Section Title */}
        <h2 
          className="text-xl text-white mb-6"
          style={{ 
            lineHeight: 2.5,
            textShadow: '0 0 10px rgba(0, 212, 255, 0.3)'
          }}
        >
          今日のクエスト
        </h2>

        {/* Quest Cards */}
        <div className="space-y-4">
          {quests.map(quest => (
            <QuestCard
              key={quest.id}
              rank={quest.rank}
              rankColor={quest.rankColor}
              title={quest.title}
              completed={quest.completed}
              onComplete={() => handleCompleteQuest(quest.id)}
            />
          ))}
        </div>

        {/* Additional Info Section */}
        <div className="mt-8 p-6 bg-gradient-to-br from-[#0A0A15] to-[#1A1A2E] rounded-xl border border-[#00D4FF]/20">
          <h3 className="text-[#00D4FF] mb-3" style={{ lineHeight: 2 }}>
            システムについて
          </h3>
          <p className="text-[#A0A0A0] text-sm" style={{ lineHeight: 2.2 }}>
            クエストをクリアして、レベルアップしよう！<br />
            AIボタンをおして、あなたのがんばりをAIにつたえてね。
          </p>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton 
        onClick={() => setIsVoiceOverlayOpen(true)}
        onTermsClick={() => setIsTermsModalOpen(true)}
      />

      {/* Side Menu */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* Voice Overlay */}
      <VoiceOverlay 
        isOpen={isVoiceOverlayOpen}
        onClose={() => setIsVoiceOverlayOpen(false)}
      />

      {/* Terms Modal */}
      <TermsModal 
        isOpen={isTermsModalOpen}
        onClose={() => setIsTermsModalOpen(false)}
      />
    </div>
  );
}