'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* ─── Simplex Noise 3D GLSL ─────────────────────────────── */
const SIMPLEX_NOISE_3D = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
      i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
`

/* ─── Displaced Icosahedron ───────────────────────────────
   Faceted geometry with flowing simplex-noise displacement.
   Fresnel rim glow baked into the fragment shader.            */
function DisplacedIcosahedron() {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)
  const { pointer } = useThree()
  const smoothMouse = useRef({ x: 0, y: 0 })

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uNoiseScale: { value: 1.5 },
      uNoiseSpeed: { value: 0.4 },
      uDisplacementStrength: { value: 0.25 },
      uColor: { value: new THREE.Color('#FF6A37') },
      uEmissive: { value: new THREE.Color('#FF4500') },
      uRimColor: { value: new THREE.Color('#FFAD85') },
      uRimPower: { value: 2.5 },
    }),
    []
  )

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return
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

    // Update uniforms
    matRef.current.uniforms.uTime.value = t
    matRef.current.uniforms.uMouse.value.set(
      smoothMouse.current.x,
      smoothMouse.current.y
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
  })

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.12, 4]} />
        <shaderMaterial
          ref={matRef}
          uniforms={uniforms}
          vertexShader={`
            ${SIMPLEX_NOISE_3D}

            uniform float uTime;
            uniform vec2 uMouse;
            uniform float uNoiseScale;
            uniform float uNoiseSpeed;
            uniform float uDisplacementStrength;

            varying vec3 vNormal;
            varying vec3 vViewDir;
            varying float vDisplacement;
            varying vec3 vWorldNormal;

            void main() {
              vec3 pos = position;

              // Two octaves of simplex noise
              float n1 = snoise(pos * uNoiseScale + uTime * uNoiseSpeed);
              float n2 = snoise(pos * uNoiseScale * 2.0 + uTime * uNoiseSpeed * 0.5) * 0.5;
              float totalNoise = n1 + n2;

              // Mouse proximity modulates displacement
              float mouseLen = length(uMouse);
              float mouseInfluence = 1.0 + (1.0 - min(mouseLen, 1.0)) * 0.6;

              float displacement = totalNoise * uDisplacementStrength * mouseInfluence;
              vec3 newPos = pos + normal * displacement;

              vDisplacement = displacement;
              vNormal = normalize(normalMatrix * normal);
              vWorldNormal = normalize((modelMatrix * vec4(normal, 0.0)).xyz);
              vec4 mvPos = modelViewMatrix * vec4(newPos, 1.0);
              vViewDir = normalize(-mvPos.xyz);

              gl_Position = projectionMatrix * mvPos;
            }
          `}
          fragmentShader={`
            uniform float uTime;
            uniform vec3 uColor;
            uniform vec3 uEmissive;
            uniform vec3 uRimColor;
            uniform float uRimPower;
            uniform float uDisplacementStrength;

            varying vec3 vNormal;
            varying vec3 vViewDir;
            varying float vDisplacement;
            varying vec3 vWorldNormal;

            void main() {
              // Hemisphere lighting
              float hemi = dot(vWorldNormal, vec3(0.0, 1.0, 0.0)) * 0.5 + 0.5;
              vec3 baseColor = mix(uColor * 0.5, uColor, hemi);

              // Fresnel rim glow
              float fresnel = 1.0 - max(dot(vViewDir, vNormal), 0.0);
              fresnel = pow(fresnel, uRimPower);

              // Displacement peak glow (brighter where surface bulges)
              float peakGlow = smoothstep(0.0, uDisplacementStrength, max(vDisplacement, 0.0));

              // Pulsing emissive
              float pulse = 0.25 + sin(uTime * 1.2) * 0.15 + sin(uTime * 2.8) * 0.05;

              vec3 color = baseColor;
              color += uEmissive * pulse;
              color += uRimColor * fresnel * 0.7;
              color += uEmissive * peakGlow * 0.4;

              gl_FragColor = vec4(color, 1.0);
            }
          `}
        />
      </mesh>
    </Float>
  )
}

/* ─── Orbital Ring ───────────────────────────────────────
   Tilted torus with additive-blended emissive material.     */
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
      <torusGeometry args={[1.82, 0.01, 16, 128]} />
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
      <torusGeometry args={[1.58, 0.005, 16, 100]} />
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

/* ─── Enhanced Particle Field ────────────────────────────
   200 particles in 3 size tiers with custom gaussian-glow
   shader, individual pulse phases, and edge opacity fade.   */
function EnhancedParticleField({
  positionsRef,
}: {
  positionsRef: { current: Float32Array }
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 200

  const { orbits, positions, colors, sizes, pulsePhases, pulseSpeeds } =
    useMemo(() => {
      const params = []
      const posArr = new Float32Array(count * 3)
      const colArr = new Float32Array(count * 3)
      const sizeArr = new Float32Array(count)
      const phaseArr = new Float32Array(count)
      const speedArr = new Float32Array(count)

      const palette = [
        new THREE.Color('#FF6A37'),
        new THREE.Color('#FF8C5A'),
        new THREE.Color('#FFB088'),
        new THREE.Color('#FF9B75'),
        new THREE.Color('#FFCFB8'),
        new THREE.Color('#FF5722'),
      ]

      for (let i = 0; i < count; i++) {
        let size: number
        let speed: number
        let radius: number

        if (i < 20) {
          // Large "stars"
          size = 0.04 + Math.random() * 0.02
          speed = 0.05 + Math.random() * 0.1
          radius = 1.54 + Math.random() * 1.0
        } else if (i < 80) {
          // Medium
          size = 0.02 + Math.random() * 0.02
          speed = 0.08 + Math.random() * 0.2
          radius = 1.54 + Math.random() * 1.5
        } else {
          // Small "dust"
          size = 0.01 + Math.random() * 0.01
          speed = 0.12 + Math.random() * 0.3
          radius = 1.54 + Math.random() * 2.1
        }

        params.push({
          radius,
          speed,
          offset: Math.random() * Math.PI * 2,
          tiltX: (Math.random() - 0.5) * Math.PI * 0.8,
          tiltZ: (Math.random() - 0.5) * Math.PI * 0.6,
          yOsc: (Math.random() - 0.5) * 1.5,
          yOscSpeed: 0.3 + Math.random() * 0.5,
        })

        sizeArr[i] = size
        phaseArr[i] = Math.random() * Math.PI * 2
        speedArr[i] = 0.8 + Math.random() * 2.0

        const c = palette[Math.floor(Math.random() * palette.length)]
        colArr[i * 3] = c.r
        colArr[i * 3 + 1] = c.g
        colArr[i * 3 + 2] = c.b
      }

      return {
        orbits: params,
        positions: posArr,
        colors: colArr,
        sizes: sizeArr,
        pulsePhases: phaseArr,
        pulseSpeeds: speedArr,
      }
    }, [])

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const t = clock.getElapsedTime()
    const posAttr = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute

    for (let i = 0; i < count; i++) {
      const orb = orbits[i]
      const angle = t * orb.speed + orb.offset

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

      // Write to shared array for line connections
      positionsRef.current[i * 3] = x
      positionsRef.current[i * 3 + 1] = y
      positionsRef.current[i * 3 + 2] = z
    }
    posAttr.needsUpdate = true

    // Update time uniform
    const mat = pointsRef.current.material
    if (mat instanceof THREE.ShaderMaterial) {
      mat.uniforms.uTime.value = t
    }
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute
          attach="attributes-aPulsePhase"
          args={[pulsePhases, 1]}
        />
        <bufferAttribute
          attach="attributes-aPulseSpeed"
          args={[pulseSpeeds, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
        vertexShader={`
          attribute vec3 color;
          attribute float aSize;
          attribute float aPulsePhase;
          attribute float aPulseSpeed;

          uniform float uTime;

          varying vec3 vColor;
          varying float vOpacity;

          void main() {
            vColor = color;

            // Individual breathing pulse
            float pulse = 1.0 + sin(uTime * aPulseSpeed + aPulsePhase) * 0.3;

            // Edge opacity falloff
            float dist = length(position);
            vOpacity = 1.0 - smoothstep(3.0, 3.64, dist);

            vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = aSize * pulse * (500.0 / -mvPos.z);
            gl_Position = projectionMatrix * mvPos;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;
          varying float vOpacity;

          void main() {
            // Soft gaussian glow instead of hard point sprite
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            float alpha = exp(-dist * dist * 8.0);

            if (alpha < 0.01) discard;

            gl_FragColor = vec4(vColor, alpha * vOpacity * 0.7);
          }
        `}
      />
    </points>
  )
}

/* ─── Constellation Line Connections ─────────────────────
   Faint lines between nearby particles for network effect.  */
function LineConnections({
  positionsRef,
  count,
}: {
  positionsRef: { current: Float32Array }
  count: number
}) {
  const lineRef = useRef<THREE.LineSegments>(null)
  const maxSegments = 300
  const linePositions = useMemo(
    () => new Float32Array(maxSegments * 6),
    []
  )

  useFrame(() => {
    if (!lineRef.current) return
    const pos = positionsRef.current
    const posAttr = lineRef.current.geometry.attributes
      .position as THREE.BufferAttribute

    let segCount = 0
    const thresholdSq = 0.64 // 0.8^2

    for (let i = 0; i < count && segCount < maxSegments; i++) {
      const ix = pos[i * 3]
      const iy = pos[i * 3 + 1]
      const iz = pos[i * 3 + 2]

      for (let j = i + 1; j < count && segCount < maxSegments; j++) {
        const dx = ix - pos[j * 3]
        const dy = iy - pos[j * 3 + 1]
        const dz = iz - pos[j * 3 + 2]
        const distSq = dx * dx + dy * dy + dz * dz

        if (distSq < thresholdSq) {
          const idx = segCount * 6
          linePositions[idx] = ix
          linePositions[idx + 1] = iy
          linePositions[idx + 2] = iz
          linePositions[idx + 3] = pos[j * 3]
          linePositions[idx + 4] = pos[j * 3 + 1]
          linePositions[idx + 5] = pos[j * 3 + 2]
          segCount++
        }
      }
    }

    posAttr.needsUpdate = true
    lineRef.current.geometry.setDrawRange(0, segCount * 2)
  })

  return (
    <lineSegments ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[linePositions, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#FF8C5A"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  )
}

/* ─── Inner Glow Core ────────────────────────────────────
   Small additive-blended sphere at center for hotspot.      */
function InnerGlow() {
  const matRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!matRef.current) return
    const t = clock.getElapsedTime()
    matRef.current.opacity = 0.2 + Math.sin(t * 1.5) * 0.08
  })

  return (
    <mesh>
      <sphereGeometry args={[0.84, 32, 32]} />
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
   Dramatic spot + point lights in warm coral tones.          */
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
  const particlePosRef = useRef(new Float32Array(200 * 3))

  return (
    <>
      <Lights />
      <InnerGlow />
      <DisplacedIcosahedron />
      <OrbitalRing />
      <OrbitalRingInner />
      <EnhancedParticleField positionsRef={particlePosRef} />
      <LineConnections positionsRef={particlePosRef} count={200} />
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
      {/* Ambient glow behind the 3D shape */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '380px',
          height: '380px',
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
