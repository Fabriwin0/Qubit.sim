import React from 'react';
import { SystemMetrics } from './types';
import { SYSTEM_CONSTANTS } from './constants';

interface MetricsDisplayProps {
  metrics: SystemMetrics;
}

export function SystemMetricsDisplay({ metrics }: MetricsDisplayProps) {
  return (
    <div className="bg-gray-800 p-4 rounded">
      <h3 className="text-lg font-semibold mb-2">System Metrics</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm text-gray-400">Decoherence Times</h4>
          <p>T₁: {SYSTEM_CONSTANTS.T1} µs</p>
          <p>T₂: {SYSTEM_CONSTANTS.T2} µs</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Buffer Status</h4>
          <p>Utilization: {(metrics.bufferUtilization * 100).toFixed(1)}%</p>
          <p>Response: {metrics.responseTime.toFixed(2)} ms</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">System Parameters</h4>
          <p>g: {(SYSTEM_CONSTANTS.COUPLING_STRENGTH / 1e6).toFixed(1)} MHz</p>
          <p>ω: {(SYSTEM_CONSTANTS.QUBIT_FREQUENCY / 1e9).toFixed(1)} GHz</p>
        </div>
        
        <div>
          <h4 className="text-sm text-gray-400">Error Metrics</h4>
          <p>Rate: {(metrics.errorRate * 100).toFixed(3)}%</p>
          <p>Coherence: {metrics.coherenceTime.toFixed(1)} µs</p>
        </div>
      </div>
      
      <div className="mt-2 text-xs text-gray-500">
        Last updated: {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
}