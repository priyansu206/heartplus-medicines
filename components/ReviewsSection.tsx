"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "motion/react";

const reviews = [
  {
    name: "Rajesh Kumar",
    initials: "RK",
    rating: 5,
    text: "Docters listened to every concern patiently and prescribed the right treatment. My son who had severe temperatures and cold that lasted weeka was resolved in just 4 days. Highly recommend!",
    service: "General Medicine",
  },
  {
    name: "Swapna Mohanty",
    initials: "SM",
    rating: 4.5,
    text: "Brought my son here for a checkup. The pediatrician was incredibly gentle and friendly. My kid didn't even cry! The clinic is clean and well-maintained.",
    service: "Pediatrics",
  },
  {
    name: "Mohammad Irfan",
    initials: "MI",
    rating: 5,
    text: "Best cardiology consultation I've had in Durgapur. The ECG was done on the spot and the doctor explained everything in detail. Very professional staff.",
    service: "Cardiology",
  },
  {
    name: "Sasmita Patra",
    initials: "SP",
    rating: 5,
    text: "I was nervous about my kidney test results, but the nephrologist here was so reassuring. Clear explanations, no unnecessary tests. Felt truly cared for.",
    service: "Nephrology",
  },
  {
    name: "Biswajit Sahu",
    initials: "BS",
    rating: 5,
    text: "Got my blood sample collected here — quick, hygienic, and the reports were delivered the same evening. The online booking saved me so much time.",
    service: "Blood Collection",
  },
  {
    name: "Lipika Das",
    initials: "LD",
    rating: 4,
    text: "Suffering from migraines for years, the neurologist here finally gave me a treatment that works. The clinic environment is calm and the wait times are short.",
    service: "Neurology",
  },
];

function ReviewCard({ review, index }: { review: (typeof reviews)[0]; index: number }) {
  const delay = index * 0.08;
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, x: isEven ? -20 : 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_48px_rgba(59,130,246,0.1)] hover:bg-white/[0.07] hover:border-blue-400/20 transition-all duration-300 flex flex-col relative overflow-hidden"
    >
      {/* Hover glow accent */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/[0.06] group-hover:to-purple-500/[0.04] transition-all duration-500 pointer-events-none" />

      {/* Quote icon */}
      <div className="absolute top-6 right-6 text-white/[0.08] group-hover:text-blue-400/20 transition-colors duration-300">
        <Quote size={28} />
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-4 relative z-10">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-amber-400 text-amber-400 group-hover:scale-110 transition-transform duration-200" style={{ transitionDelay: `${i * 30}ms` }} />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-white/60 leading-relaxed font-medium flex-1 mb-6 relative z-10">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Reviewer */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/[0.08] relative z-10">
        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 font-black text-sm shrink-0 group-hover:scale-110 transition-transform duration-300">
          {review.initials}
        </div>
        <div>
          <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-300">{review.name}</p>
          <p className="text-xs text-white/40 font-medium">{review.service}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ReviewsSection() {
  return (
    <section id="reviews" className="py-20 md:py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-14"
        >
          <span className="bg-white/[0.06] backdrop-blur-md text-blue-300 border border-white/[0.08] px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-sm inline-block mb-4">
            Patient Stories
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Trusted by <span className="text-blue-400">Hundreds</span>
          </h2>
          <p className="mt-4 text-white/40 font-medium max-w-lg mx-auto">
            Real experiences from patients who chose Heart Plus for their healthcare needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <ReviewCard key={index} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
