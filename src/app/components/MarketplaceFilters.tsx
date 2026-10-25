import { motion } from 'motion/react';

interface MarketplaceFiltersProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedType: string;
  onTypeChange: (type: string) => void;
}

const categories = ['All', 'Books', 'Lab Equipment', 'Stationery', 'Electronics', 'Other'];
const types = ['All', 'Sell', 'Buy', 'Lend', 'Share'];

export function MarketplaceFilters({
  selectedCategory,
  onCategoryChange,
  selectedType,
  onTypeChange,
}: MarketplaceFiltersProps) {
  return (
    <motion.div
      className="bg-white/90 backdrop-blur-sm p-4 rounded-lg border space-y-4 shadow-lg"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm text-gray-600 mb-2">Type</h3>
        <div className="flex flex-wrap gap-2">
          {types.map((type) => (
            <motion.button
              key={type}
              onClick={() => onTypeChange(type)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                selectedType === type
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {type}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
