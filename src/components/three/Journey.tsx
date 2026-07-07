import { Suspense, useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";

/* =====================================================================
   Journey — the 3D scroll world behind the home page.
   A warm, fog-shrouded corridor of floating Vajram imagery; the camera
   dollies through it on an S-curve, driven by the page scroll progress
   (progressRef, written by ScrollTrigger in Home3D). Pointer adds a
   gentle parallax sway. All motion is frame-lerped so it stays silky
   even though scroll input is discrete.
   ===================================================================== */

const A = import.meta.env.BASE_URL + "assets";

type Panel = { url: string; x: number; y: number; z: number; ry: number; w: number; h: number };

/* Ten images arranged along the corridor — story order:
   arrival door → antiques (Tanjore, stone) → gardens → gatherings. */
const PANELS: Panel[] = [
  { url: `${A}/hero-door.jpg`,          x: -2.5, y:  0.1, z:   0.5, ry:  0.34, w: 3.0, h: 2.0 },
  { url: `${A}/story-lakshmi.png`,      x:  2.6, y: -0.2, z:  -5.5, ry: -0.36, w: 1.9, h: 2.4 },
  { url: `${A}/prod-stone-buddha.png`,  x: -2.7, y:  0.3, z: -11.0, ry:  0.38, w: 1.9, h: 2.3 },
  { url: `${A}/cat-thanjavur.png`,      x:  2.5, y:  0.0, z: -16.5, ry: -0.34, w: 2.6, h: 1.9 },
  { url: `${A}/life/space-aerial.jpg`,  x: -2.6, y: -0.25, z: -22.0, ry:  0.36, w: 3.1, h: 2.0 },
  { url: `${A}/life-backyard.png`,      x:  2.7, y:  0.25, z: -27.5, ry: -0.38, w: 2.8, h: 2.0 },
  { url: `${A}/life/space-02.jpg`,      x: -2.5, y:  0.1, z: -33.0, ry:  0.34, w: 2.9, h: 1.95 },
  { url: `${A}/life/farms-entrance.jpg`,x:  2.6, y: -0.15, z: -38.5, ry: -0.36, w: 3.0, h: 2.0 },
  { url: `${A}/life/chan-02.jpg`,       x: -2.7, y:  0.2, z: -44.0, ry:  0.38, w: 2.9, h: 1.95 },
  { url: `${A}/life/kolur-entrance.jpg`,x:  2.5, y:  0.0, z: -49.5, ry: -0.34, w: 3.0, h: 2.0 },
];

const CAM_START_Z = 7;
const CAM_TRAVEL = 62; // total dolly distance

function ImagePanel({ p, index }: { p: Panel; index: number }) {
  const tex = useLoader(THREE.TextureLoader, p.url);
  const mesh = useRef<THREE.Mesh>(null);
  useMemo(() => {
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
  }, [tex]);

  useFrame((state) => {
    const m = mesh.current;
    if (!m) return;
    m.position.y = p.y + Math.sin(state.clock.elapsedTime * 0.45 + index * 1.7) * 0.09;
  });

  return (
    <group position={[p.x, p.y, p.z]} rotation={[0, p.ry, 0]}>
      {/* brass edge — a hair larger, behind the image */}
      <mesh position={[0, 0, -0.012]}>
        <planeGeometry args={[p.w + 0.06, p.h + 0.06]} />
        <meshBasicMaterial color="#8a6c34" />
      </mesh>
      <mesh ref={mesh}>
        <planeGeometry args={[p.w, p.h]} />
        <meshBasicMaterial map={tex} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* Drifting gold motes filling the corridor. */
function Dust({ count, size, opacity }: { count: number; size: number; opacity: number }) {
  const ref = useRef<THREE.Points>(null);

  const sprite = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 64;
    const g = c.getContext("2d")!;
    const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grd.addColorStop(0, "rgba(255,242,208,1)");
    grd.addColorStop(0.3, "rgba(214,175,94,0.8)");
    grd.addColorStop(1, "rgba(214,175,94,0)");
    g.fillStyle = grd;
    g.beginPath(); g.arc(32, 32, 32, 0, Math.PI * 2); g.fill();
    return new THREE.CanvasTexture(c);
  }, []);

  const { geo, mat, speeds, phases } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 9;
      pos[i * 3 + 2] = 8 - Math.random() * 70;
      speeds[i] = 0.1 + Math.random() * 0.35;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const mat = new THREE.PointsMaterial({
      size, map: sprite, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
      color: new THREE.Color("#dcb46a"), opacity,
    });
    return { geo, mat, speeds, phases };
  }, [count, size, opacity, sprite]);

  useEffect(() => () => { geo.dispose(); mat.dispose(); sprite.dispose(); }, [geo, mat, sprite]);

  useFrame((state, delta) => {
    const pts = ref.current;
    if (!pts) return;
    const attr = pts.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * d * 0.45;
      arr[i * 3] += Math.sin(t * 0.22 + phases[i]) * d * 0.1;
      if (arr[i * 3 + 1] > 4.5) arr[i * 3 + 1] = -4.5;
    }
    attr.needsUpdate = true;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

/* Camera rig — reads scroll progress each frame, follows an S-curve. */
function Rig({ progressRef }: { progressRef: RefObject<number> }) {
  const smooth = useRef(0);
  const look = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    const target = progressRef.current ?? 0;
    smooth.current += (target - smooth.current) * 0.07; // frame-lerp the scrub
    const p = smooth.current;

    const cam = state.camera;
    const x = Math.sin(p * Math.PI * 2) * 1.15 + state.pointer.x * 0.55;
    const y = 0.35 - p * 0.25 - state.pointer.y * 0.35;
    const z = CAM_START_Z - p * CAM_TRAVEL;

    cam.position.set(x, y, z);
    look.set(x * 0.4, y * 0.5, z - 9);
    cam.lookAt(look);
  });
  return null;
}

export default function Journey({ progressRef }: { progressRef: RefObject<number> }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.35, CAM_START_Z], fov: 55 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#171310"]} />
      <fogExp2 attach="fog" args={["#171310", 0.042]} />
      <Rig progressRef={progressRef} />
      <Suspense fallback={null}>
        {PANELS.map((p, i) => <ImagePanel key={p.url} p={p} index={i} />)}
      </Suspense>
      <Dust count={160} size={0.16} opacity={0.75} />
      <Dust count={90} size={0.3} opacity={0.4} />
    </Canvas>
  );
}
