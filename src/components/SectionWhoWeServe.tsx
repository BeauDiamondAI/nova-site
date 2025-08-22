import React from "react";

export default function SectionWhoWeServe() {
  return (
    <section className="relative bg-black text-white py-24 px-4 sm:px-8 md:px-16 overflow-hidden">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-4xl sm:text-5xl font-bold font-orbitron mb-4">
          Who We Serve
        </h2>
        <h3 className="text-lg text-gray-400 mb-6">
          Deployable Intelligence for Builders, Strategists, and Scaling Teams
        </h3>
        <p className="text-base text-gray-400">
          We’re building a suite of deployable tools designed for creators,
          operators, and enterprise teams who need more than dashboards or
          prompt wrappers. These systems are built to solve real-world
          bottlenecks—fusing adaptive reasoning, automation, and interface
          clarity into tools that actually move things forward.
        </p>
      </div>

      {/* Constellation Layout */}
      <div className="relative max-w-7xl mx-auto h-[800px] hidden md:block">
        {/* Node 1 */}
        <div className="absolute top-0 left-1/4 w-64">
          <h4 className="font-semibold text-white mb-2">
            Founders, creators, and consultants
          </h4>
          <p className="text-sm text-gray-400">
            For those who need operational clarity, positioning precision, and
            business systems that think with them—not just for them.
          </p>
        </div>

        {/* Node 2 */}
        <div className="absolute top-0 right-0 w-64">
          <h4 className="font-semibold text-white mb-2">
            Internal operators & cross-functional teams
          </h4>
          <p className="text-sm text-gray-400">
            AI tools that support real-time execution, workflow orchestration,
            and decision-making across product, marketing, and ops.
          </p>
        </div>

        {/* Node 3 */}
        <div className="absolute top-1/2 left-0 w-64">
          <h4 className="font-semibold text-white mb-2">
            Enterprise organizations
          </h4>
          <p className="text-sm text-gray-400">
            Deployable intelligence built to integrate directly into your
            business infrastructure, with cognitive-level logic far beyond
            traditional analytics.
          </p>
        </div>

        {/* Node 4 */}
        <div className="absolute top-1/2 right-12 w-64">
          <h4 className="font-semibold text-white mb-2">
            Privacy-first companies
          </h4>
          <p className="text-sm text-gray-400">
            Zero-trust compatible deployments for environments requiring
            absolute data discretion—VPC-integrated by default.
          </p>
        </div>

        {/* Node 5 */}
        <div className="absolute bottom-0 left-1/3 w-72">
          <h4 className="font-semibold text-white mb-2">
            Future-facing creators and operators
          </h4>
          <p className="text-sm text-gray-400">
            Soon to gain access to NovaThink’s branded intelligence and
            marketing systems—purpose-built for performance, content, and
            strategic execution.
          </p>
        </div>
      </div>

      {/* Mobile Fallback: stacked nodes */}
      <div className="space-y-10 md:hidden max-w-xl mx-auto">
        <div>
          <h4 className="font-semibold text-white mb-2">
            Founders, creators, and consultants
          </h4>
          <p className="text-sm text-gray-400">
            For those who need operational clarity, positioning precision, and
            business systems that think with them—not just for them.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">
            Internal operators & cross-functional teams
          </h4>
          <p className="text-sm text-gray-400">
            AI tools that support real-time execution, workflow orchestration,
            and decision-making across product, marketing, and ops.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">
            Enterprise organizations
          </h4>
          <p className="text-sm text-gray-400">
            Deployable intelligence built to integrate directly into your
            business infrastructure, with cognitive-level logic far beyond
            traditional analytics.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">
            Privacy-first companies
          </h4>
          <p className="text-sm text-gray-400">
            Zero-trust compatible deployments for environments requiring
            absolute data discretion—VPC-integrated by default.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">
            Future-facing creators and operators
          </h4>
          <p className="text-sm text-gray-400">
            Soon to gain access to NovaThink’s branded intelligence and
            marketing systems—purpose-built for performance, content, and
            strategic execution.
          </p>
        </div>
      </div>
    </section>
  );
}