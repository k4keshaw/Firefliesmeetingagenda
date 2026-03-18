import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search,
  UserPlus,
  Mail,
  Calendar,
  TrendingUp,
  Clock,
  Video,
  Crown,
  Shield,
  User,
  MoreVertical,
  Settings
} from 'lucide-react';
import { Sidebar } from './Sidebar';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  joinedDate: string;
  meetingsHosted: number;
  meetingsAttended: number;
  totalHours: number;
  avgRating: number;
  status: 'active' | 'inactive';
  lastActive: string;
}

export function TeamDetails() {
  const [searchQuery, setSearchQuery] = useState('');

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Sarah Chen',
      email: 'sarah.chen@company.com',
      role: 'admin',
      joinedDate: 'Jan 15, 2024',
      meetingsHosted: 45,
      meetingsAttended: 128,
      totalHours: 96,
      avgRating: 4.8,
      status: 'active',
      lastActive: '2 min ago'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      email: 'mike.johnson@company.com',
      role: 'admin',
      joinedDate: 'Jan 15, 2024',
      meetingsHosted: 38,
      meetingsAttended: 115,
      totalHours: 82,
      avgRating: 4.6,
      status: 'active',
      lastActive: '15 min ago'
    },
    {
      id: '3',
      name: 'Emily Davis',
      email: 'emily.davis@company.com',
      role: 'member',
      joinedDate: 'Feb 1, 2024',
      meetingsHosted: 42,
      meetingsAttended: 105,
      totalHours: 88,
      avgRating: 4.7,
      status: 'active',
      lastActive: '1 hour ago'
    },
    {
      id: '4',
      name: 'Alex Kim',
      email: 'alex.kim@company.com',
      role: 'member',
      joinedDate: 'Feb 10, 2024',
      meetingsHosted: 35,
      meetingsAttended: 98,
      totalHours: 71,
      avgRating: 4.5,
      status: 'active',
      lastActive: '3 hours ago'
    },
    {
      id: '5',
      name: 'Jordan Lee',
      email: 'jordan.lee@company.com',
      role: 'member',
      joinedDate: 'Mar 1, 2024',
      meetingsHosted: 31,
      meetingsAttended: 89,
      totalHours: 64,
      avgRating: 4.4,
      status: 'active',
      lastActive: '5 hours ago'
    },
    {
      id: '6',
      name: 'Taylor Martinez',
      email: 'taylor.martinez@company.com',
      role: 'viewer',
      joinedDate: 'Mar 5, 2024',
      meetingsHosted: 0,
      meetingsAttended: 45,
      totalHours: 28,
      avgRating: 4.3,
      status: 'active',
      lastActive: 'Yesterday'
    },
    {
      id: '7',
      name: 'Casey Morgan',
      email: 'casey.morgan@company.com',
      role: 'member',
      joinedDate: 'Jan 20, 2024',
      meetingsHosted: 28,
      meetingsAttended: 92,
      totalHours: 58,
      avgRating: 4.6,
      status: 'active',
      lastActive: '2 days ago'
    },
    {
      id: '8',
      name: 'Riley Parker',
      email: 'riley.parker@company.com',
      role: 'viewer',
      joinedDate: 'Feb 15, 2024',
      meetingsHosted: 0,
      meetingsAttended: 52,
      totalHours: 31,
      avgRating: 4.2,
      status: 'inactive',
      lastActive: '1 week ago'
    }
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const teamStats = {
    totalMembers: teamMembers.length,
    activeMembers: teamMembers.filter(m => m.status === 'active').length,
    totalMeetings: teamMembers.reduce((sum, m) => sum + m.meetingsHosted, 0),
    totalHours: teamMembers.reduce((sum, m) => sum + m.totalHours, 0)
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-600" />;
      case 'member':
        return <Shield className="w-4 h-4 text-blue-600" />;
      case 'viewer':
        return <User className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    const styles = {
      admin: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      member: 'bg-blue-50 text-blue-700 border-blue-200',
      viewer: 'bg-gray-50 text-gray-700 border-gray-200'
    };
    
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium border ${styles[role as keyof typeof styles]}`}>
        {getRoleIcon(role)}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    );
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
                <h1 className="text-2xl font-semibold text-gray-900">Team Management</h1>
                <p className="text-sm text-gray-500 mt-1">Manage your team members and permissions</p>
              </div>
              <button className="px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium shadow-sm">
                <UserPlus className="w-4 h-4" />
                Invite Member
              </button>
            </div>

            {/* Team Stats */}
            <div className="grid grid-cols-4 gap-4 mb-6">
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-xs text-purple-600 mb-1">Total Members</div>
                <div className="text-2xl font-semibold text-purple-700">{teamStats.totalMembers}</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-xs text-green-600 mb-1">Active Members</div>
                <div className="text-2xl font-semibold text-green-700">{teamStats.activeMembers}</div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-xs text-blue-600 mb-1">Meetings Hosted</div>
                <div className="text-2xl font-semibold text-blue-700">{teamStats.totalMeetings}</div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="text-xs text-orange-600 mb-1">Total Hours</div>
                <div className="text-2xl font-semibold text-orange-700">{teamStats.totalHours}h</div>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search team members by name or email..."
                className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>
          </div>
        </header>

        {/* Team Members List */}
        <div className="p-8 max-w-7xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-3">Member</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Meetings</div>
              <div className="col-span-2">Hours</div>
              <div className="col-span-2">Last Active</div>
              <div className="col-span-1">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {filteredMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                  className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-gray-50 transition-colors items-center"
                >
                  {/* Member Info */}
                  <div className="col-span-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-gray-900 truncate">{member.name}</div>
                      <div className="text-sm text-gray-500 truncate flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {member.email}
                      </div>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="col-span-2">
                    {getRoleBadge(member.role)}
                  </div>

                  {/* Meetings */}
                  <div className="col-span-2">
                    <div className="text-sm text-gray-900">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Video className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-medium">{member.meetingsHosted}</span>
                        <span className="text-gray-500">hosted</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        {member.meetingsAttended} attended
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{member.totalHours}h</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {(member.totalHours / member.meetingsHosted).toFixed(1)}h avg
                    </div>
                  </div>

                  {/* Last Active */}
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        member.status === 'active' ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-sm text-gray-600">{member.lastActive}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Joined {member.joinedDate}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 flex items-center justify-end">
                    <button className="w-8 h-8 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center text-gray-500 hover:text-gray-700">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}

              {filteredMembers.length === 0 && (
                <div className="p-12 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No team members found</p>
                  <p className="text-sm mt-1">Try adjusting your search</p>
                </div>
              )}
            </div>
          </div>

          {/* Top Performers Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6 bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-base font-semibold text-gray-900">Top Performers</h2>
                <p className="text-sm text-gray-500 mt-1">Most active team members this month</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {filteredMembers
                .sort((a, b) => b.meetingsHosted - a.meetingsHosted)
                .slice(0, 3)
                .map((member, index) => (
                  <div key={member.id} className="relative">
                    {index === 0 && (
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg z-10">
                        <Crown className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="border border-gray-200 rounded-lg p-6 text-center hover:border-purple-300 transition-colors">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-semibold text-lg mx-auto mb-4">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="font-semibold text-gray-900 mb-1">{member.name}</div>
                      <div className="text-sm text-gray-500 mb-4">{member.role}</div>
                      
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                        <div>
                          <div className="text-lg font-semibold text-purple-600">{member.meetingsHosted}</div>
                          <div className="text-xs text-gray-500">Meetings</div>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-blue-600">{member.totalHours}h</div>
                          <div className="text-xs text-gray-500">Hours</div>
                        </div>
                      </div>

                      <div className="mt-4 inline-flex items-center gap-1 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                        <TrendingUp className="w-3 h-3" />
                        {member.avgRating} rating
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
