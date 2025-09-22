import React from 'react';
import { motion } from 'framer-motion';

interface QuizOption {
  id: string;
  text: string;
  weights: Record<string, number>;
}

interface QuizQuestionData {
  id: number;
  text: string;
  options: QuizOption[];
}

interface QuizQuestionProps {
  question: QuizQuestionData;
  selectedOption?: string;
  onOptionSelect: (questionId: number, optionId: string) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedOption,
  onOptionSelect
}) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {question.text}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, index) => (
          <motion.button
            key={option.id}
            onClick={() => onOptionSelect(question.id, option.id)}
            className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
              selectedOption === option.id
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-25'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedOption === option.id
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}
              >
                {selectedOption === option.id && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
              <span className="font-medium">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default QuizQuestion;