"use client";

import { JSX } from "react";

export function useSkeletonLoader(height: string = "100px", width: string = "100%") {
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