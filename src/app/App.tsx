import { useState, useMemo } from 'react';
import { Toaster, toast } from 'sonner';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { MarketplaceCard, MarketplaceItem, getCtaLabel } from './components/MarketplaceCard';
import { CartPanel, WishlistPanel, SignInDialog, RespondDialog, ItemDialog, TrustDialog } from './components/Panels';
import { CommunityCard, CommunityRequest } from './components/CommunityCard';
import { NewPostModal } from './components/NewPostModal';
import { FloatingElements } from './components/FloatingElements';
import { ArrowRight, Award, TrendingUp, BookOpen, Package, Info, FileText, X, Mail, Phone, MapPin, CheckCircle, AlertCircle, HelpCircle, ChevronDown, ChevronUp, Search as SearchIcon } from 'lucide-react';

const mockMarketplaceItems: MarketplaceItem[] = [
  {
    id: '1',
    title: 'Organic Chemistry Textbook - 3rd Edition',
    description: 'Gently used textbook for Organic Chemistry. Includes practice problems and solutions.',
    category: 'Books',
    type: 'Sell',
    price: 450,
    author: 'Sarah Johnson',
    image: '/images/photo-1532012197267-da84d127e765.jpg',
    timestamp: '2 hours ago',
    rating: 4.4,
    ratingCount: 8,
  },
  {
    id: '2',
    title: 'Physics Lab Manual - 2nd Year',
    description: 'Physics 201 lab manual with handwritten notes, all experiments completed.',
    category: 'Books',
    type: 'Sell',
    price: 200,
    author: 'Mike Chen',
    image: '/images/photo-1636466497217-26a8cbeaf0aa.jpg',
    timestamp: '5 hours ago',
    rating: 3.9,
    ratingCount: 14,
  },
  {
    id: '3',
    title: 'White Lab Coat - Size M',
    description: 'Premium lab coat in excellent condition. Used only one semester.',
    category: 'Lab Equipment',
    type: 'Sell',
    price: 250,
    author: 'Emily Davis',
    image: '/images/photo-1582719508461-905c673771fd.jpg',
    timestamp: '1 day ago',
    rating: 4.2,
    ratingCount: 6,
  },
  {
    id: '4',
    title: 'TI-84 Plus Calculator Lending',
    description: 'Graphing calculator available to borrow during exam week. Free of charge!',
    category: 'Electronics',
    type: 'Lend',
    author: 'David Lee',
    authorTrustPoints: 85,
    image: '/images/photo-1611213165324-0c01c7d8c222.jpg',
    timestamp: '3 days ago',
  },
  {
    id: '5',
    title: 'Biology 101 Complete Study Notes',
    description: 'Detailed notes covering all chapters. Digital PDF shared freely for everyone!',
    category: 'Books',
    type: 'Share',
    author: 'Jessica Wang',
    authorTrustPoints: 120,
    image: '/images/photo-1456513080510-7bf3a84b82f8.jpg',
    timestamp: '1 week ago',
  },
  {
    id: '6',
    title: 'Scientific Calculator TI-36X Pro',
    description: 'Selling backup calculator. Perfect for engineering and science students.',
    category: 'Electronics',
    type: 'Sell',
    price: 300,
    author: 'Alex Brown',
    image: '/images/photo-1587825140708-dfaf72ae4b04.jpg',
    timestamp: '4 days ago',
    rating: 4.6,
    ratingCount: 22,
  },
  {
    id: '7',
    title: 'Engineering Mathematics - B.E. Sem 3',
    description: 'Lending out for one semester. Just need it back by December.',
    category: 'Books',
    type: 'Lend',
    author: 'Priya Sharma',
    authorTrustPoints: 45,
    image: '/images/photo-1509228468518-180dd4864904.jpg',
    timestamp: '2 days ago',
  },
  {
    id: '8',
    title: 'White Lab Coat - Size L',
    description: 'Standard cotton lab coat, barely used. Great for chemistry and biology labs.',
    category: 'Lab Equipment',
    type: 'Sell',
    price: 280,
    author: 'Ravi Kumar',
    image: '/images/photo-1579684385127-1ef15d508118.jpg',
    timestamp: '3 days ago',
    rating: 4.1,
    ratingCount: 9,
  },
  {
    id: '9',
    title: 'Stethoscope - Lending Available',
    description: 'Medical-grade stethoscope available to borrow for practicals.',
    category: 'Lab Equipment',
    type: 'Lend',
    author: 'Ananya Patel',
    authorTrustPoints: 65,
    image: '/images/photo-1559757175-5700dde675bc.jpg',
    timestamp: '1 day ago',
  },
  {
    id: '10',
    title: 'Statistics & Probability Textbook',
    description: 'Walpole 9th edition. Perfect condition with solved examples marked.',
    category: 'Books',
    type: 'Sell',
    price: 375,
    author: 'Rahul Mehta',
    image: '/images/photo-1544716278-ca5e3f4abd8c.jpg',
    timestamp: '5 days ago',
    rating: 4.7,
    ratingCount: 17,
  },
  {
    id: '11',
    title: 'Graph Paper Notebook Set (5 books)',
    description: 'Sharing my extra graph paper notebooks. Free for classmates!',
    category: 'Stationery',
    type: 'Share',
    author: 'Sneha Rao',
    authorTrustPoints: 30,
    image: '/images/photo-1586953208448-b95a79798f07.jpg',
    timestamp: '2 days ago',
  },
  {
    id: '12',
    title: 'Sony Wireless Headphones WH-1000',
    description: 'Noise-cancelling headphones great for deep focus study sessions.',
    category: 'Electronics',
    type: 'Sell',
    price: 599,
    author: 'Karan Singh',
    image: '/images/photo-1505740420928-5e560c06d30e.jpg',
    timestamp: '1 day ago',
    rating: 4.8,
    ratingCount: 34,
  },
];

const mockCommunityRequests: CommunityRequest[] = [
  {
    id: '1',
    title: 'Need help understanding Calculus derivatives',
    description: 'Struggling with chain rule and implicit differentiation. Looking for someone to explain before my midterm next week.',
    type: 'Study Buddy',
    subject: 'Calculus',
    author: 'Tom Anderson',
    timestamp: '1 hour ago',
    responses: 3,
  },
  {
    id: '2',
    title: 'Valorant ranked partner needed',
    description: 'Looking for a gaming partner to climb ranked together. Currently Gold 2, playing mostly on weekends.',
    type: 'Gaming Partner',
    game: 'Valorant',
    author: 'Lisa Martinez',
    timestamp: '3 hours ago',
    responses: 7,
  },
  {
    id: '3',
    title: 'Organic Chemistry study group forming',
    description: 'Starting a study group for Organic Chem final. Meeting twice a week to review reactions and mechanisms.',
    type: 'Study Buddy',
    subject: 'Chemistry',
    author: 'Ryan Cooper',
    timestamp: '6 hours ago',
    responses: 12,
  },
  {
    id: '4',
    title: 'League of Legends casual games',
    description: 'Just looking for chill people to play some normals after classes. Any rank welcome!',
    type: 'Gaming Partner',
    game: 'League of Legends',
    author: 'Nina Patel',
    timestamp: '1 day ago',
    responses: 5,
  },
  {
    id: '5',
    title: 'Physics electricity & magnetism session',
    description: 'Want to work through physics problem sets together? Especially need help with E&M chapters.',
    type: 'Study Buddy',
    subject: 'Physics',
    author: 'James Wilson',
    timestamp: '2 days ago',
    responses: 8,
  },
  {
    id: '6',
    title: 'Campus Minecraft survival server',
    description: 'Looking for regular players to join a survival server and build a campus community together.',
    type: 'Gaming Partner',
    game: 'Minecraft',
    author: 'Emma Taylor',
    timestamp: '3 days ago',
    responses: 15,
  },
];

const trustLevels = [
  { label: 'New', range: '0–19 pts', desc: 'Just getting started', color: 'text-gray-600', dot: 'bg-gray-400' },
  { label: 'Active', range: '20–49 pts', desc: 'Regular community member', color: 'text-purple-600', dot: 'bg-purple-500' },
  { label: 'Reliable', range: '50–99 pts', desc: 'Proven track record', color: 'text-blue-600', dot: 'bg-blue-500' },
  { label: 'Trusted', range: '100+ pts', desc: 'Community champion', color: 'text-green-600', dot: 'bg-green-500' },
];

const listingTypes = ['All', 'Sell', 'Buy', 'Lend', 'Share'];
const typeLabels: Record<string, string> = { All: 'All Items', Sell: 'For Sale', Buy: 'Wanted', Lend: 'Lending', Share: 'Free Share' };

const ageInHours = (t: string) => {
  if (/just now/i.test(t)) return 0;
  const n = parseInt(t) || 1;
  if (/hour/i.test(t)) return n;
  if (/day/i.test(t)) return n * 24;
  if (/week/i.test(t)) return n * 168;
  return 1000;
};
const trendScore = (i: MarketplaceItem) => (i.ratingCount ?? 0) * (i.rating ?? 4) + (i.authorTrustPoints ?? 0);

export default function App() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'community'>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [marketplaceItems, setMarketplaceItems] = useState(mockMarketplaceItems);
  const [communityRequests, setCommunityRequests] = useState(mockCommunityRequests);
  const [communityFilter, setCommunityFilter] = useState('All Requests');
  const [footerPage, setFooterPage] = useState<string | null>(null);
  const [view, setView] = useState<'all' | 'new' | 'trending'>('all');
  const [search, setSearch] = useState('');
  const [userName, setUserName] = useState<string | null>(null);
  const [wishIds, setWishIds] = useState<string[]>([]);
  const [cartIds, setCartIds] = useState<string[]>([]);
  const [requestedIds, setRequestedIds] = useState<string[]>([]);
  const [respondedIds, setRespondedIds] = useState<string[]>([]);
  const [panel, setPanel] = useState<null | 'cart' | 'wishlist' | 'signin' | 'trust'>(null);
  const [detailItem, setDetailItem] = useState<MarketplaceItem | null>(null);
  const [respondTo, setRespondTo] = useState<CommunityRequest | null>(null);
  const trustPoints = 45;

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleTabChange = (tab: 'marketplace' | 'community') => {
    setActiveTab(tab);
    setSelectedCategory('All');
    setSelectedType('All');
    setView('all');
    setSearch('');
    scrollTop();
  };

  const goHome = () => {
    handleTabChange('marketplace');
    setCommunityFilter('All Requests');
  };

  const changeView = (v: 'all' | 'new' | 'trending') => {
    setActiveTab('marketplace');
    setSelectedCategory('All');
    setSelectedType('All');
    setSearch('');
    setView(v);
    scrollTop();
  };

  const q = search.trim().toLowerCase();

  const filteredItems = useMemo(() => {
    const list = marketplaceItems.filter((item) => {
      const catOk = selectedCategory === 'All' || item.category === selectedCategory;
      const typeOk = selectedType === 'All' || item.type === selectedType;
      const qOk = !q || [item.title, item.description, item.author, item.category].some((f) => f.toLowerCase().includes(q));
      return catOk && typeOk && qOk;
    });
    if (view === 'new') return [...list].sort((a, b) => ageInHours(a.timestamp) - ageInHours(b.timestamp));
    if (view === 'trending') return [...list].sort((a, b) => trendScore(b) - trendScore(a));
    return list;
  }, [marketplaceItems, selectedCategory, selectedType, q, view]);

  const filteredCommunity = communityRequests.filter((req) => {
    const typeOk = communityFilter === 'All Requests' || req.type === communityFilter;
    const qOk = !q || [req.title, req.description, req.subject ?? '', req.game ?? '', req.author].some((f) => f.toLowerCase().includes(q));
    return typeOk && qOk;
  });

  const toggleWish = (id: string) => {
    const has = wishIds.includes(id);
    setWishIds(has ? wishIds.filter((x) => x !== id) : [...wishIds, id]);
    toast(has ? 'Removed from wishlist' : 'Saved to wishlist');
  };

  const addToCart = (item: MarketplaceItem) => {
    if (cartIds.includes(item.id)) return;
    setCartIds((c) => [...c, item.id]);
    toast.success('Added to cart', { description: item.title });
  };

  const handleItemAction = (item: MarketplaceItem) => {
    if (item.type === 'Sell') {
      if (cartIds.includes(item.id)) { setDetailItem(null); setPanel('cart'); } else addToCart(item);
      return;
    }
    if (requestedIds.includes(item.id)) return;
    setRequestedIds((r) => [...r, item.id]);
    const msg: Record<string, string> = {
      Buy: `Offer sent to ${item.author}`,
      Lend: `Lend request sent to ${item.author}`,
      Share: `Request sent to ${item.author}`,
    };
    toast.success(msg[item.type] ?? 'Request sent', {
      description: item.type === 'Lend' ? 'Earn 5–10 trust points once the return is confirmed.' : undefined,
    });
  };

  const resetAll = () => {
    setSelectedCategory('All');
    setSelectedType('All');
    setView('all');
    setSearch('');
  };

  const handleRespond = (id: string) => {
    setCommunityRequests((rs) => rs.map((r) => (r.id === id ? { ...r, responses: r.responses + 1 } : r)));
    setRespondedIds((r) => [...r, id]);
    setRespondTo(null);
    toast.success('Response sent', { description: 'They will see your message right away.' });
  };

  const cartItems = marketplaceItems.filter((i) => cartIds.includes(i.id));
  const wishItems = marketplaceItems.filter((i) => wishIds.includes(i.id));

  const handleNewPost = (data: any) => {
    if (activeTab === 'marketplace') {
      const newItem: MarketplaceItem = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        category: data.category,
        type: data.type,
        price: data.price ? parseFloat(data.price) : undefined,
        author: 'You',
        authorTrustPoints: (data.type === 'Lend' || data.type === 'Share') ? 10 : undefined,
        image: '/images/photo-1495446815901-a7297e633e8d.jpg',
        timestamp: 'Just now',
      };
      setMarketplaceItems([newItem, ...marketplaceItems]);
      toast.success('Your listing is live');
    } else {
      const newRequest: CommunityRequest = {
        id: Date.now().toString(),
        title: data.title,
        description: data.description,
        type: data.type,
        subject: data.subject || undefined,
        game: data.game || undefined,
        author: 'You',
        timestamp: 'Just now',
        responses: 0,
      };
      setCommunityRequests([newRequest, ...communityRequests]);
      toast.success('Your request is posted');
    }
  };

  const sectionTitle =
    q ? `Results for "${search.trim()}"`
    : view === 'new' ? 'New Arrivals'
    : view === 'trending' ? 'Trending Now'
    : selectedCategory !== 'All' ? selectedCategory
    : selectedType !== 'All' ? typeLabels[selectedType]
    : 'All Campus Items';

  return (
    <div className="min-h-screen bg-white relative" style={{ fontFamily: "'Inter Variable', 'Inter', sans-serif" }}>
      <FloatingElements />

      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        communityFilter={communityFilter}
        onCommunityFilterChange={setCommunityFilter}
        onNewPost={() => setIsModalOpen(true)}
        view={view}
        onViewChange={changeView}
        search={search}
        onSearchChange={setSearch}
        userName={userName}
        onSignIn={() => setPanel('signin')}
        onSignOut={() => { setUserName(null); toast('Signed out'); }}
        onOpenCart={() => setPanel('cart')}
        onOpenWishlist={() => setPanel('wishlist')}
        onOpenTrust={() => setPanel('trust')}
        onHome={goHome}
        cartCount={cartIds.length}
        wishCount={wishIds.length}
        trustPoints={trustPoints}
      />
      <Toaster position="bottom-right" richColors />

      <AnimatePresence mode="wait">
        {activeTab === 'marketplace' ? (
          <motion.div
            key="marketplace"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Hero banner — shown on "All" category with no type filter */}
            {selectedCategory === 'All' && selectedType === 'All' && view === 'all' && !q && (
              <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-red-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-8 flex items-center justify-between">
                  <div className="max-w-lg">
                    <p className="text-xs font-semibold tracking-widest text-red-600 uppercase mb-2">
                      The Campus Marketplace
                    </p>
                    <h1 className="text-3xl font-bold text-gray-900 leading-tight mb-3">
                      DISCOVER ACADEMIC RESOURCES
                      <br />
                      <span className="text-red-600">WORTH SHARING</span>
                    </h1>
                    <p className="text-gray-600 text-sm mb-5">
                      Buy, sell, lend & share textbooks, lab coats, calculators and more with fellow students on your campus.
                    </p>
                    <div className="flex gap-3">
                      <motion.button
                        className="bg-red-600 text-white px-5 py-2.5 rounded text-sm font-semibold hover:bg-red-700 transition-colors"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => { setSelectedCategory('Books'); scrollTop(); }}
                      >
                        EXPLORE BOOKS
                      </motion.button>
                      <motion.button
                        className="border-2 border-red-600 text-red-600 px-5 py-2.5 rounded text-sm font-semibold hover:bg-red-50 transition-colors"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => handleTabChange('community')}
                      >
                        FIND STUDY BUDDY
                      </motion.button>
                    </div>
                  </div>

                  {/* Trust points panel */}
                  <motion.div
                    className="hidden lg:block bg-white border border-gray-200 rounded-lg p-5 w-72 shadow-sm"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-5 h-5 text-amber-500" />
                      <h3 className="text-sm font-semibold text-gray-900">Trust Points System</h3>
                    </div>
                    <div className="space-y-2 mb-3">
                      {trustLevels.map((level) => (
                        <div key={level.label} className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${level.dot}`} />
                          <span className={`text-xs font-semibold ${level.color} w-14 flex-shrink-0`}>{level.label}</span>
                          <span className="text-xs text-gray-400">{level.range}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-1.5 pt-3 border-t border-gray-100">
                      <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                      <p className="text-xs text-gray-600">Earn 5–10 pts per successful lend</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )}

            {/* Type filter sub-tabs */}
            <div className="bg-white border-b border-gray-200 sticky z-30" style={{ top: activeTab === 'marketplace' ? 148 : 108 }}>
              <div className="max-w-7xl mx-auto px-4 flex gap-0 overflow-x-auto">
                {listingTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setSelectedType(type)}
                    className={`px-5 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
                      selectedType === type
                        ? 'border-red-600 text-red-600'
                        : 'border-transparent text-gray-500 hover:text-gray-800'
                    }`}
                  >
                    {typeLabels[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* Section content */}
            <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
              {/* Section header */}
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900">{sectionTitle}</h2>
                <button onClick={resetAll} className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                  VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Sub-category filter chips (shown in Bookscape style under "Fiction | Non-Fiction | ...") */}
              {selectedCategory === 'All' && (
                <div className="flex gap-3 mb-6 overflow-x-auto pb-1">
                  {['All', 'Books', 'Lab Equipment', 'Electronics', 'Stationery', 'Clothing', 'Other'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded text-xs font-medium whitespace-nowrap border-b-2 pb-1 transition-colors ${
                        selectedCategory === cat
                          ? 'text-red-600 border-red-600'
                          : 'text-gray-500 border-transparent hover:text-gray-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}

              {/* Product grid */}
              {filteredItems.length > 0 ? (
                <motion.div
                  key={`${selectedCategory}-${selectedType}-${view}-${q}`}
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
                >
                  {filteredItems.map((item) => (
                    <motion.div
                      key={item.id}
                      variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                      transition={{ duration: 0.3 }}
                    >
                      <MarketplaceCard
                        item={item}
                        wishlisted={wishIds.includes(item.id)}
                        inCart={cartIds.includes(item.id)}
                        requested={requestedIds.includes(item.id)}
                        onToggleWish={() => toggleWish(item.id)}
                        onAction={() => handleItemAction(item)}
                        onOpen={() => setDetailItem(item)}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-16"
                >
                  <p className="text-gray-400 text-sm">No items found for the selected filters.</p>
                  <button
                    onClick={resetAll}
                    className="mt-3 text-red-600 text-sm font-medium hover:underline"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="community"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Community hero */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200 py-8">
              <div className="max-w-7xl mx-auto px-4">
                <p className="text-xs font-semibold tracking-widest text-blue-600 uppercase mb-2">
                  Campus Community
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  FIND YOUR STUDY BUDDY
                  <br />
                  <span className="text-blue-600">OR GAMING PARTNER</span>
                </h1>
                <p className="text-gray-600 text-sm max-w-md">
                  Connect with fellow students for academic collaboration or casual gaming sessions on campus.
                </p>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6 relative z-10">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  {communityFilter === 'All Requests' ? 'All Community Requests' : `${communityFilter} Requests`}
                </h2>
                <button onClick={() => { setCommunityFilter('All Requests'); setSearch(''); }} className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors">
                  VIEW ALL <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
              >
                {filteredCommunity.length === 0 && (
                  <p className="text-gray-400 text-sm col-span-full text-center py-12">No requests match your search.</p>
                )}
                {filteredCommunity.map((request) => (
                  <motion.div
                    key={request.id}
                    variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.3 }}
                  >
                    <CommunityCard request={request} responded={respondedIds.includes(request.id)} onRespond={() => setRespondTo(request)} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPost}
        postType={activeTab}
      />

      <Footer
        onOpen={setFooterPage}
        onNavigate={(tab, opts) => {
          handleTabChange(tab);
          if (opts?.type) setSelectedType(opts.type);
          if (opts?.view) setView(opts.view);
        }}
      />
      <FooterModal page={footerPage} onClose={() => setFooterPage(null)} onOpen={setFooterPage} />

      <CartPanel
        open={panel === 'cart'}
        onClose={() => setPanel(null)}
        items={cartItems}
        onRemove={(id) => setCartIds((c) => c.filter((x) => x !== id))}
        onBrowse={() => handleTabChange('marketplace')}
      />
      <WishlistPanel
        open={panel === 'wishlist'}
        onClose={() => setPanel(null)}
        items={wishItems}
        cartIds={new Set(cartIds)}
        onRemove={(id) => setWishIds((w) => w.filter((x) => x !== id))}
        onAddToCart={addToCart}
        onView={(i) => { setPanel(null); setDetailItem(i); }}
        onBrowse={() => handleTabChange('marketplace')}
      />
      <SignInDialog
        open={panel === 'signin'}
        onClose={() => setPanel(null)}
        onSignIn={(name) => { setUserName(name); setPanel(null); toast.success(`Welcome, ${name.split(' ')[0]}!`); }}
      />
      <TrustDialog open={panel === 'trust'} onClose={() => setPanel(null)} points={trustPoints} />
      <RespondDialog request={respondTo} onClose={() => setRespondTo(null)} onSubmit={handleRespond} userName={userName} />
      <ItemDialog
        item={detailItem}
        onClose={() => setDetailItem(null)}
        wishlisted={detailItem ? wishIds.includes(detailItem.id) : false}
        onToggleWish={() => detailItem && toggleWish(detailItem.id)}
        inCart={detailItem ? cartIds.includes(detailItem.id) : false}
        requested={detailItem ? requestedIds.includes(detailItem.id) : false}
        onAction={() => detailItem && handleItemAction(detailItem)}
        ctaLabel={detailItem ? getCtaLabel(detailItem.type) : ''}
      />
    </div>
  );
}

interface FooterProps {
  onOpen: (page: string) => void;
  onNavigate: (tab: 'marketplace' | 'community', opts?: { type?: string; view?: 'new' | 'trending' }) => void;
}

function Footer({ onOpen, onNavigate }: FooterProps) {
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState<string | null>(null);

  const handleTrack = () => {
    if (!trackId.trim()) return;
    setTrackResult(trackId.startsWith('CL') ? 'in-transit' : 'not-found');
  };

  const quickLinks = [
    { label: 'Marketplace', action: () => onNavigate('marketplace') },
    { label: 'Community', action: () => onNavigate('community') },
    { label: 'New Arrivals', action: () => onNavigate('marketplace', { view: 'new' }) },
    { label: 'Trending Items', action: () => onNavigate('marketplace', { view: 'trending' }) },
    { label: 'Lending Board', action: () => onNavigate('marketplace', { type: 'Lend' }) },
  ];

  const supportLinks = [
    { label: 'Track Order', icon: <Package className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />, action: () => onOpen('track') },
    { label: 'FAQs', icon: null, action: () => onOpen('faqs') },
    { label: 'Contact Us', icon: null, action: () => onOpen('contact') },
    { label: 'Report an Issue', icon: null, action: () => onOpen('report') },
  ];

  const legalLinks = [
    { label: 'About CampusLoop', icon: <Info className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />, action: () => onOpen('about') },
    { label: 'Terms & Conditions', icon: <FileText className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />, action: () => onOpen('terms') },
    { label: 'Privacy Policy', icon: null, action: () => onOpen('privacy') },
    { label: 'Cookie Policy', icon: null, action: () => onOpen('cookies') },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-6 h-6 text-red-500" />
            <span className="text-white text-lg font-bold">
              Campus<span className="text-red-500">Loop</span>
            </span>
          </div>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            India's trusted campus marketplace for buying, selling, lending and sharing academic resources among students.
          </p>
          <p className="text-xs text-gray-500">Minimum listing price: ₹200</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map(({ label, action }) => (
              <li key={label}>
                <button onClick={action} className="text-sm text-gray-400 hover:text-red-400 transition-colors text-left">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Support</h4>
          <ul className="space-y-2.5">
            {supportLinks.map(({ label, icon, action }) => (
              <li key={label}>
                <button onClick={action} className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-left">
                  {icon}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">Legal & Info</h4>
          <ul className="space-y-2.5">
            {legalLinks.map(({ label, icon, action }) => (
              <li key={label}>
                <button onClick={action} className="text-sm text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1.5 text-left">
                  {icon}
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Track Order inline bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Package className="w-5 h-5 text-red-500 flex-shrink-0" />
            <div>
              <p className="text-sm text-white font-medium">Track Your Order</p>
              <p className="text-xs text-gray-400">Enter your transaction ID to check status</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full sm:w-auto">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={trackId}
                onChange={(e) => { setTrackId(e.target.value); setTrackResult(null); }}
                placeholder="e.g. CL-2026-00142"
                className="flex-1 sm:w-64 bg-gray-800 border border-gray-600 text-white text-sm px-3 py-2 rounded focus:outline-none focus:border-red-500 placeholder-gray-500"
              />
              <button
                onClick={handleTrack}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded transition-colors whitespace-nowrap"
              >
                TRACK
              </button>
            </div>
            {trackResult === 'in-transit' && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" /> Order found — In Transit · Expected delivery in 1–2 days
              </p>
            )}
            {trackResult === 'not-found' && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> No order found. Use format CL-YYYY-XXXXX
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-500">© 2026 CampusLoop. All rights reserved. Made with ❤️ for students.</p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <button onClick={() => onOpen('terms')} className="hover:text-red-400 transition-colors">Terms</button>
            <button onClick={() => onOpen('privacy')} className="hover:text-red-400 transition-colors">Privacy</button>
            <button onClick={() => onOpen('about')} className="hover:text-red-400 transition-colors">About</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterModal({ page, onClose, onOpen }: { page: string | null; onClose: () => void; onOpen: (p: string) => void }) {
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [contactSent, setContactSent] = useState(false);
  const [reportForm, setReportForm] = useState({ type: 'Incorrect Listing', email: '', description: '' });
  const [reportSent, setReportSent] = useState(false);
  const [trackId, setTrackId] = useState('');
  const [trackStatus, setTrackStatus] = useState<string | null>(null);

  if (!page) return null;

  const pageContent: Record<string, { title: string; content: React.ReactNode }> = {
    about: {
      title: 'About CampusLoop',
      content: (
        <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
          <div className="bg-red-50 border border-red-100 rounded-lg p-4">
            <p className="text-base font-semibold text-gray-900 mb-1">Our Mission</p>
            <p>CampusLoop was built with a simple belief: every student deserves access to affordable academic resources. We connect students across campuses to buy, sell, lend, and share books, lab equipment, stationery, and more.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Our Story</h3>
            <p>Founded in 2024 by a group of engineering students at IIT Delhi who were frustrated by the high cost of academic materials, CampusLoop started as a simple WhatsApp group and grew into a full-featured campus marketplace. Today we serve students across 50+ colleges in India.</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">How It Works</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: '📚', title: 'Buy & Sell', desc: 'List used textbooks and equipment from ₹200 onwards.' },
                { icon: '🔄', title: 'Lend & Borrow', desc: 'Share items temporarily — earn Trust Points for every successful lend.' },
                { icon: '🎁', title: 'Free Share', desc: 'Donate notes, PDFs, or extra stationery to classmates.' },
                { icon: '🤝', title: 'Community', desc: 'Find study partners or gaming companions on your campus.' },
              ].map((item) => (
                <div key={item.title} className="bg-gray-50 rounded-lg p-3">
                  <p className="text-lg mb-1">{item.icon}</p>
                  <p className="font-medium text-gray-900 text-xs mb-0.5">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Trust Points System</h3>
            <p className="mb-2">Our gamified reputation system rewards reliable lenders. Earn 5–10 points per successful transaction and unlock higher trust levels:</p>
            <div className="space-y-1.5">
              {[
                { level: 'New', range: '0–19 pts', color: 'bg-gray-200 text-gray-700' },
                { level: 'Active', range: '20–49 pts', color: 'bg-purple-100 text-purple-700' },
                { level: 'Reliable', range: '50–99 pts', color: 'bg-blue-100 text-blue-700' },
                { level: 'Trusted', range: '100+ pts', color: 'bg-green-100 text-green-700' },
              ].map((t) => (
                <div key={t.level} className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded font-semibold ${t.color}`}>{t.level}</span>
                  <span className="text-xs text-gray-500">{t.range}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Our Team</h3>
            <div className="grid grid-cols-3 gap-3 text-center">
              {[
                { name: 'Arjun Sharma', role: 'Co-Founder & CEO', initials: 'AS' },
                { name: 'Priya Nair', role: 'Co-Founder & CTO', initials: 'PN' },
                { name: 'Rohit Verma', role: 'Head of Growth', initials: 'RV' },
              ].map((member) => (
                <div key={member.name} className="bg-gray-50 rounded-lg p-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-bold mx-auto mb-2">{member.initials}</div>
                  <p className="text-xs font-semibold text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-400 border-t pt-4">CampusLoop Technologies Pvt. Ltd. · Registered in India · CIN: U74999DL2024PTC123456</p>
        </div>
      ),
    },

    terms: {
      title: 'Terms & Conditions',
      content: (
        <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
          <p className="text-xs text-gray-400">Last updated: 1 August 2026 · Effective immediately</p>
          {[
            {
              title: '1. Eligibility',
              body: 'CampusLoop is available exclusively to students currently enrolled in a recognised college or university in India. By creating an account you confirm that you are at least 16 years old and hold a valid institutional email address.',
            },
            {
              title: '2. Listing Rules',
              body: 'All listings must be accurate, honest, and priced at a minimum of ₹200 for paid items. Items must be legal, owned by the seller/lender, and in the condition described. Prohibited items include weapons, controlled substances, counterfeit goods, and any item banned under Indian law.',
            },
            {
              title: '3. Lending & Borrowing',
              body: 'Borrowers must return items in the same condition by the agreed date. Late or damaged returns may result in deduction of Trust Points and suspension. Lenders earn 5–10 Trust Points per confirmed successful transaction. Trust Points are non-transferable and have no monetary value.',
            },
            {
              title: '4. Payments & Transactions',
              body: 'All payments are settled directly between buyers and sellers. CampusLoop does not process or hold funds. We recommend cash on campus or UPI. CampusLoop is not liable for any payment disputes, fraud, or non-delivery between users.',
            },
            {
              title: '5. Community Standards',
              body: 'Users of the Study Buddy and Gaming Partner features must engage respectfully. Harassment, discrimination, or spam will result in immediate account termination. CampusLoop reserves the right to remove any post or user at its discretion.',
            },
            {
              title: '6. Intellectual Property',
              body: 'Sharing pirated PDFs, photocopied textbooks, or any copyrighted material without the rights holder\'s permission is strictly prohibited and may expose you to legal liability under the Copyright Act, 1957.',
            },
            {
              title: '7. Limitation of Liability',
              body: 'CampusLoop provides a platform service only. We make no warranties regarding the quality, safety, or legality of listed items. Our maximum liability to any user is limited to ₹500.',
            },
            {
              title: '8. Account Termination',
              body: 'We may suspend or terminate accounts that violate these terms, receive multiple complaints, or remain inactive for over 12 months. You may delete your account at any time from your profile settings.',
            },
            {
              title: '9. Governing Law',
              body: 'These terms are governed by Indian law. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, India.',
            },
          ].map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-gray-900 mb-1">{section.title}</h3>
              <p>{section.body}</p>
            </div>
          ))}
          <p className="text-xs text-gray-400 border-t pt-4">For questions about these terms, email legal@campusloop.in</p>
        </div>
      ),
    },

    privacy: {
      title: 'Privacy Policy',
      content: (
        <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
          <p className="text-xs text-gray-400">Last updated: 1 August 2026</p>
          <p>CampusLoop Technologies Pvt. Ltd. ("we", "us") is committed to protecting your personal data. This policy explains what we collect, why, and how you can control it.</p>
          {[
            {
              title: 'Data We Collect',
              body: 'Name and institutional email address during registration. Campus and college name. Listings you create, messages you send, and community posts you make. Device information, IP address, and browsing behaviour on our platform (via cookies — see Cookie Policy). Payment references (not full payment details — we never store card or bank information).',
            },
            {
              title: 'Why We Collect It',
              body: 'To verify student eligibility and prevent fraud. To enable marketplace features (listing, messaging, trust scoring). To send important transactional emails (order updates, security alerts). To improve platform features through aggregated, anonymised analytics.',
            },
            {
              title: 'Who We Share It With',
              body: 'Other users: your name, campus, and public listings are visible to registered users. Service providers: cloud hosting (AWS Mumbai region), email delivery (Postmark), and analytics (self-hosted Plausible — no third-party ad trackers). Legal authorities: only when required by court order or applicable law. We never sell your data to advertisers.',
            },
            {
              title: 'Data Retention',
              body: 'Active account data is retained while your account is open. Deleted account data is purged within 30 days except where retention is required by law (e.g., financial records for 7 years under Indian accounting standards).',
            },
            {
              title: 'Your Rights',
              body: 'Under the Digital Personal Data Protection Act 2023 you have the right to access, correct, or erase your personal data. Submit requests to privacy@campusloop.in. We will respond within 30 days.',
            },
            {
              title: 'Security',
              body: 'We use TLS 1.3 encryption in transit and AES-256 at rest. Passwords are hashed with bcrypt. We conduct quarterly security reviews. If a breach occurs we will notify affected users within 72 hours.',
            },
          ].map((s) => (
            <div key={s.title}>
              <h3 className="font-semibold text-gray-900 mb-1">{s.title}</h3>
              <p>{s.body}</p>
            </div>
          ))}
          <p className="text-xs text-gray-400 border-t pt-4">Privacy Officer: Priya Nair · privacy@campusloop.in · +91 98765 43210</p>
        </div>
      ),
    },

    cookies: {
      title: 'Cookie Policy',
      content: (
        <div className="space-y-5 text-sm text-gray-700 leading-relaxed">
          <p>We use cookies and similar technologies to keep you signed in, remember your preferences, and understand how the platform is used.</p>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Types of Cookies We Use</h3>
            <div className="space-y-3">
              {[
                { type: 'Essential', desc: 'Required for login sessions and security. Cannot be disabled.', canDisable: false },
                { type: 'Functional', desc: 'Remember your preferred category, filter settings, and dark-mode preference.', canDisable: true },
                { type: 'Analytics', desc: 'Self-hosted Plausible analytics — page views and feature usage. No personal identifiers. No third-party sharing.', canDisable: true },
                { type: 'Marketing', desc: 'We do not use any advertising or retargeting cookies.', canDisable: false },
              ].map((c) => (
                <div key={c.type} className="flex items-start gap-3 bg-gray-50 rounded-lg p-3">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 text-xs">{c.type}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded font-medium flex-shrink-0 ${c.canDisable ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-200 text-gray-600'}`}>
                    {c.canDisable ? 'Optional' : 'Required'}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">How to Manage Cookies</h3>
            <p>You can clear or block cookies in your browser settings. Note that disabling functional cookies may affect your experience (e.g., you will be logged out on every visit). On mobile, you can clear app data from your device Settings → Apps → CampusLoop.</p>
          </div>
          <p className="text-xs text-gray-400 border-t pt-4">Questions? Email privacy@campusloop.in</p>
        </div>
      ),
    },

    faqs: {
      title: 'Frequently Asked Questions',
      content: (
        <div className="space-y-2">
          {[
            { q: 'Who can use CampusLoop?', a: 'Any student currently enrolled at a recognised college or university in India. You need a valid institutional (.ac.in) or personal email to register.' },
            { q: 'What is the minimum price for listings?', a: 'The minimum price for any paid listing (Sell or Buy) is ₹200. Lend and Free Share listings have no price requirement.' },
            { q: 'How do Trust Points work?', a: 'You earn 5–10 Trust Points for each successfully completed lending transaction (both parties confirm). Points unlock trust levels: New (0–19), Active (20–49), Reliable (50–99), and Trusted (100+). Higher trust levels give borrowers more confidence in your listings.' },
            { q: 'How does payment work?', a: 'Payments happen directly between buyer and seller — cash on campus or UPI are the most common methods. CampusLoop does not process or hold any funds.' },
            { q: 'What if a borrowed item is returned damaged?', a: 'Report it using the "Report an Issue" form within 48 hours of return. We will review the case and may deduct Trust Points from the borrower or restrict their account.' },
            { q: 'Can I list digital items like PDF notes?', a: 'Yes, under the "Free Share" type. You can share Google Drive links or similar. Do not share copyrighted PDFs or pirated textbooks — such listings will be removed.' },
            { q: 'How do I find a Study Buddy?', a: 'Switch to the Community tab, select "Study Buddy", and browse or post a request with your subject and availability. Respond to others or wait for responses to your own post.' },
            { q: 'Is there a mobile app?', a: 'A mobile app is currently in beta. Join the waitlist by emailing app@campusloop.in with your college name and phone model.' },
            { q: 'How do I delete my account?', a: 'Go to Profile → Settings → Delete Account. All your data will be erased within 30 days as per our Privacy Policy.' },
          ].map((faq, i) => (
            <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-900 pr-4">{faq.q}</span>
                {faqOpen === i ? <ChevronUp className="w-4 h-4 text-red-600 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />}
              </button>
              {faqOpen === i && (
                <div className="px-3.5 pb-3.5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-gray-50">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      ),
    },

    contact: {
      title: 'Contact Us',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: <Mail className="w-4 h-4 text-red-600" />, label: 'Email', value: 'support@campusloop.in' },
              { icon: <Phone className="w-4 h-4 text-red-600" />, label: 'Phone', value: '+91 98765 43210' },
              { icon: <MapPin className="w-4 h-4 text-red-600" />, label: 'Office', value: 'Hauz Khas, New Delhi – 110016' },
            ].map((item) => (
              <div key={item.label} className="bg-gray-50 rounded-lg p-3 flex items-start gap-2">
                <div className="mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase">{item.label}</p>
                  <p className="text-sm text-gray-900">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">Support hours: Monday–Friday, 9 AM – 6 PM IST. We aim to reply within 24 hours.</p>
          {contactSent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-800">Message sent!</p>
              <p className="text-sm text-green-600 mt-1">We will get back to you at {contactForm.email} within 24 hours.</p>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setContactSent(true); }}
              className="space-y-3"
            >
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Your Name</label>
                  <input required value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" placeholder="Rahul Mehta" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input required type="email" value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" placeholder="you@college.ac.in" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Subject</label>
                <input required value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300" placeholder="e.g. Issue with my listing" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea required value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} rows={4} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none" placeholder="Describe your question or issue in detail..." />
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded text-sm transition-colors">
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      ),
    },

    report: {
      title: 'Report an Issue',
      content: (
        <div className="space-y-5">
          <p className="text-sm text-gray-600">Help us keep CampusLoop safe. Reports are reviewed within 24 hours. False reports may result in account restrictions.</p>
          {reportSent ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-5 text-center">
              <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="font-semibold text-green-800">Report submitted!</p>
              <p className="text-sm text-green-600 mt-1">Our team will review your report and take action within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setReportSent(true); }} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Issue Type</label>
                <select
                  value={reportForm.type}
                  onChange={(e) => setReportForm({ ...reportForm, type: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                >
                  {['Incorrect Listing', 'Fraudulent User', 'Damaged Item Returned', 'Harassment / Abuse', 'Spam', 'Copyright Violation', 'Payment Dispute', 'Other'].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Your Email (for follow-up)</label>
                <input
                  required type="email"
                  value={reportForm.email}
                  onChange={(e) => setReportForm({ ...reportForm, email: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
                  placeholder="you@college.ac.in"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Describe the Issue</label>
                <textarea
                  required
                  value={reportForm.description}
                  onChange={(e) => setReportForm({ ...reportForm, description: e.target.value })}
                  rows={5}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300 resize-none"
                  placeholder="Include listing IDs, usernames, dates, and any other relevant details..."
                />
              </div>
              <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded text-sm transition-colors">
                SUBMIT REPORT
              </button>
            </form>
          )}
        </div>
      ),
    },

    track: {
      title: 'Track Your Order',
      content: (
        <div className="space-y-5">
          <p className="text-sm text-gray-600">Enter the order or transaction ID from your confirmation message to check the current status of your purchase or lending request.</p>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input
                value={trackId}
                onChange={(e) => { setTrackId(e.target.value); setTrackStatus(null); }}
                placeholder="e.g. CL-2026-00142"
                className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              />
            </div>
            <button
              onClick={() => setTrackStatus(trackId.startsWith('CL') ? 'found' : 'not-found')}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded text-sm transition-colors"
            >
              TRACK
            </button>
          </div>
          {trackStatus === 'found' && (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <p className="text-xs text-gray-500">Order ID</p>
                <p className="font-semibold text-gray-900">{trackId}</p>
              </div>
              <div className="p-4 space-y-4">
                {[
                  { label: 'Order Placed', date: '5 Aug 2026, 10:32 AM', done: true },
                  { label: 'Seller Confirmed', date: '5 Aug 2026, 2:15 PM', done: true },
                  { label: 'In Transit', date: '6 Aug 2026, 9:00 AM', done: true },
                  { label: 'Delivered', date: 'Expected 7 Aug 2026', done: false },
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 ${step.done ? 'bg-green-500' : 'bg-gray-200'}`}>
                      {step.done && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div>
                      <p className={`text-sm font-medium ${step.done ? 'text-gray-900' : 'text-gray-400'}`}>{step.label}</p>
                      <p className="text-xs text-gray-400">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {trackStatus === 'not-found' && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-800">Order not found</p>
                <p className="text-xs text-red-600 mt-0.5">Transaction IDs start with "CL-" followed by the year and a 5-digit number (e.g. CL-2026-00142). Check your confirmation message and try again.</p>
              </div>
            </div>
          )}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
            <HelpCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700">Can't find your order? <button onClick={() => onOpen('contact')} className="underline font-medium">Contact support</button> — we respond within 24 hours.</p>
          </div>
        </div>
      ),
    },
  };

  const current = pageContent[page];
  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl"
          initial={{ scale: 0.93, y: 24 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.93, y: 24 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 flex-shrink-0">
            <h2 className="text-base font-semibold text-gray-900">{current.title}</h2>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {/* Modal body */}
          <div className="overflow-y-auto flex-1 px-5 py-5">
            {current.content}
          </div>
          {/* Modal footer */}
          <div className="border-t border-gray-100 px-5 py-3 flex-shrink-0">
            <button
              onClick={onClose}
              className="w-full bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold py-2.5 rounded transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
