import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, ExternalLink, Heart, Users, DollarSign } from 'lucide-react';

interface College {
  id: number;
  name: string;
  location: string;
  lat: number;
  lon: number;
  courses: string[];
  cutoff: string;
  facilities: string[];
  rating: number;
  fees: string;
  website: string;
  established: number;
  type: string;
}

interface CollegeCardProps {
  college: College;
  index: number;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsSaved(!isSaved);
    // In a real app, this would save to user's profile
  };

  const getDirectionsUrl = () => {
    return `https://www.google.com/maps?q=${college.lat},${college.lon}`;
  };

  return (
    <>
      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: index * 0.1 }}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
        onClick={() => setShowDetails(true)}
        whileHover={{ y: -5 }}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-1">{college.name}</h3>
              <div className="flex items-center text-gray-600 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                {college.location}
              </div>
            </div>
            <button
              onClick={handleSave}
              className={`p-2 rounded-full transition-colors ${
                isSaved ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>

          {/* Rating and Type */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
              <span className="font-semibold text-gray-900">{college.rating}</span>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              college.type === 'Public' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
            }`}>
              {college.type}
            </span>
          </div>

          {/* Key Info */}
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2" />
              <span>Fees: {college.fees}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Users className="h-4 w-4 mr-2" />
              <span>Cutoff: {college.cutoff}</span>
            </div>
          </div>

          {/* Courses Preview */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 mb-2">Available Courses</h4>
            <div className="flex flex-wrap gap-1">
              {college.courses.slice(0, 3).map((course, idx) => (
                <span
                  key={idx}
                  className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs"
                >
                  {course}
                </span>
              ))}
              {college.courses.length > 3 && (
                <span className="text-xs text-gray-500">
                  +{college.courses.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              View Details
            </button>
            <a
              href={getDirectionsUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <MapPin className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Detailed Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{college.name}</h2>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {college.location} • Est. {college.established}
                  </div>
                </div>
                <button
                  onClick={() => setShowDetails(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Info</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Rating:</span>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        {college.rating}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span>{college.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Fees:</span>
                      <span>{college.fees}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Cutoff:</span>
                      <span>{college.cutoff}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Available Courses</h3>
                  <div className="flex flex-wrap gap-2">
                    {college.courses.map((course, idx) => (
                      <span
                        key={idx}
                        className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
                  <div className="flex flex-wrap gap-2">
                    {college.facilities.map((facility, idx) => (
                      <span
                        key={idx}
                        className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                      >
                        {facility}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit Website
                </a>
                <a
                  href={getDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center flex-1 bg-green-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CollegeCard;