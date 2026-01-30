import { Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-y border-white bg-sky-200 ">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl text-slate-900">
              <div className="w-8 h-8 bg-sky-500 text-white rounded-lg flex items-center justify-center">
                <h1 >SD</h1>
                </div>
              SaaSDeals
            </div>
            <p className="mt-4 text-sm text-slate-500 leading-relaxed">
              Helping early-stage teams scale with premium tools at startup prices.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Product</h4>
            <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Browse Deals</a>
            <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">For Partners</a>
            <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Success Stories</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Support</h4>
            <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Help Center</a>
            <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Verification FAQ</a>
            <a href="#" className="text-sm text-slate-600 hover:text-sky-600 transition-colors">Contact Us</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wider">Stay Connected</h4>
            <div className="flex gap-4">
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-sky-500 hover:text-white transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-evenly items-center">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} SaaSDeals Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-400 ">
            <a href="#" className="hover:text-slate-600">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;