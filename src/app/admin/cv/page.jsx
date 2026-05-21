"use client";

import { useState } from "react";
import Link from "next/link";
import { createBrowserClient } from "@supabase/ssr";
import { FileText, Upload, CheckCircle, AlertTriangle, Loader2, ArrowLeft } from "lucide-react";

export default function ResumeManager() {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState({ type: "", text: "" });
    const [isDragging, setIsDragging] = useState(false);

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    const validateAndSetFile = (selectedFile) => {
        if (selectedFile && selectedFile.type === "application/pdf") {
            if (selectedFile.size > 5 * 1024 * 1024) {
                setFile(null);
                setStatus({ type: "error", text: "File is too large. Maximum size is 5MB." });
                return;
            }
            setFile(selectedFile);
            setStatus({ type: "", text: "" });
        } else {
            setFile(null);
            setStatus({ type: "error", text: "Invalid format. Only PDF files are authorized." });
        }
    };

    const handleFileChange = (e) => {
        validateAndSetFile(e.target.files[0]);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            validateAndSetFile(e.dataTransfer.files[0]);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!file) return;

        setStatus({ type: "loading", text: "Uploading transmission document..." });

        const uniqueFileName = `Towfiqur_Rahman_Resume_${Date.now()}.pdf`;

        try {
            const { error: uploadError } = await supabase.storage
                .from("portfolio-resume")
                .upload(uniqueFileName, file, {
                    cacheControl: "3600",
                    upsert: false,
                });

            if (uploadError) throw uploadError;

            const { data: publicUrlData } = supabase.storage
                .from("portfolio-resume")
                .getPublicUrl(uniqueFileName);

            const finalUrl = publicUrlData.publicUrl;

            const { error: dbError } = await supabase
                .from("resume_settings")
                .insert([{ resume_url: finalUrl }]);

            if (dbError) throw dbError;

            setStatus({ type: "success", text: "Resume document updated and deployed successfully." });
            setFile(null);

            const fileInput = document.getElementById('resume-upload-input');
            if (fileInput) fileInput.value = "";

        } catch (error) {
            setStatus({ type: "error", text: "Upload failed: " + error.message });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-[#02040a]">
            <div className="w-full max-w-xl">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6 cursor-pointer">
                    <ArrowLeft size={14} /> Back_to_Dashboard
                </Link>

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-black font-mono tracking-widest text-white uppercase mb-2">Resume Manager</h1>
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-wider">Repository and Document Control</p>
                </div>

                <div className="bg-[#0a0c14] border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl space-y-6">
                    {status.text && (
                        <div className={`flex items-center gap-2 p-4 rounded-xl text-xs font-mono border transition-all duration-300 ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
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
                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-xl p-8 text-center transition-all relative cursor-pointer group 
                            ${isDragging ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_30px_rgba(34,211,238,0.2)]' : 'border-white/10 bg-[#02040a]/40 hover:border-cyan-500/50 hover:bg-[#02040a]/60'}`}
                        >
                            <input
                                id="resume-upload-input"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            />
                            <div className="flex flex-col items-center gap-3 relative z-0">
                                <FileText size={40} className={`transition-colors duration-300 ${file || isDragging ? "text-cyan-400 scale-110" : "text-gray-600 group-hover:text-cyan-500/70"}`} />
                                <p className="text-sm text-gray-300 font-medium group-hover:text-white transition-colors">
                                    {file ? file.name : "Drag & drop or click to select fresh Resume PDF"}
                                </p>
                                <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest">Authorized Format: PDF Only (Max 5MB)</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={!file || status.type === 'loading'}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#f5f5f7] text-black font-black rounded-xl uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed cursor-pointer"
                        >
                            <Upload size={16} /> Deploy Document
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}