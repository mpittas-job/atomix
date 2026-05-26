"use client";

import { Renderer, Program, Mesh, Triangle } from "ogl";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export interface InkSpillHandle {
  setProgress: (p: number) => void;
}

interface InkSpillProps {
  color?: string;
  speed?: number;
  scale?: number;
  edgeSoftness?: number;
  maxDpr?: number;
  paused?: boolean;
}

function getCappedDpr(maxDpr: number) {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, maxDpr);
}

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uProgress;
uniform vec3 uColor;
uniform float uScale;
uniform float uEdge;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
  vec2 p = (uv - 0.5) * aspect;

  // Slow drifting noise for organic ink edge
  float n1 = fbm(p * uScale + vec2(uTime * 0.06, uTime * 0.04));
  float n2 = fbm(p * uScale * 1.7 - vec2(uTime * 0.03, uTime * 0.05));
  float n = (n1 * 0.65 + n2 * 0.35);

  // Bottom bias: highest at bottom so ink starts from the bottom and spills upward
  float bottomBias = 1.0 - uv.y; // 1.0 at bottom, 0.0 at top

  // Combined "ink field" — higher means more likely to be inked
  float field = n * 0.8 + bottomBias * 1.2;

  // Map progress (0..1) to threshold; lower threshold = more ink visible.
  // Range is chosen so progress=0 -> mask is fully 0 (field max ~ 1.7),
  // and progress=1 -> mask is fully 1 (so the slide ends as a solid color).
  float prog = clamp(uProgress, 0.0, 1.0);
  float threshold = mix(2.5, -0.5, prog);
  float mask = smoothstep(threshold, threshold + uEdge, field);

  // Hard guarantee: no leftover ink at progress=0, full cover at progress=1.
  mask *= smoothstep(0.0, 0.05, prog);
  mask = mix(mask, 1.0, smoothstep(0.95, 1.0, prog));

  gl_FragColor = vec4(uColor, mask);
}
`;

const InkSpill = forwardRef<InkSpillHandle, InkSpillProps>(function InkSpill(
  { color = "#EBEFF2", speed = 1, scale = 2.0, edgeSoftness = 0.18, maxDpr = 1.25, paused = false },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);

  useImperativeHandle(
    ref,
    () => ({
      setProgress: (p: number) => {
        progressRef.current = Math.max(0, Math.min(1, p));
      },
    }),
    [],
  );

  useEffect(() => {
    if (!containerRef.current || paused) return;
    const container = containerRef.current;
    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: false,
      dpr: getCappedDpr(maxDpr),
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [gl.canvas.width, gl.canvas.height] },
        uProgress: { value: 0 },
        uColor: { value: hexToVec3(color) },
        uScale: { value: scale },
        uEdge: { value: edgeSoftness },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const resizeObserver = new ResizeObserver(() => {
      renderer.dpr = getCappedDpr(maxDpr);
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = [gl.canvas.width, gl.canvas.height];
    });
    resizeObserver.observe(container);

    container.appendChild(gl.canvas);

    let animationFrameId = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let lastRenderedProgress = -1;
    let hasRenderedFinalFrame = false;

    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries.some((entry) => entry.isIntersecting);
      },
      { threshold: 0.01 },
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    function update(time: number) {
      animationFrameId = requestAnimationFrame(update);

      if (!isVisible || !isPageVisible) return;

      const progress = progressRef.current;

      if (progress <= 0) {
        lastRenderedProgress = 0;
        hasRenderedFinalFrame = false;
        return;
      }

      const isAnimating = progress > 0 && progress < 1;
      const progressChanged = progress !== lastRenderedProgress;

      if (!isAnimating && !progressChanged) {
        if (progress >= 1 && hasRenderedFinalFrame) return;
      }

      if (isAnimating) {
        program.uniforms.uTime.value = time * 0.001 * speed;
        hasRenderedFinalFrame = false;
      }

      program.uniforms.uProgress.value = progress;
      renderer.render({ scene: mesh });
      lastRenderedProgress = progress;

      if (progress >= 1) {
        hasRenderedFinalFrame = true;
      }
    }
    animationFrameId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resizeObserver.disconnect();
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [color, speed, scale, edgeSoftness, maxDpr, paused]);

  return <div ref={containerRef} className="w-full h-full" />;
});

export default InkSpill;
