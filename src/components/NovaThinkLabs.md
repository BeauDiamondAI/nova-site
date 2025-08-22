{/* DESKTOP VIEW */}
      <div className="hidden sm:grid gap-10 mt-20 max-w-7xl mx-auto justify-center lg:grid-cols-3 auto-rows-auto">
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-5 shadow-xl hover:shadow-cyan-500/30 border border-cyan-600/20 hover:border-cyan-400/50 hover:scale-[1.02] transition-all duration-300"
          >
            <video
              ref={(el: HTMLVideoElement | null) => {
                if (el) {
                  videoRefs.current[index] = el;
                }
              }}
              loop
              muted
              playsInline
              className="rounded-xl mb-4 w-full h-56 object-cover brightness-90"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => e.currentTarget.pause()}
            >
              <source src={card.image} type="video/mp4" />
            </video>
            <h3 className="text-xl font-semibold mb-2 text-white">
              {card.headline}
            </h3>
            <p className="text-base text-gray-300" style={{ lineHeight: "1.6" }}>
              {card.subheadline}
            </p>
          </motion.div>
        ))}
      </div>