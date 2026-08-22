import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroSphere3D = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── SCENE & CAMERA ──
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 8.5);

    // ── RENDERER ──
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── LIGHTING ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(5, 6, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x1d4ed8, 4.0);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0x2563eb, 2.5, 20);
    fillLight.position.set(0, 4, 3);
    scene.add(fillLight);

    // ── MAIN CENTRAL 3D SPHERE ──
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Outer Glassy Mesh Sphere
    const sphereGeo = new THREE.SphereGeometry(1.75, 64, 64);
    const sphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x1d4ed8,
      emissive: 0x172554,
      emissiveIntensity: 0.25,
      roughness: 0.15,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.45,
      ior: 1.45,
      reflectivity: 0.8,
    });
    const mainSphere = new THREE.Mesh(sphereGeo, sphereMat);
    mainGroup.add(mainSphere);

    // Inner Geodesic Wireframe Sphere
    const innerGeo = new THREE.IcosahedronGeometry(1.4, 2);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
      emissive: 0x1e40af,
      emissiveIntensity: 0.6,
    });
    const innerSphere = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerSphere);

    // Inner Glowing Core
    const coreGeo = new THREE.SphereGeometry(0.7, 32, 32);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.7,
    });
    const coreSphere = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreSphere);

    // ── 3D ORBIT RINGS ──
    const createOrbitRing = (radius, tiltX, tiltZ, color) => {
      const ringGeo = new THREE.RingGeometry(radius - 0.02, radius + 0.02, 128);
      const ringMat = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = tiltX;
      ring.rotation.z = tiltZ;
      return ring;
    };

    const ring1 = createOrbitRing(2.6, Math.PI / 3, Math.PI / 6, 0x1d4ed8);
    const ring2 = createOrbitRing(3.2, -Math.PI / 4, -Math.PI / 5, 0x0284c7);
    const ring3 = createOrbitRing(2.1, Math.PI / 2.2, -Math.PI / 8, 0x60a5fa);
    scene.add(ring1);
    scene.add(ring2);
    scene.add(ring3);

    // ── MOVING ORBITING SPHERES ──
    const orbiters = [
      {
        radius: 2.6,
        speed: 0.9,
        size: 0.28,
        color: 0x1d4ed8,
        tiltX: Math.PI / 3,
        tiltZ: Math.PI / 6,
        mesh: null,
        emissive: 0x38bdf8,
      },
      {
        radius: 3.2,
        speed: -0.65,
        size: 0.34,
        color: 0x0284c7,
        tiltX: -Math.PI / 4,
        tiltZ: -Math.PI / 5,
        mesh: null,
        emissive: 0x60a5fa,
      },
      {
        radius: 2.1,
        speed: 1.25,
        size: 0.22,
        color: 0x1e3a8a,
        tiltX: Math.PI / 2.2,
        tiltZ: -Math.PI / 8,
        mesh: null,
        emissive: 0x1d4ed8,
      },
      {
        radius: 3.6,
        speed: 0.45,
        size: 0.18,
        color: 0x38bdf8,
        tiltX: Math.PI / 5,
        tiltZ: Math.PI / 3,
        mesh: null,
        emissive: 0xffffff,
      },
      {
        radius: 1.8,
        speed: -1.6,
        size: 0.14,
        color: 0x2563eb,
        tiltX: -Math.PI / 2.5,
        tiltZ: Math.PI / 4,
        mesh: null,
        emissive: 0x60a5fa,
      },
    ];

    orbiters.forEach((orb) => {
      const geo = new THREE.SphereGeometry(orb.size, 32, 32);
      const mat = new THREE.MeshStandardMaterial({
        color: orb.color,
        roughness: 0.2,
        metalness: 0.7,
        emissive: orb.emissive,
        emissiveIntensity: 0.4,
      });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      orb.mesh = mesh;
    });

    // ── 3D FLOATING PARTICLES ──
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.0 + Math.random() * 2.8;

      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      particleScales[i] = Math.random() * 0.05 + 0.02;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.06,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ── MOUSE INTERACTIVITY & PARALLAX ──
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width - 0.5) * 2;
      mouse.targetY = -(clientY / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // ── ANIMATION LOOP ──
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Central sphere rotation & breathing
      mainGroup.rotation.y = elapsedTime * 0.25 + mouse.x * 0.4;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.3) * 0.1 + mouse.y * 0.3;
      innerSphere.rotation.y = -elapsedTime * 0.35;
      innerSphere.rotation.z = elapsedTime * 0.2;

      const breathe = 1 + Math.sin(elapsedTime * 1.5) * 0.03;
      mainSphere.scale.set(breathe, breathe, breathe);

      // Orbiting spheres calculation
      orbiters.forEach((orb) => {
        const angle = elapsedTime * orb.speed;
        // Position on 2D plane
        const localX = Math.cos(angle) * orb.radius;
        const localY = Math.sin(angle) * orb.radius;

        // Apply 3D tilt rotations
        const vec = new THREE.Vector3(localX, localY, 0);
        vec.applyAxisAngle(new THREE.Vector3(1, 0, 0), orb.tiltX);
        vec.applyAxisAngle(new THREE.Vector3(0, 0, 1), orb.tiltZ);

        orb.mesh.position.copy(vec);
        orb.mesh.rotation.y += 0.02;
      });

      // Rings gentle wobble
      ring1.rotation.y = elapsedTime * 0.05;
      ring2.rotation.y = -elapsedTime * 0.04;
      ring3.rotation.z = Math.sin(elapsedTime * 0.5) * 0.1;

      // Particle cloud rotation
      particles.rotation.y = elapsedTime * 0.08;
      particles.rotation.x = Math.sin(elapsedTime * 0.05) * 0.05;

      // Camera subtle tracking
      camera.position.x = mouse.x * 0.6;
      camera.position.y = mouse.y * 0.6;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ── RESIZE HANDLER ──
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // ── CLEANUP ──
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      sphereGeo.dispose();
      sphereMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] lg:h-[520px] flex items-center justify-center select-none cursor-pointer"
      style={{ touchAction: 'none' }}
    />
  );
};

export default HeroSphere3D;
