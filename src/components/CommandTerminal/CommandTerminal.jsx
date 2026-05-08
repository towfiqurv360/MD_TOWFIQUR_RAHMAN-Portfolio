"use client";

import { motion } from "framer-motion";

export default function CommandTerminal() {
    return (
        <section className="py-20 max-w-3xl mx-auto px-6 relative z-10 pb-32">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-[#0a0a0a] rounded-xl border border-white/10 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
            >
                <div className="bg-[#1a1a1a] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="ml-2 text-xs font-mono text-gray-500">towfiqur_rahman@system_ui ~ </span>
                </div>

                <div className="p-6 md:p-8 font-mono text-sm">
                    <p className="text-green-400 mb-2">➜  ~ <span className="text-white">./initiate_contact.sh</span></p>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="text-gray-400 mb-6"
                    >
                        System ready. Awaiting connection protocol...
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="flex flex-col md:flex-row gap-4 mt-8"
                    >
                        <a href="mailto:your-email@gmail.com" className="px-6 py-3 bg-white text-black font-bold uppercase tracking-widest hover:bg-cyan-400 transition-colors text-center shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                            Ping Mail Server
                        </a>
                        <div className="flex gap-4 justify-center">
                            <a href="#" className="px-6 py-3 border border-white/20 text-white hover:border-cyan-400 hover:text-cyan-400 transition-colors uppercase tracking-widest flex-1 text-center">
                                GitHub
                            </a>
                            <a href="#" className="px-6 py-3 border border-white/20 text-white hover:border-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest flex-1 text-center">
                                LinkedIn
                            </a>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}