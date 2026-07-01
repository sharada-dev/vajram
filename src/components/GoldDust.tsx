import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/** Soft radial gold sprite — a glowing mote. */
function makeSprite() {
  const c = document.createElement("canvas");
  c.width = c.height = 64;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,244,214,1)");
  grd.addColorStop(0.25, "rgba(216,178,94,0.85)");
  grd.addColorStop(1, "rgba(216,178,94,0)");
  g.fillStyle = grd;
  g.beginPath();
  g.arc(32, 32, 32, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

type Spread = { x: number; y: number; z: number };

function DustLayer({ count, size, opacity, sprite, spread }:
  { count: number; size: number; opacity: number; sprite: THREE.Texture; spread: Spread }) {
  const ref = useRef<THREE.Points>(null);

  const { geo, mat, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread.x;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
      speeds[i] = 0.15 + Math.random() * 0.45;
      phases[i] = Math.random() * Math.PI * 2;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      size, map: sprite, transparent: true, depthWrite: false,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
      color: new THREE.Color("#e7c56a"), opacity,
    });
    return { geo, mat, speeds, phases };
  }, [count, size, opacity, sprite, spread.x, spread.y, spread.z]);

  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);

  useFrame((state, delta) => {
    const p = ref.current;
    if (!p) return;
    const attr = p.geometry.attributes.position as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const t = state.clock.elapsedTime;
    const halfY = spread.y / 2;
    const d = Math.min(delta, 0.05);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * d * 0.5;              // drift up
      arr[i * 3] += Math.sin(t * 0.25 + phases[i]) * d * 0.12; // sway
      if (arr[i * 3 + 1] > halfY) {                        // recycle
        arr[i * 3 + 1] = -halfY;
        arr[i * 3] = (Math.random() - 0.5) * spread.x;
      }
    }
    attr.needsUpdate = true;
  });

  return <points ref={ref} geometry={geo} material={mat} />;
}

function DustField() {
  const group = useRef<THREE.Group>(null);
  const sprite = useMemo(makeSprite, []);
  useEffect(() => () => sprite.dispose(), [sprite]);

  useFrame((state) => {
    const g = group.current;
    if (!g) return;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, state.pointer.x * 0.18, 0.03);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.12, 0.03);
  });

  return (
    <group ref={group}>
      <DustLayer count={90} size={0.22} opacity={0.9} sprite={sprite} spread={{ x: 16, y: 10, z: 5 }} />
      <DustLayer count={220} size={0.09} opacity={0.55} sprite={sprite} spread={{ x: 18, y: 11, z: 7 }} />
    </group>
  );
}

class Boundary extends Component<{ children: ReactNode }, { err: boolean }> {
  constructor(p: { children: ReactNode }) { super(p); this.state = { err: false }; }
  static getDerivedStateFromError() { return { err: true }; }
  render() { return this.state.err ? null : this.props.children; }
}

export default function GoldDust() {
  return (
    <Boundary>
      <div className="home-hero__dust" aria-hidden>
        <Canvas
          dpr={[1, 1.6]}
          camera={{ position: [0, 0, 9], fov: 52 }}
          gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}
          style={{ pointerEvents: "none" }}
        >
          <DustField />
        </Canvas>
      </div>
    </Boundary>
  );
}
