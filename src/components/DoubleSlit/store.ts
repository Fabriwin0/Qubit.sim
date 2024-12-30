import create from 'zustand';

interface ExperimentState {
  isParticleMode: boolean;
  intensity: number;
  toggleMode: () => void;
  setIntensity: (intensity: number) => void;
}

export const useExperimentStore = create<ExperimentState>((set) => ({
  isParticleMode: false,
  intensity: 0,
  toggleMode: () => set((state) => ({ isParticleMode: !state.isParticleMode })),
  setIntensity: (intensity) => set({ intensity }),
}));