import React, { useState, useEffect } from 'react';
import { REVIEWS_DATA } from '../data/packData';
import { Review } from '../types';
import {
  Star,
  CheckCircle2,
  ThumbsUp,
  MessageSquarePlus,
  X,
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('vitaker_reviews');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return REVIEWS_DATA;
  });

  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<{ [id: string]: boolean }>({});

  const [newReview, setNewReview] = useState({
    name: '',
    city: 'الدار البيضاء',
    rating: 5,
    comment: '',
    productTarget: 'باك فيتاكر الكامل',
  });

  const handleLike = (id: string) => {
    if (likedReviews[id]) return;
    setLikedReviews((prev) => ({ ...prev, [id]: true }));
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, likes: r.likes + 1 } : r))
    );
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    const added: Review = {
      id: `rev-${Date.now()}`,
      name: newReview.name,
      city: newReview.city,
      rating: newReview.rating,
      date: 'الآن',
      comment: newReview.comment,
      verified: true,
      productTarget: newReview.productTarget,
      likes: 1,
    };

    const updated = [added, ...reviews];
    setReviews(updated);
    try {
      localStorage.setItem('vitaker_reviews', JSON.stringify(updated));
    } catch {
      // ignore
    }

    setIsAddReviewOpen(false);
    setNewReview({
      name: '',
      city: 'الدار البيضاء',
      rating: 5,
      comment: '',
      productTarget: 'باك فيتاكر الكامل',
    });
  };

  return (
    <section id="reviews" className="py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-xs font-black px-3.5 py-1.5 rounded-full mb-3">
            <Star className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
            <span>تجارب وآراء حقيقية</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-stone-900 tracking-tight">
            شنو كيقولو زبنائنا على <span className="text-emerald-700">باك فيتاكر؟</span>
          </h2>
          <p className="text-stone-600 text-sm sm:text-base mt-2">
            شهادات وتجارب من مختلف مدن المغرب الذين تخلصوا من تساقط الشعر واسترجعوا كثافة شعرهم.
          </p>
        </div>

        {/* Rating Score Banner */}
        <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6 text-right">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="text-center sm:text-right">
              <div className="text-5xl font-black text-emerald-800 font-['Plus_Jakarta_Sans',sans-serif]">
                4.9
              </div>
              <div className="flex text-amber-400 mt-1 justify-center sm:justify-start">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-stone-500 font-bold block mt-1">
                بناءً على 2,450+ تقييم موثق
              </span>
            </div>

            <div className="hidden sm:block h-16 w-px bg-stone-200" />

            <div className="flex flex-col gap-1.5 text-xs text-stone-600 max-w-md">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>96% من الزبناء لاحظوا توقف التساقط خلال أول 14 يوماً.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>92% لاحظوا إنبات بيبي هير في الفراغات بعد شهر من الاستعمال.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% توصيل سريع مع فحص محتوى الطرد قبل الدفع.</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsAddReviewOpen(true)}
            className="inline-flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 text-white px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer shrink-0"
          >
            <MessageSquarePlus className="w-4 h-4" />
            <span>شاركنا تجربتك وتقييمك</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between gap-4 text-right hover:shadow-md transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-900 font-black text-sm flex items-center justify-center">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-sm text-stone-900">{rev.name}</h4>
                      <p className="text-[11px] text-stone-500">{rev.city}</p>
                    </div>
                  </div>

                  <span className="text-[10px] text-stone-400">{rev.date}</span>
                </div>

                <div className="flex items-center gap-1.5 mb-2.5">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <UserCheck className="w-3 h-3 text-emerald-600" />
                      <span>زبون موثق</span>
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span className="text-[11px] text-emerald-800 font-semibold">{rev.productTarget}</span>
                <button
                  onClick={() => handleLike(rev.id)}
                  className={`flex items-center gap-1.5 text-xs font-semibold p-1 rounded transition-colors ${
                    likedReviews[rev.id] ? 'text-emerald-700 font-bold' : 'hover:text-stone-800'
                  }`}
                  title="مفيد"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>مفيد ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Review Modal */}
        {isAddReviewOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto text-right">
            <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs"
                onClick={() => setIsAddReviewOpen(false)}
              />
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

              <div className="inline-block align-bottom bg-white rounded-3xl text-right overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-stone-200 p-6 sm:p-7 relative">
                <button
                  onClick={() => setIsAddReviewOpen(false)}
                  className="absolute top-4 left-4 p-2 rounded-xl text-stone-400 hover:text-stone-800"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 className="text-lg font-black text-stone-900 mb-1">شاركنا تجربتك مع معشبة ريحاب</h3>
                <p className="text-xs text-stone-500 mb-4">
                  رأيك يهمنا ويساعد الآخرين في اتخاذ القرار المناسب لشعرهم
                </p>

                <form onSubmit={handleAddReview} className="flex flex-col gap-3 text-xs">
                  <div>
                    <label className="font-bold text-stone-800 block mb-1">الاسم الكامل:</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="اسمك الكريم"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1">المدينة:</label>
                    <input
                      type="text"
                      required
                      value={newReview.city}
                      onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                      placeholder="مدينتك (مثال: الرباط، فاس...)"
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1">تقييمك:</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewReview({ ...newReview, rating: star })}
                          className="p-1 focus:outline-none"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newReview.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-stone-800 block mb-1">تعليقك وتجربتك:</label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="احكِ لنا كيف لاحظت الفرق في شعرك وتوقف التساقط..."
                      className="w-full bg-stone-50 border border-stone-200 rounded-xl p-2.5 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-3 rounded-xl text-sm transition mt-2 cursor-pointer"
                  >
                    نشر التقييم
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
