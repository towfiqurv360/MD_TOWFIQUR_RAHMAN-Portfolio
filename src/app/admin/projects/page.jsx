"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { FolderPlus, Trash2, CheckCircle, AlertTriangle, Loader2, Link as LinkIcon, Image as ImageIcon, LayoutGrid, ArrowLeft, GitBranch, Activity, FolderArchive, Globe, Code2 } from "lucide-react";

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: "", text: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [sourceType, setSourceType] = useState('manual');

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech_stack: "",
        live_link: "",
        github_link: "",
        image: "",
        status: "Deployed",
        date: new Date().toISOString().split('T')[0]
    });

    const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    );

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .order("created_at", { ascending: false });

        if (!error && data) {
            setProjects(data);
        }
        setLoading(false);
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: "loading", text: "Deploying system configuration..." });

        const techArray = formData.tech_stack.split(",").map(item => item.trim()).filter(Boolean);

        const { error } = await supabase
            .from("projects")
            .insert([
                {
                    title: formData.title || "Untitled Deployment",
                    description: formData.description || "No description provided.",
                    tech_stack: techArray,
                    live_link: formData.live_link,
                    github_link: formData.github_link,
                    image: formData.image,
                    status: formData.status,
                    date: formData.date
                }
            ]);

        if (error) {
            setStatus({ type: "error", text: "Deployment failed. Verify your database connection." });
        } else {
            setStatus({ type: "success", text: "Project deployed successfully!" });
            setFormData({
                title: "",
                description: "",
                tech_stack: "",
                live_link: "",
                github_link: "",
                image: "",
                status: "Deployed",
                date: new Date().toISOString().split('T')[0]
            });
            fetchProjects();
            setTimeout(() => setStatus({ type: "", text: "" }), 3000);
        }
        setIsSubmitting(false);
    };

    const handleDelete = async (id) => {
        if (confirm("Confirm permanent deletion of this project record?")) {
            const { error } = await supabase
                .from("projects")
                .delete()
                .eq("id", id);

            if (!error) {
                setProjects(projects.filter((proj) => proj.id !== id));
            }
        }
    };

    return (
        <div className="p-6 lg:p-10 w-full min-h-screen bg-[#02040a] text-white">
            <div className="mb-8">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6">
                    <ArrowLeft size={14} /> Back_to_Dashboard
                </Link>
                <h1 className="text-3xl font-black font-mono tracking-widest uppercase mb-2">Project_Registry</h1>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Manage Deployments & Repositories</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

                <div className="lg:col-span-5 bg-[#0a0c14] border border-white/10 rounded-2xl p-6 shadow-xl sticky top-6">
                    <div className="border-b border-white/10 pb-4 mb-6 flex items-center gap-3">
                        <FolderPlus size={18} className="text-cyan-400" />
                        <h2 className="text-sm font-bold font-mono tracking-widest uppercase">New_Deployment</h2>
                    </div>

                    {status.text && (
                        <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 text-xs font-mono border ${status.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                            status.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                'bg-cyan-500/10 border-cyan-500/20 text-cyan-400'
                            }`}>
                            {status.type === 'error' && <AlertTriangle size={16} />}
                            {status.type === 'success' && <CheckCircle size={16} />}
                            {status.type === 'loading' && <Loader2 size={16} className="animate-spin" />}
                            <span>{status.text}</span>
                        </div>
                    )}

                    <div className="flex bg-[#02040a] border border-white/10 rounded-xl p-1 mb-6">
                        <button onClick={() => setSourceType('manual')} type="button" className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all ${sourceType === 'manual' ? 'bg-cyan-500/20 text-cyan-400' : 'text-gray-500 hover:text-white'}`}>
                            <Code2 size={14} /> Manual
                        </button>
                        <button onClick={() => setSourceType('github')} type="button" className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all ${sourceType === 'github' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500 hover:text-white'}`}>
                            <GitBranch size={14} /> GitHub
                        </button>
                        <button onClick={() => setSourceType('folder')} type="button" className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-[10px] font-mono uppercase tracking-widest rounded-lg transition-all ${sourceType === 'folder' ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-500 hover:text-white'}`}>
                            <FolderArchive size={14} /> Folder
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-purple-400 flex items-center gap-2"><GitBranch size={12} /> Repository_URL</label>
                            <input type="url" name="github_link" value={formData.github_link} onChange={handleInputChange} placeholder="https://github.com/username/repo" className="w-full bg-[#02040a]/80 border border-white/10 focus:border-purple-400 rounded-xl px-4 py-3 text-sm outline-none transition-colors font-mono" />
                        </div>

                        {sourceType === 'folder' && (
                            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 flex items-center gap-2"><FolderArchive size={12} /> Select_Directory (ZIP)</label>
                                <div className="border-2 border-dashed border-emerald-500/30 rounded-xl p-6 text-center bg-[#02040a]/50 hover:border-emerald-500/60 transition-all cursor-pointer relative">
                                    <input type="file" accept=".zip" className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                                    <FolderPlus size={24} className="mx-auto text-emerald-500/50 mb-2" />
                                    <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">Click to mount directory</p>
                                </div>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Project_Title</label>
                            <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Description</label>
                            <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={2} className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono resize-none" />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Tech_Stack (Comma Separated)</label>
                            <input type="text" name="tech_stack" value={formData.tech_stack} onChange={handleInputChange} placeholder="React, Next.js, Tailwind" className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1"><LinkIcon size={12} className="text-cyan-400" /> Live_URL</label>
                                <input type="url" name="live_link" value={formData.live_link} onChange={handleInputChange} className="w-full bg-[#02040a]/80 border border-white/10 rounded-lg px-3 py-2.5 text-xs focus:border-cyan-400/50 outline-none transition-colors font-mono" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1"><ImageIcon size={12} className="text-emerald-400" /> Image_URL</label>
                                <input type="url" name="image" value={formData.image} onChange={handleInputChange} className="w-full bg-[#02040a]/80 border border-white/10 rounded-lg px-3 py-2.5 text-xs focus:border-emerald-400/50 outline-none transition-colors font-mono" />
                            </div>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="w-full mt-4 px-6 py-4 bg-[#f5f5f7] text-black font-black rounded-xl uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50 flex justify-center items-center gap-2">
                            {isSubmitting ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : <><Activity size={16} /> Deploy_Project</>}
                        </button>
                    </form>
                </div>

                <div className="lg:col-span-7 space-y-8">

                    <div className="bg-[#0a0c14] border border-white/10 rounded-2xl shadow-xl overflow-hidden p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Globe size={18} className="text-emerald-400" />
                            <h2 className="text-sm font-bold font-mono tracking-widest uppercase text-gray-300">Live_Preview</h2>
                        </div>

                        <div className="bg-[#02040a] border border-white/10 p-5 rounded-xl flex flex-col sm:flex-row gap-5 items-center relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

                            <div className="w-full sm:w-40 h-28 bg-[#161617] rounded-lg border border-white/5 overflow-hidden shrink-0 relative flex items-center justify-center">
                                {formData.image ? (
                                    <img src={formData.image} alt="Preview" className="w-full h-full object-cover opacity-80" />
                                ) : (
                                    <span className="text-[10px] font-mono text-gray-600 uppercase">No_Image</span>
                                )}
                            </div>

                            <div className="flex-1 w-full space-y-3">
                                <h3 className="font-bold text-lg text-white tracking-wide">{formData.title || "Untitled Project"}</h3>
                                <p className="text-xs text-gray-400 line-clamp-2">{formData.description || "Project description will appear here..."}</p>

                                <div className="flex flex-wrap gap-2 pt-1">
                                    {formData.tech_stack ? formData.tech_stack.split(",").map((tech, idx) => tech.trim() && (
                                        <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                                            {tech.trim()}
                                        </span>
                                    )) : <span className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono text-gray-500 uppercase tracking-wider">TECH_STACK</span>}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#0a0c14] border border-white/10 rounded-2xl shadow-xl overflow-hidden flex flex-col">
                        <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <LayoutGrid size={18} className="text-purple-400" />
                                <h2 className="text-sm font-bold font-mono tracking-widest uppercase text-gray-300">Active_Deployments</h2>
                            </div>
                            <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-[9px] font-mono uppercase tracking-widest">{projects.length} Total</span>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[600px]">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center gap-4 text-gray-500 font-mono text-xs uppercase tracking-widest py-10">
                                    <Loader2 size={32} className="animate-spin text-purple-500/50" />
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="text-center py-10 text-gray-500 font-mono text-xs uppercase tracking-widest">No Projects Found</div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="bg-[#02040a]/50 border border-white/10 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors">
                                            <div className="space-y-2">
                                                <h3 className="font-bold text-white tracking-wide">{project.title}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech_stack && project.tech_stack.map((tech, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono text-cyan-400 uppercase tracking-wider">{tech}</span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                {project.github_link && (
                                                    <a href={project.github_link} target="_blank" rel="noreferrer" title="Source Code" className="p-2 text-gray-400 hover:text-purple-400 bg-white/5 rounded-lg border border-transparent hover:border-purple-500/30 transition-all">
                                                        <GitBranch size={16} />
                                                    </a>
                                                )}
                                                {project.live_link && (
                                                    <a href={project.live_link} target="_blank" rel="noreferrer" title="Live Site" className="p-2 text-gray-400 hover:text-cyan-400 bg-white/5 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all">
                                                        <LinkIcon size={16} />
                                                    </a>
                                                )}
                                                <div className="w-px h-6 bg-white/10 mx-1"></div>
                                                <button onClick={() => handleDelete(project.id)} className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-lg border border-transparent hover:border-red-500/30 transition-all">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}