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

export default function ReviewSection() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200/60" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sm font-semibold tracking-wider text-rose-600 uppercase">
            Patient Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2">
            What Our Patients Say
          </h2>
          <div className="mt-4 inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
            <span className="text-2xl font-black text-slate-900">5.0</span>
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-600">
              (22+ Google Reviews)
            </span>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {googleReviews.map((review, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex text-amber-400 mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line mb-6">
                  "{review.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100 mt-auto">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-slate-900">
                    {review.name}
                  </span>
                  {review.badge && (
                    <span className="text-xs font-medium text-rose-600">
                      {review.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-400 font-medium">
                  {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}