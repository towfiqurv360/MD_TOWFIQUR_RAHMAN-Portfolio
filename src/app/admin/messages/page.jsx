"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { Mail, User, Calendar, MessageSquare, Loader2, Trash2, ArrowLeft, X, Eye } from "lucide-react";

export default function MessageInbox() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

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


    useEffect(() => {
        if (selectedMessage) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [selectedMessage]);

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

    const handleDelete = async (id, e) => {
        if (e) e.stopPropagation();
        if (confirm("Confirm permanent deletion of this transmission?")) {
            const { error } = await supabase
                .from("messages")
                .delete()
                .eq("id", id);

            if (!error) {
                setMessages(messages.filter((msg) => msg.id !== id));
                if (selectedMessage?.id === id) {
                    setSelectedMessage(null);
                }
            }
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="p-6 lg:p-10 w-full min-h-screen bg-[#02040a]">

            <div className="mb-8">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6 cursor-pointer">
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
                            <div
                                key={msg.id}
                                onClick={() => setSelectedMessage(msg)}
                                className="p-6 hover:bg-[#0f121d] transition-all flex flex-col gap-4 cursor-pointer group relative"
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
                                        <div className="flex items-center gap-2 text-white font-bold tracking-wider group-hover:text-cyan-400 transition-colors">
                                            <User size={16} className="text-cyan-500/70" />
                                            {msg.identity_name}
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-400">
                                            <Mail size={16} className="text-blue-500/70" />
                                            <span className="group-hover:text-gray-300 transition-colors">{msg.response_mail}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between sm:justify-end gap-6">
                                        <div className="flex items-center gap-2 text-gray-500 font-mono text-[10px] tracking-widest uppercase">
                                            <Calendar size={14} />
                                            {formatDate(msg.created_at)}
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="text-cyan-500/0 group-hover:text-cyan-400/70 transition-colors" title="View Details">
                                                <Eye size={16} />
                                            </div>
                                            <button
                                                onClick={(e) => handleDelete(msg.id, e)}
                                                className="text-gray-600 hover:text-red-400 transition-colors z-10"
                                                title="Delete Transmission"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <div className="pl-8 sm:pl-0">
                                    <p className="text-gray-500 text-sm font-sans line-clamp-1 group-hover:text-gray-400 transition-colors">
                                        {msg.transmission_message}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>


            {selectedMessage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-[#02040a]/80 backdrop-blur-md transition-all"
                    onClick={() => setSelectedMessage(null)}
                >
                    <div
                        className="bg-[#0a0c14] border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col max-h-[90vh] relative transform transition-all"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] rounded-t-2xl">
                            <h2 className="text-sm font-black font-mono tracking-widest text-white uppercase flex items-center gap-2">
                                <MessageSquare size={16} className="text-cyan-400" />
                                Transmission_Details
                            </h2>
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>


                        <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex flex-col gap-6">
                            <div className="flex flex-col gap-4 bg-[#02040a] border border-white/5 p-5 rounded-xl font-mono text-xs">
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 uppercase tracking-widest w-20">Sender:</span>
                                    <span className="text-cyan-400 font-bold">{selectedMessage.identity_name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 uppercase tracking-widest w-20">Contact:</span>
                                    <a href={`mailto:${selectedMessage.response_mail}`} className="text-blue-400 hover:underline">
                                        {selectedMessage.response_mail}
                                    </a>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-gray-500 uppercase tracking-widest w-20">Date:</span>
                                    <span className="text-gray-300">{formatDate(selectedMessage.created_at)}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-3">Decrypted_Message:</h3>
                                <div className="bg-[#02040a] border border-white/5 p-6 rounded-xl">
                                    <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">
                                        {selectedMessage.transmission_message}
                                    </p>
                                </div>
                            </div>
                        </div>


                        <div className="p-5 border-t border-white/10 flex items-center justify-end gap-4 bg-white/[0.02] rounded-b-2xl">
                            <button
                                onClick={() => setSelectedMessage(null)}
                                className="px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest text-gray-400 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
                            >
                                Close
                            </button>
                            <button
                                onClick={(e) => handleDelete(selectedMessage.id, e)}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-widest bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all cursor-pointer"
                            >
                                <Trash2 size={14} />
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}