import { motion, useScroll, useSpring, AnimatePresence } from "motion/react";
import { useEffect, useState, useRef } from "react";
import { 
  Briefcase, 
  Layout, 
  BarChart3, 
  Layers, 
  Cpu, 
  Mail, 
  Linkedin, 
  Github, 
  FileText, 
  ArrowUpRight,
  TrendingUp,
  Workflow,
  Zap,
  Menu,
  X,
  PieChart,
  Monitor,
  Activity,
  Globe,
  Database,
  Search,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Code,
  Mic,
  Star,
  Sparkles,
  User,
  MoreHorizontal
} from "lucide-react";
import Lenis from "lenis";
import { cn } from "@/src/lib/utils";
import profileImg from "./Profile.png";

// --- Components ---

const TypewriterText = ({ phrases }: { phrases: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[index];
      if (isDeleting) {
        setDisplayText(prev => prev.slice(0, -1));
        setSpeed(50);
      } else {
        setDisplayText(prev => currentPhrase.slice(0, prev.length + 1));
        setSpeed(100);
      }

      if (!isDeleting && displayText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, phrases, speed]);

  return (
    <span className="relative block md:inline-block">
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 break-words md:whitespace-nowrap">
        {displayText}
      </span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[3px] h-[0.8em] bg-blue-500 ml-1 translate-y-[10%]"
      />
    </span>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Overview", href: "#hero" },
    { name: "SaaS Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Connect", href: "#contact" },
  ];

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-8 py-5",
      isScrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/5" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/10 shadow-lg flex items-center justify-center bg-gray-800">
            <img 
              src={profileImg} 
              alt="DK" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight hidden sm:block">DHIRAJ KUSHWAHA</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-px bg-brand-primary transition-all group-hover:w-full" />
            </motion.a>
          ))}
          <motion.a
            href="#"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 rounded-xl bg-white text-black font-bold text-[11px] tracking-widest uppercase hover:bg-brand-primary hover:text-white transition-all shadow-xl shadow-white/5"
          >
            Resume .PDF
          </motion.a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl border-b border-white/10 px-8 py-10 flex flex-col gap-6 md:hidden overflow-hidden"
          >
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-display font-bold py-2 border-b border-white/5">
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  const summaryRole = ["Product Analyst", "SaaS Builder", "Project Strategist", "Execution Specialist"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((prev) => (prev + 1) % summaryRole.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="hero" className="min-h-screen relative flex items-center overflow-hidden pt-20 pb-20 md:pt-32 md:pb-32 lg:pb-32 px-8">
      <div className="absolute inset-0 mesh-gradient opacity-40 z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10 py-8 md:py-0">
        
        {/* Left Side: Summary */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-xl order-2 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4 md:mb-8">
            <Activity className="w-3 h-3" />
            System Online • 2026 Ready
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter leading-[1] mb-8 text-white">
            I’m <span className="text-blue-500">Dhiraj</span><br />
            Building <TypewriterText phrases={["Products.", "Systems.", "Data-Driven Experiences."]} />
          </h1>

          <div className="space-y-6 mb-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-gray-500 leading-relaxed border-l-2 border-blue-500/20 pl-6 italic"
            >
I’m a product-focused builder passionate about creating digital experiences powered by systems, analytics, and automation.
From SaaS platforms like Vempli and SolveKard to workflow optimization and dashboard-driven systems, I enjoy turning ideas into scalable products.
Currently focused on building automation-driven experiences, product workflows, and analytics systems that simplify how people interact and grow.            </motion.p>
          </div>

          <div className="flex flex-wrap gap-5">
            <a href="#projects" className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-2xl shadow-blue-600/20 flex items-center gap-3 group">
              Explore Case Studies
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 rounded-xl border border-white/10 glass hover:bg-white/5 text-white font-bold transition-all">
              Connect
            </a>
          </div>
          
          <div className="mt-16 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase">Status: Designing</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.span
                key={summaryRole[roleIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="text-xs font-mono text-blue-400"
              >
                {summaryRole[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Side: Visuals */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
           animate={{ opacity: 1, scale: 1, rotate: 0 }}
           transition={{ duration: 1, delay: 0.2 }}
           className="relative aspect-square max-w-[500px] mx-auto lg:mx-0 w-full order-1 lg:order-2 my-10 lg:my-0"
        >
          {/* Decorative Outer Rings */}
          <div className="absolute inset-[-12%] border border-blue-500/5 rounded-full animate-[spin_40s_linear_infinite]" />
          <div className="absolute inset-[-6%] border border-white/5 rounded-full" />
          
          <motion.div 
             animate={{ rotate: -360 }}
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute inset-[4%] border border-dashed border-blue-500/10 rounded-full"
          />

          {/* Main Orbiting Ring with Image */}
          <div className="absolute inset-0 border border-white/5 rounded-full flex items-center justify-center animate-[spin_20s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-500 rounded-full blur-sm" />
            
            {/* Counter-rotating container to keep image upright */}
            <div className="animate-[spin_20s_linear_infinite_reverse] w-full h-full flex items-center justify-center pointer-events-none">
                <div className="w-[60%] h-[60%] bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-full backdrop-blur-3xl border border-white/10 flex items-center justify-center overflow-hidden group shadow-2xl relative pointer-events-auto">
                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse" />
                    <div className="absolute inset-2 overflow-hidden rounded-full border border-white/10 z-10">
                        <img 
                          src="/src/Profile.png" 
                          alt="Dhiraj Kushwaha" 
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                          referrerPolicy="no-referrer"
                        />
                    </div>
                    <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-700" />
                </div>
            </div>
          </div>

          <div className="absolute inset-8 border border-white/5 rounded-full flex items-center justify-center animate-[spin_15s_linear_infinite_reverse]">
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-indigo-500 rounded-full blur-sm" />
          </div>
          <div className="absolute inset-16 border border-white/5 rounded-full flex items-center justify-center animate-[spin_25s_linear_infinite]">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-purple-500 rounded-full blur-sm" />
          </div>

          {/* Decorative Particles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
               key={i}
               animate={{ 
                 opacity: [0.1, 0.4, 0.1],
                 scale: [1, 1.2, 1]
               }}
               transition={{ 
                 duration: 4 + i, 
                 repeat: Infinity,
                 delay: i * 0.5
               }}
               style={{
                 position: 'absolute',
                 left: `${50 + 48 * Math.cos((i * 45 * Math.PI) / 180)}%`,
                 top: `${50 + 48 * Math.sin((i * 45 * Math.PI) / 180)}%`,
               }}
               className="w-1 h-1 bg-blue-400/30 rounded-full blur-[1px]"
            />
          ))}

          {/* Floating Widgets */}
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-5 -right-5 md:-top-10 md:-right-10 glass p-3 md:p-5 rounded-2xl w-32 md:w-48 border-blue-500/20 shadow-2xl z-20"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <BarChart3 className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
              </div>
              <span className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-tighter uppercase">Conversion</span>
            </div>
            <div className="h-8 md:h-12 flex items-end gap-1 px-1">
              {[40, 70, 45, 90, 60, 80].map((h, i) => (
                <div key={i} className="flex-1 bg-blue-500/40 rounded-t-sm" style={{ height: `${h}%` }} />
              ))}
            </div>
            <p className="text-sm md:text-xl font-display font-bold mt-1 md:mt-2 text-white">+22.4%</p>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-5 -left-5 md:-bottom-10 md:-left-10 glass p-3 md:p-5 rounded-2xl w-32 md:w-48 border-purple-500/20 shadow-2xl z-20"
          >
            <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
              <div className="w-6 h-6 md:w-8 md:h-8 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <Workflow className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
              </div>
              <span className="text-[8px] md:text-[10px] font-bold text-gray-400 tracking-tighter uppercase">Automation</span>
            </div>
            <div className="space-y-1.5 md:space-y-2">
              <div className="h-1 md:h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="w-[85%] h-full bg-purple-500" />
              </div>
              <div className="h-1 md:h-1.5 w-2/3 bg-white/5 rounded-full" />
            </div>
            <p className="text-[8px] md:text-xs font-mono mt-2 md:mt-3 text-purple-300">SYSTEM_OPTIMIZED</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

const ProjectShowcase = () => {
    const projects = [
        {
          id: "vempli",
          title: "Vempli",
          subtitle: "AI Sentiment & Feedback CX Platform",
          desc: "An AI-powered feedback engine that transforms unstructured customer sentiment into actionable product data.",
          sections: [
            { label: "Problem", text: "Customer feedback is often fragmented and noisy, leading to misaligned product roadmaps." },
            { label: "Vision", text: "Create a single source of truth for CX sentiment using LLMs for deep thematic extraction." },
            { label: "Impact", text: "30% reduction in manual tag overhead and direct correlation between feedback and feature adoption." }
          ],
          stats: [
            { label: "Accuracy", value: "98%" },
            { label: "Growth", value: "SaaS" },
            { label: "Market", value: "B2B" }
          ],
          tags: ["NLP", "Product Thinking", "UX Strategy"],
          gradient: "from-blue-600/10 to-indigo-600/10",
          icon: <Cpu className="text-blue-400" />,
          visual: "feedback-graph"
        },
        {
            id: "solvekard",
            title: "SolveKard",
            subtitle: "Digital Business Card & SaaS Platform",
            desc: "A digital business card platform designed to streamline networking and lead management through automated CRM sync.",
            sections: [
              { label: "Efficiency", text: "Built SQL alerts and Python scripts, cutting manual effort by 40%+ and reducing activation time by 35%." },
              { label: "Roadmap", text: "Defined comprehensive product roadmap, backlog, and feature sets for scalable SaaS growth." },
              { label: "Retention", text: "Designed dashboards and standardized onboarding, boosting retention and team velocity." }
            ],
            stats: [
                { label: "Automation", value: "40%+" },
                { label: "Activation", value: "-35%" },
                { label: "Users", value: "Scale" }
            ],
            tags: ["SaaS Strategy", "SQL Alerts", "Growth Ops"],
            gradient: "from-purple-600/10 to-pink-600/10",
            icon: <Globe className="text-purple-400" />,
            visual: "flow-diagram"
        }
    ];

    return (
        <section id="projects" className="py-16 md:py-32 px-8 relative">
           <div className="max-w-7xl mx-auto space-y-24 md:space-y-40">
             {projects.map((project, i) => (
                <div key={project.id} className={cn("flex flex-col lg:items-center gap-12 md:gap-24", i % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row")}>
                   {/* Left: Content */}
                   <motion.div 
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     className="flex-1"
                   >
                     <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                          {project.icon}
                        </div>
                        <div>
                         <h2 className="text-4xl font-display font-bold text-white tracking-tighter">{project.title}</h2>
                         <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{project.subtitle}</p>
                        </div>
                     </div>
                     
                     <p className="text-xl text-gray-400 mb-10 font-light leading-relaxed">
                        {project.desc}
                     </p>

                     <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {project.sections.map((sec, j) => (
                           <div key={j} className="space-y-2">
                             <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">{sec.label}</span>
                             <p className="text-sm text-gray-500 leading-relaxed">{sec.text}</p>
                           </div>
                        ))}
                     </div>

                     <div className="flex flex-wrap gap-4 pt-8 border-t border-white/5">
                        <button className="px-8 py-4 rounded-xl bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all">
                           Explore SaaS
                        </button>
                        <div className="flex gap-2">
                           {project.tags.map(t => (
                             <span key={t} className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] uppercase font-bold text-gray-500">
                               {t}
                             </span>
                           ))}
                        </div>
                     </div>
                   </motion.div>

                   {/* Right: Visual Showcase */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="flex-1 relative group cursor-pointer w-full"
                    >
                       <div className={cn("aspect-square md:aspect-[4/3] rounded-3xl md:rounded-[3rem] overflow-hidden border border-white/10 transition-all duration-500 shadow-2xl flex items-center justify-center p-4 md:p-12 bg-gradient-to-br", project.gradient)}>
                          <div className={cn("w-full h-full rounded-2xl md:rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col p-4 md:p-8 glass border-white/20 shadow-black/60")}>
                             <div className="flex items-center gap-2 mb-6">
                                 <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                 <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                 <div className="w-20 h-2 bg-white/10 rounded-full" />
                             </div>
                             
                             <div className="flex-1 flex flex-col justify-center items-center gap-6">
                                {project.id === "vempli" ? (
                                   <div className="w-full h-full flex items-center justify-between gap-4 py-4 relative">
                                      {/* Background Dotted Lines */}
                                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
                                          <line x1="20%" y1="20%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-blue-500" />
                                          <line x1="20%" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-blue-500" />
                                          <line x1="20%" y1="80%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-blue-500" />
                                          <line x1="80%" y1="50%" x2="50%" y2="50%" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-blue-500" />
                                      </svg>

                                      {/* Left: Raw Voice Reviews */}
                                      <div className="flex flex-col gap-3 flex-1 z-10">
                                          {[
                                              { text: "Food took forever to arrive...", rating: 2 },
                                              { text: "Service was great but place felt unclean", rating: 3, m: true },
                                              { text: "Staff was super rude today!", rating: 1 }
                                          ].map((review, i) => (
                                              <motion.div 
                                                  key={i}
                                                  initial={{ x: -20, opacity: 0 }}
                                                  whileInView={{ x: 0, opacity: 1 }}
                                                  transition={{ delay: i * 0.1 }}
                                                  className="bg-white/5 backdrop-blur-md rounded-xl p-3 shadow-xl border border-white/10 flex flex-col gap-1.5"
                                              >
                                                  <div className="flex items-center gap-2">
                                                      <div className={cn("w-5 h-5 rounded-full flex items-center justify-center", review.m ? "bg-yellow-500/80" : "bg-red-500/80")}>
                                                          <Mic className="w-2.5 h-2.5 text-white" />
                                                      </div>
                                                      <div className="flex gap-0.5">
                                                          {[1, 2, 3, 4, 5].map(s => (
                                                              <Star key={s} className={cn("w-2.5 h-2.5", s <= review.rating ? "text-yellow-400 fill-current" : "text-white/10")} />
                                                          ))}
                                                      </div>
                                                  </div>
                                                  <p className="text-[9px] text-gray-300 font-bold leading-tight">"{review.text}"</p>
                                              </motion.div>
                                          ))}
                                          <div className="flex items-center gap-2 mt-1 opacity-40">
                                            <Mic className="w-3 h-3 text-white" />
                                            <span className="text-[7px] font-bold text-white uppercase tracking-widest">Raw Voice Reviews</span>
                                          </div>
                                      </div>

                                      {/* Center: AI Engine */}
                                      <div className="flex flex-col items-center justify-center relative z-10 mx-2">
                                          <div className="absolute inset-0 bg-blue-500/20 rounded-full scale-[2.5] blur-3xl animate-pulse" />
                                          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-blue-500/10 border border-blue-500/30 shadow-2xl flex flex-col items-center justify-center relative backdrop-blur-xl">
                                              <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-1" />
                                              <span className="text-[8px] md:text-[9px] font-bold text-blue-200 uppercase tracking-tighter">AI Engine</span>
                                          </div>
                                          <p className="text-[7px] font-bold text-gray-500 mt-6 uppercase tracking-widest text-center">WHISPER • LLAMA 3.3</p>
                                      </div>

                                      {/* Right: Dashboard */}
                                      <div className="flex-[1.2] glass rounded-2xl p-4 shadow-2xl border border-white/20 flex flex-col gap-3 z-10 h-full overflow-hidden">
                                          <div className="flex items-center justify-between">
                                              <div className="flex items-center gap-2">
                                                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-[0_0_10px_rgba(37,99,235,0.5)]">
                                                      <span className="text-[9px] font-bold">V</span>
                                                  </div>
                                                  <span className="text-[10px] font-bold text-white">Vempli</span>
                                              </div>
                                              <div className="flex gap-1">
                                                  <div className="w-1 h-1 rounded-full bg-white/10" />
                                                  <div className="w-1 h-1 rounded-full bg-white/10" />
                                                  <div className="w-1 h-1 rounded-full bg-blue-500" />
                                              </div>
                                          </div>

                                          <div className="grid grid-cols-3 gap-2">
                                              {[
                                                  { label: "Feedback", val: "1.2k", grow: "+22%", c: "text-emerald-400" },
                                                  { label: "Avg", val: "4.3", grow: "+2.2%", c: "text-emerald-400" },
                                                  { label: "Alerts", val: "12", grow: "-3", c: "text-red-400" }
                                              ].map((stat, idx) => (
                                                  <div key={idx} className="p-2 bg-white/5 rounded-lg border border-white/10">
                                                      <p className="text-[7px] font-bold text-gray-500 uppercase mb-0.5">{stat.label}</p>
                                                      <p className="text-[10px] font-bold text-white leading-none mb-0.5">{stat.val}</p>
                                                      <p className={cn("text-[7px] font-bold", stat.c)}>{stat.grow}</p>
                                                  </div>
                                              ))}
                                          </div>

                                          <div className="flex gap-3">
                                              <div className="flex-1 space-y-1.5">
                                                  <span className="text-[7px] font-bold text-gray-500 uppercase">Trend</span>
                                                  <div className="h-10 flex items-end gap-1">
                                                      {[30, 50, 40, 60, 75, 60, 80].map((h, k) => (
                                                          <div key={k} className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-sm shadow-[0_0_5px_rgba(37,99,235,0.3)]" style={{ height: `${h}%` }} />
                                                      ))}
                                                  </div>
                                              </div>
                                              <div className="w-1/3 flex flex-col items-center justify-center border-l border-white/5 pl-2">
                                                  <div className="w-8 h-8 rounded-full border-2 border-white/5 relative">
                                                      <div className="absolute inset-0 border-2 border-emerald-400 rounded-full border-t-transparent -rotate-45 shadow-[inset_0_0_10px_rgba(52,211,153,0.2)]" />
                                                      <div className="absolute inset-0 flex items-center justify-center">
                                                          <span className="text-[7px] font-bold text-white">84%</span>
                                                      </div>
                                                  </div>
                                                  <div className="mt-1 space-y-0.5">
                                                      <div className="flex items-center gap-1">
                                                          <div className="w-1 h-1 rounded-full bg-emerald-400 shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                                                          <span className="text-[6px] font-bold text-gray-400">Positive</span>
                                                      </div>
                                                  </div>
                                              </div>
                                          </div>

                                          <div className="space-y-1.5 pt-1">
                                            <p className="text-[7px] font-bold text-gray-500 uppercase">Top tags</p>
                                            {[
                                                { label: "Waiting", val: 90, color: "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.3)]" },
                                                { label: "Staff", val: 62, color: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.3)]" }
                                            ].map((tag, i) => (
                                                <div key={i} className="space-y-0.5">
                                                    <div className="flex justify-between text-[7px] font-bold">
                                                        <span className="text-gray-400">{tag.label}</span>
                                                        <span className="text-gray-500">{tag.val}</span>
                                                    </div>
                                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div initial={{ width: 0 }} whileInView={{ width: `${tag.val}%` }} className={cn("h-full", tag.color)} />
                                                    </div>
                                                </div>
                                            ))}
                                          </div>

                                          <div className="mt-auto pt-2 border-t border-white/5 flex items-center justify-between">
                                              <span className="text-[7px] font-bold text-gray-600 uppercase italic">Actionable Insights</span>
                                              <TrendingUp className="w-2.5 h-2.5 text-gray-600" />
                                          </div>
                                      </div>
                                   </div>
                                ) : (
                                   <div className="w-full space-y-8">
                                      <div className="flex items-center justify-center gap-8">
                                         <div className="w-20 h-20 rounded-full bg-purple-500/20 border border-white/10 flex items-center justify-center">
                                            <Globe className="w-10 h-10 text-purple-400" />
                                         </div>
                                         <motion.div animate={{ x: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                                           <ChevronRight className="text-white/20" />
                                         </motion.div>
                                         <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                                            <Database className="w-10 h-10 text-blue-400" />
                                         </div>
                                      </div>
                                      <div className="h-2 w-full bg-white/5 rounded-full" />
                                   </div>
                                )}
                             </div>
                             
                             <div className="mt-8 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                                {project.stats.map((s, k) => (
                                  <div key={k} className="text-center">
                                     <p className="text-xl font-display font-bold text-white">{s.value}</p>
                                     <p className="text-[9px] uppercase tracking-widest text-white/50 font-bold">{s.label}</p>
                                  </div>
                                ))}
                             </div>
                          </div>
                       </div>

                      {/* Hover Product Thinking Overlay */}
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        whileHover={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute -top-10 -left-10 bg-black/95 backdrop-blur-3xl border border-white/10 p-6 rounded-3xl w-72 shadow-2xl pointer-events-none z-30"
                      >
                         <h4 className="text-blue-400 font-bold text-[10px] flex items-center gap-2 mb-3 uppercase tracking-widest">
                           <ShieldCheck className="w-4 h-4" />
                           {project.id === "vempli" ? "Insight Engineering" : "Systems Logic"}
                         </h4>
                         <p className="text-xs text-gray-300 leading-relaxed font-medium mb-4">
                           {project.id === "vempli" 
                             ? "Problem: Fragmented CX noise. Thinking: Leverage NLP to map subjective sentiment to objective product metrics." 
                             : "Problem: Lost lead velocity. Thinking: Automate the bridge between networking and CRM lead pipelines."}
                         </p>
                         <div className="flex items-center gap-2 text-[9px] text-blue-500 font-bold uppercase tracking-tighter italic">
                            <Zap className="w-3 h-3 fill-current" />
                            Strategy First Execution
                         </div>
                      </motion.div>
                   </motion.div>
                </div>
             ))}
           </div>
        </section>
    );
};

const LiveActivityFeed = () => {
    const activities = [
        "Optimizing workflow automation...",
        "Reviewing product metrics...",
        "Deploying dashboard improvements...",
        "Building CRM experiences...",
        "Analyzing user behavior...",
        "Automating repetitive workflows...",
        "Tracking onboarding performance...",
        "Improving customer experience systems..."
    ];

    const [visibleActivities, setVisibleActivities] = useState<string[]>([]);
    
    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setVisibleActivities(prev => {
                const next = [activities[i], ...prev].slice(0, 2);
                i = (i + 1) % activities.length;
                return next;
            });
        }, 6000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed bottom-10 left-10 z-[60] hidden xl:block w-72 h-[150px] pointer-events-none">
            <div className="flex flex-col gap-3">
                <AnimatePresence initial={false}>
                    {visibleActivities.map((activity, idx) => (
                        <motion.div
                            key={activity + idx}
                            initial={{ opacity: 0, x: -20, scale: 0.95, filter: "blur(10px)" }}
                            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="glass p-3 rounded-xl border-blue-500/10 flex items-center gap-3 backdrop-blur-md"
                        >
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shrink-0" />
                            <div>
                                <p className="text-[10px] font-mono text-blue-400/80 leading-none mb-1">
                                    {new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit'})}
                                </p>
                                <p className="text-[11px] font-bold text-gray-300 uppercase tracking-tighter leading-tight">
                                    {activity}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

const DecisionSimulator = ({ onRef }: { onRef?: (el: HTMLElement | null) => void }) => {
    const scenarios = [
        {
            title: "Users are dropping during onboarding. What would you prioritize first?",
            options: [
                { 
                    label: "Better UX", 
                    reason: "Improving onboarding clarity reduces friction faster than adding engagement notifications. Prioritizing experience before retention mechanics creates stronger activation rates.",
                    metric: "Activation +22%"
                },
                { 
                    label: "Performance", 
                    reason: "Technical friction often disguised as bad UX. Reducing TTV (Time To Value) through speed is the foundation of high-growth SaaS.",
                    metric: "Latency -150ms"
                },
                { 
                    label: "Better Analytics", 
                    reason: "You can't fix what you can't measure. Granular tracking identifies the exact leak in the bucket before committing expensive engineering resources.",
                    metric: "Insights +100%"
                }
            ]
        }
    ];

    const [selected, setSelected] = useState<number | null>(null);

    return (
        <section id="strategy-lab" ref={onRef} className="py-16 md:py-32 px-8 relative bg-blue-900/5">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row gap-20 items-center">
                    <div className="flex-1">
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.3em] mb-4 block italic">Strategy Lab</span>
                        <h2 className="text-4xl md:text-5xl font-display font-bold text-white tracking-tighter mb-8 italic">How I <span className="text-blue-500">Think</span></h2>
                        <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
                            Product management isn't about having the right answers—it's about asking the right questions and managing the tradeoffs.
                        </p>
                        
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Simulation: Onboarding Friction</p>
                            <div className="grid grid-cols-1 gap-4">
                                {scenarios[0].options.map((opt, i) => (
                                    <button
                                        key={opt.label}
                                        onClick={() => setSelected(i)}
                                        className={cn(
                                            "w-full p-6 rounded-2xl border text-left transition-all duration-500 group",
                                            selected === i 
                                                ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_30px_rgba(37,99,235,0.1)]" 
                                                : "bg-white/[0.02] border-white/5 hover:border-white/20"
                                        )}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className={cn("font-display font-bold text-lg", selected === i ? "text-white" : "text-gray-400")}>{opt.label}</span>
                                            <div className={cn(
                                                "w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all",
                                                selected === i ? "border-blue-500 bg-blue-500" : "border-white/10"
                                            )}>
                                                {selected === i && <ChevronRight className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 w-full">
                        <div className="glass rounded-[3rem] border-white/10 p-10 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden">
                            <AnimatePresence mode="wait">
                                {selected === null ? (
                                    <motion.div
                                        key="empty"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center"
                                    >
                                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mx-auto mb-6 text-gray-700">
                                            <Cpu className="w-8 h-8" />
                                        </div>
                                        <p className="text-gray-600 font-mono text-xs uppercase tracking-widest leading-loose">
                                            Select an option to <br />initialize reasoning core
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="result"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="w-full space-y-8"
                                    >
                                        <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
                                                    <Activity className="w-4 h-4" />
                                                </div>
                                                <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Logic Analysis</span>
                                            </div>
                                            <p className="text-gray-300 italic font-medium leading-relaxed">
                                                "{scenarios[0].options[selected].reason}"
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-5 glass border-white/5 rounded-2xl">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-2">Tradeoff Thinking</p>
                                                <div className="w-full h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                                                    <motion.div initial={{ width: 0 }} animate={{ width: "85%" }} className="h-full bg-blue-500" />
                                                </div>
                                            </div>
                                            <div className="p-5 glass border-white/5 rounded-2xl">
                                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-tighter mb-2">Projected Impact</p>
                                                <p className="text-xl font-display font-bold text-emerald-400">{scenarios[0].options[selected].metric}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Background decoration for the analyzer */}
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                            <div className="absolute top-0 right-0 p-8 opacity-5">
                                <BarChart3 className="w-40 h-40 text-blue-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const Experience = () => {
    const roles = [
      {
        company: "Numerator",
        role: "Delivery Analyst",
        period: "07/2025 - Present",
        summary: "Leading cross-functional teams for Numerator's Worldpanel, providing market and survey data to help clients make informed decisions. Impacting 50,000+ users across the UK.",
        achievements: ["90% on-time feature releases", "Automated pipelines (saved 15h/week)", "Engagement improved for 1,200+ accounts"],
        tools: ["SQL", "Power BI", "Python", "Agile", "Confluence"],
        metrics: ["~50k Users", "90% On-Time"]
      },
      {
        company: "Webkorps Services",
        role: "Business Development Executive",
        period: "03/2024 - 07/2025",
        summary: "Specialized in digital solutions and customer engagement. Defined product requirements (BRDs, User Stories) and managed backlogs in Jira and Microsoft Project.",
        achievements: ["40% ramp-up time reduction", "20% engagement boost via Dashboards", "Facilitated Agile ceremonies"],
        tools: ["Jira", "MS Project", "MySQL", "Google Analytics", "Power BI"],
        metrics: ["40% Ramp-up", "20% Engagement"]
      },
      {
        company: "SolveKard (Founder)",
        role: "Product & SaaS Strategy",
        period: "2023 - 2024",
        summary: "Launched and scaled a digital business card + SaaS platform. Built SQL alerts and automated workflows to cut manual effort by 40%+.",
        achievements: ["35% Activation decrease", "40% Manual effort reduction", "Cross-functional team leadership"],
        tools: ["SQL", "Python", "SaaS Platform", "CRM"],
        metrics: ["40% Automation", "35% Activation"]
      }
    ];

    return (
        <section id="experience" className="py-16 md:py-32 px-8 bg-black/30 relative">
          <div className="absolute inset-0 noise-bg opacity-[0.02] pointer-events-none" />
          <div className="max-w-7xl mx-auto">
             <div className="mb-24 space-y-4">
               <h2 className="text-5xl font-display font-bold tracking-tighter text-white">Execution <span className="text-blue-500 italic">Timeline</span></h2>
               <p className="text-gray-500 max-w-xl">A trajectory defined by bridging the gap between data insights and product delivery.</p>
             </div>

             <div className="relative space-y-12">
               {/* Vertical line */}
               <div className="absolute left-0 lg:left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block" />

               {roles.map((role, i) => (
                 <motion.div 
                   key={role.company}
                   initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className={cn(
                     "flex flex-col lg:flex-row items-center gap-8 lg:gap-24 relative",
                     i % 2 === 1 ? "lg:flex-row-reverse text-left lg:text-right" : "text-left"
                   )}
                 >
                   <div className="flex-1 w-full lg:w-auto">
                      <div className="group card-container">
                         <div className={cn("flex items-center gap-4 mb-4", i % 2 === 1 ? "lg:flex-row-reverse" : "")}>
                            <h3 className="text-2xl font-display font-bold text-white tracking-tight">{role.company}</h3>
                            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest px-3 py-1 bg-blue-500/10 rounded-full border border-blue-500/20">{role.period}</span>
                         </div>
                         <p className="text-gray-400 font-bold text-sm uppercase tracking-[0.1em] mb-4">{role.role}</p>
                         <p className="text-gray-500 text-sm leading-relaxed mb-6 italic">{role.summary}</p>
                         
                         <div className={cn("flex flex-wrap gap-2 mb-8", i % 2 === 1 ? "lg:justify-end" : "")}>
                            {role.tools.map(tool => (
                              <span key={tool} className="text-[9px] px-2 py-1 rounded-md bg-white/5 border border-white/5 text-gray-500 uppercase tracking-tighter">
                                {tool}
                              </span>
                            ))}
                         </div>

                         <div className={cn("grid grid-cols-2 gap-4", i % 2 === 1 ? "lg:flex lg:flex-row-reverse" : "")}>
                            {role.metrics.map(m => (
                              <div key={m} className={cn("p-4 bg-white/[0.02] border border-white/5 rounded-2xl", i % 2 === 1 ? "text-right" : "text-left")}>
                                <div className={cn("flex items-center gap-2 mb-1", i % 2 === 1 ? "justify-end" : "justify-start")}>
                                  <TrendingUp className="w-3 h-3 text-blue-400" />
                                  <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">Impact</span>
                                </div>
                                <p className="text-lg font-display font-bold text-white">{m}</p>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                   
                   {/* Timeline node */}
                   <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-600 border-4 border-bg-dark z-10 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />
                   
                   <div className="flex-1 hidden lg:block" />
                 </motion.div>
               ))}
             </div>
          </div>
        </section>
    );
};

const Skills = ({ onHoverSkill }: { onHoverSkill: (id: string | null) => void }) => {
  const [activeNode, setActiveNode] = useState<any>(null);

  const skillGroups = [
    {
      id: "product-execution",
      title: "Product Execution",
      desc: "Managing the roadmap from ideation to delivery.",
      icon: <Layers className="w-6 h-6" />,
      items: ["User story", "Agile", "Scrum", "Kanban", "Sprint Planning", "Project Scheduling", "AB Testing", "Jira", "Stakeholder Sync"],
      examples: [
        "Led cross-functional teams of 5-7 members ensuring 90% on-time feature releases.",
        "Managed feature backlogs and sprint priorities, delivering 8-10 enhancements per quarter.",
        "Translated complex business needs into actionable product requirements impacting 50,000+ users."
      ],
      impact: "Consistent on-time feature delivery and high user impact."
    },
    {
      id: "analytics-data",
      title: "Analytics & Data",
      desc: "Transforming raw data into strategic insights.",
      icon: <PieChart className="w-6 h-6" />,
      items: ["SQL", "Microsoft Power BI", "Python", "Google Analytics", "KPI Tracking", "Microsoft SQL Server", "Pivot Table", "Power Query", "Macros"],
      examples: [
        "Automated data pipelines and reporting with Python and SQL, reducing manual effort by ~40%.",
        "Developed SQL-based alert systems to flag high-value accounts, reducing missed follow-ups by ~35%.",
        "Designed real-time dashboards to track KPIs and churn, boosting engagement by 20%."
      ],
      impact: "Reduced reporting overhead by saving 10-15 hours/week for teams."
    },
    {
      id: "saas-growth",
      title: "SaaS & Growth",
      desc: "Scaling digital ecosystems with automation.",
      icon: <Monitor className="w-6 h-6" />,
      items: ["CRM", "HubSpot", "Zoho", "Confluence", "Microsoft Project", "Trello", "Microsoft Office", "UX Flows"],
      examples: [
        "Reduced activation time by 35% through standardized onboarding and automated workflows.",
        "Integrated 1,200+ accounts via proactive CRM alert systems and lead tracking.",
        "Maintained product documentation in Confluence, reducing ramp-up time for new members by 40%."
      ],
      impact: "Automated acquisition and standardized onboarding systems."
    }
  ];

  return (
    <section id="skills" className="py-16 md:py-32 px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
           <h2 className="text-5xl font-display font-bold tracking-tighter mb-4 text-white">Technical <span className="text-blue-500 italic">Skills</span></h2>
           <p className="text-gray-400 max-w-2xl mx-auto italic">Engineered for performance and scale.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onClick={() => setActiveNode(group)}
              className="glass p-8 rounded-[2rem] border-white/5 hover:border-blue-500/50 transition-all group/skill-card cursor-pointer relative overflow-hidden flex flex-col h-full z-10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover/skill-card:bg-blue-500/20 transition-all duration-500">
                  {group.icon}
                </div>
                <h3 className="text-2xl font-display font-bold tracking-tight group-hover/skill-card:text-blue-400 transition-colors uppercase">{group.title}</h3>
              </div>
              
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                {group.desc}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {group.items.map((it) => (
                  <span 
                    key={it}
                    className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg bg-white/5 text-gray-400 border border-white/5 group-hover/skill-card:border-blue-500/20 transition-colors"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal / Expanded View */}
      <AnimatePresence>
        {activeNode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-12 overflow-y-auto"
          >
             <div className="absolute inset-0 bg-black/80 backdrop-blur-3xl" onClick={() => setActiveNode(null)} />
             
             <motion.div 
               initial={{ opacity: 0, scale: 0.9, y: 30 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 30 }}
               className="w-full max-w-4xl glass rounded-[2rem] md:rounded-[3rem] border-white/10 p-6 md:p-16 relative overflow-hidden bg-bg-dark/60 z-10"
             >
                <button onClick={() => setActiveNode(null)} className="absolute top-6 right-6 md:top-10 md:right-10 p-2 text-gray-500 hover:text-white transition-colors">
                   <X className="w-6 h-6 md:w-8 md:h-8" />
                </button>

                <div className="flex flex-col md:flex-row gap-12 md:gap-20">
                   <div className="flex-1 space-y-10">
                      <div>
                         <div className="w-16 h-16 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-400">
                           {activeNode.icon}
                         </div>
                         <h2 className="text-4xl font-display font-bold text-white mb-4 uppercase tracking-tighter">{activeNode.title}</h2>
                         <p className="text-gray-400 text-lg leading-relaxed">{activeNode.desc}</p>
                      </div>

                      <div className="space-y-6">
                         <h4 className="text-[10px] font-bold text-blue-500 tracking-[0.2em] uppercase">Impact Report</h4>
                         <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/20">
                            <Activity className="w-5 h-5 text-blue-400 mb-3" />
                            <p className="text-xl text-white font-medium italic">{activeNode.impact}</p>
                         </div>
                      </div>
                   </div>

                   <div className="flex-1 space-y-10">
                      <div>
                        <h4 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
                           <Code className="w-4 h-4" />
                           Execution Workflows
                        </h4>
                        <div className="space-y-6">
                           {activeNode.examples.map((ex: string, k: number) => (
                             <div key={k} className="flex gap-4">
                                <span className="text-blue-500 font-mono text-sm">0{k+1}</span>
                                <p className="text-gray-400 leading-relaxed text-sm font-medium">{ex}</p>
                             </div>
                           ))}
                        </div>
                      </div>

                      <div className="pt-10 border-t border-white/5">
                         <h4 className="text-[10px] font-bold text-gray-500 tracking-[0.2em] uppercase mb-4">Core Toolkit</h4>
                         <div className="flex flex-wrap gap-2">
                            {activeNode.items.map((it: string) => (
                              <span key={it} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[11px] font-bold text-gray-300">
                                {it}
                              </span>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>
             </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Contact = () => {
    return (
        <section id="contact" className="py-40 px-8 relative overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/5 blur-[150px] rounded-full pointer-events-none" />
           <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
           
           <div className="max-w-4xl mx-auto text-center space-y-12 relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-white leading-tight">
                  Let's Build Meaningful <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Experiences.</span>
                </h2>
                <p className="text-gray-400 text-lg max-w-lg mx-auto leading-relaxed">
                  Open for product strategy roles, SaaS consulting, and data-driven infrastructure projects.
                </p>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, scale: 0.9 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="flex flex-wrap justify-center gap-6"
              >
                <a href="mailto:Dhirajkushwaha002@gmail.com" className="group px-10 py-5 rounded-2xl bg-white text-black font-extrabold text-sm tracking-widest uppercase hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4">
                   Initialize Transmission
                   <Mail className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                </a>
                <a href="https://www.linkedin.com/in/dhiraj-kushwaha-4665741aa/" target="_blank" rel="noreferrer" className="px-10 py-5 rounded-2xl glass border-white/10 text-white font-extrabold text-sm tracking-widest uppercase hover:bg-white/10 transition-all flex items-center justify-center gap-4">
                   Connect Socials
                   <Linkedin className="w-5 h-5" />
                </a>
              </motion.div>

              <div className="pt-24 flex flex-wrap justify-center gap-6 md:gap-12 border-t border-white/5 opacity-50">
                 <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">GitHub</a>
                 <a href="https://www.linkedin.com/in/dhiraj-kushwaha-4665741aa/" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">LinkedIn</a>
                 <a href="mailto:Dhirajkushwaha002@gmail.com" className="text-gray-500 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">Email</a>
                 <a href="#" className="text-gray-500 hover:text-white transition-colors duration-300 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">CV</a>
              </div>
           </div>
        </section>
    );
};

// --- Main Page ---

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [hoveredSkillId, setHoveredSkillId] = useState<string | null>(null);
  const strategyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("wa_popup_seen");
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          setShowWhatsApp(true);
          setIsTyping(false);
        }, 2000);
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, []);

  const dismissPopup = () => {
    setShowWhatsApp(false);
    sessionStorage.setItem("wa_popup_seen", "true");
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    
    return () => lenis.destroy();
  }, []);

  return (
    <div className="relative bg-bg-dark font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white">
      {/* Visual background layers */}
      <div className="fixed inset-0 noise-bg z-[60] pointer-events-none opacity-[0.03]" />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_30%_10%,rgba(59,130,246,0.05),transparent)] z-0" />
      
      {/* Scroll Progress */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 z-[100] origin-left shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ scaleX }} />
      
      <Navbar />

      <LiveActivityFeed />

      <AnimatePresence>
        {(isTyping || showWhatsApp) && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-10 right-10 z-[100] w-[350px] max-w-[calc(100vw-40px)]"
          >
            <div className="glass p-6 rounded-[2rem] border-emerald-500/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-1 bg-emerald-500 h-full" />
               
               {isTyping ? (
                 <div className="flex gap-2 items-center py-4">
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-emerald-500 rounded-full" />
                    <motion.div animate={{ opacity: [0.4, 1, 0.4] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-emerald-500 rounded-full" />
                 </div>
               ) : (
                 <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <MessageSquare className="w-5 h-5" />
                       </div>
                       <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Direct Outreach</span>
                    </div>

                    <div className="space-y-4">
                       <p className="text-white font-medium leading-relaxed">
                          I guess there’s something interesting that made you stay here for over 20 seconds 👀
                       </p>
                       <p className="text-gray-400 text-sm leading-relaxed">
                          Let’s connect and talk about products, projects, analytics, or opportunities.
                       </p>
                       <p className="text-[11px] text-gray-500 italic">Always open to meaningful conversations.</p>
                    </div>

                    <div className="flex flex-col gap-3">
                       <a 
                        href="https://wa.me/919179349711" 
                        target="_blank" 
                        rel="noreferrer"
                        onClick={dismissPopup}
                        className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-widest text-center transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-2"
                       >
                          Connect on WhatsApp
                       </a>
                       <button 
                        onClick={dismissPopup}
                        className="w-full py-3 text-gray-500 hover:text-white transition-colors text-xs uppercase font-bold tracking-widest"
                       >
                          Maybe Later
                       </button>
                    </div>
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative z-10 cursor-default">
        <Hero />
        <ProjectShowcase />
        <DecisionSimulator onRef={(el) => strategyRef.current = el} />
        <Experience />
        <Skills onHoverSkill={setHoveredSkillId} />
        <Contact />
      </main>

      {/* Connection Line Overlay */}
      <AnimatePresence>
        {hoveredSkillId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 pointer-events-none overflow-hidden"
          >
             <svg className="w-full h-full">
                <defs>
                   <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                   </linearGradient>
                </defs>
                {/* Abstract energy lines connecting sections */}
                <motion.path 
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 1 }}
                   exit={{ pathLength: 0, opacity: 0 }}
                   transition={{ duration: 1.5, ease: "easeInOut" }}
                   d="M -100,500 C 200,400 800,600 1200,500 S 1800,400 2000,500"
                   stroke="url(#line-gradient)"
                   strokeWidth="2"
                   fill="transparent"
                   className="blur-sm"
                />
                <motion.path 
                   initial={{ pathLength: 0, opacity: 0 }}
                   animate={{ pathLength: 1, opacity: 1 }}
                   exit={{ pathLength: 0, opacity: 0 }}
                   transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                   d="M -100,600 C 300,700 700,500 1100,600 S 1700,700 2100,600"
                   stroke="url(#line-gradient)"
                   strokeWidth="1"
                   fill="transparent"
                   className="opacity-30"
                />
                <motion.circle 
                   animate={{ r: [100, 200, 100], opacity: [0.05, 0.15, 0.05] }}
                   transition={{ duration: 5, repeat: Infinity }}
                   cx="50%" 
                   cy="50%" 
                   className="fill-blue-500/20 blur-[100px]"
                />
             </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="py-16 px-8 border-t border-white/5 bg-black/40 text-center space-y-6">
         <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 rounded-md bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-500">DK</div>
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Strategy Over Static Code</span>
         </div>
         <p className="text-[9px] text-gray-600 uppercase tracking-[0.2em]">Designed for Execution © 2026 . Based in India . Operating Globally</p>
      </footer>
    </div>
  );
}
