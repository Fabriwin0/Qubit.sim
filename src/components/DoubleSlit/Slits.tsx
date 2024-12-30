import React from 'react';

export function Slits() {
  return (
    <group>
      <mesh position={[0, 1, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      <mesh position={[0, -1, 0]}>
        <boxGeometry args={[0.1, 1, 0.1]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </group>
  );
}