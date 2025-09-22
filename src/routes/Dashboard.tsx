import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, Navigate } from 'react-router-dom';
import { User, BookOpen, MapPin, Calendar, TrendingUp, Heart, Bell, Target } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useQuiz } from '../context/QuizContext';

const Dashboard = () => {
  const { user, isLoggedIn } = useUser();
  const { results } = useQuiz();
  const [savedEvents, setSavedEvents] = useState([]);
  const [savedColleges] = useState([]);

  useEffect(() => {
    const events = JSON.parse(localStorage.getItem('dashboard-events') || '[]');
    setSavedEvents(events);
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600">
                  {user?.class} Student • Age {user?.age}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Your Progress</p>
                <p className="text-2xl font-bold text-blue-600">75%</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Career Recommendations */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Target className="h-6 w-6 mr-2 text-blue-600" />
                  Your Career Path
                </h2>
                <Link to="/quiz" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Retake Quiz
                </Link>
              </div>
              
              {results ? (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-lg">
                    <h3 className="text-lg font-semibold mb-1">Recommended Stream</h3>
                    <p className="text-2xl font-bold">{results.recommendedStream}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Top Course Recommendations</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {results.topCourses.map((course, index) => (
                        <div key={index} className="bg-blue-50 p-3 rounded-lg">
                          <BookOpen className="h-5 w-5 text-blue-600 mb-1" />
                          <p className="text-sm font-medium text-blue-900">{course}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Take Your Career Quiz</h3>
                  <p className="text-gray-600 mb-4">
                    Discover your ideal career path with our personalized assessment.
                  </p>
                  <Link
                    to="/quiz"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                  >
                    Start Quiz
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link
                  to="/colleges"
                  className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <MapPin className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium text-green-900">Find Colleges</span>
                </Link>
                <Link
                  to="/career-map"
                  className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <TrendingUp className="h-5 w-5 text-purple-600 mr-3" />
                  <span className="font-medium text-purple-900">Explore Careers</span>
                </Link>
                <Link
                  to="/resources"
                  className="flex items-center p-3 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
                >
                  <BookOpen className="h-5 w-5 text-orange-600 mr-3" />
                  <span className="font-medium text-orange-900">Study Resources</span>
                </Link>
                <Link
                  to="/compare"
                  className="flex items-center p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <TrendingUp className="h-5 w-5 text-red-600 mr-3" />
                  <span className="font-medium text-red-900">Compare Courses</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Saved Events */}
          <motion.div variants={cardVariants} className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Bell className="h-6 w-6 mr-2 text-yellow-600" />
                  Upcoming Events
                </h2>
                <Link to="/timeline" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </Link>
              </div>
              
              {savedEvents.length > 0 ? (
                <div className="space-y-3">
                  {savedEvents.slice(0, 3).map((event: any, index) => (
                    <div key={index} className="flex items-center p-3 bg-yellow-50 rounded-lg">
                      <Calendar className="h-5 w-5 text-yellow-600 mr-3 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{event.title}</p>
                        <p className="text-sm text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600 mb-3">No saved events yet</p>
                  <Link
                    to="/timeline"
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Browse Timeline
                  </Link>
                </div>
              )}
            </div>
          </motion.div>

          {/* Progress Overview */}
          <motion.div variants={cardVariants}>
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Career Assessment</span>
                    <span className="font-medium">{results ? '100%' : '0%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`bg-green-500 h-2 rounded-full transition-all duration-500 ${results ? 'w-full' : 'w-0'}`}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">College Research</span>
                    <span className="font-medium">{savedColleges.length > 0 ? '75%' : '25%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`bg-blue-500 h-2 rounded-full transition-all duration-500 ${savedColleges.length > 0 ? 'w-3/4' : 'w-1/4'}`}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Timeline Planning</span>
                    <span className="font-medium">{savedEvents.length > 0 ? '60%' : '30%'}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`bg-purple-500 h-2 rounded-full transition-all duration-500 ${savedEvents.length > 0 ? 'w-3/5' : 'w-1/3'}`}></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;