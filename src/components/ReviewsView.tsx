import React, { useState, useEffect } from 'react';
import { INITIAL_REVIEWS, LOCAL_CITIES } from '../utils/mockData';
import { Review } from '../types';
import { Star, CheckCircle2, MessageSquare, Plus, PenSquare, X, Info } from 'lucide-react';

export default function ReviewsView() {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('depco_reviews');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse reviews from localStorage", e);
      }
    }
    return INITIAL_REVIEWS;
  });

  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [showAddReviewForm, setShowAddReviewForm] = useState(false);

  // Form states
  const [authorName, setAuthorName] = useState('');
  const [starCount, setStarCount] = useState(5);
  const [cityName, setCityName] = useState('Plainville');
  const [serviceCategory, setServiceCategory] = useState('Plumbing');
  const [feedbackText, setFeedbackText] = useState('');
  const [successNotification, setSuccessNotification] = useState(false);

  // Save reviews list in localState
  useEffect(() => {
    localStorage.setItem('depco_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName || !feedbackText) {
      alert("Please enter your name and feedback message.");
      return;
    }

    const newReview: Review = {
      id: `DEPCO-REV-${Math.floor(Math.random() * 8800) + 1200}`,
      author: authorName,
      stars: starCount,
      date: new Date().toISOString().split('T')[0],
      feedback: feedbackText,
      serviceCategory,
      isVerified: true,
      location: `${cityName}, MI`
    };

    setReviews(prev => [newReview, ...prev]);
    setAuthorName('');
    setFeedbackText('');
    setStarCount(5);
    setShowAddReviewForm(false);
    setSuccessNotification(true);

    // Hide success notification after 5 seconds
    setTimeout(() => setSuccessNotification(false), 5000);
  };

  const filteredReviews = activeCategoryFilter === 'all'
    ? reviews
    : reviews.filter(r => r.serviceCategory.toLowerCase() === activeCategoryFilter.toLowerCase());

  // Calculate cumulative ratings dynamically
  const averageRating = (reviews.reduce((acc, curr) => acc + curr.stars, 0) / reviews.length).toFixed(2);

  return (
    <div id="reviews-section" className="space-y-12 animate-fade-in text-left">
      
      {/* Intro Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Verified Customer Experiences
        </h1>
        <p className="text-slate-500 text-lg">
          We treat your home and workplace plumbing and HVAC systems like our own. Read independent, verified feedback left by your Hartford & New Haven County neighbors.
        </p>
      </div>

      {/* Ratings Showcase dashboard widgets */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
        
        {/* Dynamic score block */}
        <div className="md:col-span-4 bg-white border border-slate-200 p-8 rounded-2xl text-center flex flex-col justify-between" id="grades-card">
          <div className="space-y-3">
            <span className="text-[10px] bg-emerald-50 text-emerald-600 font-extrabold border border-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Excellent Rating score
            </span>
            <div className="text-5xl font-black text-slate-900 font-display mt-2">{averageRating}★</div>
            <div className="flex justify-center gap-1 text-amber-500">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="h-5 w-5 fill-current shrink-0" />
              ))}
            </div>
            <p className="text-xs text-slate-400 font-semibold">
              Calculated dynamically over {reviews.length} total local submissions
            </p>
          </div>

          <div className="border-t border-slate-100 pt-5 mt-6">
            <button
              onClick={() => setShowAddReviewForm(true)}
              id="write-review-trigger-btn"
              className="px-5 py-3 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer shadow transition-all flex items-center justify-center gap-2"
            >
              <PenSquare className="h-4 w-4" /> Share Your Experience
            </button>
          </div>
        </div>

        {/* Categories filters tabs */}
        <div className="md:col-span-8 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl flex flex-col justify-between" id="reviews-filter-panel">
          
          <div className="space-y-4">
            <h3 className="font-extrabold text-slate-900 text-lg">Filters reviews by system division:</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We separate plumber logs, heating mechanics diagnostics, cooling recharge services, and air flow inspections into core buckets. Pick a filter below:
            </p>

            <div className="flex flex-wrap gap-2.5 pt-2">
              {[
                { id: 'all', label: 'All Testimonials' },
                { id: 'plumbing', label: 'Plumbing Works Only' },
                { id: 'heating', label: 'Heating Works Only' },
                { id: 'cooling', label: 'Cooling / AC Only' },
                { id: 'indoor air quality', label: 'Air Qualities Only' }
              ].map((filter) => {
                const isActive = activeCategoryFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategoryFilter(filter.id)}
                    id={`filter-rev-${filter.id.replace(/\s+/g, '-')}`}
                    className={`py-2 px-3.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      isActive
                        ? 'bg-depco-blue border-depco-blue text-white font-bold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-400'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4 mt-6 flex items-center gap-3 text-xs text-slate-500 font-medium">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
            <span>All reviews below display organic verified Clinton base accounts and are sync-locked to protect local customer integrity.</span>
          </div>

        </div>

      </div>

      {/* Success Banner */}
      {successNotification && (
        <div className="bg-emerald-50 text-emerald-800 border-2 border-emerald-100 p-5 rounded-2xl flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="h-6 w-6 text-emerald-600 shrink-0 animate-bounce" />
          <div>
            <strong className="font-bold">Thank You!</strong>
            <p className="text-xs mt-0.5">Your review was appended and your verified Plainville neighborhood score has updated dynamically.</p>
          </div>
        </div>
      )}

      {/* WRITE A REVIEW OVERLAY DIALOG */}
      {showAddReviewForm && (
        <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-fade-in">
            
            <div className="px-6 py-4 bg-slate-900 text-white flex justify-between items-center">
              <h3 className="font-bold flex items-center gap-2">
                <PenSquare className="h-5 w-5 text-depco-blue" /> Submit Verified Feedback
              </h3>
              <button 
                onClick={() => setShowAddReviewForm(false)} 
                className="text-slate-400 hover:text-white transition-colors"
                id="close-review-modal-btn"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReview} className="p-6 space-y-4" id="feedback-creation-form">
              
              <div className="grid grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-600">Your Full Name:</span>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Richard G."
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    id="form-author-input"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-depco-blue/25"
                  />
                </div>

                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-600">Service County City:</span>
                  <select
                    value={cityName}
                    onChange={(e) => setCityName(e.target.value)}
                    id="form-review-city-select"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    {LOCAL_CITIES.map(c => (
                      <option key={c.name} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-4">
                
                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-600">Category Serviced:</span>
                  <select
                    value={serviceCategory}
                    onChange={(e) => setServiceCategory(e.target.value)}
                    id="form-review-cat-select"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                  >
                    <option value="Plumbing">Plumbing</option>
                    <option value="Heating">Heating</option>
                    <option value="Cooling / AC">Cooling / AC</option>
                    <option value="Indoor Air Quality">Indoor Air Quality</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-600">Rating Grade:</span>
                  <select
                    value={starCount}
                    onChange={(e) => setStarCount(Number(e.target.value))}
                    id="form-review-stars-select"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-amber-500"
                  >
                    <option value={5}>★★★★★ Excellent (5 stars)</option>
                    <option value={4}>★★★★ Good (4 stars)</option>
                    <option value={3}>★★★ Average (3 stars)</option>
                    <option value={2}>★★ Untrustworthy (2 stars)</option>
                    <option value={1}>★ Critical (1 star)</option>
                  </select>
                </div>

              </div>

              <div className="space-y-1">
                <span className="block text-xs font-semibold text-slate-600">Detailed Testimonial Feedback:</span>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell your local community how our plumbers/technicians did..."
                  value={feedbackText}
                  onChange={(e) => setFeedbackText(e.target.value)}
                  id="form-review-feedback-input"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-depco-blue/25"
                />
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="submit"
                  id="submit-review-form-btn"
                  className="flex-1 py-3 bg-depco-blue hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-lg shadow"
                >
                  Publish Verified Testimonial
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddReviewForm(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-lg"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* REVIEWS RESULTS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        {filteredReviews.length === 0 ? (
          <div className="col-span-2 text-center py-12 bg-white border rounded-2xl text-slate-400">
            <MessageSquare className="h-8 w-8 text-slate-300 mx-auto mb-2" />
            <p>No verified testimonies matched your category filter.</p>
          </div>
        ) : (
          filteredReviews.map((rev) => (
            <div 
              key={rev.id} 
              className="bg-white border border-slate-200/80 rounded-2xl p-6 hover:shadow-sm transition-all flex flex-col justify-between"
              id={`rev-box-${rev.id}`}
            >
              <div className="space-y-4">
                
                {/* Upper row Info */}
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{rev.author}</h4>
                    <span className="text-[10px] text-slate-400 font-semibold">{rev.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-100">
                    <span className="h-1 w-1 bg-emerald-500 rounded-full animate-pulse" /> Verified Resident
                  </div>
                </div>

                {/* Rating Stars row */}
                <div className="flex gap-0.5 text-amber-400">
                  {Array.from({ length: rev.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current shrink-0" />
                  ))}
                  {Array.from({ length: 5 - rev.stars }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-slate-200 shrink-0" />
                  ))}
                </div>

                {/* Feedback text */}
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed italic">
                  " {rev.feedback} "
                </p>

              </div>

              {/* Lower division tag */}
              <div className="mt-6 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] text-slate-400">
                <span>Department: <strong className="text-slate-700 font-bold uppercase">{rev.serviceCategory}</strong></span>
                <span className="font-mono">{rev.date}</span>
              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}
