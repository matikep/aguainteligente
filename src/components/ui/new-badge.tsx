"use client";

import { Sparkles } from "lucide-react";

export function NewBadge() {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-purple-100 text-purple-700 text-sm font-medium animate-pulse-slow">
      <Sparkles className="w-4 h-4" />
      <span>Novedad</span>
    </div>
  );
} 