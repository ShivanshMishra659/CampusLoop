import { MessageCircle, Clock, BookOpen, Gamepad2 } from 'lucide-react';
import { motion } from 'motion/react';

export interface CommunityRequest {
  id: string;
  title: string;
  description: string;
  type: 'Study Buddy' | 'Gaming Partner';
  subject?: string;
  game?: string;
  author: string;
  timestamp: string;
  responses: number;
}

export function CommunityCard({ request, onRespond, responded }: { request: CommunityRequest; onRespond: () => void; responded: boolean }) {
  const isStudy = request.type === 'Study Buddy';

  return (
    <motion.div
      className="bg-white border border-gray-200 rounded overflow-hidden"
      whileHover={{
        scale: 1.01,
        boxShadow: '0 8px 32px rgba(211,47,47,0.12), 0 2px 8px rgba(0,0,0,0.08)',
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      <div className="p-4">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-semibold ${
                isStudy ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
              }`}
            >
              {isStudy ? <BookOpen className="w-3 h-3" /> : <Gamepad2 className="w-3 h-3" />}
              {request.type}
            </span>
            {(request.subject || request.game) && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium border border-gray-200">
                {request.subject || request.game}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-gray-400 text-xs">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{request.responses} responses</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-gray-900 mb-1.5 line-clamp-2 leading-snug">
          {request.title}
        </h3>
        <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed">{request.description}</p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                isStudy ? 'bg-blue-500' : 'bg-purple-500'
              }`}
            >
              {request.author[0].toUpperCase()}
            </div>
            <div>
              <p className="text-xs font-medium text-gray-800">{request.author}</p>
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-2.5 h-2.5" />
                <span>{request.timestamp}</span>
              </div>
            </div>
          </div>
          <motion.button
            className="bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded hover:bg-red-700 disabled:bg-gray-400 transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onRespond}
            disabled={responded}
          >
            {responded ? 'RESPONDED' : 'RESPOND'}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
