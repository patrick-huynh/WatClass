"use client";

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  type?: "submit";
  title: string;
}

export default function Button({ onClick, title, type }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-main text-white px-4 py-2 rounded transition-colors hover:bg-hover"
      onClick={onClick}
    >
      {title}
    </button>
  );
}
