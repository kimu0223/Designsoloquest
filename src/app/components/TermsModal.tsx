import { X } from "lucide-react";
import { motion } from "motion/react";

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TermsModal({ isOpen, onClose }: TermsModalProps) {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" />

      {/* Modal Window */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#2A2A3E] rounded-2xl shadow-2xl overflow-hidden"
        style={{
          maxHeight: '80vh'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3A4E]">
          <h2 
            className="text-xl text-white"
            style={{ lineHeight: 2 }}
          >
            利用規約
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-[#A0A0A0]" />
          </button>
        </div>

        {/* Body - Scrollable Content */}
        <div className="px-6 py-6 overflow-y-auto" style={{ maxHeight: 'calc(80vh - 80px)' }}>
          <div className="text-white space-y-4" style={{ lineHeight: 2 }}>
            <section>
              <h3 className="text-[#00D4FF] mb-2">第1条（適用）</h3>
              <p className="text-sm text-[#E0E0E0]">
                本規約は、本サービスの提供条件及び本サービスの利用に関する当社と登録ユーザーとの間の権利義務関係を定めることを目的とし、登録ユーザーと当社との間の本サービスの利用に関わる一切の関係に適用されます。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第2条（利用登録）</h3>
              <p className="text-sm text-[#E0E0E0]">
                登録希望者が当社の定める方法によって利用登録を申請し、当社がこれを承認することによって、利用登録が完了するものとします。当社は、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第3条（ユーザーIDおよびパスワードの管理）</h3>
              <p className="text-sm text-[#E0E0E0]">
                登録ユーザーは、自己の責任において、本サービスのユーザーIDおよびパスワードを管理するものとします。登録ユーザーは、いかなる場合にも、ユーザーIDおよびパスワードを第三者に譲渡または貸与することはできません。当社は、ユーザーIDとパスワードの組み合わせが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第4条（禁止事項）</h3>
              <p className="text-sm text-[#E0E0E0] mb-2">
                登録ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
              </p>
              <ul className="text-sm text-[#E0E0E0] list-disc list-inside space-y-1 pl-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当社のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為</li>
                <li>当社のサービスの運営を妨害するおそれのある行為</li>
                <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
                <li>他のユーザーに成りすます行為</li>
                <li>当社のサービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
              </ul>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第5条（本サービスの提供の停止等）</h3>
              <p className="text-sm text-[#E0E0E0]">
                当社は、以下のいずれかの事由があると判断した場合、登録ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。本サービスの提供の停止または中断により、登録ユーザーまたは第三者が被ったいかなる不利益または損害について、理由を問わず一切の責任を負わないものとします。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第6���（権利帰属）</h3>
              <p className="text-sm text-[#E0E0E0]">
                本サービスに関する知的財産権は全て当社または当社にライセンスを許諾している者に帰属しており、本規約に基づく本サービスの利用許諾は、本サービスに関する当社または当社にライセンスを許諾している者の知的財産権の使用許諾を意味するものではありません。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第7条（免責事項）</h3>
              <p className="text-sm text-[#E0E0E0]">
                当社の債務不履行責任は、当社の故意または重過失によらない場合には免責されるものとします。当社は、何らかの理由によって責任を負う場合にも、通常生じうる損害の範囲内かつ有料サービスにおいては代金額（継続的サービスの場合には1か月分相当額）の範囲内においてのみ賠償の責任を負うものとします。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第8条（サービス内容の変更等）</h3>
              <p className="text-sm text-[#E0E0E0]">
                当社は、登録ユーザーに通知することなく、本サービスの内容を変更しまたは本サービスの提供を中止することができるものとし、これによって登録ユーザーに生じた損害について一切の責任を負いません。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第9条（利用規約の変更）</h3>
              <p className="text-sm text-[#E0E0E0]">
                当社は、必要と判断した場合には、登録ユーザーに通知することなくいつでも本規約を変更することができるものとします。
              </p>
            </section>

            <section>
              <h3 className="text-[#00D4FF] mb-2">第10条（準拠法・裁判管轄）</h3>
              <p className="text-sm text-[#E0E0E0]">
                本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当社の本店所在地を管轄する裁判所を専属的合意��轄とします。
              </p>
            </section>

            <div className="pt-4 border-t border-[#3A3A4E] text-xs text-[#A0A0A0] text-right">
              最終更新日：2025年12月30日
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
