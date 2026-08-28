"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { useScrollReveal, useStaggerReveal } from "@/hooks/useScrollReveal";
import { useScrollTextReveal } from "@/hooks/useScrollTextReveal";
import { useScrollMorph } from "@/hooks/useScrollMorph";
import { TiltCard } from "@/components/ui/TiltCard";

const GOOGLE_MAPS_REVIEWS_URL =
  "https://www.google.com/maps/place/Heartplus+medicines/@20.4772522,85.9000926,17z/data=!3m1!4b1!4m6!3m5!1s0x3a19130fb5d454cb:0x541a3b5e1a4eeb12!8m2!3d20.4772522!4d85.9026675!16s%2Fg%2F11xsxzhzsq?entry=ttu&g_ep=EgoyMDI2MDgyNS4wIKXMDSoASAFQAw%3D%3D";

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
    text: "Excellent Experience... Good Behaviour.... I am fully Satisfied 👌👍",
  },
  {
    name: "rabinarayan mohanty",
    date: "2 weeks ago",
    rating: 5,
    text: "Had a very good experience at Heart Plus Clinic. The doctors were caring and professional. A special appreciation for PHARMACY: which maintains a wide range of medicines and healthcare products covering almost all specialties. It is truly convenient for patients to find prescribed medicines under one roof, saving both time and effort. The pharmacy staff are knowledgeable, courteous and always willing to help. The Pathology team : are efficient and well-organized. The staffs are also courteous and supportive throughout & visionary for expanding world class diagnostic & laboratory in future. Overall, I am highly satisfied with the quality of care and services provided. Keep up the excellent work efficiently and effectively.....",
  },
  {
    name: "Chaitanya Sukidas",
    date: "2 weeks ago",
    rating: 5,
    text: "good staff behavior , good discount i mean 15% is still better than 10 % so yeah go for it 👌👍",
  },
  {
    name: "Sidhanta kumar Dakua",
    date: "3 weeks ago",
    rating: 5,
    text: "Cuttack's best clinic,and any time doctor available or friendly service do visit heartplus medicines. 💖👌👍",
  },
];

// Bento layout — the longest review features across 2 columns / 2 rows,
// the rest fill the remaining cells in a 3-column grid.
const SPANS = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
  "md:col-span-1",
];

export default function ReviewSection() {
  const headerRef = useScrollReveal({ y: 30, duration: 0.7 });
  const headingRef = useScrollTextReveal({ duration: 0.7, stagger: 0.05 });
  const gridRef = useStaggerReveal<HTMLDivElement>(".bento-card", {
    y: 60,
    stagger: 0.08,
    duration: 0.7,
  });

  const ratingMorphRef = useScrollMorph<HTMLDivElement>({
    scale: [0.9, 1.05],
    y: [20, 0],
    start: "top 80%",
    end: "center center",
  });

  return (
    <section className="py-24 relative reviews-bg" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div ref={headerRef} className="text-center max-w-2xl mx-auto mb-16">
          <span className="bg-white/[0.06] backdrop-blur-md text-rose-300 border border-white/[0.08] px-6 py-3 rounded-full text-sm font-black uppercase tracking-widest shadow-md">
            Patient Feedback
          </span>
          <h2 ref={headingRef} className="text-3xl sm:text-4xl font-bold text-white mt-6">
            What Our Patients Say
          </h2>
          <div ref={ratingMorphRef} className="mt-6 inline-flex items-center gap-3 bg-white/[0.06] backdrop-blur-md px-5 py-3 rounded-full border border-white/[0.08]">
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
        </div>

        {/* Bento grid — staggered GSAP reveal on scroll */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 md:auto-rows-[minmax(190px,auto)] gap-6 lg:gap-8"
        >
          {/* Featured card — the longest review, spanning 2x2 */}
          <TiltCard
            className="bento-card"
            maxTilt={5}
            glareOpacity={0.12}
          >
            <BentoCard
              review={googleReviews[2]}
              featured
              className="md:col-span-2 md:row-span-2"
            />
          </TiltCard>

          {googleReviews
            .map((review, i) => ({ review, i }))
            .filter(({ i }) => i !== 2)
            .map(({ review, i }) => (
              <TiltCard key={i} className="bento-card" maxTilt={6} glareOpacity={0.1}>
                <BentoCard review={review} className={SPANS[i]} />
              </TiltCard>
            ))}

          {/* Summary tile — fills the last bento cell */}
          <TiltCard className="bento-card" maxTilt={6} glareOpacity={0.12}>
            <div className="group h-full bg-gradient-to-br from-rose-500/[0.12] to-purple-500/[0.08] backdrop-blur-xl rounded-3xl border border-white/[0.08] p-6 flex flex-col items-start justify-center gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:border-rose-400/30 transition-colors duration-300 relative overflow-hidden">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-white">5.0</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
              </div>
              <p className="text-sm font-medium text-white/60 leading-relaxed">
                Rated by{" "}
                <span className="text-white font-bold">22+ patients</span> on
                Google. Trusted care, every step of the way.
              </p>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

function BentoCard({
  review,
  featured = false,
  className = "",
}: {
  review: Review;
  featured?: boolean;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded((v) => !v);
  };

  const clampClass = expanded
    ? "line-clamp-none"
    : featured
    ? "line-clamp-[6]"
    : "line-clamp-[4]";

  const needsToggle = review.text.length > (featured ? 220 : 130);

  return (
    <a
      href={GOOGLE_MAPS_REVIEWS_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group block bg-white/[0.04] backdrop-blur-xl rounded-3xl border border-white/[0.08] flex flex-col justify-between shadow-[0_8px_32px_rgba(0,0,0,0.2)] hover:bg-white/[0.07] hover:border-rose-400/20 hover:shadow-[0_16px_48px_rgba(0,0,0,0.3)] transition-all duration-300 transform-gpu relative overflow-hidden ${
        featured ? "p-8 sm:p-10" : "p-6"
      } ${className}`}
    >
      {/* Hover glow */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-500/0 to-rose-500/0 group-hover:from-rose-500/[0.06] group-hover:to-purple-500/[0.04] transition-all duration-500 pointer-events-none" />

      <div className="relative z-10 flex flex-col">
        {/* Rating Stars */}
        <div className={`flex text-amber-400 mb-4 ${featured ? "gap-1" : ""}`}>
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className={`fill-current ${featured ? "w-5 h-5" : "w-4 h-4"}`} />
          ))}
        </div>

        {/* Review Text */}
        <p className={`text-white/60 leading-relaxed whitespace-pre-line ${clampClass} ${
          featured ? "text-base sm:text-lg" : "text-sm"
        }`}>
          &quot;{review.text}&quot;
        </p>

        {/* Read more toggle */}
        {needsToggle && (
          <span
            onClick={toggle}
            className="inline-flex items-center gap-1 mt-3 text-xs font-bold uppercase tracking-wider text-rose-300 hover:text-rose-200 transition-colors"
          >
            {expanded ? "Show less" : "Read more"}
            <span className="text-sm leading-none">{expanded ? "−" : "+"}</span>
          </span>
        )}
      </div>

      {/* Reviewer Details */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/[0.06] mt-auto">
        <div className="flex flex-col min-w-0">
          <span className="font-semibold text-sm text-white group-hover:text-rose-300 transition-colors duration-300 truncate">
            {review.name}
          </span>
          {review.badge && (
            <span className="text-xs font-medium text-rose-400">
              {review.badge}
            </span>
          )}
        </div>
        <span className="text-xs text-white/40 font-medium shrink-0 ml-3">
          {review.date}
        </span>
      </div>
    </a>
  );
}
