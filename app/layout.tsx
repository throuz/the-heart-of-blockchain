import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Heart of Blockchain - Emergency Services Donation Platform",
  description:
    "Support emergency services through blockchain technology. Making a difference, one donation at a time.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
          {children}
        </div>
      </body>
    </html>
  );
}
