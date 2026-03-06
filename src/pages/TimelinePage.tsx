import React from "react";
import { Timeline } from "@/components/ui/timeline";

export const TimelinePage = () => {
  const data = [
    {
      title: "2023-2024",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Joined SRM Easwari Engineering College, Ramapuram, Chennai and started my B.Tech in Artificial Intelligence. New to programming actually but good at understanding the concepts visually and the reverse engineering and workflows understanding was very good. Parallely AI was blooming.
          </p>
        </div>
      ),
    },
    {
      title: "2024-2025",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Started attending GDG Chennai events, CNCF Chennai events and online meetups keynotes product release tech events and gathered much info about AI what is AI and why etc. Attended Harvard Live x2025 and Stanford Code in Place 2025. Taken few other courses related to AI and Python, worked with the SRM Centre of Excellence Research Cell for the Nokia research projects for predictive maintenance made dashboards and databases connection and developed few full stack web applications. Learned to build chat bots too.
          </p>
        </div>
      ),
    },
    {
      title: "2025-2026",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Build projects and won my first competition in the project expo 2025 at SaRaM under edge computing and embedded AI and started to use frameworks like Ollama, llama.cpp and started my journey in edge AI and llama.cpp made me to use AI in CPUs locally and llama.cpp was very volatile. Studied linear algebra for probabilistic modeling few DSA and databases concepts and AI basics and data basics and ML basics and LLM architecture.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8">
            Completed Cloud Practitioner and GitHub Foundation certifications. Learned Docker and Kubernetes and made Arch Linux as primary, hosted many tech events as the president of the Data Varse club of our colleges for school and college students about what is AI and what is the current shift and presented what I got to understand.
          </p>
        </div>
      ),
    },
    {
      title: "2026-Present",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-4">
            Started advance Python and databases, tried with open sources but all repos are getting spamed due to AI so moved on to understanding the systems design and architecture and exploring the curiosity every day.
          </p>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen w-full bg-neutral-950">
      <Timeline data={data} />
    </div>
  );
};
