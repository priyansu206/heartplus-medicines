import Link from "next/link";
import { CONTACT } from "@/lib/constants";

export default function Footer() {
  return (
    <footer
      id="reach-us"
      className="bg-black/40 text-white/40 py-16 text-center md:text-left rounded-t-[3rem] mt-12 relative z-10 border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link
            href="/"
            className="text-2xl text-white font-extrabold mb-2 hover:text-blue-300 transition-colors"
          >
            Heart Plus
          </Link>
          <p className="text-sm font-medium">Care you can believe in.</p>
        </div>

        {/* Address & Email */}
        <div className="flex flex-col items-center md:items-start gap-4 text-sm font-medium">
          <p className="flex items-center gap-2 hover:text-white transition cursor-default">
            <span className="text-lg">&#128205;</span> {CONTACT.address}
          </p>
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="text-lg">&#9993;&#65039;</span> {CONTACT.email}
          </a>
        </div>

        {/* Phone Numbers */}
        <div className="flex flex-col items-center md:items-end gap-4 text-sm font-medium">
          <a
            href={`tel:${CONTACT.phone.clinic}`}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="text-lg">&#128222;</span> Clinic: {CONTACT.phone.clinic}
          </a>
          <a
            href={`tel:${CONTACT.phone.personal}`}
            className="flex items-center gap-2 hover:text-white transition"
          >
            <span className="text-lg">&#128241;</span> Personal: {CONTACT.phone.personal}
          </a>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-white/[0.06] text-sm text-center font-medium">
        &copy; {new Date().getFullYear()} Heart Plus Medicines & Poly Clinic. All
        rights reserved.
      </div>
    </footer>
  );
}
