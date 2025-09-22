import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Plus, Star, Bell, ExternalLink } from 'lucide-react';
import TimelineItem from '../components/TimelineItem';

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

const Timeline = () => {
  const [events] = useState<TimelineEvent[]>([
    {
      id: 1,
      date: '2024-02-15',
      title: 'JEE Main Registration Opens',
      type: 'exam',
      description: 'Joint Entrance Examination Main registration starts for engineering aspirants.',
      importance: 'high',
      link: 'https://jeemain.nta.nic.in'
    },
    {
      id: 2,
      date: '2024-02-28',
      title: 'NEET Application Deadline',
      type: 'deadline',
      description: 'Last date to apply for National Eligibility cum Entrance Test for medical courses.',
      importance: 'high',
      link: 'https://neet.nta.nic.in'
    },
    {
      id: 3,
      date: '2024-03-10',
      title: 'Delhi University Admission Portal Opens',
      type: 'admission',
      description: 'DU undergraduate admission process begins with online registration.',
      importance: 'medium',
      link: 'https://du.ac.in'
    },
    {
      id: 4,
      date: '2024-03-20',
      title: 'National Merit Scholarship',
      type: 'scholarship',
      description: 'Application window opens for merit-based scholarships for undergraduate students.',
      importance: 'medium',
      link: 'https://scholarships.gov.in'
    },
    {
      id: 5,
      date: '2024-04-05',
      title: 'CBSE Board Results',
      type: 'exam',
      description: 'Class 12th CBSE board examination results are expected to be announced.',
      importance: 'high'
    },
    {
      id: 6,
      date: '2024-04-15',
      title: 'CAT Registration Begins',
      type: 'exam',
      description: 'Common Admission Test registration for MBA aspirants starts.',
      importance: 'medium',
      link: 'https://iimcat.ac.in'
    },
    {
      id: 7,
      date: '2024-05-01',
      title: 'State University Counselling',
      type: 'admission',
      description: 'Various state universities begin their counselling process for admissions.',
      importance: 'medium'
    },
    {
      id: 8,
      date: '2024-05-20',
      title: 'Private College Application Deadline',
      type: 'deadline',
      description: 'Last date for applications to most private colleges and universities.',
      importance: 'medium'
    }
  ]);

  const [filter, setFilter] = useState<string>('all');

  const typeColors = {
    admission: 'bg-blue-500',
    scholarship: 'bg-green-500',
    exam: 'bg-red-500',
    deadline: 'bg-orange-500'
  };

  const typeIcons = {
    admission: Calendar,
    scholarship: Star,
    exam: Clock,
    deadline: Bell
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(event => event.type === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Academic Timeline</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay on top of important dates for admissions, scholarships, exams, and deadlines
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {['all', 'admission', 'scholarship', 'exam', 'deadline'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full font-medium transition-all capitalize ${
                filter === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {type}
            </button>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300"></div>

          {filteredEvents.map((event, index) => (
            <TimelineItem 
              key={event.id} 
              event={event} 
              index={index}
              typeColors={typeColors}
              typeIcons={typeIcons}
            />
          ))}
        </motion.div>

        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl shadow-md p-8">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600">
                Try selecting a different filter to see more events.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Timeline;