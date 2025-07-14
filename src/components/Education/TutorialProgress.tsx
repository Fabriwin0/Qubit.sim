import React from 'react';
import { Trophy, Target, BookOpen } from 'lucide-react';
import { TutorialLevel } from './tutorialData';

interface TutorialProgressProps {
  completedCount: number;
  totalCount: number;
  currentLevel: TutorialLevel;
}

export function TutorialProgress({ completedCount, totalCount, currentLevel }: TutorialProgressProps) {
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  
  const milestones = [
    { threshold: 25, title: 'Getting Started', icon: BookOpen, color: 'text-blue-400' },
    { threshold: 50, title: 'Making Progress', icon: Target, color: 'text-yellow-400' },
    { threshold: 75, title: 'Almost There', icon: Trophy, color: 'text-orange-400' },
    { threshold: 100, title: 'Quantum Master', icon: Trophy, color: 'text-green-400' }
  ];

  const currentMilestone = milestones.find(m => progressPercentage < m.threshold) || milestones[milestones.length - 1];
  const nextMilestone = milestones.find(m => progressPercentage < m.threshold);

  return (
    <div className="bg-gradient-to-r from-blue-800 to-purple-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Your Progress</h2>
          <p className="text-blue-200 capitalize">Level: {currentLevel}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-white">{completedCount}/{totalCount}</div>
          <div className="text-blue-200 text-sm">Tutorials Completed</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">Overall Progress</span>
          <span className="text-blue-200">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-blue-900/50 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-400 to-purple-400 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <currentMilestone.icon className={`w-5 h-5 ${currentMilestone.color}`} />
          <span className="text-white font-medium">{currentMilestone.title}</span>
        </div>
        
        {nextMilestone && progressPercentage < 100 && (
          <div className="text-blue-200 text-sm">
            {Math.ceil((nextMilestone.threshold - progressPercentage) / 100 * totalCount)} more to unlock "{nextMilestone.title}"
          </div>
        )}
      </div>

      {progressPercentage === 100 && (
        <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
          <div className="flex items-center gap-2 text-green-400">
            <Trophy className="w-5 h-5" />
            <span className="font-medium">Congratulations! You've completed all tutorials for this level!</span>
          </div>
        </div>
      )}
    </div>
  );
}