import React from 'react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { TrendingUp, Users, BookOpen, MapPin, Calendar, Star } from 'lucide-react';

const Analytics = () => {
  // Mock data for analytics
  const streamDistribution = [
    { name: 'Science', value: 35, color: '#3B82F6' },
    { name: 'Commerce', value: 28, color: '#10B981' },
    { name: 'Arts', value: 22, color: '#8B5CF6' },
    { name: 'Vocational', value: 15, color: '#F97316' }
  ];

  const monthlyUsers = [
    { month: 'Jan', users: 1200 },
    { month: 'Feb', users: 1500 },
    { month: 'Mar', users: 1800 },
    { month: 'Apr', users: 2200 },
    { month: 'May', users: 2800 },
    { month: 'Jun', users: 3200 }
  ];

  const popularCourses = [
    { course: 'B.Tech Engineering', students: 450 },
    { course: 'MBBS', students: 380 },
    { course: 'BBA', students: 320 },
    { course: 'B.Sc Physics', students: 280 },
    { course: 'B.Com', students: 250 },
    { course: 'B.A Psychology', students: 200 }
  ];

  const regionData = [
    { region: 'North India', users: 2800 },
    { region: 'South India', users: 3200 },
    { region: 'West India', users: 2600 },
    { region: 'East India', users: 1800 },
    { region: 'Central India', users: 1600 }
  ];

  const stats = [
    {
      title: 'Total Users',
      value: '12,450',
      change: '+15.3%',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Quizzes Completed',
      value: '8,920',
      change: '+22.1%',
      icon: BookOpen,
      color: 'text-green-600'
    },
    {
      title: 'Colleges Viewed',
      value: '45,320',
      change: '+18.7%',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      title: 'Events Saved',
      value: '6,780',
      change: '+12.4%',
      icon: Calendar,
      color: 'text-orange-600'
    }
  ];

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
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Analytics Dashboard</h1>
              <p className="text-xl text-gray-600">
                Insights into student preferences and platform usage
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Last updated</p>
              <p className="text-lg font-semibold text-gray-900">June 15, 2024</p>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium mt-1">{stat.change}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Stream Distribution */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Student Interest by Stream</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={streamDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {streamDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Monthly Growth */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">User Growth Over Time</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyUsers}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Popular Courses */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Most Popular Courses</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={popularCourses} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="course" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="students" fill="#10B981" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Regional Distribution */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="bg-white rounded-xl shadow-md p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Users by Region</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="region" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8B5CF6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 bg-white rounded-xl shadow-md p-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Growing Science Interest</h4>
              <p className="text-blue-700 text-sm">
                Science stream shows the highest interest at 35%, indicating strong STEM career aspirations among students.
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-2">Rapid User Growth</h4>
              <p className="text-green-700 text-sm">
                Platform usage has grown 167% from January to June, showing strong adoption and engagement.
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-900 mb-2">Regional Penetration</h4>
              <p className="text-purple-700 text-sm">
                South India leads in user adoption, followed by North India, indicating strong market presence.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Analytics;