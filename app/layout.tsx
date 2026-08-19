import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://heartplus-medicines-henna.vercel.app/"),
  title: {
    default: "Heart Plus Medicines & Poly Clinic",
    template: "%s | Heart Plus Medicines & Poly Clinic",
  },
  description:
    "Comprehensive healthcare services in Durgapur — General Medicines, Cardiology, Neurology, Pediatrics, and more. Book your appointment today.",
  keywords: [
    "poly clinic",
    "doctor",
    "appointment",
    "Durgapur",
    "cardiology",
    "neurology",
    "pediatrics",
    "nephrology",
    "urology",
    "gastroenterology",
    "blood test",
  ],
  openGraph: {
    title: "Heart Plus Medicines & Poly Clinic",
    description:
      "Expert healthcare services in Durgapur. Book your appointment online.",
    type: "website",
    locale: "en_IN",
  },
  verification: {
    google: "7xbrrhDs5NYV-wPTjfbofv0fQtosFa4WU6rwnU7Cgrc",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} h-full antialiased overflow-x-clip`}
    >
      <body className="min-h-full flex flex-col overflow-x-clip">
        <SmoothScrollProvider>
        <ScrollProgress />
        <div aria-hidden="true" className="site-bg-anim" />
        {children}
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "Heart Plus Medicines & Poly Clinic",
              url: "https://heartplus-medicines-henna.vercel.app/",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Durgapur",
                addressRegion: "West Bengal",
                addressCountry: "IN"
              },
              medicalSpecialty: [
                "Cardiology",
                "Neurology",
                "Pediatrics",
                "Nephrology",
                "Urology",
                "Gastroenterology",
                "GeneralMedicine"
              ]
            }),
          }}
        />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}