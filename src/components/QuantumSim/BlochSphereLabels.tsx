import React from 'react';
import { Html } from '@react-three/drei';

export function BlochSphereLabels() {
  return (
    <>
      {/* Axis labels */}
      <Html position={[1.2, 0, 0]}><div className="text-white">|+⟩ x</div></Html>
      <Html position={[-1.2, 0, 0]}><div className="text-white">|-⟩ x</div></Html>
      <Html position={[0, 1.2, 0]}><div className="text-white">|+⟩ y</div></Html>
      <Html position={[0, -1.2, 0]}><div className="text-white">|-⟩ y</div></Html>
      <Html position={[0, 0, 1.2]}><div className="text-white">|0⟩</div></Html>
      <Html position={[0, 0, -1.2]}><div className="text-white">|1⟩</div></Html>
      
      {/* Phase angles */}
      <Html position={[0.7, 0.7, 0]}>
        <div className="text-white text-sm">π/4</div>
      </Html>
      <Html position={[-0.7, 0.7, 0]}>
        <div className="text-white text-sm">3π/4</div>
      </Html>
    </>
  );
}