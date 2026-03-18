import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle, 
  XCircle, 
  Clock,
  Users,
  Calendar,
  Video,
  ChevronDown,
  AlertCircle,
  Sparkles,
  MessageSquare,
  Download,
  Mail,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2
} from 'lucide-react';
import { Sidebar } from './Sidebar';

interface AgendaItem {
  id: string;
  title: string;
  plannedDuration: number;
  actualDuration: number;
  status: 'completed' | 'partial' | 'skipped';
  description?: string;
  transcript?: string;
}

export function PostMeetingSummary() {
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'summary'>('overview');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const duration = 2700; // 45 minutes in seconds
  
  const agendaItems: AgendaItem[] = [
    {
      id: '1',
      title: 'Opening & Team Updates',
      plannedDuration: 10,
      actualDuration: 12,
      status: 'completed',
      description: 'Welcomed new team members and received department updates',
      transcript: 'Sarah Chen: Good morning everyone! Let\'s start with a quick round of introductions...'
    },
    {
      id: '2',
      title: 'Q1 Revenue Review',
      plannedDuration: 20,
      actualDuration: 25,
      status: 'completed',
      description: 'Analyzed Q1 sales performance, discussed revenue metrics and trends',
      transcript: 'Sarah Chen: Let\'s dive into the Q1 numbers. As you can see from the charts...'
    },
    {
      id: '3',
      title: 'Product Roadmap Discussion',
      plannedDuration: 15,
      actualDuration: 8,
      status: 'partial',
      description: 'Covered upcoming features but ran out of time for timeline planning',
      transcript: 'Mike Johnson: The new dashboard feature is almost ready for beta testing...'
    },
    {
      id: '4',
      title: 'Action Items & Next Steps',
      plannedDuration: 5,
      actualDuration: 0,
      status: 'skipped',
      description: 'Skipped due to time constraints - needs separate follow-up'
    },
  ];

  const totalPlanned = agendaItems.reduce((sum, item) => sum + item.plannedDuration, 0);
  const totalActual = agendaItems.reduce((sum, item) => sum + item.actualDuration, 0);
  const completedCount = agendaItems.filter(i => i.status === 'completed').length;
  const partialCount = agendaItems.filter(i => i.status === 'partial').length;
  const skippedCount = agendaItems.filter(i => i.status === 'skipped').length;

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'transcript', label: 'Transcript' },
    { id: 'summary', label: 'AI Summary' }
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleDownload = () => {
    // Simulated download
    alert('Summary downloaded as PDF!');
  };

  const handleEmailSend = (email: string) => {
    // Simulated email send
    alert(`Summary sent to ${email}!`);
    setShowEmailModal(false);
  };

  return (
    <div className="flex min-h-screen bg-gray-50 pb-24">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Q1 Strategy Review</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    <span>Mar 18, 2026 • 2:00 PM</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>{totalActual} minutes</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Video className="w-4 h-4" />
                    <span>Zoom</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>5 participants</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 border-b border-gray-200 -mb-px">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.id
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
              {/* Main Content */}
              <div className="space-y-6">
                {/* Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <h2 className="text-base font-semibold text-gray-900 mb-4">Meeting Stats</h2>
                  <div className="grid grid-cols-4 gap-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Duration</div>
                      <div className="text-2xl font-semibold text-gray-900">{totalActual}m</div>
                      <div className="text-xs text-gray-500 mt-1">of {totalPlanned}m planned</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Completed</div>
                      <div className="text-2xl font-semibold text-green-600">{completedCount}</div>
                      <div className="text-xs text-gray-500 mt-1">agenda items</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Partial</div>
                      <div className="text-2xl font-semibold text-yellow-600">{partialCount}</div>
                      <div className="text-xs text-gray-500 mt-1">need follow-up</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Skipped</div>
                      <div className="text-2xl font-semibold text-red-600">{skippedCount}</div>
                      <div className="text-xs text-gray-500 mt-1">not covered</div>
                    </div>
                  </div>
                </motion.div>

                {/* Agenda Items */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-xl border border-gray-200"
                >
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-base font-semibold text-gray-900">Agenda Breakdown</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-200">
                    {agendaItems.map((item, index) => {
                      const variance = item.actualDuration - item.plannedDuration;
                      
                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="p-6 hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            {/* Status Icon */}
                            <div className="flex-shrink-0 mt-1">
                              {item.status === 'completed' && (
                                <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center">
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                </div>
                              )}
                              {item.status === 'partial' && (
                                <div className="w-10 h-10 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                                </div>
                              )}
                              {item.status === 'skipped' && (
                                <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                                  <XCircle className="w-5 h-5 text-red-600" />
                                </div>
                              )}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-4 mb-2">
                                <div>
                                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                                  {item.description && (
                                    <p className="text-sm text-gray-600">{item.description}</p>
                                  )}
                                </div>
                                <span className={`flex-shrink-0 inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                                  item.status === 'completed' 
                                    ? 'bg-green-50 text-green-700 border border-green-200' :
                                  item.status === 'partial' 
                                    ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                                    'bg-red-50 text-red-700 border border-red-200'
                                }`}>
                                  {item.status === 'completed' && 'Completed'}
                                  {item.status === 'partial' && 'Needs Follow-up'}
                                  {item.status === 'skipped' && 'Skipped'}
                                </span>
                              </div>

                              <div className="flex items-center gap-4 text-sm mt-3">
                                <div className="flex items-center gap-1.5 text-gray-500">
                                  <Clock className="w-4 h-4" />
                                  <span>Planned: <span className="font-medium text-gray-900">{item.plannedDuration}m</span></span>
                                </div>
                                
                                {item.status !== 'skipped' && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-gray-500">
                                      Actual: <span className={`font-medium ${
                                        variance > 0 ? 'text-orange-600' : 
                                        variance < 0 ? 'text-green-600' : 'text-gray-900'
                                      }`}>
                                        {item.actualDuration}m
                                      </span>
                                    </span>
                                  </>
                                )}
                                
                                {item.status !== 'skipped' && variance !== 0 && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className={`text-sm font-medium ${
                                      variance > 0 ? 'text-orange-600' : 'text-green-600'
                                    }`}>
                                      {variance > 0 ? '+' : ''}{variance}m
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <aside className="space-y-6">
                {/* AI Insights */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-base font-semibold text-gray-900">AI Insights</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-gray-700">
                    <li className="flex items-start gap-2 p-3 bg-green-50 border border-green-100 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Meeting ran efficiently with good time management</span>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-100 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span>Product Roadmap needs 15-20 min follow-up session</span>
                    </li>
                    <li className="flex items-start gap-2 p-3 bg-purple-50 border border-purple-100 rounded-lg">
                      <Sparkles className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <span>Schedule Action Items as recurring agenda item</span>
                    </li>
                  </ul>
                </motion.div>

                {/* Attendees */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-gray-900">Attendees</h3>
                    <span className="text-sm text-gray-500">5 people</span>
                  </div>
                  <div className="space-y-3">
                    {['Sarah Chen', 'Mike Johnson', 'Emily Davis', 'Alex Kim', 'Jordan Lee'].map((name, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-semibold">
                          {name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900">{name}</div>
                        </div>
                        {i === 0 && (
                          <span className="text-xs px-2 py-0.5 bg-purple-50 text-purple-700 rounded">Host</span>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </aside>
            </div>
          )}

          {activeTab === 'transcript' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-purple-600" />
                <h2 className="text-base font-semibold text-gray-900">Meeting Transcript</h2>
              </div>
              
              <div className="space-y-6">
                {agendaItems.filter(item => item.transcript).map((item, index) => (
                  <div key={item.id} className="pb-6 border-b border-gray-200 last:border-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                        SC
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">Sarah Chen</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{item.title}</span>
                          <span className="text-xs text-gray-500">•</span>
                          <span className="text-xs text-gray-500">{item.actualDuration}m</span>
                        </div>
                        <p className="text-sm text-gray-700 leading-relaxed">{item.transcript}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'summary' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-gray-200 p-8"
            >
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-base font-semibold text-gray-900">AI-Generated Summary</h2>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Key Takeaways</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>Q1 revenue exceeded targets by 12%, with strong performance in enterprise segment</li>
                    <li>New team members successfully onboarded across engineering and sales departments</li>
                    <li>Product roadmap for Q2 includes dashboard redesign and mobile app beta launch</li>
                    <li>Need to schedule dedicated session for action item planning and assignment</li>
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Action Items</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <ChevronDown className="w-4 h-4 text-purple-600 mt-0.5" />
                      <span><strong>Sarah:</strong> Schedule follow-up for Product Roadmap (20 min)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronDown className="w-4 h-4 text-purple-600 mt-0.5" />
                      <span><strong>Mike:</strong> Prepare detailed timeline for dashboard redesign by Friday</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronDown className="w-4 h-4 text-purple-600 mt-0.5" />
                      <span><strong>Emily:</strong> Share Q1 revenue analysis deck with leadership team</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-3">Next Steps</h3>
                  <p className="text-sm text-gray-700">
                    Schedule a dedicated 30-minute session for Product Roadmap planning and Action Items review. 
                    Consider adding a standing agenda item for action item review at the end of future meetings.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Audio Player */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 z-50">
        <div className="px-8 py-4">
          {/* Action Buttons Row */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={handleDownload}
              className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <Download className="w-4 h-4" />
              Download Summary
            </button>
            <button
              onClick={() => setShowEmailModal(true)}
              className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
            >
              <Mail className="w-4 h-4" />
              Email Summary
            </button>
          </div>

          {/* Audio Player */}
          <div className="flex items-center gap-4">
            {/* Play Controls */}
            <div className="flex items-center gap-2">
              <button className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors flex items-center justify-center">
                <SkipBack className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors flex items-center justify-center shadow-sm"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-white" />
                ) : (
                  <Play className="w-5 h-5 text-white ml-0.5" />
                )}
              </button>
              <button className="w-9 h-9 rounded-lg bg-gray-100 hover:bg-gray-200 border border-gray-300 transition-colors flex items-center justify-center">
                <SkipForward className="w-4 h-4 text-gray-700" />
              </button>
            </div>

            {/* Time Display */}
            <div className="text-sm text-gray-600 font-mono tabular-nums min-w-[80px]">
              {formatTime(currentTime)}
            </div>

            {/* Progress Bar */}
            <div className="flex-1">
              <div className="relative group">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden cursor-pointer">
                  <div
                    className="h-full bg-purple-600 rounded-full transition-all"
                    style={{ width: `${(currentTime / duration) * 100}%` }}
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(parseInt(e.target.value))}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                />
              </div>
            </div>

            {/* Duration */}
            <div className="text-sm text-gray-600 font-mono tabular-nums min-w-[80px] text-right">
              {formatTime(duration)}
            </div>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600 rounded-full" style={{ width: '70%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowEmailModal(false)}>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl border border-gray-200 p-6 max-w-md w-full mx-4 shadow-2xl"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Email Summary</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  defaultValue="sarah.chen@company.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Include</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span>AI Summary</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span>Full Transcript</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span>Audio Recording</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => handleEmailSend('sarah.chen@company.com')}
                  className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                >
                  Send Email
                </button>
                <button
                  onClick={() => setShowEmailModal(false)}
                  className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}