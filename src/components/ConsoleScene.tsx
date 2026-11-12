import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A field of soft tiles that rise in amber waves. The wave follows the
// pointer, and the Launch console button sends a burst from the centre.
// Lazy-loaded, and paused when off screen or when the tab is hidden.
export default function ConsoleScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const isSmall = window.matchMedia('(max-width: 767px)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const COLS = isSmall ? 18 : 30
    const ROWS = isSmall ? 14 : 18
    const GAP = 1.12

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 200)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    container.appendChild(renderer.domElement)

    scene.add(new THREE.HemisphereLight(0xffffff, 0xdfe3ea, 1.35))
    const key = new THREE.DirectionalLight(0xfff6e8, 1.6)
    key.position.set(-8, 16, 10)
    scene.add(key)
    const rim = new THREE.DirectionalLight(0xffffff, 0.5)
    rim.position.set(10, 6, -12)
    scene.add(rim)

    // Each tile scales up from its base.
    const geometry = new THREE.BoxGeometry(0.92, 1, 0.92)
    geometry.translate(0, 0.5, 0)
    const material = new THREE.MeshStandardMaterial({ roughness: 0.42, metalness: 0.04 })
    const count = COLS * ROWS
    const tiles = new THREE.InstancedMesh(geometry, material, count)
    tiles.instanceMatrix.setUsage(THREE.DynamicDrawUsage)

    const field = new THREE.Group()
    field.rotation.y = -0.38
    field.add(tiles)
    scene.add(field)

    const positions: { x: number; z: number }[] = []
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        positions.push({ x: (c - (COLS - 1) / 2) * GAP, z: (r - (ROWS - 1) / 2) * GAP })
      }
    }

    const base = new THREE.Color(0xeceef2)
    const mid = new THREE.Color(0xd9dde4)
    const amber = new THREE.Color(0xf5a623)
    const ink = new THREE.Color(0x2c323d)
    const tmpColor = new THREE.Color()
    const dummy = new THREE.Object3D()

    // Wave origin follows the pointer (in field space), drifting home otherwise.
    const origin = new THREE.Vector2(0, 0)
    const target = new THREE.Vector2(0, 0)
    let pointerActive = false
    let burstAt = -10

    const raycaster = new THREE.Raycaster()
    const ndc = new THREE.Vector2()
    const ground = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
    const hit = new THREE.Vector3()
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      ndc.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1)
      raycaster.setFromCamera(ndc, camera)
      if (raycaster.ray.intersectPlane(ground, hit)) {
        field.worldToLocal(hit)
        target.set(hit.x, hit.z)
        pointerActive = true
      }
    }
    const onPointerLeave = () => {
      pointerActive = false
    }
    const section = container.closest('section') ?? container
    section.addEventListener('pointermove', onPointerMove as EventListener)
    section.addEventListener('pointerleave', onPointerLeave)

    const onBurst = () => {
      burstAt = elapsed
      target.set(0, 0)
    }
    window.addEventListener('gg:launch', onBurst)

    // Frame the field for any box shape.
    const fieldW = COLS * GAP
    const onResize = () => {
      const w = container.clientWidth || 800
      const h = container.clientHeight || 480
      const aspect = w / h
      camera.aspect = aspect
      // Narrow boxes crop the sides a little rather than shrink the field.
      const narrow = aspect < 1.3
      const widthShare = narrow ? 0.4 : 0.62
      const dist = Math.max(narrow ? 22 : 30, (fieldW * widthShare) / aspect / Math.tan(THREE.MathUtils.degToRad(16)))
      camera.position.set(0, dist * 0.62, dist * 0.78)
      camera.lookAt(0, narrow ? 3.5 : -1.5, 0)
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    const ro = new ResizeObserver(onResize)
    ro.observe(container)
    onResize()

    let elapsed = 0
    let last = performance.now()
    let frameId = 0
    let running = false
    let inView = false

    const draw = () => {
      if (!pointerActive) target.set(Math.sin(elapsed * 0.23) * fieldW * 0.18, Math.cos(elapsed * 0.31) * 3)
      origin.lerp(target, 0.04)
      const sinceBurst = elapsed - burstAt

      for (let i = 0; i < count; i++) {
        const p = positions[i]
        const d = Math.hypot(p.x - origin.x, p.z - origin.y)
        const ripple = Math.max(0, Math.sin(d * 0.5 - elapsed * 2.1)) * Math.exp(-d * 0.07)
        const swell = (Math.sin(p.x * 0.35 + elapsed * 0.7) + Math.cos(p.z * 0.4 - elapsed * 0.5)) * 0.08
        let burst = 0
        if (sinceBurst > 0 && sinceBurst < 2.4) {
          const front = sinceBurst * 9
          burst = Math.exp(-((Math.hypot(p.x, p.z) - front) ** 2) / 4) * (1 - sinceBurst / 2.4) * 1.6
        }
        const lift = ripple * 1.7 + burst
        const height = 0.35 + swell + lift

        dummy.position.set(p.x, 0, p.z)
        dummy.scale.set(1, Math.max(0.12, height), 1)
        dummy.updateMatrix()
        tiles.setMatrixAt(i, dummy.matrix)

        const k = Math.min(1, lift / 1.4)
        if (k > 0.55) tmpColor.copy(amber).lerp(ink, Math.min(1, (k - 0.55) * 0.5))
        else tmpColor.copy(base).lerp(mid, swell + 0.1).lerp(amber, k * k * 2.2)
        tiles.setColorAt(i, tmpColor)
      }
      tiles.instanceMatrix.needsUpdate = true
      if (tiles.instanceColor) tiles.instanceColor.needsUpdate = true
      renderer.render(scene, camera)
    }

    function tick() {
      if (!running) return
      frameId = requestAnimationFrame(tick)
      const now = performance.now()
      elapsed += Math.min(now - last, 100) / 1000
      last = now
      draw()
    }
    const start = () => {
      if (running || reduceMotion) return
      running = true
      last = performance.now()
      frameId = requestAnimationFrame(tick)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frameId)
    }
    const sync = () => (inView && !document.hidden ? start() : stop())
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting
      sync()
    })
    io.observe(container)
    document.addEventListener('visibilitychange', sync)

    elapsed = 1.2
    draw()

    return () => {
      stop()
      io.disconnect()
      ro.disconnect()
      document.removeEventListener('visibilitychange', sync)
      section.removeEventListener('pointermove', onPointerMove as EventListener)
      section.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('gg:launch', onBurst)
      geometry.dispose()
      material.dispose()
      tiles.dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />
}
