import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "AI Account Review & Expansion Agent — Abi C",
  description:
    "A hybrid AI pipeline that replaces manual QBR prep for Account Managers. Reads call transcripts and usage data, detects adoption gaps, surfaces upsell opportunities, generates an AM-ready brief.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
