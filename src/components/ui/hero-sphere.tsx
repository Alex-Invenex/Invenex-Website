'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Glowing Sphere Mesh ─────────────────────────────── */
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { pointer } = useThree()

  // Track mouse for subtle rotation
  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += 0.003
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      pointer.y * 0.15,
      0.02
    )
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -pointer.x * 0.08,
      0.02
    )
  })

  const material = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#FF6A37'),
        metalness: 0.3,
        roughness: 0.2,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        emissive: new THREE.Color('#FF4500'),
        emissiveIntensity: 0.15,
        envMapIntensity: 1.5,
      }),
    []
  )

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} material={material}>
        <sphereGeometry args={[1.6, 64, 64]} />
      </mesh>
    </Float>
  )
}

/* ─── Lighting Rig ────────────────────────────────────── */
function Lights() {
  return (
    <>
      {/* Key light — warm coral from top-left */}
      <pointLight
        position={[-3, 4, 4]}
        intensity={80}
        color="#FFB088"
        distance={20}
      />
      {/* Fill light — softer warm from right */}
      <pointLight
        position={[4, 1, 3]}
        intensity={40}
        color="#FF8C5A"
        distance={15}
      />
      {/* Rim light — bright orange from behind */}
      <pointLight
        position={[0, -2, -4]}
        intensity={60}
        color="#FF6A37"
        distance={18}
      />
      {/* Subtle cool fill for depth */}
      <pointLight
        position={[-4, -3, 2]}
        intensity={15}
        color="#8866AA"
        distance={12}
      />
      <ambientLight intensity={0.15} color="#FFE0CC" />
    </>
  )
}

/* ─── Glow Particles ──────────────────────────────────── */
function GlowParticles() {
  const pointsRef = useRef<THREE.Points>(null)

  const { positions, sizes } = useMemo(() => {
    const count = 60
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = 2.5 + Math.random() * 2.5
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = 0.02 + Math.random() * 0.04
    }
    return { positions: pos, sizes: sz }
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05
    pointsRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.03) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#FF9B75"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Scene ───────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <Lights />
      <Sphere />
      <GlowParticles />
      <Environment preset="night" />
    </>
  )
}

/* ─── Exported Component ──────────────────────────────── */
export function HeroSphere() {
  return (
    <div
      className="absolute top-0 right-0 w-[55%] h-full pointer-events-none"
      aria-hidden="true"
      data-a="hero-sphere"
      style={{ opacity: 0 }}
    >
      {/* Ambient glow behind the 3D sphere */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,106,55,0.4) 0%, rgba(255,80,40,0.15) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Horizontal light flare */}
      <div
        style={{
          position: 'absolute',
          top: '42%',
          right: '-5%',
          width: '110%',
          height: '4px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,160,100,0.5) 30%, rgba(255,220,180,0.8) 50%, rgba(255,160,100,0.5) 70%, transparent 100%)',
          filter: 'blur(10px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '40%',
          right: '-10%',
          width: '120%',
          height: '30px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,106,55,0.2) 25%, rgba(255,140,80,0.3) 50%, rgba(255,106,55,0.2) 75%, transparent 100%)',
          filter: 'blur(25px)',
        }}
      />
      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'auto' }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
