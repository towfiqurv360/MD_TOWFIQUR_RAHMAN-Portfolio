"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/navbar";
import { Mail, Send, Globe, ShieldCheck, Briefcase, ChevronRight } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-[#02040a] text-[#f5f5f7] overflow-hidden relative font-sans cursor-default">
            <Navbar />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid opacity-[0.1]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.12)_0%,transparent_75%)]"></div>
            </div>

            <section className="relative z-10 pt-40 pb-20 max-w-5xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 space-y-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-cyan-500/50"></div>
                        <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-[0.4em] font-bold">
                            Node_Connectivity
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase leading-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">START A</span> <br />
                        <span className="text-[#86868b]">NODE CONNECTION.</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 space-y-5"
                    >
                        <div className="p-1 rounded-[2rem] bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 animate-pulse relative group cursor-pointer">
                            <div className="p-5 rounded-[1.8rem] bg-[#0a0c14]/90 backdrop-blur-2xl border border-white/5 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px]"></div>

                                <div className="flex items-start gap-4 relative z-10">
                                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                                        <Briefcase size={18} />
                                    </div>
                                    <div className="space-y-1 w-full">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
                                                <p className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Available</p>
                                            </div>
                                            <ChevronRight size={14} className="text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-base font-bold tracking-tight text-white leading-tight">Looking for a Frontend Dev?</p>
                                        <p className="text-[11px] font-mono text-gray-400 pt-1 leading-relaxed">
                                            Ready to engineer high-fidelity React/Next.js interfaces for your team. Let's build the future together.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl group hover:border-cyan-500/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#0a0c14] border border-white/10 flex items-center justify-center text-cyan-500 group-hover:shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Mail_Endpoint</p>
                                    <p className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">towfiqur.dev@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-2xl group hover:border-purple-500/30 transition-all cursor-pointer">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#0a0c14] border border-white/10 flex items-center justify-center text-purple-500 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all">
                                    <Globe size={18} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">Geo_Location</p>
                                    <p className="text-sm font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">Rajshahi, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-white/5 bg-[#0a0c14]/30 rounded-[2rem] flex flex-col items-center text-center gap-3">
                            <ShieldCheck size={24} className="text-cyan-500/40" />
                            <p className="text-[9px] font-mono text-gray-600 uppercase tracking-[0.2em]">
                                Encrypted Transmission Active.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 bg-[#0a0c14]/50 border border-white/[0.08] p-8 md:p-10 rounded-[2.5rem] backdrop-blur-3xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>

                        <form className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-mono text-cyan-500/70 uppercase tracking-widest ml-1 font-bold">Identity_Name</label>
                                    <input type="text" placeholder="Your Name or Company" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500/50 outline-none transition-all font-mono text-[11px] text-white cursor-text" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] font-mono text-blue-500/70 uppercase tracking-widest ml-1 font-bold">Response_Mail</label>
                                    <input type="email" placeholder="hr@example.com" className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-blue-500/50 outline-none transition-all font-mono text-[11px] text-white cursor-text" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[8px] font-mono text-purple-500/70 uppercase tracking-widest ml-1 font-bold">Transmission_Message</label>
                                <textarea rows="4" placeholder="Hello Towfiqur, we have an exciting project..." className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 focus:border-purple-500/50 outline-none transition-all font-mono text-[11px] text-white resize-none cursor-text"></textarea>
                            </div>

                            <button className="w-full group relative px-8 py-4 bg-[#f5f5f7] text-black font-black rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                                <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-[10px] group-hover:text-white transition-colors duration-500">
                                    Initiate Hiring Discussion <Send size={12} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </form>

                        <div className="mt-8 pt-5 border-t border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_5px_#34d399] animate-pulse"></span>
                                <span className="text-[8px] font-mono text-gray-600 uppercase tracking-widest">Systems_Ready_For_Deployment</span>
                            </div>
                            <span className="text-[8px] font-mono text-gray-700 tracking-tighter">EST. 2026 // RPI</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}