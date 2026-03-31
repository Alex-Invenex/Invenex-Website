'use client'

import { useRef, useMemo, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Fresnel Rim Glow Shell ─────────────────────────────
   A slightly larger transparent sphere with a custom shader
   that brightens at grazing angles (Fresnel effect).        */
function FresnelShell() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#FF6A37') },
      uRimColor: { value: new THREE.Color('#FFAD85') },
      uRimPower: { value: 2.2 },
      uRimIntensity: { value: 1.4 },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (!matRef.current) return
    matRef.current.uniforms.uTime.value = clock.getElapsedTime()
    // Pulse rim intensity
    matRef.current.uniforms.uRimIntensity.value =
      1.4 + Math.sin(clock.getElapsedTime() * 1.5) * 0.3
  })

  return (
    <mesh>
      <sphereGeometry args={[1.68, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.FrontSide}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            vViewDir = normalize(-mvPos.xyz);
            gl_Position = projectionMatrix * mvPos;
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor;
          uniform vec3 uRimColor;
          uniform float uRimPower;
          uniform float uRimIntensity;
          varying vec3 vNormal;
          varying vec3 vViewDir;
          void main() {
            float fresnel = 1.0 - max(dot(vViewDir, vNormal), 0.0);
            fresnel = pow(fresnel, uRimPower) * uRimIntensity;
            vec3 col = mix(uColor, uRimColor, fresnel);
            gl_FragColor = vec4(col, fresnel * 0.65);
          }
        `}
      />
    </mesh>
  )
}

/* ─── Main Distort Sphere ────────────────────────────────
   MeshDistortMaterial for organic surface morphing, with
   pulsing emissive intensity for a breathing glow.          */
function Sphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<
    THREE.MeshPhysicalMaterial & { distort?: number }
  >(null)
  const { pointer } = useThree()

  // Smoothed mouse values for reactivity
  const smoothMouse = useRef({ x: 0, y: 0 })

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()

    // Smooth mouse tracking
    smoothMouse.current.x = THREE.MathUtils.lerp(
      smoothMouse.current.x,
      pointer.x,
      0.04
    )
    smoothMouse.current.y = THREE.MathUtils.lerp(
      smoothMouse.current.y,
      pointer.y,
      0.04
    )

    // Gentle auto-rotation + mouse follow
    meshRef.current.rotation.y += 0.002
    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      smoothMouse.current.y * 0.15,
      0.02
    )
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z,
      -smoothMouse.current.x * 0.08,
      0.02
    )

    // Pulsing emissive breathing
    if (matRef.current) {
      matRef.current.emissiveIntensity =
        0.25 + Math.sin(t * 1.2) * 0.15 + Math.sin(t * 2.8) * 0.05

      // Mouse-reactive distortion: more distortion when cursor near center
      const mouseDist = Math.sqrt(
        pointer.x * pointer.x + pointer.y * pointer.y
      )
      const targetDistort = 0.3 + (1.0 - Math.min(mouseDist, 1.0)) * 0.2
      if (typeof matRef.current.distort === 'number') {
        matRef.current.distort = THREE.MathUtils.lerp(
          matRef.current.distort,
          targetDistort,
          0.03
        )
      }
    }
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <group>
        {/* Core distorted sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.6, 128, 128]} />
          <MeshDistortMaterial
            ref={matRef as React.RefObject<never>}
            color="#FF6A37"
            emissive="#FF4500"
            emissiveIntensity={0.25}
            metalness={0.35}
            roughness={0.18}
            clearcoat={1.0}
            clearcoatRoughness={0.08}
            envMapIntensity={1.8}
            distort={0.35}
            speed={1.8}
          />
        </mesh>
        {/* Fresnel rim glow overlay */}
        <FresnelShell />
      </group>
    </Float>
  )
}

/* ─── Orbital Ring ───────────────────────────────────────
   A tilted torus with additive-blended emissive material
   that slowly rotates around the sphere.                     */
function OrbitalRing() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = t * 0.15
    ringRef.current.rotation.x = Math.PI * 0.38 + Math.sin(t * 0.3) * 0.05
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI * 0.38, 0, 0]}>
      <torusGeometry args={[2.6, 0.012, 16, 128]} />
      <meshBasicMaterial
        color="#FF8C5A"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ─── Second Orbital Ring (thinner, different tilt) ────── */
function OrbitalRingInner() {
  const ringRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!ringRef.current) return
    const t = clock.getElapsedTime()
    ringRef.current.rotation.z = -t * 0.12
    ringRef.current.rotation.y = t * 0.08
  })

  return (
    <mesh ref={ringRef} rotation={[Math.PI * 0.55, 0.3, 0]}>
      <torusGeometry args={[2.25, 0.006, 16, 100]} />
      <meshBasicMaterial
        color="#FFB088"
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ─── Orbiting Particles ─────────────────────────────────
   140 particles in randomised orbital paths at varying
   speeds and radii, with warm coral colour palette.          */
function OrbitingParticles() {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 140

  // Pre-compute orbital parameters for each particle
  const orbits = useMemo(() => {
    const params = []
    for (let i = 0; i < count; i++) {
      params.push({
        radius: 2.2 + Math.random() * 3.0,
        speed: 0.08 + Math.random() * 0.25,
        offset: Math.random() * Math.PI * 2,
        tiltX: (Math.random() - 0.5) * Math.PI * 0.8,
        tiltZ: (Math.random() - 0.5) * Math.PI * 0.6,
        yOsc: (Math.random() - 0.5) * 1.5,
        yOscSpeed: 0.3 + Math.random() * 0.5,
      })
    }
    return params
  }, [])

  const colors = useMemo(() => {
    const palette = [
      new THREE.Color('#FF6A37'),
      new THREE.Color('#FF8C5A'),
      new THREE.Color('#FFB088'),
      new THREE.Color('#FF9B75'),
      new THREE.Color('#FFCFB8'),
      new THREE.Color('#FF5722'),
    ]
    const colArr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const c = palette[Math.floor(Math.random() * palette.length)]
      colArr[i * 3] = c.r
      colArr[i * 3 + 1] = c.g
      colArr[i * 3 + 2] = c.b
    }
    return colArr
  }, [])

  const positions = useMemo(() => new Float32Array(count * 3), [])
  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = 0.015 + Math.random() * 0.045
    }
    return s
  }, [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute

    for (let i = 0; i < count; i++) {
      const orb = orbits[i]
      const angle = t * orb.speed + orb.offset

      // Orbital position
      let x = Math.cos(angle) * orb.radius
      let y = Math.sin(angle * orb.yOscSpeed) * orb.yOsc
      let z = Math.sin(angle) * orb.radius

      // Apply tilt
      const cosT = Math.cos(orb.tiltX)
      const sinT = Math.sin(orb.tiltX)
      const newY = y * cosT - z * sinT
      const newZ = y * sinT + z * cosT
      y = newY
      z = newZ

      const cosZ = Math.cos(orb.tiltZ)
      const sinZ = Math.sin(orb.tiltZ)
      const newX = x * cosZ - y * sinZ
      const newY2 = x * sinZ + y * cosZ
      x = newX
      y = newY2

      posAttr.setXYZ(i, x, y, z)
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </points>
  )
}

/* ─── Inner Glow Core ────────────────────────────────────
   A small additive-blended sphere at center for hotspot.     */
function InnerGlow() {
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const t = clock.getElapsedTime()
    matRef.current.opacity = 0.2 + Math.sin(t * 1.5) * 0.08
  })

  return (
    <mesh>
      <sphereGeometry args={[1.2, 32, 32]} />
      <meshBasicMaterial
        ref={matRef}
        color="#FFCFB8"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  )
}

/* ─── Lighting Rig ───────────────────────────────────────
   Dramatic spot + point lights in warm coral tones.           */
function Lights() {
  return (
    <>
      {/* Key spot — dramatic top-left directional */}
      <spotLight
        position={[-4, 5, 5]}
        intensity={120}
        color="#FFB088"
        angle={0.5}
        penumbra={0.8}
        distance={25}
        castShadow={false}
      />
      {/* Fill — warm side light */}
      <pointLight
        position={[5, 1, 3]}
        intensity={50}
        color="#FF8C5A"
        distance={18}
      />
      {/* Rim — bright orange from behind for edge separation */}
      <pointLight
        position={[0, -2, -5]}
        intensity={80}
        color="#FF6A37"
        distance={20}
      />
      {/* Counter-fill — cool accent for depth contrast */}
      <pointLight
        position={[-5, -3, 2]}
        intensity={18}
        color="#8866AA"
        distance={14}
      />
      {/* Top accent for specular highlights */}
      <pointLight
        position={[1, 6, 2]}
        intensity={30}
        color="#FFCFB8"
        distance={15}
      />
      <ambientLight intensity={0.12} color="#FFE0CC" />
    </>
  )
}

/* ─── Scene ──────────────────────────────────────────────── */
function Scene() {
  return (
    <>
      <Lights />
      <InnerGlow />
      <Sphere />
      <OrbitalRing />
      <OrbitalRingInner />
      <OrbitingParticles />
      <Environment preset="night" />
    </>
  )
}

/* ─── Exported Component ─────────────────────────────────── */
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
          background:
            'radial-gradient(circle, rgba(255,106,55,0.4) 0%, rgba(255,80,40,0.15) 40%, transparent 70%)',
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
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,160,100,0.5) 30%, rgba(255,220,180,0.8) 50%, rgba(255,160,100,0.5) 70%, transparent 100%)',
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
          background:
            'linear-gradient(90deg, transparent 0%, rgba(255,106,55,0.2) 25%, rgba(255,140,80,0.3) 50%, rgba(255,106,55,0.2) 75%, transparent 100%)',
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
