import React from 'react';
import { Line, Sphere } from '@react-three/drei';
import { BlochSphereLabels } from './BlochSphereLabels';

interface BlochSphereProps {
  coordinates: { x: number; y: number; z: number };
  theta: number;
  phi: number;
}

export function BlochSphere({ coordinates, theta, phi }: BlochSphereProps) {
  // Draw axes
  const axes = [
    [[0, 0, -1], [0, 0, 1]], // Z-axis
    [[-1, 0, 0], [1, 0, 0]], // X-axis
    [[0, -1, 0], [0, 1, 0]]  // Y-axis
  ];

  // Draw phase circles
  const equator = Array.from({ length: 64 }).map((_, i) => {
    const angle = (i / 32) * Math.PI;
    return [Math.cos(angle), Math.sin(angle), 0];
  });

  return (
    <group>
      {/* Bloch sphere */}
      <Sphere args={[1, 32, 32]} position={[0, 0, 0]}>
        <meshPhongMaterial wireframe color="#444" opacity={0.5} transparent />
      </Sphere>

      {/* Coordinate axes */}
      {axes.map((points, i) => (
        <Line
          key={i}
          points={points}
          color="#666"
          lineWidth={1}
        />
      ))}

      {/* Equatorial circle */}
      <Line
        points={equator}
        color="#444"
        lineWidth={1}
      />

      {/* State vector */}
      <Line
        points={[[0, 0, 0], [coordinates.x, coordinates.y, coordinates.z]]}
        color="#00ff00"
        lineWidth={2}
      />

      {/* State point */}
      <mesh position={[coordinates.x, coordinates.y, coordinates.z]}>
        <sphereGeometry args={[0.05]} />
        <meshStandardMaterial color="#00ff00" emissive="#00ff00" />
      </mesh>

      {/* Labels */}
      <BlochSphereLabels />
    </group>
  );
}