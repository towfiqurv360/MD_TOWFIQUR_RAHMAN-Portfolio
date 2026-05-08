"use client";

import { motion } from "framer-motion";

export default function JourneyLog() {
    return (
        <section className="py-32 max-w-5xl mx-auto px-6 relative z-10">

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-24"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">JOURNEY</span>
                    <span className="text-[#86868b] ml-4">LOG.</span>
                </h2>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-[0.4em] font-bold">Evolution Protocol</p>
            </motion.div>

            <div className="relative border-l border-white/5 ml-6 md:ml-12">

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-20 ml-10 relative group"
                >
                    <div className="absolute -left-[51px] top-1 w-5 h-5 rounded-full bg-[#02040a] border border-cyan-500/50 group-hover:bg-cyan-500 group-hover:shadow-[0_0_20px_#22d3ee] transition-all duration-500"></div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20 tracking-widest uppercase">2025 — 2026</span>
                            <div className="h-px w-8 bg-white/10"></div>
                            <span className="text-[10px] font-mono text-gray-500 tracking-tighter uppercase">Verified Batch</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">Web Development Bootcamp</h3>
                        <p className="text-gray-400 font-medium text-sm">Programming Hero</p>

                        <div className="max-w-2xl bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl backdrop-blur-sm group-hover:border-cyan-500/20 transition-all duration-500">
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Mastering <span className="text-white">JavaScript, React, and Next.js</span> through intensive project-based learning.
                                Focused on high-fidelity frontend architecture and professional deployment on <span className="text-white">Vercel</span>.
                            </p>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="ml-10 relative group"
                >
                    <div className="absolute -left-[51px] top-1 w-5 h-5 rounded-full bg-[#02040a] border border-purple-500/50 group-hover:bg-purple-500 group-hover:shadow-[0_0_20px_#c084fc] transition-all duration-500"></div>

                    <div className="space-y-3">
                        <div className="flex items-center gap-4">
                            <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20 tracking-widest uppercase">Present</span>
                            <div className="h-px w-8 bg-white/10"></div>
                            <span className="text-[10px] font-mono text-gray-500 tracking-tighter uppercase">Institutional Project</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors uppercase tracking-tight">Diploma in Engineering (CST)</h3>
                        <p className="text-gray-400 font-medium text-sm">Rajshahi Polytechnic Institute</p>

                        <div className="max-w-2xl bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl backdrop-blur-sm group-hover:border-purple-500/20 transition-all duration-500">
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Specialized in <span className="text-white">Computer Science and Technology</span>.
                                Exploring core networking logic, VLSM subnetting, and advanced <span className="text-white">software architecture</span> fundamentals.
                            </p>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}