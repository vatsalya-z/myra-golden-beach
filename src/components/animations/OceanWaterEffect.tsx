"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { OCEAN_VERTEX_SHADER, OCEAN_FRAGMENT_SHADER } from "./oceanWaterShaders";

interface OceanWaterEffectProps {
  intensity?: number;
  className?: string;
}

interface UniformLocations {
  uTime: WebGLUniformLocation | null;
  uResolution: WebGLUniformLocation | null;
  uEntrance: WebGLUniformLocation | null;
  uScroll: WebGLUniformLocation | null;
  uPointer: WebGLUniformLocation | null;
  uPointerStrength: WebGLUniformLocation | null;
  uIntensity: WebGLUniformLocation | null;
}

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export function OceanWaterEffect({
  intensity = 1,
  className = "",
}: OceanWaterEffectProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [renderMode, setRenderMode] = useState<"webgl" | "fallback">("webgl");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const entranceRef = useRef({ progress: 0 });
  const initialMountRouteRef = useRef(true);
  const intensityRef = useRef(intensity);
  intensityRef.current = intensity;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subtle liquid ripple refresh on client route changes
  useEffect(() => {
    if (!mounted || reducedMotion || renderMode !== "webgl") return;
    if (initialMountRouteRef.current) {
      initialMountRouteRef.current = false;
      return;
    }

    entranceRef.current.progress = 0.45;
    const tween = gsap.to(entranceRef.current, {
      progress: 1,
      duration: 1.15,
      ease: "power2.out",
      overwrite: true,
    });

    return () => {
      tween.kill();
    };
  }, [pathname, mounted, reducedMotion, renderMode]);

  // Main WebGL initialization, GSAP entrance, and 60fps RAF loop
  useEffect(() => {
    if (!mounted || reducedMotion || renderMode !== "webgl") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const contextOptions: WebGLContextAttributes = {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: "low-power",
    };

    const gl = (canvas.getContext("webgl2", contextOptions) ||
      canvas.getContext("webgl", contextOptions) ||
      canvas.getContext(
        "experimental-webgl",
        contextOptions
      )) as WebGLRenderingContext | null;

    if (!gl) {
      setRenderMode("fallback");
      return;
    }

    let program: WebGLProgram | null = null;
    let vertexShader: WebGLShader | null = null;
    let fragmentShader: WebGLShader | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let uniforms: UniformLocations | null = null;
    let isDisposed = false;
    let rafId = 0;

    const initPipeline = (): boolean => {
      vertexShader = compileShader(gl, gl.VERTEX_SHADER, OCEAN_VERTEX_SHADER);
      fragmentShader = compileShader(
        gl,
        gl.FRAGMENT_SHADER,
        OCEAN_FRAGMENT_SHADER
      );
      if (!vertexShader || !fragmentShader) return false;

      program = gl.createProgram();
      if (!program) return false;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return false;
      }

      gl.useProgram(program);

      // Single oversized fullscreen triangle
      positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 3, -1, -1, 3]),
        gl.STATIC_DRAW
      );

      const posLoc = gl.getAttribLocation(program, "aPosition");
      if (posLoc < 0) return false;
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

      uniforms = {
        uTime: gl.getUniformLocation(program, "uTime"),
        uResolution: gl.getUniformLocation(program, "uResolution"),
        uEntrance: gl.getUniformLocation(program, "uEntrance"),
        uScroll: gl.getUniformLocation(program, "uScroll"),
        uPointer: gl.getUniformLocation(program, "uPointer"),
        uPointerStrength: gl.getUniformLocation(program, "uPointerStrength"),
        uIntensity: gl.getUniformLocation(program, "uIntensity"),
      };

      gl.disable(gl.DEPTH_TEST);
      gl.disable(gl.CULL_FACE);
      gl.clearColor(0, 0, 0, 0);

      return true;
    };

    if (!initPipeline()) {
      setRenderMode("fallback");
      return;
    }

    let deviceScaleIntensity = intensityRef.current;

    const updateCanvasSize = () => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      const rawDpr = window.devicePixelRatio || 1;

      let dprCap = 1.5;
      let resolutionScale = 0.75;
      let deviceFactor = 1.0;

      if (w < 768) {
        dprCap = 1.0;
        resolutionScale = 0.5;
        deviceFactor = 0.82;
      } else if (w < 1024) {
        dprCap = 1.25;
        resolutionScale = 0.62;
        deviceFactor = 0.9;
      }

      const dpr = Math.min(rawDpr, dprCap);
      const targetWidth = Math.max(1, Math.floor(w * dpr * resolutionScale));
      const targetHeight = Math.max(1, Math.floor(h * dpr * resolutionScale));

      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
      }

      deviceScaleIntensity = intensityRef.current * deviceFactor;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    updateCanvasSize();

    // GSAP Cinematic Entrance Sweep (Top -> Bottom)
    entranceRef.current.progress = 0;
    const entranceTween = gsap.to(entranceRef.current, {
      progress: 1,
      duration: 2.3,
      ease: "power2.out",
      overwrite: true,
    });

    // Damped scroll and pointer states
    let targetScroll =
      window.scrollY / Math.max(window.innerHeight || 1, 1);
    let currentScroll = targetScroll;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    let targetPointerX = 0.5;
    let targetPointerY = 0.5;
    let currentPointerX = 0.5;
    let currentPointerY = 0.5;
    let pointerStrength = 0;

    const handleScroll = () => {
      targetScroll = window.scrollY / Math.max(window.innerHeight || 1, 1);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isFinePointer || e.pointerType !== "mouse") return;
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      targetPointerX = e.clientX / w;
      targetPointerY = e.clientY / h;
      pointerStrength = Math.min(1, pointerStrength + 0.35);
    };

    let elapsed = 0;
    let lastNow = performance.now();

    const renderFrame = (now: number) => {
      if (isDisposed || document.hidden) return;

      const dt = Math.min(Math.max((now - lastNow) / 1000, 0), 0.05);
      lastNow = now;
      elapsed += dt;

      // Smooth interpolation
      currentScroll += (targetScroll - currentScroll) * Math.min(1, dt * 6.0);
      currentPointerX +=
        (targetPointerX - currentPointerX) * Math.min(1, dt * 7.5);
      currentPointerY +=
        (targetPointerY - currentPointerY) * Math.min(1, dt * 7.5);
      pointerStrength *= Math.exp(-dt * 2.2);
      if (pointerStrength < 0.001) pointerStrength = 0;

      if (program && uniforms) {
        gl.useProgram(program);
        gl.uniform1f(uniforms.uTime, elapsed);
        gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
        gl.uniform1f(uniforms.uEntrance, entranceRef.current.progress);
        gl.uniform1f(uniforms.uScroll, currentScroll);
        gl.uniform2f(uniforms.uPointer, currentPointerX, currentPointerY);
        gl.uniform1f(uniforms.uPointerStrength, pointerStrength);
        gl.uniform1f(uniforms.uIntensity, deviceScaleIntensity);

        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.drawArrays(gl.TRIANGLES, 0, 3);
      }

      rafId = window.requestAnimationFrame(renderFrame);
    };

    const startLoop = () => {
      if (isDisposed || document.hidden || rafId !== 0) return;
      lastNow = performance.now();
      rafId = window.requestAnimationFrame(renderFrame);
    };

    const stopLoop = () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
        rafId = 0;
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    let contextLostFallbackTimer: ReturnType<typeof setTimeout> | null = null;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      stopLoop();
      contextLostFallbackTimer = setTimeout(() => {
        if (!isDisposed) {
          setRenderMode("fallback");
        }
      }, 1500);
    };

    const handleContextRestored = () => {
      if (contextLostFallbackTimer) {
        clearTimeout(contextLostFallbackTimer);
        contextLostFallbackTimer = null;
      }
      if (isDisposed) return;
      if (initPipeline()) {
        updateCanvasSize();
        startLoop();
      } else {
        setRenderMode("fallback");
      }
    };

    window.addEventListener("resize", updateCanvasSize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    if (isFinePointer) {
      window.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
    }
    document.addEventListener("visibilitychange", handleVisibilityChange);
    canvas.addEventListener("webglcontextlost", handleContextLost);
    canvas.addEventListener("webglcontextrestored", handleContextRestored);

    startLoop();

    return () => {
      isDisposed = true;
      stopLoop();
      entranceTween.kill();
      if (contextLostFallbackTimer) {
        clearTimeout(contextLostFallbackTimer);
      }
      window.removeEventListener("resize", updateCanvasSize);
      window.removeEventListener("scroll", handleScroll);
      if (isFinePointer) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      canvas.removeEventListener("webglcontextrestored", handleContextRestored);

      // Safe cleanup without WEBGL_lose_context so React 19 StrictMode remounts cleanly
      gl.bindBuffer(gl.ARRAY_BUFFER, null);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (vertexShader) gl.deleteShader(vertexShader);
      if (fragmentShader) gl.deleteShader(fragmentShader);
      if (program) gl.deleteProgram(program);
    };
  }, [mounted, reducedMotion, renderMode]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[25] pointer-events-none select-none overflow-hidden ${className}`}
    >
      {mounted && !reducedMotion && renderMode === "webgl" && (
        <canvas
          ref={canvasRef}
          data-ocean-water="webgl"
          className="block w-full h-full pointer-events-none"
        />
      )}

      {mounted && !reducedMotion && renderMode === "fallback" && (
        <div
          data-ocean-water="fallback"
          className="relative w-full h-full pointer-events-none overflow-hidden"
        >
          <svg
            className="absolute w-0 h-0"
            width="0"
            height="0"
            focusable="false"
          >
            <defs>
              <filter id="myra-ocean-turbulence">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.012 0.022"
                  numOctaves="2"
                  seed="7"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="18"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* Top -> Bottom primary fallback water layer */}
          <div
            className="absolute -inset-x-8 -inset-y-16 ocean-fallback-vertical opacity-25"
            style={{
              filter: "url(#myra-ocean-turbulence)",
              background:
                "radial-gradient(ellipse 65% 45% at 30% 25%, rgba(232,246,247,0.45), transparent 65%), radial-gradient(ellipse 60% 50% at 70% 70%, rgba(11,114,133,0.22), transparent 68%)",
            }}
          />

          {/* Left -> Right secondary fallback caustic layer */}
          <div
            className="absolute -inset-x-16 -inset-y-8 ocean-fallback-horizontal opacity-20"
            style={{
              background:
                "conic-gradient(from 120deg at 50% 50%, rgba(249,251,252,0.28), rgba(11,114,133,0.14), rgba(232,246,247,0.32), rgba(11,114,133,0.12), rgba(249,251,252,0.28))",
            }}
          />
        </div>
      )}
    </div>
  );
}
