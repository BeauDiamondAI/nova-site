'use client'

// src/app/components/SectionDenialPilot/DenialPilotSection.tsx

import React, { useEffect, useState } from 'react';
import { novathinkLayers } from './novathinkData';
import { defaultCapabilities, hoverCapabilities } from './denialpilotData';
import './DenialPilotSection.css';

export default function DenialPilotSection() {
  const [typewriterText, setTypewriterText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'NovaThink';

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typeInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypewriterText(fullText.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typeInterval);
        // Hide cursor after typing is done
        setTimeout(() => setShowCursor(false), 2000);
      }
    }, 150);

    return () => clearInterval(typeInterval);
  }, []);

  return (
    <section className="denial-pilot-section w-full relative py-24">
      {/* Background FX */}
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cyan-500/5 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-purple-500/5 blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-8 bg-cyan-500"></div>
            <span className="text-cyan-400 font-mono text-xs tracking-widest uppercase">System Architecture</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Intelligence in Action: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">
              The DenialPilot Implementation
            </span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl">
            NovaThink is the sovereign infrastructure powering{' '}
            <span className="text-white font-semibold">DenialPilot</span>, the first clinical criteria intelligence platform for surgical practices.
          </p>
        </div>

        {/* Main Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative">
          
          {/* LEFT CARD: NovaThink Engine */}
          <div className="lg:col-span-5 bg-[#030712] border border-slate-800 rounded-3xl lg:rounded-r-none lg:border-r-0 p-8 md:p-12 relative z-10 nova-card group h-[600px] flex flex-col overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-50"></div>
            
            {/* Header with Typing Effect */}
            <div className="flex items-center gap-4 mb-10 shrink-0">
              <img 
                src="https://storage.googleapis.com/msgsndr/CGzQYFP48e3RZppvGSHz/media/69344b75ec99b3e859cef294.png" 
                alt="NovaThink" 
                className="w-10 h-10 opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="flex flex-col">
                <h3 className="font-display font-bold text-3xl text-white flex items-center">
                  {typewriterText.split('').map((char, i) => (
                    <span key={i} className="shine-text">{char}</span>
                  ))}
                  {showCursor && <span className="cursor-blink"></span>}
                </h3>
                <span className="text-[10px] font-mono text-cyan-500 tracking-[0.2em] uppercase mt-1 animate-pulse">
                  Core Kernel Active
                </span>
              </div>
            </div>

            <div className="absolute top-8 right-8 text-[10px] text-slate-600 font-mono uppercase tracking-widest group-hover:opacity-0 transition-opacity">
              Hover to Scan
            </div>

            {/* Infinite Scroller */}
            <div className="scroller relative overflow-hidden flex-1">
              <div className="scroller-inner">
                {/* Content Block 1 */}
                <div className="space-y-8">
                  {novathinkLayers.map((layer) => (
                    <div key={layer.id} className="space-y-1">
                      <div className={`font-mono text-xs ${layer.color} mb-1`}>{layer.label}</div>
                      <h4 className="text-white font-semibold text-lg">{layer.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">{layer.description}</p>
                    </div>
                  ))}
                </div>
                
                {/* Content Block 2 (Duplicate for scroll) */}
                <div className="space-y-8 pt-8 border-t border-slate-800/50">
                  {novathinkLayers.slice(0, 2).map((layer) => (
                    <div key={`dup-${layer.id}`} className="space-y-1">
                      <div className={`font-mono text-xs ${layer.color} mb-1`}>{layer.label}</div>
                      <h4 className="text-white font-semibold text-lg">{layer.title}</h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {layer.description.split('.')[0]}.
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE: The Data Conduit */}
          <div className="lg:col-span-2 relative flex items-center justify-center h-[100px] lg:h-auto z-0 -my-8 lg:my-0 lg:-mx-1">
            <div className="hidden lg:block w-full conduit-line z-0">
              <div className="conduit-pulse"></div>
            </div>
            <div className="lg:hidden h-full w-[2px] bg-slate-800 relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent to-cyan-500 opacity-50"></div>
            </div>
            
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0B1120] border border-cyan-900/50 p-3 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.3)] z-20">
              <svg className="text-cyan-400 w-5 h-5 hidden lg:block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
              <svg className="text-cyan-400 w-5 h-5 lg:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
          </div>

          {/* RIGHT CARD: DenialPilot Deployment */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#0B1120] to-[#0F172A] border border-slate-700 rounded-3xl lg:rounded-l-none lg:border-l-0 p-8 md:p-12 relative z-10 dp-card group h-[600px] flex flex-col overflow-hidden shadow-2xl">
            
            {/* Header */}
            <div className="flex items-center gap-3 mb-8 shrink-0 relative z-20">
              <img 
                src="https://storage.googleapis.com/msgsndr/CGzQYFP48e3RZppvGSHz/media/6930f0516a99ebca8877cbd5.svg" 
                alt="DenialPilot" 
                className="w-10 h-10"
              />
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl text-white">DenialPilot</span>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded w-fit">
                  FLAGSHIP DEPLOYMENT
                </span>
              </div>
            </div>

            {/* View Swap Container */}
            <div className="relative flex-1">
              
              {/* DEFAULT VIEW */}
              <div className="default-view space-y-5">
                <div className="mb-4">
                  <h3 className="text-white font-semibold text-lg mb-3">Clinical Criteria Intelligence Platform</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Makes invisible payer approval rules visible. The hidden thresholds, documentation requirements, and delegation routing that determine whether a claim gets approved or denied, surfaced before submission. Coverage spans 11 surgical specialties and 6 major payers, plus delegation entities including eviCore, AIM, and Carelon.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {defaultCapabilities.map((cap) => (
                    <div key={cap.id} className={`${cap.bgColor} rounded-xl p-5 border ${cap.borderColor} relative overflow-hidden group/item transition-colors`}>
                      <div className="absolute top-0 right-0 p-2 opacity-20">
                        <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <h3 className="text-blue-400 font-bold text-base mb-2">{cap.title}</h3>
                      <p className="text-slate-300 text-xs mb-3 leading-relaxed">{cap.description}</p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                        <svg className="w-3 h-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        {cap.badge}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest animate-pulse">
                    Hover for Technical Details
                  </span>
                </div>
              </div>

              {/* TACTICAL VIEW */}
              <div className="tactical-view space-y-6">
                {hoverCapabilities.map((cap) => (
                  <div key={cap.id} className={`${cap.bgColor} rounded-xl p-6 border ${cap.borderColor} relative overflow-hidden group/item transition-colors`}>
                    <div className="absolute top-0 right-0 p-3 opacity-20">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 className={`${cap.id === 'citation-verification' ? 'text-cyan-400' : 'text-purple-400'} font-bold text-lg mb-2`}>
                      {cap.title}
                    </h3>
                    <p className="text-slate-300 text-sm mb-4 leading-relaxed">{cap.description}</p>
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                      <svg className="w-3 h-3 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      {cap.badge}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>

        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-slate-800 mt-16 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="bg-[#030712] p-6 text-center group hover:bg-slate-900/50 transition-colors">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">SOC 2</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Security Architecture</div>
          </div>
          <div className="bg-[#030712] p-6 text-center group hover:bg-slate-900/50 transition-colors">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Sovereign</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Infrastructure Control</div>
          </div>
          <div className="bg-[#030712] p-6 text-center group hover:bg-slate-900/50 transition-colors">
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">Healthcare</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Vertical Focus</div>
          </div>
        </div>

        {/* Section CTA */}
        <div className="text-center mt-16">
          <a 
            href="https://denialpilot.com" 
            className="group inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 rounded-full font-bold text-white transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
          >
            <span>Learn More About DenialPilot</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  );
}