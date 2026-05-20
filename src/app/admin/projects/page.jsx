"use client";

import { useState, useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";
import Link from "next/link";
import { FolderPlus, Trash2, CheckCircle, AlertTriangle, Loader2, Link as LinkIcon, Image as ImageIcon, LayoutGrid, ArrowLeft } from "lucide-react";

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState({ type: "", text: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        tech_stack: "",
        live_link: "",
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
        setStatus({ type: "loading", text: "Deploying project data..." });

        const techArray = formData.tech_stack.split(",").map(item => item.trim());

        const { error } = await supabase
            .from("projects")
            .insert([
                {
                    title: formData.title,
                    description: formData.description,
                    tech_stack: techArray,
                    live_link: formData.live_link,
                    image: formData.image,
                    status: formData.status,
                    date: formData.date
                }
            ]);

        if (error) {
            setStatus({ type: "error", text: "Deployment failed. Verify your inputs." });
        } else {
            setStatus({ type: "success", text: "Project deployed successfully!" });
            setFormData({
                title: "",
                description: "",
                tech_stack: "",
                live_link: "",
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
            <div className="mb-10">
                <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-[10px] font-mono text-gray-500 hover:text-cyan-400 uppercase tracking-widest transition-colors mb-6">
                    <ArrowLeft size={14} /> Back_to_Dashboard
                </Link>
                <h1 className="text-3xl font-black font-mono tracking-widest uppercase mb-2">Project_Registry</h1>
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">Manage Portfolio Deployments</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-[#0a0c14] border border-white/10 rounded-2xl p-6 shadow-xl">
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

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Project_Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows={3}
                                    className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono resize-none"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400">Tech_Stack (Comma Separated)</label>
                                <input
                                    type="text"
                                    name="tech_stack"
                                    value={formData.tech_stack}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="React, Next.js, Tailwind"
                                    className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                        <LinkIcon size={12} /> Live_URL
                                    </label>
                                    <input
                                        type="url"
                                        name="live_link"
                                        value={formData.live_link}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-mono uppercase tracking-widest text-gray-400 flex items-center gap-1">
                                        <ImageIcon size={12} /> Image_URL
                                    </label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#02040a]/50 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-400/50 outline-none transition-colors font-mono"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full mt-2 px-6 py-4 bg-[#f5f5f7] text-black font-black rounded-xl uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Processing..." : "Deploy_Project"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-7">
                    <div className="bg-[#0a0c14] border border-white/10 rounded-2xl shadow-xl overflow-hidden h-full flex flex-col">
                        <div className="p-6 border-b border-white/10 bg-white/[0.02] flex items-center gap-3">
                            <LayoutGrid size={18} className="text-purple-400" />
                            <h2 className="text-sm font-bold font-mono tracking-widest uppercase">Active_Deployments</h2>
                        </div>

                        <div className="flex-1 p-6 overflow-y-auto">
                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center gap-4 text-gray-500 font-mono text-xs uppercase tracking-widest py-20">
                                    <Loader2 size={32} className="animate-spin text-purple-500/50" />
                                    Retrieving records...
                                </div>
                            ) : projects.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center gap-3 py-20">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gray-600 mb-2">
                                        <FolderPlus size={24} />
                                    </div>
                                    <p className="text-gray-400 font-mono text-xs uppercase tracking-widest font-bold">No Projects Found</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 gap-4">
                                    {projects.map((project) => (
                                        <div key={project.id} className="bg-[#02040a]/50 border border-white/10 p-5 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-white/20 transition-colors">
                                            <div className="space-y-2">
                                                <h3 className="font-bold text-white tracking-wide">{project.title}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.tech_stack && project.tech_stack.map((tech, idx) => (
                                                        <span key={idx} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-[9px] font-mono text-cyan-400 uppercase tracking-wider">
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                {project.live_link && (
                                                    <a href={project.live_link} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-cyan-400 bg-white/5 rounded-lg border border-transparent hover:border-cyan-500/30 transition-all">
                                                        <LinkIcon size={16} />
                                                    </a>
                                                )}
                                                <button
                                                    onClick={() => handleDelete(project.id)}
                                                    className="p-2 text-gray-400 hover:text-red-400 bg-white/5 rounded-lg border border-transparent hover:border-red-500/30 transition-all"
                                                >
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