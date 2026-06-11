import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import ServicesView from './components/ServicesView';
import AreaMapView from './components/AreaMapView';
import DispatchCenterView from './components/DispatchCenterView';
import ReviewsView from './components/ReviewsView';
import { Phone, AlertTriangle, ShieldCheck, X } from 'lucide-react';

export default function App() {
  const [currentTab, setTab] = useState<string>('home');

  // Preselected values passed between views
  const [preSelectedUrgency, setPreSelectedUrgency] = useState<'low' | 'medium' | 'high' | 'emergency'>('low');
  const [preSelectedService, setPreSelectedService] = useState<string>('');
  const [preSelectedCity, setPreSelectedCity] = useState<string>('Plainville');
  const [preSelectedZipCode, setPreSelectedZipCode] = useState<string>('06062');
  const [preSelectedCategory, setPreSelectedCategory] = useState<string>('all');

  const [floatingWidgetDismissed, setFloatingWidgetDismissed] = useState(false);

  const clearPreSelections = () => {
    setPreSelectedUrgency('low');
    setPreSelectedService('');
    setPreSelectedCity('Plainville');
    setPreSelectedZipCode('06062');
    setPreSelectedCategory('all');
  };

  const handleUrgentDispatchClick = () => {
    setPreSelectedUrgency('emergency');
    setPreSelectedService('plumb-leak');
    setTab('dispatch');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView 
            setTab={setTab} 
            setPreSelectedUrgency={setPreSelectedUrgency}
            setPreSelectedService={setPreSelectedService}
          />
        );
      case 'services':
        return (
          <ServicesView 
            setTab={setTab} 
            setPreSelectedService={setPreSelectedService}
            setPreSelectedUrgency={setPreSelectedUrgency}
            preSelectedCategory={preSelectedCategory}
            setPreSelectedCategory={setPreSelectedCategory}
          />
        );
      case 'map':
        return (
          <AreaMapView 
            setTab={setTab} 
            setPreSelectedCity={setPreSelectedCity}
            setPreSelectedZipCode={setPreSelectedZipCode}
          />
        );
      case 'dispatch':
        return (
          <DispatchCenterView 
            preSelectedUrgency={preSelectedUrgency}
            preSelectedService={preSelectedService}
            preSelectedCity={preSelectedCity}
            preSelectedZipCode={preSelectedZipCode}
            clearPreSelections={clearPreSelections}
          />
        );
      case 'reviews':
        return (
          <ReviewsView />
        );
      default:
        return (
          <HomeView 
            setTab={setTab} 
            setPreSelectedUrgency={setPreSelectedUrgency}
            setPreSelectedService={setPreSelectedService}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800" id="depco-primary-application">
      
      {/* Sticky Header Nav */}
      <Header 
        currentTab={currentTab} 
        setTab={setTab} 
        onUrgentDispatchClick={handleUrgentDispatchClick}
        preSelectedCategory={preSelectedCategory}
        setPreSelectedCategory={setPreSelectedCategory}
      />

      {/* Main Content Layout Container */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {renderActiveView()}
      </main>

      {/* Footer Nav */}
      <Footer setTab={setTab} />

      {/* FLOATING MOBILE EMERGENCY DISPATCH ANCHOR */}
      {!floatingWidgetDismissed && (
        <div 
          className="fixed bottom-4 right-4 z-40 sm:hidden flex items-end justify-end select-none animate-bounce"
          id="mobile-floating-widget"
        >
          <div className="relative bg-depco-red text-white p-3.5 rounded-2xl shadow-2xl border border-depco-red-dark max-w-[280px] flex items-center gap-3">
            
            <a 
              href="tel:8607471011"
              className="flex items-center gap-2 text-xs font-bold leading-tight"
              id="floating-phone-call-link"
            >
              <div className="bg-white text-depco-red p-2 rounded-full animate-pulse shrink-0">
                <Phone className="h-4.5 w-4.5 fill-current" />
              </div>
              <div>
                <span className="block text-[8px] tracking-wide text-red-100 uppercase font-black">24/7 Rapid Dispatch:</span>
                <span className="block font-black text-xs shrink-0">(860) 747-1011</span>
              </div>
            </a>

            <button
              onClick={() => setFloatingWidgetDismissed(true)}
              className="p-1 text-red-100 hover:text-white hover:bg-depco-red-dark rounded-full transition-colors self-start shrink-0"
              id="dismiss-floating-widget-btn"
              aria-label="Close call banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
