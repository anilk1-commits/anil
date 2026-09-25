'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createCheckoutSession } from './actions';

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

    const successParam = searchParams.get("success");
    const hashParam = searchParams.get("hash");

    if (successParam === "true" && hashParam) {
      setShowSuccessModal(true);
      setMatrixReady(true);
      setHashOutput(hashParam);

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
        if (currentStep < steps.length) setLoadingStep(currentStep);
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

  const handleCheckout = async () => {
    try {
      setIsCheckoutLoading(true);
      localStorage.setItem("user_name", currentHolderName);
      localStorage.setItem("user_intention", intention);

      const checkoutUrl = await createCheckoutSession({
        name: currentHolderName,
        intention,
        hashOutput
      });

      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("Checkout URL alınamadı.");
      }
    } catch (error) {
      console.error("Ödeme Hatası:", error);
      alert("Ödeme başlatılırken bir hata oluştu. Lütfen konsolu kontrol edin.");
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
  </g>
  <text x="250" y="470" fill="#A855F7" font-family="monospace" font-size="10" text-anchor="middle">HOLDER: ${currentHolderName.toUpperCase()}</text>
  <text x="250" y="485" fill="#A855F7" font-family="monospace" font-size="10" text-anchor="middle">HASH: ${hashOutput}</text>
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
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)({ sampleRate });
      const buffer = audioCtx.createBuffer(1, sampleRate * durationSeconds, sampleRate);
      const channelData = buffer.getChannelData(0);

      for (let i = 0; i < channelData.length; i++) {
        channelData[i] = Math.sin(2 * Math.PI * 432 * (i / sampleRate)) * 0.4;
      }

      // Basit wav oluşturucu
      const wavBuffer = bufferToWav(buffer, channelData.length);
      const blob = new Blob([wavBuffer], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${currentHolderName.replace(/\s+/g, '_')}_432Hz.wav`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch {
      alert("Audio error.");
    }
  };

  const bufferToWav = (buffer: AudioBuffer, totalSamples: number) => {
    const length = totalSamples * 2 + 44;
    const out = new DataView(new ArrayBuffer(length));
    let pos = 0;
    const writeString = (s: string) => { for (let i = 0; i < s.length; i++) out.setUint8(pos++, s.charCodeAt(i)); };

    writeString('RIFF'); out.setUint32(pos, length - 4, true); pos += 4;
    writeString('WAVEfmt '); out.setUint32(pos, 16, true); pos += 4;
    out.setUint16(pos, 1, true); pos += 2;
    out.setUint16(pos, 1, true); pos += 2;
    out.setUint32(pos, buffer.sampleRate, true); pos += 4;
    out.setUint32(pos, buffer.sampleRate * 2, true); pos += 4;
    out.setUint16(pos, 2, true); pos += 2;
    out.setUint16(pos, 16, true); pos += 2;
    writeString('data'); out.setUint32(pos, totalSamples * 2, true); pos += 4;

    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < totalSamples; i++, pos += 2) {
      const s = Math.max(-1, Math.min(1, channelData[i]));
      out.setInt16(pos, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    return out.buffer;
  };

  const previewParams = getDynamicSealParams();

  return (
      <main className="min-h-screen bg-[#020205] text-gray-100 flex flex-col items-center justify-center p-4 md:p-8 font-sans">
        <div className="max-w-xl mx-auto w-full bg-[#05050a] border border-purple-900/50 rounded-3xl p-8 shadow-2xl">
          <h1 className="text-2xl font-bold text-white text-center mb-6">Unique Manifestation Portal</h1>

          {!matrixReady ? (
              <form onSubmit={handleManifest} className="space-y-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full bg-[#0a0a12] border border-purple-900 rounded-xl px-4 py-3 text-sm text-white"
                />
                <textarea
                    value={intention}
                    onChange={(e) => setIntention(e.target.value)}
                    placeholder="Your Intention"
                    required
                    rows={3}
                    className="w-full bg-[#0a0a12] border border-purple-900 rounded-xl px-4 py-3 text-sm text-white resize-none"
                />
                <button
                    type="submit"
                    disabled={isGenerating}
                    className="w-full py-4 rounded-xl bg-[#9333EA] text-white font-bold uppercase text-xs tracking-wider hover:bg-purple-600 cursor-pointer"
                >
                  {isGenerating ? "Generating Matrix..." : "Generate Seal & Audio"}
                </button>
              </form>
          ) : (
              <div className="space-y-6 text-center">
                <p className="text-xs font-mono text-[#00FF66] break-all bg-black p-3 rounded-xl border border-gray-900">{hashOutput}</p>
                <button
                    onClick={handleCheckout}
                    disabled={isCheckoutLoading}
                    className="w-full py-4 rounded-xl bg-[#9333EA] text-white font-bold text-xs uppercase tracking-wider hover:bg-purple-600 cursor-pointer disabled:opacity-50"
                >
                  {isCheckoutLoading ? "Redirecting to Lemon Squeezy..." : "Unlock Full Package ($14.90)"}
                </button>
              </div>
          )}
        </div>

        {showSuccessModal && (
            <div className="fixed inset-0 bg-black/9output flex items-center justify-center p-4 z-50">
              <div className="bg-[#080814] border border-[#00FF66] max-w-md w-full rounded-3xl p-6 text-center space-y-4">
                <h3 className="text-xl font-bold text-white">Payment Successful!</h3>
                <button onClick={handleDownloadSeal} className="w-full py-3 bg-[#00FF66] text-black font-bold text-xs uppercase rounded-xl cursor-pointer">
                  Download Seal (.SVG)
                </button>
                <button onClick={handleDownloadAudio} className="w-full py-3 bg-[#9333EA] text-white font-bold text-xs uppercase rounded-xl cursor-pointer">
                  Download Audio (.WAV)
                </button>
              </div>
            </div>
        )}
      </main>
  );
}

export default function Page() {
  return (
      <Suspense fallback={<div className="min-h-screen bg-[#020205] text-white flex items-center justify-center">Loading...</div>}>
        <UniqueManifestationPortalContent />
      </Suspense>
  );
}