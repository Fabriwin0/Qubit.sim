import React, { useState, useEffect } from 'react';
import { BookOpen, Play, CheckCircle, Lock, Star, ArrowRight } from 'lucide-react';
import { TutorialProgress } from './TutorialProgress';
import { ConceptExplainer } from './ConceptExplainer';
import { InteractiveDemo } from './InteractiveDemo';
import { QuizComponent } from './QuizComponent';
import { useTutorialStore } from './tutorialStore';
import { tutorials, TutorialLevel, Tutorial } from './tutorialData';

export function TutorialSystem() {
  const {
    currentTutorial,
    currentStep,
    userLevel,
    completedTutorials,
    progress,
    setCurrentTutorial,
    setUserLevel,
    completeStep,
    resetProgress
  } = useTutorialStore();

  const [showLevelSelector, setShowLevelSelector] = useState(!userLevel);
  const [activeDemo, setActiveDemo] = useState<string | null>(null);

  const levels: { key: TutorialLevel; name: string; description: string; icon: string }[] = [
    {
      key: 'beginner',
      name: 'Beginner',
      description: 'No prior physics knowledge required. Start with basic concepts.',
      icon: '🌱'
    },
    {
      key: 'intermediate',
      name: 'Intermediate',
      description: 'Some physics background. Familiar with waves and probability.',
      icon: '🔬'
    },
    {
      key: 'advanced',
      name: 'Advanced',
      description: 'Strong physics/math background. Ready for complex quantum mechanics.',
      icon: '⚛️'
    }
  ];

  const handleLevelSelection = (level: TutorialLevel) => {
    setUserLevel(level);
    setShowLevelSelector(false);
  };

  const startTutorial = (tutorial: Tutorial) => {
    setCurrentTutorial(tutorial.id);
  };

  const isUnlocked = (tutorial: Tutorial): boolean => {
    if (tutorial.prerequisites.length === 0) return true;
    return tutorial.prerequisites.every(prereq => 
      completedTutorials.includes(prereq)
    );
  };

  const getProgressPercentage = (tutorialId: string): number => {
    const tutorialProgress = progress[tutorialId];
    if (!tutorialProgress) return 0;
    const tutorial = tutorials.find(t => t.id === tutorialId);
    if (!tutorial) return 0;
    return (tutorialProgress.completedSteps / tutorial.steps.length) * 100;
  };

  if (showLevelSelector) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4">
              Welcome to Quantum Learning
            </h1>
            <p className="text-xl text-blue-200 mb-8">
              Choose your starting level to begin your quantum journey
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {levels.map((level) => (
              <div
                key={level.key}
                onClick={() => handleLevelSelection(level.key)}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-8 cursor-pointer 
                         hover:bg-white/20 transition-all duration-300 hover:scale-105
                         border border-white/20"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{level.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{level.name}</h3>
                  <p className="text-blue-200 leading-relaxed">{level.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-blue-300 text-sm">
              Don't worry - you can change your level anytime in settings
            </p>
          </div>
        </div>
      </div>
    );
  }

  const filteredTutorials = tutorials.filter(t => 
    t.level === userLevel || t.level === 'all'
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Quantum Learning Path</h1>
            <p className="text-gray-400">
              Level: <span className="text-blue-400 capitalize">{userLevel}</span>
            </p>
          </div>
          <button
            onClick={() => setShowLevelSelector(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
          >
            Change Level
          </button>
        </div>

        <TutorialProgress 
          completedCount={completedTutorials.length}
          totalCount={filteredTutorials.length}
          currentLevel={userLevel}
        />

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-6">Available Tutorials</h2>
            <div className="space-y-4">
              {filteredTutorials.map((tutorial) => {
                const unlocked = isUnlocked(tutorial);
                const completed = completedTutorials.includes(tutorial.id);
                const progressPercent = getProgressPercentage(tutorial.id);

                return (
                  <div
                    key={tutorial.id}
                    className={`bg-gray-800 rounded-lg p-6 border-l-4 ${
                      completed ? 'border-green-500' : 
                      unlocked ? 'border-blue-500' : 'border-gray-600'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          {completed ? (
                            <CheckCircle className="w-6 h-6 text-green-500" />
                          ) : unlocked ? (
                            <BookOpen className="w-6 h-6 text-blue-500" />
                          ) : (
                            <Lock className="w-6 h-6 text-gray-500" />
                          )}
                          <h3 className="text-xl font-semibold">{tutorial.title}</h3>
                          <div className="flex">
                            {Array.from({ length: tutorial.difficulty }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                            ))}
                          </div>
                        </div>
                        
                        <p className="text-gray-300 mb-3">{tutorial.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span>⏱️ {tutorial.estimatedTime}</span>
                          <span>📚 {tutorial.steps.length} steps</span>
                          {tutorial.hasInteractiveDemo && <span>🎮 Interactive</span>}
                          {tutorial.hasQuiz && <span>❓ Quiz included</span>}
                        </div>

                        {progressPercent > 0 && progressPercent < 100 && (
                          <div className="mt-3">
                            <div className="flex justify-between text-sm text-gray-400 mb-1">
                              <span>Progress</span>
                              <span>{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {tutorial.prerequisites.length > 0 && (
                          <div className="mt-3">
                            <span className="text-sm text-gray-400">Prerequisites: </span>
                            {tutorial.prerequisites.map((prereq, index) => {
                              const prereqTutorial = tutorials.find(t => t.id === prereq);
                              const isCompleted = completedTutorials.includes(prereq);
                              return (
                                <span 
                                  key={prereq}
                                  className={`text-sm ${isCompleted ? 'text-green-400' : 'text-red-400'}`}
                                >
                                  {prereqTutorial?.title}
                                  {index < tutorial.prerequisites.length - 1 ? ', ' : ''}
                                </span>
                              );
                            })}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-2">
                        {unlocked && (
                          <button
                            onClick={() => startTutorial(tutorial)}
                            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg 
                                     flex items-center gap-2 transition-colors"
                          >
                            <Play className="w-4 h-4" />
                            {progressPercent > 0 ? 'Continue' : 'Start'}
                          </button>
                        )}
                        
                        {tutorial.hasInteractiveDemo && unlocked && (
                          <button
                            onClick={() => setActiveDemo(tutorial.id)}
                            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg 
                                     text-sm transition-colors"
                          >
                            Try Demo
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-6">
            <ConceptExplainer level={userLevel} />
            
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Tips</h3>
              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Take your time with each concept before moving on</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Use the interactive demos to visualize abstract concepts</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Complete quizzes to test your understanding</span>
                </div>
                <div className="flex items-start gap-2">
                  <ArrowRight className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                  <span>Review previous tutorials if you feel lost</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-sm text-blue-100 mb-4">
                Stuck on a concept? Our adaptive explanations adjust to your level.
              </p>
              <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
                Get Help
              </button>
            </div>
          </div>
        </div>

        {activeDemo && (
          <InteractiveDemo 
            tutorialId={activeDemo}
            onClose={() => setActiveDemo(null)}
          />
        )}
      </div>
    </div>
  );
}