"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { Mail, User, Calendar, MessageSquare, Loader2, Trash2, ArrowLeft } from "lucide-react";

export default function MessageInbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel("inbox_realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "messages" },
                (payload) => {
                    setMessages((prev) => [payload.new, ...prev]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setMessages(data);
        }
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Confirm permanent deletion of this transmission?")) {
            const { error } = await supabase
                .from("messages")
                .delete()
                .eq("id", id);

            if (!error) {
                setMessages(messages.filter((msg) => msg.id !== id));
            }
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full min-h-screen bg-[#02040a]">
            <div className="mb-8">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6">
                    <ArrowLeft size={14} /> Back_to_Dashboard
                </Link>
                <h1 className="text-3xl font-black font-mono tracking-widest text-white uppercase mb-2">Transmission_Inbox</h1>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Real-time Encrypted Node Data</p>
            </div>

            <div className="bg-[#0a0c14] border border-white/10 rounded-2xl overflow-hidden shadow-xl max-w-5xl">
                <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                    <h2 className="text-xs font-bold font-mono tracking-widest text-gray-400 uppercase">Secure_Log</h2>
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-md font-mono text-[9px] uppercase tracking-widest">Live Sync Active</span>
                </div>

                {loading ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-4 text-gray-500 font-mono text-xs uppercase tracking-widest">
                        <Loader2 size={32} className="animate-spin text-cyan-500/50" />
                        Retrieving encrypted nodes...
                    </div>
                ) : messages.length === 0 ? (
                    <div className="py-32 flex flex-col items-center justify-center gap-3 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600 mb-2">
                            <MessageSquare size={24} />
                        </div>
                        <p className="text-gray-400 font-mono text-xs uppercase tracking-widest font-bold">Inbox Empty</p>
                        <p className="text-gray-600 font-mono text-[10px] uppercase tracking-widest">Awaiting new transmissions</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {messages.map((msg) => (
                            <div key={msg.id} className="p-6 hover:bg-white/[0.02] transition-colors flex flex-col gap-5">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                                        <div className="flex items-center gap-2 text-white font-bold tracking-wider">
                                            <User size={16} className="text-cyan-400" />
                                            {msg.identity_name}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail size={16} className="text-blue-400/70" />
                                            <a href={`mailto:${msg.response_mail}`} className="hover:text-cyan-400 transition-colors">
                                                {msg.response_mail}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-6">
                                        <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
                                            <Calendar size={14} />
                                            {new Date(msg.created_at).toLocaleDateString("en-US", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(msg.id)}
                                            className="text-gray-600 hover:text-red-400 transition-colors"
                                            title="Delete Transmission"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="bg-[#02040a] border border-white/5 p-5 rounded-xl">
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                                        {msg.transmission_message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}