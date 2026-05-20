"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { FileText, Upload, CheckCircle, AlertTriangle, Loader2, ArrowLeft } from "lucide-react";

export default function CVManager() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({ type: "", text: "" });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
            setStatus({ type: "", text: "" });
        } else {
            setFile(null);
            setStatus({ type: "error", text: "Invalid format. Only PDF files are authorized." });
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setStatus({ type: "loading", text: "Uploading transmission document..." });

        const { error } = await supabase.storage
            .from("portfolio-resume")
            .upload("Towfiqur_Rahman_CV.pdf", file, {
                cacheControl: "0",
                upsert: true,
            });

        if (error) {
            setStatus({ type: "error", text: "Upload failed: " + error.message });
        } else {
            setStatus({ type: "success", text: "CV document updated and deployed successfully." });
            setFile(null);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#02040a]">
            <div className="w-full max-w-xl">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6">
                    <ArrowLeft size={14} /> Back_to_Dashboard
                </Link>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black font-mono tracking-widest text-white uppercase mb-2">CV Manager</h1>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Repository and Document Control</p>
                </div>

                <div className="bg-[#0a0c14] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                    {status.text && (
                        <div className={`flex items-center gap-2 p-4 rounded-xl text-xs font-mono border ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                    'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                            }`}>
                            {status.type === 'error' && <AlertTriangle size={16} />}
                            {status.type === 'success' && <CheckCircle size={16} />}
                            {status.type === 'loading' && <Loader2 size={16} className="animate-spin" />}
                            <span>{status.text}</span>
                        </div>
                    )}

                    <form onSubmit={handleUpload} className="space-y-6">
                        <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center bg-[#02040a]/40 hover:border-cyan-500/30 transition-all relative">
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="flex flex-col items-center gap-3">
                                <FileText size={40} className={file ? "text-cyan-400" : "text-gray-600"} />
                                <p className="text-sm text-gray-300 font-medium">
                                    {file ? file.name : "Drag & drop or click to select fresh CV PDF"}
                                </p>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Authorized Format: PDF Only</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!file || status.type === 'loading'}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#f5f5f7] text-black font-black rounded-xl uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <Upload size={16} /> Deploy Document
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}