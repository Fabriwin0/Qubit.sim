import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TutorialLevel } from './tutorialData';

interface TutorialProgress {
  completedSteps: number;
  totalSteps: number;
  lastAccessed: number;
  score?: number;
}

interface TutorialState {
  // User settings
  userLevel: TutorialLevel | null;
  
  // Current tutorial state
  currentTutorial: string | null;
  currentStep: number;
  
  // Progress tracking
  completedTutorials: string[];
  progress: Record<string, TutorialProgress>;
  
  // User preferences
  preferences: {
    showHints: boolean;
    autoAdvance: boolean;
    soundEnabled: boolean;
  };
  
  // Actions
  setUserLevel: (level: TutorialLevel) => void;
  setCurrentTutorial: (tutorialId: string) => void;
  setCurrentStep: (step: number) => void;
  completeStep: (tutorialId: string, stepIndex: number) => void;
  completeTutorial: (tutorialId: string, score?: number) => void;
  resetProgress: () => void;
  updatePreferences: (prefs: Partial<TutorialState['preferences']>) => void;
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      // Initial state
      userLevel: null,
      currentTutorial: null,
      currentStep: 0,
      completedTutorials: [],
      progress: {},
      preferences: {
        showHints: true,
        autoAdvance: false,
        soundEnabled: true,
      },

      // Actions
      setUserLevel: (level) => set({ userLevel: level }),
      
      setCurrentTutorial: (tutorialId) => set({ 
        currentTutorial: tutorialId, 
        currentStep: 0 
      }),
      
      setCurrentStep: (step) => set({ currentStep: step }),
      
      completeStep: (tutorialId, stepIndex) => {
        const state = get();
        const currentProgress = state.progress[tutorialId] || {
          completedSteps: 0,
          totalSteps: 0,
          lastAccessed: Date.now()
        };
        
        set({
          progress: {
            ...state.progress,
            [tutorialId]: {
              ...currentProgress,
              completedSteps: Math.max(currentProgress.completedSteps, stepIndex + 1),
              lastAccessed: Date.now()
            }
          }
        });
      },
      
      completeTutorial: (tutorialId, score) => {
        const state = get();
        set({
          completedTutorials: [...new Set([...state.completedTutorials, tutorialId])],
          progress: {
            ...state.progress,
            [tutorialId]: {
              ...state.progress[tutorialId],
              score,
              lastAccessed: Date.now()
            }
          }
        });
      },
      
      resetProgress: () => set({
        completedTutorials: [],
        progress: {},
        currentTutorial: null,
        currentStep: 0
      }),
      
      updatePreferences: (prefs) => set((state) => ({
        preferences: { ...state.preferences, ...prefs }
      }))
    }),
    {
      name: 'quantum-tutorial-storage',
      partialize: (state) => ({
        userLevel: state.userLevel,
        completedTutorials: state.completedTutorials,
        progress: state.progress,
        preferences: state.preferences
      })
    }
  )
);