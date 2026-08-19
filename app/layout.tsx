import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maharishi Global School",
  description: "Maharishi Global School IB and Cambridge admissions website.",
  icons: {
    icon: "/assets/optimized/maharishi-logo-transparent.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://rsms.me" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>{children}</body>
    </html>
  );
}
