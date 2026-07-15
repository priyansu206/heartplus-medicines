import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heart Plus Medicines & Poly Clinic",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
