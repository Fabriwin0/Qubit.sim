import React, { useState } from 'react';
import { X, Play, RotateCcw, Settings } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BlochSphere } from '../QuantumSim/BlochSphere';
import { QubitMath } from '../QuantumSim/QubitMath';
import { gates } from '../QuantumSim/gates';

interface InteractiveDemoProps {
  tutorialId: string;
  onClose: () => void;
}

export function InteractiveDemo({ tutorialId, onClose }: InteractiveDemoProps) {
  const [qubitState, setQubitState] = useState(QubitMath.initializeQubit());
  const [isAnimating, setIsAnimating] = useState(false);
  const [speed, setSpeed] = useState(1);

  const blochCoords = QubitMath.toBlochCoordinates(qubitState);

  const applyGate = (gateName: string) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const gate = gates[gateName];
    
    // Animate the gate application
    setTimeout(() => {
      const newState = QubitMath.applyGate(qubitState, gate);
      setQubitState(newState);
      setIsAnimating(false);
    }, 500 / speed);
  };

  const resetState = () => {
    setQubitState(QubitMath.initializeQubit());
    setIsAnimating(false);
  };

  const getDemoContent = () => {
    switch (tutorialId) {
      case 'quantum-basics':
        return {
          title: 'Quantum State Visualization',
          description: 'Watch how quantum gates transform the qubit state on the Bloch sphere.',
          controls: (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Apply Quantum Gates:</h4>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(gates).map(gate => (
                    <button
                      key={gate}
                      onClick={() => applyGate(gate)}
                      disabled={isAnimating}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 
                               px-3 py-2 rounded text-sm transition-colors"
                    >
                      {gate} Gate
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Current State:</h4>
                <div className="bg-gray-700 p-3 rounded text-sm font-mono">
                  |ψ⟩ = {qubitState.alpha.real.toFixed(3)}|0⟩ + {qubitState.beta.real.toFixed(3)}|1⟩
                </div>
              </div>
            </div>
          )
        };
      
      case 'superposition':
        return {
          title: 'Superposition Demo',
          description: 'Create and explore quantum superposition states.',
          controls: (
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Create Superposition:</h4>
                <button
                  onClick={() => applyGate('H')}
                  disabled={isAnimating}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 
                           px-4 py-2 rounded transition-colors"
                >
                  Apply Hadamard Gate
                </button>
              </div>
              
              <div className="bg-purple-900/30 border border-purple-500/30 rounded p-3">
                <p className="text-sm text-purple-200">
                  The Hadamard gate creates an equal superposition of |0⟩ and |1⟩ states.
                  Notice how the qubit moves to the equator of the Bloch sphere.
                </p>
              </div>
            </div>
          )
        };
      
      default:
        return {
          title: 'Interactive Demo',
          description: 'Explore quantum concepts through visualization.',
          controls: <div>Demo content for {tutorialId}</div>
        };
    }
  };

  const demoContent = getDemoContent();

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <div>
            <h2 className="text-2xl font-bold text-white">{demoContent.title}</h2>
            <p className="text-gray-400">{demoContent.description}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 p-6">
          <div className="space-y-6">
            {demoContent.controls}
            
            <div className="flex items-center gap-4">
              <button
                onClick={resetState}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded 
                         flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
              
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 text-gray-400" />
                <label className="text-sm text-gray-400">Speed:</label>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.5"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-20"
                />
                <span className="text-sm text-gray-400">{speed}x</span>
              </div>
            </div>

            <div className="bg-gray-700 p-4 rounded">
              <h4 className="font-medium mb-2">Measurement Probabilities:</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>|0⟩:</span>
                  <span>{(QubitMath.getMeasurementProbabilities(qubitState).p0 * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>|1⟩:</span>
                  <span>{(QubitMath.getMeasurementProbabilities(qubitState).p1 * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[500px] bg-gray-900 rounded-lg">
            <Canvas camera={{ position: [3, 2, 2] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <BlochSphere 
                coordinates={blochCoords}
                theta={qubitState.theta || 0}
                phi={qubitState.phi || 0}
              />
              <OrbitControls enableZoom={true} enablePan={false} />
            </Canvas>
          </div>
        </div>
      </div>
    </div>
  );
}