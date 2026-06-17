import { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Environment, Html, RoundedBox } from '@react-three/drei';

const MM = 0.01;

interface FDSFloorBox3DProps {
  cutoutWidth: number;
  cutoutDepth: number;
  bodyDepth?: number;
  exploded?: boolean;
  lighting?: number;
}

/* ----------------------------------------------------------------------
   Steel palette (Honeywell AOB250). Everything reads as galvanized /
   stainless steel; only roughness + brightness vary between parts.
   ---------------------------------------------------------------------- */
const C = {
  steel: '#9fa9b7',        // galvanized body
  steelDark: '#79838f',
  steelLight: '#c3cad3',
  ss: '#d4d9df',           // stainless access lid (brighter)
  ssEdge: '#aab0b8',
  diecast: '#9aa0a8',      // aluminium die-cast pillars
  diecastDark: '#71777f',
  coat: '#474e57',         // RAL7031 powder-coat module plates
  coatDark: '#31363d',
  hex: '#202327',          // black-oxide hex bolts
  brass: '#c39a4f',
  brassDark: '#876b34',
  earthWire: '#22a23a',
  voidC: '#0b0e12',
  voidLight: '#1b2027',
  floor: '#e9ebee',
};

/* Material helpers ----------------------------------------------------- */
function MatSteel({ tint = C.steel, rough = 0.4 }: { tint?: string; rough?: number }) {
  return <meshStandardMaterial color={tint} roughness={rough} metalness={0.86} envMapIntensity={1.05} />;
}
function MatSS({ tint = C.ss }: { tint?: string }) {
  return <meshStandardMaterial color={tint} roughness={0.22} metalness={0.95} envMapIntensity={1.3} />;
}
function MatDiecast({ tint = C.diecast }: { tint?: string }) {
  return <meshStandardMaterial color={tint} roughness={0.55} metalness={0.68} envMapIntensity={0.9} />;
}
function MatCoat({ tint = C.coat }: { tint?: string }) {
  return <meshStandardMaterial color={tint} roughness={0.8} metalness={0.08} envMapIntensity={0.4} />;
}
function MatBlack({ tint = C.hex }: { tint?: string }) {
  return <meshStandardMaterial color={tint} roughness={0.35} metalness={0.6} envMapIntensity={0.8} />;
}
function MatBrass() {
  return <meshStandardMaterial color={C.brass} roughness={0.28} metalness={0.95} envMapIntensity={1.2} />;
}

/* ----------------------------------------------------------------------
   Part: ribbed base box (the tray everything sits in)
   ---------------------------------------------------------------------- */
function BaseBox({ w, d, h }: { w: number; d: number; h: number }) {
  // Horizontal louver bands on the side walls
  const bands = useMemo(() => {
    const n = Math.max(3, Math.floor(h / 22));
    return Array.from({ length: n }, (_, i) => -h / 2 + 10 + (i * (h - 16)) / Math.max(1, n - 1));
  }, [h]);

  return (
    <group>
      {/* Outer shell */}
      <RoundedBox args={[w, h, d]} radius={2} smoothness={3} castShadow receiveShadow>
        <MatSteel tint={C.steel} rough={0.45} />
      </RoundedBox>
      {/* Inner cavity (dark) */}
      <mesh position={[0, 4, 0]}>
        <boxGeometry args={[w - 10, h - 6, d - 10]} />
        <meshStandardMaterial color={C.voidLight} roughness={0.9} metalness={0.2} />
      </mesh>
      {/* Cavity floor */}
      <mesh position={[0, -h / 2 + 4, 0]}>
        <boxGeometry args={[w - 8, 2, d - 8]} />
        <MatSteel tint={C.steelDark} rough={0.6} />
      </mesh>

      {/* Louver bands on the 4 side walls */}
      {bands.map((y, i) => (
        <group key={i}>
          <mesh position={[0, y, d / 2 + 0.2]}>
            <boxGeometry args={[w - 24, 4, 1.2]} />
            <MatSteel tint={C.steelDark} rough={0.6} />
          </mesh>
          <mesh position={[0, y, -d / 2 - 0.2]}>
            <boxGeometry args={[w - 24, 4, 1.2]} />
            <MatSteel tint={C.steelDark} rough={0.6} />
          </mesh>
          <mesh position={[w / 2 + 0.2, y, 0]}>
            <boxGeometry args={[1.2, 4, d - 24]} />
            <MatSteel tint={C.steelDark} rough={0.6} />
          </mesh>
          <mesh position={[-w / 2 - 0.2, y, 0]}>
            <boxGeometry args={[1.2, 4, d - 24]} />
            <MatSteel tint={C.steelDark} rough={0.6} />
          </mesh>
        </group>
      ))}

      {/* Top flange rim */}
      <mesh position={[0, h / 2 + 1, 0]} castShadow>
        <boxGeometry args={[w + 8, 3, d + 8]} />
        <MatSteel tint={C.steelLight} rough={0.35} />
      </mesh>
    </group>
  );
}

/* Corner mounting ear (rounded tab with bolt hole) */
function Ear() {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[15, 15, 4, 28]} />
        <MatSteel tint={C.steelLight} rough={0.35} />
      </mesh>
      <mesh position={[0, 2.1, 0]}>
        <torusGeometry args={[6, 0.9, 10, 26]} />
        <MatSteel tint={C.steelDark} rough={0.45} />
      </mesh>
      <mesh position={[0, 2.4, 0]}>
        <cylinderGeometry args={[4.6, 4.6, 0.6, 22]} />
        <meshStandardMaterial color={C.voidC} />
      </mesh>
    </group>
  );
}

/* Die-cast corner pillar with internal threaded sleeve */
function Pillar({ h }: { h: number }) {
  return (
    <group>
      <RoundedBox args={[26, h, 26]} radius={1.5} smoothness={3} castShadow receiveShadow>
        <MatDiecast />
      </RoundedBox>
      <mesh position={[0, h / 2 + 0.4, 0]}>
        <cylinderGeometry args={[10, 10, 0.8, 24]} />
        <MatDiecast tint={C.diecastDark} />
      </mesh>
      <mesh position={[0, h / 2 + 0.9, 0]}>
        <cylinderGeometry args={[4.5, 4.5, 0.5, 18]} />
        <meshStandardMaterial color={C.voidC} />
      </mesh>
    </group>
  );
}

/* Spring support stud */
function Stud({ h }: { h: number }) {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[3.4, 3.4, h, 18]} />
        <MatSteel tint={C.steelDark} rough={0.4} />
      </mesh>
      {Array.from({ length: Math.max(3, Math.floor(h / 4)) }, (_, i) => (
        <mesh key={i} position={[0, -h / 2 + 2 + i * 4, 0]}>
          <torusGeometry args={[4.2, 0.7, 6, 16]} />
          <MatSteel tint={C.steelDark} rough={0.4} />
        </mesh>
      ))}
      <mesh position={[0, h / 2 + 0.5, 0]}>
        <cylinderGeometry args={[5, 5, 1, 18]} />
        <MatSteel tint={C.steelLight} rough={0.35} />
      </mesh>
    </group>
  );
}

/* Adjusting hexagonal screw bolt */
function HexBolt() {
  return (
    <group>
      <mesh position={[0, 4, 0]} castShadow>
        <cylinderGeometry args={[7.5, 7.5, 5, 6]} />
        <MatBlack />
      </mesh>
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[9, 9, 1, 20]} />
        <MatSteel tint={C.steelDark} rough={0.4} />
      </mesh>
      <mesh position={[0, -14, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 28, 12]} />
        <MatBlack tint="#3a3e44" />
      </mesh>
    </group>
  );
}

/* Module faceplate grid (power + data plates inside the tray) */
function ModuleGrid({ w, d, cols, rows }: { w: number; d: number; cols: number; rows: number }) {
  const mW = (w - 8) / cols;
  const mD = (d - 8) / rows;
  return (
    <group>
      {/* Carrier tray */}
      <RoundedBox args={[w, 3, d]} radius={1.2} smoothness={2} castShadow receiveShadow>
        <MatCoat tint={C.coatDark} />
      </RoundedBox>
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const x = -w / 2 + 4 + mW / 2 + c * mW;
          const z = -d / 2 + 4 + mD / 2 + r * mD;
          return (
            <group key={`${r}-${c}`} position={[x, 2, z]}>
              {/* Module faceplate */}
              <RoundedBox args={[mW - 4, 2, mD - 4]} radius={0.8} smoothness={2} castShadow>
                <MatCoat />
              </RoundedBox>
              {/* Socket recess */}
              <mesh position={[0, 1.2, 0]}>
                <boxGeometry args={[mW - 12, 0.6, mD - 12]} />
                <meshStandardMaterial color={C.voidC} roughness={0.95} />
              </mesh>
              {/* Twin socket holes */}
              {[-3.5, 3.5].map((px) => (
                <mesh key={px} position={[px, 1.5, 0]}>
                  <cylinderGeometry args={[1, 1, 0.4, 10]} />
                  <meshStandardMaterial color={C.voidC} />
                </mesh>
              ))}
            </group>
          );
        }),
      )}
    </group>
  );
}

/* Brushed trap frame ring (with 4 corner ears) */
function TrapFrame({ w, d, cutW, cutD, earSpanW, earSpanD }: { w: number; d: number; cutW: number; cutD: number; earSpanW: number; earSpanD: number }) {
  const t = 9;
  const sx = (w - cutW) / 2;
  const sz = (d - cutD) / 2;
  return (
    <group>
      <mesh position={[0, 0, -d / 2 + sz / 2]} castShadow receiveShadow>
        <boxGeometry args={[w, t, sz]} />
        <MatSteel tint={C.steelLight} rough={0.3} />
      </mesh>
      <mesh position={[0, 0, d / 2 - sz / 2]} castShadow receiveShadow>
        <boxGeometry args={[w, t, sz]} />
        <MatSteel tint={C.steelLight} rough={0.3} />
      </mesh>
      <mesh position={[-w / 2 + sx / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[sx, t, d - sz * 2]} />
        <MatSteel tint={C.steelLight} rough={0.3} />
      </mesh>
      <mesh position={[w / 2 - sx / 2, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[sx, t, d - sz * 2]} />
        <MatSteel tint={C.steelLight} rough={0.3} />
      </mesh>
      {/* Inner lip going down into cutout */}
      <mesh position={[0, -t, 0]}>
        <boxGeometry args={[cutW + 3, t, cutD + 3]} />
        <MatSteel tint={C.steelDark} rough={0.5} />
      </mesh>
      <mesh position={[0, -t, 0]}>
        <boxGeometry args={[cutW - 3, t + 1, cutD - 3]} />
        <meshStandardMaterial color={C.voidLight} roughness={0.9} />
      </mesh>
      {/* Corner ears */}
      {[
        [-earSpanW / 2, -earSpanD / 2],
        [earSpanW / 2, -earSpanD / 2],
        [-earSpanW / 2, earSpanD / 2],
        [earSpanW / 2, earSpanD / 2],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          <Ear />
        </group>
      ))}
    </group>
  );
}

/* SS / brass access lid with 20mm recess pocket + finger pulls */
function AccessLid({ w, d }: { w: number; d: number }) {
  return (
    <group>
      <RoundedBox args={[w, 6, d]} radius={3} smoothness={3} castShadow receiveShadow>
        <MatSS />
      </RoundedBox>
      {/* Recess pocket (for tile / carpet infill) */}
      <RoundedBox args={[w - 20, 4, d - 20]} radius={2} smoothness={2} position={[0, 1.6, 0]}>
        <MatSS tint={C.ssEdge} />
      </RoundedBox>
      {/* Finger-pull holes */}
      {[-w * 0.16, w * 0.16].map((x) => (
        <mesh key={x} position={[x, 3.4, 0]}>
          <cylinderGeometry args={[5, 5, 0.6, 22]} />
          <meshStandardMaterial color={C.voidLight} roughness={0.85} />
        </mesh>
      ))}
      {/* Logo slot */}
      <mesh position={[0, 3.4, d * 0.3]}>
        <boxGeometry args={[16, 0.5, 7]} />
        <meshStandardMaterial color={C.voidLight} roughness={0.85} />
      </mesh>
    </group>
  );
}

/* Thin galvanized throw-away lid */
function ThrowLid({ w, d }: { w: number; d: number }) {
  return (
    <group>
      <RoundedBox args={[w, 1.2, d]} radius={2} smoothness={2} castShadow receiveShadow>
        <MatSteel tint={C.steelLight} rough={0.4} />
      </RoundedBox>
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[18, 0.3, 4]} />
        <meshStandardMaterial color={C.voidC} />
      </mesh>
      {[-w * 0.16, w * 0.16].map((x) => (
        <mesh key={x} position={[x, 0.8, -d * 0.18]}>
          <cylinderGeometry args={[2.4, 2.4, 0.3, 14]} />
          <meshStandardMaterial color={C.voidC} />
        </mesh>
      ))}
    </group>
  );
}

function KnockoutPlate() {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[28, 13, 1.2]} />
        <MatSteel tint={C.steelDark} rough={0.55} />
      </mesh>
      {[-7, 7].map((x) => (
        <mesh key={x} position={[x, 0, 0.75]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[3.6, 3.6, 0.4, 20]} />
          <meshStandardMaterial color={C.voidLight} roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

function EarthTerminal({ lighting }: { lighting: number }) {
  return (
    <group>
      <mesh castShadow>
        <cylinderGeometry args={[5, 5, 2, 18]} />
        <MatDiecast />
      </mesh>
      <mesh position={[0, 9, 0]} castShadow>
        <cylinderGeometry args={[2.4, 2.4, 18, 14]} />
        <meshStandardMaterial color={C.brass} roughness={0.28} metalness={0.95} emissive={C.brassDark} emissiveIntensity={0.06 * lighting} />
      </mesh>
      <mesh position={[0, 19, 0]} castShadow>
        <boxGeometry args={[11, 2, 5]} />
        <MatBlack />
      </mesh>
      <mesh position={[0, 9, 5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.8, 0.8, 7, 10]} />
        <meshStandardMaterial color={C.earthWire} roughness={0.7} />
      </mesh>
    </group>
  );
}

function Label({ position, text, visible }: { position: [number, number, number]; text: string; visible: boolean }) {
  if (!visible) return null;
  return (
    <Html position={position} center distanceFactor={11} style={{ pointerEvents: 'none' }} zIndexRange={[20, 0]}>
      <div className="whitespace-nowrap rounded-md border border-border bg-background/95 px-2 py-0.5 text-[10px] font-medium text-foreground shadow">
        {text}
      </div>
    </Html>
  );
}

/* ----------------------------------------------------------------------
   Assembly
   ---------------------------------------------------------------------- */
function FDSModel({ cutoutWidth, cutoutDepth, bodyDepth = 95, exploded = false, lighting = 1 }: FDSFloorBox3DProps) {
  const W = cutoutWidth;
  const D = cutoutDepth;
  const H = bodyDepth;

  const earSpanW = W + 30;
  const earSpanD = D + 30;
  const pillarH = H - 10;
  const studH = 20;
  const pInset = 24;

  const pillarXZ: Array<[number, number]> = [
    [-W / 2 + pInset, -D / 2 + pInset],
    [W / 2 - pInset, -D / 2 + pInset],
    [-W / 2 + pInset, D / 2 - pInset],
    [W / 2 - pInset, D / 2 - pInset],
  ];

  // Module grid sizing
  const gridW = W - 30;
  const gridD = D - 30;
  const cols = W >= 380 ? 4 : 3;

  /* Assembled Y positions (model roughly centred on y=0) */
  const baseY = 0;                          // base box centre
  const cavityTop = H / 2;                  // top rim of base
  const A = {
    base: baseY,
    pillar: baseY - 2 + pillarH / 2 - H / 2 + 6, // pillars stand inside base
    grid: cavityTop - 10,
    stud: cavityTop - 16,
    pressure: cavityTop - 6,
    hex: cavityTop + 8,
    frame: cavityTop + 8,
    accessLid: cavityTop + 16,
    throwLid: cavityTop + 22,
    knock: 0,
    earth: -H / 2 + 26,
  };

  /* Explode offsets — large vertical separation (user wants it fully open) */
  const e = exploded ? 1 : 0;
  const X = {
    base: -H * 0.55 * e,
    pillarY: -2 * e,
    pillarOut: 70 * e,
    grid: H * 1.0 * e,
    stud: H * 0.55 * e,
    pressure: H * 0.32 * e,
    hex: H * 1.35 * e,
    frame: H * 1.95 * e,
    accessLid: H * 2.7 * e,
    throwLid: H * 3.4 * e,
  };

  return (
    <group>
      {/* BASE BOX + knockouts + earth terminal */}
      <group position={[0, A.base + X.base, 0]}>
        <BaseBox w={W} d={D} h={H} />
        {/* Side knockout plates */}
        <group position={[0, -H * 0.05, D / 2 + 0.8]}><KnockoutPlate /></group>
        <group position={[0, -H * 0.05, -D / 2 - 0.8]} rotation={[0, Math.PI, 0]}><KnockoutPlate /></group>
        <group position={[W / 2 + 0.8, -H * 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}><KnockoutPlate /></group>
        <group position={[-W / 2 - 0.8, -H * 0.05, 0]} rotation={[0, Math.PI / 2, 0]}><KnockoutPlate /></group>
        {/* Earth terminal */}
        <group position={[-W / 2 + 16, -H / 2 + 6, D * 0.28]}><EarthTerminal lighting={lighting} /></group>
        <Label position={[earSpanW / 2 + 70, 0, 0]} text="Base Box · GI 1.6 mm + Knockouts ×4 + Earth terminal" visible={exploded} />
      </group>

      {/* CORNER PILLARS */}
      {pillarXZ.map(([x, z], i) => {
        const sx = x > 0 ? 1 : -1;
        const sz = z > 0 ? 1 : -1;
        return (
          <group key={`p-${i}`} position={[x + sx * X.pillarOut, A.pillar + X.pillarY, z + sz * X.pillarOut]}>
            <Pillar h={pillarH} />
            {i === 0 && <Label position={[-46, pillarH / 2 + 24, 0]} text="Al die-cast pillar ×4" visible={exploded} />}
          </group>
        );
      })}

      {/* PRESSURE PLATES (perimeter strips) */}
      {[
        { x: 0, z: -D / 2 + pInset, r: 0 },
        { x: 0, z: D / 2 - pInset, r: 0 },
        { x: -W / 2 + pInset, z: 0, r: Math.PI / 2 },
        { x: W / 2 - pInset, z: 0, r: Math.PI / 2 },
      ].map((p, i) => (
        <group key={`pr-${i}`} position={[p.x, A.pressure + X.pressure, p.z]} rotation={[0, p.r, 0]}>
          <mesh castShadow><boxGeometry args={[W - pInset * 2 - 10, 1.4, 12]} /><MatSteel /></mesh>
          {i === 0 && <Label position={[0, 10, 20]} text="Pressure plate ×4" visible={exploded} />}
        </group>
      ))}

      {/* SUPPORT STUDS */}
      {pillarXZ.map(([x, z], i) => (
        <group key={`s-${i}`} position={[x, A.stud + X.stud, z]}>
          <Stud h={studH} />
          {i === 0 && <Label position={[-50, 0, 0]} text="Support stud (spring) ×4" visible={exploded} />}
        </group>
      ))}

      {/* MODULE GRID (power + data plates) */}
      <group position={[0, A.grid + X.grid, 0]}>
        <ModuleGrid w={gridW} d={gridD} cols={cols} rows={2} />
        <Label position={[0, 16, gridD / 2 + 30]} text="Power + Data plates · CRCA · RAL 7031" visible={exploded} />
      </group>

      {/* HEX BOLTS at corners */}
      {pillarXZ.map(([x, z], i) => (
        <group key={`h-${i}`} position={[x, A.hex + X.hex, z]}>
          <HexBolt />
          {i === 0 && <Label position={[36, 10, 0]} text="Adjusting hex bolt ×4 (90–125 mm)" visible={exploded} />}
        </group>
      ))}

      {/* TRAP FRAME */}
      <group position={[0, A.frame + X.frame, 0]}>
        <TrapFrame w={W + 16} d={D + 16} cutW={W - 20} cutD={D - 20} earSpanW={earSpanW} earSpanD={earSpanD} />
        <Label position={[earSpanW / 2 + 70, 6, 0]} text="Trap frame · CRCA 1.6 mm · brushed" visible={exploded} />
      </group>

      {/* ACCESS LID */}
      <group position={[0, A.accessLid + X.accessLid, 0]}>
        <AccessLid w={W + 2} d={D + 2} />
        <Label position={[earSpanW / 2 + 70, 4, 0]} text="Access lid · SS/Brass · 20 mm recess" visible={exploded} />
      </group>

      {/* THROW-AWAY LID */}
      <group position={[0, A.throwLid + X.throwLid, 0]}>
        <ThrowLid w={W + 2} d={D + 2} />
        <Label position={[earSpanW / 2 + 70, 2, 0]} text="Throw-away lid · GI 0.6 mm" visible={exploded} />
      </group>
    </group>
  );
}

/* ----------------------------------------------------------------------
   Canvas — studio look
   ---------------------------------------------------------------------- */
export function FDSFloorBox3D({ cutoutWidth, cutoutDepth, bodyDepth = 95, exploded = false, lighting = 1 }: FDSFloorBox3DProps) {
  const W = cutoutWidth;
  const D = cutoutDepth;
  const H = bodyDepth;

  /* ----------------------------------------------------------------------
     Compute the actual model bounding box (in MM) so we can position the
     camera and OrbitControls target precisely — no async-fit, no surprises.
     Y is the vertical axis. The model extends from the base box bottom up
     through the exploded throw-away lid.
     ---------------------------------------------------------------------- */
  const earSpanW = W + 30;
  const earSpanD = D + 30;
  const span = Math.max(W, D, H, earSpanW, earSpanD);
  // Half X/Z extent — exploded view slides the corner pillars 70mm outward
  const halfX = Math.max(earSpanW / 2 + 18, W / 2 + (exploded ? 70 + 26 : 0));
  const halfZ = Math.max(earSpanD / 2 + 18, D / 2 + (exploded ? 70 + 26 : 0));
  // Vertical range
  const cavityTop = H / 2;
  const yBottom = exploded ? -(H * 0.55) - (H / 2 + 4) : -(H / 2 + 4);
  const yTop = exploded ? cavityTop + 22 + H * 3.4 + 2 : cavityTop + 22 + 2;
  const yCenter = (yBottom + yTop) / 2;
  const yHalf = (yTop - yBottom) / 2;

  // Bounding sphere radius from model centre to the worst-case corner
  const radius = Math.sqrt(halfX * halfX + yHalf * yHalf + halfZ * halfZ);

  // Iso view direction (unit vector)
  const fov = 34;
  const fovHalfRad = ((fov / 2) * Math.PI) / 180;
  // Margin: 1.35 assembled, 1.18 exploded (tight crop when there's a tall stack)
  const margin = exploded ? 1.18 : 1.35;
  const camDistMM = (radius / Math.sin(fovHalfRad)) * margin;
  const dirLen = Math.sqrt(1 * 1 + 0.85 * 0.85 + 1 * 1);
  const camX = ((1 / dirLen) * camDistMM) * MM;
  const camY = ((0.85 / dirLen) * camDistMM + yCenter) * MM;
  const camZ = ((1 / dirLen) * camDistMM) * MM;
  const targetY = yCenter * MM;
  const shadowY = yBottom * MM - 0.05;

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      gl={{ antialias: true }}
      camera={{ position: [camX, camY, camZ], fov, near: 0.01, far: 200 }}
      style={{ width: '100%', height: '100%', touchAction: 'none' }}
    >
      <color attach="background" args={['#eef0f3']} />
      <ambientLight intensity={0.35 * lighting} />
      <directionalLight
        castShadow
        position={[span, span * 1.6, span * 0.7]}
        intensity={1.15 * lighting}
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0002}
        shadow-camera-left={-span * 2}
        shadow-camera-right={span * 2}
        shadow-camera-top={span * 3}
        shadow-camera-bottom={-span * 2}
      />
      <directionalLight position={[-span, span * 0.8, -span * 0.5]} intensity={0.45 * lighting} />
      <directionalLight position={[0, -span * 0.3, span]} intensity={0.2 * lighting} />

      <Suspense fallback={null}>
        <Environment preset="warehouse" />
      </Suspense>

      <group scale={MM}>
        <FDSModel
          cutoutWidth={cutoutWidth}
          cutoutDepth={cutoutDepth}
          bodyDepth={bodyDepth}
          exploded={exploded}
          lighting={lighting}
        />
      </group>

      <ContactShadows
        position={[0, shadowY, 0]}
        opacity={0.5}
        scale={Math.max(halfX, halfZ) * MM * 4}
        blur={2.4}
        far={Math.max(halfX, halfZ) * MM * 3}
      />

      <OrbitControls
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        target={[0, targetY, 0]}
        minDistance={camDistMM * MM * 0.35}
        maxDistance={camDistMM * MM * 2.5}
        minPolarAngle={0.12}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}
