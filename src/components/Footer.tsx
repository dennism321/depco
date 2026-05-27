import React from 'react';
import { Phone, MapPin, Shield, CheckCircle2, Award } from 'lucide-react';
import DepcoLogo from './DepcoLogo';

interface FooterProps {
  setTab: (tab: string) => void;
}

export default function Footer({ setTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-depco-blue" id="depco-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand Column */}
        <div className="space-y-6">
          <div className="cursor-pointer inline-block" onClick={() => setTab('home')}>
            <DepcoLogo className="h-[92px] w-auto" lightMode={true} />
          </div>
          <p className="text-sm text-slate-400 leading-relaxed font-normal">
            Proudly serving Central Connecticut with premium comfort solutions since 1999. Specializing in rapid-response 24/7 emergency plumbing, heating diagnostics, energy-saver A/C installs, and medical-grade indoor air cleansing.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center gap-3 text-sm">
              <MapPin className="h-4 w-4 text-depco-blue shrink-0" />
              <span>100 Whiting St, Plainville, CT 06062</span>
            </div>
            <a href="tel:8607471011" className="flex items-center gap-3 text-sm text-white hover:text-depco-blue transition-colors">
              <Phone className="h-4 w-4 text-depco-blue shrink-0" />
              <span className="font-semibold">(860) 747-1011</span>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-depco-blue" />
            Comfort Solutions
          </h3>
          <ul className="space-y-3 text-sm">
            <li>
              <button onClick={() => setTab('services')} className="hover:text-white hover:underline transition-colors text-left">
                Plumbing Leak & Pipe Repairs
              </button>
            </li>
            <li>
              <button onClick={() => setTab('services')} className="hover:text-white hover:underline transition-colors text-left">
                Main Sewer Lines & Hydrojetting
              </button>
            </li>
            <li>
              <button onClick={() => setTab('services')} className="hover:text-white hover:underline transition-colors text-left">
                Heaters & Tankless Replacements
              </button>
            </li>
            <li>
              <button onClick={() => setTab('services')} className="hover:text-white hover:underline transition-colors text-left">
                Furnace & Boiler Replacements
              </button>
            </li>
            <li>
              <button onClick={() => setTab('services')} className="hover:text-white hover:underline transition-colors text-left">
                Ductless Mini-Splits & AC Servicing
              </button>
            </li>
            <li>
              <button onClick={() => setTab('services')} className="hover:text-white hover:underline transition-colors text-left">
                Whole-Home UV Cleansers & IAQ
              </button>
            </li>
          </ul>
        </div>

        {/* Coverage Zip Areas */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-6 flex items-center gap-2">
            <Award className="h-4 w-4 text-depco-blue" />
            Service Counties
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-depco-blue">Hartford County (Home-Base)</h4>
              <p className="text-slate-400 mt-1 text-xs">Plainville, Bristol, New Britain, Southington, Farmington, West Hartford, Hartford</p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-depco-red">New Haven County</h4>
              <p className="text-slate-400 mt-1 text-xs">Meriden, Wolcott, Cheshire, Waterbury</p>
            </div>
            <div>
              <h4 className="font-semibold text-white text-xs uppercase tracking-wider text-slate-400">Litchfield County</h4>
              <p className="text-slate-400 mt-1 text-xs">Plymouth, Thomaston, Watertown</p>
            </div>
          </div>
        </div>

        {/* Credentials & Trust Check */}
        <div className="space-y-6">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Shield className="h-4 w-4 text-depco-blue" />
            Owner Guarantees
          </h3>
          <div className="bg-slate-800/80 p-4 rounded-xl border border-slate-700 text-xs leading-relaxed space-y-3">
            <p>
              🛡️ <span className="text-white font-medium">Licensed Master Plumber Licence #:</span> CT-PLM.0205221
            </p>
            <p>
              🔥 <span className="text-white font-medium">EPA Section 608 Certification:</span> Universal Technician #904221
            </p>
            <p>
              ❄️ <span className="text-white font-medium">NATE HVAC Core Specialist ID:</span> NATE-3329104
            </p>
            <p className="text-slate-400 italic">
              "We guarantee to solve your local emergency with precision, expertise, and absolute integrity. That is our Plainville promise."
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-slate-800 p-2.5 rounded text-center shrink-0 border border-slate-700">
              <span className="block font-bold text-white text-base">A+</span>
              <span className="block text-[8px] tracking-wide text-slate-400 uppercase font-medium">BBB Rating</span>
            </div>
            <div className="bg-slate-800 p-2.5 rounded text-center shrink-0 border border-slate-700">
              <span className="block font-bold text-white text-base">4.9★</span>
              <span className="block text-[8px] tracking-wide text-slate-400 uppercase font-medium">Google Trust</span>
            </div>
            <div className="bg-slate-800 p-2.5 rounded text-center shrink-0 border border-slate-700">
              <span className="block font-bold text-white text-base">100%</span>
              <span className="block text-[8px] tracking-wide text-slate-400 uppercase font-medium">Guaranteed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <span>© {currentYear} Comfort DEPCO Solutions, LLC. All rights reserved. Plainville, Connecticut.</span>
        <div className="flex gap-4">
          <button onClick={() => setTab('home')} className="hover:text-slate-300">Privacy Policy</button>
          <span>•</span>
          <button onClick={() => setTab('home')} className="hover:text-slate-300">Terms of Service</button>
          <span>•</span>
          <button onClick={() => setTab('services')} className="hover:text-slate-300">Pricing Guarantee</button>
        </div>
      </div>
    </footer>
  );
}
