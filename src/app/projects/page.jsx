"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar/navbar";
import { Calendar, GitBranch, ExternalLink } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function AllProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  return (
    <main className="min-h-screen bg-[#02040a] text-[#f5f5f7] selection:bg-cyan-500/30 selection:text-white font-sans overflow-x-hidden">
      <Navbar />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-15 transition-opacity duration-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12)_0%,transparent_75%)]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(168,85,247,0.05)_0%,transparent_60%)] rounded-full will-change-transform"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(34,211,238,0.05)_0%,transparent_60%)] rounded-full will-change-transform"></div>
      </div>

      <section className="relative z-10 pt-48 pb-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.02] mb-6 shadow-[0_0_15px_rgba(34,211,238,0.05)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee] animate-pulse"></span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.3em] font-bold">
              Secure System Archive
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight uppercase"
          >
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Excellence.</span>
          </motion.h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 font-mono text-xs uppercase tracking-widest text-gray-500">
            No projects available in the archive yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col bg-[#0a0c14] rounded-3xl border border-white/10 overflow-hidden hover:border-cyan-400/50 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-500 will-change-transform transform-gpu relative"
              >
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 group-hover:via-cyan-400/50 to-transparent transition-colors duration-500 z-20"></div>

                <div className="relative aspect-video w-full overflow-hidden border-b border-white/5 bg-[#02040a] p-2">
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover object-top opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out will-change-transform"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#161617] flex items-center justify-center">
                        <span className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">Image_Offline</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/20 to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest font-mono bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                        {project.status || "Deployed"}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Calendar size={12} />
                      <span className="text-[10px] font-mono tracking-widest uppercase">
                        {project.date || "Oct 2026"}
                      </span>
                    </div>
                  </div>

                  <h2 className="text-xl lg:text-2xl font-bold text-gray-100 mb-3 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
                    {project.title}
                  </h2>

                  <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack && project.tech_stack.slice(0, 4).map((tech, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] text-gray-300 font-mono tracking-widest uppercase group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors">
                        {tech}
                      </span>
                    ))}
                    {project.tech_stack && project.tech_stack.length > 4 && (
                      <span className="px-2 py-1 text-[9px] text-gray-500 font-mono tracking-widest uppercase flex items-center">
                        +{project.tech_stack.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="pt-5 border-t border-white/10 flex flex-col gap-3 mt-auto">
                    {project.github_link && (
                      <a
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-gray-300 font-bold text-[10px] tracking-[0.2em] uppercase group/link hover:text-purple-400 transition-all w-full justify-between bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 px-4 py-3 rounded-xl"
                      >
                        View Source Code
                        <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-purple-400 group-hover/link:text-black group-hover/link:border-purple-400 transition-all transform-gpu">
                          <GitBranch size={14} />
                        </span>
                      </a>
                    )}
                    {project.live_link && (
                      <a
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 text-gray-300 font-bold text-[10px] tracking-[0.2em] uppercase group/link hover:text-cyan-400 transition-all w-full justify-between bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/10 hover:border-cyan-500/30 px-4 py-3 rounded-xl"
                      >
                        Execute Deployment
                        <span className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover/link:bg-cyan-400 group-hover/link:text-black group-hover/link:border-cyan-400 transition-all transform-gpu group-hover/link:rotate-45">
                          <ExternalLink size={14} />
                        </span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}