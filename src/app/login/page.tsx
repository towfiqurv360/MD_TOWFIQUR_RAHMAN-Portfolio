"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, Key, ShieldAlert, CheckCircle } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [mode, setMode] = useState("login"); 
    const router = useRouter();

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    useEffect(() => {
        if (window.location.hash.includes("type=recovery") || window.location.search.includes("mode=update")) {
            setMode("update");
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Authentication failed. Invalid credentials.");
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

    const handleForgotPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/login?mode=update`,
        });

        if (error) {
            setError("Failed to send recovery link. Verify your email.");
        } else {
            setMessage("Recovery link transmitted successfully. Check your inbox.");
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");

        const { error } = await supabase.auth.updateUser({
            password: newPassword,
        });

        if (error) {
            setError("Password update failed. Try again.");
        } else {
            setMessage("Password updated successfully. Redirecting to login...");
            setTimeout(() => {
                setMode("login");
                router.push("/login");
            }, 3000);
        }
    };

    return (
        // UI Fix: Added pt-32 to push the content below the fixed Navbar
        <div className="min-h-screen bg-[#02040a] flex items-center justify-center px-6 pt-32 pb-12 font-sans selection:bg-cyan-500/30 selection:text-white">
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-grid opacity-10"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.08)_0%,transparent_60%)]"></div>
            </div>

            <div className="relative z-10 bg-[#0a0c14] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-black text-white font-mono tracking-widest uppercase">
                        {mode === "login" && "SYSTEM_LOGIN"}
                        {mode === "forgot" && "RECOVERY_MODE"}
                        {mode === "update" && "PASSWORD_UPDATE"}
                    </h2>
                    <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-1">
                        {mode === "login" && "Authorized Access Only"}
                        {mode === "forgot" && "Requesting secure transmission"}
                        {mode === "update" && "Establishing new security baseline"}
                    </p>
                </div>

                {error && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl mb-6 text-xs font-mono">
                        <ShieldAlert size={16} className="shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {message && (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-3 rounded-xl mb-6 text-xs font-mono">
                        <CheckCircle size={16} className="shrink-0" />
                        <span>{message}</span>
                    </div>
                )}

                {mode === "login" && (
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] text-cyan-400/80 font-mono uppercase tracking-widest font-bold ml-1">Admin_Identity</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="email" 
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#02040a]/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:border-cyan-400/60 outline-none transition-all font-mono placeholder-gray-700" 
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[10px] text-cyan-400/80 font-mono uppercase tracking-widest font-bold">Security_Pass</label>
                                <button 
                                    type="button" 
                                    onClick={() => setMode("forgot")}
                                    className="text-[9px] text-gray-500 hover:text-cyan-400 font-mono uppercase tracking-widest transition-colors"
                                >
                                    Forgot?
                                </button>
                            </div>
                            <div className="relative">
                                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-[#02040a]/60 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-sm text-white focus:border-cyan-400/60 outline-none transition-all font-mono placeholder-gray-700" 
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full group relative px-8 py-4 bg-[#f5f5f7] text-black font-black rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] mt-2">
                            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-[11px] group-hover:text-white transition-colors duration-500">
                                Initialize Access
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </button>
                    </form>
                )}

                {mode === "forgot" && (
                    <form onSubmit={handleForgotPassword} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] text-cyan-400/80 font-mono uppercase tracking-widest font-bold ml-1">Registered_Email</label>
                            <div className="relative">
                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type="email" 
                                    placeholder="admin@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-[#02040a]/60 border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white focus:border-cyan-400/60 outline-none transition-all font-mono placeholder-gray-700" 
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="w-full group relative px-8 py-4 bg-[#f5f5f7] text-black font-black rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] mt-2">
                            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-[11px] group-hover:text-white transition-colors duration-500">
                                Transmit Link
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </button>

                        <button 
                            type="button" 
                            onClick={() => { setMode("login"); setError(""); setMessage(""); }}
                            className="w-full text-center text-[10px] text-gray-500 hover:text-white font-mono uppercase tracking-widest transition-colors pt-2"
                        >
                            Return to Login
                        </button>
                    </form>
                )}

                {mode === "update" && (
                    <form onSubmit={handleUpdatePassword} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-[10px] text-cyan-400/80 font-mono uppercase tracking-widest font-bold ml-1">New_Security_Pass</label>
                            <div className="relative">
                                <Key size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full bg-[#02040a]/60 border border-white/10 rounded-xl pl-12 pr-12 py-3.5 text-sm text-white focus:border-cyan-400/60 outline-none transition-all font-mono placeholder-gray-700" 
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="w-full group relative px-8 py-4 bg-[#f5f5f7] text-black font-black rounded-xl overflow-hidden transition-all duration-300 active:scale-[0.98] cursor-pointer hover:shadow-[0_0_25px_rgba(34,211,238,0.3)] mt-2">
                            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-[0.2em] text-[11px] group-hover:text-white transition-colors duration-500">
                                Authorize Change
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}