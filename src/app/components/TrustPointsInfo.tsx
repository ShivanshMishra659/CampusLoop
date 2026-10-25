import { Award, CheckCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

export function TrustPointsInfo() {
  return (
    <motion.div
      className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-lg p-6 border border-amber-200 shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        className="flex items-center gap-2 mb-4"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      >
        <Award className="w-6 h-6 text-amber-600" />
        <h3 className="text-lg">Trust Points System</h3>
      </motion.div>
      <p className="text-sm text-gray-700 mb-4">
        Build your reputation by lending and sharing items with fellow students. Trust points are awarded for successful lending transactions.
      </p>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm"><span className="font-semibold">New (0-19 pts)</span> - Just getting started</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm"><span className="font-semibold">Active (20-49 pts)</span> - Regular community member</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm"><span className="font-semibold">Reliable (50-99 pts)</span> - Proven track record</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm"><span className="font-semibold">Trusted (100+ pts)</span> - Community champion</p>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-amber-200">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span>Earn 5-10 points for each successful lending transaction</span>
        </div>
      </div>
    </motion.div>
  );
}
