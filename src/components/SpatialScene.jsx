import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Exact geographic coordinates [lat, lon]
const NODE_COORDINATES = {
  india: { lat: 20.5937, lon: 78.9629, name: 'India (8,470)' },
  uae: { lat: 23.4241, lon: 53.8478, name: 'UAE (1,284)' },
  usa: { lat: 37.0902, lon: -95.7129, name: 'USA (642)' },
  uk: { lat: 55.3781, lon: -3.4360, name: 'UK (526)' },
  singapore: { lat: 1.3521, lon: 103.8198, name: 'Singapore (420)' },
  australia: { lat: -25.2744, lon: 133.7751, name: 'Australia (290)' },
  canada: { lat: 56.1304, lon: -106.3468, name: 'Canada (310)' },
  japan: { lat: 36.2048, lon: 138.2529, name: 'Tokyo (380)' }
};

function latLonToVector3(lat, lon, radius = 5.0) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

export default function SpatialScene({ activeChapter = '00', activeCountry = 'india', mousePos = { x: 0, y: 0 }, theme = 'dark' }) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    activeChapter,
    activeCountry,
    mousePos,
    theme
  });

  stateRef.current = { activeChapter, activeCountry, mousePos, theme };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const isLightInitial = stateRef.current.theme === 'light';
    scene.fog = new THREE.FogExp2(isLightInitial ? 0xf1f4f9 : 0x07090d, 0.022);

    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 16);

    // ==========================================
    // LIGHTING: Realistic Sun Vector
    // ==========================================
    const sunDirection = new THREE.Vector3(12, 6, 14).normalize();

    const ambientLight = new THREE.AmbientLight(0x0e1320, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffffff, 2.8);
    sunLight.position.copy(sunDirection.clone().multiplyScalar(50));
    scene.add(sunLight);

    // Subtle blue fill light from deep space
    const fillLight = new THREE.DirectionalLight(0x1a2942, 0.8);
    fillLight.position.set(-15, -10, -20);
    scene.add(fillLight);

    // Warm architectural light for campus/horizon
    const warmLight = new THREE.PointLight(0xddbb7a, 1.5, 30);
    warmLight.position.set(0, -4, 8);
    scene.add(warmLight);

    // ==========================================
    // 1. DEEP SPACE: Subtle Stars (Not distracting)
    // ==========================================
    const starCount = 800;
    const starGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      starPositions[i * 3] = (Math.random() - 0.5) * 90;
      starPositions[i * 3 + 1] = (Math.random() - 0.5) * 90;
      starPositions[i * 3 + 2] = (Math.random() - 0.5) * 90;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x94a3b8,
      size: 0.12,
      transparent: true,
      opacity: 0.4
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ==========================================
    // 2. PHOTOREALISTIC 3D PLANET EARTH
    // ==========================================
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    const globeRadius = 5.0;
    const textureLoader = new THREE.TextureLoader();

    // Load authentic NASA textures
    const dayMap = textureLoader.load('/textures/planets/earth_day_2048.jpg');
    const lightsMap = textureLoader.load('/textures/planets/earth_lights_2048.png');
    const specularMap = textureLoader.load('/textures/planets/earth_specular_2048.jpg');
    const normalMap = textureLoader.load('/textures/planets/earth_normal_2048.jpg');
    const cloudsMap = textureLoader.load('/textures/planets/earth_clouds_1024.png');

    dayMap.colorSpace = THREE.SRGBColorSpace;
    lightsMap.colorSpace = THREE.SRGBColorSpace;

    // Custom Realistic Earth Shader: Day/Night Terminator + Photographed City Lights + Specular Ocean Reflection
    const earthCustomMat = new THREE.ShaderMaterial({
      uniforms: {
        uDayMap: { value: dayMap },
        uNightMap: { value: lightsMap },
        uSpecularMap: { value: specularMap },
        uNormalMap: { value: normalMap },
        uSunDirection: { value: sunDirection },
        uAtmosphereColor: { value: new THREE.Color(0x60a5fa) }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vUv = uv;
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform sampler2D uDayMap;
        uniform sampler2D uNightMap;
        uniform sampler2D uSpecularMap;
        uniform sampler2D uNormalMap;
        uniform vec3 uSunDirection;
        uniform vec3 uAtmosphereColor;

        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          vec3 sunDir = normalize(uSunDirection);
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);

          // Sunlight incidence
          float NdotL = dot(normal, sunDir);

          // Soft realistic atmospheric penumbra at terminator
          float dayFactor = smoothstep(-0.15, 0.25, NdotL);
          float nightFactor = 1.0 - dayFactor;

          // Day color (landmasses & deep blue oceans)
          vec4 dayColor = texture2D(uDayMap, vUv);

          // Real photographed night city lights
          vec4 nightColor = texture2D(uNightMap, vUv);
          // Realistic golden-amber warmth on city clusters
          vec3 warmNightLights = nightColor.rgb * vec3(1.3, 1.1, 0.85);

          // Specular reflection on water
          float specularMask = texture2D(uSpecularMap, vUv).r;
          vec3 halfVec = normalize(sunDir + viewDir);
          float specIntensity = pow(max(dot(normal, halfVec), 0.0), 32.0) * specularMask * 1.4;
          vec3 sunSpec = vec3(1.0, 0.95, 0.85) * specIntensity * dayFactor;

          // Thin Rayleigh atmospheric limb glow (Fresnel)
          float fresnel = 1.0 - max(dot(normal, viewDir), 0.0);
          float limbGlow = pow(fresnel, 3.5) * 0.7 * dayFactor;

          // Final composite: physically believable Earth
          vec3 finalColor = (dayColor.rgb * (dayFactor * 1.1 + 0.04)) + (warmNightLights * nightFactor * 1.6) + sunSpec + (uAtmosphereColor * limbGlow);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `
    });

    const earthGeo = new THREE.SphereGeometry(globeRadius, 64, 64);
    const earthMesh = new THREE.Mesh(earthGeo, earthCustomMat);
    globeGroup.add(earthMesh);

    // ==========================================
    // 2B. REALISTIC CLOUD LAYER
    // ==========================================
    const cloudsGeo = new THREE.SphereGeometry(globeRadius * 1.009, 64, 64);
    const cloudsMat = new THREE.MeshStandardMaterial({
      map: cloudsMap,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      roughness: 0.9,
      metalness: 0.1
    });
    const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
    globeGroup.add(cloudsMesh);

    // ==========================================
    // 2C. SUBTLE THIN ATMOSPHERIC SCATTERING SHELL
    // ==========================================
    const atmosphereGeo = new THREE.SphereGeometry(globeRadius * 1.018, 64, 64);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vec3 viewDir = normalize(-vPosition);
          // Very thin, photorealistic blue-white limb
          float intensity = pow(0.68 - dot(vNormal, viewDir), 2.6);
          intensity = clamp(intensity, 0.0, 1.0);
          vec3 atmosColor = mix(vec3(0.38, 0.68, 1.0), vec3(0.85, 0.95, 1.0), intensity);
          gl_FragColor = vec4(atmosColor, intensity * 0.75);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    globeGroup.add(atmosphereMesh);

    // ==========================================
    // 3. AIVRM RESTRAINED DIGITAL NETWORK OVERLAY
    // (Sitting subtly above the real Earth)
    // ==========================================
    const networkOverlayGroup = new THREE.Group();
    globeGroup.add(networkOverlayGroup);

    const pinPoints = {};
    Object.entries(NODE_COORDINATES).forEach(([key, info]) => {
      const pos = latLonToVector3(info.lat, info.lon, globeRadius * 1.018);
      pinPoints[key] = pos;

      // Small, elegant institutional node pin
      const markerGeo = new THREE.SphereGeometry(0.07, 16, 16);
      const markerMat = new THREE.MeshBasicMaterial({ color: 0x6ce7ff });
      const markerMesh = new THREE.Mesh(markerGeo, markerMat);
      markerMesh.position.copy(pos);
      networkOverlayGroup.add(markerMesh);

      // Restrained beacon ring
      const ringGeo = new THREE.RingGeometry(0.09, 0.14, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0x4c8dff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.75
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.001));
      ringMesh.lookAt(pos.clone().multiplyScalar(2));
      networkOverlayGroup.add(ringMesh);
    });

    // Elegant Great Circle data arcs
    const arcGroup = new THREE.Group();
    networkOverlayGroup.add(arcGroup);

    const hubs = ['uae', 'usa', 'uk', 'singapore', 'australia', 'japan', 'canada'];
    const arcCurves = [];

    hubs.forEach((hubKey) => {
      const start = pinPoints.india;
      const end = pinPoints[hubKey];
      if (!start || !end) return;

      const mid = start.clone().add(end).multiplyScalar(0.5);
      const dist = start.distanceTo(end);
      mid.normalize().multiplyScalar(globeRadius + dist * 0.22);

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      arcCurves.push(curve);
      const points = curve.getPoints(50);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(points);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0x4c8dff,
        transparent: true,
        opacity: 0.45
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      arcGroup.add(arcLine);
    });

    // Restrained pulse particles along arcs
    const arcParticlesCount = 50;
    const arcParticlesGeo = new THREE.BufferGeometry();
    const arcPartPositions = new Float32Array(arcParticlesCount * 3);
    arcParticlesGeo.setAttribute('position', new THREE.BufferAttribute(arcPartPositions, 3));
    const arcParticlesMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.11,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.95
    });
    const arcParticlesMesh = new THREE.Points(arcParticlesGeo, arcParticlesMat);
    arcGroup.add(arcParticlesMesh);

    // ==========================================
    // 4. 3D SPATIAL DATA GRAPH LANDSCAPE
    // (Financial / Architectural Data Sculpture behind & below Earth)
    // No wireframes, no nets, no grids, no cyberpunk mesh
    // ==========================================
    const dataLandscapeGroup = new THREE.Group();
    scene.add(dataLandscapeGroup);

    // --- 4A. 3D Volumetric Architectural Columns (Layered Analytical Bars) ---
    const columnsGroup = new THREE.Group();
    dataLandscapeGroup.add(columnsGroup);

    const columnRows = 5;
    const columnCols = 9;
    const totalColumns = columnRows * columnCols;
    const columnMeshes = [];
    const columnCaps = [];
    const columnBasePositions = [];
    const columnBaseHeights = [];

    const columnBoxGeo = new THREE.BoxGeometry(0.72, 1.0, 0.72);
    // Translate geometry so origin is at the bottom of the box
    columnBoxGeo.translate(0, 0.5, 0);

    const capBoxGeo = new THREE.BoxGeometry(0.76, 0.08, 0.76);
    capBoxGeo.translate(0, 0.04, 0);

    const baseElevationY = -4.2;

    for (let r = 0; r < columnRows; r++) {
      for (let c = 0; c < columnCols; c++) {
        const x = (c - (columnCols - 1) / 2) * 2.5;
        const z = -1.5 - r * 2.4;
        const distFromCenter = Math.sqrt(x * x + (z + 6) * (z + 6));
        
        // Base rhythmic height curve
        const baseH = Math.max(0.6, 2.8 - distFromCenter * 0.15 + Math.sin(c * 0.8) * 0.5);

        // Volumetric column material: Matte graphite / translucent smoked glass
        const colMat = new THREE.MeshStandardMaterial({
          color: isLightInitial ? 0xe2e8f0 : 0x0f1522,
          roughness: 0.22,
          metalness: 0.55,
          transparent: true,
          opacity: 0.72
        });
        const colMesh = new THREE.Mesh(columnBoxGeo, colMat);
        colMesh.position.set(x, baseElevationY, z);
        colMesh.scale.set(1, baseH, 1);
        columnsGroup.add(colMesh);
        columnMeshes.push(colMesh);

        // Architectural Illuminated Cap Plate (soft ivory, muted indigo, cool cyan)
        const capColors = [0x4c8dff, 0x6ce7ff, 0xddbb7a, 0x7c74db, 0x385a8a];
        const capColor = capColors[(r * columnCols + c) % capColors.length];
        const capMat = new THREE.MeshStandardMaterial({
          color: capColor,
          emissive: capColor,
          emissiveIntensity: 0.35,
          roughness: 0.2,
          metalness: 0.8
        });
        const capMesh = new THREE.Mesh(capBoxGeo, capMat);
        capMesh.position.set(x, baseElevationY + baseH, z);
        columnsGroup.add(capMesh);
        columnCaps.push(capMesh);

        columnBasePositions.push(new THREE.Vector3(x, baseElevationY, z));
        columnBaseHeights.push(baseH);
      }
    }

    // --- 4B. Multi-Depth Flowing 3D Data Ribbons (3 Spatial Z-Layers) ---
    const ribbonsGroup = new THREE.Group();
    dataLandscapeGroup.add(ribbonsGroup);

    // Layer 1: Foreground / Mid Data Curve (Z = 0.5) - Student / Applicant Velocity
    const curvePoints1 = [
      new THREE.Vector3(-14, -2.5, 1.2),
      new THREE.Vector3(-9, -0.8, 0.8),
      new THREE.Vector3(-4, 0.5, 0.2),
      new THREE.Vector3(1, -1.2, 0.6),
      new THREE.Vector3(6, 1.2, 0.4),
      new THREE.Vector3(11, -0.4, 1.0),
      new THREE.Vector3(15, -2.2, 1.5)
    ];
    const curve1 = new THREE.CatmullRomCurve3(curvePoints1);
    const tubeGeo1 = new THREE.TubeGeometry(curve1, 90, 0.12, 16, false);
    const tubeMat1 = new THREE.MeshStandardMaterial({
      color: 0x4c8dff,
      emissive: 0x244275,
      emissiveIntensity: 0.45,
      roughness: 0.25,
      metalness: 0.6,
      transparent: true,
      opacity: 0.85
    });
    const ribbon1 = new THREE.Mesh(tubeGeo1, tubeMat1);
    ribbonsGroup.add(ribbon1);

    // Layer 2: Mid-Depth Curve (Z = -4.5) - Institutional Enrollment & Retention Curve
    const curvePoints2 = [
      new THREE.Vector3(-15, -1.8, -4.5),
      new THREE.Vector3(-10, 0.8, -4.2),
      new THREE.Vector3(-5, -0.4, -4.8),
      new THREE.Vector3(0, 1.6, -4.5),
      new THREE.Vector3(5, -0.2, -4.0),
      new THREE.Vector3(10, 1.4, -4.6),
      new THREE.Vector3(15, -1.5, -4.2)
    ];
    const curve2 = new THREE.CatmullRomCurve3(curvePoints2);
    const tubeGeo2 = new THREE.TubeGeometry(curve2, 90, 0.14, 16, false);
    const tubeMat2 = new THREE.MeshStandardMaterial({
      color: 0x6ce7ff,
      emissive: 0x1d596b,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.5,
      transparent: true,
      opacity: 0.75
    });
    const ribbon2 = new THREE.Mesh(tubeGeo2, tubeMat2);
    ribbonsGroup.add(ribbon2);

    // Layer 3: Deep Background Curve (Z = -10.0) - Macroeconomic Global Education Index
    const curvePoints3 = [
      new THREE.Vector3(-16, -3.2, -10.0),
      new THREE.Vector3(-11, -1.2, -9.5),
      new THREE.Vector3(-6, 1.8, -10.5),
      new THREE.Vector3(0, 0.2, -9.8),
      new THREE.Vector3(6, 2.4, -10.2),
      new THREE.Vector3(12, -0.6, -9.6),
      new THREE.Vector3(16, -2.8, -10.4)
    ];
    const curve3 = new THREE.CatmullRomCurve3(curvePoints3);
    const tubeGeo3 = new THREE.TubeGeometry(curve3, 90, 0.16, 16, false);
    const tubeMat3 = new THREE.MeshStandardMaterial({
      color: 0x7c74db,
      emissive: 0x2a2559,
      emissiveIntensity: 0.3,
      roughness: 0.35,
      metalness: 0.5,
      transparent: true,
      opacity: 0.6
    });
    const ribbon3 = new THREE.Mesh(tubeGeo3, tubeMat3);
    ribbonsGroup.add(ribbon3);

    // Floating Crystalline Data Nodes at key peaks of ribbons
    const ribbonNodes = [];
    const ribbonPeakPoints = [
      curvePoints1[2], curvePoints1[4],
      curvePoints2[1], curvePoints2[3], curvePoints2[5],
      curvePoints3[2], curvePoints3[4]
    ];

    ribbonPeakPoints.forEach((pt, idx) => {
      const nodeGeo = new THREE.OctahedronGeometry(0.24, 0);
      const nodeColor = idx % 2 === 0 ? 0xddbb7a : 0x6ce7ff;
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColor,
        emissive: nodeColor,
        emissiveIntensity: 0.7,
        roughness: 0.1,
        metalness: 0.8
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pt);
      ribbonsGroup.add(nodeMesh);
      ribbonNodes.push(nodeMesh);

      // Subtle vertical datum plumb-line dropping down towards columns
      const plumbGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(pt.x, pt.y, pt.z),
        new THREE.Vector3(pt.x, baseElevationY + 1.2, pt.z)
      ]);
      const plumbMat = new THREE.LineBasicMaterial({
        color: nodeColor,
        transparent: true,
        opacity: 0.35
      });
      const plumbLine = new THREE.Line(plumbGeo, plumbMat);
      ribbonsGroup.add(plumbLine);
    });

    // Elegant Gliding Pulse Data Particles on Ribbons
    const ribbonPulseCount = 40;
    const ribbonPulseGeo = new THREE.BufferGeometry();
    const ribbonPulsePos = new Float32Array(ribbonPulseCount * 3);
    ribbonPulseGeo.setAttribute('position', new THREE.BufferAttribute(ribbonPulsePos, 3));
    const ribbonPulseMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.18,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.95
    });
    const ribbonPulseMesh = new THREE.Points(ribbonPulseGeo, ribbonPulseMat);
    ribbonsGroup.add(ribbonPulseMesh);

    // --- 4C. Translucent Contour Data Horizon (Smooth gradient, no wireframe) ---
    const contourPlaneGeo = new THREE.PlaneGeometry(38, 26, 32, 32);
    contourPlaneGeo.rotateX(-Math.PI / 2);
    
    // Displace vertices gently with harmonic analytical elevation
    const planePosAttr = contourPlaneGeo.attributes.position;
    for (let i = 0; i < planePosAttr.count; i++) {
      const vx = planePosAttr.getX(i);
      const vz = planePosAttr.getZ(i);
      const elevation = Math.sin(vx * 0.28) * Math.cos(vz * 0.32) * 0.45;
      planePosAttr.setY(i, elevation);
    }
    contourPlaneGeo.computeVertexNormals();

    const contourPlaneMat = new THREE.MeshStandardMaterial({
      color: isLightInitial ? 0xedf2f7 : 0x090d15,
      roughness: 0.4,
      metalness: 0.3,
      transparent: true,
      opacity: 0.6
    });
    const contourPlane = new THREE.Mesh(contourPlaneGeo, contourPlaneMat);
    contourPlane.position.set(0, baseElevationY - 0.1, -6);
    dataLandscapeGroup.add(contourPlane);

    // ==========================================
    // ANIMATION & REAL-TIME ORCHESTRATION LOOP
    // ==========================================
    let animationFrameId;
    let clock = new THREE.Clock();
    let currentLookAt = new THREE.Vector3(0, 0, 0);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      const { activeChapter, activeCountry, mousePos, theme } = stateRef.current;
      const isLight = theme === 'light';

      // Very slow, calm realistic rotation
      // Real Earth: slow continuous movement
      earthMesh.rotation.y = elapsedTime * 0.012;
      // Clouds move at a slightly different speed for living atmospheric realism
      cloudsMesh.rotation.y = elapsedTime * 0.014;

      // In Chapter 01, orient toward active country smoothly
      if (activeChapter === '01') {
        const targetCoords = NODE_COORDINATES[activeCountry] || NODE_COORDINATES.india;
        const targetY = -((targetCoords.lon + 90) * Math.PI) / 180;
        const targetX = ((targetCoords.lat) * Math.PI) / 180;
        globeGroup.rotation.y += (targetY - globeGroup.rotation.y) * 0.04;
        globeGroup.rotation.x += (targetX * 0.3 - globeGroup.rotation.x) * 0.04;
      } else {
        globeGroup.rotation.x = THREE.MathUtils.lerp(globeGroup.rotation.x, 0, 0.04);
      }


      // Dynamic theme adaptation
      const targetFogColor = activeChapter === '08'
        ? (isLight ? new THREE.Color(0xe5e7eb) : new THREE.Color(0x07090d))
        : (isLight ? new THREE.Color(0xf1f4f9) : new THREE.Color(0x07090d));
      scene.fog.color.lerp(targetFogColor, 0.05);

      const targetAmbColor = isLight ? new THREE.Color(0xffffff) : new THREE.Color(0x0e1320);
      ambientLight.color.lerp(targetAmbColor, 0.05);
      ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, isLight ? 1.8 : 0.8, 0.05);

      // Parallax mouse nudge (calm, elegant, architectural depth)
      const targetMouseX = (mousePos.x || 0) * 0.4;
      const targetMouseY = -(mousePos.y || 0) * 0.4;

      starField.rotation.y = elapsedTime * 0.006;
      dataLandscapeGroup.rotation.y = targetMouseX * 0.02;

      // Arc pulse particles along Great Circle data arcs
      const arcPositionsAttr = arcParticlesMesh.geometry.attributes.position;
      if (arcCurves.length > 0) {
        for (let i = 0; i < arcParticlesCount; i++) {
          const curveIdx = i % arcCurves.length;
          const curve = arcCurves[curveIdx];
          const t = (elapsedTime * 0.18 + i / arcParticlesCount) % 1.0;
          const pt = curve.getPoint(t);
          arcPositionsAttr.setXYZ(i, pt.x, pt.y, pt.z);
        }
        arcPositionsAttr.needsUpdate = true;
      }

      // Dynamic Gliding Pulse Data along 3D Ribbons
      const ribbonPulseAttr = ribbonPulseMesh.geometry.attributes.position;
      for (let i = 0; i < ribbonPulseCount; i++) {
        let activeRibbonCurve = curve1;
        if (i % 3 === 1) activeRibbonCurve = curve2;
        if (i % 3 === 2) activeRibbonCurve = curve3;
        const speed = activeChapter === '02' ? 0.38 : 0.16;
        const t = (elapsedTime * speed + i / ribbonPulseCount) % 1.0;
        const pt = activeRibbonCurve.getPoint(t);
        ribbonPulseAttr.setXYZ(i, pt.x, pt.y, pt.z);
      }
      ribbonPulseAttr.needsUpdate = true;

      // Subtle dynamic float on ribbon crystalline nodes
      ribbonNodes.forEach((node, idx) => {
        node.rotation.y = elapsedTime * 0.6 + idx;
        node.rotation.x = Math.sin(elapsedTime * 0.4 + idx) * 0.3;
      });

      // --- STORY-DRIVEN 3D DATA COLUMNS MORPHING ---
      const targetColColor = isLight ? new THREE.Color(0xe2e8f0) : new THREE.Color(0x0f1522);
      const targetContourColor = isLight ? new THREE.Color(0xedf2f7) : new THREE.Color(0x090d15);
      contourPlane.material.color.lerp(targetContourColor, 0.05);

      for (let i = 0; i < totalColumns; i++) {
        const colMesh = columnMeshes[i];
        const capMesh = columnCaps[i];
        const r = Math.floor(i / columnCols);
        const c = i % columnCols;
        const baseH = columnBaseHeights[i];

        let targetH = baseH;

        switch (activeChapter) {
          case '00': // Enter: Calm architectural resting field
            targetH = baseH * 0.8 + Math.sin(elapsedTime * 0.8 + c * 0.4) * 0.2;
            break;

          case '01': // Ecosystem: Calm, Earth dominant, subtle ambient breath
            targetH = baseH * 0.85 + Math.sin(elapsedTime * 0.6 + r * 0.5) * 0.25;
            break;

          case '02': // Flow: Dynamic traveling wave streams across columns
            targetH = Math.max(0.5, Math.sin(c * 0.7 - elapsedTime * 2.5) * 1.8 + 2.2);
            break;

          case '03': // People: Regional student cohort metric towers rise
            if (c >= 2 && c <= 6) {
              targetH = 3.8 + Math.sin(r * 1.2) * 1.5;
            } else {
              targetH = 1.0;
            }
            break;

          case '04': // Institution: Architectural campus department blocks
            // Engineering (c=1,2), Business (c=3,4), Medicine (c=5,6), Design (c=7)
            if (c === 1 || c === 2) targetH = 4.8 + (r % 2) * 1.0;
            else if (c === 3 || c === 4) targetH = 4.2 + (r % 2) * 0.8;
            else if (c === 5 || c === 6) targetH = 5.6 + (r % 2) * 0.9;
            else if (c === 7) targetH = 3.6 + (r % 2) * 0.6;
            else targetH = 1.2;
            break;

          case '05': // Intelligence: High-dimensional analytical landscape
            targetH = Math.max(0.6, 2.8 + Math.sin(c * 0.8 + elapsedTime * 0.4) * 1.8 + Math.cos(r * 0.9) * 1.2);
            break;

          case '06': // Application: Focal student dossier - background fades, focus remains
            if (c === 5 && r === 2) {
              targetH = 5.2; // Focal student application column
            } else {
              targetH = 0.4; // Calm, non-competing backdrop
            }
            break;

          case '07': // Network: Global grand harmonic elevation as camera pulls back
            targetH = baseH * 1.35 + Math.sin(c * 0.5) * 0.6;
            break;

          case '08': // Future: Serene horizon, graph gently recedes into dawn
            targetH = 0.35 + Math.sin(elapsedTime * 0.5 + c * 0.2) * 0.08;
            break;

          default:
            targetH = baseH;
            break;
        }

        // Smooth height interpolation
        const curScaleY = colMesh.scale.y;
        const newScaleY = THREE.MathUtils.lerp(curScaleY, targetH, 0.05);
        colMesh.scale.y = newScaleY;
        capMesh.position.y = baseElevationY + newScaleY;

        colMesh.material.color.lerp(targetColColor, 0.05);
      }

      // Camera & Spatial Choreography per chapter
      let targetCamPos = new THREE.Vector3(0, 0, 16);
      let targetLook = new THREE.Vector3(0, 0, 0);
      let targetGlobePos = new THREE.Vector3(0, 0, 0);
      let targetGlobeScale = 1.0;

      switch (activeChapter) {
        case '00': // Enter: Earth distant, massive, calm with spatial data landscape below
          targetGlobePos.set(2.6, 1.4, -1);
          targetGlobeScale = 1.1;
          targetCamPos.set(targetMouseX * 0.5, 0.5 + targetMouseY * 0.4, 15);
          targetLook.set(1.2, 0.3, 0);
          dataLandscapeGroup.position.set(0, -0.6, 0);
          break;

        case '01': // Ecosystem: Full Earth dominant, connecting to selected country
          targetGlobePos.set(2.4, 0.2, 0);
          targetGlobeScale = 1.25;
          targetCamPos.set(targetMouseX * 0.6, targetMouseY * 0.5, 13.5);
          targetLook.set(1.0, 0, 0);
          dataLandscapeGroup.position.set(0, -1.2, 0);
          break;

        case '02': // Flow: Camera descends slightly to showcase 3D data ribbons and stream columns
          targetGlobePos.set(4.5, 1.8, -4);
          targetGlobeScale = 0.9;
          targetCamPos.set(targetMouseX * 0.7, 0.8 + targetMouseY * 0.5, 12);
          targetLook.set(0.5, -0.2, 0);
          dataLandscapeGroup.position.set(0, 0, 0);
          break;

        case '03': // People: Atmospheric student cohorts with ivory data towers
          targetGlobePos.set(-4.5, -0.8, -6);
          targetGlobeScale = 0.95;
          targetCamPos.set(targetMouseX * 0.4, 0.2 + targetMouseY * 0.4, 13);
          targetLook.set(-0.5, -0.2, 0);
          dataLandscapeGroup.position.set(0, 0.2, 0);
          break;

        case '04': // Institution: Architectural campus department columns become focal
          targetGlobePos.set(0, 4.8, -12);
          targetGlobeScale = 0.75;
          targetCamPos.set(0 + targetMouseX * 1.2, 4.2 + targetMouseY * 0.7, 13);
          targetLook.set(0, -1.2, -4);
          dataLandscapeGroup.position.set(0, 0.6, 0);
          break;

        case '05': // Intelligence: Grand spatial intelligence landscape with 3 ribbon depths
          targetGlobePos.set(5.2, -1.6, -5);
          targetGlobeScale = 0.92;
          targetCamPos.set(targetMouseX * 0.5, 1.0 + targetMouseY * 0.4, 14);
          targetLook.set(0, 0, -2);
          dataLandscapeGroup.position.set(0, 0.4, 0);
          break;

        case '06': // Application: Focal dossier, surrounding data dims
          targetGlobePos.set(4.0, 1.6, -4);
          targetGlobeScale = 0.85;
          targetCamPos.set(targetMouseX * 0.4, 0.4 + targetMouseY * 0.4, 13);
          targetLook.set(0.5, 0, 0);
          dataLandscapeGroup.position.set(0, 0, 0);
          break;

        case '07': // Network: Camera pulls back to reveal entire Earth + Global Data Landscape
          targetGlobePos.set(0, 1.2, -3);
          targetGlobeScale = 1.4;
          targetCamPos.set(targetMouseX * 0.8, 2.0 + targetMouseY * 0.8, 18);
          targetLook.set(0, 0.8, 0);
          dataLandscapeGroup.position.set(0, -1.8, 0);
          break;

        case '08': // Future: Serene orbital dawn, graph recedes softly
          targetGlobePos.set(0, 0.8, -10);
          targetGlobeScale = 0.8;
          targetCamPos.set(targetMouseX * 0.5, 0.2 + targetMouseY * 0.4, 12);
          targetLook.set(0, 0.4, -8);
          dataLandscapeGroup.position.set(0, -3.2, 0);
          break;

        default:
          break;
      }

      camera.position.lerp(targetCamPos, 0.04);
      currentLookAt.lerp(targetLook, 0.04);
      camera.lookAt(currentLookAt);

      globeGroup.position.lerp(targetGlobePos, 0.04);
      const curScale = globeGroup.scale.x;
      const newScale = THREE.MathUtils.lerp(curScale, targetGlobeScale, 0.04);
      globeGroup.scale.set(newScale, newScale, newScale);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="spatial-canvas-container"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  );
}
