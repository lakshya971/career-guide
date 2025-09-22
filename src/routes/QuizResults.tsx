import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, BookOpen, MapPin, TrendingUp, RotateCcw } from 'lucide-react';
import { useQuiz } from '../context/QuizContext';

const QuizResults = () => {
  const { results, resetQuiz } = useQuiz();

  if (!results) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>No results available. Please take the quiz first.</p>
        <Link to="/quiz" className="ml-4 text-blue-600 hover:text-blue-800">
          Take Quiz
        </Link>
      </div>
    );
  }

  const streamColors: Record<string, string> = {
    SCIENCE: 'from-blue-500 to-cyan-500',
    COMMERCE: 'from-green-500 to-emerald-500',
    ARTS: 'from-purple-500 to-pink-500',
    VOCATIONAL: 'from-orange-500 to-red-500'
  };

  const streamDescriptions: Record<string, string> = {
    SCIENCE: 'Your analytical mindset and curiosity about how things work make you perfect for scientific fields.',
    COMMERCE: 'Your business acumen and interest in economics position you well for commercial success.',
    ARTS: 'Your creativity and understanding of human nature align perfectly with arts and humanities.',
    VOCATIONAL: 'Your practical approach and hands-on skills make you ideal for technical and vocational fields.'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Trophy className="h-12 w-12 text-yellow-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Your Results Are In!</h1>
          </div>
          <p className="text-xl text-gray-600">
            Based on your responses, we've identified your ideal career path
          </p>
        </motion.div>

        {/* Recommended Stream */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-r ${streamColors[results.recommendedStream]} p-8 rounded-2xl shadow-xl text-white mb-8`}
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">Recommended Stream</h2>
            <h3 className="text-5xl font-extrabold mb-4">{results.recommendedStream}</h3>
            <p className="text-xl opacity-90">
              {streamDescriptions[results.recommendedStream]}
            </p>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Score Breakdown</h3>
          <div className="space-y-4">
            {Object.entries(results.scores).map(([stream, score], index) => {
              const percentage = (score / Math.max(...Object.values(results.scores))) * 100;
              return (
                <div key={stream} className="flex items-center">
                  <div className="w-24 text-sm font-medium text-gray-700">{stream}</div>
                  <div className="flex-1 mx-4">
                    <div className="bg-gray-200 rounded-full h-3">
                      <motion.div
                        className={`h-3 rounded-full bg-gradient-to-r ${streamColors[stream]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                      />
                    </div>
                  </div>
                  <div className="w-12 text-sm font-semibold text-gray-700">{score}</div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Recommended Courses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Course Recommendations</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {results.topCourses.map((course, index) => (
              <motion.div
                key={course}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="bg-blue-50 p-4 rounded-lg border border-blue-200"
              >
                <BookOpen className="h-6 w-6 text-blue-600 mb-2" />
                <h4 className="font-semibold text-gray-900">{course}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/career-map"
            className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <TrendingUp className="h-5 w-5" />
            <span>Explore Career Paths</span>
          </Link>
          <Link
            to="/colleges"
            className="flex items-center justify-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            <MapPin className="h-5 w-5" />
            <span>Find Colleges</span>
          </Link>
          <button
            onClick={() => {
              resetQuiz();
              window.location.href = '/quiz';
            }}
            className="flex items-center justify-center space-x-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            <RotateCcw className="h-5 w-5" />
            <span>Retake Quiz</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default QuizResults;