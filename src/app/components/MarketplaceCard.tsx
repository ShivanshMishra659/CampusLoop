import { Heart, Star, Award, Zap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'Sell' | 'Buy' | 'Lend' | 'Share';
  price?: number;
  author: string;
  authorTrustPoints?: number;
  image: string;
  timestamp: string;
  rating?: number;
  ratingCount?: number;
}

const getTrustLevel = (points: number) => {
  if (points >= 100) return { label: 'Trusted', color: 'text-green-700', bg: 'bg-green-50 border-green-300' };
  if (points >= 50) return { label: 'Reliable', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-300' };
  if (points >= 20) return { label: 'Active', color: 'text-purple-700', bg: 'bg-purple-50 border-purple-300' };
  return { label: 'New', color: 'text-gray-600', bg: 'bg-gray-100 border-gray-300' };
};

const getTypeBadge = (type: string) => {
  switch (type) {
    case 'Sell': return { label: 'FOR SALE', bg: 'bg-green-600 text-white' };
    case 'Buy': return { label: 'WANTED', bg: 'bg-blue-600 text-white' };
    case 'Lend': return { label: 'LENDING', bg: 'bg-purple-600 text-white' };
    case 'Share': return { label: 'FREE', bg: 'bg-orange-500 text-white' };
    default: return { label: type.toUpperCase(), bg: 'bg-gray-600 text-white' };
  }
};

export const getCtaLabel = (type: string) => {
  switch (type) {
    case 'Sell': return 'ADD TO CART';
    case 'Buy': return 'MAKE OFFER';
    case 'Lend': return 'REQUEST LEND';
    case 'Share': return 'GET FOR FREE';
    default: return 'CONTACT';
  }
};

interface CardProps {
  item: MarketplaceItem;
  wishlisted: boolean;
  inCart: boolean;
  requested: boolean;
  onToggleWish: () => void;
  onAction: () => void;
  onOpen: () => void;
}

export function MarketplaceCard({ item, wishlisted, inCart, requested, onToggleWish, onAction, onOpen }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left - rect.width / 2) / 18,
      y: (e.clientY - rect.top - rect.height / 2) / 18,
    });
  };

  const idNum = parseInt(item.id) || 1;
  const discountFactor = 1.2 + (idNum % 3) * 0.08;
  const mrp = item.price ? Math.round(item.price * discountFactor) : 0;
  const discountPct = item.price ? Math.round(((mrp - item.price) / mrp) * 100) : 0;

  const rating = item.rating ?? (3.8 + (idNum % 12) * 0.1);
  const ratingCount = item.ratingCount ?? (idNum * 3 + 5);
  const typeBadge = getTypeBadge(item.type);
  const trustLevel = item.authorTrustPoints !== undefined ? getTrustLevel(item.authorTrustPoints) : null;

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded overflow-hidden cursor-pointer group"
      style={{ transformStyle: 'preserve-3d' }}
      animate={{
        rotateX: isHovered ? -mousePos.y * 0.4 : 0,
        rotateY: isHovered ? mousePos.x * 0.4 : 0,
        scale: isHovered ? 1.02 : 1,
        boxShadow: isHovered
          ? '0 16px 48px rgba(211,47,47,0.18), 0 6px 16px rgba(0,0,0,0.1)'
          : '0 1px 3px rgba(0,0,0,0.06)',
      }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setMousePos({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
      onClick={onOpen}
    >
      {/* Portrait image container */}
      <div className="relative overflow-hidden bg-gray-100" style={{ paddingBottom: '130%' }}>
        <motion.img
          src={item.image}
          alt={item.title}
          className="absolute inset-0 w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.06 : 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
        {/* Type badge */}
        <span className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded ${typeBadge.bg}`}>
          {typeBadge.label}
        </span>
        {/* Wishlist button */}
        <motion.button
          className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full shadow-sm border border-gray-100"
          aria-label="Toggle wishlist"
          onClick={(e) => { e.stopPropagation(); onToggleWish(); }}
          whileTap={{ scale: 0.85 }}
        >
          <Heart
            className={`w-3.5 h-3.5 transition-colors ${wishlisted ? 'fill-red-600 text-red-600' : 'text-gray-400'}`}
          />
        </motion.button>
      </div>

      {/* Card content */}
      <div className="p-2.5">
        {/* Rating / Trust badge */}
        {trustLevel ? (
          <div className={`inline-flex items-center gap-1 text-xs px-1.5 py-0.5 rounded border mb-1.5 font-medium ${trustLevel.bg} ${trustLevel.color}`}>
            <Award className="w-2.5 h-2.5" />
            {trustLevel.label} · {item.authorTrustPoints} pts
          </div>
        ) : (
          <div className="flex items-center gap-1 mb-1.5">
            <span className="text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`w-2.5 h-2.5 ${i <= Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-400">({ratingCount})</span>
          </div>
        )}

        {/* Title */}
        <p className="text-sm font-medium leading-tight line-clamp-2 text-gray-900 mb-0.5">{item.title}</p>
        <p className="text-xs text-gray-500 mb-2 truncate">{item.author}</p>

        {/* Price */}
        {item.price ? (
          <div className="mb-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm font-bold text-gray-900">₹{item.price}</span>
              <span className="text-xs text-gray-400 line-through">₹{mrp}</span>
              <span className="text-xs font-medium text-green-600">({discountPct}%)</span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              {idNum % 2 === 0 ? (
                <span className="text-xs text-gray-500 flex items-center gap-0.5">
                  <Zap className="w-2.5 h-2.5 text-red-500" />
                  <span className="text-red-500 font-semibold">NOW</span>
                  <span className="text-gray-400">24HRS DELIVERY</span>
                </span>
              ) : (
                <span className="text-xs text-gray-500">Delivery in 1–2 days</span>
              )}
            </div>
          </div>
        ) : (
          <div className="mb-1">
            <span className="text-sm font-bold text-green-600">Free</span>
            <p className="text-xs text-gray-500">Contact to arrange</p>
          </div>
        )}

        {/* CTA Button */}
        <motion.button
          className={`w-full text-white text-xs font-semibold py-2 rounded transition-colors mt-1 ${
            requested ? 'bg-gray-400' : inCart ? 'bg-gray-900 hover:bg-gray-800' : 'bg-red-600 hover:bg-red-700'
          }`}
          onClick={(e) => { e.stopPropagation(); onAction(); }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
        >
          {inCart ? 'VIEW CART' : requested ? 'REQUESTED' : getCtaLabel(item.type)}
        </motion.button>
      </div>
    </motion.div>
  );
}
