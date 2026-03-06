"use client";
import React from "react";
import { motion } from "motion/react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const HorizontalTimeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="w-full py-10 px-4 md:px-8">
      <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Connecting Line */}
        <div className="absolute top-4 left-4 md:left-0 right-0 h-[2px] bg-neutral-700 hidden md:block" />
        
        {data.map((item, index) => (
          <div key={index} className="relative flex-1 flex flex-col items-center md:items-start w-full">
            {/* Dot */}
            <div className="w-8 h-8 rounded-full bg-neutral-800 border-4 border-neutral-950 flex items-center justify-center z-10 mb-4">
              <div className="w-3 h-3 rounded-full bg-neutral-500" />
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-neutral-300 mb-4">
              {item.title}
            </h3>
            
            {/* Content Box */}
            <div className="w-full">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
