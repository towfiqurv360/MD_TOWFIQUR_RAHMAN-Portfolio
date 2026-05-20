"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import projectsData from "@/data/projects.json";

export default function ProjectDemo() {
    const latestProjects = [...projectsData].reverse().slice(0, 3);

    return (
        <section id="projects" className="py-20 max-w-7xl mx-auto px-6 relative z-10">
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

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {latestProjects.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`}>
                        <motion.div
                            whileHover={{ y: -8 }}
                            className="group h-full flex flex-col bg-[#0a0c14] border border-white/10 rounded-3xl overflow-hidden cursor-pointer hover:border-cyan-500/40 hover:shadow-[0_10px_30px_rgba(34,211,238,0.15)] transition-all duration-500 will-change-transform transform-gpu relative"
                        >
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 group-hover:via-cyan-400/50 to-transparent transition-colors duration-500 z-20"></div>

                            <div className="relative h-56 md:h-64 w-full overflow-hidden mb-4 p-2">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#02040a]">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        fill
                                        className="object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 will-change-transform"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0c14] via-[#0a0c14]/20 to-transparent opacity-90 group-hover:opacity-50 transition-opacity duration-500"></div>
                                </div>
                            </div>

                            <div className="px-6 pb-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-xl md:text-2xl font-bold text-gray-100 group-hover:text-cyan-400 transition-colors duration-300 pr-4">
                                        {project.title}
                                    </h3>
                                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 group-hover:bg-cyan-500/10 group-hover:text-cyan-400 group-hover:border-cyan-400/40 group-hover:rotate-45 transition-all duration-300 transform-gpu shrink-0">
                                        ↗
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-auto pt-2">
                                    {project.techStack.slice(0, 3).map((tech, i) => (
                                        <span key={i} className="text-[10px] font-mono text-gray-400 uppercase bg-white/5 border border-white/10 px-3 py-1.5 rounded-full group-hover:border-cyan-500/30 group-hover:text-cyan-100 transition-colors duration-300">
                                            {tech}
                                        </span>
                                    ))}
                                    {project.techStack.length > 3 && (
                                        <span className="text-[10px] font-mono text-gray-500 uppercase px-2 py-1.5 flex items-center">
                                            +{project.techStack.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>

            <div className="mt-10 flex justify-center md:hidden">
                <Link href="/projects" className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[11px] font-mono text-gray-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all uppercase tracking-widest flex items-center gap-2">
                    View Archive <span>→</span>
                </Link>
            </div>
        </section>
    );
}