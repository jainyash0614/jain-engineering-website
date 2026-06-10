import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

const MM = 0.01;

interface FDSFloorBox3DProps {
  cutoutWidth: number;
  cutoutDepth: number;
  bodyDepth?: number;
  exploded?: boolean;
  lighting?: number;
}

function FDSModel({
  cutoutWidth,
  cutoutDepth,
  bodyDepth = 95,
  exploded = false,
  lighting = 1,
}: FDSFloorBox3DProps) {
  const wall = 1.5;
  const trimOverhang = 18;
  const trimHeight = 6;
  const coverThickness = 4;
  const moduleSize = 50;
  const moduleGap = 8;

  const moduleCount = cutoutWidth >= 380 ? 4 : 2;
  const modulesSpan = moduleCount * moduleSize + (moduleCount - 1) * moduleGap;

  const explodeCover = exploded ? 42 : 0;
  const explodeTrim = exploded ? 14 : 0;
  const explodeModules = exploded ? 52 : 0;

  const outerW = cutoutWidth + trimOverhang * 2;
  const outerD = cutoutDepth + trimOverhang * 2;

  const steel = '#7a8494';
  const steelDark = '#5c6573';
  const trim = '#b8bec8';
  const cover = '#4a5568';
  const moduleRecess = '#1f2937';
  const floor = '#e8eaed';

  const moduleOffsets = useMemo(() => {
    const start = -modulesSpan / 2 + moduleSize / 2;
    return Array.from({ length: moduleCount }, (_, i) => start + i * (moduleSize + moduleGap));
  }, [moduleCount, modulesSpan, moduleSize, moduleGap]);

  return (
    <group scale={MM}>
      {/* Raised floor tile for context */}
      <mesh position={[0, 0.5, 0]} receiveShadow>
        <boxGeometry args={[outerW + 120, 10, outerD + 120]} />
        <meshStandardMaterial color={floor} roughness={0.92} metalness={0.02} />
      </mesh>

      {/* Body shell below floor */}
      <group position={[0, -bodyDepth / 2, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[cutoutWidth, bodyDepth, cutoutDepth]} />
          <meshStandardMaterial color={steel} roughness={0.55} metalness={0.35} />
        </mesh>
        <mesh position={[0, bodyDepth / 2 - wall / 2, 0]}>
          <boxGeometry args={[cutoutWidth - wall * 2, wall, cutoutDepth - wall * 2]} />
          <meshStandardMaterial color={steelDark} roughness={0.65} metalness={0.25} />
        </mesh>
        {/* Bottom cable entry */}
        <mesh position={[0, -bodyDepth / 2 + 6, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[28, 28, 4, 32]} />
          <meshStandardMaterial color="#3f4652" roughness={0.6} metalness={0.4} />
        </mesh>
      </group>

      {/* Trim flange at floor level */}
      <group position={[0, trimHeight / 2 + explodeTrim, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[outerW, trimHeight, outerD]} />
          <meshStandardMaterial color={trim} roughness={0.35} metalness={0.65} />
        </mesh>
        <mesh position={[0, trimHeight / 2 + 0.5, 0]}>
          <boxGeometry args={[cutoutWidth + 4, 1, cutoutDepth + 4]} />
          <meshStandardMaterial color={trim} roughness={0.3} metalness={0.75} />
        </mesh>
      </group>

      {/* Flush cover plate */}
      <group position={[0, trimHeight + coverThickness / 2 + explodeCover, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[cutoutWidth - 6, coverThickness, cutoutDepth - 6]} />
          <meshStandardMaterial color={cover} roughness={0.85} metalness={0.15} />
        </mesh>
        {/* Anti-slip groove lines */}
        {[-cutoutDepth / 4, 0, cutoutDepth / 4].map((z) => (
          <mesh key={z} position={[0, coverThickness / 2 + 0.4, z]}>
            <boxGeometry args={[cutoutWidth - 20, 0.8, 2]} />
            <meshStandardMaterial color="#3d4654" roughness={0.95} />
          </mesh>
        ))}
      </group>

      {/* Outlet / data module bezels */}
      {moduleOffsets.map((x, index) => (
        <group key={index} position={[x, trimHeight + coverThickness + 3 + explodeModules, 0]}>
          <mesh castShadow>
            <boxGeometry args={[moduleSize, 6, moduleSize]} />
            <meshStandardMaterial color={moduleRecess} roughness={0.4} metalness={0.5} />
          </mesh>
          <mesh position={[0, 3.5, 0]}>
            <boxGeometry args={[moduleSize - 10, 2, moduleSize - 10]} />
            <meshStandardMaterial
              color={index % 2 === 0 ? '#2563eb' : '#ea580c'}
              roughness={0.35}
              metalness={0.2}
              emissive={index % 2 === 0 ? '#1d4ed8' : '#c2410c'}
              emissiveIntensity={0.08 * lighting}
            />
          </mesh>
        </group>
      ))}

    </group>
  );
}

export function FDSFloorBox3D({
  cutoutWidth,
  cutoutDepth,
  bodyDepth = 95,
  exploded = false,
  lighting = 1,
}: FDSFloorBox3DProps) {
  const span = Math.max(cutoutWidth, cutoutDepth);
  const cameraDistance = span * 1.45;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [cameraDistance, cameraDistance * 0.72, cameraDistance], fov: 38, near: 1, far: 50000 }}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
    >
      <color attach="background" args={['#f4f5f7']} />
      <ambientLight intensity={0.45 * lighting} />
      <directionalLight
        castShadow
        position={[span, span * 1.4, span * 0.8]}
        intensity={1.1 * lighting}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-span, span * 0.6, -span]} intensity={0.35 * lighting} />

      <FDSModel
        cutoutWidth={cutoutWidth}
        cutoutDepth={cutoutDepth}
        bodyDepth={bodyDepth}
        exploded={exploded}
        lighting={lighting}
      />

      <ContactShadows position={[0, -bodyDepth * MM - 0.02, 0]} opacity={0.35} scale={span * MM * 2.2} blur={2.5} />
      <OrbitControls
        enablePan={false}
        minDistance={span * MM * 1.1}
        maxDistance={span * MM * 3.2}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
