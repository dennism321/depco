import React, { useState } from 'react';
import { LOCAL_CITIES } from '../utils/mockData';
import { MapPin, Shield, CheckCircle2, Navigation, AlertCircle, Info } from 'lucide-react';
import { CityArea } from '../types';

interface AreaMapViewProps {
  setTab: (tab: string) => void;
  setPreSelectedCity: (cityName: string) => void;
  setPreSelectedZipCode: (zip: string) => void;
}

export default function AreaMapView({ setTab, setPreSelectedCity, setPreSelectedZipCode }: AreaMapViewProps) {
  const [selectedCity, setSelectedCity] = useState<CityArea>(LOCAL_CITIES[0]); // Default to Clinton Township

  const handleCitySelect = (city: CityArea) => {
    setSelectedCity(city);
  };

  const handleBookWithCity = () => {
    setPreSelectedCity(selectedCity.name);
    setPreSelectedZipCode(selectedCity.zipCode);
    setTab('dispatch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getTierDescription = (tier: string) => {
    switch (tier) {
      case 'premium':
        return {
          label: 'Premium 24/7 Rapid Zone (Direct-Settle)',
          desc: 'Our supreme local coverage ring. Average dispatch times are under 30 minutes. Full 24/7 service with zero geographic travel surcharge premiums.',
          color: 'text-blue-600 bg-blue-50 border-blue-200'
        };
      case 'quick-response':
        return {
          label: 'Quick-Response Outer Ring',
          desc: 'Fast-track regional dispatch zones. Average dispatch times run 35-50 minutes. Eligible for emergency priority scheduling.',
          color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
        };
      default:
        return {
          label: 'Standard Scheduled Coverage Zone',
          desc: 'Scheduled routing sectors. Same-day service available. Travel planning coordinates configured within daily slots.',
          color: 'text-slate-600 bg-slate-50 border-slate-200'
        };
    }
  };

  const tierInfo = getTierDescription(selectedCity.tier);

  return (
    <div id="area-map-view" className="space-y-12 animate-fade-in">
      
      {/* Page Title Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Hartford County & Adjacent Territory Map
        </h1>
        <p className="text-slate-500 text-lg">
          We operate a fleet of fully stocked service trucks out of Plainville, CT. Hover or click cities on the regional interactive map grid below to explore live local truck stats.
        </p>
      </div>

      {/* Main Grid: Interactive Panel vs Vector Map */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left Interactive City Detail Metrics */}
        <div className="lg:col-span-5 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm flex flex-col justify-between" id="city-details-panel">
          
          <div className="space-y-6">
            
            {/* Direct City Heading */}
            <div className="border-b border-slate-100 pb-5">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-widest flex items-center gap-1">
                <Navigation className="h-3 w-3 text-depco-blue" /> Selected Service Hub
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                {selectedCity.name}, CT
              </h2>
              <div className="flex gap-4 mt-3 text-xs text-slate-500 font-semibold">
                <span>Zip Code: <em className="text-slate-800 not-italic">{selectedCity.zipCode}</em></span>
                <span>•</span>
                <span>County: <em className="text-slate-800 not-italic">{selectedCity.county} County</em></span>
              </div>
            </div>

            {/* Vital live statistics grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-bold">Active Trucks Nearby</span>
                <span className="block text-2xl font-extrabold text-depco-blue mt-1">{selectedCity.activeTechs} Trucks</span>
                <p className="text-[10px] text-emerald-600 font-bold mt-1">● Active GPS Tracks</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-center">
                <span className="block text-slate-400 text-[10px] uppercase tracking-wider font-bold">Base Distance</span>
                <span className="block text-2xl font-extrabold text-slate-800 mt-1">
                  {selectedCity.distanceMiles === 0 ? 'Home Base' : `${selectedCity.distanceMiles} mi`}
                </span>
                <p className="text-[10px] text-slate-500 mt-1">to Plainville Office</p>
              </div>
            </div>

            {/* Coverage Tier Card */}
            <div className={`p-5 rounded-xl border ${tierInfo.color} space-y-2`}>
              <h3 className="font-extrabold text-sm uppercase tracking-wider">{tierInfo.label}</h3>
              <p className="text-xs leading-relaxed opacity-90">{tierInfo.desc}</p>
            </div>

            {/* Availability status flag */}
            <div className="flex gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs items-center">
              <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                selectedCity.status === 'high' 
                  ? 'bg-emerald-500 animate-pulse' 
                  : selectedCity.status === 'moderate' 
                    ? 'bg-amber-500' 
                    : 'bg-slate-400'
              }`} />
              <div>
                <span className="font-bold text-slate-800 uppercase text-[10px]">Territory Status:</span>
                <p className="text-slate-500 mt-0.5">
                  {selectedCity.status === 'high' 
                    ? 'Excellent coverage. Immediate dispatch units available for leak or freeze emergency.'
                    : selectedCity.status === 'moderate'
                      ? 'Healthy coverage. Standard same-day booking parameters active.'
                      : 'Scheduled routing only in effect today.'}
                </p>
              </div>
            </div>

          </div>

          {/* Engagement buttons */}
          <div className="mt-8 pt-6 border-t border-slate-100 space-y-3">
            <button
              onClick={handleBookWithCity}
              id="map-dispatch-cta-btn"
              className="w-full py-4 text-center text-white bg-depco-blue hover:bg-blue-700 font-extrabold text-sm tracking-wider uppercase rounded-xl shadow cursor-pointer transition-all active:translate-y-0.5"
            >
              Dispatch to {selectedCity.name}
            </button>
            <p className="text-[10px] text-slate-400 text-center">
              Selecting this city automatically configures your booking address in the Dispatch Center.
            </p>
          </div>

        </div>

        {/* Right Interactive Custom SVG Map */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-2xl shadow-xl flex flex-col justify-between relative overflow-hidden" id="regional-vector-map">
          
          {/* Ambient Background Grid pattern and glow */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 blur-3xl pointer-events-none" />
          
          {/* Upper Info Headers */}
          <div className="relative border-b border-slate-800 pb-4 mb-4 flex justify-between items-center z-10 select-none">
            <div>
              <h3 className="text-white font-extrabold text-sm uppercase tracking-widest flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-depco-blue" />
                Regional GIS Grid
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Hover or click town points to inspect active grid parameters:</p>
            </div>
            <div className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-1 rounded border border-slate-700 font-mono">
              Plainville Base: 41.67° N, 72.87° W
            </div>
          </div>

          {/* Main Visual Board representation container */}
          <div className="relative aspect-[4/3] w-full bg-slate-950/40 border border-slate-800 rounded-xl overflow-hidden z-10 flex items-center justify-center">
            
            {/* Custom SVG Coordinate Matrix representation */}
            <svg viewBox="0 0 100 100" className="w-full h-full select-none" id="interact-svg-board">
              
              {/* Distance Radials outward from home base at 50,50 */}
              <circle cx="50" cy="50" r="15" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="30" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2,2" />
              <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Range Radar sweep representation lines */}
              <line x1="50" y1="50" x2="5" y2="5" stroke="rgba(255,255,255,0.01)" strokeWidth="0.3" />
              <line x1="50" y1="50" x2="95" y2="5" stroke="rgba(255,255,255,0.01)" strokeWidth="0.3" />
              <line x1="50" y1="50" x2="5" y2="95" stroke="rgba(255,255,255,0.01)" strokeWidth="0.3" />
              <line x1="50" y1="50" x2="95" y2="95" stroke="rgba(255,255,255,0.01)" strokeWidth="0.3" />

              {/* Connection links from Base */}
              {LOCAL_CITIES.map((city) => {
                if (city.name === 'Plainville') return null;
                return (
                  <line
                    key={`line-${city.name}`}
                    x1="50"
                    y1="50"
                    x2={city.coordinates.x}
                    y2={city.coordinates.y}
                    stroke="rgba(0, 96, 182, 0.15)"
                    strokeWidth="0.5"
                    strokeDasharray="1,2"
                    className="transition-all"
                  />
                );
              })}

              {/* Clinton Home Base central hub ring pulse */}
              <circle cx="50" cy="50" r="6" fill="rgba(227, 6, 19, 0.1)" className="animate-pulse" />
              <circle cx="50" cy="50" r="3" fill="none" stroke="#E30613" strokeWidth="1" />
              <circle cx="50" cy="50" r="0.8" fill="#E30613" />

              {/* Individual City Nodes */}
              {LOCAL_CITIES.map((city) => {
                const isSelected = selectedCity.name === city.name;
                const isBase = city.name === 'Plainville';
                
                // Color parameters based on tier
                let nodeColor = '#0060B6'; // blue (premium)
                if (city.tier === 'quick-response') nodeColor = '#10B981'; // green
                if (city.tier === 'standard') nodeColor = '#94A3B8'; // gray
                if (isBase) nodeColor = '#E30613'; // red base

                return (
                  <g 
                    key={city.name} 
                    className="cursor-pointer group"
                    onClick={() => handleCitySelect(city)}
                  >
                    {/* Glowing perimeter for hovered layout */}
                    <circle
                      cx={city.coordinates.x}
                      cy={city.coordinates.y}
                      r={isSelected ? 3.5 : 2.5}
                      fill={nodeColor}
                      fillOpacity={isSelected ? 0.35 : 0.15}
                      stroke={nodeColor}
                      strokeWidth={isSelected ? 0.75 : 0.3}
                      className="transition-all duration-200 group-hover:fill-opacity-45"
                    />
                    
                    {/* Inner core node point */}
                    <circle
                      cx={city.coordinates.x}
                      cy={city.coordinates.y}
                      r="0.8"
                      fill={nodeColor}
                    />

                    {/* Label strings */}
                    <text
                      x={city.coordinates.x}
                      y={city.coordinates.y - 3.5}
                      fill={isSelected ? '#FFFFFF' : '#94A3B8'}
                      fontSize="2.2"
                      fontFamily="'Space Grotesk', system-ui, sans-serif"
                      fontWeight={isSelected ? 'bold' : 'normal'}
                      textAnchor="middle"
                      className="transition-all text-[2px]"
                    >
                      {city.name}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Float Base Marker Panel */}
            <div className="absolute top-3 left-3 bg-slate-900/90 py-1.5 px-2.5 rounded border border-slate-800 flex items-center gap-2 select-none pointer-events-none text-[9px] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-depco-red animate-ping shrink-0" />
              <span>📍 <strong className="text-white">DEPCO Headquarters:</strong> Whiting St, Plainville</span>
            </div>

            {/* Float Radar sweep status indicator */}
            <div className="absolute bottom-3 right-3 bg-slate-900/90 py-1 px-2 rounded border border-slate-800 text-[8px] text-slate-500 font-mono flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
              <span>GRID COMM: ONLINE</span>
            </div>
          </div>

          {/* Quick interactive county selections list buttons */}
          <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-4 gap-2 text-center text-xs relative z-10 select-none">
            {LOCAL_CITIES.map((city) => {
              const isSelected = selectedCity.name === city.name;
              return (
                <button
                  key={city.name}
                  onClick={() => handleCitySelect(city)}
                  id={`map-btn-select-${city.name.replace(/\s+/g, '-')}`}
                  className={`py-1.5 px-1 rounded font-medium text-[10px] sm:text-xs tracking-tight transition-colors truncate border ${
                    isSelected
                      ? 'bg-depco-blue border-depco-blue text-white font-bold'
                      : 'bg-slate-850 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                  }`}
                >
                  {city.name}
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Trust Quote / Notice */}
      <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 flex flex-col sm:flex-row gap-4 items-start md:items-center">
        <Info className="h-6 w-6 text-depco-blue shrink-0" />
        <div className="text-xs text-slate-600 leading-relaxed text-left">
          <strong className="text-slate-900 font-bold">Base Dispatch Coordinates:</strong> All dispatch distance calculations, transit guarantees, and timing predictions trace back directly to our central garage warehouse location in Plainville. Our active technicians travel in cellular territory loops, meaning service trucks have pre-load inventory blocks directly in West Hartford or Meriden and can frequently deploy directly from their active jobsites.
        </div>
      </div>

    </div>
  );
}
