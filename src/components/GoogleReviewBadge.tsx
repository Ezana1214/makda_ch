import { Star } from 'lucide-react';
import { restaurant } from '../data/restaurant';

const GoogleReviewBadge = () => {
  return (
    <a href={restaurant.reviewsUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5 hover:bg-black/30 transition-colors" style={{ borderWidth: '0.5px' }}>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="text-[#FFE4C4] fill-current" />
        ))}
      </div>
      <span className="text-sm font-sans text-[#EDE8E6]" style={{ fontWeight: 400 }}>{restaurant.googleRating}/5 · {restaurant.googleReviewCount} avis Google</span>
    </a>
  );
};

export default GoogleReviewBadge;
