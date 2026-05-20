export type NavigationDirection = "forward" | "back";

export function getNavigationState(direction: NavigationDirection) {
  return { direction };
}
