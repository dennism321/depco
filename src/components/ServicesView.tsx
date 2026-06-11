import React, { useState } from 'react';
import { 
  Droplets, Flame, Wind, ShieldCheck, CheckCircle2, 
  HelpCircle, Clock, ArrowRight, ShieldAlert,
  Wrench, Thermometer, Snowflake, Shield, Sparkles, ChevronDown, ChevronUp, Zap
} from 'lucide-react';
import { SERVICES } from '../utils/mockData';
import { Service } from '../types';

interface ServicesViewProps {
  setTab: (tab: string) => void;
  setPreSelectedService: (serviceId: string) => void;
  setPreSelectedUrgency: (urgency: 'low' | 'medium' | 'high' | 'emergency') => void;
  preSelectedCategory?: string;
  setPreSelectedCategory?: (category: string) => void;
}

export default function ServicesView({ 
  setTab, 
  setPreSelectedService, 
  setPreSelectedUrgency,
  preSelectedCategory = 'all',
  setPreSelectedCategory
}: ServicesViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(preSelectedCategory);
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});

  React.useEffect(() => {
    setSelectedCategory(preSelectedCategory);
  }, [preSelectedCategory]);

  const handleCategoryChange = (catId: string) => {
    setSelectedCategory(catId);
    if (setPreSelectedCategory) {
      setPreSelectedCategory(catId);
    }
  };

  const categories = [
    { id: 'all', label: 'All Services', icon: HelpCircle },
    { id: 'geothermal', label: 'Geothermal', icon: Snowflake },
    { id: 'heating', label: 'Heating', icon: Flame },
    { id: 'cooling', label: 'Cooling', icon: Wind },
    { id: 'plumbing', label: 'Plumbing', icon: Droplets },
    { id: 'iaq', label: 'Indoor Air Quality', icon: ShieldCheck },
    { id: 'electrical', label: 'Electrical', icon: Zap }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(s => s.category === selectedCategory);

  const handleBookService = (service: Service) => {
    const defaultUrgency = service.category === 'plumbing' || service.category === 'heating' 
      ? 'high' 
      : 'low';
      
    setPreSelectedService(service.id);
    setPreSelectedUrgency(defaultUrgency);
    setTab('dispatch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCard = (id: string) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getServiceIcon = (iconName?: string) => {
    switch (iconName) {
      case 'wrench': return Wrench;
      case 'droplet': return Droplets;
      case 'thermometer': return Thermometer;
      case 'snowflake': return Snowflake;
      case 'shield': return Shield;
      case 'sparkles': return Sparkles;
      case 'wind': return Wind;
      case 'flame': return Flame;
      case 'zap': return Zap;
      default: return HelpCircle;
    }
  };

  const getCategoryTheme = (category: string) => {
    switch (category) {
      case 'geothermal':
        return { text: 'text-emerald-600 bg-emerald-50 border-emerald-200', dot: 'bg-emerald-600' };
      case 'plumbing':
        return { text: 'text-blue-600 bg-blue-50 border-blue-200', dot: 'bg-blue-600' };
      case 'heating':
        return { text: 'text-depco-red bg-amber-50 border-amber-100', dot: 'bg-depco-red' };
      case 'cooling':
        return { text: 'text-sky-600 bg-sky-50 border-sky-200', dot: 'bg-sky-600' };
      case 'iaq':
        return { text: 'text-teal-600 bg-teal-50 border-teal-200', dot: 'bg-teal-600' };
      case 'electrical':
        return { text: 'text-amber-600 bg-amber-50 border-amber-200', dot: 'bg-amber-500' };
      default:
        return { text: 'text-slate-600 bg-slate-50 border-slate-200', dot: 'bg-slate-400' };
    }
  };

  return (
    <div id="services-view" className="space-y-12 animate-fade-in pb-16">
      
      {/* Intro block */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          DEPCO Professional Service Solutions
        </h1>
        <p className="text-slate-500 text-lg">
          Comprehensive diagnostic investigations. Master-certified mechanics. Choose a sector below to explore our core work specs.
        </p>
      </div>

      {/* Category Tab Selector rails */}
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 border-b border-slate-200 pb-6">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              id={`cat-tab-${cat.id}`}
              className={`px-4 py-3.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                isActive
                  ? 'bg-depco-blue border-depco-blue text-white shadow-md shadow-blue-500/10'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <Icon className="h-4.5 w-4.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Service Listings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
        {filteredServices.map((service) => {
          const theme = getCategoryTheme(service.category);
          const IconComponent = getServiceIcon(service.iconName);
          const isExpanded = !!expandedCards[service.id];

          return (
            <div 
              key={service.id} 
              className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:border-depco-blue/30 transition-all duration-300 flex flex-col justify-between"
              id={`service-card-${service.id}`}
            >
              {/* Card visual header (image with floating badge & absolute icon overlaid) */}
              {service.imageUrl && (
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden bg-slate-100 shrink-0 border-b border-slate-100">
                  <img 
                    src={service.imageUrl} 
                    alt={service.name} 
                    className="w-full h-full object-cover select-none"
                    referrerPolicy="no-referrer"
                  />
                  {/* Absolute overlay icon top-left, matching the user's high-fidelity designs */}
                  <div className="absolute top-4 left-4 bg-white text-slate-800 p-2.5 rounded-xl shadow-md z-10 flex items-center justify-center border border-slate-100">
                    <IconComponent className="h-5 w-5 text-depco-blue" />
                  </div>
                </div>
              )}

              {/* Card content body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-5">
                
                <div className="space-y-4">
                  {/* Upper tags & badges */}
                  <div className="flex items-center justify-between gap-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${theme.text}`}>
                      {service.category === 'iaq' 
                        ? 'Indoor Air Quality' 
                        : service.category === 'electrical'
                        ? 'Electrical Services'
                        : service.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3 shrink-0" /> {service.estimateTime} avg
                    </span>
                  </div>

                  {/* Title and paragraph */}
                  <div className="space-y-2.5">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight leading-snug">
                      {service.name}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Collapsible Action for Technical Scope Elements */}
                  <div className="pt-2">
                    <button
                      onClick={() => toggleCard(service.id)}
                      id={`toggle-scope-${service.id}`}
                      className="text-xs font-extrabold text-slate-600 hover:text-depco-blue flex items-center gap-1 focus:outline-hidden select-none"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronUp className="h-4 w-4 text-depco-blue" />
                          <span>Hide Technical Specifications</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4 text-slate-400" />
                          <span>Show Technical Specifications ({service.features.length} points)</span>
                        </>
                      )}
                    </button>

                    {/* Expandable checklist tray */}
                    {isExpanded && (
                      <div className="mt-3 bg-slate-50 rounded-xl p-4 border border-slate-100 space-y-2.5 animate-slide-down">
                        <h4 className="font-extrabold text-[10px] text-slate-400 uppercase tracking-widest">Scope details & safety safeguards:</h4>
                        <ul className="space-y-2 text-xs">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex gap-2 items-start text-slate-600 leading-snug">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        <p className="text-[10px] italic text-slate-400 pt-1.5 border-t border-slate-200/60 font-medium">
                          ✓ Guaranteed by our: {service.guaranteeText}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Lower Action bar with clean blue text links, exactly mirroring the request service design */}
                <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between">
                  <button
                    onClick={() => handleBookService(service)}
                    id={`book-service-${service.id}`}
                    className="group inline-flex items-center gap-1.5 font-extrabold text-sm text-depco-blue hover:text-depco-red-dark transition-all cursor-pointer"
                  >
                    Request service 
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 duration-150" />
                  </button>
                  <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50/70 border border-emerald-100/60 px-2 py-0.5 rounded-md">
                    {service.guaranteeText}
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Trust Quote / Notice */}
      <div className="bg-amber-50/30 rounded-2xl p-6 border border-amber-200/50 flex flex-col sm:flex-row gap-4 items-start md:items-center">
        <ShieldAlert className="h-6 w-6 text-depco-red shrink-0" />
        <div className="text-xs text-slate-600 leading-relaxed">
          <strong className="text-slate-900 font-bold">Important Dispatch Note:</strong> If your issue threatens massive water damage (e.g., active high-pressure line burst) or complete winter system freeze (e.g., furnace failure during &lt;32°F weather), please bypass booking selections and proceed over to standard telephone dispatch immediately at <a href="tel:8607471011" className="text-depco-red font-extrabold hover:underline block sm:inline mt-1 sm:mt-0">(860) 747-1011</a> to launch a priority truck immediately.
        </div>
      </div>

    </div>
  );
}
