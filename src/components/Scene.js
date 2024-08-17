import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function MorphingShape() {
  const meshRef = useRef();
  const geometryRef = useRef();
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragOffset, setDragOffset] = React.useState(new THREE.Vector3());
  const { camera, size } = useThree();

  const isMobile = size.width < 768;

  const geometry = useMemo(() => new THREE.IcosahedronGeometry(3, isMobile ? 15 : 20), [isMobile]);
  const originalPositions = useMemo(() => geometry.attributes.position.array.slice(), [geometry]);
  
  React.useEffect(() => {
    const aspect = size.width / size.height;
    if (aspect < 1) {
      camera.position.z = 15; // Mobile
    } else {
      camera.position.z = 8; // Desktop (unchanged)
    }
    camera.updateProjectionMatrix();
  }, [camera, size]);

  useFrame(({ clock, mouse }) => {
    if (meshRef.current && geometryRef.current) {
      const time = clock.getElapsedTime();
      const positions = geometryRef.current.attributes.position;
      
      for (let i = 0; i < positions.count; i++) {
        const i3 = i * 3;
        const x = originalPositions[i3];
        const y = originalPositions[i3 + 1];
        const z = originalPositions[i3 + 2];
        
        const morphFactor1 = Math.sin(time * 0.5) * 0.5 + 0.5;
        const morphFactor2 = Math.cos(time * 0.3) * 0.5 + 0.5;
        const morphFactor3 = Math.sin(time * 0.7) * Math.cos(time * 0.4) * 0.5 + 0.5;
        
        const frequency = 2 + morphFactor1 * 2 + morphFactor2 * 1.5;
        const amplitude = 0.2 + morphFactor1 * 0.2 + morphFactor3 * 0.1;
        
        const rotationFactor = time * 0.2;
        const rotatedX = x * Math.cos(rotationFactor) - z * Math.sin(rotationFactor);
        const rotatedZ = x * Math.sin(rotationFactor) + z * Math.cos(rotationFactor);
        
        const noise = simplex3(
          rotatedX * frequency + time * 0.7, 
          y * frequency + time * 0.8, 
          rotatedZ * frequency + time * 0.9
        ) * amplitude;
        
        if (isDragging) {
          const mouseVector = new THREE.Vector3(mouse.x, mouse.y, 0).unproject(camera);
          const direction = mouseVector.sub(meshRef.current.position).normalize();
          const distance = mouseVector.distanceTo(meshRef.current.position);
          const strength = Math.max(0, 1 - distance / 5) * 2;

          positions.setXYZ(
            i,
            x + x * noise + direction.x * strength,
            y + y * noise + direction.y * strength,
            z + z * noise + direction.z * strength
          );
        } else {
          positions.setXYZ(
            i,
            x + x * noise,
            y + y * noise,
            z + z * noise
          );
        }
      }
      
      positions.needsUpdate = true;
    }
  });

  const handlePointerDown = (e) => {
    e.stopPropagation();
    setIsDragging(true);
    const newDragOffset = new THREE.Vector3(
      e.point.x - meshRef.current.position.x,
      e.point.y - meshRef.current.position.y,
      e.point.z - meshRef.current.position.z
    );
    setDragOffset(newDragOffset);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <mesh
      ref={meshRef}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <bufferGeometry ref={geometryRef} attach="geometry" {...geometry} />
      <meshPhongMaterial
        attach="material"
        color="#00ffff"
        emissive="#FFBF00"
        specular="#ffffff"
        shininess={100}
        wireframe={true}
        wireframeLinewidth={isMobile ? 3 : 2}
      />
    </mesh>
  );
}

function simplex3(x, y, z) {
  return (Math.sin(x) + Math.sin(y) + Math.sin(z)) / 3;
}

function StarField({ count = 5000 }) {
  const points = useRef();

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return pos;
  }, [count]);

  useFrame(() => {
    if (points.current) {
      points.current.rotation.y += 0.0002;
      points.current.rotation.x += 0.0001;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.1} color="#ffffff" sizeAttenuation transparent opacity={0.8} />
    </points>
  );
}

function Scene() {
  const { size } = useThree();

  return (
    <>
      <MorphingShape position={[0, 0, 0]} />
      <StarField count={size.width < 768 ? 2500 : 5000} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
    </>
  );
}

export default Scene;