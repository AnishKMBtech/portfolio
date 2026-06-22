import React from 'react';

export const ExperiencePage = () => {
  return (
    <div className="min-h-screen w-full bg-neutral-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-display font-bold text-white mb-8">Experience</h2>

        <div className="space-y-8">
          <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50">
            <h3 className="text-2xl font-bold text-neutral-300 mb-2">Internship Trainee — Nokia Research Intern, SRM Centre of Excellence</h3>
            <p className="text-sm text-zinc-400 mb-4">Nov 2025 - Jan 2026</p>
            <ul className="list-disc pl-5 text-zinc-200 space-y-2">
              <li>Cleaned and transformed 3+ hours of machine-generated time series data from Deprag screwing systems, including screw insertion thresholds, torque ranges, and operational parameters across 19-screw SSD assembly cycles, ensuring reliable inputs for a predictive maintenance model.</li>
              <li>Monitored a live production data stream and built visualizations tracking torque ranges across all 19 screws per SSD assembly batch, enabling real-time visibility into screw cycle behavior and anomalies.</li>
              <li>Contributed to delivering a digital dashboard and predictive maintenance system for the screwing assembly line, enabling automated fault detection and reducing reliance on manual quality checks.</li>
            </ul>
          </div>

          <div className="bg-zinc-800/50 p-6 rounded-2xl border border-zinc-700/50">
            <h3 className="text-2xl font-bold text-neutral-300 mb-2">AI & ML Intern (Product and Research) — ISMO Bio-Photonics, IIT Madras Research Park</h3>
            <p className="text-sm text-zinc-400 mb-4">Aug 2025 - Oct 2025</p>
            <ul className="list-disc pl-5 text-zinc-200 space-y-2">
              <li>Feature engineered and expanded an embryology blastocyst grading dataset from 1,500 to 22,000 samples through image augmentation, enabling robust training across growth-day time series labels and quality grades.</li>
              <li>Built heatmap visualizations to map the 6x3x3 sample space distribution across blastocyst growth stages and quality grades, and created evaluation metric reports to track model accuracy.</li>
              <li>Developed a hierarchical classification pipeline grading blastocyst embryos across a 6x3x3 label space (54 categories spanning growth days and quality tiers), improving model accuracy and output reliability. Fine-tuned image models like SigLip, ResNet, and VLMs to fit the quality grading dataset and moved the demo to production via Hugging Face Spaces and Firebase.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePage;
