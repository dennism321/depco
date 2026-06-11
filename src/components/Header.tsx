import React, { useState } from 'react';
import { Phone, Clock, Shield, Menu, X, AlertTriangle, Snowflake, Flame, Wind, Droplets, Zap } from 'lucide-react';
import DepcoLogo from './DepcoLogo';

interface HeaderProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onUrgentDispatchClick: () => void;
  preSelectedCategory?: string;
  setPreSelectedCategory?: (category: string) => void;
}

export default function Header({ 
  currentTab, 
  setTab, 
  onUrgentDispatchClick,
  preSelectedCategory = 'all',
  setPreSelectedCategory
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const mainNavItems = [
    { id: 'home', label: 'Home' },
    { id: 'map', label: 'Service Areas' },
    { id: 'reviews', label: 'Verified Reviews' },
  ];

  const serviceCategories = [
    { id: 'geothermal', label: 'Geothermal', category: 'geothermal', icon: Snowflake, colorClass: 'text-emerald-500' },
    { id: 'heating', label: 'Heating', category: 'heating', icon: Flame, colorClass: 'text-orange-500' },
    { id: 'cooling', label: 'Cooling', category: 'cooling', icon: Wind, colorClass: 'text-blue-400' },
    { id: 'plumbing', label: 'Plumbing', category: 'plumbing', icon: Droplets, colorClass: 'text-blue-500' },
    { id: 'electrical', label: 'Electrical', category: 'electrical', icon: Zap, colorClass: 'text-yellow-500' },
  ];

  const handleMainNavClick = (tabId: string) => {
    if (tabId === 'home' && setPreSelectedCategory) {
      setPreSelectedCategory('all');
    }
    setTab(tabId);
    setMobileMenuOpen(false);
  };

  const handleServiceClick = (category: string) => {
    if (setPreSelectedCategory) {
      setPreSelectedCategory(category);
    }
    setTab('services');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-slate-100">
      {/* 24/7 Urgent Dispatch Banner */}
      <div className="w-full bg-depco-red text-white py-2 px-4 flex flex-col sm:flex-row justify-between items-center text-xs md:text-sm font-medium gap-1 sm:gap-4 select-none">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-2 w-2 rounded-full bg-white animate-ping" />
          <AlertTriangle className="h-4 w-4 shrink-0 text-white" />
          <span className="font-bold tracking-wide">24/7 EMERGENCY PLUMBING & HVAC DISPATCH</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:flex items-center gap-1 opacity-90">
            <Shield className="h-3.5 w-3.5" /> Licensed Master Plumbers & NATE Engineers
          </span>
          <a 
            href="tel:8607471011" 
            className="flex items-center gap-1 font-bold hover:underline transition-all bg-white/10 px-2 py-0.5 rounded"
          >
            <Phone className="h-3.5 w-3.5 fill-current" /> Call: (860) 747-1011
          </a>
        </div>
      </div>

      {/* Main Logo & Utilities Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 md:h-22">
          {/* Logo Brand Segment */}
          <div className="flex items-center cursor-pointer" onClick={() => handleMainNavClick('home')}>
            <DepcoLogo className="h-[70px] md:h-[92px] w-auto transition-transform hover:scale-102" />
          </div>

          {/* Large Screen Main Links Nav */}
          <nav className="hidden lg:flex space-x-1.5 xl:space-x-3">
            {mainNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMainNavClick(item.id)}
                  id={`nav-${item.id}`}
                  className={`px-3 py-2 text-sm font-bold rounded-lg transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-depco-blue bg-blue-50 border-b-2 border-depco-blue font-extrabold'
                      : 'text-slate-600 hover:text-depco-blue hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Urgent Dispatch Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onUrgentDispatchClick}
              id="header-urgent-dispatch-btn"
              className="px-4 py-2 bg-depco-red hover:bg-depco-red-dark text-white text-sm font-bold rounded-lg shadow-sm hover:shadow transition-all duration-150 animate-pulse-subtle flex items-center gap-1.5 cursor-pointer"
            >
              <Clock className="h-4 w-4" /> Urgent Dispatch
            </button>
            <a
              href="tel:8607471011"
              id="header-phone-call-btn"
              className="px-4 py-2 border-2 border-slate-200 hover:border-depco-blue text-slate-800 hover:text-depco-blue text-sm font-bold rounded-lg transition-all flex items-center gap-1.5"
            >
              <Phone className="h-4 w-4" /> (860) 747-1011
            </a>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-slate-500 hover:text-depco-blue hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
              id="mobile-menu-toggle-btn"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Persistent Dedicated Services Ribbon across the top header row */}
      <div className="border-t border-slate-100 bg-slate-50 text-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2 md:py-2.5 overflow-x-auto scrollbar-none gap-4">
            <div className="flex items-center gap-1.5">
              <span className="hidden md:inline-flex h-1.5 w-1.5 rounded-full bg-depco-blue animate-pulse" />
              <span className="text-[10px] md:text-xs font-black uppercase tracking-wider text-slate-400 select-none whitespace-nowrap">
                OUR SERVICES:
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 md:gap-4 overflow-x-auto scrollbar-none py-0.5">
              {serviceCategories.map((item) => {
                const IconComponent = item.icon;
                const isSelected = currentTab === 'services' && preSelectedCategory === item.category;
                return (
                  <button
                    key={item.category}
                    onClick={() => handleServiceClick(item.category)}
                    id={`heading-service-tab-${item.category}`}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition-all duration-200 cursor-pointer whitespace-nowrap border ${
                      isSelected
                        ? 'bg-depco-blue text-white border-depco-blue shadow-sm scale-102 font-extrabold'
                        : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <IconComponent className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : item.colorClass}`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 pt-2 pb-6 space-y-3 shadow-inner">
          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase px-4 pt-2 pb-1">
              Main Menu
            </span>
            {mainNavItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMainNavClick(item.id)}
                  id={`mobile-nav-${item.id}`}
                  className={`w-full text-left px-4 py-2.5 text-base font-bold rounded-lg transition-all ${
                    isActive
                      ? 'text-depco-blue bg-blue-50 border-l-4 border-depco-blue'
                      : 'text-slate-600 hover:text-depco-blue hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="space-y-1">
            <span className="block text-[10px] font-bold text-slate-400 tracking-wider uppercase px-4 pt-2 pb-1">
              Our Services
            </span>
            {serviceCategories.map((item) => {
              const IconComponent = item.icon;
              const isActive = currentTab === 'services' && preSelectedCategory === item.category;
              return (
                <button
                  key={item.category}
                  onClick={() => handleServiceClick(item.category)}
                  id={`mobile-nav-service-${item.category}`}
                  className={`w-full text-left px-4 py-2.5 text-base font-bold rounded-lg transition-all flex items-center gap-2 ${
                    isActive
                      ? 'text-depco-blue bg-blue-50 border-l-4 border-depco-blue'
                      : 'text-slate-600 hover:text-depco-blue hover:bg-slate-50'
                  }`}
                >
                  <IconComponent className={`h-4 w-4 ${item.colorClass}`} />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Mobile Action Buttons */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onUrgentDispatchClick();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 bg-depco-red hover:bg-depco-red-dark text-white text-center font-bold rounded-lg shadow text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Clock className="h-4 w-4" /> Dispatch
            </button>
            <a
              href="tel:8607471011"
              className="w-full py-3 bg-depco-blue hover:bg-blue-800 text-white text-center font-bold rounded-lg shadow text-xs uppercase tracking-wider flex items-center justify-center gap-1.5"
            >
              <Phone className="h-4 w-4 fill-current" /> Call Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
