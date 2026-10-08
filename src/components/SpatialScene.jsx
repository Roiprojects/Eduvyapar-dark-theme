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
    // 4. CHAPTER 02 — APPLICATION FLOW PIPELINE
    // ==========================================
    const flowGroup = new THREE.Group();
    flowGroup.position.set(0, 0, -2);
    flowGroup.visible = false;
    scene.add(flowGroup);

    const flowNodePoints = [
      new THREE.Vector3(-8, 1.2, 0),
      new THREE.Vector3(-4, -0.6, 1.5),
      new THREE.Vector3(0, 1.4, -0.5),
      new THREE.Vector3(4, -0.4, 1.8),
      new THREE.Vector3(8, 0.8, 0)
    ];

    const flowCurve = new THREE.CatmullRomCurve3(flowNodePoints);
    const flowTubeGeo = new THREE.TubeGeometry(flowCurve, 100, 0.08, 12, false);
    const flowTubeMat = new THREE.MeshBasicMaterial({
      color: 0x4c8dff,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const flowTube = new THREE.Mesh(flowTubeGeo, flowTubeMat);
    flowGroup.add(flowTube);

    flowNodePoints.forEach((pt, index) => {
      const nodeGeo = new THREE.SphereGeometry(0.42, 24, 24);
      const nodeColors = [0x685cff, 0x4c8dff, 0x6ce7ff, 0xddbb7a, 0x48d597];
      const nodeMat = new THREE.MeshStandardMaterial({
        color: nodeColors[index % nodeColors.length],
        emissive: nodeColors[index % nodeColors.length],
        emissiveIntensity: 0.6,
        roughness: 0.2
      });
      const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
      nodeMesh.position.copy(pt);
      flowGroup.add(nodeMesh);

      const ringGeo = new THREE.RingGeometry(0.55, 0.65, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: nodeColors[index % nodeColors.length],
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pt);
      flowGroup.add(ring);
    });

    const pulseCount = 35;
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulseGeo = new THREE.BufferGeometry();
    pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
    const pulseMat = new THREE.PointsMaterial({
      color: 0x6ce7ff,
      size: 0.22,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.95
    });
    const pulseMesh = new THREE.Points(pulseGeo, pulseMat);
    flowGroup.add(pulseMesh);

    // ==========================================
    // 5. CHAPTER 04 — ARCHITECTURAL CAMPUS
    // ==========================================
    const campusGroup = new THREE.Group();
    campusGroup.position.set(0, -3.5, 0);
    campusGroup.visible = false;
    scene.add(campusGroup);

    const groundGrid = new THREE.GridHelper(30, 40, 0x685cff, 0x121821);
    groundGrid.position.y = 0;
    campusGroup.add(groundGrid);

    for (let r = 2; r <= 10; r += 2.5) {
      const circleGeo = new THREE.RingGeometry(r - 0.04, r + 0.04, 64);
      const circleMat = new THREE.MeshBasicMaterial({
        color: 0x4c8dff,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.15
      });
      const circle = new THREE.Mesh(circleGeo, circleMat);
      circle.rotation.x = Math.PI / 2;
      circle.position.y = 0.02;
      campusGroup.add(circle);
    }

    const buildingGroup = new THREE.Group();
    campusGroup.add(buildingGroup);

    const buildingMeshes = [];
    const buildingCoords = [
      { x: 0, z: 0, w: 3.5, d: 3.5, h: 2.2, color: 0x685cff },
      { x: -4.5, z: -2, w: 2.8, d: 2.0, h: 3.8, color: 0x4c8dff },
      { x: 4.8, z: -1.5, w: 2.5, d: 2.5, h: 3.2, color: 0x6ce7ff },
      { x: -3.8, z: 3.5, w: 2.4, d: 2.8, h: 1.8, color: 0xddbb7a },
      { x: 4.2, z: 3.8, w: 3.0, d: 2.0, h: 2.6, color: 0x48d597 },
      { x: -7.5, z: 1.0, w: 2.0, d: 2.0, h: 1.5, color: 0x685cff },
      { x: 7.2, z: 0.5, w: 2.0, d: 2.0, h: 2.0, color: 0x4c8dff }
    ];

    buildingCoords.forEach((b) => {
      const boxGeo = new THREE.BoxGeometry(b.w, b.h, b.d);
      const boxMat = new THREE.MeshStandardMaterial({
        color: 0x0d1424,
        roughness: 0.1,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75
      });
      const box = new THREE.Mesh(boxGeo, boxMat);
      box.position.set(b.x, b.h / 2, b.z);
      buildingGroup.add(box);
      buildingMeshes.push(box);

      const edgeGeo = new THREE.EdgesGeometry(boxGeo);
      const edgeMat = new THREE.LineBasicMaterial({
        color: b.color,
        transparent: true,
        opacity: 0.75
      });
      const edges = new THREE.LineSegments(edgeGeo, edgeMat);
      edges.position.copy(box.position);
      buildingGroup.add(edges);

      const beamGeo = new THREE.CylinderGeometry(0.04, 0.25, 4.0, 16);
      const beamMat = new THREE.MeshBasicMaterial({
        color: b.color,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(b.x, b.h + 2.0, b.z);
      buildingGroup.add(beam);
    });

    // ==========================================
    // 6. CHAPTER 08 — CINEMATIC DAWN HORIZON
    // ==========================================
    const horizonGroup = new THREE.Group();
    horizonGroup.visible = false;
    scene.add(horizonGroup);

    const archShape = new THREE.Group();
    for (let i = 0; i < 6; i++) {
      const scale = 1 + i * 0.4;
      const archGeo = new THREE.TorusGeometry(3.5 * scale, 0.05, 16, 80, Math.PI);
      const archMat = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0xddbb7a : 0x685cff,
        transparent: true,
        opacity: 0.7 - i * 0.09,
        blending: THREE.AdditiveBlending
      });
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0, -2, -5 - i * 3);
      archShape.add(arch);
    }
    horizonGroup.add(archShape);

    const dawnLightGeo = new THREE.SphereGeometry(1.4, 32, 32);
    const dawnLightMat = new THREE.MeshBasicMaterial({
      color: 0xffe8bd,
      transparent: true,
      opacity: 0.95
    });
    const dawnLight = new THREE.Mesh(dawnLightGeo, dawnLightMat);
    dawnLight.position.set(0, -1.8, -25);
    horizonGroup.add(dawnLight);

    const pillarGeo = new THREE.CylinderGeometry(0.2, 2.2, 40, 32);
    const pillarMat = new THREE.MeshBasicMaterial({
      color: 0xddbb7a,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const pillar = new THREE.Mesh(pillarGeo, pillarMat);
    pillar.position.set(0, 10, -25);
    horizonGroup.add(pillar);

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
        ? new THREE.Color(0x07090d)
        : (isLight ? new THREE.Color(0xf1f4f9) : new THREE.Color(0x07090d));
      scene.fog.color.lerp(targetFogColor, 0.05);

      const targetAmbColor = isLight ? new THREE.Color(0xffffff) : new THREE.Color(0x0d1424);
      ambientLight.color.lerp(targetAmbColor, 0.05);
      ambientLight.intensity = THREE.MathUtils.lerp(ambientLight.intensity, isLight ? 1.8 : 0.8, 0.05);

      // Building prism & grid colors in campus
      const targetGroundColor = isLight ? new THREE.Color(0x5548eb) : new THREE.Color(0x685cff);
      groundGrid.material.color.lerp(targetGroundColor, 0.05);

      const targetBuildingColor = isLight ? new THREE.Color(0xe2e8f0) : new THREE.Color(0x0d1424);
      buildingMeshes.forEach((mesh) => {
        mesh.material.color.lerp(targetBuildingColor, 0.05);
      });

      // Parallax mouse nudge (calm, elegant, never feels like a toy)
      const targetMouseX = (mousePos.x || 0) * 0.4;
      const targetMouseY = -(mousePos.y || 0) * 0.4;

      starField.rotation.y = elapsedTime * 0.008;

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

      // Camera & Group configurations per chapter
      let targetCamPos = new THREE.Vector3(0, 0, 16);
      let targetLook = new THREE.Vector3(0, 0, 0);
      let targetGlobePos = new THREE.Vector3(0, 0, 0);
      let targetGlobeScale = 1.0;

      switch (activeChapter) {
        case '00': // Enter: Earth distant, massive, calm
          globeGroup.visible = true;
          flowGroup.visible = false;
          campusGroup.visible = true;
          horizonGroup.visible = false;

          targetGlobePos.set(2.8, 1.6, -1);
          targetGlobeScale = 1.1;
          targetCamPos.set(targetMouseX * 0.5, 0.4 + targetMouseY * 0.4, 15);
          targetLook.set(1.4, 0.4, 0);

          campusGroup.position.set(0, -5, -4);
          break;

        case '01': // Ecosystem: Full Earth, prominent, connecting to selected country
          globeGroup.visible = true;
          flowGroup.visible = false;
          campusGroup.visible = false;
          horizonGroup.visible = false;

          targetGlobePos.set(2.2, 0, 0);
          targetGlobeScale = 1.25;
          targetCamPos.set(targetMouseX * 0.6, targetMouseY * 0.5, 13.5);
          targetLook.set(1.0, 0, 0);
          break;

        case '02': // Flow: Zoom toward geographic flow pipeline
          globeGroup.visible = false;
          flowGroup.visible = true;
          campusGroup.visible = false;
          horizonGroup.visible = false;

          targetCamPos.set(targetMouseX * 0.8, 1.0 + targetMouseY * 0.5, 12);
          targetLook.set(0, 0.5, 0);

          const pulseAttr = pulseMesh.geometry.attributes.position;
          for (let i = 0; i < pulseCount; i++) {
            const t = (elapsedTime * 0.35 + i / pulseCount) % 1.0;
            const pt = flowCurve.getPoint(t);
            pulseAttr.setXYZ(i, pt.x, pt.y, pt.z);
          }
          pulseAttr.needsUpdate = true;
          flowGroup.rotation.y = Math.sin(elapsedTime * 0.3) * 0.08;
          break;

        case '03': // People: Atmospheric depth
          globeGroup.visible = true;
          flowGroup.visible = false;
          campusGroup.visible = false;
          horizonGroup.visible = false;

          targetGlobePos.set(-4.5, -1.0, -6);
          targetGlobeScale = 0.95;
          targetCamPos.set(targetMouseX * 0.4, targetMouseY * 0.4, 13);
          targetLook.set(-0.5, 0, 0);
          break;

        case '04': // Institution: Campus layout
          globeGroup.visible = false;
          flowGroup.visible = false;
          campusGroup.visible = true;
          horizonGroup.visible = false;

          campusGroup.position.set(0, -3.2, 0);
          targetCamPos.set(0 + targetMouseX * 1.5, 7.5 + targetMouseY * 0.8, 14);
          targetLook.set(0, 0.5, 0);
          campusGroup.rotation.y = elapsedTime * 0.04;
          break;

        case '05': // Intelligence: Analytical depth
          globeGroup.visible = true;
          flowGroup.visible = false;
          campusGroup.visible = false;
          horizonGroup.visible = false;

          targetGlobePos.set(5.5, -2, -5);
          targetGlobeScale = 0.9;
          targetCamPos.set(targetMouseX * 0.4, targetMouseY * 0.4, 14);
          targetLook.set(0, 0, 0);
          break;

        case '06': // Application: Focal dossier
          globeGroup.visible = true;
          flowGroup.visible = false;
          campusGroup.visible = false;
          horizonGroup.visible = false;

          targetGlobePos.set(4.0, 1.5, -4);
          targetGlobeScale = 0.85;
          targetCamPos.set(targetMouseX * 0.4, targetMouseY * 0.4, 13);
          targetLook.set(0, 0, 0);
          break;

        case '07': // Network: Epic pullback showing the entire planet Earth with constellation!
          globeGroup.visible = true;
          flowGroup.visible = false;
          campusGroup.visible = true;
          horizonGroup.visible = false;

          targetGlobePos.set(0, 1.0, -3);
          targetGlobeScale = 1.45;
          targetCamPos.set(targetMouseX * 0.8, 2.0 + targetMouseY * 0.8, 18);
          targetLook.set(0, 1.0, 0);
          campusGroup.position.set(0, -5, -6);
          break;

        case '08': // Future: Minimal cinematic dawn
          globeGroup.visible = false;
          flowGroup.visible = false;
          campusGroup.visible = false;
          horizonGroup.visible = true;

          targetCamPos.set(targetMouseX * 0.5, -0.5 + targetMouseY * 0.4, 11);
          targetLook.set(0, 0.5, -15);
          archShape.rotation.z = Math.sin(elapsedTime * 0.2) * 0.03;
          dawnLight.scale.setScalar(1 + Math.sin(elapsedTime * 1.5) * 0.06);
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
