import React from 'react';

const audiences = [
  { title: "Founders", color: "from-cyan-400 to-blue-500" },
  { title: "Enterprise Ops", color: "from-purple-400 to-indigo-600" },
  { title: "Cross-Functional Teams", color: "from-teal-400 to-green-500" },
  { title: "Privacy-First Companies", color: "from-pink-400 to-violet-600" },
  { title: "Future-Facing Creators", color: "from-yellow-300 to-orange-500" },
];

export default function WhoWeServe() {
  return (
    <section className="bg-black py-24 px-4 text-white">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-6xl font-headline font-bold mb-4">
          Who We Serve
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Deployable Intelligence for Builders, Strategists, and Scaling Teams
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
        {audiences.map((aud, idx) => (
          <div
            key={idx}
            className={`w-48 h-48 bg-gradient-to-br ${aud.color} 
            rounded-xl bg-opacity-20 border border-white/20 
            backdrop-blur-sm hover:scale-105 transition-transform 
            flex items-center justify-center text-center`}
          >
            <span className="font-headline text-lg tracking-wide">
              {aud.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
