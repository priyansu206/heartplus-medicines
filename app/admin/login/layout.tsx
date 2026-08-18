import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login",
  description:
    "Secure sign-in for Heart Plus Medicines & Poly Clinic staff.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
