import React, { createContext, useContext, useState } from 'react';

interface QuizAnswer {
  questionId: number;
  selectedOption: string;
}

interface QuizResults {
  recommendedStream: string;
  topCourses: string[];
  scores: Record<string, number>;
}

interface QuizContextType {
  answers: QuizAnswer[];
  currentQuestion: number;
  results: QuizResults | null;
  setAnswer: (questionId: number, selectedOption: string) => void;
  setCurrentQuestion: (question: number) => void;
  setResults: (results: QuizResults) => void;
  resetQuiz: () => void;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [results, setResults] = useState<QuizResults | null>(null);

  const setAnswer = (questionId: number, selectedOption: string) => {
    setAnswers(prev => {
      const existing = prev.find(a => a.questionId === questionId);
      if (existing) {
        return prev.map(a => a.questionId === questionId ? { questionId, selectedOption } : a);
      }
      return [...prev, { questionId, selectedOption }];
    });
  };

  const resetQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setResults(null);
  };

  return (
    <QuizContext.Provider value={{
      answers,
      currentQuestion,
      results,
      setAnswer,
      setCurrentQuestion,
      setResults,
      resetQuiz
    }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};