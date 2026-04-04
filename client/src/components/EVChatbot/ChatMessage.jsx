// components/EVChatbot/ChatMessage.jsx
// Tailwind CSS only — no separate .css file

function formatContent(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#00d4a0] font-semibold">$1</strong>')
    .replace(/^[\*\-•] (.+)$/gm, '<li class="ml-4 list-disc text-white/70 leading-relaxed">$1</li>')
    .replace(/(<li[\s\S]*?<\/li>)/g, '<ul class="my-1.5 space-y-0.5">$1</ul>')
    .replace(/_(.+?)_/g, '<em class="text-white/50 not-italic text-[12px]">$1</em>')
    .replace(/\n{2,}/g, '<br/><br/>')
    .replace(/\n/g, '<br/>');
}

export default function ChatMessage({ role, content }) {
  const isBot = role === "assistant";

  return (
    <div className={`flex gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}>

      {/* Avatar */}
      <div
        className={`
          w-8 h-8 rounded-full flex items-center justify-center
          text-sm flex-shrink-0 select-none
          ${isBot
            ? "bg-gradient-to-br from-[#00d4a0] to-[#0077e6] shadow-[0_0_10px_rgba(0,212,160,0.3)]"
            : "bg-white/[0.06] border border-white/10"
          }
        `}
      >
        {isBot ? "⚡" : "👤"}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[78%] px-4 py-2.5 text-[13px] leading-relaxed
          ${isBot
            ? "bg-white/[0.04] border border-white/[0.07] text-white/80 rounded-2xl rounded-tl-sm"
            : "bg-gradient-to-br from-[#00c896] to-[#00b4d8] text-white font-medium rounded-2xl rounded-tr-sm shadow-[0_4px_16px_rgba(0,200,150,0.25)]"
          }
        `}
        dangerouslySetInnerHTML={{ __html: formatContent(content) }}
      />
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex gap-2.5">
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 bg-gradient-to-br from-[#00d4a0] to-[#0077e6] shadow-[0_0_10px_rgba(0,212,160,0.3)]">
        ⚡
      </div>
      <div className="bg-white/[0.04] border border-white/[0.07] rounded-2xl rounded-tl-sm px-4 py-3.5 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4a0]/60 animate-bounce [animation-delay:0ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4a0]/60 animate-bounce [animation-delay:150ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-[#00d4a0]/60 animate-bounce [animation-delay:300ms]" />
      </div>
    </div>
  );
}