"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Cpu, FolderDot, LayoutGrid, Activity, Zap, FileDown, Menu, X, ChevronRight } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const [hoveredLink, setHoveredLink] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isOpen]);

    if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
        return null;
    }

    const navLinks = [
        { name: 'CORE', href: '/#core', icon: <Cpu size={18} />, color: "text-cyan-400", glow: "shadow-cyan-500/50" },
        { name: 'MATRIX', href: '/#matrix', icon: <LayoutGrid size={18} />, color: "text-emerald-400", glow: "shadow-emerald-500/50" },
        { name: 'PROTOCOLS', href: '/#protocols', icon: <Activity size={18} />, color: "text-blue-400", glow: "shadow-blue-500/50" },
        { name: 'PROJECTS', href: '/projects', icon: <FolderDot size={18} />, color: "text-purple-400", glow: "shadow-purple-500/50" },
        { name: 'CONNECT', href: '/contact', icon: <Zap size={18} />, color: "text-orange-400", glow: "shadow-orange-500/50" },
    ];

    const menuVariants = {
        closed: {
            opacity: 0,
            clipPath: "circle(0px at calc(100% - 40px) 40px)",
            transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        },
        open: {
            opacity: 1,
            clipPath: "circle(150% at calc(100% - 40px) 40px)",
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        closed: { opacity: 0, x: -20 },
        open: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`fixed top-0 left-0 w-full z-[60] transition-all duration-500 will-change-transform ${scrolled ? "bg-[#02040a]/90 backdrop-blur-md border-b border-white/10 h-20 shadow-[0_10px_30px_rgba(0,0,0,0.5)]" : "bg-transparent h-24"
                    } flex items-center`}
            >
                <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">

                    <Link href="/" className="flex items-center gap-4 group flex-shrink-0 relative z-[70] cursor-pointer">
                        <div className="relative w-12 h-12 bg-[#0a0c14] border border-white/20 text-white flex items-center justify-center rounded-2xl font-black text-xl transition-all duration-500 group-hover:bg-cyan-500/10 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transform-gpu">
                            TR
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-mono text-[13px] font-black tracking-[0.3em] uppercase leading-none">
                                TOWFIQUR <span className="text-cyan-400">RAHMAN</span>
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 tracking-[0.2em] uppercase font-bold mt-1.5 group-hover:text-cyan-400 transition-colors">
                                System_Architect // v4.0
                            </span>
                        </div>
                    </Link>

                    <div className="hidden xl:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onMouseEnter={() => setHoveredLink(link.name)}
                                onMouseLeave={() => setHoveredLink(null)}
                                className="relative py-2 flex items-center gap-3 group cursor-pointer"
                            >
                                <span className={`${link.color} opacity-70 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-300 transform-gpu`}>
                                    {link.icon}
                                </span>
                                <span className={`font-mono text-[11px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${hoveredLink === link.name ? 'text-white' : 'text-gray-400'}`}>
                                    {link.name}
                                </span>
                                <motion.div
                                    className={`absolute -bottom-1 left-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_#22d3ee] rounded-full will-change-transform`}
                                    initial={{ width: "0%", left: "50%" }}
                                    animate={{
                                        width: hoveredLink === link.name ? "100%" : "0%",
                                        left: hoveredLink === link.name ? "0%" : "50%"
                                    }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                />
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center gap-5 relative z-[70]">
                        <a
                            href="/Towfiqur_Rahman_CV.pdf"
                            download
                            className="hidden xl:inline-flex group relative h-11 items-center justify-center overflow-hidden rounded-xl border border-cyan-400/50 bg-[#0a0c14] px-7 font-mono text-[11px] font-black tracking-[0.2em] text-cyan-400 transition-all duration-500 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] cursor-pointer transform-gpu"
                        >
                            <FileDown size={18} className="mr-2 group-hover:animate-bounce" />
                            <span>RESUME.PDF</span>
                        </a>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="xl:hidden relative w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center rounded-xl text-cyan-400 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all cursor-pointer active:scale-95 z-[70] transform-gpu"
                        >
                            <AnimatePresence mode="wait">
                                {isOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={24} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={24} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>
            </motion.nav>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        variants={menuVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        className="fixed inset-0 z-[55] bg-[#02040a]/95 backdrop-blur-md xl:hidden flex flex-col pt-32 pb-12 px-6 overflow-y-auto will-change-transform"
                    >
                        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[radial-gradient(circle,rgba(34,211,238,0.15)_0%,transparent_60%)] rounded-full pointer-events-none"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[radial-gradient(circle,rgba(168,85,247,0.15)_0%,transparent_60%)] rounded-full pointer-events-none"></div>

                        <div className="flex flex-col gap-4 relative z-10 w-full max-w-md mx-auto">
                            {navLinks.map((link) => (
                                <motion.div key={link.name} variants={itemVariants} className="will-change-transform">
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="relative flex items-center justify-between p-4 sm:p-5 bg-[#0a0c14] border border-white/10 rounded-2xl group hover:border-cyan-400/60 hover:bg-white/10 active:scale-[0.98] transition-all duration-300 cursor-pointer overflow-hidden transform-gpu"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>

                                        <div className="flex items-center gap-5 relative z-10">
                                            <div className={`p-3 bg-black/50 border border-white/10 rounded-xl ${link.color} group-hover:scale-110 group-hover:${link.glow} transition-all duration-300 transform-gpu`}>
                                                {link.icon}
                                            </div>
                                            <span className="font-mono text-lg sm:text-xl font-black tracking-[0.25em] text-gray-300 group-hover:text-white transition-colors duration-300">
                                                {link.name}
                                            </span>
                                        </div>

                                        <div className="relative z-10 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-300 transform-gpu">
                                            <ChevronRight size={22} />
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div variants={itemVariants} className="mt-4 sm:mt-6 mb-16 will-change-transform">
                                <a
                                    href="/Towfiqur_Rahman_CV.pdf"
                                    download
                                    className="group relative flex items-center justify-center gap-4 p-5 sm:p-6 w-full rounded-2xl bg-gradient-to-r from-cyan-600 to-blue-600 border border-cyan-400/50 text-white font-mono text-xs sm:text-sm font-black tracking-[0.3em] uppercase shadow-[0_10px_20px_rgba(34,211,238,0.2)] hover:shadow-[0_10px_30px_rgba(34,211,238,0.4)] active:scale-95 transition-all duration-300 cursor-pointer overflow-hidden transform-gpu"
                                >
                                    <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <FileDown size={22} className="relative z-10 group-hover:animate-bounce" />
                                    <span className="relative z-10">DOWNLOAD_RESUME</span>
                                </a>
                            </motion.div>
                        </div>

                        <motion.div
                            variants={itemVariants}
                            className="relative w-full text-center mt-auto pt-8 pb-4 will-change-transform"
                        >
                            <span className="text-[11px] font-mono text-gray-400 tracking-[0.5em] uppercase flex items-center justify-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]"></span>
                                System Online
                            </span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}