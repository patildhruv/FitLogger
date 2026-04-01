export const haptic = {
  tick: () => navigator.vibrate?.(10),
  tap: () => navigator.vibrate?.(20),
  medium: () => navigator.vibrate?.(40),
  success: () => navigator.vibrate?.([20, 30, 20, 30, 40]),
  warning: () => navigator.vibrate?.([30, 50, 30]),
};
