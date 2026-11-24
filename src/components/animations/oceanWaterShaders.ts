export const OCEAN_VERTEX_SHADER = `
attribute vec2 aPosition;
varying vec2 vUv;

void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const OCEAN_FRAGMENT_SHADER = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

varying vec2 vUv;

uniform float uTime;
uniform vec2 uResolution;
uniform float uEntrance;
uniform float uScroll;
uniform vec2 uPointer;
uniform float uPointerStrength;
uniform float uIntensity;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float vnoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);

  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float waterHeight(vec2 pos, float t) {
  // Primary wave layers flowing Top -> Bottom (pos.y - speed * t)
  float wV1 = sin((pos.y * 3.1 - t * 0.55) + sin(pos.x * 1.65 + t * 0.18) * 0.65) * 0.45;
  float wV2 = sin((pos.y * 5.2 - t * 0.82) + cos(pos.x * 2.5 - t * 0.22) * 0.45 + 1.7) * 0.27;
  float wV3 = sin((pos.y * 8.4 - t * 1.15) + sin(pos.x * 3.6 + pos.y * 0.9 - t * 0.28) * 0.35 + 3.1) * 0.14;

  // Secondary wave layers flowing Left -> Right (pos.x - speed * t)
  float wH1 = sin((pos.x * 3.3 - t * 0.44) + sin(pos.y * 1.75 - t * 0.20) * 0.55) * 0.35;
  float wH2 = sin((pos.x * 5.8 - t * 0.68) + cos(pos.y * 2.8 - t * 0.24) * 0.40 + 2.3) * 0.21;
  float wH3 = sin((pos.x * 9.1 - t * 0.96) + sin(pos.y * 3.9 - pos.x * 0.7 - t * 0.31) * 0.30 + 0.9) * 0.11;

  // Domain-warped organic noise (pure ALU)
  vec2 warp = vec2(wH1 * 0.22 + wH2 * 0.10, wV1 * 0.22 + wV2 * 0.10);
  float n1 = vnoise((pos + warp) * 3.4 - vec2(t * 0.18, t * 0.28));
  float n2 = vnoise((pos - warp * 0.6) * 6.8 - vec2(t * 0.25, t * 0.38));

  return wV1 + wV2 + wV3 + wH1 + wH2 + wH3 + (n1 - 0.5) * 0.62 + (n2 - 0.5) * 0.32;
}

// Organic shallow-ocean caustic filament web (non-singular & GPU-safe)
float causticWeb(vec2 pos, float t, vec2 disp) {
  // Layer A: Primary Top -> Bottom flowing caustic cells
  vec2 p1 = pos * 4.2 - vec2(t * 0.14, t * 0.42) + disp * 0.38;
  float nA = vnoise(p1 * 0.85 + vec2(0.0, -t * 0.18));
  float wA1 = abs(sin(p1.y + sin(p1.x * 1.18 + t * 0.26) * 0.85 + nA * 2.1));
  float wA2 = abs(sin(p1.x * 0.92 - p1.y * 0.48 + cos(p1.y * 1.15 - t * 0.22) * 0.8 + nA * 1.9));
  float fA1 = pow(clamp(1.0 - wA1, 0.0, 1.0), 4.2);
  float fA2 = pow(clamp(1.0 - wA2, 0.0, 1.0), 4.2);
  float webA = clamp((fA1 + fA2) * 0.45 + fA1 * fA2 * 1.65, 0.0, 1.0);

  // Layer B: Secondary Left -> Right counter-drifting finer caustic filaments
  vec2 p2 = pos * 6.5 - vec2(t * 0.36, t * 0.22) - disp * 0.28 + vec2(3.7, 1.9);
  float nB = vnoise(p2 * 0.9 - vec2(t * 0.16, 0.0));
  float wB1 = abs(sin(p2.x + cos(p2.y * 1.25 + t * 0.30) * 0.78 + nB * 2.0));
  float wB2 = abs(sin(p2.y * 0.86 + p2.x * 0.52 + sin(p2.x * 1.05 - t * 0.24) * 0.72 + nB * 1.8));
  float fB1 = pow(clamp(1.0 - wB1, 0.0, 1.0), 4.8);
  float fB2 = pow(clamp(1.0 - wB2, 0.0, 1.0), 4.8);
  float webB = clamp((fB1 + fB2) * 0.42 + fB1 * fB2 * 1.55, 0.0, 1.0);

  return clamp(webA * 0.65 + webB * 0.45, 0.0, 1.0);
}

void main() {
  // Top-left coordinate system: y = 0 at TOP, y = 1 at BOTTOM; x = 0 at LEFT, x = 1 at RIGHT
  vec2 screenUv = vec2(vUv.x, 1.0 - vUv.y);
  float aspect = uResolution.x / max(uResolution.y, 1.0);
  vec2 p = vec2(screenUv.x * aspect, screenUv.y);

  // Subtle scroll-linked advection
  vec2 flowPos = vec2(p.x, p.y + uScroll * 0.38);

  // Surface height & finite difference normal
  float eps = 0.015;
  float hC = waterHeight(flowPos, uTime);
  float hL = waterHeight(flowPos - vec2(eps, 0.0), uTime);
  float hR = waterHeight(flowPos + vec2(eps, 0.0), uTime);
  float hU = waterHeight(flowPos - vec2(0.0, eps), uTime);
  float hD = waterHeight(flowPos + vec2(0.0, eps), uTime);

  // Subtle interactive pointer ripple perturbation (desktop fine pointer only)
  float pointerRipple = 0.0;
  vec2 pointerGrad = vec2(0.0);
  if (uPointerStrength > 0.001) {
    vec2 pointerPos = vec2(uPointer.x * aspect, uPointer.y);
    vec2 diff = p - pointerPos;
    float pDist = length(diff);
    float wave = sin(pDist * 36.0 - uTime * 4.8);
    float decay = exp(-pDist * 7.0);
    pointerRipple = wave * decay * uPointerStrength;
    pointerGrad = (diff / max(pDist, 0.001)) * cos(pDist * 36.0 - uTime * 4.8) * decay * uPointerStrength * 0.45;
  }

  vec3 N = normalize(vec3(
    (hL - hR) * 0.55 + pointerGrad.x,
    (hU - hD) * 0.55 + pointerGrad.y,
    1.0
  ));

  vec2 disp = N.xy;

  // Dual overlapping underwater caustic webs
  float caustics = causticWeb(flowPos, uTime, disp);
  caustics = clamp(caustics + max(pointerRipple, 0.0) * 0.30, 0.0, 1.0);

  // Specular sunlight glints & refractive slope shading
  float spec = pow(max(dot(N, normalize(vec3(-0.32, -0.45, 0.83))), 0.0), 14.0);
  float slope = clamp(dot(N, normalize(vec3(0.45, 0.58, 0.68))) * 0.5 + 0.5, 0.0, 1.0);
  float trough = smoothstep(0.62, 0.16, slope);

  // Flowing directional wave ribbons (Top -> Bottom & Left -> Right)
  float waveBandV = pow(max(0.0, sin((flowPos.y * 5.4 - uTime * 0.72) + sin(flowPos.x * 2.1 + uTime * 0.25) * 0.75 + disp.x * 1.4)), 3.0);
  float waveBandH = pow(max(0.0, sin((flowPos.x * 4.8 - uTime * 0.58) + cos(flowPos.y * 1.9 - uTime * 0.22) * 0.65 + disp.y * 1.2)), 3.5);
  float waveRipples = clamp(waveBandV * 0.55 + waveBandH * 0.40, 0.0, 1.0);

  // Cinematic Entrance Wave Sweep (Top -> Bottom + soft concentric ripple)
  float frontY = mix(-0.16, 1.26, uEntrance);
  float waveEdge = frontY + sin(p.x * 3.8 - uTime * 1.4) * 0.042 + cos(p.x * 7.1 + uTime * 0.85) * 0.018;
  float revealMask = smoothstep(waveEdge + 0.16, waveEdge - 0.05, screenUv.y);
  revealMask = max(revealMask, smoothstep(0.95, 1.0, uEntrance));

  float entranceFade = 1.0 - smoothstep(0.72, 1.0, uEntrance);
  float crestBand = exp(-pow((screenUv.y - waveEdge) * 8.5, 2.0)) * entranceFade;

  float rDist = length(p - vec2(0.5 * aspect, 0.26));
  float rippleRadius = uEntrance * 1.25;
  float rippleRing = max(0.0, sin((rDist - rippleRadius) * 26.0)) *
                     exp(-abs(rDist - rippleRadius) * 8.5) *
                     (1.0 - smoothstep(0.55, 0.95, uEntrance));

  // Andhra Coastal Retreat Palette
  vec3 deepTeal   = vec3(0.024, 0.231, 0.286); // #063B49
  vec3 oceanBlue  = vec3(0.043, 0.447, 0.522); // #0B7285
  vec3 lightAqua  = vec3(0.910, 0.965, 0.969); // #E8F6F7
  vec3 pearlWhite = vec3(0.976, 0.984, 0.988); // #F9FBFC
  vec3 sandGold   = vec3(0.965, 0.769, 0.416); // #F6C46A

  // Balanced dual-tone optical blend:
  // Deep ocean blue/teal refractive troughs (visible on light Pearl White sections)
  // + Luminous Aqua/Pearl caustics & sunlight glints (visible on dark coastal imagery)
  vec3 troughColor = mix(oceanBlue, deepTeal, trough * 0.55);
  vec3 highlightColor = mix(lightAqua, pearlWhite, clamp(caustics * 0.65 + spec * 0.35, 0.0, 1.0));
  highlightColor = mix(highlightColor, sandGold, clamp(spec * 0.18, 0.0, 0.18));

  float highlightWeight = clamp(caustics * 0.75 + spec * 0.85 + waveRipples * 0.35 + crestBand * 0.85, 0.0, 1.0);
  vec3 finalColor = mix(troughColor, highlightColor, highlightWeight);

  // Subtle center corridor easing preserves sharp typography readability
  float centerEase = mix(0.76, 1.0, smoothstep(0.12, 0.88, length(screenUv - 0.5) * 1.25));

  float bodyVeil = 0.032 + trough * 0.075;
  float waveA = waveRipples * 0.068;
  float causticA = caustics * 0.145;
  float specA = spec * 0.16;
  float entranceBoost = crestBand * 0.22 + rippleRing * 0.14;

  float finalAlpha = clamp((bodyVeil + waveA + causticA + specA) * revealMask * centerEase + entranceBoost, 0.0, 0.32) * uIntensity;

  // Premultiplied alpha output
  gl_FragColor = vec4(finalColor * finalAlpha, finalAlpha);
}
`;
