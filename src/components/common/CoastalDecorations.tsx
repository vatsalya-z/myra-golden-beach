import { useId } from "react";
import { cn } from "@/lib/utils";

interface CoastalDecorationsProps {
  palmSide?: "left" | "right";
  waveSide?: "right" | "left";
  palmCorner?: "top" | "bottom" | "both";
  tone?: "light" | "dark";
  showPalm?: boolean;
  showWave?: boolean;
  palmSpeed?: "normal" | "fast";
}

function TropicalPalmSvg({
  tone,
  className,
}: {
  tone: "light" | "dark";
  className?: string;
}) {
  const primaryFill = tone === "dark" ? "#E8F6F7" : "#063B49";
  const secondaryFill = tone === "dark" ? "#8EC5CC" : "#2D6A73";

  return (
    <svg
      viewBox="0 0 360 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Main arching coconut palm frond */}
      <g fill={primaryFill} stroke={primaryFill}>
        <path
          d="M-12 290 C46 218, 128 136, 266 56"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M18 252 C14 198, 28 148, 56 106 C38 158, 30 205, 28 244 Z" strokeWidth="0.6" />
        <path d="M40 228 C44 172, 66 120, 102 78 C78 132, 62 180, 52 218 Z" strokeWidth="0.6" />
        <path d="M66 202 C76 146, 104 98, 146 60 C116 112, 92 158, 78 192 Z" strokeWidth="0.6" />
        <path d="M94 176 C110 124, 142 82, 188 48 C152 96, 124 138, 106 166 Z" strokeWidth="0.6" />
        <path d="M124 150 C144 104, 180 68, 226 42 C188 84, 158 120, 136 142 Z" strokeWidth="0.6" />
        <path d="M156 124 C180 86, 214 58, 256 40 C220 72, 188 100, 168 118 Z" strokeWidth="0.6" />
        <path d="M192 98 C216 70, 246 52, 282 42 C248 64, 218 82, 202 94 Z" strokeWidth="0.6" />
        <path d="M226 76 C248 58, 272 48, 300 46 C272 58, 248 68, 234 74 Z" strokeWidth="0.6" />

        <path d="M36 240 C78 232, 122 238, 164 258 C118 248, 78 246, 44 248 Z" strokeWidth="0.6" />
        <path d="M62 214 C108 202, 154 206, 198 226 C150 216, 106 214, 70 222 Z" strokeWidth="0.6" />
        <path d="M90 188 C136 172, 184 174, 228 192 C178 184, 134 186, 98 196 Z" strokeWidth="0.6" />
        <path d="M118 162 C164 144, 212 144, 256 160 C206 154, 162 158, 126 168 Z" strokeWidth="0.6" />
        <path d="M148 136 C192 118, 238 116, 278 130 C230 126, 188 130, 156 142 Z" strokeWidth="0.6" />
        <path d="M180 112 C220 94, 260 92, 296 102 C252 100, 216 106, 188 116 Z" strokeWidth="0.6" />
        <path d="M214 88 C248 74, 280 72, 308 80 C272 78, 242 84, 222 92 Z" strokeWidth="0.6" />
      </g>

      {/* Companion secondary tropical palm sprig */}
      <g fill={secondaryFill} stroke={secondaryFill} opacity="0.82">
        <path
          d="M-16 322 C30 282, 92 246, 184 218"
          strokeWidth="1.9"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M12 298 C22 254, 44 218, 76 190 C54 226, 36 260, 22 292 Z" strokeWidth="0.5" />
        <path d="M40 278 C56 236, 82 204, 118 180 C90 214, 68 244, 50 272 Z" strokeWidth="0.5" />
        <path d="M70 258 C92 222, 120 196, 156 178 C126 206, 100 232, 80 254 Z" strokeWidth="0.5" />
        <path d="M104 242 C126 212, 154 194, 188 182 C158 202, 132 222, 112 238 Z" strokeWidth="0.5" />
        <path d="M46 280 C84 282, 120 292, 154 312 C116 300, 82 294, 52 288 Z" strokeWidth="0.5" />
        <path d="M78 262 C116 260, 154 268, 186 286 C148 276, 114 272, 84 268 Z" strokeWidth="0.5" />
        <path d="M112 244 C146 240, 180 246, 210 260 C174 252, 144 250, 118 250 Z" strokeWidth="0.5" />
      </g>
    </svg>
  );
}

function OceanWavesSvg({
  tone,
  className,
}: {
  tone: "light" | "dark";
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const gradPrimary = `wave-primary-${uid}`;
  const gradMid = `wave-mid-${uid}`;
  const gradSoft = `wave-soft-${uid}`;

  const c1 = tone === "dark" ? "#E8F6F7" : "#0B7285";
  const c2 = tone === "dark" ? "#D9EEF2" : "#5B8990";
  const c3 = tone === "dark" ? "#5B8990" : "#063B49";

  return (
    <svg
      viewBox="0 0 420 340"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradPrimary} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} stopOpacity="0" />
          <stop offset="45%" stopColor={c1} stopOpacity="0.9" />
          <stop offset="100%" stopColor={c2} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gradMid} x1="0%" y1="15%" x2="100%" y2="85%">
          <stop offset="0%" stopColor={c2} stopOpacity="0" />
          <stop offset="50%" stopColor={c2} stopOpacity="0.85" />
          <stop offset="100%" stopColor={c3} stopOpacity="0" />
        </linearGradient>
        <linearGradient id={gradSoft} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor={c3} stopOpacity="0" />
          <stop offset="48%" stopColor={c2} stopOpacity="0.8" />
          <stop offset="100%" stopColor={c1} stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d="M36 44 C122 12, 206 94, 294 64 C348 46, 386 24, 430 40"
        stroke={`url(#${gradPrimary})`}
        strokeWidth="1.25"
        strokeLinecap="round"
      />
      <path
        d="M18 92 C110 56, 198 144, 292 108 C350 86, 392 64, 434 82"
        stroke={`url(#${gradMid})`}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6 142 C106 102, 196 192, 296 154 C354 132, 396 108, 436 128"
        stroke={`url(#${gradPrimary})`}
        strokeWidth="1.35"
        strokeLinecap="round"
      />
      <path
        d="M16 194 C116 156, 206 242, 304 202 C360 180, 398 158, 434 176"
        stroke={`url(#${gradSoft})`}
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M30 246 C126 212, 214 290, 310 250 C364 228, 400 208, 432 224"
        stroke={`url(#${gradMid})`}
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        d="M48 296 C140 266, 224 334, 318 298 C368 278, 402 260, 430 272"
        stroke={`url(#${gradSoft})`}
        strokeWidth="1.15"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CoastalDecorations({
  palmSide = "left",
  waveSide = "right",
  palmCorner = "top",
  tone = "light",
  showPalm = true,
  showWave = true,
  palmSpeed = "normal",
}: CoastalDecorationsProps) {
  const topPalmAnim =
    palmSpeed === "fast" ? "animate-palm-float-fast" : "animate-palm-float";
  const bottomPalmAnim =
    palmSpeed === "fast" ? "animate-palm-float-fast" : "animate-palm-float-slow";
  const palmMirror = palmSide === "right" ? "-scale-x-100" : "";
  const palmHorizontalPos =
    palmSide === "left"
      ? "-left-3 sm:-left-6 lg:-left-8"
      : "-right-3 sm:-right-6 lg:-right-8";

  const waveMirror = waveSide === "left" ? "-scale-x-100" : "";
  const waveHorizontalPos =
    waveSide === "right"
      ? "-right-10 sm:-right-10"
      : "-left-10 sm:-left-10";

  const showTopPalm = showPalm && (palmCorner === "top" || palmCorner === "both");
  const showBottomPalm = showPalm && (palmCorner === "bottom" || palmCorner === "both");

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 z-0 overflow-hidden"
    >
      {/* Tropical Botanical Palm Leaves */}
      {showTopPalm && (
        <div
          className={cn(
            "absolute -top-2 sm:-top-3 lg:-top-4 w-44 sm:w-64 lg:w-88 opacity-[0.16] sm:opacity-[0.18] lg:opacity-[0.20]",
            palmHorizontalPos
          )}
        >
          <div className={cn("-scale-y-100", palmMirror)}>
            <div className={topPalmAnim}>
              <TropicalPalmSvg tone={tone} className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}

      {showBottomPalm && (
        <div
          className={cn(
            "absolute -bottom-2 sm:-bottom-3 lg:-bottom-4 w-44 sm:w-64 lg:w-88 opacity-[0.16] sm:opacity-[0.18] lg:opacity-[0.20]",
            palmHorizontalPos
          )}
        >
          <div className={palmMirror}>
            <div className={bottomPalmAnim}>
              <TropicalPalmSvg tone={tone} className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}

      {/* Abstract Flowing Ocean Wave Lines */}
      {showWave && (
        <div
          className={cn(
            "absolute top-1/2 -translate-y-1/2 w-48 sm:w-72 lg:w-[420px] opacity-[0.14] sm:opacity-[0.16] lg:opacity-[0.20]",
            waveHorizontalPos
          )}
        >
          <div className={waveMirror}>
            <div className="animate-wave-flow">
              <OceanWavesSvg tone={tone} className="w-full h-auto" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
