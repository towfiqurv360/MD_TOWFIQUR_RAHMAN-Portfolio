"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { LayoutDashboard, MessageSquare, FileUp, FolderPlus, LogOut, User, Menu, X, ShieldCheck, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    useEffect(() => {
        const channel = supabase
            .channel("nav_alerts")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
                setUnreadCount((prev) => prev + 1);
            })
            .subscribe();

        return () => { supabase.removeChannel(channel); };
    }, [supabase]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/login");
        router.refresh();
    };

    const navLinks = [
        { name: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={18} /> },
        { name: "Messages", href: "/admin/messages", icon: <MessageSquare size={18} />, badge: unreadCount },
        { name: "CV Manager", href: "/admin/cv", icon: <FileUp size={18} /> },
        { name: "Projects", href: "/admin/projects", icon: <FolderPlus size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-[#02040a] flex font-sans text-white selection:bg-cyan-500/30">
            <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-[#0a0c14] border border-white/10 rounded-lg text-cyan-400"
            >
                {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            <aside className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0a0c14] border-r border-white/10 flex flex-col transition-transform duration-300 ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                <div className="h-20 flex items-center px-6 border-b border-white/10">
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-400/50 rounded-lg flex items-center justify-center text-cyan-400 font-black text-xs">TR</div>
                        <div>
                            <p className="text-[12px] font-black uppercase tracking-widest">Admin_Panel</p>
                            <p className="text-[8px] text-emerald-400 flex items-center gap-1 uppercase tracking-widest mt-0.5">
                                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span> Online
                            </p>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 py-6 px-4 space-y-2">
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest px-2 mb-4">Core_Modules</p>
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => { setIsMobileOpen(false); if (link.name === "Messages") setUnreadCount(0); }}
                                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all font-mono text-[11px] uppercase tracking-widest font-bold ${isActive ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-gray-400 hover:bg-white/5 hover:text-white"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    {link.icon} {link.name}
                                </div>
                                {link.badge > 0 && (
                                    <span className="w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-[9px] animate-pulse">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-3 mb-4 px-2">
                        <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                            <User size={18} />
                        </div>
                        <div>
                            <p className="text-xs font-bold">Towfiqur Rahman</p>
                            <p className="text-[9px] text-gray-500 font-mono uppercase flex items-center gap-1 mt-0.5">
                                <ShieldCheck size={10} className="text-emerald-400" /> Authorized
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl hover:bg-red-500 hover:text-white transition-all font-mono text-[10px] font-bold uppercase"
                    >
                        <LogOut size={14} /> Terminate_Session
                    </button>
                </div>
            </aside>

            <main className="flex-1 overflow-x-hidden">
                {children}
            </main>

            {isMobileOpen && (
                <div className="fixed inset-0 bg-black/60 z-30 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileOpen(false)}></div>
            )}
        </div>
    );
}