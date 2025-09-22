import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, BookOpen, Building, Users, Zap } from 'lucide-react';
import coursesData from '../data/courses.json';

const Compare = () => {
  const [selectedCourses, setSelectedCourses] = useState<number[]>([]);

  const handleCourseSelect = (courseId: number) => {
    if (selectedCourses.includes(courseId)) {
      setSelectedCourses(selectedCourses.filter(id => id !== courseId));
    } else if (selectedCourses.length < 2) {
      setSelectedCourses([...selectedCourses, courseId]);
    }
  };

  const selectedCourseData = selectedCourses.map(id => coursesData.find(course => course.id === id)!);

  const comparisonCategories = [
    {
      title: 'Duration',
      key: 'duration',
      icon: BookOpen,
      getValue: (course: any) => course.duration
    },
    {
      title: 'Salary Range',
      key: 'salaryRange',
      icon: DollarSign,
      getValue: (course: any) => course.salaryRange
    },
    {
      title: 'Higher Studies',
      key: 'higherStudies',
      icon: TrendingUp,
      getValue: (course: any) => course.higherStudies.length
    },
    {
      title: 'Job Opportunities',
      key: 'jobRoles',
      icon: Users,
      getValue: (course: any) => course.jobRoles.length
    },
    {
      title: 'Top Employers',
      key: 'employers',
      icon: Building,
      getValue: (course: any) => course.employers.length
    },
    {
      title: 'Key Skills',
      key: 'skills',
      icon: Zap,
      getValue: (course: any) => course.skills.length
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Comparison</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Compare different courses side-by-side to make an informed decision about your future
          </p>
        </motion.div>

        {/* Course Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select Courses to Compare</h2>
          <p className="text-gray-600 mb-6">Choose up to 2 courses for detailed comparison</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {coursesData.map((course) => (
              <motion.button
                key={course.id}
                onClick={() => handleCourseSelect(course.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedCourses.includes(course.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                } ${
                  selectedCourses.length >= 2 && !selectedCourses.includes(course.id)
                    ? 'opacity-50 cursor-not-allowed'
                    : ''
                }`}
                whileHover={selectedCourses.length < 2 || selectedCourses.includes(course.id) ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.stream === 'SCIENCE' ? 'bg-blue-100 text-blue-700' :
                    course.stream === 'COMMERCE' ? 'bg-green-100 text-green-700' :
                    course.stream === 'ARTS' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {course.stream}
                  </span>
                  {selectedCourses.includes(course.id) && (
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{course.name}</h3>
                <p className="text-sm text-gray-600">{course.duration}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Comparison Table */}
        {selectedCourseData.length === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            {/* Course Headers */}
            <div className="grid grid-cols-3 bg-gray-50 border-b">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900">Comparison</h3>
              </div>
              {selectedCourseData.map((course, index) => (
                <div key={course.id} className="p-6 border-l border-gray-200">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium inline-block mb-2 ${
                    course.stream === 'SCIENCE' ? 'bg-blue-100 text-blue-700' :
                    course.stream === 'COMMERCE' ? 'bg-green-100 text-green-700' :
                    course.stream === 'ARTS' ? 'bg-purple-100 text-purple-700' :
                    'bg-orange-100 text-orange-700'
                  }`}>
                    {course.stream}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{course.name}</h3>
                  <p className="text-gray-600 text-sm">{course.description}</p>
                </div>
              ))}
            </div>

            {/* Basic Comparison */}
            {comparisonCategories.map((category) => (
              <div key={category.key} className="grid grid-cols-3 border-b border-gray-100">
                <div className="p-6 bg-gray-50">
                  <div className="flex items-center space-x-2">
                    <category.icon className="h-5 w-5 text-gray-600" />
                    <span className="font-semibold text-gray-900">{category.title}</span>
                  </div>
                </div>
                {selectedCourseData.map((course) => (
                  <div key={course.id} className="p-6 border-l border-gray-200">
                    <span className="text-gray-800">
                      {typeof category.getValue(course) === 'number' 
                        ? `${category.getValue(course)} options`
                        : category.getValue(course)
                      }
                    </span>
                  </div>
                ))}
              </div>
            ))}

            {/* Detailed Sections */}
            <div className="grid grid-cols-3 border-b border-gray-100">
              <div className="p-6 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Higher Studies Options</span>
                </div>
              </div>
              {selectedCourseData.map((course) => (
                <div key={course.id} className="p-6 border-l border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {course.higherStudies.map((study, index) => (
                      <span
                        key={index}
                        className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                      >
                        {study}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 border-b border-gray-100">
              <div className="p-6 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Job Roles</span>
                </div>
              </div>
              {selectedCourseData.map((course) => (
                <div key={course.id} className="p-6 border-l border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {course.jobRoles.map((role, index) => (
                      <span
                        key={index}
                        className="bg-green-50 text-green-700 px-2 py-1 rounded text-xs"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3">
              <div className="p-6 bg-gray-50">
                <div className="flex items-center space-x-2">
                  <Building className="h-5 w-5 text-gray-600" />
                  <span className="font-semibold text-gray-900">Top Employers</span>
                </div>
              </div>
              {selectedCourseData.map((course) => (
                <div key={course.id} className="p-6 border-l border-gray-200">
                  <div className="flex flex-wrap gap-1">
                    {course.employers.map((employer, index) => (
                      <span
                        key={index}
                        className="bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs"
                      >
                        {employer}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {selectedCourseData.length === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-blue-50 rounded-xl p-8 text-center"
          >
            <TrendingUp className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select Another Course</h3>
            <p className="text-gray-600">
              Choose one more course to start comparing them side-by-side.
            </p>
          </motion.div>
        )}

        {selectedCourseData.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-100 rounded-xl p-8 text-center"
          >
            <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Comparing</h3>
            <p className="text-gray-600">
              Select two courses from the list above to see a detailed comparison.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Compare;