import React, { CSSProperties, useEffect, useRef, useMemo } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Line2 } from "three/examples/jsm/lines/Line2.js";
import { LineGeometry } from "three/examples/jsm/lines/LineGeometry.js";
import { LineMaterial } from "three/examples/jsm/lines/LineMaterial.js";

gsap.registerPlugin(ScrollTrigger);

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

const DEFAULTS = {
  canvasHeight: 680,
  maxWidth: 1100,
  padding: 20,
  colors: {
    background: 0x000000,
    sideFace: 0x156d89,
    sideSpecular: 0x49d0f4,
    baseFace: 0x156d89,
    baseSpecular: 0x2f94ad,
    apexEdge: 0x2ab7de,
    baseEdge: 0x1f89a7,
    bar: 0xb48c50,
    barSpecular: 0xddbb88,
    leaderStroke: "#b48c50",
    edgeLabelText: "#ffffff",
    dotColor: "#5fd2f0",
    sliderThumbA: "#1D9E75",
    sliderThumbB: "#534AB7",
    sliderTrack: "#2a2a3e",
    sliderLabel: "#777",
  },
  pyramidScale: 2.2,
  heightRatio: 1.6,
  baseRatio: 1,
  baseCentreY: 0.3,
  barCylRadius: 0.04,
  barSphereRadius: 0.08,
  lighting: {
    ambientIntensity: 0.35,
    keyIntensity: 0.85,
    keyPosition: [4, 5, 6] as [number, number, number],
    fillIntensity: 0.3,
    fillPosition: [-5, 2, 4] as [number, number, number],
    rimIntensity: 0.15,
    rimPosition: [0, -3, -5] as [number, number, number],
    sideShininess: 50,
    baseShininess: 25,
    barShininess: 60,
  },
  camera: { fov: 45, distance: 10.5 },
  rotation: {
    startX: -Math.PI * 0.5,
    endX: 0.15,
    startY: Math.PI / 3,
    endY: 0.65 + Math.PI / 3,
    sliderSmoothing: 0.1,
    spinSpeed: 0.5,
    spinThreshold: 0.9,
    decayHalfLife: 0.3,
  },
  edgeLabels: {
    texts: ["Fully\nautomated", "Cheap to\nbuild", "Complex\nLoan Logic"] as [
      string,
      string,
      string,
    ],
    fontSize: 16,
    fontWeight: 600,
    worldHeight: 0.5,
    edgeOffset: 0.15,
  },
  logo: {
    svgBase64: null as string | null,
    worldHeight: 0.55,
    verticalOffset: 0.5,
    canvasWidth: 1016,
    canvasHeight: 264,
  },
  dashedEdges: {
    dashSize: 0.1,
    gapSize: 0.07,
    fadeStart: 0.3,
    fadeEnd: 0.6,
    maxOpacity: 0,
  },
  slider: { leftLabel: "Legacy technology", rightLabel: "Atomix" },
  callouts: {
    fadeRange: 0.15,
    offsets: {
      b1: { dx: -110, dy: 0 },
      b2: { dx: 0, dy: 60 },
      b3: { dx: 110, dy: 0 },
    },
    b1: {
      title: "Bespoke build",
      textAlign: "left",
      lines: [
        { positive: true, text: "Automated" },
        { positive: true, text: "Complex logic" },
        { positive: false, text: "£600k, slow to change" },
      ],
    },
    b2: {
      title: "Simple SaaS",
      textAlign: "center",
      lines: [
        { positive: true, text: "Automated" },
        { positive: true, text: "Cheap to build" },
        { positive: false, text: "Simple products only" },
      ],
    },
    b3: {
      title: "Siloed modules",
      textAlign: "right",
      lines: [
        { positive: true, text: "Complex logic" },
        { positive: true, text: "Cheap to build" },
        { positive: false, text: "Not automated" },
      ],
    },
    style: {
      background: "rgba(13,60,70,1)",
      border: "2px solid rgba(100,200,220,0.6)",
      borderRadius: "16px",
      titleColor: "#ffffff",
      titleSize: "18px",
      lineColor: "#e0e0e0",
      lineSize: "14px",
      yesColor: "#6be0a0",
      noColor: "#e06b6b",
      minWidth: "220px",
      maxWidth: "280px",
      leaderWidth: 1.5,
      leaderDash: "4,3",
    },
  },
  apexCallout: {
    fadeStart: 0.85,
    fadeEnd: 1,
    offset: { dx: 161, dy: -62 },
    text: "Declarative policy specifications mean the business logic can be complex, changed cheaply and executed automatically.",
    style: {
      background: "rgba(15,25,40,0.92)",
      border: "1px solid rgba(32,204,252,0.6)",
      borderRadius: "8px",
      textColor: "#c0dde8",
      fontSize: "12px",
      lineHeight: "1.55",
      maxWidth: "260px",
    },
  },
};

type Cfg = typeof DEFAULTS;

function deepMerge<T>(t: T, s?: DeepPartial<T>): T {
  if (!s) return t;
  const r: Record<string, unknown> = { ...(t as Record<string, unknown>) };
  Object.keys(s).forEach((k) => {
    const sv = (s as Record<string, unknown>)[k];
    const tv = (t as Record<string, unknown>)[k];
    if (
      sv &&
      typeof sv === "object" &&
      !Array.isArray(sv) &&
      tv &&
      typeof tv === "object" &&
      !Array.isArray(tv)
    )
      r[k] = deepMerge(
        tv as Record<string, unknown>,
        sv as Record<string, unknown>,
      );
    else if (sv !== undefined) r[k] = sv;
  });
  return r as T;
}

export interface TestPyramidNewDesignProps {
  config?: DeepPartial<Cfg>;
  className?: string;
  style?: CSSProperties;
  initialSliderValue?: number;
  onReady?: (api: { setSlider: (v: number) => void }) => void;
  onInfiniteSpinStart?: () => void;
  disableScrollTrigger?: boolean;
}

const clamp = (
  x: number,
  y: number,
  w: number,
  h: number,
  ww: number,
  wh: number,
  p: number,
) => ({
  x: Math.max(p, Math.min(x, ww - w - p)),
  y: Math.max(p, Math.min(y, wh - h - p)),
});

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

const HIGHLIGHT_SEQUENCE_END = 0.66;
const HIGHLIGHT_SEQUENCE_FADE = 0.24;
const HIGHLIGHT_PHASE_1_END = 0.26;
const HIGHLIGHT_PHASE_2_END = 0.52;
const HIGHLIGHT_EDGE_BASE_WIDTH = 1.6;
const HIGHLIGHT_EDGE_EXTRA_WIDTH = 2.2;
const EDGE_LABEL_BASE_OPACITY = 0.16;
const EDGE_LABEL_ACTIVE_BOOST = 0.84;
const PYRAMID_SCROLL_DISTANCE_MULTIPLIER = 6;

type V3 = THREE.Vector3;
const Vec3 = THREE.Vector3;
const v3 = (...a: [number, number, number]) => new Vec3(...a);

const TestPyramidNewDesign: React.FC<TestPyramidNewDesignProps> = ({
  config,
  className = "",
  style,
  initialSliderValue = 0,
  onReady,
  onInfiniteSpinStart,
  disableScrollTrigger = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef(clamp01(initialSliderValue));
  const initialDisableScrollTriggerRef = useRef(disableScrollTrigger);
  const initialSliderValueRef = useRef(clamp01(initialSliderValue));
  const curTRef = useRef(0);
  const spinRef = useRef(0);
  const hasTriggeredInfiniteSpinRef = useRef(false);
  const apexRef = useRef<HTMLDivElement>(null);
  const cfg = useMemo(() => deepMerge(DEFAULTS, config), [config]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || initialDisableScrollTriggerRef.current) {
      scrollProgressRef.current = initialSliderValueRef.current;
      return;
    }

    const scrollTrigger = ScrollTrigger.create({
      trigger: wrapper,
      start: "top center",
      end: () =>
        `+=${wrapper.clientHeight * PYRAMID_SCROLL_DISTANCE_MULTIPLIER}`,
      scrub: true,
      onUpdate: (self) => {
        scrollProgressRef.current = clamp01(self.progress);
      },
      onLeaveBack: () => {
        scrollProgressRef.current = 0;
        curTRef.current = 0;
        spinRef.current = 0;
        hasTriggeredInfiniteSpinRef.current = false;
      },
      onLeave: () => {
        scrollProgressRef.current = 1;
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current,
      wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(cfg.colors.background, 0);
    const camera = new THREE.PerspectiveCamera(cfg.camera.fov, 1, 0.1, 100);
    camera.position.set(0, 0, cfg.camera.distance);
    camera.lookAt(0, 0, 0);

    const lt = cfg.lighting;
    scene.add(new THREE.AmbientLight(0xffffff, lt.ambientIntensity));
    [
      [lt.keyIntensity, lt.keyPosition],
      [lt.fillIntensity, lt.fillPosition],
      [lt.rimIntensity, lt.rimPosition],
    ].forEach(([i, p]) => {
      const l = new THREE.DirectionalLight(0xffffff, i as number);
      l.position.set(...(p as [number, number, number]));
      scene.add(l);
    });

    const grp = new THREE.Group();
    scene.add(grp);

    const S = cfg.pyramidScale,
      H = S * cfg.heightRatio,
      R = S * cfg.baseRatio;
    const by = -H * cfg.baseCentreY,
      ay = H + by;
    const c30 = Math.cos(Math.PI / 6),
      s30 = Math.sin(Math.PI / 6);
    const rawA = v3(0, ay, 0),
      rawB1 = v3(-R * c30, by, -R * s30),
      rawB2 = v3(R * c30, by, -R * s30),
      rawB3 = v3(0, by, R);
    const pw = 0.4,
      bw = (1 - pw) / 3;
    const ctr = new Vec3()
      .addScaledVector(rawA, pw)
      .addScaledVector(rawB1, bw)
      .addScaledVector(rawB2, bw)
      .addScaledVector(rawB3, bw);
    const apex = rawA.clone().sub(ctr),
      b1 = rawB1.clone().sub(ctr),
      b2 = rawB2.clone().sub(ctr),
      b3 = rawB3.clone().sub(ctr);

    const phong = (color: number, spec: number, shin: number) =>
      new THREE.MeshPhongMaterial({
        color,
        side: THREE.DoubleSide,
        shininess: shin,
        specular: new THREE.Color(spec),
      });
    const makeSideMat = () =>
      new THREE.MeshPhongMaterial({
        color: cfg.colors.sideFace,
        side: THREE.DoubleSide,
        shininess: lt.sideShininess,
        specular: new THREE.Color(cfg.colors.sideSpecular),
        emissive: new THREE.Color(cfg.colors.dotColor),
        emissiveIntensity: 0,
      });
    const bottomFaceMat = makeSideMat();
    const rightFaceMat = makeSideMat();
    const leftFaceMat = makeSideMat();
    const baseFaceMat = phong(
      cfg.colors.baseFace,
      cfg.colors.baseSpecular,
      lt.baseShininess,
    );
    const sideFaceBaseColor = new THREE.Color(cfg.colors.sideFace);
    const sideFaceHighlightColor = new THREE.Color(cfg.colors.dotColor);
    const perimeterEdgeBaseColor = new THREE.Color(cfg.colors.baseEdge);
    const perimeterEdgeHighlightColor = new THREE.Color(cfg.colors.dotColor);
    const applyFaceHighlight = (
      material: THREE.MeshPhongMaterial,
      weight: number,
    ) => {
      material.color
        .copy(sideFaceBaseColor)
        .lerp(sideFaceHighlightColor, 0.4 * weight);
      material.emissiveIntensity = 0.08 + 0.45 * weight;
    };
    const applyEdgeHighlight = (material: LineMaterial, weight: number) => {
      material.color
        .copy(perimeterEdgeBaseColor)
        .lerp(perimeterEdgeHighlightColor, weight);
      material.opacity = 0.45 + 0.55 * weight;
      material.transparent = true;
      material.linewidth =
        HIGHLIGHT_EDGE_BASE_WIDTH + HIGHLIGHT_EDGE_EXTRA_WIDTH * weight;
    };

    const tri = (a: V3, b: V3, c: V3, mat: THREE.Material) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute(
        "position",
        new THREE.BufferAttribute(
          new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z, c.x, c.y, c.z]),
          3,
        ),
      );
      g.computeVertexNormals();
      return new THREE.Mesh(g, mat);
    };

    const mkEdge = (a: V3, b: V3, material: THREE.LineBasicMaterial) => {
      const g = new THREE.BufferGeometry().setFromPoints([a, b]);
      const l = new THREE.Line(g, material);
      return l;
    };
    const mkThickEdge = (a: V3, b: V3, material: LineMaterial) => {
      const g = new LineGeometry();
      g.setPositions([a.x, a.y, a.z, b.x, b.y, b.z]);
      const l = new Line2(g, material);
      l.computeLineDistances();
      return l;
    };

    grp.add(
      tri(apex, b1, b2, bottomFaceMat),
      tri(apex, b2, b3, rightFaceMat),
      tri(apex, b3, b1, leftFaceMat),
      tri(b1, b3, b2, baseFaceMat),
    );

    const TC = new THREE.Color(cfg.colors.apexEdge),
      PC = new THREE.Color(cfg.colors.baseEdge);
    const apexLeftEdgeMat = new THREE.LineBasicMaterial({ color: TC });
    const apexRightEdgeMat = new THREE.LineBasicMaterial({ color: TC });
    const apexRearEdgeMat = new THREE.LineBasicMaterial({ color: TC });
    const bottomEdgeMat = new LineMaterial({
      color: PC,
      transparent: true,
      opacity: 1,
      linewidth: HIGHLIGHT_EDGE_BASE_WIDTH,
      worldUnits: false,
    });
    const rightEdgeMat = new LineMaterial({
      color: PC,
      transparent: true,
      opacity: 1,
      linewidth: HIGHLIGHT_EDGE_BASE_WIDTH,
      worldUnits: false,
    });
    const leftEdgeMat = new LineMaterial({
      color: PC,
      transparent: true,
      opacity: 1,
      linewidth: HIGHLIGHT_EDGE_BASE_WIDTH,
      worldUnits: false,
    });

    grp.add(
      mkEdge(apex, b1, apexLeftEdgeMat),
      mkEdge(apex, b2, apexRightEdgeMat),
      mkEdge(apex, b3, apexRearEdgeMat),
      mkThickEdge(b1, b2, bottomEdgeMat),
      mkThickEdge(b2, b3, rightEdgeMat),
      mkThickEdge(b3, b1, leftEdgeMat),
    );

    const dotMat = new THREE.MeshBasicMaterial({
      color: cfg.colors.dotColor,
    });
    const dotGeom = new THREE.SphereGeometry(0.12, 16, 16);
    [apex, b1, b2, b3].forEach((v) => {
      const dot = new THREE.Mesh(dotGeom, dotMat);
      dot.position.copy(v);
      grp.add(dot);
    });

    const el = cfg.edgeLabels;
    const mkText = (text: string) => {
      const c2 = document.createElement("canvas"),
        ctx = c2.getContext("2d");
      if (!ctx) return new THREE.Mesh();
      const dpr = 2,
        font = `${el.fontWeight} ${el.fontSize * dpr}px -apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif`;
      ctx.font = font;
      const tw = Math.ceil(ctx.measureText(text).width) + 24,
        th = Math.ceil(el.fontSize * dpr * 1.5) + 16;
      c2.width = tw;
      c2.height = th;
      ctx.clearRect(0, 0, tw, th);
      ctx.font = font;
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, tw / 2, th / 2);
      const tex = new THREE.CanvasTexture(c2);
      tex.minFilter = THREE.LinearFilter;
      return new THREE.Mesh(
        new THREE.PlaneGeometry((el.worldHeight * tw) / th, el.worldHeight),
        new THREE.MeshBasicMaterial({
          map: tex,
          transparent: true,
          opacity: EDGE_LABEL_BASE_OPACITY,
          depthTest: true,
          depthWrite: false,
          side: THREE.DoubleSide,
        }),
      );
    };

    const eMeshes = el.texts.map(mkText);
    const bCtr = new Vec3().add(b1).add(b2).add(b3).divideScalar(3);
    const mid = (a: V3, b: V3) =>
      new Vec3().addVectors(a, b).multiplyScalar(0.5);
    const push = (pt: V3, c: V3, amt: number) =>
      pt
        .clone()
        .add(new Vec3().subVectors(pt, c).normalize().multiplyScalar(amt));

    const ePairs = [
      { m: eMeshes[0], f: b1, t: b2 },
      { m: eMeshes[1], f: b2, t: b3 },
      { m: eMeshes[2], f: b3, t: b1 },
    ];
    const eld: { m: THREE.Mesh; x: V3; ys: V3; ye: V3 }[] = [];

    ePairs.forEach((ep) => {
      const mp = mid(ep.f, ep.t);
      ep.m.position.copy(push(mp, bCtr, el.edgeOffset));
      grp.add(ep.m);
      const xA = new Vec3().subVectors(ep.t, ep.f).normalize();
      const ro = new Vec3(mp.x, 0, mp.z).normalize();
      const rp = ro
        .clone()
        .sub(xA.clone().multiplyScalar(ro.dot(xA)))
        .normalize();
      if (new Vec3().crossVectors(xA, rp).y > 0) xA.negate();
      const ta = new Vec3().subVectors(apex, mp).normalize();
      const ap = ta
        .clone()
        .sub(xA.clone().multiplyScalar(ta.dot(xA)))
        .normalize();
      eld.push({ m: ep.m, x: xA, ys: rp, ye: ap });
    });

    const spr = new THREE.Sprite(
      new THREE.SpriteMaterial({
        transparent: true,
        depthTest: true,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    spr.visible = false;
    spr.scale.set(1.8, 0.45, 1);
    const logoImg = new Image();
    logoImg.crossOrigin = "anonymous";
    logoImg.onload = () => {
      const c2 = document.createElement("canvas");
      c2.width = cfg.logo.canvasWidth;
      c2.height = cfg.logo.canvasHeight;
      const ctx = c2.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(logoImg, 0, 0, c2.width, c2.height);
      const tx = new THREE.CanvasTexture(c2);
      tx.minFilter = THREE.LinearFilter;
      const mat = spr.material as THREE.SpriteMaterial;
      mat.map = tx;
      mat.needsUpdate = true;
      spr.scale.set(
        (cfg.logo.worldHeight * c2.width) / c2.height,
        cfg.logo.worldHeight,
        1,
      );
      spr.visible = true;
    };
    logoImg.onerror = () => console.warn("Failed to load logo image");
    logoImg.src = cfg.logo.svgBase64
      ? `data:image/svg+xml;base64,${cfg.logo.svgBase64}`
      : "/logo/atomix-logo-symbol.svg";
    spr.position.copy(apex).add(v3(0, cfg.logo.verticalOffset, 0));
    grp.add(spr);

    const resize = () => {
      const w = wrapper.clientWidth,
        h = wrapper.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      bottomEdgeMat.resolution.set(w, h);
      rightEdgeMat.resolution.set(w, h);
      leftEdgeMat.resolution.set(w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    const rot = cfg.rotation;
    const aOff = { ...cfg.apexCallout.offset };
    let last = performance.now(),
      afId = 0;

    const animate = (now: number) => {
      afId = requestAnimationFrame(animate);
      const dt = (now - last) / 1000;
      last = now;
      const tgt = scrollProgressRef.current;
      curTRef.current += (tgt - curTRef.current) * rot.sliderSmoothing;
      const rawT = curTRef.current;
      const introT = Math.min(1, rawT / HIGHLIGHT_SEQUENCE_END);
      const t =
        rawT <= HIGHLIGHT_SEQUENCE_END
          ? 0
          : (rawT - HIGHLIGHT_SEQUENCE_END) / (1 - HIGHLIGHT_SEQUENCE_END);

      let leftWeight = 0;
      let rightWeight = 0;
      let bottomWeight = 0;

      if (introT <= HIGHLIGHT_PHASE_1_END) {
        leftWeight = 1;
        rightWeight = 1;
      } else if (introT <= HIGHLIGHT_PHASE_2_END) {
        const blend =
          (introT - HIGHLIGHT_PHASE_1_END) /
          (HIGHLIGHT_PHASE_2_END - HIGHLIGHT_PHASE_1_END);
        leftWeight = 1 - blend;
        rightWeight = 1;
        bottomWeight = blend;
      } else {
        const blend =
          (introT - HIGHLIGHT_PHASE_2_END) / (1 - HIGHLIGHT_PHASE_2_END);
        leftWeight = blend;
        rightWeight = 1 - blend;
        bottomWeight = 1;
      }

      const highlightFade = 1 - Math.min(1, t / HIGHLIGHT_SEQUENCE_FADE);
      leftWeight *= highlightFade;
      rightWeight *= highlightFade;
      bottomWeight *= highlightFade;

      applyFaceHighlight(leftFaceMat, leftWeight);
      applyFaceHighlight(rightFaceMat, rightWeight);
      applyFaceHighlight(bottomFaceMat, bottomWeight);
      applyEdgeHighlight(leftEdgeMat, leftWeight);
      applyEdgeHighlight(rightEdgeMat, rightWeight);
      applyEdgeHighlight(bottomEdgeMat, bottomWeight);

      const edgeLabelWeights = [bottomWeight, rightWeight, leftWeight];
      const shouldForceAllEdgeLabelsVisible = rawT >= HIGHLIGHT_SEQUENCE_END;
      eMeshes.forEach((mesh, index) => {
        const material = mesh.material;
        const opacity = shouldForceAllEdgeLabelsVisible
          ? 1
          : EDGE_LABEL_BASE_OPACITY +
            EDGE_LABEL_ACTIVE_BOOST * edgeLabelWeights[index];
        if (Array.isArray(material)) {
          material.forEach((mat) => {
            if (mat instanceof THREE.MeshBasicMaterial) {
              mat.opacity = opacity;
            }
          });
        } else if (material instanceof THREE.MeshBasicMaterial) {
          material.opacity = opacity;
        }
      });

      if (t > rot.spinThreshold) {
        if (!hasTriggeredInfiniteSpinRef.current) {
          hasTriggeredInfiniteSpinRef.current = true;
          onInfiniteSpinStart?.();
        }
        spinRef.current +=
          rot.spinSpeed *
          dt *
          ((t - rot.spinThreshold) / (1 - rot.spinThreshold));
      } else {
        let w = spinRef.current % (Math.PI * 2);
        if (w > Math.PI) w -= Math.PI * 2;
        if (w < -Math.PI) w += Math.PI * 2;
        spinRef.current =
          w *
          Math.pow(
            0.5,
            dt /
              (rot.decayHalfLife / Math.max(0.001, 1 - t / rot.spinThreshold)),
          );
        if (Math.abs(spinRef.current) < 0.001) spinRef.current = 0;
      }

      grp.rotation.x = rot.startX + (rot.endX - rot.startX) * t;
      grp.rotation.y =
        rot.startY + (rot.endY - rot.startY) * t + spinRef.current;

      eld.forEach((d) => {
        const yA = new Vec3().lerpVectors(d.ys, d.ye, t).normalize();
        const zA = new Vec3().crossVectors(d.x, yA).normalize();
        const xP = new Vec3().crossVectors(yA, zA).normalize();
        const m4 = new THREE.Matrix4();
        m4.makeBasis(xP, yA, zA);
        d.m.quaternion.setFromRotationMatrix(m4);
      });

      renderer.render(scene, camera);
      grp.updateMatrixWorld();
      const ww = wrapper.clientWidth,
        wh = wrapper.clientHeight;
      const proj = (pt: V3) => {
        const v = pt.clone();
        grp.localToWorld(v);
        v.project(camera);
        return { x: (v.x * 0.5 + 0.5) * ww, y: (-v.y * 0.5 + 0.5) * wh };
      };

      const ac = cfg.apexCallout;
      const aOp = Math.max(
        0,
        Math.min(1, (t - ac.fadeStart) / (ac.fadeEnd - ac.fadeStart)),
      );
      const pA = proj(apex);
      if (apexRef.current) {
        apexRef.current.style.opacity = String(aOp);
        const ar = apexRef.current.getBoundingClientRect();
        const a = clamp(
          pA.x + aOff.dx,
          pA.y + aOff.dy,
          ar.width,
          ar.height,
          ww,
          wh,
          cfg.padding,
        );
        apexRef.current.style.transform = `translate(${a.x}px,${a.y}px)`;
      }
    };

    afId = requestAnimationFrame(animate);
    onReady?.({
      setSlider: (v: number) => {
        scrollProgressRef.current = clamp01(v);
      },
    });

    return () => {
      cancelAnimationFrame(afId);
      window.removeEventListener("resize", resize);
      grp.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (Array.isArray(m.material)) m.material.forEach((mt) => mt.dispose());
        else if (m.material) m.material.dispose();
      });
      renderer.dispose();
    };
  }, [cfg, initialSliderValue, onInfiniteSpinStart, onReady]);

  const grad = `linear-gradient(135deg,${cfg.colors.sliderThumbA},${cfg.colors.sliderThumbB})`;

  return (
    <div
      className={className}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        maxWidth: `${cfg.maxWidth}px`,
        fontFamily:
          "-apple-system,BlinkMacSystemFont,'Segoe UI',system-ui,sans-serif",
      }}
    >
      <style>{`.as::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:${grad};cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.2)}.as::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:${grad};cursor:pointer;border:none;box-shadow:0 2px 6px rgba(0,0,0,.2)}`}</style>
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100%",
          height: `${cfg.canvasHeight}px`,
          overflow: "visible",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
};

export default TestPyramidNewDesign;
export { DEFAULTS as TEST_PYRAMID_DEFAULTS };
