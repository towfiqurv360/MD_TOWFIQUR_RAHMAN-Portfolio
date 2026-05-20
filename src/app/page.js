"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Projectdemo from "@/components/Projects/ProjectDemo";
import SkillMatrix from "@/components/SkillMatrix/SkillMatrix";
import JourneyLog from "@/components/JourneyLog/JourneyLog";
import CommandTerminal from "@/components/CommandTerminal/CommandTerminal";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#02040a] text-white selection:bg-cyan-500 selection:text-black font-sans overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-15"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12)_0%,transparent_75%)]"></div>
        
        <motion.div 
          animate={{ 
            y: [0, -60, 0],
            x: [0, 40, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_60%)] will-change-transform"
        />

        <motion.div 
          animate={{ 
            y: [0, 60, 0],
            x: [0, -40, 0],
            scale: [1, 1.15, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 2 }}
          className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_60%)] will-change-transform"
        />
      </div>

      <section id="core" className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-40 lg:pt-48 pb-20">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          
          <div className="w-full lg:w-1/2 flex justify-center relative">
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 scale-125 bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_65%)] rounded-full will-change-transform"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative will-change-transform"
            >
              <div className="absolute -inset-3 border-2 border-cyan-500/40 shadow-[0_0_20px_rgba(34,211,238,0.2)] rounded-[2.5rem] rotate-6 backdrop-blur-sm"></div>
              <div className="absolute -inset-4 border border-purple-500/30 shadow-lg rounded-[2.5rem] -rotate-3"></div>
              
              <div className="w-60 h-80 md:w-[320px] md:h-[440px] bg-[#0a0c14] rounded-[2rem] overflow-hidden border border-white/20 relative z-10 shadow-[0_10px_30px_rgba(0,0,0,0.8)] group cursor-pointer transform-gpu">
                <img 
                  src="https://i.ibb.co.com/21r11TQB/file-00000000c290720994de00cefa0fb5e1.png" 
                  alt="Md. Towfiqur Rahman"
                  className="w-full h-full object-cover transition-all duration-700 ease-in-out scale-105 group-hover:scale-100 filter grayscale group-hover:grayscale-0 will-change-transform"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#02040a] via-transparent to-transparent opacity-80 group-hover:opacity-30 transition-opacity duration-700"></div>
              </div>

              <motion.div 
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute -bottom-4 -right-4 bg-[#0a1128]/95 border border-cyan-500/50 px-5 py-3 rounded-2xl backdrop-blur-md z-20 shadow-[0_0_15px_rgba(34,211,238,0.3)] cursor-default will-change-transform transform-gpu"
              >
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span>
                  <p className="text-[10px] font-mono text-gray-200 tracking-widest uppercase font-bold">Operational</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 text-left">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="will-change-transform"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[11px] font-mono text-cyan-400 tracking-[0.4em] uppercase font-bold">Identity // 0840G8</span>
                <div className="h-px w-12 bg-cyan-500/40"></div>
              </div>

              <div className="space-y-4">
                <h2 className="text-base md:text-lg font-mono text-gray-300 tracking-tight">Md. Towfiqur Rahman</h2>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] uppercase cursor-default">
                  Frontend <br /> 
                  <span className="text-cyan-400 hover:text-white transition-colors duration-500">Architect.</span>
                </h1>
              </div>

              <div className="max-w-md mt-10">
                <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium">
                  Designing high-fidelity digital ecosystems. Focused on 
                  <span className="text-white font-bold"> React architecture</span> and pixel-perfect 
                  <span className="text-cyan-400 font-bold italic"> user experiences</span>.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-12">
                <Link href="/projects">
                  <button className="px-8 py-4 bg-white text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:bg-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] uppercase text-[11px] tracking-widest cursor-pointer active:scale-95 transform-gpu">
                    View Archive
                  </button>
                </Link>

                <Link href="/contact" className="group flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-all cursor-pointer">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase">Connectivity</span>
                  <div className="w-9 h-9 rounded-full border border-gray-400 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all group-hover:rotate-45 transform-gpu">
                    ↗
                  </div>
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      <section id="matrix"><SkillMatrix /></section>
      <section id="projects_demo"><Projectdemo /></section>
      <section id="protocols"><JourneyLog /></section>
      <CommandTerminal />

    </main>
  );
}