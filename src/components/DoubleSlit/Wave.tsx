import React, { useMemo } from 'react';
import { Vector3 } from 'three';
import { useFrame } from '@react-three/fiber';

export function Wave({ visible }: { visible: boolean }) {
  const points = useMemo(() => {
    const pts = [];
    const count = 100;
    for (let i = 0; i < count; i++) {
      const x = (i - count / 2) * 0.1;
      pts.push(new Vector3(x, 0, 0));
    }
    return pts;
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    points.forEach((point, i) => {
      const x = point.x;
      point.y = Math.sin(x * 2 + time) * 0.2;
    });
  });

  if (!visible) return null;

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.length * 3)}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00ff00" />
    </line>
  );
}