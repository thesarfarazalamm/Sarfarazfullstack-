import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Sun, Moon, Zap, Database, Code, LayoutGrid, Wrench, 
  Users, Star, ArrowLeft, GitBranch, ExternalLink, 
  Menu, X, Linkedin, Github, Instagram, Youtube, 
  Mail, MessageSquare, ChevronRight, Download
} from 'lucide-react';

// --- DATA CONSTANTS ---

const SKILL_DATA = {
  Frontend: {
    title: "Frontend Development",
    icon: Code,
    techs: {
      "HTML5": [
        "Semantic HTML for SEO and Accessibility (WCAG).",
        "Expertise in Canvas API for 2D/3D graphics.",
        "Advanced Form validation and native browser APIs.",
        "Deep understanding of DOM tree optimization.",
        "Knowledge of SVG filters and animation pathing."
      ],
      "CSS3": [
        "Advanced Flexbox, Grid, and Subgrid layouts.",
        "Complex Keyframe animations and GPU-accelerated transitions.",
        "Responsive design with Container Queries and Media Queries.",
        "CSS-in-JS (Styled Components) and Tailwind CSS expertise.",
        "Expert in CSS Custom Properties (Variables) for theming."
      ],
      "JavaScript": [
        "Expert in ES6+ syntax (Promises, Async/Await, Destructuring).",
        "Deep understanding of the event loop, scope, and closures.",
        "Proficient in functional programming paradigms.",
        "Experience with Babel and Webpack for module bundling.",
        "Solid foundation in OOP principles and prototype inheritance."
      ],
      React: [
        "Mastery of Hooks (useState, useEffect, useContext, useReducer) for state management.",
        "Experienced in building complex, accessible, and high-performance SPAs.",
        "Strong understanding of component lifecycle and optimization using React.memo.",
        "Proficient in state management libraries like Redux Toolkit and Zustand.",
        "Expert in integrating RESTful APIs and modern async patterns."
      ],
      "Tailwind CSS": [
        "Expert in utility-first workflows for rapid prototyping and development.",
        "Proficient in custom configuration (theme, colors, spacing).",
        "Mastery of responsive design using responsive prefixes (sm:, md:, lg:).",
        "Skilled in creating complex, compound components using only utility classes.",
        "Implemented custom utility classes and JIT mode features."
      ],
      "TypeScript": [
        "Strict type-checking and interface design for large-scale apps.",
        "Advanced generics and conditional types for reusable logic.",
        "Integration with React for robust component prop typing.",
        "Reducing runtime errors through static analysis and type safety.",
        "Familiar with decorators and metadata reflection."
      ]
    },
  },
  Backend: {
    title: "Backend Services",
    icon: Zap,
    techs: {
      "Java": [
        "Enterprise application development with Spring Boot.",
        "Multithreading and Concurrency management.",
        "JPA/Hibernate for Object-Relational Mapping.",
        "JVM Tuning and Garbage Collection optimization.",
        "Building scalable Microservices with Spring Cloud."
      ],
      "Node.js": [
        "Expert in Express.js for building robust and scalable REST APIs.",
        "Implemented microservices architecture for distributed systems.",
        "Strong grasp of asynchronous programming and non-blocking I/O.",
        "Proficient in authentication mechanisms (JWT, OAuth2).",
        "Built real-time applications using WebSockets (Socket.IO)."
      ],
      Python: [
        "Proficient in Django and FastAPI for modern web development.",
        "Experience with data manipulation libraries (Pandas, NumPy).",
        "Skilled in writing clean, PEP 8 compliant, maintainable code.",
        "Used Python for automation, scraping, and background tasks.",
        "Implemented basic machine learning integration (MLOps)."
      ],
      "C++ / C#": [
        "Performance-critical systems programming in C++.",
        "Object-Oriented design patterns in .NET Core (C#).",
        "Memory management and resource optimization.",
        "Building robust backend services with ASP.NET Core.",
        "Experience with low-level networking protocols."
      ],
      "Go (Golang)": [
        "High-concurrency microservices with Goroutines.",
        "Building lightweight, high-performance cloud tools.",
        "Strict typing and efficient compilation for production.",
        "Robust error handling and interface design.",
        "Native support for cloud-native ecosystems (Docker/K8s)."
      ],
      "PHP (Laravel)": [
        "Building robust MVC applications and RESTful APIs.",
        "Server-side templating with Blade engine.",
        "Experience with Eloquent ORM for data management.",
        "Deep knowledge of Composer and package ecosystems.",
        "Implementation of secure authentication and session logic."
      ]
    },
  },
  Database: {
    title: "Data Management",
    icon: Database,
    techs: {
      "SQL (Standard)": [
        "Expert in writing optimized complex JOINS and Subqueries.",
        "Proficient in Window Functions, CTEs, and Analytic functions.",
        "Mastery of DDL, DML, and DCL for database administration.",
        "Experienced in writing Stored Procedures and Triggers.",
        "Deep understanding of Transaction Isolation levels and Locks."
      ],
      PostgreSQL: [
        "Expert in relational schema design and normalization.",
        "Skilled in performance tuning via indexing and EXPLAIN plans.",
        "Used ORMs effectively (Prisma, Sequelize, TypeORM).",
        "Knowledgeable in advanced JSONB querying and storage.",
        "Built schemas for multi-tenant SaaS architectures."
      ],
      MySQL: [
        "Highly efficient read-heavy application optimization.",
        "Managing large-scale replication and clustering.",
        "Performance tuning and query execution analysis.",
        "Experience with database security and role-based access.",
        "Proficient in data migration scripts and ETL processes."
      ],
      MongoDB: [
        "Expert in document-based schema design for NoSQL.",
        "Proficient in the Aggregation Framework for data analytics.",
        "Strong skills in compound indexing and TTL indexes.",
        "Used Mongoose for powerful ODM integration in Node.js.",
        "Balanced embedded vs referenced data models for performance."
      ],
      "Redis": [
        "In-memory data structures for ultra-fast access.",
        "Implementing caching layers and session stores.",
        "Pub/Sub architecture for real-time messaging.",
        "Rate limiting and leaderboard implementations.",
        "Persistence configurations (RDB/AOF)."
      ]
    },
  },
  AI_Tools: {
    title: "AI & Creative",
    icon: LayoutGrid,
    techs: {
      "AI Platforms": [
        "Advanced use of LLMs (Gemini, GPT-4, Claude) for development.",
        "Expert in prompt engineering for complex system architecture.",
        "Integrated AI APIs for automated content classification.",
        "Applied AI-driven code review tools to enhance security.",
        "Utilized GitHub Copilot for accelerating sprint cycles."
      ],
      "Creative Suite": [
        "Proficient in Figma for high-fidelity UI/UX design.",
        "Skilled in Canva for marketing and visual storytelling.",
        "Video editing experience with CapCut and Premiere Pro.",
        "Optimized web assets (SVG/WebP) for performance.",
        "Created custom interactive animations and transitions."
      ]
    }
  }
};

const PROJECTS = [
  {
    name: "Enterprise E-Commerce",
    description: "Microservices architecture supporting 10k+ concurrent users with real-time inventory tracking.",
    tech: ["Node.js", "React", "PostgreSQL", "Redis"],
    stars: 428,
    forks: 64,
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "AI Analytics Dashboard",
    description: "Interactive data visualization tool powered by Gemini API for automated insight generation.",
    tech: ["Python", "FastAPI", "React", "Tailwind"],
    stars: 312,
    forks: 42,
    image: "https://images.unsplash.com/photo-1551288049-bbdac8626ad1?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "FinTech Mobile Bridge",
    description: "Secure cross-platform transaction gateway with military-grade encryption and logging.",
    tech: ["Java", "Spring Boot", "Docker", "AWS"],
    stars: 215,
    forks: 28,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Personal Cloud Storage",
    description: "Self-hosted alternative to Google Drive with automated encryption and folder syncing.",
    tech: ["Go", "React", "MongoDB", "S3"],
    stars: 189,
    forks: 19,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "DeFi Yield Aggregator",
    description: "Automated liquidity protocol optimizer for decentralized finance yield farming.",
    tech: ["Solidity", "TypeScript", "Ethers.js"],
    stars: 567,
    forks: 112,
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "HealthTrack AI",
    description: "Predictive health monitoring system using wearable data and machine learning.",
    tech: ["Python", "PyTorch", "React Native", "Firebase"],
    stars: 289,
    forks: 34,
    image: "https://images.unsplash.com/photo-1505751172107-129997a2170f?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Global Logistic Core",
    description: "Real-time fleet management and route optimization engine for international shipping.",
    tech: ["Java", "Kafka", "PostgreSQL", "Google Maps API"],
    stars: 198,
    forks: 22,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "CyberSentinel SIEM",
    description: "Security information and event management tool with automated threat detection.",
    tech: ["Go", "Elasticsearch", "React", "gRPC"],
    stars: 441,
    forks: 56,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Urban Flow Traffic",
    description: "Smart city initiative for monitoring and controlling traffic lights using computer vision.",
    tech: ["C++", "OpenCV", "MQTT", "Python"],
    stars: 156,
    forks: 41,
    image: "https://images.unsplash.com/photo-1494510151310-7ad5648ca474?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "SocialPulse Engine",
    description: "Large-scale sentiment analysis tool processing 1M+ tweets per hour via streaming.",
    tech: ["Node.js", "Socket.IO", "Redis", "NLP"],
    stars: 322,
    forks: 45,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "StreamCast Pro",
    description: "Low-latency video streaming platform with custom WebRTC signaling server.",
    tech: ["WebRTC", "TypeScript", "Node.js", "FFmpeg"],
    stars: 512,
    forks: 88,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "Quantum Ledger",
    description: "Experimental blockchain with post-quantum cryptography support.",
    tech: ["Rust", "Wasm", "RocksDB"],
    stars: 723,
    forks: 94,
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "PropTech CRM",
    description: "Real-estate management platform with 3D virtual tour integration.",
    tech: ["React", "Three.js", "MySQL", "AWS S3"],
    stars: 143,
    forks: 18,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "EduSphere LMS",
    description: "Gamified learning management system with real-time peer-to-peer collaboration.",
    tech: ["Next.js", "Prisma", "Pusher", "PostgreSQL"],
    stars: 267,
    forks: 39,
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "NeuroLink GUI",
    description: "Visualization dashboard for brain-computer interface data streams.",
    tech: ["Electron", "D3.js", "Python", "ZeroMQ"],
    stars: 304,
    forks: 27,
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "AgriSense IoT",
    description: "Precision agriculture platform monitoring soil health and moisture across 1000+ nodes.",
    tech: ["C#", "Azure IoT Hub", "PowerBI", "SQL"],
    stars: 182,
    forks: 31,
    image: "https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "AuthGuard Multi-Factor",
    description: "Enterprise MFA solution supporting biometrics and hardware keys.",
    tech: ["Java", "Spring Security", "Redis", "OAuth2"],
    stars: 356,
    forks: 52,
    image: "https://images.unsplash.com/photo-1563986768494-0dd256844ed1?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "VogueVibe AI",
    description: "Virtual dressing room using AR to overlay clothes onto user video streams.",
    tech: ["TensorFlow.js", "React", "WebXR", "Three.js"],
    stars: 489,
    forks: 67,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "TaskFlow Kanban",
    description: "Ultra-fast project management tool with offline-first synchronization.",
    tech: ["TypeScript", "IndexedDB", "Service Workers", "Zustand"],
    stars: 211,
    forks: 24,
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "BioSynthesize Hub",
    description: "Collaborative research platform for genetic sequences and molecular modeling.",
    tech: ["Python", "Django", "PostgreSQL", "React"],
    stars: 177,
    forks: 15,
    image: "https://images.unsplash.com/photo-1532187863486-abf51ad95699?auto=format&fit=crop&w=800&q=80"
  },
  {
    name: "MusicHive Collab",
    description: "Cloud-based DAW for real-time collaborative music production.",
    tech: ["Web Audio API", "Node.js", "Redis", "Canvas"],
    stars: 432,
    forks: 59,
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80"
  }
];

// --- COMPONENTS ---

const AnimatedSection = ({ children, delay = 0, className = "" }) => {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${className} ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Navbar = ({ isDark, toggleTheme, scrollTo }) => {
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setVisible(currentScroll < lastScroll || currentScroll < 100);
      setLastScroll(currentScroll);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
      visible ? 'translate-y-0' : '-translate-y-full'
    } ${isDark ? 'bg-gray-900/90 border-gray-800' : 'bg-white/90 border-gray-200'} backdrop-blur-md`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <button onClick={() => scrollTo('hero')} className="text-2xl font-black text-indigo-600 dark:text-amber-400 tracking-tighter">
          ANSARI<span className="text-gray-900 dark:text-white">.DEV</span>
        </button>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="text-sm font-medium hover:text-indigo-600 dark:hover:text-amber-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-800 hover:scale-110 transition-transform"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
          {mobileMenu ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className="md:hidden bg-white dark:bg-gray-900 p-6 flex flex-col space-y-4 shadow-xl">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { scrollTo(link.id); setMobileMenu(false); }}
              className="text-lg font-bold text-left"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-4 border-t dark:border-gray-800 flex justify-between items-center">
            <span className="text-sm">Appearance</span>
            <button onClick={toggleTheme} className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [activeCategory, setActiveCategory] = useState("Frontend");
  const [activeTech, setActiveTech] = useState("React");
  const [showPoints, setShowPoints] = useState(false);

  useEffect(() => {
    document.documentElement.className = isDark ? 'dark' : 'light';
  }, [isDark]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  };

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setActiveTech(Object.keys(SKILL_DATA[cat].techs)[0]);
    setShowPoints(false);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-500 selection:text-white">
      <Navbar isDark={isDark} toggleTheme={() => setIsDark(!isDark)} scrollTo={scrollTo} />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-40 pb-20 lg:pt-60 lg:pb-40">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-amber-500 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center">
          <AnimatedSection>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest uppercase rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400">
              Available for New Opportunities
            </span>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[1.1]">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-amber-500">Digital Solutions</span> That Last.
            </h1>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12">
              Full-stack developer specializing in building high-performance, scalable web applications with a focus on clean code and user experience.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => scrollTo('projects')}
                className="w-full sm:w-auto px-10 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-2xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95"
              >
                View Portfolio
              </button>
              <button 
                onClick={() => scrollTo('contact')}
                className="w-full sm:w-auto px-10 py-4 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 font-bold rounded-2xl hover:border-indigo-500 dark:hover:border-amber-500 transition-all"
              >
                Get In Touch
              </button>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Projects Completed', val: '20+' },
            { label: 'Happy Clients', val: '15+' },
            { label: 'Lines of Code', val: '250k+' },
            { label: 'Total Technologies', val: '20+' },
          ].map((stat, i) => (
            <AnimatedSection key={i} delay={i * 100} className="text-center">
              <div className="text-3xl md:text-4xl font-black text-indigo-600 dark:text-amber-400">{stat.val}</div>
              <div className="text-xs uppercase font-bold tracking-widest text-gray-500 mt-1">{stat.label}</div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Technical Prowess</h2>
            <p className="text-gray-600 dark:text-gray-400">Deep dive into my specialized technology stack and expertise.</p>
          </AnimatedSection>

          {/* Tier 1: Category Selection */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {Object.keys(SKILL_DATA).map((cat, i) => {
              const CategoryIcon = SKILL_DATA[cat].icon;
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`p-6 rounded-3xl flex flex-col items-center gap-4 transition-all group ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/40' 
                      : 'bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800'
                  }`}
                >
                  <CategoryIcon className={isActive ? 'text-white' : 'text-indigo-600 dark:text-amber-400'} size={32} />
                  <span className="font-bold text-sm uppercase tracking-wider">{SKILL_DATA[cat].title}</span>
                </button>
              );
            })}
          </div>

          <div className="relative min-h-[400px]">
            {/* Tier 2: Technology List */}
            {!showPoints ? (
              <AnimatedSection className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[40px] border dark:border-gray-800">
                <h3 className="text-xl font-black mb-8 flex items-center gap-3">
                  <ChevronRight className="text-indigo-500" />
                  Select a technology to explore depth
                </h3>
                <div className="flex flex-wrap gap-4">
                  {Object.keys(SKILL_DATA[activeCategory].techs).map((tech, i) => (
                    <button
                      key={tech}
                      onClick={() => { setActiveTech(tech); setShowPoints(true); }}
                      className="px-8 py-4 bg-white dark:bg-gray-800 rounded-2xl font-bold shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border dark:border-gray-700 flex items-center gap-3"
                    >
                      {tech}
                      <ChevronRight size={16} className="text-gray-400" />
                    </button>
                  ))}
                </div>
              </AnimatedSection>
            ) : (
              /* Tier 3: Key Points View */
              <AnimatedSection className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[40px] border-2 border-indigo-500/20 shadow-2xl">
                <button 
                  onClick={() => setShowPoints(false)}
                  className="mb-8 flex items-center gap-2 text-indigo-600 dark:text-amber-400 font-bold hover:gap-4 transition-all"
                >
                  <ArrowLeft size={20} /> Back to Tech Stack
                </button>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <h3 className="text-3xl md:text-4xl font-black">{activeTech} Mastery</h3>
                  <div className="h-1 flex-grow hidden md:block mx-8 bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {SKILL_DATA[activeCategory].techs[activeTech].map((point, i) => (
                    <div key={i} className="flex gap-4 group">
                      <div className="mt-1.5 w-2 h-2 rounded-full bg-indigo-500 shrink-0 group-hover:scale-150 transition-transform" />
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <AnimatedSection className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-black mb-4">Selected Works</h2>
              <p className="text-gray-600 dark:text-gray-400">A massive collection of over 20 projects solving complex real-world challenges.</p>
            </AnimatedSection>
            <AnimatedSection delay={200}>
              <a href="#" className="flex items-center gap-2 font-black text-indigo-600 dark:text-amber-400 hover:gap-4 transition-all">
                Full Repository <ArrowLeft className="rotate-180" size={20} />
              </a>
            </AnimatedSection>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <AnimatedSection key={i} delay={i % 3 * 100}>
                <div className="group bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden border dark:border-gray-800 hover:border-indigo-500 transition-all hover:shadow-2xl">
                  <div className="h-48 overflow-hidden relative">
                    <img src={project.image} alt={project.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1 text-white text-xs font-bold"><Star size={14} className="text-amber-400 fill-amber-400" /> {project.stars}</div>
                        <div className="flex items-center gap-1 text-white text-xs font-bold"><GitBranch size={14} /> {project.forks}</div>
                      </div>
                      <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-indigo-600 transition-all">
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.tech.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[9px] font-black uppercase tracking-widest rounded-md">
                          {t}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-black mb-2">{project.name}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-indigo-500 to-amber-500 rounded-[40px] blur-2xl opacity-20" />
                <div className="relative bg-white dark:bg-gray-900 p-8 md:p-12 rounded-[40px] border dark:border-gray-800 shadow-2xl">
                  <h2 className="text-4xl font-black mb-8">The Developer Behind The Screen</h2>
                  <div className="space-y-6 text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                    <p>
                      Hello! I'm <strong className="text-indigo-600 dark:text-amber-400 font-black">Sarfaraz Ansari</strong>, a Full Stack Developer based in India. My journey in tech started with a curiosity for how data flows across the web.
                    </p>
                    <p>
                      Over the past few years, I've transformed that curiosity into a career, building everything from lean startup MVPs to robust enterprise-level microservices using 20+ technologies. My philosophy is simple: <em className="italic">build for the user, code for the future.</em>
                    </p>
                    <div className="pt-6 grid grid-cols-2 gap-4">
                      {[
                        { icon: Users, label: 'Collaborative Team Player' },
                        { icon: Zap, label: 'Performance Focused' },
                        { icon: Code, label: 'Clean Architecture' },
                        { icon: Star, label: 'Continuous Learner' }
                      ].map((trait, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                          <trait.icon size={20} className="text-indigo-500" />
                          <span className="text-xs font-bold leading-tight">{trait.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection delay={200} className="order-1 lg:order-2">
              <div className="relative aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-indigo-500 rounded-[60px] rotate-6" />
                <img 
                  src="sarfaraz1" 
                  alt="Sarfaraz Ansari" 
                  className="absolute inset-0 w-full h-full object-cover rounded-[60px] -rotate-3 hover:rotate-0 transition-transform duration-500 border-8 border-white dark:border-gray-900 shadow-2xl"
                />
              </div>
              <div className="mt-12 flex justify-center">
                <button className="flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-black rounded-2xl hover:scale-105 transition-all shadow-xl">
                  <Download size={20} /> Download CV
                </button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-indigo-600 dark:bg-amber-500">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white dark:bg-gray-950 rounded-[48px] p-8 md:p-16 shadow-3xl text-center md:text-left flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1">
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-gray-900 dark:text-white">Ready to start a project?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-lg">
                I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="mailto:mdsarfarazansari@zohomail.in" className="flex items-center justify-center gap-3 px-8 py-4 bg-indigo-600 dark:bg-amber-500 text-white font-black rounded-2xl hover:brightness-110 transition-all">
                  <Mail size={20} /> mdsarfarazansari@zohomail.in
                </a>
                <div className="flex justify-center gap-4">
                  {[
                    { icon: MessageSquare, link: 'https://wa.me/+971526331271' },
                    { icon: Instagram, link: 'https://www.instagram.com/voonteza?igsh=MTAxODhsMHF0Njk3ZA==' },
                    { icon: Linkedin, link: '#' },
                    { icon: Youtube, link: 'https://www.youtube.com/@voonteza' }
                  ].map((soc, i) => (
                    <a key={i} href={soc.link} className="p-4 bg-gray-100 dark:bg-gray-900 rounded-2xl hover:bg-indigo-100 dark:hover:bg-amber-900 transition-colors">
                      <soc.icon size={24} className="text-gray-700 dark:text-gray-300" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden lg:block w-px h-64 bg-gray-200 dark:bg-gray-800" />
            <div className="flex-1 flex flex-col items-center">
              <div className="w-24 h-24 bg-indigo-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mb-6">
                <Zap size={48} className="text-indigo-600 dark:text-amber-400" />
              </div>
              <h4 className="text-2xl font-black mb-2">Fast Response</h4>
              <p className="text-gray-500 dark:text-gray-400 font-medium">Average reply time: &lt; 24h</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-50 dark:bg-gray-950 border-t dark:border-gray-900">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-xl font-black text-indigo-600 dark:text-amber-400 mb-2 tracking-tighter">ANSARI.DEV</h3>
            <p className="text-sm text-gray-500 font-medium">Building with purpose, coding with precision.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest">
            <button onClick={() => scrollTo('hero')} className="hover:text-indigo-600 transition-colors">Home</button>
            <button onClick={() => scrollTo('skills')} className="hover:text-indigo-600 transition-colors">Skills</button>
            <button onClick={() => scrollTo('projects')} className="hover:text-indigo-600 transition-colors">Work</button>
          </div>
          <p className="text-xs text-gray-400 font-medium">
            © {new Date().getFullYear()} Sarfaraz Ansari. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

