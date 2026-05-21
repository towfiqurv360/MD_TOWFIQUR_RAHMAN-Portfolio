"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { createBrowserClient } from "@supabase/ssr";
import { GitBranch, ExternalLink } from "lucide-react";

export default function ProjectDemo() {
    const [latestProjects, setLatestProjects] = useState([]);
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
                .order("created_at", { ascending: false })
                .limit(3);

            if (!error && data) {
                setLatestProjects(data);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    return (
        <section id="projects" className="py-20 max-w-7xl mx-auto px-6 relative z-10 cursor-default">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-[11px] font-mono text-cyan-400 tracking-[0.3em] uppercase font-bold">Portfolio</span>
                        <div className="h-px w-12 bg-cyan-500/40"></div>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter">
                        Current <span className="text-cyan-400">Deployments</span>
                    </h2>
                </div>

                <Link href="/projects" className="hidden md:flex items-center gap-2 text-[11px] font-mono text-gray-400 hover:text-cyan-400 transition-colors uppercase tracking-widest group">
                    View Archive
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
            </div>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin"></div>
                </div>
            ) : latestProjects.length === 0 ? (
                <div className="text-center py-20 font-mono text-xs uppercase tracking-widest text-gray-500">
                    No active deployments found.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {latestProjects.map((project) => (
                        <motion.div
                            key={project.id}
                            whileHover={{ y: -8 }}
                            className="group h-full flex flex-col bg-[#0a0c14] border border-white/10 rounded-3xl overflow-hidden hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-500 will-change-transform transform-gpu relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 group-hover:via-cyan-400/50 to-transparent transition-colors duration-500 z-20"></div>

                            <div className="relative h-56 md:h-64 w-full overflow-hidden mb-4 p-2">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#02040a]">
                                    {project.image ? (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 will-change-transform"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-700 font-mono text-xs uppercase">No Image</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/20 to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-500"></div>
                                </div>
                            </div>

                            <div className="px-6 pb-6 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300 pr-4">
                                        {project.title}
                                    </h3>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto pt-2 mb-6">
                                    {project.tech_stack && project.tech_stack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] font-mono text-gray-400 uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.tech_stack && project.tech_stack.length > 3 && (
                                        <span className="text-[10px] font-mono text-gray-500 uppercase px-2 py-1.5 flex items-center">
                                            +{project.tech_stack.length - 3}
                                        </span>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-4 mt-auto">
                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 rounded-xl text-[10px] font-mono text-gray-400 hover:text-purple-400 uppercase tracking-widest transition-all"
                                        >
                                            <GitBranch size={14} /> Source
                                        </a>
                                    )}
                                    {project.live_link && (
                                        <a
                                            href={project.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 hover:border-cyan-400/50 rounded-xl text-[10px] font-mono text-cyan-400 hover:text-cyan-300 uppercase tracking-widest transition-all"
                                        >
                                            <ExternalLink size={14} /> Live
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            <div className="mt-10 flex justify-center md:hidden">
                <Link href="/projects" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[11px] font-mono text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all uppercase tracking-widest flex items-center gap-2">
                    View Archive <span>→</span>
                </Link>
            </div>
        </section>
    );
}