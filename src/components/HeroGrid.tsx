import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CELL_METADATA = [
  {
    id: 0,
    key: 'drill',
    row: 0,
    col: 0,
  },
  {
    id: 1,
    key: 'grinder',
    row: 0,
    col: 1,
  },
  {
    id: 2,
    key: 'excavator',
    row: 0,
    col: 2,
  },
  {
    id: 3,
    key: 'sander',
    row: 1,
    col: 0,
  },
  {
    id: 4,
    key: 'savemoney',
    row: 1,
    col: 1,
  },
  {
    id: 5,
    key: 'mitresaw',
    row: 1,
    col: 2,
  },
  {
    id: 6,
    key: 'mobile',
    row: 2,
    col: 0,
  },
  {
    id: 7,
    key: 'accounting',
    row: 2,
    col: 1,
  },
  {
    id: 8,
    key: 'cash',
    row: 2,
    col: 2,
  },
];

// Create a rounded rectangle THREE.Shape for extruded beveled studio tiles & slabs
function createRoundedRectShape(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

// Create a studio softbox reflection environment texture in-memory for metallic/glass realism
function createStudioEnvironmentMap() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  // Warm studio gradient background
  const grad = ctx.createLinearGradient(0, 0, 0, 256);
  grad.addColorStop(0, '#FFFFFF');
  grad.addColorStop(0.45, '#F1F5F9');
  grad.addColorStop(0.55, '#E2E8F0');
  grad.addColorStop(1, '#CBD5E1');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 256);

  // Overhead studio softbox highlights
  ctx.fillStyle = 'rgba(255, 252, 245, 0.95)';
  ctx.fillRect(60, 18, 160, 55);
  ctx.fillRect(290, 24, 150, 50);

  // Subtle warm & cool side rim reflectors
  ctx.fillStyle = 'rgba(254, 243, 199, 0.5)';
  ctx.fillRect(20, 90, 90, 80);
  ctx.fillStyle = 'rgba(219, 234, 254, 0.55)';
  ctx.fillRect(380, 90, 100, 80);

  const texture = new THREE.CanvasTexture(canvas);
  texture.mapping = THREE.EquirectangularReflectionMapping;
  return texture;
}

// Smooth ASMR easing curve (heavy hydraulic cubic-bezier feel)
function smoothStepASMR(x: number) {
  const t = Math.max(0, Math.min(1, x));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Interactive isometric 3×3 tile grid. Lazy-loaded by the hero so
// three.js never blocks first paint, and paused whenever it is off
// screen or the tab is hidden.
export default function HeroGrid() {
  const mountRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({
    animMode: 'all',
    hoveredCell: null as number | null,
    selectedCell: null as number | null,
    activeWaveSet: [0, 4, 8],
    wavePulseTime: -10,
  });

  // A gentle ripple across the tiles, triggered from the hero CTA.
  useEffect(() => {
    const ripple = () => {
      stateRef.current.wavePulseTime = performance.now() * 0.001;
    };
    window.addEventListener('gg:ripple', ripple);
    return () => window.removeEventListener('gg:ripple', ripple);
  }, []);

  // Initialize Three.js Orthographic Studio Scene
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const width = container.clientWidth || 720;
    const height = container.clientHeight || 640;

    const scene = new THREE.Scene();
    const envMap = createStudioEnvironmentMap();
    scene.environment = envMap;

    // Isometric Orthographic Camera
    const frustumSize = 10.6;
    const aspect = width / height;
    const camera = new THREE.OrthographicCamera(
      (-frustumSize * aspect) / 2,
      (frustumSize * aspect) / 2,
      frustumSize / 2,
      -frustumSize / 2,
      0.1,
      100
    );
    camera.position.set(13.2, 12.6, 14.2);
    camera.lookAt(0, 0.15, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.06;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- STUDIO LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.78);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 0.55);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    // Main Overhead Warm Key Light with Crisp Soft Shadows
    const keyLight = new THREE.DirectionalLight(0xfffcf5, 1.15);
    keyLight.position.set(9, 19, 11);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = isSmall ? 1024 : 2048;
    keyLight.shadow.mapSize.height = isSmall ? 1024 : 2048;
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 42;
    const d = 8.5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Rim Fill Light from Left-Back
    const rimLight = new THREE.DirectionalLight(0xf8fafc, 0.6);
    rimLight.position.set(-14, 10, -9);
    scene.add(rimLight);

    // Soft Front Bounce Light
    const bounceLight = new THREE.DirectionalLight(0xfef3c7, 0.35);
    bounceLight.position.set(4, 5, 16);
    scene.add(bounceLight);

    // Shadow-receiving studio ground plane
    const shadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(36, 36),
      new THREE.ShadowMaterial({ opacity: 0.11 })
    );
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.32;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // --- SHARED STUDIO MATERIALS ---
    const matTileBase = new THREE.MeshPhysicalMaterial({
      color: 0xdce1eb,
      roughness: 0.42,
      metalness: 0.08,
      clearcoat: 0.15,
    });

    const matTileWhiteTop = new THREE.MeshPhysicalMaterial({
      color: 0xf8fafc,
      roughness: 0.22,
      metalness: 0.03,
      clearcoat: 0.6,
      clearcoatRoughness: 0.18,
    });

    const matTileAmberTop = new THREE.MeshPhysicalMaterial({
      color: 0xf6b756,
      roughness: 0.28,
      metalness: 0.05,
      clearcoat: 0.35,
    });

    const matTileBlueGlassTop = new THREE.MeshPhysicalMaterial({
      color: 0xf1f5f9,
      roughness: 0.15,
      metalness: 0.05,
      transparent: true,
      opacity: 0.86,
      clearcoat: 0.9,
    });

    const matTileMintGlassTop = new THREE.MeshPhysicalMaterial({
      color: 0xfdf1dc,
      roughness: 0.18,
      metalness: 0.05,
      transparent: true,
      opacity: 0.88,
      clearcoat: 0.85,
    });

    const matAmber = new THREE.MeshPhysicalMaterial({
      color: 0xf59e0b,
      roughness: 0.25,
      metalness: 0.18,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
    });

    const matAmberSoft = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      roughness: 0.3,
      metalness: 0.12,
      clearcoat: 0.35,
    });

    const matBrushedSteel = new THREE.MeshStandardMaterial({
      color: 0xd4d8e1,
      roughness: 0.24,
      metalness: 0.82,
    });

    const matChrome = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.12,
      metalness: 0.94,
    });

    const matDarkSlate = new THREE.MeshStandardMaterial({
      color: 0x333947,
      roughness: 0.45,
      metalness: 0.38,
    });

    const matCharcoal = new THREE.MeshStandardMaterial({
      color: 0x1e232d,
      roughness: 0.55,
      metalness: 0.25,
    });

    const matCobalt = new THREE.MeshPhysicalMaterial({
      color: 0x2c323d,
      roughness: 0.24,
      metalness: 0.22,
      clearcoat: 0.65,
      clearcoatRoughness: 0.15,
    });

    const matCobaltLight = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.15,
      clearcoat: 0.8,
    });

    const matCobaltGlass = new THREE.MeshPhysicalMaterial({
      color: 0x94a3b8,
      roughness: 0.12,
      metalness: 0.08,
      transparent: true,
      opacity: 0.74,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });

    const matEmerald = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      roughness: 0.26,
      metalness: 0.2,
      clearcoat: 0.55,
    });

    const matMint = new THREE.MeshPhysicalMaterial({
      color: 0xfcd34d,
      roughness: 0.3,
      metalness: 0.1,
      clearcoat: 0.4,
    });

    const matGold = new THREE.MeshStandardMaterial({
      color: 0xeab308,
      roughness: 0.22,
      metalness: 0.86,
    });

    const matCeramicWhite = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.18,
      metalness: 0.02,
      clearcoat: 0.7,
    });

    const matFrostedCylinder = new THREE.MeshPhysicalMaterial({
      color: 0xe2e8f0,
      roughness: 0.18,
      metalness: 0.05,
      transparent: true,
      opacity: 0.46,
      clearcoat: 0.95,
      side: THREE.DoubleSide,
    });


    // --- ROOT GRID GROUP ---
    const gridGroup = new THREE.Group();
    // Slight isometric yaw so all 9 tiles match the reference composition
    gridGroup.rotation.y = -0.21;
    gridGroup.position.set(0.15, -0.1, 0.1);
    scene.add(gridGroup);

    const tileSpacing = 2.62;
    const baseShape = createRoundedRectShape(2.28, 2.28, 0.22);
    const baseGeom = new THREE.ExtrudeGeometry(baseShape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.035,
    });
    baseGeom.rotateX(-Math.PI / 2);

    const topShape = createRoundedRectShape(2.14, 2.14, 0.18);
    const topGeom = new THREE.ExtrudeGeometry(topShape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    });
    topGeom.rotateX(-Math.PI / 2);

    const hitObjects: THREE.Object3D[] = [];
    type CellController = {
      meta: (typeof CELL_METADATA)[number];
      cellRoot: THREE.Group;
      topMesh: THREE.Mesh;
      toolGroup: THREE.Group;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- loose bag of three.js parts
      refs: Record<string, any>;
      currentLift: number;
      activityBlend: number;
    };
    const cellControllers: CellController[] = [];

    // Helper to enable shadows on all child meshes
    const enableShadows = (obj: THREE.Object3D, cast = true, receive = true) => {
      obj.traverse((child: THREE.Object3D) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          mesh.castShadow = cast;
          mesh.receiveShadow = receive;
        }
      });
    };

    // Build all 9 tiles and their custom 3D mechanical assemblies
    CELL_METADATA.forEach((meta) => {
      const cellRoot = new THREE.Group();
      const gx = (meta.col - 1) * tileSpacing;
      const gz = (meta.row - 1) * tileSpacing;
      cellRoot.position.set(gx, 0, gz);
      gridGroup.add(cellRoot);

      // 1. Lower Beveled Pedestal Slab
      const baseMesh = new THREE.Mesh(baseGeom, matTileBase);
      baseMesh.position.y = -0.14;
      baseMesh.castShadow = true;
      baseMesh.receiveShadow = true;
      cellRoot.add(baseMesh);

      // 2. Upper Acrylic / Ceramic Top Plate
      let chosenTopMat = matTileWhiteTop;
      if (meta.key === 'grinder') chosenTopMat = matTileAmberTop;
      if (meta.key === 'mobile') chosenTopMat = matTileBlueGlassTop;
      if (meta.key === 'cash') chosenTopMat = matTileMintGlassTop;

      const topMesh = new THREE.Mesh(topGeom, chosenTopMat.clone());
      topMesh.position.y = -0.02;
      topMesh.castShadow = true;
      topMesh.receiveShadow = true;
      cellRoot.add(topMesh);

      // Invisible Raycast Hit Box covering the tile + tool height
      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(2.35, 2.4, 2.35),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.position.y = 0.9;
      hitBox.userData = { cellId: meta.id };
      cellRoot.add(hitBox);
      hitObjects.push(hitBox);

      // 4. Dedicated Tool Assembly Container
      const toolGroup = new THREE.Group();
      toolGroup.position.y = 0.1;
      cellRoot.add(toolGroup);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- loose bag of three.js parts
      const refs: Record<string, any> = {};

      // =========================================================
      // CELL 0: [0,0] CORE DRILL (Amber & Brushed Steel)
      // =========================================================
      if (meta.key === 'drill') {
        // Bottom gold-anodized calibration ring
        const lowerRing = new THREE.Mesh(
          new THREE.TorusGeometry(0.68, 0.065, 20, 48),
          matGold
        );
        lowerRing.rotation.x = Math.PI / 2;
        lowerRing.position.y = 0.08;
        toolGroup.add(lowerRing);

        // 4 micro calibration studs on lower ring
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 2 + Math.PI / 4;
          const stud = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.11, 12),
            matDarkSlate
          );
          stud.position.set(Math.cos(a) * 0.68, 0.11, Math.sin(a) * 0.68);
          toolGroup.add(stud);
        }

        // Two vertical brushed steel guide rods
        [-0.58, 0.58].forEach((rx) => {
          const rod = new THREE.Mesh(
            new THREE.CylinderGeometry(0.024, 0.024, 1.55, 16),
            matBrushedSteel
          );
          rod.position.set(rx, 0.82, 0);
          toolGroup.add(rod);
        });

        // Floating spiral guide wire around the bit
        const spiralPoints = [];
        for (let i = 0; i <= 80; i++) {
          const t = i / 80;
          const ang = t * Math.PI * 5.2;
          const rad = 0.42 - t * 0.06;
          spiralPoints.push(
            new THREE.Vector3(Math.cos(ang) * rad, 0.32 + t * 1.15, Math.sin(ang) * rad)
          );
        }
        const spiralCurve = new THREE.CatmullRomCurve3(spiralPoints);
        const outerCage = new THREE.Mesh(
          new THREE.TubeGeometry(spiralCurve, 90, 0.026, 12, false),
          matChrome
        );
        toolGroup.add(outerCage);
        refs.outerCage = outerCage;

        // Plunging & Rotating Drill Bit Assembly
        const drillBitGroup = new THREE.Group();
        toolGroup.add(drillBitGroup);
        refs.drillBitGroup = drillBitGroup;

        // Top Amber Chuck Cylinder
        const chuck = new THREE.Mesh(
          new THREE.CylinderGeometry(0.2, 0.2, 0.42, 28),
          matAmber
        );
        chuck.position.y = 1.72;
        drillBitGroup.add(chuck);

        const chuckCollar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.25, 0.25, 0.12, 28),
          matAmberSoft
        );
        chuckCollar.position.y = 1.48;
        drillBitGroup.add(chuckCollar);

        // Central Amber Core Shaft
        const coreShaft = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.11, 1.15, 24),
          matAmber
        );
        coreShaft.position.y = 0.88;
        drillBitGroup.add(coreShaft);

        // Helical Auger Blades (4 stacked tilted fluted collars)
        for (let i = 0; i < 4; i++) {
          const flute = new THREE.Mesh(
            new THREE.CylinderGeometry(0.31 - i * 0.02, 0.26 - i * 0.02, 0.14, 24),
            i % 2 === 0 ? matAmber : matBrushedSteel
          );
          flute.position.y = 1.22 - i * 0.25;
          flute.rotation.z = 0.24;
          flute.rotation.x = (i * Math.PI) / 2;
          drillBitGroup.add(flute);
        }

        // Sharp Conical Steel Drill Tip
        const tip = new THREE.Mesh(
          new THREE.ConeGeometry(0.18, 0.34, 24),
          matChrome
        );
        tip.rotation.x = Math.PI;
        tip.position.y = 0.24;
        drillBitGroup.add(tip);
      }

      // =========================================================
      // CELL 1: [0,1] ANGLE GRINDER (Amber & Graphite)
      // =========================================================
      if (meta.key === 'grinder') {
        // Heavy Dark Slate Base Cradle
        const cradleBase = new THREE.Mesh(
          new THREE.CylinderGeometry(0.56, 0.64, 0.18, 32),
          matDarkSlate
        );
        cradleBase.position.set(0.05, 0.09, -0.05);
        toolGroup.add(cradleBase);

        // Front Angled Foot Tab
        const frontTab = new THREE.Mesh(
          new THREE.BoxGeometry(0.42, 0.12, 0.45),
          matDarkSlate
        );
        frontTab.position.set(-0.35, 0.06, 0.32);
        frontTab.rotation.y = -Math.PI / 4;
        toolGroup.add(frontTab);

        // Tilting Motor Housing & Disc Assembly
        const pivotGroup = new THREE.Group();
        pivotGroup.position.set(0.05, 0.24, -0.05);
        pivotGroup.rotation.z = 0.48;
        pivotGroup.rotation.x = 0.32;
        toolGroup.add(pivotGroup);
        refs.pivotGroup = pivotGroup;

        const motorDrum = new THREE.Mesh(
          new THREE.CylinderGeometry(0.36, 0.42, 0.34, 28),
          matCharcoal
        );
        motorDrum.position.y = 0.12;
        pivotGroup.add(motorDrum);

        // Spinning Abrasive Amber Disc Group
        const discGroup = new THREE.Group();
        discGroup.position.y = 0.32;
        pivotGroup.add(discGroup);
        refs.discGroup = discGroup;

        // Wide Beveled Amber Wheel
        const mainDisc = new THREE.Mesh(
          new THREE.CylinderGeometry(0.76, 0.8, 0.08, 48),
          matAmberSoft
        );
        discGroup.add(mainDisc);

        const discInnerBevel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.45, 0.52, 0.1, 36),
          matAmber
        );
        discInnerBevel.position.y = 0.01;
        discGroup.add(discInnerBevel);

        // Center Graphite Locking Flange & Pin Holes
        const lockNut = new THREE.Mesh(
          new THREE.CylinderGeometry(0.24, 0.24, 0.14, 28),
          matDarkSlate
        );
        lockNut.position.y = 0.03;
        discGroup.add(lockNut);

        const spindleCap = new THREE.Mesh(
          new THREE.CylinderGeometry(0.06, 0.06, 0.17, 16),
          matChrome
        );
        spindleCap.position.y = 0.03;
        discGroup.add(spindleCap);

        // 4 Pin Spanner Holes on Flange so spin is clearly visible
        for (let i = 0; i < 4; i++) {
          const a = (i * Math.PI) / 2;
          const marker = new THREE.Mesh(
            new THREE.CylinderGeometry(0.032, 0.032, 0.1, 12),
            matCharcoal
          );
          marker.position.set(Math.cos(a) * 0.58, 0.01, Math.sin(a) * 0.58);
          discGroup.add(marker);
        }
      }

      // =========================================================
      // CELL 2: [0,2] HEAVY EXCAVATOR (Cobalt Blue & Dark Slate)
      // =========================================================
      if (meta.key === 'excavator') {
        const exRoot = new THREE.Group();
        exRoot.position.set(0.12, 0, 0.08);
        exRoot.rotation.y = -0.35;
        toolGroup.add(exRoot);

        // Left & Right Caterpillar Tracks
        const trackShape = createRoundedRectShape(1.18, 0.32, 0.15);
        const trackGeom = new THREE.ExtrudeGeometry(trackShape, {
          depth: 0.22,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.02,
          bevelThickness: 0.02,
        });

        [-0.44, 0.44].forEach((tz) => {
          const track = new THREE.Mesh(trackGeom, matCharcoal);
          track.position.set(0.08, 0.17, tz - 0.11);
          exRoot.add(track);

          // Inner Drive Sprockets
          [-0.38, 0, 0.38].forEach((wx) => {
            const wheel = new THREE.Mesh(
              new THREE.CylinderGeometry(0.09, 0.09, 0.25, 16),
              matDarkSlate
            );
            wheel.rotation.x = Math.PI / 2;
            wheel.position.set(0.08 + wx, 0.17, tz);
            exRoot.add(wheel);
          });
        });

        // Undercarriage Turntable Ring
        const slewRing = new THREE.Mesh(
          new THREE.CylinderGeometry(0.38, 0.42, 0.14, 24),
          matDarkSlate
        );
        slewRing.position.set(0.12, 0.32, 0);
        exRoot.add(slewRing);

        // Slewing Upper Cab & Articulated Arm Group
        const cabGroup = new THREE.Group();
        cabGroup.position.set(0.12, 0.4, 0);
        exRoot.add(cabGroup);
        refs.cabGroup = cabGroup;

        // Cobalt Blue Engine Body Deck
        const bodyDeck = new THREE.Mesh(
          new THREE.BoxGeometry(0.95, 0.34, 0.78),
          matCobalt
        );
        bodyDeck.position.set(0.06, 0.17, 0);
        cabGroup.add(bodyDeck);

        // Rear Counterweight
        const counterWeight = new THREE.Mesh(
          new THREE.CylinderGeometry(0.39, 0.39, 0.36, 20),
          matCobalt
        );
        counterWeight.position.set(0.42, 0.18, 0);
        cabGroup.add(counterWeight);

        // Operator Cabin (Dark Slate + Glass Window)
        const cabin = new THREE.Mesh(
          new THREE.BoxGeometry(0.48, 0.42, 0.38),
          matDarkSlate
        );
        cabin.position.set(-0.08, 0.48, 0.18);
        cabGroup.add(cabin);

        // Articulated Boom Arm
        const boomGroup = new THREE.Group();
        boomGroup.position.set(-0.22, 0.28, -0.1);
        boomGroup.rotation.z = 0.52;
        cabGroup.add(boomGroup);
        refs.boomGroup = boomGroup;

        // Lower Boom Section
        const boomLower = new THREE.Mesh(
          new THREE.BoxGeometry(0.16, 0.78, 0.16),
          matCobalt
        );
        boomLower.position.set(-0.1, 0.34, 0);
        boomLower.rotation.z = 0.22;
        boomGroup.add(boomLower);

        // Upper Angled Boom Section
        const boomUpper = new THREE.Mesh(
          new THREE.BoxGeometry(0.68, 0.15, 0.15),
          matCobalt
        );
        boomUpper.position.set(-0.52, 0.72, 0);
        boomUpper.rotation.z = -0.35;
        boomGroup.add(boomUpper);

        // Chrome Hydraulic Lift Cylinder
        const boomCyl = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.035, 0.55, 12),
          matChrome
        );
        boomCyl.position.set(-0.26, 0.32, 0);
        boomCyl.rotation.z = 0.45;
        boomGroup.add(boomCyl);

        // Articulated Dipper Stick Group
        const stickGroup = new THREE.Group();
        stickGroup.position.set(-0.82, 0.82, 0);
        stickGroup.rotation.z = -0.38;
        boomGroup.add(stickGroup);
        refs.stickGroup = stickGroup;

        const stickArm = new THREE.Mesh(
          new THREE.BoxGeometry(0.13, 0.78, 0.13),
          matCobalt
        );
        stickArm.position.set(-0.12, -0.34, 0);
        stickArm.rotation.z = -0.25;
        stickGroup.add(stickArm);

        const stickPiston = new THREE.Mesh(
          new THREE.CylinderGeometry(0.028, 0.028, 0.48, 12),
          matChrome
        );
        stickPiston.position.set(-0.22, -0.22, 0);
        stickPiston.rotation.z = -0.28;
        stickGroup.add(stickPiston);

        // Excavator Bucket Group
        const bucketGroup = new THREE.Group();
        bucketGroup.position.set(-0.22, -0.7, 0);
        bucketGroup.rotation.z = 0.35;
        stickGroup.add(bucketGroup);
        refs.bucketGroup = bucketGroup;

        const bucketBody = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.18, 0.28, 16, 1, false, 0, Math.PI * 1.15),
          matDarkSlate
        );
        bucketBody.rotation.x = Math.PI / 2;
        bucketBody.position.set(0.05, -0.05, 0);
        bucketGroup.add(bucketBody);

        // 4 Bucket Digging Teeth
        for (let t = -1.5; t <= 1.5; t += 1) {
          const tooth = new THREE.Mesh(
            new THREE.BoxGeometry(0.09, 0.03, 0.035),
            matBrushedSteel
          );
          tooth.position.set(0.2, -0.14, t * 0.065);
          tooth.rotation.z = -0.3;
          bucketGroup.add(tooth);
        }
      }

      // =========================================================
      // CELL 3: [1,0] ORBITAL SANDER (Amber & Ceramic White)
      // =========================================================
      if (meta.key === 'sander') {
        const sanderAssembly = new THREE.Group();
        toolGroup.add(sanderAssembly);
        refs.sanderAssembly = sanderAssembly;

        // Bottom Amber Orbital Base Pad
        const padBase = new THREE.Mesh(
          new THREE.CylinderGeometry(0.68, 0.72, 0.14, 40),
          matAmber
        );
        padBase.position.y = 0.08;
        sanderAssembly.add(padBase);

        // Sculpted Ceramic White Middle Housing
        const ceramicBody = new THREE.Mesh(
          new THREE.CylinderGeometry(0.46, 0.58, 0.34, 36),
          matCeramicWhite
        );
        ceramicBody.position.y = 0.31;
        sanderAssembly.add(ceramicBody);

        // Amber Neck Collar
        const neckCollar = new THREE.Mesh(
          new THREE.CylinderGeometry(0.32, 0.38, 0.2, 32),
          matAmber
        );
        neckCollar.position.y = 0.54;
        sanderAssembly.add(neckCollar);

        // Ergonomic Oval Amber Palm Grip on Top
        const palmGrip = new THREE.Group();
        palmGrip.position.y = 0.72;
        sanderAssembly.add(palmGrip);
        refs.palmGrip = palmGrip;

        const gripCap = new THREE.Mesh(
          new THREE.SphereGeometry(0.44, 32, 24),
          matAmberSoft
        );
        gripCap.scale.set(1.32, 0.42, 0.88);
        gripCap.rotation.y = Math.PI / 5;
        gripCap.rotation.z = -0.14;
        palmGrip.add(gripCap);
      }

      // =========================================================
      // CELL 4: [1,1] SAVE MONEY / VAULT COIN (Emerald, Gold & Frosted Glass)
      // =========================================================
      if (meta.key === 'savemoney') {
        // Inner Emerald Cushion Pad
        const innerCushion = new THREE.Mesh(
          new THREE.CylinderGeometry(0.56, 0.6, 0.26, 36),
          matMint
        );
        innerCushion.position.y = 0.14;
        toolGroup.add(innerCushion);
        refs.innerCushion = innerCushion;

        const innerSlotRim = new THREE.Mesh(
          new THREE.TorusGeometry(0.52, 0.045, 16, 40),
          matEmerald
        );
        innerSlotRim.rotation.x = Math.PI / 2;
        innerSlotRim.position.y = 0.28;
        toolGroup.add(innerSlotRim);

        // Outer Translucent Frosted Glass Cylinder Vault
        const glassWall = new THREE.Mesh(
          new THREE.CylinderGeometry(0.68, 0.68, 0.72, 48, 1, true),
          matFrostedCylinder
        );
        glassWall.position.y = 0.37;
        toolGroup.add(glassWall);

        // Frosted Top Rim Bevel
        const glassRim = new THREE.Mesh(
          new THREE.TorusGeometry(0.68, 0.03, 16, 48),
          matCeramicWhite
        );
        glassRim.rotation.x = Math.PI / 2;
        glassRim.position.y = 0.73;
        toolGroup.add(glassRim);

        // Descending & Rotating Gold + Emerald Coin
        const coinGroup = new THREE.Group();
        coinGroup.position.y = 0.86;
        coinGroup.rotation.y = Math.PI / 5;
        toolGroup.add(coinGroup);
        refs.coinGroup = coinGroup;

        // Coin Outer Gold Rim
        const coinEdge = new THREE.Mesh(
          new THREE.CylinderGeometry(0.5, 0.5, 0.13, 44),
          matGold
        );
        coinEdge.rotation.z = Math.PI / 2;
        coinGroup.add(coinEdge);

        // Coin Raised Gold Bezel Rings (both faces)
        [-0.062, 0.062].forEach((offsetX) => {
          const facePlate = new THREE.Mesh(
            new THREE.CylinderGeometry(0.43, 0.43, 0.02, 40),
            matEmerald
          );
          facePlate.rotation.z = Math.PI / 2;
          facePlate.position.x = offsetX;
          coinGroup.add(facePlate);

          const goldRing = new THREE.Mesh(
            new THREE.TorusGeometry(0.43, 0.035, 16, 40),
            matGold
          );
          goldRing.rotation.y = Math.PI / 2;
          goldRing.position.x = offsetX * 1.1;
          coinGroup.add(goldRing);

          // Sculpted '$' / S-Curve Emblem
          const sBar = new THREE.Mesh(
            new THREE.BoxGeometry(0.025, 0.44, 0.045),
            matGold
          );
          sBar.position.x = offsetX * 1.25;
          coinGroup.add(sBar);

          const topArc = new THREE.Mesh(
            new THREE.TorusGeometry(0.1, 0.03, 12, 24, Math.PI * 1.35),
            matGold
          );
          topArc.rotation.y = Math.PI / 2;
          topArc.rotation.x = 0.3;
          topArc.position.set(offsetX * 1.25, 0.09, 0);
          coinGroup.add(topArc);

          const botArc = new THREE.Mesh(
            new THREE.TorusGeometry(0.1, 0.03, 12, 24, Math.PI * 1.35),
            matGold
          );
          botArc.rotation.y = Math.PI / 2;
          botArc.rotation.x = Math.PI + 0.3;
          botArc.position.set(offsetX * 1.25, -0.09, 0);
          coinGroup.add(botArc);
        });
      }

      // =========================================================
      // CELL 5: [1,2] MITRE SAW (Amber & Chrome)
      // =========================================================
      if (meta.key === 'mitresaw') {
        const sawRoot = new THREE.Group();
        sawRoot.rotation.y = -0.25;
        toolGroup.add(sawRoot);

        // Amber Corner Base Feet
        const baseFrame = new THREE.Mesh(
          new THREE.BoxGeometry(1.12, 0.1, 1.12),
          matAmber
        );
        baseFrame.position.y = 0.05;
        sawRoot.add(baseFrame);

        // Brushed Steel Turntable Disc
        const turntable = new THREE.Mesh(
          new THREE.CylinderGeometry(0.56, 0.6, 0.14, 36),
          matBrushedSteel
        );
        turntable.position.y = 0.12;
        sawRoot.add(turntable);

        // Kerf Slot & Mitre Handle Stick
        const mitreArm = new THREE.Mesh(
          new THREE.CylinderGeometry(0.035, 0.035, 0.55, 12),
          matChrome
        );
        mitreArm.rotation.x = Math.PI / 2;
        mitreArm.rotation.z = -0.35;
        mitreArm.position.set(-0.22, 0.14, 0.52);
        sawRoot.add(mitreArm);

        const mitreKnob = new THREE.Mesh(
          new THREE.SphereGeometry(0.065, 16, 16),
          matAmber
        );
        mitreKnob.position.set(-0.36, 0.14, 0.74);
        sawRoot.add(mitreKnob);

        // Rear Pivot Pedestal Tower
        const rearTower = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.45, 0.32),
          matAmber
        );
        rearTower.position.set(0.24, 0.32, -0.32);
        sawRoot.add(rearTower);

        // Chopping Cantilever Saw Head Group
        const chopGroup = new THREE.Group();
        chopGroup.position.set(0.18, 0.5, -0.28);
        sawRoot.add(chopGroup);
        refs.chopGroup = chopGroup;

        // Upper Amber Safety Guard Half-Bell
        const bladeGuard = new THREE.Mesh(
          new THREE.CylinderGeometry(
            0.52,
            0.52,
            0.18,
            32,
            1,
            false,
            -Math.PI * 0.15,
            Math.PI * 1.18
          ),
          matAmber
        );
        bladeGuard.rotation.z = Math.PI / 2;
        bladeGuard.position.set(-0.14, 0.32, 0.26);
        chopGroup.add(bladeGuard);

        // Top Ergonomic Amber Handle
        const topHandle = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 0.12, 0.42),
          matAmberSoft
        );
        topHandle.position.set(-0.12, 0.72, 0.22);
        topHandle.rotation.x = 0.25;
        chopGroup.add(topHandle);

        // Chrome Circular Saw Blade with Teeth
        const bladeGroup = new THREE.Group();
        bladeGroup.position.set(-0.18, 0.26, 0.26);
        chopGroup.add(bladeGroup);
        refs.bladeGroup = bladeGroup;

        const sawDisc = new THREE.Mesh(
          new THREE.CylinderGeometry(0.46, 0.46, 0.025, 40),
          matChrome
        );
        sawDisc.rotation.z = Math.PI / 2;
        bladeGroup.add(sawDisc);

        // 18 Saw Teeth around perimeter
        for (let i = 0; i < 18; i++) {
          const a = (i * Math.PI * 2) / 18;
          const tooth = new THREE.Mesh(
            new THREE.BoxGeometry(0.028, 0.07, 0.07),
            matBrushedSteel
          );
          tooth.position.set(0, Math.cos(a) * 0.46, Math.sin(a) * 0.46);
          tooth.rotation.x = a + 0.35;
          bladeGroup.add(tooth);
        }

        const arborFlange = new THREE.Mesh(
          new THREE.CylinderGeometry(0.13, 0.13, 0.07, 24),
          matDarkSlate
        );
        arborFlange.rotation.z = Math.PI / 2;
        bladeGroup.add(arborFlange);
      }

      // =========================================================
      // CELL 6: [2,0] MOBILE ACCESS (Cobalt Blue & Frosted Glass)
      // =========================================================
      if (meta.key === 'mobile') {
        const mobileGroup = new THREE.Group();
        toolGroup.add(mobileGroup);

        // Floating Translucent Cobalt Smartphone Slab
        const phoneGroup = new THREE.Group();
        phoneGroup.position.set(0.05, 0.28, 0.04);
        phoneGroup.rotation.y = Math.PI / 4;
        phoneGroup.rotation.x = 0.14;
        phoneGroup.rotation.z = -0.12;
        mobileGroup.add(phoneGroup);
        refs.phoneGroup = phoneGroup;

        const phoneShape = createRoundedRectShape(0.86, 1.48, 0.15);
        const phoneGeom = new THREE.ExtrudeGeometry(phoneShape, {
          depth: 0.08,
          bevelEnabled: true,
          bevelSegments: 3,
          steps: 1,
          bevelSize: 0.02,
          bevelThickness: 0.02,
        });
        phoneGeom.rotateX(-Math.PI / 2);

        const phoneBody = new THREE.Mesh(phoneGeom, matCobaltGlass);
        phoneGroup.add(phoneBody);

        // Inner Glossy Screen Layer
        const screenShape = createRoundedRectShape(0.76, 1.36, 0.11);
        const screenGeom = new THREE.ShapeGeometry(screenShape);
        screenGeom.rotateX(-Math.PI / 2);
        const screenMesh = new THREE.Mesh(screenGeom, matCobaltLight);
        screenMesh.position.y = 0.042;
        phoneGroup.add(screenMesh);

        // Dynamic Island / Speaker Pill
        const notch = new THREE.Mesh(
          new THREE.BoxGeometry(0.22, 0.015, 0.05),
          matCobalt
        );
        notch.position.set(0, 0.105, -0.54);
        phoneGroup.add(notch);

        // 3 Floating Magnetic UI Notification Badges
        const badge1 = new THREE.Group();
        badge1.position.set(-0.22, 0.56, -0.52);
        badge1.rotation.y = 0.35;
        const b1Card = new THREE.Mesh(
          new THREE.BoxGeometry(0.34, 0.24, 0.06),
          matCobalt
        );
        const b1Dot = new THREE.Mesh(
          new THREE.SphereGeometry(0.035, 12, 12),
          matCeramicWhite
        );
        b1Dot.position.set(0, 0, 0.035);
        badge1.add(b1Card, b1Dot);
        mobileGroup.add(badge1);
        refs.badge1 = badge1;

        const badge2 = new THREE.Group();
        badge2.position.set(-0.56, 0.44, -0.22);
        badge2.rotation.y = 0.35;
        const b2Card = new THREE.Mesh(
          new THREE.BoxGeometry(0.24, 0.22, 0.05),
          matTileBlueGlassTop
        );
        const b2Check = new THREE.Mesh(
          new THREE.BoxGeometry(0.11, 0.11, 0.06),
          matMint
        );
        badge2.add(b2Card, b2Check);
        mobileGroup.add(badge2);
        refs.badge2 = badge2;

        const badge3 = new THREE.Group();
        badge3.position.set(0.32, 0.14, 0.52);
        const b3Slab = new THREE.Mesh(
          new THREE.BoxGeometry(0.28, 0.06, 0.28),
          matTileBlueGlassTop
        );
        const b3Core = new THREE.Mesh(
          new THREE.CylinderGeometry(0.065, 0.065, 0.075, 16),
          matMint
        );
        badge3.add(b3Slab, b3Core);
        mobileGroup.add(badge3);
        refs.badge3 = badge3;
      }

      // =========================================================
      // CELL 7: [2,1] ACCOUNTING (Emerald & Alabaster)
      // =========================================================
      if (meta.key === 'accounting') {
        const railGroup = new THREE.Group();
        toolGroup.add(railGroup);

        // Two Parallel Brushed-Steel Linear Guide Rails along Z
        [-0.19, 0.19].forEach((rx) => {
          const rail = new THREE.Mesh(
            new THREE.CylinderGeometry(0.035, 0.035, 2.25, 20),
            matBrushedSteel
          );
          rail.rotation.x = Math.PI / 2;
          rail.position.set(rx, 0.08, 0);
          railGroup.add(rail);
        });

        // 3 Precision-Beveled Ledger Blocks on the Rails
        const blockShape = createRoundedRectShape(0.46, 0.46, 0.05);
        const blockGeom = new THREE.ExtrudeGeometry(blockShape, {
          depth: 0.34,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.02,
          bevelThickness: 0.02,
        });
        blockGeom.rotateX(-Math.PI / 2);

        const halfBlockGeom = new THREE.ExtrudeGeometry(blockShape, {
          depth: 0.17,
          bevelEnabled: true,
          bevelSegments: 2,
          steps: 1,
          bevelSize: 0.018,
          bevelThickness: 0.018,
        });
        halfBlockGeom.rotateX(-Math.PI / 2);

        // Front Emerald Block
        const block1 = new THREE.Group();
        const b1Mesh = new THREE.Mesh(blockGeom, matEmerald);
        const b1Stripe = new THREE.Mesh(
          new THREE.BoxGeometry(0.48, 0.02, 0.48),
          matMint
        );
        b1Stripe.position.y = 0.16;
        block1.add(b1Mesh, b1Stripe);
        block1.position.set(0, 0.1, 0.56);
        railGroup.add(block1);
        refs.block1 = block1;

        // Middle Emerald + White Split Block
        const block2 = new THREE.Group();
        const b2Bot = new THREE.Mesh(halfBlockGeom, matCeramicWhite);
        const b2Top = new THREE.Mesh(halfBlockGeom, matEmerald);
        b2Top.position.y = 0.18;
        block2.add(b2Bot, b2Top);
        block2.position.set(0, 0.1, 0);
        railGroup.add(block2);
        refs.block2 = block2;

        // Back Dual-Tone White + Emerald Block
        const block3 = new THREE.Group();
        const b3Bot = new THREE.Mesh(halfBlockGeom, matEmerald);
        const b3Top = new THREE.Mesh(halfBlockGeom, matCeramicWhite);
        b3Top.position.y = 0.18;
        block3.add(b3Bot, b3Top);
        block3.position.set(0, 0.1, -0.56);
        railGroup.add(block3);
        refs.block3 = block3;
      }

      // =========================================================
      // CELL 8: [2,2] CASH FLOW (Emerald & Mint Fanned Bills)
      // =========================================================
      if (meta.key === 'cash') {
        const cashRoot = new THREE.Group();
        cashRoot.position.set(0, 0.06, 0.08);
        cashRoot.rotation.y = 0.15;
        toolGroup.add(cashRoot);

        // Mint Metallic Cradle Bar & End Pins
        const cradleRod = new THREE.Mesh(
          new THREE.CylinderGeometry(0.032, 0.032, 0.96, 16),
          matEmerald
        );
        cradleRod.rotation.z = Math.PI / 2;
        cradleRod.position.set(0, 0.08, 0.25);
        cashRoot.add(cradleRod);

        [-0.36, 0.36].forEach((px) => {
          const post = new THREE.Mesh(
            new THREE.CylinderGeometry(0.03, 0.03, 0.18, 12),
            matMint
          );
          post.position.set(px, 0.08, 0.25);
          cashRoot.add(post);
        });

        // 7 Fanned 3D Currency Slabs
        const bills = [];
        const billCount = 7;
        for (let i = 0; i < billCount; i++) {
          const billPivot = new THREE.Group();
          billPivot.position.set(0, 0.08, (i - 3) * 0.025);

          // Outer Mint Note Slab
          const noteOuter = new THREE.Mesh(
            new THREE.BoxGeometry(0.56, 0.78, 0.024),
            i % 2 === 0 ? matMint : matEmerald
          );
          noteOuter.position.y = 0.38;
          billPivot.add(noteOuter);

          // Inner Crisp Currency Border & Medallion
          const noteInset = new THREE.Mesh(
            new THREE.BoxGeometry(0.44, 0.64, 0.028),
            i % 2 === 0 ? matEmerald : matMint
          );
          noteInset.position.y = 0.38;
          billPivot.add(noteInset);

          const seal = new THREE.Mesh(
            new THREE.CylinderGeometry(0.09, 0.09, 0.032, 20),
            matMint
          );
          seal.rotation.x = Math.PI / 2;
          seal.position.y = 0.38;
          billPivot.add(seal);

          cashRoot.add(billPivot);
          bills.push(billPivot);
        }
        refs.bills = bills;
      }

      enableShadows(toolGroup, true, true);

      cellControllers.push({
        meta,
        cellRoot,
        topMesh,
        toolGroup,
        refs,
        currentLift: 0,
        activityBlend: 1,
      });
    });

    // --- INTERACTION: POINTER PARALLAX & RAYCASTING ---
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(999, 999);
    const targetGridRot = { x: 0, y: -0.21 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      pointer.set(nx, ny);

      // Subtle isometric parallax tilt
      targetGridRot.y = -0.21 + nx * 0.065;
      targetGridRot.x = -ny * 0.045;

      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(hitObjects, false);
      if (intersects.length > 0) {
        const hitId = intersects[0].object.userData.cellId;
        if (stateRef.current.hoveredCell !== hitId) {
          stateRef.current.hoveredCell = hitId;
        }
        renderer.domElement.style.cursor = 'pointer';
      } else {
        if (stateRef.current.hoveredCell !== null) {
          stateRef.current.hoveredCell = null;
        }
        renderer.domElement.style.cursor = 'default';
      }
    };

    const handlePointerLeave = () => {
      targetGridRot.y = -0.21;
      targetGridRot.x = 0;
      stateRef.current.hoveredCell = null;
      renderer.domElement.style.cursor = 'default';
    };

    const handleClick = () => {
      if (stateRef.current.hoveredCell !== null) {
        const clicked = stateRef.current.hoveredCell;
        stateRef.current.selectedCell = stateRef.current.selectedCell === clicked ? null : clicked;
      }
    };

    const domElem = renderer.domElement;
    domElem.addEventListener('pointermove', handlePointerMove);
    domElem.addEventListener('pointerleave', handlePointerLeave);
    domElem.addEventListener('click', handleClick);

    // Fit the camera to the grid itself, so nothing is cut off whatever the
    // box size. Bounds are measured once in camera space (visible meshes
    // only), then padded for hover lift, parallax and moving parts.
    scene.updateMatrixWorld(true);
    camera.updateMatrixWorld(true);
    const viewBounds = new THREE.Box2(
      new THREE.Vector2(Infinity, Infinity),
      new THREE.Vector2(-Infinity, -Infinity)
    );
    const corner = new THREE.Vector3();
    gridGroup.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (!mesh.isMesh) return;
      const mat = mesh.material as THREE.Material;
      if (mat && mat.visible === false) return;
      mesh.geometry.computeBoundingBox();
      const bb = mesh.geometry.boundingBox!;
      for (let i = 0; i < 8; i++) {
        corner
          .set(i & 1 ? bb.max.x : bb.min.x, i & 2 ? bb.max.y : bb.min.y, i & 4 ? bb.max.z : bb.min.z)
          .applyMatrix4(mesh.matrixWorld)
          .applyMatrix4(camera.matrixWorldInverse);
        viewBounds.expandByPoint(new THREE.Vector2(corner.x, corner.y));
      }
    });
    const fitCenter = viewBounds.getCenter(new THREE.Vector2());
    const fitSize = viewBounds.getSize(new THREE.Vector2());
    const FIT_PAD = 1.14;

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 720;
      const h = container.clientHeight || 640;
      const asp = w / h;
      let viewW = fitSize.x * FIT_PAD;
      let viewH = fitSize.y * FIT_PAD;
      if (viewW / viewH > asp) viewH = viewW / asp;
      else viewW = viewH * asp;
      camera.left = fitCenter.x - viewW / 2;
      camera.right = fitCenter.x + viewW / 2;
      camera.top = fitCenter.y + viewH / 2;
      camera.bottom = fitCenter.y - viewH / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    handleResize();
    const ro = new ResizeObserver(handleResize);
    ro.observe(container);

    // --- 60 FPS ASMR MECHANICAL ANIMATION LOOP ---
    let frameId = 0;
    let running = false;
    let inView = true;
    let elapsedBase = 0;
    let lastTick = performance.now();

    const start = () => {
      if (running || reduceMotion) return;
      running = true;
      lastTick = performance.now();
      frameId = requestAnimationFrame(animate);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(frameId);
    };
    const handleVisibility = () => {
      if (document.hidden || !inView) stop();
      else start();
    };
    const io = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      handleVisibility();
    });
    io.observe(container);
    document.addEventListener('visibilitychange', handleVisibility);

    function animate() {
      if (running) frameId = requestAnimationFrame(animate);
      const now = performance.now();
      elapsedBase += Math.min(now - lastTick, 100) / 1000;
      lastTick = now;
      const elapsed = elapsedBase;
      const nowSec = performance.now() * 0.001;

      // Smooth grid parallax damping
      gridGroup.rotation.y += (targetGridRot.y - gridGroup.rotation.y) * 0.06;
      gridGroup.rotation.x += (targetGridRot.x - gridGroup.rotation.x) * 0.06;

      cellControllers.forEach((ctrl) => {
        const { meta, cellRoot, refs } = ctrl;
        const isHovered = stateRef.current.hoveredCell === meta.id;
        const isSelected = stateRef.current.selectedCell === meta.id;
        const isInWave = stateRef.current.activeWaveSet.includes(meta.id);

        // Determine whether this cell's heavy ASMR loop is engaged
        const shouldAnimate =
          stateRef.current.animMode === 'all' ||
          isHovered ||
          isSelected ||
          (stateRef.current.animMode === 'wave' && isInWave);

        const targetBlend = shouldAnimate ? 1 : 0.12;
        ctrl.activityBlend += (targetBlend - ctrl.activityBlend) * 0.05;
        const b = ctrl.activityBlend;

        // Calculate CTA wave ripple + hover elevation
        const diagOrder = meta.row + meta.col;
        const timeSinceWave = nowSec - stateRef.current.wavePulseTime - diagOrder * 0.09;
        let waveBump = 0;
        if (timeSinceWave > 0 && timeSinceWave < 0.7) {
          waveBump = Math.sin((timeSinceWave / 0.7) * Math.PI) * 0.22;
        }

        const targetY = (isHovered || isSelected ? 0.14 : 0) + waveBump;
        ctrl.currentLift += (targetY - ctrl.currentLift) * 0.1;
        cellRoot.position.y = ctrl.currentLift;

        // Phase-shifted time per cell for organic studio choreography
        const t = elapsed * 1.15 + meta.id * 0.55;
        const pulse = smoothStepASMR((Math.sin(t * 1.6) + 1) * 0.5);

        // 1. DRILL ASMR MOTION
        if (meta.key === 'drill' && refs.drillBitGroup) {
          refs.drillBitGroup.rotation.y = elapsed * (2.6 * b);
          refs.drillBitGroup.position.y = -pulse * 0.24 * b;
          if (refs.outerCage) {
            refs.outerCage.rotation.y = -elapsed * (0.65 * b);
          }
        }

        // 2. GRINDER ASMR MOTION
        if (meta.key === 'grinder' && refs.discGroup) {
          refs.discGroup.rotation.y = elapsed * (5.2 * b);
          if (refs.pivotGroup) {
            refs.pivotGroup.rotation.z = 0.42 + Math.sin(t * 1.3) * 0.14 * b;
            refs.pivotGroup.rotation.x = 0.28 + Math.cos(t * 1.3) * 0.09 * b;
          }
        }

        // 3. EXCAVATOR ASMR HYDRAULIC SCOOP CYCLE
        if (meta.key === 'excavator' && refs.cabGroup) {
          refs.cabGroup.rotation.y = Math.sin(t * 0.85) * 0.28 * b;
          if (refs.boomGroup) {
            refs.boomGroup.rotation.z = 0.46 + Math.sin(t * 1.4) * 0.18 * b;
          }
          if (refs.stickGroup) {
            refs.stickGroup.rotation.z = -0.36 + Math.cos(t * 1.4) * 0.26 * b;
          }
          if (refs.bucketGroup) {
            refs.bucketGroup.rotation.z = 0.35 + Math.sin(t * 1.4 - 0.6) * 0.42 * b;
          }
        }

        // 4. ORBITAL SANDER PLANETARY MOTION
        if (meta.key === 'sander' && refs.sanderAssembly) {
          const orbitRadius = 0.11 * b;
          refs.sanderAssembly.position.x = Math.cos(elapsed * 4.2) * orbitRadius;
          refs.sanderAssembly.position.z = Math.sin(elapsed * 4.2) * orbitRadius;
          refs.sanderAssembly.rotation.y = Math.sin(t * 1.2) * 0.16 * b;
          if (refs.palmGrip) {
            refs.palmGrip.position.y = 0.72 - pulse * 0.05 * b;
          }
        }

        // 5. SAVE MONEY VAULT COIN PLUNGE & TURN
        if (meta.key === 'savemoney' && refs.coinGroup) {
          refs.coinGroup.rotation.y = Math.PI / 5 + elapsed * (1.25 * b);
          refs.coinGroup.position.y = 0.92 - pulse * 0.32 * b;
          if (refs.innerCushion) {
            refs.innerCushion.scale.y = 1 - pulse * 0.18 * b;
          }
        }

        // 6. MITRE SAW 45° CHOP CYCLE
        if (meta.key === 'mitresaw' && refs.chopGroup) {
          refs.chopGroup.rotation.x = pulse * 0.36 * b;
          if (refs.bladeGroup) {
            refs.bladeGroup.rotation.x = -elapsed * (6.5 * b);
          }
        }

        // 7. MOBILE ACCESS GLASS FLOAT & MAGNETIC UI BADGES
        if (meta.key === 'mobile' && refs.phoneGroup) {
          refs.phoneGroup.position.y = 0.28 + Math.sin(t * 1.5) * 0.07 * b;
          refs.phoneGroup.rotation.z = -0.12 + Math.cos(t * 1.2) * 0.05 * b;
          if (refs.badge1) {
            refs.badge1.position.y = 0.56 + Math.sin(t * 2.0) * 0.08 * b;
            refs.badge1.position.x = -0.22 + pulse * 0.06 * b;
          }
          if (refs.badge2) {
            refs.badge2.position.y = 0.44 + Math.cos(t * 1.8) * 0.07 * b;
          }
          if (refs.badge3) {
            refs.badge3.position.y = 0.14 + Math.sin(t * 2.2 + 1) * 0.05 * b;
          }
        }

        // 8. ACCOUNTING LINEAR RAIL HYDRAULIC SLIDE
        if (meta.key === 'accounting' && refs.block1) {
          const slideA = Math.sin(t * 1.35) * 0.22 * b;
          const slideB = Math.cos(t * 1.35) * 0.18 * b;
          refs.block1.position.z = 0.56 + slideA;
          refs.block2.position.z = -slideB * 0.65;
          refs.block3.position.z = -0.56 - slideA * 0.85;
        }

        // 9. CASH HARMONIC PEACOCK FAN WAVE
        if (meta.key === 'cash' && refs.bills) {
          const fanSpread = (0.45 + pulse * 0.55) * b + (1 - b) * 0.55;
          refs.bills.forEach((bill: THREE.Object3D, idx: number) => {
            const centered = idx - 3; // -3 to +3
            bill.rotation.z = -centered * 0.21 * fanSpread;
            bill.rotation.x = centered * 0.04 * fanSpread;
          });
        }
      });

      renderer.render(scene, camera);
    }

    // First frame always renders (static scene when motion is reduced).
    animate();
    start();
    if (reduceMotion) renderer.render(scene, camera);

    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
      domElem.removeEventListener('pointermove', handlePointerMove);
      domElem.removeEventListener('pointerleave', handlePointerLeave);
      domElem.removeEventListener('click', handleClick);
      envMap.dispose();
      renderer.dispose();
    };
  }, []);


  return <div ref={mountRef} className="h-full w-full" aria-hidden="true" />;
}
