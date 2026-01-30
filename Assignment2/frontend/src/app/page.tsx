'use client'
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Lock, CheckCircle, UserPlus, ShieldCheck, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Home = () => {
  const router=useRouter();
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const logos = ["CloudFlow", "DataViz", "Metricly", "SaaSify", "Zenith", "Nexus"];

  return (
    <div className="min-h-screen  bg-sky-200  overflow-hidden">
      <section className="relative pt-32 pb-20 flex flex-col items-center justify-center px-6 border-y border-white ">
        <div className="absolute top-20 w-72 h-72 bg-sky-400/20 blur-[120px] rounded-full -z-10" />

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="max-w-4xl text-center"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-4 py-1.5 rounded-full bg-sky-100 text-sky-700 text-sm font-medium border border-sky-200"
          >
            Trusted by 500+ Early Stage Founders
          </motion.span>
          
          <h1 className="mt-8 text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-[1.1]">
            Startup deals on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600">
              premium SaaS tools
            </span>
          </h1>

          <p className="mt-6 text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Stop paying full price. Access exclusive, verified-only benefits designed specifically for growing teams.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-2xl bg-slate-900 text-white font-semibold shadow-sm shadow-slate-200 cursor-pointer"
              onClick={()=>{
              router.push("/signin")
            }}
            >
              Explore Deals
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-semibold ring-1 ring-slate-200 hover:bg-sky-400 cursor-pointer"
              onClick={()=>{
              router.push("/signin")
            }}
            >
              Get Verified
            </motion.button>
          </div>
        </motion.div>
      </section>

      <section className="py-12 border-y border-white  ">
        <div className="max-w-7xl mx-auto overflow-hidden">
          <motion.div 
            className="flex gap-16 items-center whitespace-nowrap"
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            {[...logos, ...logos, ...logos,...logos,...logos].map((logo, i) => (
              <span key={i} className="text-2xl font-bold text-blue-500 hover:text-sky-500 hover:underline transition-colors">
                {logo}
              </span>
            ))}
          </motion.div>
        </div>
      </section>
      
      <section className="py-32 px-6 border-y border-white ">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How it works</h2>
            <div className="h-1.5 w-60 bg-sky-500 mx-auto mt-4 rounded-full" />
          </div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { title: "Sign up", desc: "Create your founder profile in seconds.", icon: <UserPlus className="w-6 h-6" /> },
              { title: "Verify startup", desc: "Connect your LinkedIn or Stripe to prove you're building.", icon: <ShieldCheck className="w-6 h-6" /> },
              { title: "Claim & track", desc: "Get instant access to credits and track your savings.", icon: <CheckCircle className="w-6 h-6" /> }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                variants={fadeInUp}
                className="group p-10 rounded-3xl bg-white/60 backdrop-blur-md border border-white hover:border-sky-400 hover:shadow-lg hover:shadow-sky-100 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-sky-500 text-white flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-32 px-6 border-y border-white  ">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Featured startup deals</h2>
              <p className="text-slate-500 mt-2 text-lg">Curated savings for your tech stack</p>
            </div>
            <button className="hidden md:block text-sky-600 font-medium hover:underline" onClick={()=>{router.push("/signin")}}>View all deals →</button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
           
            <motion.div 
              whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
              className="group relative p-8 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 overflow-hidden cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-sky-600" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Instant</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">Cloud Hosting</h3>
              <p className="mt-2 text-slate-600">$10,000 in credits for 12 months</p>
              <div className="mt-8 pt-6 border-t border-slate-50">
                <span className="text-sky-600 font-semibold group-hover:gap-3 flex items-center gap-2 transition-all">
                  Claim Benefit <CheckCircle className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ y: -10, rotateX: 2, rotateY: 2 }}
              className="group relative p-8 rounded-[2rem] bg-white shadow-xl shadow-slate-200/50 overflow-hidden cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-sky-600" />
                </div>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase">Instant</span>
              </div>
              <h3 className="mt-6 text-2xl font-bold text-slate-900">AWS Lamda</h3>
              <p className="mt-2 text-slate-600">$2,000 in credits for 6 months</p>
              <div className="mt-8 pt-6 border-t border-slate-50">
                <span className="text-sky-600 font-semibold group-hover:gap-3 flex items-center gap-2 transition-all">
                  Claim Benefit <CheckCircle className="w-4 h-4" />
                </span>
              </div>
            </motion.div>

          
            <motion.div 
              whileHover={{ y: -5 }}
              className="relative p-8 rounded-[2rem] bg-slate-100 border border-slate-200 overflow-hidden group"
            >
              <motion.div 
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-white transition-opacity"
              >
                <Lock className="w-8 h-8 mb-4 text-sky-400" />
                <p className="font-bold text-lg">Verify to Unlock</p>
                <p className="text-sm text-slate-300 px-6 text-center mt-2">Exclusive to verified seed-stage startups</p>
              </motion.div>
              
              <h3 className="text-2xl font-bold text-slate-400">Google Analytics Pro</h3>
              <p className="mt-2 text-slate-400">Advanced conversion insights</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 border-y border-white ">
        <motion.div 
          whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
          className="max-w-5xl mx-auto rounded-[3rem] bg-slate-900 p-12 md:p-20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/20 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full" />
          
          <h2 className="text-4xl md:text-5xl font-bold text-white relative z-10">
            Start saving today
          </h2>
          <p className="mt-6 text-slate-400 text-lg max-w-xl mx-auto relative z-10">
            Join 2,000+ founders accessing the world's best SaaS tools for a fraction of the price.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-10 px-10 py-5 rounded-2xl bg-sky-500 text-white font-bold text-lg hover:bg-sky-400 transition-colors shadow-lg shadow-sky-500/25 relative z-10"
            onClick={()=>{
              router.push("/signin")
            }}
          >
            Explore All Deals
          </motion.button>
        </motion.div>
      </section>

      <Footer/>

    </div>
  );
};

export default Home;