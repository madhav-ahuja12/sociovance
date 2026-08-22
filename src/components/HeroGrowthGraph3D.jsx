import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowUpRight, Users, Zap, Award } from 'lucide-react';

const HeroGrowthGraph3D = () => {
  const canvasContainerRef = useRef(null);
  const [activeMetric, setActiveMetric] = useState(0);

  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    // ── 3D SCENE & CAMERA ──
    const scene = new THREE.Scene();
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(4.5, 3.8, 6.8);
    camera.lookAt(0, 0.4, 0);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ── LIGHTING ──
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.5);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x1d4ed8, 4.0);
    rimLight.position.set(-6, -2, -5);
    scene.add(rimLight);

    const bluePoint = new THREE.PointLight(0x2563eb, 3.0, 15);
    bluePoint.position.set(0, 2, 2);
    scene.add(bluePoint);

    const graphGroup = new THREE.Group();
    scene.add(graphGroup);

    // ── 3D ISOMETRIC GRID FLOOR ──
    const gridHelper = new THREE.GridHelper(7, 14, 0x1d4ed8, 0xe2e8f0);
    gridHelper.position.y = -1.2;
    gridHelper.material.opacity = 0.6;
    gridHelper.material.transparent = true;
    graphGroup.add(gridHelper);

    // ── 3D GROWTH BARS ──
    const barData = [
      { x: -2.4, z: -0.8, targetH: 0.8, color: 0x93c5fd },
      { x: -1.6, z: -0.4, targetH: 1.3, color: 0x60a5fa },
      { x: -0.8, z: 0.0, targetH: 1.8, color: 0x3b82f6 },
      { x: 0.0, z: 0.3, targetH: 2.3, color: 0x2563eb },
      { x: 0.8, z: 0.6, targetH: 2.9, color: 0x1d4ed8 },
      { x: 1.6, z: 0.9, targetH: 3.6, color: 0x1e40af },
      { x: 2.4, z: 1.2, targetH: 4.4, color: 0x172554 },
    ];

    const bars = [];
    const barWidth = 0.38;

    barData.forEach((item, index) => {
      const geo = new THREE.BoxGeometry(barWidth, 1, barWidth);
      geo.translate(0, 0.5, 0); // anchor at base

      const mat = new THREE.MeshPhysicalMaterial({
        color: item.color,
        roughness: 0.15,
        metalness: 0.1,
        clearcoat: 0.8,
        transmission: 0.25,
        transparent: true,
        opacity: 0.92,
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(item.x, -1.2, item.z);
      mesh.scale.y = 0.1;
      graphGroup.add(mesh);

      // Glowing cap on each bar
      const capGeo = new THREE.PlaneGeometry(barWidth, barWidth);
      const capMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      });
      const cap = new THREE.Mesh(capGeo, capMat);
      cap.rotation.x = -Math.PI / 2;
      cap.position.y = 1.01;
      mesh.add(cap);

      bars.push({ mesh, targetH: item.targetH, initialX: item.x, initialZ: item.z, index });
    });

    // ── 3D EXPONENTIAL GROWTH CURVE SPLINE ──
    const curvePoints = [
      new THREE.Vector3(-2.4, -1.2 + 0.8, -0.8),
      new THREE.Vector3(-1.6, -1.2 + 1.3, -0.4),
      new THREE.Vector3(-0.8, -1.2 + 1.8, 0.0),
      new THREE.Vector3(0.0, -1.2 + 2.3, 0.3),
      new THREE.Vector3(0.8, -1.2 + 2.9, 0.6),
      new THREE.Vector3(1.6, -1.2 + 3.6, 0.9),
      new THREE.Vector3(2.4, -1.2 + 4.4, 1.2),
    ];

    const spline = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(spline, 64, 0.06, 16, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    graphGroup.add(tube);

    // ── GLOWING ENERGY SPHERES MOVING ALONG THE GRAPH ──
    const energySpheres = [
      { t: 0.0, speed: 0.35, size: 0.12, color: 0x60a5fa },
      { t: 0.5, speed: 0.42, size: 0.16, color: 0x38bdf8 },
      { t: 0.85, speed: 0.3, size: 0.18, color: 0xffffff },
    ];

    energySpheres.forEach((sp) => {
      const geo = new THREE.SphereGeometry(sp.size, 24, 24);
      const mat = new THREE.MeshBasicMaterial({
        color: sp.color,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(geo, mat);
      graphGroup.add(mesh);
      sp.mesh = mesh;

      // Glow halo
      const glowGeo = new THREE.SphereGeometry(sp.size * 2.2, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: 0x2563eb,
        transparent: true,
        opacity: 0.35,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      mesh.add(glowMesh);
    });

    // ── 3D DATA POINT NODES ON PEAKS ──
    const peakPillGeo = new THREE.SphereGeometry(0.14, 24, 24);
    const peakPillMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.9,
    });
    curvePoints.forEach((pt) => {
      const peakMesh = new THREE.Mesh(peakPillGeo, peakPillMat);
      peakMesh.position.copy(pt);
      graphGroup.add(peakMesh);
    });

    // ── 3D FLOATING PARTICLES AROUND GRAPH ──
    const particleCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 6;
      particlePositions[i * 3 + 1] = Math.random() * 4 - 1;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particleGeo, particleMat);
    graphGroup.add(particleSystem);

    // ── FIXED ISOMETRIC ORIENTATION (NON-ROTATABLE) ──
    graphGroup.rotation.y = -0.22;
    graphGroup.rotation.x = 0.06;

    // ── ANIMATION LOOP ──
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Bars animated growth undulating waves
      bars.forEach((bar) => {
        const wave = Math.sin(elapsed * 2 + bar.index * 0.5) * 0.15;
        const targetScale = bar.targetH + wave;
        bar.mesh.scale.y += (targetScale - bar.mesh.scale.y) * 0.08;
      });

      // Move energy spheres along the 3D spline
      energySpheres.forEach((sp) => {
        sp.t = (sp.t + sp.speed * 0.008) % 1;
        const pos = spline.getPoint(sp.t);
        sp.mesh.position.copy(pos);
      });

      // Floating particles slow drift
      particleSystem.rotation.y = elapsed * 0.04;
      particlePositions.forEach((_, i) => {
        if (i % 3 === 1) {
          particlePositions[i] += 0.003;
          if (particlePositions[i] > 3.5) particlePositions[i] = -1.2;
        }
      });
      particleGeo.attributes.position.needsUpdate = true;

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

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      gridHelper.dispose();
      tubeGeo.dispose();
      tubeMat.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[440px] sm:h-[500px] lg:h-[540px] flex items-center justify-center select-none">
      {/* 3D WebGL Canvas Layer */}
      <div
        ref={canvasContainerRef}
        className="w-full h-full pointer-events-none"
      />

      {/* Floating 3D Growth Metric Card Top-Right */}
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute top-2 right-2 sm:top-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-[0_12px_35px_rgba(15,23,42,0.08)] flex items-center gap-3 z-20 pointer-events-none"
      >
        <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-violet-700">
          <TrendingUp size={20} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-slate-500 font-medium">Monthly Reach</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              +340%
            </span>
          </div>
          <p className="text-lg font-black text-slate-900 leading-tight">4.8M Impressions</p>
        </div>
      </motion.div>

      {/* Floating 3D Live Engagement Card Bottom-Left */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="absolute bottom-2 left-2 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-[0_12px_35px_rgba(15,23,42,0.08)] flex items-center gap-3 z-20 pointer-events-none"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 text-white flex items-center justify-center shadow-md">
          <Zap size={18} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500 font-medium">Conversion Rate</span>
          </div>
          <p className="text-lg font-black text-slate-900 leading-tight">3.4× Velocity</p>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroGrowthGraph3D;
