import { Star } from 'lucide-react';

const GoogleReviewBadge = () => {
  return (
    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/5" style={{ borderWidth: '0.5px' }}>
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={20} className="text-[#FFE4C4] fill-current" />
        ))}
      </div>
      <span className="text-sm font-sans text-[#D8D3D2]" style={{ fontWeight: 200 }}>4.9/5 sur Google</span>
    </div>
  );
};

export default GoogleReviewBadge;
