"use client";

import React from "react";

interface ButtonProps {
  onClick: () => void;
  title: string;
}

export default function Button({ onClick, title }: ButtonProps) {
  return (
    <button
      className="bg-main text-white px-4 py-2 rounded transition-colors hover:bg-hover"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
