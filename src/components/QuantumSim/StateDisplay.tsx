import React from 'react';
import { QubitState, MeasurementResult } from './types';

interface StateDisplayProps {
  state: QubitState;
  measurement: MeasurementResult;
}

export function StateDisplay({ state, measurement }: StateDisplayProps) {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">Quantum State</h3>
      
      <div className="space-y-2">
        <div>
          <h4 className="text-sm text-gray-400">State Vector</h4>
          <p>|ψ⟩ = {state.alpha.real.toFixed(3)}|0⟩ + {state.beta.real.toFixed(3)}|1⟩</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Spherical Coordinates</h4>
          <p>θ: {(state.theta * 180 / Math.PI).toFixed(1)}°</p>
          <p>φ: {(state.phi * 180 / Math.PI).toFixed(1)}°</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Measurement Probabilities</h4>
          <p>|0⟩: {(measurement.probabilities.p0 * 100).toFixed(1)}%</p>
          <p>|1⟩: {(measurement.probabilities.p1 * 100).toFixed(1)}%</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Fidelity</h4>
          <p>{(measurement.fidelity * 100).toFixed(2)}%</p>
        </div>
      </div>
    </div>
  );
}