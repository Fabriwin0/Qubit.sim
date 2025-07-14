import React, { useState } from 'react';
import { CheckCircle, XCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface QuizComponentProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onClose: () => void;
}

export function QuizComponent({ questions, onComplete, onClose }: QuizComponentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isCorrect = selectedAnswer === question.correctAnswer;

  const handleAnswerSelect = (answerIndex: number) => {
    if (showExplanation) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedAnswer;
    setAnswers(newAnswers);
    
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Knowledge Check</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-gray-400">
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className={`text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                {question.difficulty.toUpperCase()}
              </span>
            </div>
            <div className="text-gray-400">
              Score: {score}/{questions.length}
            </div>
          </div>
          
          <div className="w-full bg-gray-700 rounded-full h-2 mt-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              {question.question}
            </h3>
            
            <div className="space-y-3">
              {question.options.map((option, index) => {
                let buttonClass = "w-full text-left p-4 rounded-lg border transition-all duration-200 ";
                
                if (showExplanation) {
                  if (index === question.correctAnswer) {
                    buttonClass += "border-green-500 bg-green-500/20 text-green-100";
                  } else if (index === selectedAnswer && index !== question.correctAnswer) {
                    buttonClass += "border-red-500 bg-red-500/20 text-red-100";
                  } else {
                    buttonClass += "border-gray-600 bg-gray-700 text-gray-300";
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += "border-blue-500 bg-blue-500/20 text-blue-100";
                } else {
                  buttonClass += "border-gray-600 bg-gray-700 text-gray-300 hover:border-gray-500 hover:bg-gray-600";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={buttonClass}
                    disabled={showExplanation}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-sm font-bold">
                        {String.fromCharCode(65 + index)}
                      </div>
                      <span>{option}</span>
                      {showExplanation && index === question.correctAnswer && (
                        <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                      )}
                      {showExplanation && index === selectedAnswer && index !== question.correctAnswer && (
                        <XCircle className="w-5 h-5 text-red-400 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {showExplanation && (
            <div className={`p-4 rounded-lg border-l-4 mb-6 ${
              isCorrect 
                ? 'border-green-500 bg-green-500/10' 
                : 'border-red-500 bg-red-500/10'
            }`}>
              <div className="flex items-start gap-2">
                {isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                ) : (
                  <HelpCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <h4 className={`font-medium mb-2 ${isCorrect ? 'text-green-100' : 'text-red-100'}`}>
                    {isCorrect ? 'Correct!' : 'Not quite right'}
                  </h4>
                  <p className={`text-sm ${isCorrect ? 'text-green-200' : 'text-red-200'}`}>
                    {question.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Exit Quiz
            </button>
            
            <div className="flex gap-3">
              {!showExplanation ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedAnswer === null}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                           px-6 py-2 rounded-lg transition-colors"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg 
                           flex items-center gap-2 transition-colors"
                >
                  {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}