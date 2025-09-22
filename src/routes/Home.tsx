
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Brain, MapPin, Calendar, BookOpen, TrendingUp, Users } from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Quiz",
      description: "Discover your ideal career path through our scientifically designed aptitude assessment."
    },
    {
      icon: MapPin,
      title: "College Finder",
      description: "Find the best colleges near you with detailed information and direct connections."
    },
    {
      icon: Calendar,
      title: "Timeline Tracker",
      description: "Never miss important deadlines for admissions, scholarships, and entrance exams."
    },
    {
      icon: BookOpen,
      title: "Course Mapping",
      description: "Visualize how different courses lead to various career opportunities."
    },
    {
      icon: TrendingUp,
      title: "Career Analytics",
      description: "Get insights into job market trends and salary expectations."
    },
    {
      icon: Users,
      title: "Expert Guidance",
      description: "Connect with industry professionals and education counselors."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-row justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Future Starts with the
            <span className="text-blue-600"> Right Choice</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Navigate your educational journey with confidence. Get personalized career recommendations, 
            find the perfect colleges, and plan your path to success.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/quiz"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Take Career Quiz
            </Link>
            <Link
              to="/colleges"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-lg border-2 border-blue-600"
            >
              Explore Colleges
            </Link>
          </div>
        </motion.div>
         <div className='ml-10 w-1/2 text-center'>
              {/* Placeholder for an illustrative image */}
              <img src="/book.gif" 
              alt="Animated book" 
              className="h-180 w-full max-w-md" />
            </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Career Success
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform provides all the tools and resources you need to make informed decisions about your future.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Shape Your Future?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have already discovered their ideal career path.
          </p>
          <Link
            to="/quiz"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200 shadow-lg"
          >
            Start Your Journey Today
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;