import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Invenex Solutions",
  description: "Premium web development and digital solutions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-[#FAFAFA] antialiased">
        {children}
      </body>
    </html>
  );
}
