import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Wave } from './Wave';
import { Detector } from './Detector';
import { Slits } from './Slits';
import { useExperimentStore } from './store';

export function DoubleSlit() {
  const { isParticleMode, toggleMode, intensity } = useExperimentStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">The Double Slit Experiment</h1>
        
        <div className="mb-8">
          <button
            onClick={toggleMode}
            className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
          >
            {isParticleMode ? 'Switch to Wave Mode' : 'Switch to Particle Mode'}
          </button>
        </div>

        <div className="h-[600px] rounded-lg overflow-hidden">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Slits />
            <Wave visible={!isParticleMode} />
            <Detector intensity={intensity} />
            <OrbitControls />
          </Canvas>
        </div>

        <div className="mt-8 prose prose-invert max-w-none">
          <h2 className="text-2xl font-semibold mb-4">What's Happening Here?</h2>
          <p>
            The double-slit experiment demonstrates one of the most bizarre phenomena
            in quantum physics - wave-particle duality. When we shoot individual particles
            (like electrons or photons) through two slits, they create an interference
            pattern as if they were waves passing through both slits simultaneously.
          </p>
          <p>
            This suggests that quantum objects exist in multiple states simultaneously
            (superposition) until they are observed, at which point they "collapse"
            into a definite state - a phenomenon that challenges our classical
            understanding of reality.
          </p>
        </div>
      </div>
    </div>
  );
}