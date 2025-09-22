import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Plus, Check } from 'lucide-react';

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  type: 'admission' | 'scholarship' | 'exam' | 'deadline';
  description: string;
  importance: 'high' | 'medium' | 'low';
  link?: string;
  reminder?: boolean;
}

interface TimelineItemProps {
  event: TimelineEvent;
  index: number;
  typeColors: Record<string, string>;
  typeIcons: Record<string, React.ComponentType<any>>;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, index, typeColors, typeIcons }) => {
  const [isAdded, setIsAdded] = useState(false);
  
  const IconComponent = typeIcons[event.type];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleAddToDashboard = () => {
    setIsAdded(true);
    // In a real app, this would save to user's dashboard
    const savedEvents = JSON.parse(localStorage.getItem('dashboard-events') || '[]');
    savedEvents.push(event);
    localStorage.setItem('dashboard-events', JSON.stringify(savedEvents));
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div
      variants={itemVariants}
      transition={{ delay: index * 0.1 }}
      className="relative flex items-start mb-8"
    >
      {/* Timeline Dot */}
      <div className={`flex-shrink-0 w-4 h-4 rounded-full ${typeColors[event.type]} relative z-10 mt-2`} />
      
      {/* Content */}
      <div className="ml-6 flex-grow">
        <motion.div
          className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${
            event.importance === 'high' ? 'border-red-500' :
            event.importance === 'medium' ? 'border-yellow-500' : 'border-green-500'
          }`}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', duration: 0.2 }}
        >
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${typeColors[event.type]} bg-opacity-10`}>
                <IconComponent className={`h-5 w-5 text-white`} style={{ color: typeColors[event.type].replace('bg-', '') }} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-600">{formatDate(event.date)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                event.importance === 'high' ? 'bg-red-100 text-red-700' :
                event.importance === 'medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
              }`}>
                {event.importance}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${typeColors[event.type]} bg-opacity-20`}>
                {event.type}
              </span>
            </div>
          </div>
          
          <p className="text-gray-600 mb-4">{event.description}</p>
          
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              {event.link && (
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>More Info</span>
                </a>
              )}
            </div>
            
            <button
              onClick={handleAddToDashboard}
              disabled={isAdded}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isAdded
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {isAdded ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
              <span>{isAdded ? 'Added' : 'Add to Dashboard'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TimelineItem;