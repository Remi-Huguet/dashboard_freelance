"use client";

import { JSX } from "react";

export function useCircularLoader() {
  function circularLoader(): JSX.Element {
    return (
      <div
        className={`border-4 border-gray-300 border-t-transparent rounded-full animate-spin`}
        style={{ width: "24px", height: "24px" }}
      />
    );
  }

  return circularLoader;
}