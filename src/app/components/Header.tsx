import { BookOpen, Search, Heart, ShoppingCart, Zap, Plus, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  activeTab: 'marketplace' | 'community';
  onTabChange: (tab: 'marketplace' | 'community') => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  communityFilter: string;
  onCommunityFilterChange: (filter: string) => void;
  onNewPost: () => void;
  view: 'all' | 'new' | 'trending';
  onViewChange: (v: 'all' | 'new' | 'trending') => void;
  search: string;
  onSearchChange: (q: string) => void;
  userName: string | null;
  onSignIn: () => void;
  onSignOut: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenTrust: () => void;
  onHome: () => void;
  cartCount: number;
  wishCount: number;
  trustPoints: number;
}

const marketplaceCategories = ['All', 'Books', 'Lab Equipment', 'Electronics', 'Stationery', 'Clothing', 'Other'];

export function Header({ activeTab, onTabChange, selectedCategory, onCategoryChange, communityFilter, onCommunityFilterChange, onNewPost, view, onViewChange, search, onSearchChange, userName, onSignIn, onSignOut, onOpenCart, onOpenWishlist, onOpenTrust, onHome, cartCount, wishCount, trustPoints }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Tier 1: Top utility bar */}
      <div className="bg-gray-50 border-b border-gray-200 text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <nav className="flex items-center gap-1 text-gray-600">
            {[
              { label: 'Marketplace', tab: 'marketplace' as const },
              { label: 'Community', tab: 'community' as const },
            ].map(({ label, tab }, i) => (
              <span key={tab} className="flex items-center gap-1">
                {i > 0 && <span className="text-gray-300">|</span>}
                <button
                  onClick={() => onTabChange(tab)}
                  className={`px-1.5 py-0.5 transition-colors ${
                    activeTab === tab ? 'text-gray-900 font-semibold' : 'hover:text-gray-900'
                  }`}
                >
                  {label}
                </button>
              </span>
            ))}
            {([['New Arrivals', 'new'], ['Trending', 'trending']] as const).map(([item, v]) => (
              <span key={item} className="flex items-center gap-1">
                <span className="text-gray-300">|</span>
                <button
                  onClick={() => onViewChange(view === v && activeTab === 'marketplace' ? 'all' : v)}
                  className={`px-1.5 py-0.5 transition-colors ${view === v && activeTab === 'marketplace' ? 'text-red-600 font-semibold' : 'hover:text-gray-900'}`}
                >
                  {item}
                </button>
              </span>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-gray-600">
            <span className="flex items-center gap-1 font-bold text-red-600">NOW</span>
            <span className="text-gray-300">|</span>
            <button onClick={onOpenTrust} className="flex items-center gap-1 font-medium hover:text-gray-900">
              <Zap className="w-3 h-3 text-amber-500" />
              {trustPoints} pts
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2: Main header */}
      <div className="bg-white border-b border-gray-200 py-2.5">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          {/* Logo */}
          <motion.button
            onClick={onHome}
            aria-label="CampusLoop home"
            className="flex items-center gap-1.5 flex-shrink-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
            >
              <BookOpen className="w-7 h-7 text-red-600" />
            </motion.div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              Campus<span className="text-red-600">Loop</span>
            </span>
          </motion.button>

          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder={activeTab === 'marketplace' ? 'Search textbooks, lab coats, calculators...' : 'Search subjects, games, requests...'}
              className="w-full pl-10 pr-9 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-200 transition-colors"
            />
            {search && (
              <button onClick={() => onSearchChange('')} aria-label="Clear search" className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <motion.button
              className="bg-red-600 text-white px-5 py-2 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={userName ? onSignOut : onSignIn}
              title={userName ? `Signed in as ${userName}` : undefined}
            >
              {userName ? `SIGN OUT (${userName.split(' ')[0].toUpperCase()})` : 'SIGN IN'}
            </motion.button>
            <button onClick={onOpenWishlist} className="relative flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors">
              <Heart className="w-5 h-5" />
              {wishCount > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">{wishCount}</span>}
              <span className="text-xs leading-none">Wishlist</span>
            </button>
            <button onClick={onOpenCart} className="relative flex flex-col items-center gap-0.5 text-gray-600 hover:text-gray-900 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] min-w-4 h-4 px-1 rounded-full flex items-center justify-center">{cartCount}</span>}
              <span className="text-xs leading-none">Cart</span>
            </button>
            <motion.button
              onClick={onNewPost}
              className="flex items-center gap-1 border border-red-600 text-red-600 px-3 py-2 rounded text-sm font-medium hover:bg-red-50 transition-colors"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <Plus className="w-4 h-4" />
              Post
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tier 3: Category nav (marketplace only) */}
      {activeTab === 'marketplace' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {marketplaceCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onCategoryChange(cat)}
                  className={`px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'border-red-600 text-red-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Community sub-nav */}
      {activeTab === 'community' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex gap-0">
              {['All Requests', 'Study Buddy', 'Gaming Partner'].map((item) => (
                <button
                  key={item}
                  onClick={() => onCommunityFilterChange(item)}
                  className={`px-4 py-3 text-sm border-b-2 transition-colors ${
                    communityFilter === item
                      ? 'border-red-600 text-red-600 font-semibold'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
