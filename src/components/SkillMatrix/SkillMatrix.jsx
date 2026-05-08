"use client";

import { motion } from "framer-motion";
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGithub
} from "react-icons/fa";
import {
    SiNextdotjs, SiTailwindcss, SiMongodb, SiVercel, SiFramer, SiTypescript
} from "react-icons/si";

export default function SkillMatrix() {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const ColorfulGlassIcon = ({ Icon, name, colorClass, shadowColor }) => (
        <motion.div
            whileHover={{ y: -3, scale: 1.05 }}
            className="flex flex-col items-center gap-3 group/icon"
        >
            <div className="relative">
                <div className={`absolute inset-0 ${shadowColor} blur-xl rounded-xl opacity-0 group-hover/icon:opacity-40 transition-opacity duration-500`}></div>

                <div className="relative z-10 w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md hover:bg-white/[0.07] transition-all duration-500 shadow-lg">
                    <Icon className={`text-2xl md:text-3xl ${colorClass} transition-all duration-500 filter drop-shadow-md`} />
                </div>
            </div>
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest group-hover/icon:text-white transition-colors">
                {name}
            </span>
        </motion.div>
    );

    return (
        <section className="py-24 relative z-10 max-w-6xl mx-auto px-6">

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="text-center mb-20"
            >
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                        SKILL
                    </span>
                    <span className="text-[#86868b] ml-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">MATRIX.</span>
                </h2>
                <div className="flex items-center justify-center gap-2 mt-4">
                    <span className="h-[1px] w-8 bg-cyan-500/30"></span>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-[0.3em]">Technical Arsenal</p>
                    <span className="h-[1px] w-8 bg-cyan-500/30"></span>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">

                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl shadow-xl overflow-hidden"
                >
                    <h3 className="text-[10px] font-mono text-cyan-500/70 uppercase tracking-[0.4em] mb-10 font-black">01 // Logic Foundation</h3>
                    <div className="grid grid-cols-2 gap-y-10">
                        <ColorfulGlassIcon Icon={FaJs} name="Javascript" colorClass="text-[#f7df1e]" shadowColor="bg-[#f7df1e]" />
                        <ColorfulGlassIcon Icon={SiTypescript} name="Typescript" colorClass="text-[#3178c6]" shadowColor="bg-[#3178c6]" />
                        <ColorfulGlassIcon Icon={FaHtml5} name="Html5" colorClass="text-[#e34f26]" shadowColor="bg-[#e34f26]" />
                        <ColorfulGlassIcon Icon={FaCss3Alt} name="Css3" colorClass="text-[#1572b6]" shadowColor="bg-[#1572b6]" />
                    </div>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="relative p-8 rounded-[2.5rem] bg-white/[0.04] border border-white/[0.1] backdrop-blur-[30px] md:-translate-y-8 shadow-2xl overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent"></div>
                    <h3 className="text-[10px] font-mono text-white uppercase tracking-[0.4em] mb-10 font-black text-center">02 // Core Engine</h3>
                    <div className="grid grid-cols-2 gap-y-10">
                        <ColorfulGlassIcon Icon={FaReact} name="React" colorClass="text-[#61dafb]" shadowColor="bg-[#61dafb]" />
                        <ColorfulGlassIcon Icon={SiNextdotjs} name="Next.js" colorClass="text-white" shadowColor="bg-white" />
                        <ColorfulGlassIcon Icon={SiTailwindcss} name="Tailwind" colorClass="text-[#38bdf8]" shadowColor="bg-[#38bdf8]" />
                        <ColorfulGlassIcon Icon={SiFramer} name="Motion" colorClass="text-[#ff0055]" shadowColor="bg-[#ff0055]" />
                    </div>
                </motion.div>

                <motion.div
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="relative p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl shadow-xl overflow-hidden"
                >
                    <h3 className="text-[10px] font-mono text-emerald-500/70 uppercase tracking-[0.4em] mb-10 font-black">03 // Deploy Ops</h3>
                    <div className="grid grid-cols-2 gap-y-10">
                        <ColorfulGlassIcon Icon={FaNodeJs} name="Node.js" colorClass="text-[#339933]" shadowColor="bg-[#339933]" />
                        <ColorfulGlassIcon Icon={SiMongodb} name="Mongodb" colorClass="text-[#47a248]" shadowColor="bg-[#47a248]" />
                        <ColorfulGlassIcon Icon={FaGithub} name="Github" colorClass="text-white" shadowColor="bg-white" />
                        <ColorfulGlassIcon Icon={SiVercel} name="Vercel" colorClass="text-white" shadowColor="bg-white" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}