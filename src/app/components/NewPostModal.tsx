import { X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface NewPostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  postType: 'marketplace' | 'community';
}

export function NewPostModal({ isOpen, onClose, onSubmit, postType }: NewPostModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Books',
    type: postType === 'marketplace' ? 'Sell' : 'Study Buddy',
    price: '',
    subject: '',
    game: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      title: '',
      description: '',
      category: 'Books',
      type: postType === 'marketplace' ? 'Sell' : 'Study Buddy',
      price: '',
      subject: '',
      game: '',
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl">
              {postType === 'marketplace' ? 'New Marketplace Post' : 'New Request'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 h-32 resize-none"
                required
              />
            </div>
            {postType === 'marketplace' ? (
              <>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Sell</option>
                    <option>Buy</option>
                    <option>Lend</option>
                    <option>Share</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Books</option>
                    <option>Lab Equipment</option>
                    <option>Stationery</option>
                    <option>Electronics</option>
                    <option>Clothing</option>
                    <option>Other</option>
                  </select>
                </div>
                {(formData.type === 'Sell' || formData.type === 'Buy') && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Price (₹)</label>
                    <input
                      type="number"
                      min={200}
                      required
                      placeholder="Minimum ₹200"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm text-gray-600 mb-2">Request Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    <option>Study Buddy</option>
                    <option>Gaming Partner</option>
                  </select>
                </div>
                {formData.type === 'Study Buddy' && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g., Calculus, Chemistry, Physics"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}
                {formData.type === 'Gaming Partner' && (
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Game</label>
                    <input
                      type="text"
                      value={formData.game}
                      onChange={(e) => setFormData({ ...formData, game: e.target.value })}
                      placeholder="e.g., Valorant, League of Legends"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                )}
              </>
            )}
            <div className="flex gap-3 pt-4">
              <motion.button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg shadow-lg"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 30px rgba(211, 47, 47, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Post
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
}
