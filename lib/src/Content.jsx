"use client";

import { action } from "./action";

export const Content = () => {
  return (
    <div>
      <h1>Content</h1>
      <button
        onClick={() => {
          action();
        }}
      >
        Press me
      </button>
    </div>
  );
};
