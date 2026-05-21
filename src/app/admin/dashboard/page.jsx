"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { MessageSquare, ShieldCheck, Server, Bell, ArrowRight, Loader2 } from "lucide-react";

export default function AdminDashboard() {
    const [totalMessages, setTotalMessages] = useState(0);
    const [newAlert, setNewAlert] = useState(false);
    const [loading, setLoading] = useState(true);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    useEffect(() => {
        fetchStats();

        const channel = supabase
            .channel("dashboard_alerts")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                (payload) => {
                    setTotalMessages((prev) => prev + 1);
                    setNewAlert(true);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        const { count, error } = await supabase
            .from("messages")
            .select("*", { count: 'exact', head: true });

        if (!error && count !== null) {
            setTotalMessages(count);
        }
        setLoading(false);
    };

    return (
        <div className="p-6 lg:p-10 w-full min-h-screen bg-[#02040a]">
            <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-black font-mono tracking-widest text-white uppercase mb-2">System_Overview</h1>
                    <p className="text-xs font-mono text-gray-500 uppercase tracking-widest flex items-center gap-2">
                        <Server size={14} className="text-cyan-400" />
                        Node Server Connected
                    </p>
                </div>
                
                {newAlert && (
                    <div className="flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-5 py-3 rounded-xl font-mono text-xs font-bold uppercase tracking-widest shadow-[0_0_15px_rgba(34,211,238,0.2)] transition-all">
                        <Bell size={16} /> New Node Data Received
                        <button 
                            onClick={() => setNewAlert(false)}
                            className="ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                            [Dismiss]
                        </button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                <div className="bg-[#0a0c14] border border-white/10 p-8 rounded-2xl flex items-center justify-between group hover:border-cyan-500/30 transition-colors">
                    <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Total_Transmissions</p>
                        {loading ? (
                            <Loader2 size={24} className="animate-spin text-cyan-500/50" />
                        ) : (
                            <p className="text-4xl font-black text-white font-mono">{totalMessages}</p>
                        )}
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                        <MessageSquare size={28} />
                    </div>
                </div>
                
                <div className="bg-[#0a0c14] border border-white/10 p-8 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-colors">
                    <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-2">Gatekeeper_Status</p>
                        <p className="text-xl font-black text-emerald-400 font-mono uppercase tracking-wider">Enforced</p>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <ShieldCheck size={28} />
                    </div>
                </div>
            </div>

            <Link href="/admin/messages" className="inline-flex items-center gap-3 px-6 py-4 bg-[#0a0c14] border border-white/10 hover:border-cyan-500/50 rounded-2xl text-white font-mono text-xs uppercase tracking-widest transition-all hover:bg-white/[0.02]">
                <MessageSquare size={16} className="text-cyan-400" />
                Open Message Inbox
                <ArrowRight size={16} className="text-gray-500" />
            </Link>
        </div>
    );
}