import { FaGithub, FaFacebookF, FaLinkedinIn } from "react-icons/fa"; // 
import { MdOutlineMail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="border-t border-white/5 py-12 relative z-10 bg-[#02040a] mt-20">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">

                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_10px_#22d3ee]"></div>
                        <span className="text-white font-mono text-[10px] uppercase tracking-[0.4em] font-black">
                            Md. Towfiqur Rahman
                        </span>
                    </div>
                    <p className="text-gray-600 font-mono text-[9px] tracking-[0.2em] uppercase pl-5">
                        Frontend Architect // System v4.0
                    </p>
                </div>

                <div className="flex items-center gap-8">
                    <a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer"
                        className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-500">
                        <FaGithub size={18} className="text-gray-500 group-hover:text-cyan-400 transition-colors" />
                    </a>
                    <a href="https://linkedin.com/in/your-profile" target="_blank" rel="noopener noreferrer"
                        className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-500">
                        <FaLinkedinIn size={18} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                    </a>
                    <a href="https://facebook.com/your-profile" target="_blank" rel="noopener noreferrer"
                        className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-blue-600/50 hover:bg-blue-600/10 transition-all duration-500">
                        <FaFacebookF size={18} className="text-gray-500 group-hover:text-blue-500 transition-colors" />
                    </a>
                    <a href="mailto:your-email@gmail.com"
                        className="group p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-red-500/50 hover:bg-red-500/10 transition-all duration-500">
                        <MdOutlineMail size={18} className="text-gray-500 group-hover:text-red-400 transition-colors" />
                    </a>
                </div>

                <div className="text-center md:text-right">
                    <p className="text-gray-600 font-mono text-[10px] uppercase tracking-wider mb-1">
                        © {new Date().getFullYear()} ALL RIGHTS RESERVED.
                    </p>
                    <p className="text-cyan-500/30 font-mono text-[8px] tracking-[0.3em] uppercase italic">
                        Authorized Access Only.
                    </p>
                </div>

            </div>
        </footer>
    );
}