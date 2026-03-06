import React from 'react';
import { motion } from 'framer-motion';

export const BlogsPage = () => {
  return (
    <motion.div
      className="max-w-4xl mx-auto px-6 py-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-4xl font-bold mb-8">Blogs</h1>
      <p className="text-zinc-400">Placeholder for blog posts.</p>
    </motion.div>
  );
};
