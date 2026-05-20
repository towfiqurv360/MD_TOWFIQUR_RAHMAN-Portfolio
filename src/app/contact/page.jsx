"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar/navbar";
import { Mail, Send, Globe, ShieldCheck, Briefcase, ChevronRight, CheckCircle, ShieldAlert, Loader2 } from "lucide-react";
import { createBrowserClient } from "@supabase/ssr";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState({ type: "", text: "" });

    // FIX: Removed the '!' signs which were causing the syntax error in JSX
    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ type: "loading", text: "Transmitting securely..." });

        const { error } = await supabase
            .from('messages')
            .insert([
                {
                    identity_name: name,
                    response_mail: email,
                    transmission_message: message
                }
            ]);

        if (error) {
            setStatus({ type: "error", text: "Transmission failed. Please try again." });
        } else {
            setStatus({ type: "success", text: "Message transmitted successfully!" });
            setName("");
            setEmail("");
            setMessage("");

            setTimeout(() => setStatus({ type: "", text: "" }), 3000);
        }
    };

    return (
        <main className="min-h-screen bg-[#02040a] text-[#f5f5f7] overflow-hidden relative font-sans cursor-default">
            <Navbar />

            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 bg-grid opacity-[0.15]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(34,211,238,0.15)_0%,transparent_75%)]"></div>
            </div>

            <section className="relative z-10 pt-40 pb-20 max-w-5xl mx-auto px-6">

                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16 space-y-3"
                >
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-10 bg-cyan-400/60"></div>
                        <span className="text-cyan-400 font-mono text-[11px] uppercase tracking-[0.4em] font-bold">
                            Node_Connectivity
                        </span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">START A</span> <br />
                        <span className="text-gray-300">NODE CONNECTION.</span>
                    </h1>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-5 space-y-5"
                    >
                        <div className="p-1 rounded-[2rem] bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 animate-pulse relative group cursor-pointer">
                            <div className="p-6 rounded-[1.8rem] bg-[#0a0c14]/95 backdrop-blur-2xl border border-white/10 transition-all relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[50px]"></div>

                                <div className="flex items-start gap-4 relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                                        <Briefcase size={20} />
                                    </div>
                                    <div className="space-y-1 w-full">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-2">
                                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse"></span>
                                                <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest font-bold">Available</p>
                                            </div>
                                            <ChevronRight size={16} className="text-gray-400 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
                                        </div>
                                        <p className="text-lg font-bold tracking-tight text-white leading-tight">Looking for a Frontend Dev?</p>
                                        <p className="text-sm font-mono text-gray-300 pt-2 leading-relaxed">
                                            Ready to engineer high-fidelity React/Next.js interfaces for your team. Let's build the future together.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl group hover:border-cyan-400/40 transition-all cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-[#0a0c14] border border-white/10 flex items-center justify-center text-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Mail_Endpoint</p>
                                    <p className="text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">towfiqur.dev@gmail.com</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/10 backdrop-blur-2xl group hover:border-purple-400/40 transition-all cursor-pointer">
                            <div className="flex items-center gap-5">
                                <div className="w-12 h-12 rounded-xl bg-[#0a0c14] border border-white/10 flex items-center justify-center text-purple-400 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all shrink-0">
                                    <Globe size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mb-1">Geo_Location</p>
                                    <p className="text-base font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">Rajshahi, Bangladesh</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 border border-white/10 bg-[#0a0c14]/50 rounded-[2rem] flex flex-col items-center text-center gap-3">
                            <ShieldCheck size={28} className="text-cyan-400/60" />
                            <p className="text-[11px] font-mono text-gray-400 uppercase tracking-[0.2em] font-bold">
                                Encrypted Transmission Active.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-7 bg-[#0a0c14]/70 border border-white/10 p-8 md:p-10 rounded-[2.5rem] backdrop-blur-2xl shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                        {status.text && (
                            <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 text-xs font-mono border ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                    status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                        'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                                }`}>
                                {status.type === 'error' && <ShieldAlert size={16} />}
                                {status.type === 'success' && <CheckCircle size={16} />}
                                {status.type === 'loading' && <Loader2 size={16} className="animate-spin" />}
                                <span>{status.text}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-[11px] font-mono text-cyan-400 uppercase tracking-widest ml-1 font-bold">Identity_Name</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                        placeholder="Your Name or Company"
                                        className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-5 py-4 focus:border-cyan-400/60 focus:bg-white/[0.05] outline-none transition-all font-mono text-sm text-white placeholder-gray-600 cursor-text"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[11px] font-mono text-blue-400 uppercase tracking-widest ml-1 font-bold">Response_Mail</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="hr@example.com"
                                        className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-5 py-4 focus:border-blue-400/60 focus:bg-white/[0.05] outline-none transition-all font-mono text-sm text-white placeholder-gray-600 cursor-text"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[11px] font-mono text-purple-400 uppercase tracking-widest ml-1 font-bold">Transmission_Message</label>
                                <textarea
                                    rows={5}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    required
                                    placeholder="Hello Towfiqur, we have an exciting project..."
                                    className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-5 py-4 focus:border-purple-400/60 focus:bg-white/[0.05] outline-none transition-all font-mono text-sm text-white placeholder-gray-600 resize-none cursor-text"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status.type === 'loading'}
                                className="w-full group relative px-8 py-5 bg-[#f5f5f7] text-black font-black rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_25px_rgba(34,211,238,0.4)] mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-[0.2em] text-xs font-bold group-hover:text-white transition-colors duration-500">
                                    {status.type === 'loading' ? 'Transmitting...' : 'Initiate Hiring Discussion'}
                                    {status.type !== 'loading' && <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                                </span>
                                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse"></span>
                                <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest font-bold">Systems_Ready</span>
                            </div>
                            <span className="text-[10px] font-mono text-gray-500 tracking-widest font-bold">EST. 2026 // RPI</span>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}