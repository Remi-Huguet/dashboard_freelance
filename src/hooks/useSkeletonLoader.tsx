"use client";

import { JSX } from "react";

export function useSkeletonLoader(height: string, width: string) {
  function skeletonLoader(): JSX.Element {
    return (
      <div
        className={`bg-gray-400 rounded animate-pulse`}
        style={{ width, height }}
      />
    );
  }

  return skeletonLoader;
}