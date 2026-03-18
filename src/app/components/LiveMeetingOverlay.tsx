import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  CheckCircle, 
  SkipForward, 
  Plus,
  X,
  Circle,
  Video,
  Users,
  Link as LinkIcon,
  Sparkles,
  Home
} from 'lucide-react';
import { Link } from 'react-router';

interface AgendaItem {
  id: string;
  title: string;
  duration: number;
  status: 'pending' | 'active' | 'completed' | 'skipped';
  timeSpent: number;
}

export function LiveMeetingOverlay() {
  const [showAgenda, setShowAgenda] = useState(false);
  const [items, setItems] = useState<AgendaItem[]>([
    {
      id: '1',
      title: 'Opening & Team Updates',
      duration: 10,
      status: 'completed',
      timeSpent: 12,
    },
    {
      id: '2',
      title: 'Q1 Revenue Review',
      duration: 20,
      status: 'active',
      timeSpent: 0,
    },
    {
      id: '3',
      title: 'Product Roadmap Discussion',
      duration: 15,
      status: 'pending',
      timeSpent: 0,
    },
    {
      id: '4',
      title: 'Action Items & Next Steps',
      duration: 5,
      status: 'pending',
      timeSpent: 0,
    },
  ]);

  const [elapsedTime, setElapsedTime] = useState(732);
  const currentIndex = items.findIndex(item => item.status === 'active');
  const currentItem = items[currentIndex];

  const isOnTrack = elapsedTime <= (currentItem?.duration || 0) * 60;

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const completeItem = () => {
    if (currentIndex === -1) return;
    const updated = [...items];
    updated[currentIndex].status = 'completed';
    updated[currentIndex].timeSpent = elapsedTime;
    if (currentIndex + 1 < items.length) {
      updated[currentIndex + 1].status = 'active';
    }
    setItems(updated);
    setElapsedTime(0);
  };

  const skipItem = () => {
    if (currentIndex === -1) return;
    const updated = [...items];
    updated[currentIndex].status = 'skipped';
    if (currentIndex + 1 < items.length) {
      updated[currentIndex + 1].status = 'active';
    }
    setItems(updated);
    setElapsedTime(0);
  };

  const extendTime = () => {
    if (currentIndex === -1) return;
    const updated = [...items];
    updated[currentIndex].duration += 5;
    setItems(updated);
  };

  const allComplete = items.every(item => item.status === 'completed' || item.status === 'skipped');

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 relative overflow-hidden">
      {/* Simulated Video Call Background */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-br from-gray-200 via-gray-100 to-blue-50 flex items-center justify-center">
          <div className="text-center space-y-6 opacity-40">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 mx-auto flex items-center justify-center text-6xl">
              🎥
            </div>
            <div className="text-xl text-gray-600">Zoom Meeting in Progress</div>
            <div className="text-sm text-gray-500">Q1 Strategy Review • 5 participants</div>
          </div>
        </div>
        
        {/* Simulated participant thumbnails */}
        <div className="absolute bottom-6 right-6 flex gap-3">
          {['#3b82f6', '#8b5cf6', '#ec4899'].map((color, i) => (
            <div
              key={i}
              className="w-24 h-24 rounded-lg border-2 border-white shadow-lg bg-white/50"
              style={{ borderColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Fireflies Trigger Button - Bottom Left */}
      {!showAgenda && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setShowAgenda(true)}
          className="absolute bottom-6 left-6 z-50 px-5 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-full shadow-2xl shadow-purple-500/30 transition-all flex items-center gap-2.5 group"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          <span className="font-medium">Show Fireflies Agenda</span>
        </motion.button>
      )}

      {/* Fireflies Agenda Overlay */}
      <AnimatePresence>
        {showAgenda && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="absolute top-6 left-1/2 -translate-x-1/2 z-50 w-[900px]"
          >
            <div className="bg-white backdrop-blur-xl border border-gray-200 rounded-xl shadow-2xl overflow-hidden">
              {/* Header with Meeting Info */}
              <div className="px-6 py-3 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <div className="flex items-center gap-3">
                  {/* Fireflies Logo */}
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shadow-sm">
                    <Sparkles className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="text-sm font-semibold text-gray-900">Fireflies Agenda Tracker</div>
                  
                  <div className="w-px h-4 bg-gray-300 ml-2"></div>
                  
                  {/* Meeting Metadata */}
                  <div className="flex items-center gap-3 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5" />
                      <span>Zoom</span>
                    </div>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5" />
                      <span>Sarah Chen (Host)</span>
                    </div>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowAgenda(false)}
                  className="w-7 h-7 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Timeline */}
              <div className="px-6 py-4 bg-white">
                <div className="flex items-center gap-3">
                  {/* Timeline Items */}
                  {items.map((item, index) => {
                    const itemProgress = item.status === 'active' 
                      ? (elapsedTime / (item.duration * 60)) * 100
                      : item.status === 'completed' ? 100 : 0;

                    return (
                      <div key={item.id} className="flex items-center gap-3">
                        {/* Item Dot/Circle */}
                        <div className="relative group">
                          <motion.div
                            className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                              item.status === 'active'
                                ? 'bg-purple-600 border-purple-600 shadow-lg shadow-purple-500/30'
                                : item.status === 'completed'
                                ? 'bg-green-50 border-green-500'
                                : item.status === 'skipped'
                                ? 'bg-red-50 border-red-400'
                                : 'bg-gray-50 border-gray-300'
                            }`}
                          >
                            {item.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                            {item.status === 'active' && <Circle className="w-4 h-4 text-white fill-white" />}
                            {item.status === 'skipped' && <X className="w-4 h-4 text-red-500" />}
                            {item.status === 'pending' && <div className="text-xs text-gray-500 font-medium">{index + 1}</div>}
                          </motion.div>

                          {/* Progress Ring for Active Item */}
                          {item.status === 'active' && (
                            <svg className="absolute inset-0 w-10 h-10 -rotate-90">
                              <circle
                                cx="20"
                                cy="20"
                                r="18"
                                stroke={isOnTrack ? '#9333ea' : '#ef4444'}
                                strokeWidth="3"
                                fill="none"
                                strokeDasharray={`${itemProgress * 1.13} 113`}
                                className="transition-all duration-300"
                              />
                            </svg>
                          )}

                          {/* Tooltip */}
                          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                            <div className="bg-gray-900 backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-xs shadow-xl">
                              <div className="text-white font-medium mb-0.5">{item.title}</div>
                              <div className="text-gray-400">{item.duration} min</div>
                            </div>
                          </div>
                        </div>

                        {/* Connector Line */}
                        {index < items.length - 1 && (
                          <div className={`h-px flex-1 min-w-[60px] ${
                            item.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                    );
                  })}

                  {/* Spacer */}
                  <div className="flex-1"></div>

                  {/* Timer & Controls */}
                  <div className="flex items-center gap-2">
                    {/* Current Timer */}
                    {currentItem && (
                      <div className={`px-4 py-2 rounded-lg ${
                        isOnTrack 
                          ? 'bg-purple-50 border border-purple-200'
                          : 'bg-red-50 border border-red-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          <Clock className={`w-4 h-4 ${isOnTrack ? 'text-purple-600' : 'text-red-500'}`} />
                          <span className={`text-lg font-semibold tabular-nums ${
                            isOnTrack ? 'text-purple-600' : 'text-red-500'
                          }`}>
                            {formatTime(elapsedTime)}
                          </span>
                          <span className="text-sm text-gray-500">/ {currentItem.duration}m</span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={extendTime}
                        disabled={!currentItem}
                        className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed group"
                        title="Extend +5 min"
                      >
                        <Plus className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                      </button>
                      
                      <button
                        onClick={skipItem}
                        disabled={!currentItem}
                        className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed group"
                        title="Skip"
                      >
                        <SkipForward className="w-4 h-4 text-gray-600 group-hover:text-gray-900" />
                      </button>
                      
                      <button
                        onClick={completeItem}
                        disabled={!currentItem}
                        className="w-9 h-9 rounded-lg bg-green-50 hover:bg-green-100 border border-green-300 transition-all flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed group"
                        title="Complete"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Current Item Label */}
                {currentItem && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-3 text-center"
                  >
                    <div className="text-xs text-gray-500 mb-0.5">Now discussing</div>
                    <div className="text-sm font-medium text-gray-900">{currentItem.title}</div>
                  </motion.div>
                )}

                {/* Completion Message */}
                {allComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-3 flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-600 font-medium">All agenda items complete</span>
                    <Link
                      to="/summary"
                      className="ml-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-xs transition-all font-medium"
                    >
                      View Summary
                    </Link>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {showAgenda && (
        <div className="absolute bottom-6 left-6 z-40">
          <Link
            to="/summary"
            className="text-xs text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg border border-gray-300 shadow-sm"
          >
            End meeting
          </Link>
        </div>
      )}
    </div>
  );
}