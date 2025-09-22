import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Star, Send, CheckCircle } from 'lucide-react';

const Feedback = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    rating: 0,
    category: '',
    message: '',
    email: '',
    consent: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      // In a real app, this would send to an API endpoint
      console.log('Feedback submitted:', formData);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your feedback has been submitted successfully. We appreciate your input and will use it to improve our platform.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setFormData({
                rating: 0,
                category: '',
                message: '',
                email: '',
                consent: false
              });
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Submit Another Feedback
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">We Value Your Feedback</h1>
          <p className="text-xl text-gray-600">
            Help us improve CareerGuide by sharing your experience and suggestions
          </p>
        </motion.div>

        {/* Feedback Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-md p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Rating */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                How would you rate your overall experience?
              </label>
              <div className="flex space-x-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => handleRatingClick(rating)}
                    className={`w-12 h-12 rounded-full transition-all ${
                      formData.rating >= rating
                        ? 'bg-yellow-400 text-white'
                        : 'bg-gray-200 text-gray-400 hover:bg-yellow-100'
                    }`}
                  >
                    <Star className={`h-6 w-6 mx-auto ${formData.rating >= rating ? 'fill-current' : ''}`} />
                  </button>
                ))}
              </div>
              {formData.rating > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {formData.rating === 1 && "We're sorry to hear that. Please tell us how we can improve."}
                  {formData.rating === 2 && "We appreciate your feedback. How can we do better?"}
                  {formData.rating === 3 && "Thank you! What can we do to make it even better?"}
                  {formData.rating === 4 && "Great! We'd love to hear what you liked and what we can improve."}
                  {formData.rating === 5 && "Awesome! We're thrilled you had a great experience."}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What aspect of our platform would you like to provide feedback on?
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select a category</option>
                <option value="quiz">Career Quiz</option>
                <option value="colleges">College Directory</option>
                <option value="career-map">Career Mapping</option>
                <option value="timeline">Timeline & Events</option>
                <option value="resources">Study Resources</option>
                <option value="comparison">Course Comparison</option>
                <option value="ui-ux">User Interface & Experience</option>
                <option value="performance">Website Performance</option>
                <option value="general">General Feedback</option>
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Share your detailed feedback
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us about your experience, suggestions for improvement, or any issues you encountered..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email (Optional)
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Provide your email if you'd like us to follow up on your feedback
              </p>
            </div>

            {/* Consent */}
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleChange}
                required
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm text-gray-600">
                I consent to my feedback being used to improve the CareerGuide platform and understand that my data will be handled according to the privacy policy.
              </label>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={!formData.consent || formData.rating === 0}
              className={`w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                formData.consent && formData.rating > 0
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
              whileHover={formData.consent && formData.rating > 0 ? { scale: 1.02 } : {}}
              whileTap={formData.consent && formData.rating > 0 ? { scale: 0.98 } : {}}
            >
              <Send className="h-5 w-5" />
              <span>Submit Feedback</span>
            </motion.button>
          </form>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-gray-600">
            Your feedback helps us create a better experience for all students. Thank you for taking the time to help us improve!
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Feedback;