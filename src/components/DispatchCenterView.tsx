import React, { useState, useEffect } from 'react';
import { 
  SERVICES, TECHNICIANS, INITIAL_BOOKINGS, LOCAL_CITIES 
} from '../utils/mockData';
import { Booking, UrgencyLevel, Service } from '../types';
import { 
  Clock, ShieldCheck, ShieldAlert, Phone, MapPin, 
  Map, User, PhoneCall, AlertTriangle, Calendar, CheckSquare, 
  Settings, CheckCircle2, Trash2, SlidersHorizontal 
} from 'lucide-react';

interface DispatchCenterViewProps {
  preSelectedUrgency: UrgencyLevel;
  preSelectedService: string;
  preSelectedCity: string;
  preSelectedZipCode: string;
  clearPreSelections: () => void;
}

export default function DispatchCenterView({ 
  preSelectedUrgency, 
  preSelectedService, 
  preSelectedCity, 
  preSelectedZipCode, 
  clearPreSelections 
}: DispatchCenterViewProps) {
  
  // Tab selector inside Dispatch View: Booking Form vs Active Tickets Dashboard
  const [activeSubTab, setActiveSubTab] = useState<'book' | 'history'>('book');

  // Load bookings from localStorage or fall back to INITIAL_BOOKINGS
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('depco_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse bookings from localStorage", e);
      }
    }
    return INITIAL_BOOKINGS;
  });

  // Track the most recently created booking ID to view immediately
  const [latestBookingId, setLatestBookingId] = useState<string>('');

  // Form State variables
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [serviceId, setServiceId] = useState(preSelectedService || SERVICES[0].id);
  const [urgency, setUrgency] = useState<UrgencyLevel>(preSelectedUrgency || 'low');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState(preSelectedCity || 'Plainville');
  const [zipCode, setZipCode] = useState(preSelectedZipCode || '06062');
  const [scheduledDate, setScheduledDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [scheduledTime, setScheduledTime] = useState('08:00 - 10:00');
  const [notes, setNotes] = useState('');

  // Save bookings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('depco_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Sync inputs if user toggled elements from other components
  useEffect(() => {
    if (preSelectedService) setServiceId(preSelectedService);
    if (preSelectedUrgency) setUrgency(preSelectedUrgency);
    if (preSelectedCity) setCity(preSelectedCity);
    if (preSelectedZipCode) setZipCode(preSelectedZipCode);
  }, [preSelectedService, preSelectedUrgency, preSelectedCity, preSelectedZipCode]);

  // Active Dispatch Tickets visual countdown tick-down timer
  useEffect(() => {
    const interval = setInterval(() => {
      setBookings(prev => 
        prev.map(b => {
          if (b.status === 'dispatched' && b.trackingEta && b.trackingEta > 1) {
            return { ...b, trackingEta: b.trackingEta - 1 };
          } else if (b.status === 'dispatched' && b.trackingEta === 1) {
            return { ...b, trackingEta: 0, status: 'completed' as any };
          }
          return b;
        })
      );
    }, 45000); // Minutes track ticks down slowly
    return () => clearInterval(interval);
  }, []);

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !address) {
      alert("Please complete the Name, Phone, and Address fields.");
      return;
    }

    const matchedService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];
    const isEmergency = urgency === 'emergency' || urgency === 'high';

    // Assign a technician based on matching work specs
    let selectedTech = TECHNICIANS[0]; // Marcus (Plumbing) default
    if (matchedService.category === 'heating' || matchedService.category === 'cooling') {
      selectedTech = TECHNICIANS[1]; // Brad Miller
    } else if (matchedService.category === 'iaq') {
      selectedTech = TECHNICIANS[2]; // Sarah Santiago
    }

    const newBookingId = `DEPCO-DISP-${Math.floor(Math.random() * 880) + 110}`;
    const startingEta = isEmergency ? Math.floor(Math.random() * 16) + 20 : undefined; // 20-35 mins

    const newBooking: Booking = {
      id: newBookingId,
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'no-email@depco.com',
      serviceId,
      serviceCategory: matchedService.category,
      urgency,
      address,
      city,
      zipCode,
      scheduledDate,
      scheduledTime: isEmergency ? 'Immediate Dispatch' : scheduledTime,
      notes,
      status: isEmergency ? 'dispatched' : 'pending',
      createdTime: new Date().toISOString(),
      trackingEta: startingEta,
      technician: selectedTech
    };

    setBookings(prev => [newBooking, ...prev]);
    setLatestBookingId(newBookingId);
    clearPreSelections();

    // Reset fields
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setNotes('');
    setAddress('');

    // Switch view to Tracking Dashboard instantly
    setActiveSubTab('history');
    
    // Smooth scroll back to showcase tracking cleanly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => 
      prev.map(b => b.id === bookingId ? { ...b, status: 'canceled' as any, trackingEta: undefined } : b)
    );
  };

  const handleDeleteRecord = (bookingId: string) => {
    if (confirm("Remove this ticket record from history?")) {
      setBookings(prev => prev.filter(b => b.id !== bookingId));
    }
  };

  const getUrgencyBadge = (level: UrgencyLevel) => {
    switch (level) {
      case 'emergency':
        return 'text-white bg-depco-red border-red-700 font-extrabold animate-pulse';
      case 'high':
        return 'text-depco-red bg-red-50 border-red-200 font-bold';
      case 'medium':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-slate-600 bg-slate-100 border-slate-300';
    }
  };

  return (
    <div id="dispatch-center" className="space-y-12 animate-fade-in">
      
      {/* Intro headers */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          DEPCO Dispatch & Booking Terminal
        </h1>
        <p className="text-slate-500 text-lg">
          Lock in a NATE-certified mechanic or master plumber. Launch an immediate 24/7 priority emergency dispatch ticket or schedule routine preventive diagnostics.
        </p>
      </div>

      {/* Sub Tabs Toggle Controller */}
      <div className="flex border-b border-slate-200 max-w-lg mx-auto bg-slate-100 p-1.5 rounded-xl">
        <button
          onClick={() => setActiveSubTab('book')}
          id="tab-toggle-book"
          className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === 'book'
              ? 'bg-white text-depco-blue shadow'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <SlidersHorizontal className="h-4.5 w-4.5" />
          <span>Launch New Ticket</span>
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          id="tab-toggle-history"
          className={`flex-1 py-3 text-center text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer relative ${
            activeSubTab === 'history'
              ? 'bg-white text-depco-blue shadow'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <Map className="h-4.5 w-4.5" />
          <span>Live Tracking Feed ({bookings.length})</span>
          {bookings.some(b => b.status === 'dispatched') && (
            <span className="absolute top-2.5 right-2 h-2.5 w-2.5 bg-depco-red rounded-full animate-ping" />
          )}
        </button>
      </div>

      {/* RENDER VIEW: BOOKING FORM */}
      {activeSubTab === 'book' && (
        <div className="max-w-4xl mx-auto bg-white border border-slate-200/80 p-6 sm:p-10 rounded-2xl shadow-sm">
          
          <form onSubmit={handleCreateBooking} className="space-y-8" id="dispatch-booking-form">
            
            {/* Urgency Section Row */}
            <div className="space-y-3">
              <label className="block text-slate-950 font-extrabold text-sm tracking-wide uppercase">
                1. Select Service Priority Urgency Level:
              </label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { id: 'regular', level: 'low', label: 'Standard Schedule', color: 'border-slate-300 hover:border-slate-500 bg-slate-50', text: 'Select for routine cleanings, inspections, filter checks, or smart systems configurations.' },
                  { id: 'medium', level: 'medium', label: 'Medium Priority', color: 'border-blue-200 hover:border-blue-400 bg-blue-50/20', text: 'Select for slow drains, dripping faucets, or minor thermostat fluctuations.' },
                  { id: 'high', level: 'high', label: 'High Priority', color: 'border-amber-200 hover:border-amber-400 bg-amber-50/25', text: 'Select for cooling failures during heatwaves or major HVAC valve malfunctions.' },
                  { id: 'emergency', level: 'emergency', label: '🚨 EMERGENCY DISPATCH', color: 'border-amber-300 hover:border-amber-500 bg-amber-500/5', text: 'Bypasses standard scheduling cues. Immediate GPS truck routing lock. In transit in <30 mins.' }
                ].map((item) => {
                  const isChecked = urgency === item.level;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setUrgency(item.level as UrgencyLevel)}
                      id={`urgency-pill-${item.level}`}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between h-full min-h-[150px] ${
                        isChecked 
                          ? 'border-depco-blue ring-2 ring-depco-blue/30 bg-blue-50/20' 
                          : item.color
                      }`}
                    >
                      <div>
                        <span className={`block text-xs font-bold uppercase tracking-wider ${
                          item.level === 'emergency' ? 'text-depco-red' : 'text-slate-800'
                        }`}>
                          {item.label}
                        </span>
                        <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                      {isChecked && (
                        <span className="h-5 w-5 bg-depco-blue text-white rounded-full flex items-center justify-center text-[10px] font-bold self-end mt-4">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service & Location Detail Sub-Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Service Selection */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-bold text-sm uppercase">2. Select Requested Service Care:</label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  id="form-service-select"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
                >
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      [{s.category.toUpperCase()}] {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* County Select */}
              <div className="space-y-2">
                <label className="block text-slate-800 font-bold text-sm uppercase">3. Service Territory City:</label>
                <select
                  value={city}
                  onChange={(e) => {
                    const selectedCityName = e.target.value;
                    setCity(selectedCityName);
                    // Update zip automatically based on selected name from mock data for supreme ease of use!
                    const matched = LOCAL_CITIES.find(c => c.name === selectedCityName);
                    if (matched) {
                      setZipCode(matched.zipCode);
                    }
                  }}
                  id="form-city-select"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
                >
                  {LOCAL_CITIES.map(c => (
                    <option key={c.name} value={c.name}>
                      {c.name} {c.name === 'Plainville' ? '(Base Zone)' : ''}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Street Address & Zip Code Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              
              <div className="md:col-span-3 space-y-2">
                <label className="block text-slate-800 font-bold text-sm uppercase">4. Street Address / Site Location:</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. 41180 Boyce Dr"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="form-address-input"
                    className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-slate-800 font-bold text-sm uppercase">Zip Code:</label>
                <input
                  type="text"
                  required
                  maxLength={5}
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  id="form-zipcode-input"
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-depco-blue/20 text-center"
                />
              </div>

            </div>

            {/* Scheduling Date and Hour Slot */}
            {(urgency === 'low' || urgency === 'medium') && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-5 bg-slate-50 border border-slate-100 rounded-2xl">
                
                <div className="space-y-2">
                  <label className="block text-slate-800 font-bold text-sm uppercase flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-slate-400" /> Date Requested:
                  </label>
                  <input
                    type="date"
                    value={scheduledDate}
                    onChange={(e) => setScheduledDate(e.target.value)}
                    id="form-date-input"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-slate-800 font-bold text-sm uppercase flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" /> Time slot requested:
                  </label>
                  <select
                    value={scheduledTime}
                    onChange={(e) => setScheduledTime(e.target.value)}
                    id="form-timeslot-select"
                    className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-700"
                  >
                    <option value="08:00 - 10:00">Early Morning (8 AM - 10 AM)</option>
                    <option value="10:00 - 12:00">Late Morning (10 AM - 12 PM)</option>
                    <option value="12:00 - 14:00">Early Afternoon (12 PM - 2 PM)</option>
                    <option value="14:00 - 16:00">Late Afternoon (2 PM - 4 PM)</option>
                    <option value="16:00 - 18:00">Evening Routing (4 PM - 6 PM)</option>
                  </select>
                </div>

              </div>
            )}

            {/* Customer Contact Details */}
            <div className="space-y-4">
              <label className="block text-slate-950 font-extrabold text-sm tracking-wide uppercase">
                5. Representative Contact Details:
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-600">Full Name:</span>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      id="form-name-input"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-600">Active Mobile Phone Number:</span>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="(860) 555-0199"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      id="form-phone-input"
                      className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="block text-xs font-semibold text-slate-600">Email Address (for Upfront written estimates):</span>
                  <input
                    type="email"
                    placeholder="yourname@gmail.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    id="form-email-input"
                    className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
                  />
                </div>

              </div>
            </div>

            {/* Diagnostic Dispatch Notes */}
            <div className="space-y-2">
              <label className="block text-slate-800 font-bold text-sm uppercase">6. Diagnostic Symptoms or Issue Notes (optional):</label>
              <textarea
                rows={3}
                placeholder="Describe your system symptoms (e.g., pipe dripping near floor drain, furnace display showing Error Code 3, etc.)..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                id="form-notes-input"
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-depco-blue/20"
              />
            </div>

            {/* Launch CTA */}
            <div className="text-center pt-4">
              <button
                type="submit"
                id="form-submit-btn"
                className={`py-5 px-10 rounded-xl font-extrabold shadow-lg transition-all text-sm tracking-widest uppercase cursor-pointer flex items-center justify-center gap-2 mx-auto ${
                  urgency === 'emergency'
                    ? 'bg-depco-red hover:bg-depco-red-dark text-white animate-pulse-subtle'
                    : 'bg-depco-blue hover:bg-blue-800 text-white'
                }`}
              >
                {urgency === 'emergency' ? '🚨 LAUNCH EMERGENCY DISPATCH' : 'Verify & Launch Ticket'}
              </button>
              <p className="text-[10px] text-slate-400 mt-3 leading-relaxed">
                By clicking launch, your ticket record will be processed immediately. If prioritized as emergency dispatch, <br className="hidden sm:inline" />
                the nearest mobile truck will establish GPS lock. You can monitor progress on the Tracking Feed.
              </p>
            </div>

          </form>

        </div>
      )}

      {/* RENDER VIEW: LIVE TRACKING HISTORY FEED */}
      {activeSubTab === 'history' && (
        <div className="max-w-4xl mx-auto space-y-8">
          
          <div className="bg-slate-950 text-white p-6 sm:p-8 rounded-2xl border border-slate-800 shadow-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-depco-red animate-ping" />
              Live Tri-County GPS Dispatch Monitor
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Active GPS tracks, assigned dispatch technicians, and arrival ETA counts for your local ticket queue.
            </p>
          </div>

          <div className="space-y-6">
            {bookings.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-2xl border border-slate-200 text-slate-500">
                <AlertTriangle className="h-8 w-8 text-slate-300 mx-auto mb-3" />
                <p className="font-bold">No tickets in your active browser queue.</p>
                <p className="text-sm mt-1">Use the Launch New Ticket tab to log a plumbing or heating request.</p>
                <button
                  onClick={() => setActiveSubTab('book')}
                  className="mt-4 px-4 py-2 text-xs font-bold text-depco-blue border border-slate-200 rounded-lg hover:bg-slate-50"
                >
                  Create One Now
                </button>
              </div>
            ) : (
              bookings.map((b) => {
                const isLatest = b.id === latestBookingId;
                const matchedService = SERVICES.find(s => s.id === b.serviceId);
                const hasTech = !!b.technician;

                return (
                  <div 
                    key={b.id} 
                    className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-sm ${
                      isLatest 
                        ? 'border-depco-blue ring-1 ring-depco-blue/10 shadow-blue-500/5' 
                        : 'border-slate-200'
                    }`}
                    id={`ticket-card-${b.id}`}
                  >
                    
                    {/* Header Row */}
                    <div className="px-6 py-4.5 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs text-slate-500 font-bold">Ticket #:</span>
                          <span className="font-mono text-sm text-slate-900 font-black">{b.id}</span>
                          {isLatest && (
                            <span className="text-[9px] bg-depco-blue text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                              New Ticket
                            </span>
                          )}
                        </div>
                        <p className="text-slate-500 text-[11px] font-medium">
                          Created on: {new Date(b.createdTime).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })} ({b.scheduledDate})
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase border ${getUrgencyBadge(b.urgency)}`}>
                          {b.urgency}
                        </span>
                        
                        {/* Status label */}
                        <span className={`px-2.5 py-1 rounded text-xs font-extrabold uppercase ${
                          b.status === 'dispatched'
                            ? 'bg-blue-50 text-blue-600 border border-blue-200 animate-pulse'
                            : b.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                              : b.status === 'canceled'
                                ? 'bg-slate-100 text-slate-600 border border-slate-200'
                                : 'bg-amber-50 text-amber-600 border border-amber-200'
                        }`}>
                          {b.status === 'dispatched' ? '🚛 IN TRANSIT' : b.status}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Content Grid */}
                    <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                      
                      {/* Customer & Location Specs */}
                      <div className="lg:col-span-7 space-y-4 text-sm text-slate-600">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Client & Contact:</span>
                          <h4 className="font-bold text-slate-900 mt-0.5 text-base">{b.customerName}</h4>
                          <div className="flex gap-4 mt-1 text-xs text-slate-500 font-medium">
                            <span>📱 {b.customerPhone}</span>
                            <span>✉️ {b.customerEmail}</span>
                          </div>
                        </div>

                        <div className="pt-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Site target address:</span>
                          <p className="font-semibold text-slate-800 flex items-center gap-1.5 mt-0.5">
                            <MapPin className="h-4 w-4 text-slate-400" /> {b.address}, {b.city}, MI {b.zipCode}
                          </p>
                        </div>

                        <div className="pt-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Diagnostic Area:</span>
                          <p className="font-semibold text-slate-800 mt-0.5">
                            [{b.serviceCategory.toUpperCase()}] {matchedService?.name || 'General Comfort Diagnostic'}
                          </p>
                          {b.notes && (
                            <p className="text-xs bg-slate-50 border border-slate-100 p-2.5 rounded-lg mt-2 font-normal italic text-slate-500">
                              " {b.notes} "
                            </p>
                          )}
                        </div>
                      </div>

                      {/* ASSIGNED TECHNICIAN SECTION */}
                      <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between" id="assigned-tech-card">
                        {hasTech ? (
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <img 
                                src={b.technician?.photo} 
                                alt={b.technician?.name} 
                                className="h-12 w-12 rounded-full object-cover border-2 border-slate-300 shadow-sm referrer-policy"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <span className="text-[9px] bg-depco-blue text-white px-2 py-0.2 rounded uppercase font-bold tracking-wider">
                                  Your Dispatched Specialist
                                </span>
                                <h5 className="font-black text-slate-900 text-sm mt-0.5">{b.technician?.name}</h5>
                                <div className="flex items-center gap-1 text-xs font-semibold text-amber-500">
                                  <span>★ {b.technician?.rating}</span>
                                  <span className="text-slate-400">• Verified Master</span>
                                </div>
                              </div>
                            </div>

                            <p className="text-slate-500 text-[11px] leading-relaxed">
                              {b.technician?.description}
                            </p>

                            <div className="border-t border-slate-200 pt-3 text-xs flex justify-between items-center text-slate-500 font-mono">
                              <span>Rig Plate: <strong className="text-slate-800">{b.technician?.vehiclePlate}</strong></span>
                              <span>Mobile: <strong className="text-slate-850 hover:underline cursor-pointer">{b.technician?.phone}</strong></span>
                            </div>

                            {/* Live Active Arrival ETA Clock Counter */}
                            {b.status === 'dispatched' && b.trackingEta !== undefined && (
                              <div className="bg-blue-600 text-white p-3.5 rounded-lg text-center animate-pulse-subtle">
                                <span className="block text-[10px] uppercase font-extrabold tracking-widest text-blue-100">Live GPS Tech Arrival ETA:</span>
                                <span className="block text-2xl font-black mt-1 font-mono">
                                  {b.trackingEta > 0 ? `${b.trackingEta} MINUTES` : 'ARRIVED & DISPATCHING'}
                                </span>
                              </div>
                            )}

                          </div>
                        ) : (
                          <div className="text-center py-6 text-slate-400">
                            <p className="text-xs">Scheduling Queue review in progress.</p>
                          </div>
                        )}
                      </div>

                    </div>

                    {/* Footer Operations */}
                    <div className="px-6 py-3 border-t border-slate-100 bg-slate-50/50 flex justify-between items-center text-xs">
                      <div>
                        {b.status === 'pending' && (
                          <span className="text-amber-600 font-semibold">Ready for review. Dispatcher will call to lock scheduling window.</span>
                        )}
                        {b.status === 'dispatched' && (
                          <span className="text-depco-blue font-bold flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" /> Direct Master in transit to Clinton-grid coordinates.
                          </span>
                        )}
                        {b.status === 'canceled' && (
                          <span className="text-slate-500 font-bold">Ticket canceled. Zero charges logged.</span>
                        )}
                        {b.status === 'completed' && (
                          <span className="text-emerald-600 font-bold">✓ Job completed. Diagnostic reports filed with dispatcher.</span>
                        )}
                      </div>

                      <div className="flex gap-2 shrink-0">
                        {b.status === 'dispatched' && (
                          <button
                            onClick={() => handleCancelBooking(b.id)}
                            id={`cancel-btn-${b.id}`}
                            className="px-3 py-1 bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 hover:border-slate-300 rounded font-bold transition-all text-[11px] cursor-pointer"
                          >
                            Cancel Dispatch
                          </button>
                        )}
                        
                        {(b.status === 'canceled' || b.status === 'completed' || b.status === 'pending') && (
                          <button
                            onClick={() => handleDeleteRecord(b.id)}
                            id={`delete-btn-${b.id}`}
                            className="p-1 px-2.5 bg-white hover:bg-slate-100 text-slate-400 hover:text-amber-600 border border-slate-200 rounded transition-all text-[11px] cursor-pointer flex items-center gap-1"
                            title="Remove from history"
                          >
                            <Trash2 className="h-3.5 w-3.5" /> Delete
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>
      )}

    </div>
  );
}
