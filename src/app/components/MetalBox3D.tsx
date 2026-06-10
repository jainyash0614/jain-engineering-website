import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';

const MM = 0.01;

export type MetalBoxStyle = 'modular-mount' | 'enclosure';

interface MetalBox3DProps {
  width: number;
  height: number;
  depth: number;
  wallThickness?: number;
  style?: MetalBoxStyle;
  exploded?: boolean;
  lighting?: number;
}

interface KnockoutProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  outerRadius?: number;
  innerRadius?: number;
}

function Knockout({
  position,
  rotation = [0, 0, 0],
  outerRadius = 12.5,
  innerRadius = 10,
}: KnockoutProps) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <torusGeometry args={[outerRadius, 0.55, 10, 32]} />
        <meshStandardMaterial color="#8a9199" roughness={0.45} metalness={0.55} />
      </mesh>
      <mesh>
        <torusGeometry args={[innerRadius, 0.45, 10, 32]} />
        <meshStandardMaterial color="#6e7681" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <boxGeometry args={[3, 0.35, outerRadius * 2 + 2]} />
        <meshStandardMaterial color="#9aa3ad" roughness={0.55} metalness={0.45} />
      </mesh>
    </group>
  );
}

function MountingLug({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[34, 7, 14]} />
        <meshStandardMaterial color="#9aa3ad" roughness={0.4} metalness={0.6} />
      </mesh>
      <mesh position={[0, 4.5, 0]}>
        <boxGeometry args={[22, 3, 10]} />
        <meshStandardMaterial color="#7a8490" roughness={0.35} metalness={0.65} />
      </mesh>
    </group>
  );
}

function ModularMountBox({
  width,
  height,
  depth,
  wall,
  exploded,
  lighting,
}: {
  width: number;
  height: number;
  depth: number;
  wall: number;
  exploded: boolean;
  lighting: number;
}) {
  const steel = '#a8b2be';
  const steelDark = '#8b95a3';
  const inner = '#949eaa';

  const outerW = width + wall * 2;
  const outerH = height + wall * 2;
  const outerD = depth + wall;

  const explodeBack = exploded ? 28 : 0;
  const explodeTop = exploded ? 22 : 0;
  const explodeBottom = exploded ? -22 : 0;
  const explodeLeft = exploded ? -20 : 0;
  const explodeRight = exploded ? 20 : 0;

  const backKnockouts = useMemo(() => {
    const cols = [-outerW * 0.22, outerW * 0.22];
    const rows = [-outerH * 0.33, -outerH * 0.11, outerH * 0.11, outerH * 0.33];
    return cols.flatMap((x) => rows.map((y) => ({ x, y })));
  }, [outerW, outerH]);

  const sideKnockoutYs = useMemo(
    () => [-outerH * 0.33, -outerH * 0.11, outerH * 0.11, outerH * 0.33],
    [outerH],
  );

  const topKnockoutXs = useMemo(
    () => [-outerW * 0.33, -outerW * 0.11, outerW * 0.11, outerW * 0.33],
    [outerW],
  );

  const backZ = -depth / 2 - wall / 2 - explodeBack;

  return (
    <group>
      {/* Back panel */}
      <mesh position={[0, 0, backZ]} castShadow receiveShadow>
        <boxGeometry args={[outerW, outerH, wall]} />
        <meshStandardMaterial color={steel} roughness={0.48} metalness={0.52} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-width / 2 - wall / 2 + explodeLeft, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[wall, outerH, outerD]} />
        <meshStandardMaterial color={steelDark} roughness={0.5} metalness={0.48} />
      </mesh>

      {/* Right wall */}
      <mesh position={[width / 2 + wall / 2 + explodeRight, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[wall, outerH, outerD]} />
        <meshStandardMaterial color={steelDark} roughness={0.5} metalness={0.48} />
      </mesh>

      {/* Top wall */}
      <mesh position={[0, height / 2 + wall / 2 + explodeTop, 0]} castShadow receiveShadow>
        <boxGeometry args={[outerW, wall, outerD]} />
        <meshStandardMaterial color={inner} roughness={0.52} metalness={0.46} />
      </mesh>

      {/* Bottom wall */}
      <mesh position={[0, -height / 2 - wall / 2 + explodeBottom, 0]} castShadow receiveShadow>
        <boxGeometry args={[outerW, wall, outerD]} />
        <meshStandardMaterial color={inner} roughness={0.52} metalness={0.46} />
      </mesh>

      {/* Back knockouts — 2 × 4 grid */}
      {backKnockouts.map(({ x, y }, i) => (
        <Knockout key={`back-${i}`} position={[x, y, backZ - wall / 2 - 0.4]} rotation={[Math.PI / 2, 0, 0]} />
      ))}

      {/* Top knockouts */}
      {topKnockoutXs.map((x, i) => (
        <Knockout
          key={`top-${i}`}
          position={[x, height / 2 + wall / 2 + explodeTop + wall / 2 + 0.4, 0]}
          rotation={[0, 0, 0]}
        />
      ))}

      {/* Bottom knockouts */}
      {topKnockoutXs.map((x, i) => (
        <Knockout
          key={`bottom-${i}`}
          position={[x, -height / 2 - wall / 2 + explodeBottom - wall / 2 - 0.4, 0]}
          rotation={[Math.PI, 0, 0]}
        />
      ))}

      {/* Side knockouts */}
      {sideKnockoutYs.map((y, i) => (
        <Knockout
          key={`left-${i}`}
          position={[-width / 2 - wall / 2 + explodeLeft - wall / 2 - 0.4, y, 0]}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
      {sideKnockoutYs.map((y, i) => (
        <Knockout
          key={`right-${i}`}
          position={[width / 2 + wall / 2 + explodeRight + wall / 2 + 0.4, y, 0]}
          rotation={[0, -Math.PI / 2, 0]}
        />
      ))}

      {/* Sliding mounting lugs — top & bottom centre */}
      <MountingLug position={[0, height / 2 + wall / 2 + explodeTop - 2, depth * 0.1]} />
      <MountingLug position={[0, -height / 2 - wall / 2 + explodeBottom + 2, depth * 0.1]} />

      {/* Earth terminal bracket — bottom-left inside back */}
      <group position={[-width * 0.32, -height * 0.32, -depth / 2 + 4]}>
        <mesh>
          <boxGeometry args={[18, 14, 1.6]} />
          <meshStandardMaterial color="#7a8490" roughness={0.4} metalness={0.6} />
        </mesh>
        <mesh position={[0, 0, 2]}>
          <cylinderGeometry args={[3.5, 3.5, 3, 16]} />
          <meshStandardMaterial
            color="#5c6570"
            roughness={0.35}
            metalness={0.7}
            emissive="#2563eb"
            emissiveIntensity={0.06 * lighting}
          />
        </mesh>
      </group>

      {/* Interior floor hint */}
      <mesh position={[0, -height / 2 + 0.5, 0]} receiveShadow>
        <boxGeometry args={[width - 2, 1, depth - 2]} />
        <meshStandardMaterial color="#7d8794" roughness={0.65} metalness={0.35} />
      </mesh>
    </group>
  );
}

function EnclosureBox({
  width,
  height,
  depth,
  wall,
  exploded,
}: {
  width: number;
  height: number;
  depth: number;
  wall: number;
  exploded: boolean;
}) {
  const steel = '#8f98a5';
  const door = '#9aa4b0';
  const explodeDoor = exploded ? depth * 0.22 : 0;

  return (
    <group>
      {/* Body shell */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={steel} roughness={0.55} metalness={0.4} />
      </mesh>

      {/* Hollow cavity */}
      <mesh>
        <boxGeometry args={[width - wall * 2, height - wall * 2, depth - wall]} />
        <meshStandardMaterial color="#6e7784" roughness={0.7} metalness={0.25} />
      </mesh>

      {/* Front door panel */}
      <mesh position={[0, 0, depth / 2 + wall / 2 + explodeDoor]} castShadow>
        <boxGeometry args={[width - wall * 4, height - wall * 4, wall]} />
        <meshStandardMaterial color={door} roughness={0.45} metalness={0.45} />
      </mesh>

      {/* Door handle */}
      <mesh position={[width * 0.28, 0, depth / 2 + wall + explodeDoor + 1]}>
        <boxGeometry args={[8, 40, 6]} />
        <meshStandardMaterial color="#5c6570" roughness={0.35} metalness={0.65} />
      </mesh>

      {/* Gland plate area */}
      <mesh position={[0, -height / 2 + wall * 2.5, -depth / 2 + wall]}>
        <boxGeometry args={[width * 0.55, wall, depth * 0.35]} />
        <meshStandardMaterial color="#7a8490" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
}

function MetalBoxScene({
  width,
  height,
  depth,
  wallThickness,
  style,
  exploded,
  lighting,
}: Required<MetalBox3DProps>) {
  const wall = wallThickness;
  const span = Math.max(width, height, depth);

  return (
    <>
      <ambientLight intensity={0.45 * lighting} />
      <directionalLight
        castShadow
        position={[span, span * 1.2, span]}
        intensity={1.05 * lighting}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-span * 0.6, span * 0.5, -span * 0.4]} intensity={0.32 * lighting} />

      <group scale={MM}>
        {style === 'modular-mount' ? (
          <ModularMountBox
            width={width}
            height={height}
            depth={depth}
            wall={wall}
            exploded={exploded}
            lighting={lighting}
          />
        ) : (
          <EnclosureBox width={width} height={height} depth={depth} wall={wall} exploded={exploded} />
        )}
      </group>

      <ContactShadows
        position={[0, -(Math.max(height, depth) * MM) / 2 - 0.04, 0]}
        opacity={0.32}
        scale={span * MM * 2.4}
        blur={2.5}
      />
    </>
  );
}

export function MetalBox3D({
  width,
  height,
  depth,
  wallThickness = 1.6,
  style = 'enclosure',
  exploded = false,
  lighting = 1,
}: MetalBox3DProps) {
  const span = Math.max(width, height, depth);
  const cameraDistance = span * 1.55;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{
        position: [cameraDistance, cameraDistance * 0.75, cameraDistance],
        fov: 36,
        near: 1,
        far: 50000,
      }}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
    >
      <color attach="background" args={['#f4f5f7']} />
      <MetalBoxScene
        width={width}
        height={height}
        depth={depth}
        wallThickness={wallThickness}
        style={style}
        exploded={exploded}
        lighting={lighting}
      />
      <OrbitControls
        enablePan={false}
        minDistance={span * MM * 1.15}
        maxDistance={span * MM * 3.5}
        maxPolarAngle={Math.PI / 1.95}
      />
    </Canvas>
  );
}
