import { ShoppingBag, Users } from 'lucide-react';
import { motion } from 'motion/react';

interface TabNavigationProps {
  activeTab: 'marketplace' | 'community';
  onTabChange: (tab: 'marketplace' | 'community') => void;
}

export function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  return (
    <div className="bg-white/80 backdrop-blur-md border-b sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-8 relative">
          <motion.button
            onClick={() => onTabChange('marketplace')}
            className={`flex items-center gap-2 py-4 transition-colors relative ${
              activeTab === 'marketplace' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingBag className="w-5 h-5" />
            <span>Marketplace</span>
            {activeTab === 'marketplace' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
          <motion.button
            onClick={() => onTabChange('community')}
            className={`flex items-center gap-2 py-4 transition-colors relative ${
              activeTab === 'community' ? 'text-blue-600' : 'text-gray-500 hover:text-gray-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Users className="w-5 h-5" />
            <span>Study & Gaming</span>
            {activeTab === 'community' && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600"
                layoutId="activeTab"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
