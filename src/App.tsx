
import { Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { QuizProvider } from './context/QuizContext';
import Header from './components/Header';
import Footer from './components/Footer';
import PlaceholderChatbot from './components/PlaceholderChatbot';
import Home from './routes/Home';
import Quiz from './routes/Quiz';
import QuizResults from './routes/QuizResults';
import CareerMap from './routes/CareerMap';
import Colleges from './routes/Colleges';
import Timeline from './routes/Timeline';
import Dashboard from './routes/Dashboard';
import Compare from './routes/Compare';
import Resources from './routes/Resources';
import Feedback from './routes/Feedback';
import Analytics from './routes/Analytics';

function App() {
  return (
    <UserProvider>
      <QuizProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/quiz" element={<Quiz />} />
              <Route path="/quiz/results" element={<QuizResults />} />
              <Route path="/career-map" element={<CareerMap />} />
              <Route path="/colleges" element={<Colleges />} />
              <Route path="/timeline" element={<Timeline />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
          <Footer />
          <PlaceholderChatbot />
        </div>
      </QuizProvider>
    </UserProvider>
  );
}

export default App;