import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, TrendingUp, Building, DollarSign, Users, ChevronRight } from 'lucide-react';
import coursesData from '../data/courses.json';

const CareerMap = () => {
  const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
  const [selectedStream, setSelectedStream] = useState<string>('ALL');

  const streams = ['ALL', 'SCIENCE', 'COMMERCE', 'ARTS', 'VOCATIONAL'];
  const filteredCourses = selectedStream === 'ALL' 
    ? coursesData 
    : coursesData.filter(course => course.stream === selectedStream);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course to Career Map</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore how different courses lead to various career opportunities, higher studies, and job prospects
          </p>
        </motion.div>

        {/* Stream Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-2 justify-center mb-8"
        >
          {streams.map((stream) => (
            <button
              key={stream}
              onClick={() => setSelectedStream(stream)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                selectedStream === stream
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-50'
              }`}
            >
              {stream}
            </button>
          ))}
        </motion.div>

        {/* Course Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredCourses.map((course) => (
              <motion.div
                key={course.id}
                variants={cardVariants}
                layout
                className={`bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${
                  selectedCourse === course.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                      course.stream === 'SCIENCE' ? 'bg-blue-100 text-blue-700' :
                      course.stream === 'COMMERCE' ? 'bg-green-100 text-green-700' :
                      course.stream === 'ARTS' ? 'bg-purple-100 text-purple-700' :
                      'bg-orange-100 text-orange-700'
                    }`}>
                      {course.stream}
                    </div>
                    <span className="text-sm text-gray-500">{course.duration}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <DollarSign className="h-4 w-4 mr-1" />
                      {course.salaryRange}
                    </div>
                    <ChevronRight className={`h-5 w-5 text-gray-400 transition-transform ${
                      selectedCourse === course.id ? 'rotate-90' : ''
                    }`} />
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {selectedCourse === course.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100 overflow-hidden"
                    >
                      <div className="p-6 space-y-6">
                        {/* Higher Studies */}
                        <div>
                          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                            Higher Studies
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.higherStudies.map((study, index) => (
                              <span
                                key={index}
                                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                              >
                                {study}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Job Roles */}
                        <div>
                          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                            <Users className="h-5 w-5 mr-2 text-green-600" />
                            Career Opportunities
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.jobRoles.map((role, index) => (
                              <span
                                key={index}
                                className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                              >
                                {role}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Employers */}
                        <div>
                          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                            <Building className="h-5 w-5 mr-2 text-purple-600" />
                            Top Employers
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.employers.map((employer, index) => (
                              <span
                                key={index}
                                className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm"
                              >
                                {employer}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <h4 className="flex items-center text-lg font-semibold text-gray-900 mb-3">
                            <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                            Key Skills
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {course.skills.map((skill, index) => (
                              <span
                                key={index}
                                className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default CareerMap;