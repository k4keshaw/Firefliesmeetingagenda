import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter,
  Calendar,
  Clock,
  Users,
  Video,
  CheckCircle,
  AlertCircle,
  XCircle,
  ChevronDown,
  Download,
  Trash2,
  Star
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { Link } from 'react-router';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number;
  platform: string;
  participants: number;
  status: 'completed' | 'partial' | 'cancelled';
  host: string;
  agendaItems: number;
  completedItems: number;
  starred: boolean;
}

export function MeetingHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'completed' | 'partial' | 'cancelled'>('all');

  const meetings: Meeting[] = [
    {
      id: '1',
      title: 'Q1 Strategy Review',
      date: 'Mar 18, 2026',
      time: '2:00 PM',
      duration: 45,
      platform: 'Zoom',
      participants: 5,
      status: 'completed',
      host: 'Sarah Chen',
      agendaItems: 4,
      completedItems: 3,
      starred: true
    },
    {
      id: '2',
      title: 'Product Design Sync',
      date: 'Mar 17, 2026',
      time: '10:30 AM',
      duration: 30,
      platform: 'Google Meet',
      participants: 8,
      status: 'completed',
      host: 'Mike Johnson',
      agendaItems: 3,
      completedItems: 3,
      starred: false
    },
    {
      id: '3',
      title: 'Engineering Sprint Planning',
      date: 'Mar 15, 2026',
      time: '9:00 AM',
      duration: 60,
      platform: 'Microsoft Teams',
      participants: 12,
      status: 'partial',
      host: 'Emily Davis',
      agendaItems: 5,
      completedItems: 3,
      starred: true
    },
    {
      id: '4',
      title: 'Client Presentation - Acme Corp',
      date: 'Mar 14, 2026',
      time: '3:00 PM',
      duration: 40,
      platform: 'Zoom',
      participants: 6,
      status: 'completed',
      host: 'Alex Kim',
      agendaItems: 4,
      completedItems: 4,
      starred: false
    },
    {
      id: '5',
      title: 'Marketing Campaign Review',
      date: 'Mar 13, 2026',
      time: '11:00 AM',
      duration: 35,
      platform: 'Zoom',
      participants: 7,
      status: 'cancelled',
      host: 'Jordan Lee',
      agendaItems: 3,
      completedItems: 0,
      starred: false
    },
    {
      id: '6',
      title: 'Sales Kickoff Meeting',
      date: 'Mar 11, 2026',
      time: '1:00 PM',
      duration: 90,
      platform: 'Zoom',
      participants: 15,
      status: 'completed',
      host: 'Sarah Chen',
      agendaItems: 6,
      completedItems: 6,
      starred: true
    },
    {
      id: '7',
      title: 'Customer Success Review',
      date: 'Mar 10, 2026',
      time: '4:30 PM',
      duration: 25,
      platform: 'Google Meet',
      participants: 4,
      status: 'completed',
      host: 'Mike Johnson',
      agendaItems: 2,
      completedItems: 2,
      starred: false
    },
    {
      id: '8',
      title: 'Weekly Team Standup',
      date: 'Mar 8, 2026',
      time: '9:30 AM',
      duration: 15,
      platform: 'Zoom',
      participants: 10,
      status: 'completed',
      host: 'Emily Davis',
      agendaItems: 1,
      completedItems: 1,
      starred: false
    }
  ];

  const filteredMeetings = meetings.filter(meeting => {
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.host.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || meeting.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: meetings.length,
    completed: meetings.filter(m => m.status === 'completed').length,
    partial: meetings.filter(m => m.status === 'partial').length,
    cancelled: meetings.filter(m => m.status === 'cancelled').length,
    totalMinutes: meetings.reduce((sum, m) => sum + m.duration, 0)
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Meeting History</h1>
                <p className="text-sm text-gray-500 mt-1">View and manage all your past meetings</p>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-5 gap-4 mb-6">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Total Meetings</div>
                <div className="text-2xl font-semibold text-gray-900">{stats.total}</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-xs text-green-600 mb-1">Completed</div>
                <div className="text-2xl font-semibold text-green-700">{stats.completed}</div>
              </div>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="text-xs text-yellow-600 mb-1">Partial</div>
                <div className="text-2xl font-semibold text-yellow-700">{stats.partial}</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-xs text-red-600 mb-1">Cancelled</div>
                <div className="text-2xl font-semibold text-red-700">{stats.cancelled}</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-xs text-purple-600 mb-1">Total Hours</div>
                <div className="text-2xl font-semibold text-purple-700">{Math.round(stats.totalMinutes / 60)}</div>
              </div>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search meetings by title or host..."
                  className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="relative">
                <button
                  onClick={() => setFilterOpen(!filterOpen)}
                  className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Filter className="w-4 h-4" />
                  Filter
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {filterOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10 min-w-[180px]">
                    {[
                      { value: 'all', label: 'All Meetings' },
                      { value: 'completed', label: 'Completed' },
                      { value: 'partial', label: 'Partial' },
                      { value: 'cancelled', label: 'Cancelled' }
                    ].map(option => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSelectedFilter(option.value as typeof selectedFilter);
                          setFilterOpen(false);
                        }}
                        className={`w-full px-4 py-2.5 text-sm text-left hover:bg-gray-50 transition-colors ${
                          selectedFilter === option.value ? 'bg-purple-50 text-purple-700 font-medium' : 'text-gray-700'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Meetings List */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {filteredMeetings.map((meeting, index) => (
                <motion.div
                  key={meeting.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-1">
                      {meeting.status === 'completed' && (
                        <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                      )}
                      {meeting.status === 'partial' && (
                        <div className="w-10 h-10 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        </div>
                      )}
                      {meeting.status === 'cancelled' && (
                        <div className="w-10 h-10 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                          <XCircle className="w-5 h-5 text-red-600" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Link 
                              to="/summary"
                              className="font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                            >
                              {meeting.title}
                            </Link>
                            {meeting.starred && (
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{meeting.date}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{meeting.time} • {meeting.duration} min</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Video className="w-3.5 h-3.5" />
                              <span>{meeting.platform}</span>
                            </div>
                            <span>•</span>
                            <div className="flex items-center gap-1.5">
                              <Users className="w-3.5 h-3.5" />
                              <span>{meeting.participants} participants</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`inline-block px-2.5 py-1 rounded-md text-xs font-medium ${
                            meeting.status === 'completed' 
                              ? 'bg-green-50 text-green-700 border border-green-200' :
                            meeting.status === 'partial' 
                              ? 'bg-yellow-50 text-yellow-700 border border-yellow-200' :
                              'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {meeting.status === 'completed' && 'Completed'}
                            {meeting.status === 'partial' && 'Partial'}
                            {meeting.status === 'cancelled' && 'Cancelled'}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div>
                            <span className="text-gray-500">Host:</span>{' '}
                            <span className="font-medium text-gray-900">{meeting.host}</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Agenda:</span>{' '}
                            <span className="font-medium text-gray-900">
                              {meeting.completedItems}/{meeting.agendaItems} completed
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700">
                            <Star className="w-4 h-4" />
                          </button>
                          <button className="w-8 h-8 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center text-gray-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {filteredMeetings.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No meetings found</p>
                  <p className="text-sm mt-1">Try adjusting your search or filter</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
