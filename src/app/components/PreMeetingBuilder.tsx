import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Clock, 
  Users,
  Play,
  Video,
  Plus,
  X,
  GripVertical,
  Edit2,
  Trash2,
  Zap,
  Copy
} from 'lucide-react';
import { Link } from 'react-router';
import { Sidebar } from './Sidebar';

interface AgendaItem {
  id: string;
  title: string;
  duration: number;
  notes: string;
}

interface Template {
  name: string;
  icon: string;
  items: Omit<AgendaItem, 'id'>[];
}

export function PreMeetingBuilder() {
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    { id: '1', title: 'Opening & Team Updates', duration: 10, notes: 'Welcome and quick status updates' },
    { id: '2', title: 'Q1 Revenue Review', duration: 20, notes: 'Sales performance and metrics' },
    { id: '3', title: 'Product Roadmap Discussion', duration: 15, notes: 'Upcoming features and timeline' }
  ]);
  
  const [meetingTitle, setMeetingTitle] = useState('Q1 Strategy Review');
  const [platform, setPlatform] = useState('Zoom');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [editingItem, setEditingItem] = useState<AgendaItem | null>(null);

  // Quick templates
  const templates: Template[] = [
    {
      name: 'Team Standup',
      icon: '👥',
      items: [
        { title: 'Team Updates', duration: 10, notes: 'Quick status from each team member' },
        { title: 'Blockers & Challenges', duration: 5, notes: 'Discuss any obstacles' },
        { title: 'Action Items', duration: 5, notes: 'Assign tasks for the day' }
      ]
    },
    {
      name: 'Client Presentation',
      icon: '💼',
      items: [
        { title: 'Introduction & Agenda', duration: 5, notes: 'Set expectations' },
        { title: 'Company Overview', duration: 10, notes: 'Background and capabilities' },
        { title: 'Proposed Solution', duration: 20, notes: 'Main presentation' },
        { title: 'Q&A', duration: 10, notes: 'Answer questions' },
        { title: 'Next Steps', duration: 5, notes: 'Define action items' }
      ]
    },
    {
      name: '1-on-1 Meeting',
      icon: '☕',
      items: [
        { title: 'Check-in', duration: 5, notes: 'How are things going?' },
        { title: 'Recent Work Review', duration: 10, notes: 'Discuss current projects' },
        { title: 'Career Development', duration: 10, notes: 'Growth and goals' },
        { title: 'Feedback & Action Items', duration: 5, notes: 'Wrap up and next steps' }
      ]
    },
    {
      name: 'Sprint Planning',
      icon: '🎯',
      items: [
        { title: 'Sprint Review', duration: 15, notes: 'Last sprint achievements' },
        { title: 'Backlog Refinement', duration: 20, notes: 'Review and prioritize tasks' },
        { title: 'Sprint Goal Setting', duration: 10, notes: 'Define objectives' },
        { title: 'Task Assignment', duration: 15, notes: 'Distribute work' }
      ]
    }
  ];

  const totalDuration = agendaItems.reduce((sum, item) => sum + item.duration, 0);

  const handleAddItem = (item: Omit<AgendaItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setAgendaItems([...agendaItems, newItem]);
    setShowAddModal(false);
  };

  const handleEditItem = (item: AgendaItem) => {
    setAgendaItems(agendaItems.map(i => i.id === item.id ? item : i));
    setEditingItem(null);
  };

  const handleDeleteItem = (id: string) => {
    setAgendaItems(agendaItems.filter(item => item.id !== id));
  };

  const handleApplyTemplate = (template: Template) => {
    const newItems = template.items.map((item, index) => ({
      ...item,
      id: (Date.now() + index).toString()
    }));
    setAgendaItems(newItems);
    setMeetingTitle(template.name);
    setShowTemplates(false);
  };

  const quickDurations = [5, 10, 15, 20, 30, 45, 60];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-8 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Create Meeting Agenda</h1>
                <p className="text-sm text-gray-500 mt-1">Build your agenda in seconds</p>
              </div>
              <Link 
                to="/live"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-all flex items-center gap-2 font-medium shadow-sm"
              >
                <Play className="w-4 h-4" />
                Start Meeting
              </Link>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            {/* Quick Templates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h2 className="text-base font-semibold text-gray-900">Quick Start Templates</h2>
                </div>
                {agendaItems.length > 0 && (
                  <button
                    onClick={() => setShowTemplates(!showTemplates)}
                    className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                  >
                    {showTemplates ? 'Hide' : 'Show'} Templates
                  </button>
                )}
              </div>
              
              <AnimatePresence>
                {(showTemplates || agendaItems.length === 0) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="grid grid-cols-4 gap-3 overflow-hidden"
                  >
                    {templates.map((template, index) => (
                      <motion.button
                        key={template.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => handleApplyTemplate(template)}
                        className="bg-white border border-purple-200 rounded-lg p-4 hover:border-purple-400 hover:shadow-md transition-all text-left group"
                      >
                        <div className="text-3xl mb-2">{template.icon}</div>
                        <div className="font-medium text-gray-900 text-sm group-hover:text-purple-600 transition-colors">
                          {template.name}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {template.items.length} items
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Meeting Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <h2 className="text-base font-semibold text-gray-900 mb-4">Meeting Information</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Meeting Title</label>
                  <input
                    type="text"
                    value={meetingTitle}
                    onChange={(e) => setMeetingTitle(e.target.value)}
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    placeholder="e.g., Q1 Strategy Review"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Platform</label>
                  <div className="relative">
                    <Video className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none"
                    >
                      <option>Zoom</option>
                      <option>Google Meet</option>
                      <option>Microsoft Teams</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Agenda Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white rounded-xl border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-semibold text-gray-900">Agenda Items</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {agendaItems.length} items • {totalDuration} min total
                  </p>
                </div>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {agendaItems.length === 0 ? (
                <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
                  <Plus className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="font-medium">No agenda items yet</p>
                  <p className="text-sm mt-1">Use a template or add items manually</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {agendaItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group relative bg-gray-50 border border-gray-200 rounded-lg p-4 hover:border-purple-300 hover:bg-purple-50/50 transition-all"
                    >
                      <div className="flex items-start gap-3">
                        {/* Drag Handle */}
                        <div className="cursor-move text-gray-400 hover:text-gray-600 transition-colors mt-1">
                          <GripVertical className="w-4 h-4" />
                        </div>

                        {/* Number Badge */}
                        <div className="w-7 h-7 rounded-lg bg-purple-600 text-white flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 mb-1">{item.title}</div>
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5" />
                              <span className="font-medium">{item.duration} min</span>
                            </div>
                            {item.notes && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span className="text-gray-500 truncate">{item.notes}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="w-8 h-8 rounded-lg hover:bg-white border border-transparent hover:border-gray-300 transition-all flex items-center justify-center text-gray-500 hover:text-gray-700"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              const newItem = { ...item, id: Date.now().toString() };
                              setAgendaItems([...agendaItems, newItem]);
                            }}
                            className="w-8 h-8 rounded-lg hover:bg-white border border-transparent hover:border-gray-300 transition-all flex items-center justify-center text-gray-500 hover:text-gray-700"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteItem(item.id)}
                            className="w-8 h-8 rounded-lg hover:bg-red-50 border border-transparent hover:border-red-300 transition-all flex items-center justify-center text-gray-500 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || editingItem) && (
          <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddModal(false);
              setEditingItem(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-xl border border-gray-200 p-6 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">
                  {editingItem ? 'Edit Agenda Item' : 'Add Agenda Item'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                  }}
                  className="w-8 h-8 rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center text-gray-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const item = {
                    title: formData.get('title') as string,
                    duration: parseInt(formData.get('duration') as string),
                    notes: formData.get('notes') as string
                  };
                  
                  if (editingItem) {
                    handleEditItem({ ...item, id: editingItem.id });
                  } else {
                    handleAddItem(item);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Topic Title *</label>
                  <input
                    name="title"
                    type="text"
                    defaultValue={editingItem?.title || ''}
                    required
                    placeholder="e.g., Product Roadmap Discussion"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Duration (minutes) *</label>
                  <div className="grid grid-cols-7 gap-2 mb-3">
                    {quickDurations.map(dur => (
                      <button
                        key={dur}
                        type="button"
                        onClick={(e) => {
                          const input = e.currentTarget.parentElement?.parentElement?.querySelector('input[name="duration"]') as HTMLInputElement;
                          if (input) input.value = dur.toString();
                        }}
                        className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors border border-purple-200"
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                  <input
                    name="duration"
                    type="number"
                    defaultValue={editingItem?.duration || 15}
                    required
                    min="1"
                    max="180"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Notes (optional)</label>
                  <textarea
                    name="notes"
                    defaultValue={editingItem?.notes || ''}
                    rows={3}
                    placeholder="Add any additional details..."
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                  >
                    {editingItem ? 'Save Changes' : 'Add Item'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingItem(null);
                    }}
                    className="px-4 py-2.5 bg-white hover:bg-gray-50 border border-gray-300 text-gray-700 rounded-lg transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
