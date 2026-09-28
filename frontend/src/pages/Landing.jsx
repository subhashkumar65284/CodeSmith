import React, { useRef } from 'react';
import { useNavigate } from 'react-router';
import { Code2, Zap, Shield, Terminal, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { useSelector } from 'react-redux';

gsap.registerPlugin(useGSAP);

export default function Landing() {
  const navigate = useNavigate();
  const containerRef = useRef();
  const { isAuthenticated } = useSelector(state => state.auth);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from('.hero-badge', { y: -20, opacity: 0, duration: 0.5, ease: 'power3.out' })
      .from('.hero-title', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .from('.hero-subtitle', { y: 20, opacity: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .from('.hero-btn', { scale: 0.9, opacity: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.4')
      .from('.feature-card', { y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }, '-=0.2');
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="min-h-[calc(100vh-4rem)] w-full bg-[#030014] text-white overflow-hidden flex flex-col relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-indigo-600/20 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto w-full px-6 py-20 relative z-10 flex-1 flex flex-col items-center justify-center text-center">
        
        {/* Hero Section */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-medium text-sm mb-8">
          <Zap className="w-4 h-4 text-indigo-400" />
          <span>The Ultimate Coding Playground</span>
        </div>
        
        <h1 className="hero-title text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
          Master Your Craft with <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-400 via-purple-400 to-indigo-400">
            CodeSmith
          </span>
        </h1>
        
        <p className="hero-subtitle text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Level up your programming skills by solving curated challenges in our fully integrated, blazing-fast online editor.
        </p>
        
        <div className="hero-btn">
          <button 
            onClick={() => navigate('/')} 
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-indigo-950 rounded-full font-bold text-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] cursor-pointer"
          >
            <span className="relative z-10">{isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-linear-to-r from-indigo-100 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </button>
        </div>
        
        {/* Features Section */}
        <div className="w-full mt-32 pb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-white/90">Why Choose CodeSmith?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            
            <div className="feature-card bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-6">
                <Terminal className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Advanced IDE</h3>
              <p className="text-white/60 leading-relaxed">
                Write code in a fully featured, Monaco-powered editor right in your browser. Syntax highlighting, auto-completion, and more.
              </p>
            </div>

            <div className="feature-card bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Curated Problems</h3>
              <p className="text-white/60 leading-relaxed">
                Tackle a wide range of algorithmic challenges designed to sharpen your problem-solving skills and prepare you for interviews.
              </p>
            </div>

            <div className="feature-card bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6">
                <Shield className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Seamless Evaluation</h3>
              <p className="text-white/60 leading-relaxed">
                Execute your code securely and instantly see your results. Track your success rate and watch your stats grow over time.
              </p>
            </div>

          </div>
        </div>
        
      </div>
    </div>
  );
}
