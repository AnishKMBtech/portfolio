"use client";
import React from "react";
import { motion } from "motion/react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const VerticalTimeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="w-full max-w-4xl mx-auto pt-32 pb-16 px-4">
      <h2 className="text-4xl font-display font-bold text-white mb-16 text-center glass p-6 rounded-2xl inline-block w-full">
        Chronicles of Technical Evolution
      </h2>
      
      <div className="relative space-y-12">
        {/* Vertical Line */}
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-neutral-800" />
        
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="relative flex flex-row gap-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            {/* Dot */}
            <div className="absolute left-4 w-4 h-4 rounded-full bg-neutral-700 border-4 border-neutral-950 -ml-2 mt-2 z-10" />
            
            {/* Content */}
            <div className="flex-1 pl-12">
              <h3 className="text-2xl font-bold text-neutral-300 mb-4">
                {item.title}
              </h3>
              <div className="text-neutral-400">
                {item.content}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
