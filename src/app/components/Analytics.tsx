import { motion } from 'motion/react';
import { 
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  Calendar,
  Target,
  BarChart3,
  PieChart
} from 'lucide-react';
import { Sidebar } from './Sidebar';
import { BarChart, Bar, LineChart, Line, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function Analytics() {
  // Meeting volume data
  const meetingVolumeData = [
    { month: 'Sep', meetings: 24 },
    { month: 'Oct', meetings: 32 },
    { month: 'Nov', meetings: 28 },
    { month: 'Dec', meetings: 35 },
    { month: 'Jan', meetings: 42 },
    { month: 'Feb', meetings: 38 },
    { month: 'Mar', meetings: 45 }
  ];

  // Meeting duration trend
  const durationTrendData = [
    { week: 'Week 1', avgDuration: 32 },
    { week: 'Week 2', avgDuration: 38 },
    { week: 'Week 3', avgDuration: 35 },
    { week: 'Week 4', avgDuration: 42 },
    { week: 'Week 5', avgDuration: 40 },
    { week: 'Week 6', avgDuration: 36 },
    { week: 'Week 7', avgDuration: 44 },
    { week: 'Week 8', avgDuration: 38 }
  ];

  // Platform distribution
  const platformData = [
    { name: 'Zoom', value: 65, color: '#3b82f6' },
    { name: 'Google Meet', value: 20, color: '#8b5cf6' },
    { name: 'MS Teams', value: 12, color: '#06b6d4' },
    { name: 'Other', value: 3, color: '#6b7280' }
  ];

  // Completion rate data
  const completionData = [
    { category: 'Fully Completed', count: 85, color: '#10b981' },
    { category: 'Partially Completed', count: 12, color: '#f59e0b' },
    { category: 'Cancelled', count: 3, color: '#ef4444' }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-5">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Analytics Dashboard</h1>
              <p className="text-sm text-gray-500 mt-1">Track your meeting performance and trends</p>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">+18%</span>
                </div>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">284</div>
              <div className="text-sm text-gray-500">Total Meetings</div>
              <div className="text-xs text-gray-400 mt-2">Last 6 months</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">+12%</span>
                </div>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">182h</div>
              <div className="text-sm text-gray-500">Total Meeting Time</div>
              <div className="text-xs text-gray-400 mt-2">~38 min average</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <TrendingUp className="w-4 h-4" />
                  <span className="font-medium">+5%</span>
                </div>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">85%</div>
              <div className="text-sm text-gray-500">Completion Rate</div>
              <div className="text-xs text-gray-400 mt-2">241 completed</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-orange-50 border border-orange-200 flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-red-600">
                  <TrendingDown className="w-4 h-4" />
                  <span className="font-medium">-3%</span>
                </div>
              </div>
              <div className="text-2xl font-semibold text-gray-900 mb-1">7.2</div>
              <div className="text-sm text-gray-500">Avg Participants</div>
              <div className="text-xs text-gray-400 mt-2">Per meeting</div>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Meeting Volume Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Meeting Volume</h2>
                  <p className="text-sm text-gray-500 mt-1">Meetings per month</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={meetingVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Bar dataKey="meetings" fill="#8b5cf6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Duration Trend Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Average Duration Trend</h2>
                  <p className="text-sm text-gray-500 mt-1">Minutes per meeting</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={durationTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="week" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <YAxis 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                    axisLine={{ stroke: '#e5e7eb' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#fff', 
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="avgDuration" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Platform Distribution */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Platform Distribution</h2>
                  <p className="text-sm text-gray-500 mt-1">Meeting platforms used</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-green-50 border border-green-200 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-green-600" />
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <ResponsiveContainer width="50%" height={200}>
                  <RePieChart>
                    <Pie
                      data={platformData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {platformData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </RePieChart>
                </ResponsiveContainer>
                
                <div className="flex-1 space-y-3">
                  {platformData.map((platform, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: platform.color }}
                        />
                        <span className="text-sm text-gray-700">{platform.name}</span>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{platform.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Completion Rate */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Meeting Outcomes</h2>
                  <p className="text-sm text-gray-500 mt-1">Completion status breakdown</p>
                </div>
                <div className="w-10 h-10 rounded-lg bg-yellow-50 border border-yellow-200 flex items-center justify-center">
                  <Target className="w-5 h-5 text-yellow-600" />
                </div>
              </div>
              
              <div className="space-y-4">
                {completionData.map((item, index) => {
                  const total = completionData.reduce((sum, d) => sum + d.count, 0);
                  const percentage = Math.round((item.count / total) * 100);
                  
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-700">{item.category}</span>
                        <span className="text-sm font-semibold text-gray-900">{item.count} ({percentage}%)</span>
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-green-600">85%</div>
                    <div className="text-xs text-gray-500 mt-1">Success Rate</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-yellow-600">12%</div>
                    <div className="text-xs text-gray-500 mt-1">Partial</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-red-600">3%</div>
                    <div className="text-xs text-gray-500 mt-1">Cancelled</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Top Performers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-4">Top Meeting Hosts</h2>
            <div className="grid grid-cols-5 gap-4">
              {[
                { name: 'Sarah Chen', meetings: 45, hours: 32, rate: 92 },
                { name: 'Mike Johnson', meetings: 38, hours: 28, rate: 88 },
                { name: 'Emily Davis', meetings: 42, hours: 35, rate: 85 },
                { name: 'Alex Kim', meetings: 35, hours: 24, rate: 90 },
                { name: 'Jordan Lee', meetings: 31, hours: 22, rate: 83 }
              ].map((host, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-semibold mx-auto mb-3">
                    {host.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900 text-sm mb-1">{host.name}</div>
                    <div className="text-xs text-gray-500">{host.meetings} meetings</div>
                    <div className="text-xs text-gray-500">{host.hours}h total</div>
                    <div className="mt-2 inline-block px-2 py-1 bg-green-50 text-green-700 rounded text-xs font-medium">
                      {host.rate}% completion
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
