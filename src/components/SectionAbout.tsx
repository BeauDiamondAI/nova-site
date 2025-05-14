export default function SectionAbout() {
  return (
    <section className="relative w-full text-white pt-32 pb-16 sm:pb-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
      
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/images/SectionAboutBlueWave.webp')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.4,
          }}
        ></div>
      </div>

      {/* Optional Divider Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-px bg-cyan-400 opacity-20 blur-xl z-10" />

      {/* Text Content Layer */}
      <div className="relative z-20 max-w-4xl">
        <h2 className="text-4xl sm:text-5xl font-bold font-headline mb-8">
          Built to Reason. <br /> Designed to Scale.
        </h2>
        <p className="text-lg mb-6">
          NovaThink is a U.S.-based AI infrastructure company engineering secure,
          enterprise-grade systems for reasoning, analysis, and strategic intelligence.
        </p>
        <p className="text-lg mb-6">
          We’re building advanced cognitive architectures that blend multi-step logic
          frameworks with large language models — primarily OpenAI GPT models via API —
          unlocking advanced systems for real-time decision intelligence and autonomous
          execution—purpose-built for operators, analysts, researchers, and executives
          alike.
        </p>
        <p className="text-lg mb-6">
          To ensure resilience and continuity, NovaThink’s systems are also designed to
          interface with select open-source models, enabling multi-model redundancy across
          critical operations.
        </p>
        <p className="text-lg mb-6">
          All AI interactions are executed securely inside a fully isolated, encrypted
          Virtual Private Cloud (VPC), ensuring end-to-end privacy, compliance, and
          control.
        </p>
        <p className="text-lg">
          Our infrastructure is built from the ground up to meet SOC 2 and ISO 27001
          compliance standards — and beyond.
        </p>
      </div>

      {/* Accent Divider */}
      <div className="h-[3px] mx-auto mt-12 bg-cyan-400 rounded-full shadow-[0_0_20px_5px_rgba(34,211,238,0.5)] w-1/2" />
    </section>
  );
}
