import React from 'react';

export default function SectionWhoWeServe() {
  return (
    <section className="bg-black text-white py-24 px-6 sm:px-12">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold font-orbitron mb-4">
          Who We Serve
        </h2>
        <p className="text-lg text-gray-300 mb-4">
          Deployable Intelligence for Builders, Strategists, and Scaling Teams
        </p>
        <p className="text-gray-400 max-w-3xl mx-auto">
          We’re building a suite of deployable tools designed for creators, operators, and enterprise teams who need more than dashboards or prompt wrappers. These systems are built to solve real-world bottlenecks—fusing adaptive reasoning, automation, and interface clarity into tools that actually move things forward.
        </p>
      </div>

      <div className="mt-16 max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-12 px-4 sm:px-0">
        <div>
          <h3 className="text-xl font-bold mb-2">Founders, creators, and consultants</h3>
          <p className="text-gray-300">
            For those who need operational clarity, positioning precision, and business systems that think with them—not just for them.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Internal operators & cross-functional teams</h3>
          <p className="text-gray-300">
            AI tools that support real-time execution, workflow orchestration, and decision-making across product, marketing, and ops.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Enterprise organizations</h3>
          <p className="text-gray-300">
            Deployable intelligence built to integrate directly into your business infrastructure, with cognitive-level logic far beyond traditional analytics.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Privacy-first companies</h3>
          <p className="text-gray-300">
            Zero-trust compatible deployments for environments requiring absolute data discretion—VPC-integrated by default.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Future-facing creators and operators</h3>
          <p className="text-gray-300">
            Soon to gain access to NovaThink’s branded intelligence and marketing systems—purpose-built for performance, content, and strategic execution.
          </p>
        </div>
      </div>
    </section>
  );
}
