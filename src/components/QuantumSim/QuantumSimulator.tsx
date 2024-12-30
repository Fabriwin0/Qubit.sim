import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { BlochSphere } from './BlochSphere';
import { StateDisplay } from './StateDisplay';
import { SystemMetricsDisplay } from './SystemMetrics';
import { QubitMath } from './QubitMath';
import { gates } from './gates';
import { QubitState, SystemMetrics, MeasurementResult } from './types';
import { SYSTEM_CONSTANTS } from './constants';

export function QuantumSimulator() {
  const [qubitState, setQubitState] = useState<QubitState>(QubitMath.initializeQubit());
  const [metrics, setMetrics] = useState<SystemMetrics>({
    bufferUtilization: 0,
    responseTime: 0,
    errorRate: 0,
    coherenceTime: SYSTEM_CONSTANTS.T2
  });
  
  const [measurement, setMeasurement] = useState<MeasurementResult>({
    probabilities: { p0: 1, p1: 0 },
    fidelity: 1,
    timestamp: Date.now()
  });

  const blochCoords = QubitMath.toBlochCoordinates(qubitState);

  const applyGate = (gateName: string) => {
    const gate = gates[gateName];
    const newState = QubitMath.applyGate(qubitState, gate);
    setQubitState(newState);
    
    // Update measurements
    const probs = QubitMath.getMeasurementProbabilities(newState);
    setMeasurement({
      probabilities: probs,
      fidelity: SYSTEM_CONSTANTS.GATE_FIDELITIES[gateName],
      timestamp: Date.now()
    });
  };

  // Simulate system metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        bufferUtilization: Math.random() * 0.3,
        responseTime: 0.1 + Math.random() * 0.2,
        errorRate: Math.random() * 0.001,
        coherenceTime: SYSTEM_CONSTANTS.T2 * (0.9 + Math.random() * 0.2)
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6">Quantum Qubit Simulator</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Controls</h2>
              <div className="space-x-4">
                {Object.keys(gates).map(gate => (
                  <button
                    key={gate}
                    onClick={() => applyGate(gate)}
                    className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
                  >
                    {gate} Gate
                  </button>
                ))}
              </div>
            </div>

            <StateDisplay state={qubitState} measurement={measurement} />
            <SystemMetricsDisplay metrics={metrics} />
          </div>

          <div className="h-[600px]">
            <h2 className="text-2xl font-semibold mb-4">Bloch Sphere</h2>
            <div className="h-full bg-gray-800 rounded">
              <Canvas camera={{ position: [3, 2, 2] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <BlochSphere 
                  coordinates={blochCoords}
                  theta={qubitState.theta}
                  phi={qubitState.phi}
                />
                <OrbitControls />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}