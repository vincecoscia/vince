import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTheme } from 'next-themes'
import * as THREE from 'three'

const vertexShader = `
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    
    float dist = distance(uv, uMouse);
    if (dist < uRadius) {
      pos.z += uStrength * (1.0 - dist / uRadius);
    }
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform sampler2D uTexture;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(uTexture, vUv);
  }
`

function BulgeEffect() {
  const meshRef = useRef<THREE.Mesh | null>(null)
  const { viewport } = useThree()
  const [mouse, setMouse] = useState([0, 0])

  const uniforms = {
    uMouse: { value: { x: 0.5, y: 0.5 } },
    uRadius: { value: 0.1 },
    uStrength: { value: 0.2 },
    uTexture: { value: null },
  }

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMouse([
        event.clientX / window.innerWidth,
        1 - event.clientY / window.innerHeight,
      ])
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      uniforms.uMouse.value = { x: mouse[0] ?? 0, y: mouse[1] ?? 0 }
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeBufferGeometry args={[viewport.width, viewport.height, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

function BackgroundTexture() {
  const { theme } = useTheme()
  const textureRef = useRef<THREE.Texture>()

  const lightSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='14' fill='%23000000'>+</text></svg>`
  const darkSvg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 40 40"> <defs> <style> .cls-1 { fill: #be1b87; font-family: ArialMT, Arial; font-size: 14px; isolation: isolate; } </style> </defs> <g> <g id="Layer_1"> <text class="cls-1" transform="translate(15.9 20)"><tspan x="0" y="0">+</tspan></text> </g> </g> </svg>`

  useEffect(() => {
    const svg = theme === 'dark' ? darkSvg : lightSvg
    const blob = new Blob([svg], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)

    const loader = new THREE.TextureLoader()
    loader.load(url, (texture) => {
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping
      texture.repeat.set(window.innerWidth / 40, window.innerHeight / 40)
      textureRef.current = texture
      if (meshRef.current) {
        meshRef.current.material.uniforms.uTexture.value = texture
      }
    })

    return () => URL.revokeObjectURL(url)
  }, [theme])

  return null
}

export default function DynamicBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas>
        <BackgroundTexture />
        <BulgeEffect />
      </Canvas>
    </div>
  )
}