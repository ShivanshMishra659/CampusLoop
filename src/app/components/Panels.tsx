import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingCart, Heart, CheckCircle, Award, Star } from 'lucide-react';
import type { MarketplaceItem } from './MarketplaceCard';
import type { CommunityRequest } from './CommunityCard';

export function Drawer({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.aside
            className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-base font-semibold text-gray-900">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            {children}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Dialog({ open, onClose, title, children, maxW = 'max-w-md' }: { open: boolean; onClose: () => void; title: string; children: ReactNode; maxW?: string }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`bg-white rounded-xl w-full ${maxW} max-h-[88vh] overflow-y-auto shadow-2xl`}
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 sticky top-0 bg-white z-10">
              <h2 className="text-base font-semibold text-gray-900">{title}</h2>
              <button onClick={onClose} aria-label="Close" className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls = 'w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-300';
const primaryBtn = 'w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 rounded text-sm transition-colors';

export function CartPanel({
  open, onClose, items, onRemove, onBrowse,
}: { open: boolean; onClose: () => void; items: MarketplaceItem[]; onRemove: (id: string) => void; onBrowse: () => void }) {
  const [orderId, setOrderId] = useState<string | null>(null);
  const [paidTotal, setPaidTotal] = useState(0);
  const total = items.reduce((s, i) => s + (i.price ?? 0), 0);

  const checkout = () => {
    setPaidTotal(total);
    setOrderId(`CL-2026-${String(Math.floor(10000 + Math.random() * 89999))}`);
    items.forEach((i) => onRemove(i.id));
  };

  const close = () => { setOrderId(null); onClose(); };

  return (
    <Drawer open={open} onClose={close} title={orderId ? 'Order placed' : `Your Cart (${items.length})`}>
      {orderId ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
          <CheckCircle className="w-14 h-14 text-green-500" />
          <p className="text-lg font-semibold text-gray-900">Thanks! Your order is placed.</p>
          <p className="text-sm text-gray-600">Order ID <span className="font-semibold text-gray-900">{orderId}</span></p>
          <p className="text-sm text-gray-600">Amount to settle with sellers: <span className="font-semibold">₹{paidTotal}</span> (cash or UPI on campus)</p>
          <p className="text-xs text-gray-400">Use this ID in Track Order from the footer.</p>
          <button onClick={close} className={`${primaryBtn} mt-3`}>CONTINUE BROWSING</button>
        </div>
      ) : items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
          <ShoppingCart className="w-12 h-12 text-gray-300" />
          <p className="font-medium text-gray-900">Your cart is empty</p>
          <p className="text-sm text-gray-500">Add textbooks, lab coats or calculators from the marketplace.</p>
          <button onClick={() => { onClose(); onBrowse(); }} className={`${primaryBtn} mt-2`}>BROWSE MARKETPLACE</button>
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
            {items.map((i) => (
              <li key={i.id} className="flex gap-3 p-4">
                <img src={i.image} alt={i.title} className="w-16 h-20 object-cover rounded border border-gray-200" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">{i.title}</p>
                  <p className="text-xs text-gray-500">Seller: {i.author}</p>
                  <p className="text-sm font-bold text-gray-900 mt-1">₹{i.price}</p>
                </div>
                <button onClick={() => onRemove(i.id)} aria-label="Remove" className="self-start p-1.5 text-gray-400 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
          <div className="border-t border-gray-200 p-4 space-y-3">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Subtotal</span><span className="font-bold text-gray-900">₹{total}</span></div>
            <p className="text-xs text-gray-400">Payment is settled directly with each seller. CampusLoop never holds funds.</p>
            <button onClick={checkout} className={primaryBtn}>PLACE ORDER</button>
          </div>
        </>
      )}
    </Drawer>
  );
}

export function WishlistPanel({
  open, onClose, items, cartIds, onRemove, onAddToCart, onView, onBrowse,
}: {
  open: boolean; onClose: () => void; items: MarketplaceItem[]; cartIds: Set<string>;
  onRemove: (id: string) => void; onAddToCart: (item: MarketplaceItem) => void; onView: (item: MarketplaceItem) => void; onBrowse: () => void;
}) {
  return (
    <Drawer open={open} onClose={onClose} title={`Wishlist (${items.length})`}>
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-3">
          <Heart className="w-12 h-12 text-gray-300" />
          <p className="font-medium text-gray-900">Nothing saved yet</p>
          <p className="text-sm text-gray-500">Tap the heart on any listing to save it here.</p>
          <button onClick={() => { onClose(); onBrowse(); }} className={`${primaryBtn} mt-2`}>BROWSE MARKETPLACE</button>
        </div>
      ) : (
        <ul className="flex-1 overflow-y-auto divide-y divide-gray-100">
          {items.map((i) => (
            <li key={i.id} className="flex gap-3 p-4">
              <img src={i.image} alt={i.title} className="w-16 h-20 object-cover rounded border border-gray-200" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 line-clamp-2">{i.title}</p>
                <p className="text-sm font-bold text-gray-900 mt-0.5">{i.price ? `₹${i.price}` : 'Free'}</p>
                <div className="flex gap-2 mt-2">
                  {i.type === 'Sell' ? (
                    <button
                      onClick={() => onAddToCart(i)}
                      disabled={cartIds.has(i.id)}
                      className="text-xs font-semibold bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700 disabled:bg-gray-300"
                    >
                      {cartIds.has(i.id) ? 'IN CART' : 'ADD TO CART'}
                    </button>
                  ) : (
                    <button onClick={() => onView(i)} className="text-xs font-semibold bg-red-600 text-white px-3 py-1.5 rounded hover:bg-red-700">VIEW</button>
                  )}
                  <button onClick={() => onRemove(i.id)} className="text-xs font-medium text-gray-500 hover:text-red-600 px-2">Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Drawer>
  );
}

export function SignInDialog({ open, onClose, onSignIn }: { open: boolean; onClose: () => void; onSignIn: (name: string) => void }) {
  const [mode, setMode] = useState<'in' | 'up'>('in');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const display = name.trim() || email.split('@')[0].replace(/[._]/g, ' ');
    onSignIn(display.replace(/\b\w/g, (c) => c.toUpperCase()));
    setName(''); setEmail(''); setPassword('');
  };

  return (
    <Dialog open={open} onClose={onClose} title={mode === 'in' ? 'Sign in to CampusLoop' : 'Create your account'}>
      <form onSubmit={submit} className="space-y-3">
        {mode === 'up' && (
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Full name</label>
            <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Your name" />
          </div>
        )}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">College email</label>
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="you@college.ac.in" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <input required type="password" minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="At least 6 characters" />
        </div>
        <button type="submit" className={primaryBtn}>{mode === 'in' ? 'SIGN IN' : 'CREATE ACCOUNT'}</button>
        <p className="text-xs text-center text-gray-500">
          {mode === 'in' ? 'New to CampusLoop?' : 'Already have an account?'}{' '}
          <button type="button" onClick={() => setMode(mode === 'in' ? 'up' : 'in')} className="text-red-600 font-semibold hover:underline">
            {mode === 'in' ? 'Create an account' : 'Sign in'}
          </button>
        </p>
      </form>
    </Dialog>
  );
}

export function RespondDialog({
  request, onClose, onSubmit, userName,
}: { request: CommunityRequest | null; onClose: () => void; onSubmit: (id: string) => void; userName: string | null }) {
  const [msg, setMsg] = useState('');
  return (
    <Dialog open={!!request} onClose={onClose} title="Respond to request">
      {request && (
        <form
          onSubmit={(e) => { e.preventDefault(); onSubmit(request.id); setMsg(''); }}
          className="space-y-3"
        >
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-xs text-gray-500">{request.type} · {request.author}</p>
            <p className="text-sm font-semibold text-gray-900">{request.title}</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Your message{userName ? ` (as ${userName})` : ''}</label>
            <textarea
              required rows={4} value={msg} onChange={(e) => setMsg(e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder={request.type === 'Study Buddy' ? 'Hi! I can help with this. I am free on...' : 'Hey, I would love to team up. My rank / handle is...'}
            />
          </div>
          <button type="submit" className={primaryBtn}>SEND RESPONSE</button>
        </form>
      )}
    </Dialog>
  );
}

export function ItemDialog({
  item, onClose, wishlisted, onToggleWish, inCart, requested, onAction, ctaLabel,
}: {
  item: MarketplaceItem | null; onClose: () => void; wishlisted: boolean; onToggleWish: () => void;
  inCart: boolean; requested: boolean; onAction: () => void; ctaLabel: string;
}) {
  return (
    <Dialog open={!!item} onClose={onClose} title="Listing details" maxW="max-w-2xl">
      {item && (
        <div className="grid sm:grid-cols-[220px_1fr] gap-5">
          <img src={item.image} alt={item.title} className="w-full aspect-[3/4] object-cover rounded border border-gray-200" />
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">{item.category} · {item.type}</span>
            <h3 className="text-lg font-semibold text-gray-900 mt-1 leading-snug">{item.title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.description}</p>
            <p className="text-xs text-gray-500 mt-3">Listed by <span className="font-medium text-gray-800">{item.author}</span> · {item.timestamp}</p>
            {item.authorTrustPoints !== undefined && (
              <p className="text-xs text-gray-600 mt-1 flex items-center gap-1"><Award className="w-3 h-3 text-amber-500" />{item.authorTrustPoints} trust points</p>
            )}
            {item.rating && (
              <p className="text-xs text-gray-600 mt-1 flex items-center gap-1"><Star className="w-3 h-3 fill-amber-400 text-amber-400" />{item.rating} ({item.ratingCount} ratings)</p>
            )}
            <p className="text-xl font-bold text-gray-900 mt-4">{item.price ? `₹${item.price}` : 'Free'}</p>
            <div className="flex gap-2 mt-4">
              <button onClick={onAction} disabled={requested} className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-gray-300 text-white text-sm font-semibold py-2.5 rounded transition-colors">
                {inCart ? 'VIEW CART' : requested ? 'REQUESTED' : ctaLabel}
              </button>
              <button onClick={onToggleWish} aria-label="Wishlist" className="border border-gray-300 rounded px-3 hover:bg-gray-50">
                <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-600 text-red-600' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}

export function TrustDialog({ open, onClose, points }: { open: boolean; onClose: () => void; points: number }) {
  const levels = [
    { label: 'New', range: '0–19 pts', cls: 'bg-gray-100 text-gray-700 border-gray-300' },
    { label: 'Active', range: '20–49 pts', cls: 'bg-purple-50 text-purple-700 border-purple-300' },
    { label: 'Reliable', range: '50–99 pts', cls: 'bg-blue-50 text-blue-700 border-blue-300' },
    { label: 'Trusted', range: '100+ pts', cls: 'bg-green-50 text-green-700 border-green-300' },
  ];
  const current = points >= 100 ? 'Trusted' : points >= 50 ? 'Reliable' : points >= 20 ? 'Active' : 'New';
  return (
    <Dialog open={open} onClose={onClose} title="Your Trust Points">
      <div className="text-center mb-4">
        <p className="text-4xl font-bold text-gray-900">{points}</p>
        <p className="text-sm text-gray-500">Current level: <span className="font-semibold text-gray-900">{current}</span></p>
      </div>
      <div className="space-y-2 mb-4">
        {levels.map((l) => (
          <div key={l.label} className={`flex items-center justify-between border rounded px-3 py-2 text-sm ${l.cls} ${l.label === current ? 'ring-2 ring-red-300' : ''}`}>
            <span className="font-semibold">{l.label}</span><span>{l.range}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500">Earn 5–10 points for every successful lend or borrow, confirmed by both students.</p>
    </Dialog>
  );
}
