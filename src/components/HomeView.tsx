import React, { useState, useEffect } from 'react';
import { 
  Flame, Wind, Droplets, ShieldCheck, Heart, Users, MapPin, 
  Clock, CheckCircle, ChevronRight, AlertCircle, Phone, Sparkles,
  Wrench, Thermometer, Snowflake, Zap
} from 'lucide-react';
import { SERVICES, TECHNICIANS } from '../utils/mockData';
import plumbingTileImage from '../assets/images/plumbing_under_sink_1779831440103.png';
import hvacTileImage from '../assets/images/hvac_services_heat_cooling_tile_1779831893923.png';
import geothermalTileImage from '../assets/images/geothermal_comfort_tile_1779832137616.png';
import hydronicTileImage from '../assets/images/hydronic_heating_system_tile_1779844828966.png';
import electricalTileImage from '../assets/images/electrical_service_tile_1779845230007.png';

interface HomeViewProps {
  setTab: (tab: string) => void;
  setPreSelectedUrgency: (urgency: 'low' | 'medium' | 'high' | 'emergency') => void;
  setPreSelectedService: (serviceId: string) => void;
}

export default function HomeView({ setTab, setPreSelectedUrgency, setPreSelectedService }: HomeViewProps) {
  const [triageIssue, setTriageIssue] = useState<string>('');
  const [calculatedEta, setCalculatedEta] = useState<number | null>(null);
  
  // Real-time dynamic active dispatcher count simulation
  const [activeDispatchJobs, setActiveDispatchJobs] = useState([
    { id: 1, tech: 'Marcus Vance', loc: 'Bristol', service: 'Burst Pipe Leak', status: 'In Transit', eta: 11 },
    { id: 2, tech: 'Bradley Miller', loc: 'Plainville', service: 'Furnace High-Limit Switch', status: 'Fixing', eta: 0 },
    { id: 3, tech: 'Santi Jenkins', loc: 'New Britain', service: 'Smart Humidifier Sync', status: 'In Transit', eta: 24 }
  ]);

  useEffect(() => {
    // Tick down the active ETAs to simulate dynamic visual feed updates
    const interval = setInterval(() => {
      setActiveDispatchJobs(prev => 
        prev.map(job => {
          if (job.eta > 1) {
            return { ...job, eta: job.eta - 1 };
          } else if (job.eta === 1) {
            return { ...job, status: 'Fixing', eta: 0 };
          }
          return job;
        })
      );
    }, 25000); // Decelerated tick rate for normal UI tracking
    return () => clearInterval(interval);
  }, []);

  const handleTriageSelect = (value: string) => {
    setTriageIssue(value);
    if (value === 'burst-pipe') {
      setCalculatedEta(Math.floor(Math.random() * 12) + 18); // 18-30 min
    } else if (value === 'sewer-backup') {
      setCalculatedEta(Math.floor(Math.random() * 15) + 30); // 30-45 min
    } else if (value === 'no-heat') {
      setCalculatedEta(Math.floor(Math.random() * 10) + 20); // 20-30 min
    } else if (value === 'ac-failure') {
      setCalculatedEta(Math.floor(Math.random() * 20) + 40); // 40-60 min
    } else {
      setCalculatedEta(null);
    }
  };

  const handleTriageProceed = () => {
    if (!triageIssue) return;
    
    let urgency: 'low' | 'medium' | 'high' | 'emergency' = 'low';
    let serviceId = '';

    switch (triageIssue) {
      case 'burst-pipe':
        urgency = 'emergency';
        serviceId = 'plumb-leak';
        break;
      case 'sewer-backup':
        urgency = 'high';
        serviceId = 'plumb-drain';
        break;
      case 'no-heat':
        urgency = 'emergency';
        serviceId = 'heat-furnace-rep';
        break;
      case 'ac-failure':
        urgency = 'high';
        serviceId = 'cool-rep';
        break;
      default:
        urgency = 'low';
        serviceId = '';
    }

    setPreSelectedUrgency(urgency);
    setPreSelectedService(serviceId);
    setTab('dispatch');
    
    // Smooth scroll page back to top to view layout state neatly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="home-view" className="space-y-16">
      
      {/* Hero Showcase with Urgent Triage Form */}
      <section className="relative bg-slate-900 text-slate-100 overflow-hidden py-12 lg:py-20 border-b-2 border-slate-800">
        {/* Absolute Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-amber-600/10 blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-semibold">
              <Sparkles className="h-3 w-3 text-depco-blue animate-pulse" />
              <span>Plainville’s Trusted Family Plumbers Since 1999</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              Rapid 24/7 <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-amber-400 font-black">
                Emergency Care
              </span> <br className="hidden sm:inline" />
              For Your Whole House.
            </h1>
            
            <p className="text-base sm:text-lg text-slate-300 max-w-xl font-normal leading-relaxed">
              Facing a plumbing disaster, freezing heater, or boiling AC failure? We dispatch NATE-certified master technicians equipped with written quotes and on-spot solutions. Immediate service with premium dispatch responses on full repairs.
            </p>

            {/* Quick trust flags */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-depco-blue shrink-0" />
                <span>Licensed Master Plumbers</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-depco-red shrink-0" />
                <span>NATE Heating & AC Certs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-blue-400 shrink-0" />
                <span>Upfront Written Estimates</span>
              </div>
            </div>

            {/* Calling trigger block */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="tel:8607471011" 
                id="hero-phone-call-anchor"
                className="px-6 py-4 bg-depco-blue hover:bg-blue-700 text-white font-extrabold rounded-xl text-center shadow-lg hover:shadow-blue-500/20 transition-all flex items-center justify-center gap-3 group"
              >
                <Phone className="h-5 w-5 animate-pulse text-white group-hover:rotate-12 transition-transform" />
                <span className="tracking-wide">CALL DISPATCH: (860) 747-1011</span>
              </a>
              <button 
                onClick={() => setTab('services')}
                id="hero-view-services-btn"
                className="px-6 py-4 border border-slate-700 hover:border-slate-500 hover:bg-slate-800 text-slate-200 font-semibold rounded-xl text-center transition-all flex items-center justify-center gap-2"
              >
                Explore Services <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Right Column: "Is This An Emergency" Triage Grid Panel */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800/95 p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-2xl space-y-6" id="triage-card">
              <div className="border-b border-slate-700 pb-4">
                <div className="inline-block bg-depco-red px-2.5 py-0.5 rounded text-[10px] font-extrabold text-white tracking-wider mb-2 uppercase animate-pulse-subtle">
                  Live Dispatch Portal
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-white">Is this a home emergency?</h2>
                <p className="text-xs text-slate-400 mt-1">Select your issue for immediate local technician tracking:</p>
              </div>

              {/* Options selection stack */}
              <div className="space-y-3">
                {[
                  { id: 'burst-pipe', icon: Droplets, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'Active Water Leak / Burst Pipe', desc: 'Flowing water, flood threat, meter line breakdown' },
                  { id: 'sewer-backup', icon: ShieldCheck, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: 'Main Sewer line Backing Up', desc: 'Toilets overflowing, main line root clog' },
                  { id: 'no-heat', icon: Flame, color: 'text-orange-400 bg-orange-500/10 border-orange-500/20', label: 'Furnace Failed / No Heat', desc: 'No furnace heat, pressure safety failures' },
                  { id: 'ac-failure', icon: Wind, color: 'text-depco-blue bg-sky-500/10 border-sky-500/20', label: 'AC Failed / Warm Air Flow', desc: 'Blowing hot during peak afternoon summer heat' },
                  { id: 'regular', icon: Clock, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20', label: 'Scheduled Service & Tunings', desc: 'Non-emergency inspections, air filters' }
                ].map((option) => {
                  const isSelected = triageIssue === option.id;
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.id}
                      onClick={() => handleTriageSelect(option.id)}
                      id={`triage-opt-${option.id}`}
                      className={`w-full p-3 text-left rounded-xl border transition-all text-xs flex gap-3 ${
                        isSelected 
                          ? 'border-depco-blue bg-blue-950/40 text-white ring-2 ring-depco-blue/40' 
                          : 'border-slate-700 hover:border-slate-500 bg-slate-900/40 text-slate-300'
                      }`}
                    >
                      <div className={`p-2 rounded-lg shrink-0 ${option.color}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm flex items-center justify-between">
                          <span>{option.label}</span>
                          {isSelected && <span className="h-2 w-2 rounded-full bg-depco-blue" />}
                        </div>
                        <p className="text-slate-400 text-[11px] mt-0.5">{option.desc}</p>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Computed ETA results display panel */}
              {triageIssue && (
                <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-700 text-xs flex items-center gap-3 animate-fade-in">
                  <AlertCircle className="h-5 w-5 text-depco-blue shrink-0" />
                  <div>
                    {calculatedEta ? (
                      <p className="text-slate-300">
                        🚨 <span className="text-white font-bold">Technicians Nearby:</span> We have service rigs operating in your area. Estimated Immediate Dispatch ETA is <span className="text-depco-blue font-extrabold text-sm">{calculatedEta} mins</span>.
                      </p>
                    ) : (
                      <p className="text-slate-300">
                        📅 <span className="text-white font-bold">High Availability:</span> Open slots available today. Proceed to book your regular plumbing or HVAC inspection.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Procedural action button */}
              <button
                disabled={!triageIssue}
                onClick={handleTriageProceed}
                id="triage-continue-cta"
                className={`w-full py-4.5 text-center font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow ${
                  triageIssue
                    ? 'bg-depco-blue hover:bg-blue-700 text-white cursor-pointer active:translate-y-0.5'
                    : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                }`}
              >
                {triageIssue === 'regular' ? 'Schedule Visit' : 'Secure Emergency Dispatch'}
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Trust Guarantee Flags Row */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white p-8 rounded-2xl shadow-md border border-slate-100">
          <div className="flex gap-4 items-start">
            <div className="p-3 bg-amber-50 text-depco-red rounded-xl shrink-0">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">24/7 Rapid Dispatch</h3>
              <p className="text-slate-500 text-sm mt-1">Water leaks and freezing houses don’t wait. We stand ready 24 hours a day, 365 days a year. Rapid mobilization once dispatch begins.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start border-t md:border-t-0 md:border-x border-slate-100 pt-6 md:pt-0 md:px-6">
            <div className="p-3 bg-blue-50 text-depco-blue rounded-xl shrink-0">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Upfront Estimates</h3>
              <p className="text-slate-500 text-sm mt-1">We detail the assessment clearly. You always receive a concrete, written explanation before we begin any work. Absolute integrity.</p>
            </div>
          </div>
          <div className="flex gap-4 items-start border-t md:border-t-0 pt-6 md:pt-0">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Plainville Family Guarantee</h3>
              <p className="text-slate-500 text-sm mt-1">All of our plumbers and technicians undergo screening and extensive safety training. Every repair carries our standard 1-Year satisfaction warranty.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Live active dispatch tracking ticker panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100 border border-slate-200 rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-depco-red animate-ping" />
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  Live Tri-County Dispatch Feed
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-1">Real-time GPS tracker status of active plumbing & HVAC units currently operating:</p>
            </div>
            <div className="text-xs bg-white py-1 px-3 rounded-md shadow-sm border text-slate-600 font-semibold flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-depco-blue" />
              <span>Clinton base: 14 Truck Fleet Available</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeDispatchJobs.map((p) => (
              <div key={p.id} className="bg-white p-4.5 rounded-xl border border-slate-200 flex flex-col justify-between hover:shadow-sm transition-all shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{p.tech}</h4>
                    <p className="text-slate-500 text-xs mt-0.5">{p.service}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    p.status === 'In Transit' 
                      ? 'bg-blue-50 text-blue-600 border border-blue-200' 
                      : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                  }`}>
                    {p.status}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-medium flex items-center gap-1">
                    <MapPin className="h-3 w-3 text-slate-400" /> {p.loc}, MI
                  </span>
                  {p.status === 'In Transit' && p.eta > 0 ? (
                    <span className="text-depco-blue font-bold">Tech ETA: {p.eta} mins</span>
                  ) : (
                    <span className="text-emerald-600 font-bold">Job in Progress</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services sectors showcase page */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="max-w-4xl mx-auto space-y-2 mt-4">
          <p className="text-orange-600/90 font-bold uppercase tracking-widest text-[11px] sm:text-xs text-left" style={{ color: '#EA580C' }}>SERVICES</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight text-left">Comfort Solutions for Your Whole Home</h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed max-w-3xl text-left font-normal pt-1">
            Residential and commercial plumbing, heating, cooling and electrical — installed, serviced and repaired by Depco's licensed Connecticut technicians.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              id: 'plumbing',
              title: 'Plumbing Services',
              icon: Wrench,
              serviceId: 'plumb-leak',
              imageUrl: plumbingTileImage,
              snippet: 'Repairs, installations and remodels for faucets, fixtures, water lines and full plumbing systems — residential and commercial.',
              badge: 'Emergency Care'
            },
            {
              id: 'tankless',
              title: 'Water Heaters & Tankless',
              icon: Droplets,
              serviceId: 'plumb-heater',
              imageUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=800',
              snippet: 'Tank and tankless water heater installation, replacement and repair. Professional system optimization.',
              badge: 'Energy Saver'
            },
            {
              id: 'heating',
              title: 'Heating & HVAC',
              icon: Thermometer,
              serviceId: 'heat-furnace-rep',
              imageUrl: hvacTileImage,
              snippet: 'Furnaces, boilers, heat pumps and central air. Installation, maintenance and emergency repair from licensed CT technicians.',
              badge: '24/7 Service'
            },
            {
              id: 'geothermal',
              title: 'Geothermal Heating & Cooling',
              icon: Snowflake,
              serviceId: 'heat-boilers',
              imageUrl: geothermalTileImage,
              snippet: 'IGSHPA-certified geothermal installation. Support eco-friendly solutions with green, renewable heating and cooling.',
              badge: 'Renewable Tech'
            },
            {
              id: 'hydronic',
              title: 'Hydronic Heating Systems',
              icon: Flame,
              serviceId: 'heat-hydronic',
              imageUrl: hydronicTileImage,
              snippet: 'Radiant floor and high-efficiency hydronic systems engineered for comfort, quiet operation and lower energy draw.',
              badge: 'Ultimate Comfort'
            },
            {
              id: 'electrical',
              title: 'Electrical Services',
              icon: Zap,
              serviceId: 'elec-general',
              imageUrl: electricalTileImage,
              snippet: 'Licensed electrical contracting — panels, wiring, generators and service upgrades for your home or business.',
              badge: 'Licensed & Certified'
            }
          ].map((cat) => {
            const Icon = cat.icon;
            return (
              <div 
                key={cat.id} 
                className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-depco-blue/30 transition-all duration-300 flex flex-col justify-between group"
                id={`cat-card-${cat.id}`}
              >
                {/* Dynamic visual header image mimicking screenshot */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100 shrink-0 border-b border-slate-100">
                  <img 
                    src={cat.imageUrl} 
                    alt={cat.title} 
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Absolute overlay icon top-left */}
                  <div className="absolute top-4 left-4 bg-white text-slate-800 p-2.5 rounded-xl shadow-md z-10 flex items-center justify-center border border-slate-100">
                     <Icon className="h-5 w-5 text-depco-blue" />
                  </div>
                  {/* Badge pill top-right */}
                  <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded">
                    {cat.badge}
                  </div>
                </div>

                {/* Content body padding */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-extrabold text-slate-900 tracking-tight leading-snug">
                      {cat.title}
                    </h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                      {cat.snippet}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-100/50 flex justify-between items-center">
                    <button
                      onClick={() => {
                        setPreSelectedUrgency('low');
                        setPreSelectedService(cat.serviceId);
                        setTab('services');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      id={`cat-btn-${cat.id}`}
                      className="group inline-flex items-center gap-1 font-extrabold text-xs text-depco-blue hover:text-depco-red-dark transition-all cursor-pointer"
                    >
                      Request service <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-[10px] text-slate-400 font-semibold">{cat.badge}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Promising Clinton Area Guarantee Badge Section */}
      <section className="bg-slate-900 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden" id="clinton-promotions-banner">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold uppercase tracking-wider mb-2">
            Seasonal Spring Promo
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Comprehensive Heating & A/C Efficiency Sweep
          </h2>
          
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Avoid summer breakdown. Our licensed technician will complete a 21-point HVAC safety check, verify refrigerant pressures, test flame currents, and adjust air handlers for perfect cooling efficiency. Book online now.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => {
                setPreSelectedUrgency('low');
                setPreSelectedService('cool-rep');
                setTab('dispatch');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              id="promo-accept-btn"
              className="px-6 py-3.5 bg-depco-red hover:bg-depco-red-dark text-white font-extrabold rounded-lg text-sm shadow transition-all cursor-pointer"
            >
              Secure Seasonal Tune-Up
            </button>
            <a
              href="tel:8607471011"
              className="px-6 py-3.5 border border-slate-700 hover:border-slate-500 bg-slate-800 text-white font-semibold rounded-lg text-sm transition-all text-center flex items-center justify-center gap-2"
            >
              <Phone className="h-4.5 w-4.5 fill-current" /> Call (860) 747-1011
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
