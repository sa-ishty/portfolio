"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { focus, type FocusStatus } from "@/data";

const NODE_COUNT = 150;
const RADIUS = 2.2;
const PACKETS = 28;

function readColors() {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => new THREE.Color(css.getPropertyValue(name).trim() || "#778da9");
  return {
    node: v("--steel"),
    link: v("--slate"),
    packet: v("--foreground"),
    up: v("--up"),
    learning: v("--learning"),
    planned: v("--muted-foreground"),
  };
}

const statusKey: Record<FocusStatus, "up" | "learning" | "planned"> = {
  up: "up",
  "in progress": "learning",
  learning: "learning",
  planned: "planned",
};

/** Evenly spread points on a sphere. */
function fibonacciSphere(n: number, r: number) {
  const pts: THREE.Vector3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push(new THREE.Vector3(Math.cos(theta) * rad * r, y * r, Math.sin(theta) * rad * r));
  }
  return pts;
}

export default function TopologyGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    let colors = readColors();

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 0.6, 6.4);

    const globe = new THREE.Group();
    globe.rotation.z = 0.25;
    scene.add(globe);

    // Nodes
    const points = fibonacciSphere(NODE_COUNT, RADIUS);
    points.forEach((p) => p.multiplyScalar(0.96 + Math.random() * 0.08));
    const nodeGeo = new THREE.BufferGeometry().setFromPoints(points);
    const nodeMat = new THREE.PointsMaterial({ color: colors.node, size: 0.05, sizeAttenuation: true });
    globe.add(new THREE.Points(nodeGeo, nodeMat));

    // Links: each node to its 3 nearest neighbours
    const links: [number, number][] = [];
    const seen = new Set<string>();
    points.forEach((p, i) => {
      points
        .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
        .forEach(({ j }) => {
          const key = i < j ? `${i}-${j}` : `${j}-${i}`;
          if (!seen.has(key)) {
            seen.add(key);
            links.push([i, j]);
          }
        });
    });
    const linkPositions = new Float32Array(links.length * 6);
    links.forEach(([a, b], k) => {
      points[a].toArray(linkPositions, k * 6);
      points[b].toArray(linkPositions, k * 6 + 3);
    });
    const linkGeo = new THREE.BufferGeometry();
    linkGeo.setAttribute("position", new THREE.BufferAttribute(linkPositions, 3));
    const linkMat = new THREE.LineBasicMaterial({ color: colors.link, transparent: true, opacity: 0.55 });
    globe.add(new THREE.LineSegments(linkGeo, linkMat));

    // Faint core
    const coreGeo = new THREE.IcosahedronGeometry(RADIUS * 0.45, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: colors.link,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    globe.add(core);

    // Orbit ring
    const ringGeo = new THREE.TorusGeometry(RADIUS * 1.32, 0.006, 8, 160);
    const ringMat = new THREE.MeshBasicMaterial({ color: colors.node, transparent: true, opacity: 0.35 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.3;
    scene.add(ring);

    // Hubs: one per focus area
    const hubIdx = focus.map((_, i) => Math.floor(((i + 0.5) / focus.length) * NODE_COUNT));
    const hubGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const haloGeo = new THREE.SphereGeometry(0.16, 16, 16);
    const hubs = focus.map((f, i) => {
      const key = statusKey[f.status];
      const mat = new THREE.MeshBasicMaterial({ color: colors[key] });
      const halo = new THREE.MeshBasicMaterial({ color: colors[key], transparent: true, opacity: 0.18 });
      const mesh = new THREE.Mesh(hubGeo, mat);
      const haloMesh = new THREE.Mesh(haloGeo, halo);
      mesh.position.copy(points[hubIdx[i]]);
      haloMesh.position.copy(points[hubIdx[i]]);
      globe.add(mesh, haloMesh);
      return { mesh, haloMesh, mat, halo, key };
    });

    // Packets travelling along links
    const packetPos = new Float32Array(PACKETS * 3);
    const packetGeo = new THREE.BufferGeometry();
    packetGeo.setAttribute("position", new THREE.BufferAttribute(packetPos, 3));
    const packetMat = new THREE.PointsMaterial({ color: colors.packet, size: 0.075, transparent: true, opacity: 0.95 });
    globe.add(new THREE.Points(packetGeo, packetMat));
    const packets = Array.from({ length: PACKETS }, () => ({
      link: Math.floor(Math.random() * links.length),
      t: Math.random(),
      speed: 0.25 + Math.random() * 0.5,
    }));
    const tmp = new THREE.Vector3();
    const placePackets = (dt: number) => {
      packets.forEach((pk, i) => {
        pk.t += pk.speed * dt;
        if (pk.t >= 1) {
          // hop to a link that starts where this one ended
          const end = links[pk.link][1];
          const next = links.findIndex(([a], k) => a === end && k !== pk.link);
          pk.link = next >= 0 ? next : Math.floor(Math.random() * links.length);
          pk.t = 0;
        }
        const [a, b] = links[pk.link];
        tmp.lerpVectors(points[a], points[b], pk.t).toArray(packetPos, i * 3);
      });
      packetGeo.attributes.position.needsUpdate = true;
    };
    placePackets(0);

    // Controls: drag to orbit, no zoom. On touch screens leave the page scroll alone.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.autoRotate = !reduceMotion;
    controls.autoRotateSpeed = 0.7;
    controls.minPolarAngle = Math.PI * 0.25;
    controls.maxPolarAngle = Math.PI * 0.75;
    if (coarse) {
      controls.enableRotate = false;
      renderer.domElement.style.touchAction = "pan-y";
    }

    // Labels follow their hub on screen and dim when on the far side.
    const world = new THREE.Vector3();
    const camDir = new THREE.Vector3();
    const updateLabels = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.getWorldDirection(camDir);
      hubs.forEach((hub, i) => {
        const el = labelRefs.current[i];
        if (!el) return;
        hub.mesh.getWorldPosition(world);
        const facing = world.clone().normalize().dot(camDir) < 0.15;
        world.project(camera);
        const x = (world.x * 0.5 + 0.5) * w;
        const y = (-world.y * 0.5 + 0.5) * h;
        el.style.transform = `translate(-50%, -140%) translate(${x}px, ${y}px)`;
        el.style.opacity = facing ? "1" : "0.15";
      });
    };

    // Re-read colors when the theme changes.
    const themeObserver = new MutationObserver(() => {
      colors = readColors();
      nodeMat.color = colors.node;
      linkMat.color = colors.link;
      coreMat.color = colors.link;
      ringMat.color = colors.node;
      packetMat.color = colors.packet;
      hubs.forEach((h) => {
        h.mat.color = colors[h.key];
        h.halo.color = colors[h.key];
      });
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);

    // Only animate while visible.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(mount);

    const clock = new THREE.Clock();
    let frame = 0;
    const tick = () => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible || document.hidden) return;
      if (!reduceMotion) {
        placePackets(dt);
        core.rotation.y -= dt * 0.25;
        core.rotation.x += dt * 0.1;
        ring.rotation.z += dt * 0.08;
        const pulse = 1 + Math.sin(clock.elapsedTime * 2.4) * 0.25;
        hubs.forEach((h) => h.haloMesh.scale.setScalar(pulse));
      }
      controls.update();
      renderer.render(scene, camera);
      updateLabels();
    };
    tick();

    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      controls.dispose();
      [nodeGeo, linkGeo, coreGeo, ringGeo, hubGeo, haloGeo, packetGeo].forEach((g) => g.dispose());
      [nodeMat, linkMat, coreMat, ringMat, packetMat, ...hubs.flatMap((h) => [h.mat, h.halo])].forEach((m) =>
        m.dispose(),
      );
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing">
      {focus.map((f, i) => (
        <div
          key={f.interface}
          ref={(el) => {
            labelRefs.current[i] = el;
          }}
          className="pointer-events-none absolute top-0 left-0 rounded border border-border bg-background/80 px-1.5 py-0.5 font-mono text-[10px] whitespace-nowrap text-foreground backdrop-blur-sm transition-opacity duration-300 sm:text-[11px]"
          style={{ opacity: 0 }}
        >
          {f.interface}
        </div>
      ))}
    </div>
  );
}
