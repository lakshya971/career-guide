import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, ExternalLink, Search, Filter, Video, FileText, Globe } from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'PDF' | 'Video' | 'Website';
  subject: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  url: string;
  tags: string[];
}

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');

  const resources: Resource[] = [
    {
      id: 1,
      title: 'NCERT Physics Class 12 Solutions',
      description: 'Complete solutions for NCERT Physics Class 12 with detailed explanations and formulas.',
      type: 'PDF',
      subject: 'Physics',
      level: 'Intermediate',
      url: 'https://ncert.nic.in',
      tags: ['NCERT', 'Physics', 'Class 12', 'Solutions']
    },
    {
      id: 2,
      title: 'Khan Academy - Calculus',
      description: 'Comprehensive video lectures on calculus covering limits, derivatives, and integrals.',
      type: 'Video',
      subject: 'Mathematics',
      level: 'Intermediate',
      url: 'https://khanacademy.org',
      tags: ['Calculus', 'Mathematics', 'Video Lectures']
    },
    {
      id: 3,
      title: 'Career Guidance Portal - Government of India',
      description: 'Official government portal with career information, job opportunities, and skill development.',
      type: 'Website',
      subject: 'Career Guidance',
      level: 'Beginner',
      url: 'https://www.careerguide.com',
      tags: ['Career', 'Government', 'Jobs', 'Skills']
    },
    {
      id: 4,
      title: 'Chemistry Lab Manual',
      description: 'Practical chemistry experiments and procedures for undergraduate students.',
      type: 'PDF',
      subject: 'Chemistry',
      level: 'Intermediate',
      url: '#',
      tags: ['Chemistry', 'Lab', 'Experiments', 'Practical']
    },
    {
      id: 5,
      title: 'MIT OpenCourseWare - Computer Science',
      description: 'Free online courses from MIT covering programming, algorithms, and computer science fundamentals.',
      type: 'Website',
      subject: 'Computer Science',
      level: 'Advanced',
      url: 'https://ocw.mit.edu',
      tags: ['MIT', 'Computer Science', 'Programming', 'Free']
    },
    {
      id: 6,
      title: 'English Literature Study Guide',
      description: 'Comprehensive study material for English literature with analysis of major works.',
      type: 'PDF',
      subject: 'English',
      level: 'Intermediate',
      url: '#',
      tags: ['English', 'Literature', 'Study Guide', 'Analysis']
    },
    {
      id: 7,
      title: 'Coursera - Business Fundamentals',
      description: 'Video course series covering basic business concepts, management, and entrepreneurship.',
      type: 'Video',
      subject: 'Business',
      level: 'Beginner',
      url: 'https://coursera.org',
      tags: ['Business', 'Management', 'Entrepreneurship', 'Coursera']
    },
    {
      id: 8,
      title: 'Psychology Research Methods',
      description: 'Detailed guide to research methodologies used in psychological studies and experiments.',
      type: 'PDF',
      subject: 'Psychology',
      level: 'Advanced',
      url: '#',
      tags: ['Psychology', 'Research', 'Methods', 'Studies']
    }
  ];

  const subjects = [...new Set(resources.map(r => r.subject))];
  const types = ['PDF', 'Video', 'Website'];
  const levels = ['Beginner', 'Intermediate', 'Advanced'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = !selectedType || resource.type === selectedType;
    const matchesSubject = !selectedSubject || resource.subject === selectedSubject;
    const matchesLevel = !selectedLevel || resource.level === selectedLevel;

    return matchesSearch && matchesType && matchesSubject && matchesLevel;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'PDF': return FileText;
      case 'Video': return Video;
      case 'Website': return Globe;
      default: return FileText;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'PDF': return 'bg-red-100 text-red-700';
      case 'Video': return 'bg-purple-100 text-purple-700';
      case 'Website': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Study Resources</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access a curated collection of educational materials, study guides, and learning resources
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Subjects</option>
              {subjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>

            {/* Level Filter */}
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Levels</option>
              {levels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <p className="text-gray-600">
            Showing {filteredResources.length} resources
            {searchTerm && ` for "${searchTerm}"`}
          </p>
        </motion.div>

        {/* Resources Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredResources.map((resource, index) => {
            const TypeIcon = getTypeIcon(resource.type);
            return (
              <motion.div
                key={resource.id}
                variants={cardVariants}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
                        <TypeIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(resource.type)}`}>
                          {resource.type}
                        </span>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(resource.level)}`}>
                      {resource.level}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {resource.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {resource.description}
                  </p>

                  {/* Subject */}
                  <div className="mb-4">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                      {resource.subject}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {resource.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {resource.tags.length > 3 && (
                      <span className="text-xs text-gray-500">
                        +{resource.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Action */}
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    {resource.type === 'PDF' ? (
                      <>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </>
                    ) : (
                      <>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Open Resource
                      </>
                    )}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {filteredResources.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="bg-white rounded-xl shadow-md p-8">
              <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No resources found</h3>
              <p className="text-gray-600">
                Try adjusting your search criteria or filters to see more results.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Resources;