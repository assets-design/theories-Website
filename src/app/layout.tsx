import type { Metadata } from "next";
import { ContactPopupProvider } from "@/components/contact/ContactPopupContext";
import { BackToTop } from "@/components/layout/BackToTop";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import "./globals.css";

export const metadata: Metadata = {
  title: "Theories Consulting",
  description:
    "An Indian branding and advertising consultancy. We help you prove, scale, and evolve your theory into traction.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ContactPopupProvider>
          <ScrollToTop />
          <Header />
          <main>{children}</main>
          <Footer />
          <BackToTop />
        </ContactPopupProvider>
      </body>
    </html>
  );
}
