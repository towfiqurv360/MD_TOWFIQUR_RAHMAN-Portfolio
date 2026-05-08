"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import projectsData from "@/data/projects.json";
import Navbar from "@/components/Navbar/navbar";

export default function AllProjectsPage() {
  return (
    <main className="min-h-screen bg-[#02040a] text-[#f5f5f7] selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-15 transition-opacity duration-1000"></div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12)_0%,transparent_75%)]"></div>

        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full opacity-50"></div>
      </div>

      <section className="relative z-10 pt-48 pb-32 max-w-6xl mx-auto px-6">

        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] mb-6"
          >
            <span className="w-1 h-1 rounded-full bg-cyan-500 shadow-[0_0_8px_#22d3ee]"></span>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em] font-bold">
              Secure System Archive
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight uppercase"
          >
            Engineering <span className="text-[#86868b]">Excellence.</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id || index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="group flex flex-col bg-[#0a0c14]/80 rounded-[2.5rem] border border-white/[0.06] overflow-hidden hover:border-cyan-500/40 transition-all duration-500 shadow-2xl backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-white/[0.03]">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-700 ease-out grayscale-[30%] group-hover:grayscale-0"
                  />
                ) : (
                  <div className="w-full h-full bg-[#161617] flex items-center justify-center">
                    <span className="text-[10px] font-mono text-gray-700 uppercase tracking-widest">Node_Offline</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] to-transparent opacity-60"></div>
              </div>

              <div className="p-8 lg:p-10 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-black text-cyan-500/80 uppercase tracking-widest font-mono">
                    {project.status}
                  </span>
                  <span className="text-[10px] font-mono text-gray-600 tracking-tighter uppercase">Protocol: 0{index + 1}</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
                  {project.title}
                </h2>

                <p className="text-gray-500 text-[15px] leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {project.techStack?.map((tech, i) => (
                    <span key={i} className="px-3 py-1 rounded-md bg-white/[0.03] border border-white/[0.05] text-[10px] text-gray-400 font-bold tracking-widest uppercase">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/[0.03]">
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-white font-bold text-[11px] tracking-[0.2em] uppercase group/link transition-all"
                  >
                    Execute Deployment
                    <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-white group-hover/link:text-black transition-all">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 17l10-10M17 17V7H7" /></svg>
                    </span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}