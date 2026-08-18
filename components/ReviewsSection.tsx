"use client";

import { motion, type Variants } from "motion/react";
import { Star } from "lucide-react";

export interface Review {
  name: string;
  date: string;
  badge?: string;
  text: string;
  rating: number;
}

export const googleReviews: Review[] = [
  {
    name: "Shibasish Panigrahi",
    badge: "Local Guide",
    date: "7 days ago",
    rating: 5,
    text: "Exceptional experience at Heartplus. The entire medical team was professional, attentive, and genuinely compassionate throughout my visit. The facility was spotless, and I received top-quality care.",
  },
  {
    name: "SUJIT KUMAR NAYAK",
    date: "2 weeks ago",
    rating: 5,
    text: "Excellent Experience... Good Behaviour.... I am fully Satisfied 👌 👍",
  },
  {
    name: "rabinarayan mohanty",
    date: "2 weeks ago",
    rating: 5,
    text: "Had a very good experience at Heart Plus Clinic. The doctors were caring and professional. A special appreciation for PHARMACY: which maintains a wide range of medicines and healthcare products covering almost all specialties. It is truly convenient for patients to find prescribed medicines under one roof, saving both time and effort. The pharmacy staff are knowledgeable, courteous and always willing to help. The Pathology team : are efficient and well-organized. The staffs are also courteous and supportive throughout & visionary for expanding world class diagnostic & laboratory in future. Overall, I am highly satisfied with the quality of care and services provided. Keep up the excellent work efficiently and effectively.....",
  },
  {
    name: "Braja Kishore",
    date: "2 weeks ago",
    rating: 5,
    text: "Dr Sushant bhuyan good doctor, He is very simple and gentle in his behaviour, He will give sufficient time to each patient, And very friendly pleasant staff ready to help and listen",
  },
  {
    name: "Chaitanya Sukidas",
    date: "2 weeks ago",
    rating: 5,
    text: "good staff behavior , good discount i mean 15% is still better than 10 % so yeah go for it 👌 👍",
  },
  {
    name: "Sidhanta kumar Dakua",
    date: "3 weeks ago",
    rating: 5,
    text: "Cuttack's best clinic,and any time doctor available or friendly service do visit heartplus medicines. 🫶 👌 👍",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

const reviewsGridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const reviewCardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function ReviewSection() {
  return (
    <section className="py-24 relative bg-gradient-to-b from-[#06060f] via-[#0a0a1a] to-[#0d1025]" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="bg-white/[0.06] backdrop-blur-md text-rose-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">
            Patient Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-6">
            What Our Patients Say
          </h2>
          <div className="mt-6 inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-md px-5 py-3 rounded-full border border-white/[0.08]">
            <span className="text-2xl font-black text-white">5.0</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/50">
              (22+ Google Reviews)
            </span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <motion.div
          variants={reviewsGridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {googleReviews.map((review, index) => (
            <motion.div
              key={index}
              variants={reviewCardVariants}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 25 } }}
              className="group bg-white/[0.04] backdrop-blur-xl p-6 rounded-3xl border border-white/[0.08] flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.07] hover:border-rose-400/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-300 transform-gpu relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/[0.06] group-hover:to-purple-500/[0.04] transition-all duration-500 pointer-events-none" />

              <div className="relative z-10">
                {/* Rating Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-white/60 text-sm leading-relaxed whitespace-pre-line mb-6">
                  &quot;{review.text}&quot;
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-white group-hover:text-rose-300 transition-colors duration-300">
                    {review.name}
                  </span>
                  {review.badge && (
                    <span className="text-xs font-medium text-rose-400">
                      {review.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-white/40 font-medium">
                  {review.date}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
