interface QuizOption {
  id: string;
  text: string;
  weights: Record<string, number>;
}

interface QuizQuestion {
  id: number;
  text: string;
  options: QuizOption[];
}

interface QuizAnswer {
  questionId: number;
  selectedOption: string;
}

interface QuizResults {
  recommendedStream: string;
  topCourses: string[];
  scores: Record<string, number>;
}

export const calculateQuizResults = (
  answers: QuizAnswer[],
  questions: QuizQuestion[]
): QuizResults => {
  const scores: Record<string, number> = {
    SCIENCE: 0,
    COMMERCE: 0,
    ARTS: 0,
    VOCATIONAL: 0
  };

  // Calculate scores based on answers
  answers.forEach(answer => {
    const question = questions.find(q => q.id === answer.questionId);
    if (question) {
      const selectedOption = question.options.find(opt => opt.id === answer.selectedOption);
      if (selectedOption) {
        Object.entries(selectedOption.weights).forEach(([stream, weight]) => {
          scores[stream] += weight;
        });
      }
    }
  });

  // Find recommended stream (highest score)
  const recommendedStream = Object.entries(scores).reduce((a, b) => 
    scores[a[0]] > scores[b[0]] ? a : b
  )[0];

  // Mock course recommendations based on stream
  const courseRecommendations: Record<string, string[]> = {
    SCIENCE: ['B.Sc Physics', 'B.Sc Chemistry', 'B.Tech Engineering', 'MBBS'],
    COMMERCE: ['B.Com Accounting', 'BBA', 'B.Com Finance', 'CA', 'CS'],
    ARTS: ['B.A Psychology', 'B.A Literature', 'B.A History', 'Journalism'],
    VOCATIONAL: ['Diploma in Computer Engineering', 'ITI Courses', 'Polytechnic', 'Skill Development']
  };

  const topCourses = courseRecommendations[recommendedStream] || [];

  return {
    recommendedStream,
    topCourses: topCourses.slice(0, 3),
    scores
  };
};