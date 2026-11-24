export function triggerHaptic(pattern: number | number[] = 10): void {
  try {
    if (
      typeof navigator !== "undefined" &&
      typeof navigator.vibrate === "function"
    ) {
      navigator.vibrate(pattern);
    }
  } catch {
    // Ignore on browsers/platforms without vibration support
  }
}
