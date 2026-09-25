'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function UniqueManifestationPortalContent() {
  const searchParams = useSearchParams();
  const [name, setName] = useState<string>('');
  const [intention, setIntention] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStep, setLoadingStep] = useState<number>(0);
  const [matrixReady, setMatrixReady] = useState<boolean>(false);
  const [hashOutput, setHashOutput] = useState<string>('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [isCheckoutLoading, setIsCheckoutLoading] = useState<boolean>(false);

  const [consoleLogs, setConsoleLogs] = useState<string[]>([]);
  const generatorRef = useRef<HTMLDivElement>(null);

  const currentHolderName = name && name.trim() !== '' ? name.trim() : 'Traveler';

  useEffect(() => {
    document.title = "Unique Manifestation | Custom Intention Seal & 432 Hz Frequency";

    let metaDesc = document.querySelector("meta[name='description']") as HTMLMetaElement | null;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = "Transform your desires with Unique Manifestation. Generate your custom cryptographic intention seal and 432 Hz frequency audio package tailored exclusively to you.";

    const successParam = searchParams.get("success");
    const hashParam = searchParams.get("hash");

    if (successParam === "true" && hashParam) {
      setShowSuccessModal(true);
      setMatrixReady(true);
      setHashOutput(hashParam);

      // Tarayıcı hafızasından ismi ve niyeti güvenli bir şekilde çekiyoruz
      const savedName = localStorage.getItem("user_name");
      const savedIntention = localStorage.getItem("user_intention");

      if (savedName) setName(savedName);
      if (savedIntention) setIntention(savedIntention);
    }
  }, [searchParams]);

  const scrollToGenerator = () => {
    generatorRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    let logInterval: NodeJS.Timeout;
    let stepInterval: NodeJS.Timeout;

    if (isGenerating) {
      const logSnippets = [
        "INITIATING 432HZ QUANTUM CORE...",
        "BYPASSING MAINFRAME ENTROPY...",
        "PARSING USER BIO-SIGNATURE HARMONICS...",
        "ENCRYPTING SACRED GEOMETRY MESH...",
        "ALLOCATING UNIQUE HASH SECTOR...",
        "SYNCHRONIZING MANIFESTATION VECTOR...",
        "CALIBRATING NEURAL FREQUENCY RESONANCE...",
        "ESTABLISHING SECURE ENTANGLEMENT CHANNEL...",
        "01101001 11001010 01010111 00110011",
        "COMPILING MATRIX SEAL v3.69..."
      ];

      logInterval = setInterval(() => {
        const randomSnippet = logSnippets[Math.floor(Math.random() * logSnippets.length)];
        const hexSuffix = Math.random().toString(16).substring(2, 10).toUpperCase();
        setConsoleLogs(prev => [...prev.slice(-6), `> [SYS_OK] ${randomSnippet} // 0x${hexSuffix}`]);
      }, 250);

      const steps = [
        "DECRYPTING NAME HARMONICS...",
        "MAPPING INTENTION VECTOR...",
        "INJECTING 432 Hz MATRIX...",
        "SYNCHRONIZING QUANTUM ENTANGLEMENT...",
        "FORGING HASH SIGNATURE..."
      ];

      let currentStep = 0;
      stepInterval = setInterval(() => {
        currentStep++;
        if (currentStep < steps.length) {
          setLoadingStep(currentStep);
        }
      }, 1600);
    }

    return () => {
      clearInterval(logInterval);
      clearInterval(stepInterval);
    };
  }, [isGenerating]);

  const handleManifest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !intention) return;

    // İsmi ve niyeti tarayıcı hafızasına kaydediyoruz
    localStorage.setItem("user_name", name.trim());
    localStorage.setItem("user_intention", intention.trim());

    setIsGenerating(true);
    setLoadingStep(0);
    setMatrixReady(false);
    setConsoleLogs([]);

    const uniqueHash = 'UM-369-SEAL-' + Math.random().toString(36).substring(2, 10).toUpperCase() + '-' + Date.now().toString(36);
    setHashOutput(uniqueHash);


    setTimeout(() => {
      setIsGenerating(false);
      setMatrixReady(true);
    }, 8200);
  };

  const handleCheckout = () => {
    try {
      setIsCheckoutLoading(true);
      // Bilgileri tarayıcı hafızasına kaydediyoruz
      localStorage.setItem("user_name", currentHolderName);
      localStorage.setItem("user_intention", intention);
      localStorage.setItem("user_hash", hashOutput);

      // Eğer Lemon Squeezy doğrudan ödeme linkin varsa buraya direkt ekleyebilirsin
      // Örnek: window.location.href = "https://magazan.lemonsqueezy.com/buy/senin-urun-id";

      // Şimdilik test ve simülasyon amaçlı doğrudan başarı sayfasına yönlendirelim:
      setTimeout(() => {
        setIsCheckoutLoading(false);
        window.location.href = `/?success=true&hash=${encodeURIComponent(hashOutput)}`;
      }, 1500);
    } catch (error) {
      console.error("Hata:", error);
      alert("Bir hata oluştu.");
      setIsCheckoutLoading(false);
    }
  };
  const getDynamicSealParams = () => {
    const timestamp = Date.now().toString();
    const combined = currentHolderName + intention + timestamp;
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = (hash << 5) - hash + combined.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);

    const outerRadius = 160 + (absHash % 60);
    const innerRadius = 35 + ((absHash >> 3) % 45);
    const polygonPoints1 = `250,${40 + (absHash % 50)} ${430 - (absHash % 40)},380 70,380`;
    const polygonPoints2 = `250,${420 + (absHash % 30)} 70,${110 + ((absHash >> 2) % 40)} 430,${110 + ((absHash >> 4) % 40)}`;
    const dashArray = `${3 + (absHash % 15)} ${2 + ((absHash >> 1) % 8)}`;
    const rotationAngle = (absHash % 360);

    return { outerRadius, innerRadius, polygonPoints1, polygonPoints2, dashArray, rotationAngle };
  };

  const handleDownloadSeal = () => {
    const p = getDynamicSealParams();

    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  <rect width="500" height="500" fill="#020205"/>
  <circle cx="250" cy="250" r="${p.outerRadius}" fill="none" stroke="#9333EA" stroke-width="3" stroke-dasharray="${p.dashArray}"/>
  <circle cx="250" cy="250" r="${p.outerRadius - 20}" fill="none" stroke="#00FF66" stroke-width="1.5" opacity="0.7"/>
  <circle cx="250" cy="250" r="${p.outerRadius - 40}" fill="none" stroke="#A855F7" stroke-width="1" stroke-dasharray="5 5"/>
  <g transform="rotate(${p.rotationAngle} 250 250)">
    <polygon points="${p.polygonPoints1}" fill="none" stroke="#A855F7" stroke-width="2.5"/>
    <polygon points="${p.polygonPoints2}" fill="none" stroke="#00FF66" stroke-width="1.5"/>
    <circle cx="250" cy="250" r="70" fill="none" stroke="#00FF66" stroke-width="1" stroke-dasharray="3 3"/>
  </g>
  <circle cx="250" cy="250" r="${p.innerRadius}" fill="none" stroke="#9333EA" stroke-width="2"/>
  <polygon points="250,${250 - p.innerRadius + 5} ${250 + p.innerRadius - 5},250 250,${250 + p.innerRadius - 5} ${250 - p.innerRadius + 5},250" fill="none" stroke="#00FF66" stroke-width="1"/>
  <circle cx="250" cy="250" r="10" fill="#00FF66"/>
  <style>
    .title { fill: #00FF66; font-family: monospace; font-size: 14px; text-anchor: middle; font-weight: bold; }
    .meta { fill: #A855F7; font-family: monospace; font-size: 10px; text-anchor: middle; }
  </style>
  <text x="250" y="45" class="title"></text>
  <text x="250" y="470" class="meta">HOLDER: ${currentHolderName.toUpperCase()}</text>
  <text x="250" y="485" class="meta">HASH: ${hashOutput}</text>
</svg>`;

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentHolderName.replace(/\s+/g, '_')}_Intention_Seal.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAudio = async () => {
    try {
      const sampleRate = 44100;
      const durationSeconds = 6;
      const numChannels = 1;
      const totalSamples = sampleRate * durationSeconds;

      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const audioCtx = new AudioContextClass({ sampleRate });
      const buffer = audioCtx.createBuffer(numChannels, totalSamples, sampleRate);
      const channelData = buffer.getChannelData(0);

      const combined = currentHolderName + intention + Date.now().toString();
      let hash = 0;
      for (let i = 0; i < combined.length; i++) {
        hash = (hash << 5) - hash + combined.charCodeAt(i);
        hash |= 0;
      }
      const absHash = Math.abs(hash);

      const baseFreq = 428 + (absHash % 17) * 0.5;
      const modFreq = 2 + ((absHash >> 3) % 9);
      const harmonicMultiplier = 1.5 + ((absHash >> 5) % 3);

      for (let i = 0; i < totalSamples; i++) {
        let envelope = 1;
        if (i < 4410) envelope = i / 4410;
        else if (i > totalSamples - 4410) envelope = (totalSamples - i) / 4410;

        const t = i / sampleRate;
        const carrier = Math.sin(2 * Math.PI * baseFreq * t);
        const modulator = Math.sin(2 * Math.PI * modFreq * t) * 0.25;
        const harmonic = Math.sin(2 * Math.PI * (baseFreq * harmonicMultiplier) * t) * 0.15;

        channelData[i] = (carrier + modulator + harmonic) * 0.4 * envelope;
      }

      const wavBuffer = bufferToWav(buffer, totalSamples);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentHolderName.replace(/\s+/g, '_')}_Unique_432Hz_Resonance.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Audio generation error. Please try again.");
    }
  };

  const bufferToWav = (buffer: AudioBuffer, totalSamples: number) => {
    const numOfChan = buffer.numberOfChannels;
    const length = totalSamples * numOfChan * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    let pos = 0;

    function writeString(str: string) {
      for (let i = 0; i < str.length; i++) {
        out.setUint8(pos++, str.charCodeAt(i));
      }
    }

    function setUint16(data: number) {
      out.setUint16(pos, data, true);
      pos += 2;
    }

    function setUint32(data: number) {
      out.setUint32(pos, data, true);
      pos += 4;
    }

    writeString('RIFF');
    setUint32(length - 8);
    writeString('WAVE');
    writeString('fmt ');
    setUint32(16);
    setUint16(1);
    setUint16(numOfChan);
    setUint32(buffer.sampleRate);
    setUint32(buffer.sampleRate * 2 * numOfChan);
    setUint16(numOfChan * 2);
    setUint16(16);
    writeString('data');
    setUint32(length - pos - 4);

    let offset = 0;
    const channelData = buffer.getChannelData(0);
    while (offset < totalSamples) {
      const sample = Math.max(-1, Math.min(1, channelData[offset]));
      const intSample = (0.5 + (sample < 0 ? sample * 32768 : sample * 32767)) | 0;
      out.setInt16(pos, intSample, true);
      pos += 2;
      offset++;
    }

    return out.buffer;
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const previewParams = getDynamicSealParams();

  return (
      <main className="min-h-screen bg-[#020205] text-gray-100 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-x-hidden font-sans">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-purple-900/30 rounded-full blur-[220px] pointer-events-none"></div>
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[#9333EA]/20 rounded-full blur-[180px] pointer-events-none"></div>

        <div className="max-w-3xl w-full space-y-10 relative z-10 my-12">
          <header className="bg-[#05050a]/90 backdrop-blur-xl border border-purple-900/50 p-8 md:p-12 rounded-3xl shadow-[0_0_50px_rgba(147,51,234,0.12)] space-y-6 text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-[#00FF66] font-mono drop-shadow-[0_0_8px_rgba(0,255,102,0.5)]">
            // Cryptographic & Quantum Alignment Protocol
          </span>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Make Your Intention <span className="text-[#A855F7] drop-shadow-[0_0_15px_rgba(168,85,247,0.9)]">Absolutely Unique.</span>
            </h1>

            <div className="text-gray-300 text-sm md:text-base leading-relaxed space-y-4 max-w-2xl mx-auto font-light text-left">
              <div className="space-y-4 text-center border-b border-purple-950/80 pb-6">
                <p className="text-white font-medium text-base md:text-lg">
                  Generic wishes vanish into the background noise of the universe. To manifest your reality, your frequency must stand alone.
                </p>
                <div>
                  <button
                      onClick={scrollToGenerator}
                      className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#00FF66] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#26ff7d] transition-all shadow-[0_0_25px_rgba(0,255,102,0.6)] cursor-pointer"
                  >
                    <span>Claim Your Intention-Customized Seal & Audio</span>
                    <svg className="w-4 h-4 animate-bounce text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="pt-2">
                Millions of people wish for the exact same things every single day using vague statements. The universe, however, does not respond to common static; it responds to distinct, mathematically verified codes.
              </p>
              <p className="border-l-2 border-[#00FF66] pl-4 py-1 text-gray-300 font-mono text-xs md:text-sm">
                &quot;UniqueManifestation uses a proprietary encryption algorithm to generate both a custom intention seal and a 432 Hz-based audio frequency file, both tailored exclusively to your name and intention. No two seals or frequency packages in existence are ever alike.&quot;
              </p>
            </div>
          </header>

          <div ref={generatorRef} className="max-w-xl mx-auto w-full bg-[#05050a]/95 backdrop-blur-2xl border border-purple-900/50 rounded-3xl p-8 md:p-10 shadow-[0_0_60px_rgba(147,51,234,0.15)] relative scroll-mt-10 overflow-hidden">
            <div className="text-center mb-8">
              <span className="block text-xs uppercase tracking-widest text-[#00FF66] font-mono mb-2 drop-shadow-[0_0_6px_rgba(0,255,102,0.4)]">// Secure Manifestation Chamber</span>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Encode Your Custom Intention Seal
              </h2>
              <p className="text-gray-400 text-xs mt-2">Cryptographic and sacred geometric matrix generation.</p>
            </div>

            {isGenerating ? (
                <div className="py-10 px-4 space-y-6 text-center animate-fadeIn relative bg-black border border-[#00FF66]/40 rounded-2xl shadow-[0_0_30px_rgba(0,255,102,0.15)] overflow-hidden font-mono">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none z-20"></div>

                  <div className="space-y-2 relative z-10">
                    <div className="inline-block px-3 py-1 bg-black border border-[#00FF66] text-[#00FF66] text-[10px] tracking-widest uppercase rounded shadow-[0_0_10px_rgba(0,255,102,0.4)] animate-pulse">
                      SYSTEM OVERRIDE // QUANTUM MATRIX ACTIVE
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white tracking-wider uppercase drop-shadow-[0_0_10px_rgba(168,85,247,0.9)]">
                      {loadingStep === 0 && "DECRYPTING NAME HARMONICS..."}
                      {loadingStep === 1 && "MAPPING INTENTION VECTOR..."}
                      {loadingStep === 2 && "INJECTING 432 Hz MATRIX..."}
                      {loadingStep === 3 && "SYNCHRONIZING QUANTUM ENTANGLEMENT..."}
                      {loadingStep >= 4 && "FORGING HASH SIGNATURE..."}
                    </h3>
                  </div>

                  <div className="bg-[#020204] border border-gray-900 rounded-xl p-4 text-left h-36 overflow-hidden flex flex-col justify-end text-[11px] text-[#00FF66] space-y-1 shadow-[inset_0_0_15px_rgba(0,255,102,0.05)]">
                    <div className="text-gray-500 text-[10px]">root@manifest-core:~# execute_quantum_seal.sh</div>
                    {consoleLogs.map((log, idx) => (
                        <div key={idx} className="animate-fadeIn tracking-wider">{log}</div>
                    ))}
                    <div className="flex items-center space-x-1 text-[#00FF66]">
                      <span>&gt;</span>
                      <span className="w-2 h-4 bg-[#00FF66] animate-pulse"></span>
                    </div>
                  </div>

                  <div className="w-full bg-gray-950 h-2 rounded-full overflow-hidden border border-gray-800 relative z-10">
                    <div
                        className="bg-[#00FF66] h-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,255,102,0.8)]"
                        style={{ width: `${((loadingStep + 1) / 5) * 100}%` }}
                    ></div>
                  </div>
                </div>
            ) : !matrixReady ? (
                <form onSubmit={handleManifest} className="space-y-5">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Your Full Name (Seal Holder)
                    </label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g., Alex Vance"
                        required
                        className="w-full bg-[#0a0a12] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all placeholder:text-gray-600"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-gray-400 mb-2">
                      Your Specific Intention
                    </label>
                    <textarea
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        rows={3}
                        placeholder="e.g., Absolute financial abundance, mental clarity and creative flow..."
                        required
                        className="w-full bg-[#0a0a12] border border-purple-900/50 rounded-xl px-4 py-3 text-sm text-gray-200 focus:outline-none focus:border-[#A855F7] focus:ring-1 focus:ring-[#A855F7] transition-all placeholder:text-gray-600 resize-none"
                    />
                  </div>

                  <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-[#9333EA] text-white font-black tracking-wider uppercase text-xs md:text-sm hover:bg-[#A855F7] transition-all shadow-[0_0_30px_rgba(147,51,234,0.6)] flex items-center justify-center space-x-3 cursor-pointer"
                  >
                    <span>Generate Your Intention-Customized Seal & Audio</span>
                  </button>
                </form>
            ) : (
                <div className="space-y-6 text-center animate-fadeIn">
                  <div className="p-5 bg-gradient-to-b from-[#0a0a16] to-black border border-[#9333EA]/40 rounded-2xl space-y-4 relative overflow-hidden shadow-[inset_0_0_20px_rgba(147,51,234,0.15)]">
                    <div className="w-36 h-36 mx-auto bg-black border border-[#9333EA]/50 rounded-2xl flex items-center justify-center relative shadow-[0_0_35px_rgba(147,51,234,0.3)] overflow-hidden">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#9333EA]/20 via-transparent to-transparent animate-pulse"></div>

                      <svg className="w-28 h-28 text-[#A855F7] drop-shadow-[0_0_12px_rgba(168,85,247,0.9)] transition-all duration-700 blur-[2px] opacity-60" viewBox="0 0 500 500" fill="none" stroke="currentColor" strokeWidth="3">
                        <circle cx="250" cy="250" r={previewParams.outerRadius} stroke="#9333EA" strokeDasharray={previewParams.dashArray} />
                        <circle cx="250" cy="250" r={previewParams.outerRadius - 20} stroke="#00FF66" strokeWidth="1.5" opacity="0.7" />
                        <g transform={`rotate(${previewParams.rotationAngle} 250 250)`}>
                          <polygon points={previewParams.polygonPoints1} stroke="#A855F7" strokeWidth="4" />
                          <polygon points={previewParams.polygonPoints2} stroke="#00FF66" strokeWidth="2" />
                        </g>
                        <circle cx="250" cy="250" r={previewParams.innerRadius} stroke="#9333EA" strokeWidth="3" />
                        <circle cx="250" cy="250" r="14" fill="#00FF66" />
                      </svg>

                      <div className="absolute inset-0 flex items-center justify-center rotate-[-30deg] pointer-events-none">
                    <span className="text-[11px] font-mono font-black tracking-widest text-[#00FF66]/80 uppercase border border-[#00FF66]/40 px-2 py-1 bg-black/60 shadow-lg">
                      WATERMARK PREVIEW
                    </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono text-[#00FF66] tracking-widest uppercase drop-shadow-[0_0_6px_rgba(0,255,102,0.5)]">Custom Seal Successfully Coded</span>
                      <p className="text-[11px] font-mono text-gray-400 break-all bg-black p-2.5 rounded-lg border border-gray-900 mt-2">
                        {hashOutput}
                      </p>
                    </div>
                  </div>

                  <button
                      onClick={handleCheckout}
                      disabled={isCheckoutLoading}
                      className="w-full py-4 rounded-xl bg-[#9333EA] text-white font-black text-xs uppercase tracking-wider hover:bg-[#A855F7] transition-all shadow-[0_0_30px_rgba(147,51,234,0.6)] cursor-pointer disabled:opacity-50"
                  >
                    {isCheckoutLoading ? "Initializing Secure Checkout" : "Unlock Your Intention-Customized Seal & Audio ($14.90)"}
                  </button>

                  <button
                      onClick={() => { setMatrixReady(false); setName(''); setIntention(''); }}
                      className="text-xs text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4 cursor-pointer"
                  >
                    Generate Another Seal
                  </button>
                </div>
            )}
          </div>

          <section className="bg-[#05050a]/60 backdrop-blur-md border border-purple-900/40 p-8 rounded-3xl space-y-6">
            <h3 className="text-xl font-bold text-white text-center tracking-wide">
              // Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {[
                { id: 1, q: "What will I receive after purchase?", a: "You will receive a unique custom intention seal encrypted with a special algorithm tailored exclusively to you and your intention, along with a 432 Hz-based audio frequency sound file completely customized and encrypted to your personal resonance. Both will be instantly available for download after payment." },
                { id: 2, q: "How does the 3-6-9 ritual application work?", a: "This is a supplementary application ritual: apply it by playing your frequency 6 times during 3 daily sessions (morning, midday, and evening) while deeply focusing on your custom seal to broadcast your intention into the universe, repeating this practice for 9 consecutive days." },
                { id: 3, q: "How can a frequency be both 432 Hz and unique to me?", a: "432 Hz serves as the foundational, harmonious base frequency for deep mental resonance. However, your audio file is not just a raw tone; it is cryptographically modulated and structured using your unique name and intention matrix, making the final audio package entirely exclusive to your frequency pattern." },
                { id: 4, q: "Is this intention seal truly unique to me?", a: "Yes, absolutely. Your input name and intention text are blended through a cryptographic hashing function to formulate a one-of-a-kind matrix. No other person in the world will ever possess or generate your exact seal code." }
              ].map((faq) => (
                  <div
                      key={faq.id}
                      className="border rounded-2xl overflow-hidden bg-black/40 transition-all"
                      style={{
                        borderColor: openFaq === faq.id ? '#A855F7' : '#1e1b4b',
                        boxShadow: openFaq === faq.id ? '0 0 20px rgba(168,85,247,0.3)' : 'none'
                      }}
                  >
                    <button
                        onClick={() => toggleFaq(faq.id)}
                        className="w-full p-4 text-left font-medium text-sm md:text-base flex justify-between items-center transition-colors cursor-pointer"
                        style={{ color: openFaq === faq.id ? '#A855F7' : '#e5e7eb' }}
                    >
                      <span>{faq.q}</span>
                      <span className="font-mono font-bold text-[#A855F7]" style={{ textShadow: '0 0 8px rgba(168,85,247,0.6)' }}>
                    {openFaq === faq.id ? '[-] ' : '[+]'}
                  </span>
                    </button>
                    {openFaq === faq.id && (
                        <div className="p-4 pt-0 text-xs md:text-sm leading-relaxed border-t border-purple-950/80 font-light text-gray-300">
                          {faq.a}
                        </div>
                    )}
                  </div>
              ))}
            </div>
          </section>

          <footer className="text-center space-y-4 pt-6 pb-12 border-t border-purple-950/80 text-xs text-gray-500 font-mono">
            <div className="flex flex-wrap justify-center gap-6">
              <button onClick={() => setActiveModal('privacy')} className="text-[#00FF66] hover:text-[#26ff7d] transition-colors cursor-pointer underline underline-offset-4 font-bold drop-shadow-[0_0_6px_rgba(0,255,102,0.4)]">Privacy Policy</button>
              <button onClick={() => setActiveModal('terms')} className="text-[#00FF66] hover:text-[#26ff7d] transition-colors cursor-pointer underline underline-offset-4 font-bold drop-shadow-[0_0_6px_rgba(0,255,102,0.4)]">Terms of Service</button>
              <button onClick={() => setActiveModal('refund')} className="text-[#00FF66] hover:text-[#26ff7d] transition-colors cursor-pointer underline underline-offset-4 font-bold drop-shadow-[0_0_6px_rgba(0,255,102,0.4)]">Refund Policy</button>
              <button onClick={() => setActiveModal('contact')} className="text-[#00FF66] hover:text-[#26ff7d] transition-colors cursor-pointer underline underline-offset-4 font-bold drop-shadow-[0_0_6px_rgba(0,255,102,0.4)]">Support & Contact</button>
              <button onClick={() => setActiveModal('affiliate')} className="text-[#00FF66] hover:text-[#26ff7d] transition-colors cursor-pointer underline underline-offset-4 font-bold drop-shadow-[0_0_6px_rgba(0,255,102,0.4)]">Affiliate Program</button>
            </div>
            <p>© {new Date().getFullYear()} UniqueManifestation. All rights reserved. Secure digital goods delivery.</p>
          </footer>
        </div>

        {showSuccessModal && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className="bg-[#080814] border border-[#00FF66]/60 max-w-md w-full rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(0,255,102,0.25)] relative text-center">
                <div className="w-16 h-16 mx-auto bg-[#00FF66]/10 border border-[#00FF66] rounded-full flex items-center justify-center text-[#00FF66] shadow-[0_0_20px_rgba(0,255,102,0.4)]">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono text-[#00FF66] tracking-widest uppercase">// PAYMENT SECURED & VERIFIED</span>
                  <h3 className="text-xl md:text-2xl font-black text-white tracking-wide">
                    Your Matrix is Ready, {currentHolderName}
                  </h3>
                  <p className="text-xs text-gray-300 font-light">
                    Congratulations. Your cryptographic intention seal and personalized 432 Hz audio package have been successfully compiled.
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <button
                      onClick={handleDownloadSeal}
                      className="w-full py-3.5 rounded-xl bg-[#00FF66] text-black font-extrabold text-xs uppercase tracking-widest hover:bg-[#26ff7d] transition-all shadow-[0_0_20px_rgba(0,255,102,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Custom Seal (.SVG)</span>
                  </button>

                  <button
                      onClick={handleDownloadAudio}
                      className="w-full py-3.5 rounded-xl bg-[#9333EA] text-white font-extrabold text-xs uppercase tracking-widest hover:bg-[#A855F7] transition-all shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center justify-center space-x-2 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <span>Download 432 Hz Frequency Audio (.WAV)</span>
                  </button>
                </div>

                <button
                    onClick={() => {
                      setShowSuccessModal(false);
                      setMatrixReady(false);
                      setName('');
                      setIntention('');
                      localStorage.removeItem("user_name");
                      localStorage.removeItem("user_intention");
                      window.history.replaceState({}, document.title, window.location.pathname);
                    }}
                    className="text-[11px] text-gray-500 hover:text-gray-300 transition-colors underline underline-offset-4 cursor-pointer pt-2 block mx-auto"
                >
                  Close & Start Over
                </button>
              </div>
            </div>
        )}

        {activeModal && (
            <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fadeIn">
              <div className="bg-[#080812] border border-purple-900/65 max-w-lg w-full max-h-[80vh] overflow-y-auto rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_40px_rgba(147,51,234,0.2)] relative">
                <div className="flex justify-between items-center border-b border-purple-950 pb-4">
                  <h3 className="text-lg font-bold text-[#A855F7] font-mono uppercase tracking-wider drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]">
                    {activeModal === 'privacy' && 'Privacy Policy'}
                    {activeModal === 'terms' && 'Terms of Service'}
                    {activeModal === 'refund' && 'Refund Policy'}
                    {activeModal === 'contact' && 'Support & Contact'}
                    {activeModal === 'affiliate' && 'Creator Affiliate Program'}
                  </h3>
                  <button
                      onClick={() => setActiveModal(null)}
                      className="text-gray-400 hover:text-white font-mono text-sm bg-black px-3 py-1 rounded-lg border border-purple-900 cursor-pointer"
                  >
                    [X] Close
                  </button>
                </div>

                <div className="text-gray-300 text-xs md:text-sm space-y-4 font-light leading-relaxed text-left">
                  {activeModal === 'privacy' && (
                      <>
                        <p><strong>1. Information We Collect:</strong> We collect personal information that you voluntarily provide to us when expressing an interest in obtaining our digital products (such as your full name and personal intention text used strictly for generating your unique seal).</p>
                        <p><strong>2. How We Use Your Information:</strong> Your input data is processed locally and through our secure cryptographic algorithm solely to generate your custom vector seal and 432 Hz frequency file. We do not sell, rent, or trade your personal data to third parties.</p>
                        <p><strong>3. Data Security:</strong> All financial transactions are handled securely via certified merchants of record (such as Lemon Squeezy), ensuring your payment details are fully encrypted and never stored on our servers.</p>
                      </>
                  )}

                  {activeModal === 'terms' && (
                      <>
                        <p><strong>1. Acceptance of Terms:</strong> By accessing and using UniqueManifestation, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our services.</p>
                        <p><strong>2. Digital Products:</strong> All seals and frequency audio files generated are for personal, non-commercial use. While they assist in spiritual alignment and manifestation practices, we make no guarantees of specific financial or physical outcomes.</p>
                        <p><strong>3. Intellectual Property:</strong> The cryptographic generation matrix, website code, and visual interface designs are proprietary properties of UniqueManifestation.</p>
                      </>
                  )}

                  {activeModal === 'refund' && (
                      <>
                        <p><strong>1. Digital Goods Policy:</strong> Due to the instant, automated digital delivery nature of our custom-generated seals and encrypted 432 Hz audio files, all sales are generally final and non-refundable once the digital files have been compiled and made available for download.</p>
                        <p><strong>2. Exceptions:</strong> If you experience technical errors preventing download or corruption of your generated files, our support team will manually re-issue your package within 24 hours.</p>
                      </>
                  )}

                  {activeModal === 'contact' && (
                      <>
                        <p>We are here to assist you with any questions regarding your digital download, custom seal matrix, or order status.</p>
                        <p className="p-3 bg-black rounded-xl border border-purple-950 font-mono text-[#00FF66]">
                          Support Email: support@uniquemanifestation.com<br />
                          Response Time: Within 24 Hours (Monday – Friday)
                        </p>
                      </>
                  )}

                  {activeModal === 'affiliate' && (
                      <>
                        <p>Join our exclusive partner network and earn a massive <strong>70% commission</strong> for every unique intention seal generated through your custom tracking link.</p>
                        <div className="p-4 bg-black rounded-xl border border-purple-950 space-y-2">
                          <span className="block text-xs font-mono text-[#00FF66] uppercase tracking-widest">// Direct Application</span>
                          <p className="text-xs text-gray-300">Send us a message with your social media profile/channels to get your tracking link:</p>
                          <a
                              href="mailto:affiliate@uniquemanifestation.com"
                              className="block text-center py-3 bg-[#9333EA] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#A855F7] transition-all shadow-[0_0_15px_rgba(147,51,234,0.5)]"
                          >
                            affiliate@uniquemanifestation.com
                          </a>
                        </div>
                      </>
                  )}
                </div>

                <button
                    onClick={() => setActiveModal(null)}
                    className="w-full py-3 rounded-xl bg-[#9333EA] text-white font-bold text-xs uppercase tracking-widest hover:bg-[#A855F7] transition-all cursor-pointer shadow-[0_0_20px_rgba(147,51,234,0.5)]"
                >
                  Understood
                </button>
              </div>
            </div>
        )}
      </main>
  );
}

export default function Page() {
  return (
      <Suspense fallback={<div className="min-h-screen bg-[#020205] text-white flex items-center justify-center">Loading Portal...</div>}>
        <UniqueManifestationPortalContent />
      </Suspense>
  );
}