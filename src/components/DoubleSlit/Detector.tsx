import React from 'react';

export function Detector({ intensity }: { intensity: number }) {
  return (
    <mesh position={[2, 0, 0]}>
      <planeGeometry args={[0.1, 4]} />
      <meshStandardMaterial 
        color="#fff"
        emissive="#00ff00"
        emissiveIntensity={intensity}
      />
    </mesh>
  );
}