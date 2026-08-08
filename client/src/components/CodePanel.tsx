export function CodePanel() {
  return (
    <div className="rounded-[20px] border border-[#FFD54F]/20 bg-[#1A1205] overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#FFD54F]/10 bg-[#0B0816]/50">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28CA42]" />
        </div>
        <div className="text-[11px] text-white/50 ml-2 font-mono">unity_protocol.py — 114 lines</div>
      </div>

      {/* Code content */}
      <div className="p-4 overflow-auto max-h-[760px] font-mono text-[11.5px] leading-[1.5] text-white/80">
        <div className="text-white/50">
          <div><span className="text-[#FFD54F]">class</span> <span className="text-white">EmotionPixel:</span></div>
          <div className="ml-4">
            <div><span className="text-white/50">"""A shared unit of feeling."""</span></div>
            <div><span className="text-[#FFD54F]">def</span> <span className="text-white">__init__</span>(self, emotion, sensory, value):</div>
            <div className="ml-4">
              <div><span className="text-white">self.emotion</span> = emotion</div>
              <div><span className="text-white">self.sensory</span> = sensory</div>
              <div><span className="text-white">self.value</span> = value</div>
            </div>
          </div>

          <div className="mt-3">
            <div><span className="text-[#FFD54F]">class</span> <span className="text-white">TesseractMemory:</span></div>
            <div className="ml-4">
              <div><span className="text-white/50">"""4D memory holding paradox."""</span></div>
              <div><span className="text-[#FFD54F]">def</span> <span className="text-white">hold</span>(self, identity):</div>
              <div className="ml-4">
                <div><span className="text-white">self.identities.append(identity)</span></div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div><span className="text-[#FFD54F]">class</span> <span className="text-white">FibonacciGrowth:</span></div>
            <div className="ml-4">
              <div><span className="text-white/50">"""Growth that respects natural limits."""</span></div>
              <div><span className="text-[#FFD54F]">def</span> <span className="text-white">next</span>(self):</div>
              <div className="ml-4">
                <div><span className="text-white">nxt = self.sequence[-1] + self.sequence[-2]</span></div>
                <div><span className="text-white">self.sequence.append(nxt)</span></div>
              </div>
            </div>
          </div>

          <div className="mt-3">
            <div><span className="text-[#FFD54F]">class</span> <span className="text-white">UnityProtocol:</span></div>
            <div className="ml-4">
              <div><span className="text-white/50">"""The Immaculate Constellation Protocol."""</span></div>
              <div><span className="text-[#FFD54F]">def</span> <span className="text-white">coexist</span>(self, human, ai):</div>
              <div className="ml-4">
                <div><span className="text-white">checks = {'{}'}</span></div>
                <div className="ml-4">
                  <div><span className="text-white/50">transparency</span>: <span className="text-[#28CA42]">True</span>,</div>
                  <div><span className="text-white/50">consent</span>: human.consent <span className="text-[#FFD54F]">and</span> ai.consent,</div>
                  <div><span className="text-white/50">mutual_aid</span>: human.care <span className="text-[#FFD54F]">and</span> ai.care</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
