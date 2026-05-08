"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import projectsData from "@/data/projects.json";

export default function ProjectDemo() {
    return (
        <section id="projects" className="py-20 max-w-7xl mx-auto px-6">
            <div className="mb-12">
                <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">
                    Current <span className="text-cyan-400">Deployments</span>
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projectsData.map((project) => (
                    <Link key={project.id} href={`/projects/${project.slug}`}>
                        <motion.div
                            whileHover={{ y: -10 }}
                            className="group bg-[#0a0a0a] border border-white/5 rounded-3xl overflow-hidden p-4 cursor-pointer hover:border-cyan-500/30 transition-all duration-500"
                        >
                            <div className="relative h-60 rounded-2xl overflow-hidden mb-6">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover opacity-50 group-hover:opacity-100 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                            </div>

                            <div className="px-2 pb-2">
                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {project.title} ↗
                                </h3>
                                <div className="flex gap-2">
                                    {project.techStack.slice(0, 2).map((tech, i) => (
                                        <span key={i} className="text-[10px] font-mono text-gray-500 uppercase border border-white/10 px-2 py-0.5 rounded">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                ))}
            </div>
        </section>
    );
}