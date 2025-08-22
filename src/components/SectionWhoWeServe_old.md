'use client';

import React from 'react';

const SectionWhoWeServe = () => {
  return (
    <section className="bg-black text-white py-20 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-headline font-bold mb-6 text-center animate-slideUpFast">
          Who We Serve
        </h2>
        <p className="text-xl md:text-2xl text-center text-gray-300 mb-10">Deployable Intelligence for Builders, Strategists, and Scaling Teams</p>
        <p className="text-lg md:text-xl text-gray-300 text-center max-w-3xl mx-auto mb-16 whitespace-pre-line">
          We’re building a suite of deployable tools designed for creators, operators, and enterprise teams who need more than dashboards or prompt wrappers.

These systems are built to solve real-world bottlenecks—fusing adaptive reasoning, automation, and interface clarity into tools that actually move things forward.
        </p>
        <div className="grid gap-12 md:grid-cols-2">

          <div className="animate-slideUpFast">
            <h3 className="text-2xl md:text-3xl font-semibold font-headline mb-4">Founders, creators, and consultants</h3>
            <p className="text-gray-300 text-base md:text-lg">For those who need operational clarity, positioning precision, and business systems that think with them—not just for them.</p>
          </div>
    
          <div className="animate-slideUpFast">
            <h3 className="text-2xl md:text-3xl font-semibold font-headline mb-4">Internal operators & cross-functional teams</h3>
            <p className="text-gray-300 text-base md:text-lg">AI tools that support real-time execution, workflow orchestration, and decision-making across product, marketing, and ops.</p>
          </div>
    
          <div className="animate-slideUpFast">
            <h3 className="text-2xl md:text-3xl font-semibold font-headline mb-4">Enterprise organizations</h3>
            <p className="text-gray-300 text-base md:text-lg">Deployable intelligence built to integrate directly into your business infrastructure, with cognitive-level logic far beyond traditional analytics.</p>
          </div>
    
          <div className="animate-slideUpFast">
            <h3 className="text-2xl md:text-3xl font-semibold font-headline mb-4">Privacy-first companies</h3>
            <p className="text-gray-300 text-base md:text-lg">Zero-trust compatible deployments for environments requiring absolute data discretion—VPC-integrated by default.</p>
          </div>
    
          <div className="animate-slideUpFast">
            <h3 className="text-2xl md:text-3xl font-semibold font-headline mb-4">Future-facing creators and operators</h3>
            <p className="text-gray-300 text-base md:text-lg">Soon to gain access to NovaThink’s branded intelligence and marketing systems—purpose-built for performance, content, and strategic execution.</p>
          </div>
    
        </div>
      </div>
    </section>
  );
};

export default SectionWhoWeServe;
