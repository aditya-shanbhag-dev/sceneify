import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header";
import Background from "@/components/background";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Sceneify - add cinematic subtitles to images",
  description: `Sceneify is an AI-powered app that transforms ordinary photos into 
  cinematic stills - complete with beautifully styled subtitles inspired by iconic 
  movie dialogue. Upload any image, and Sceneify analyzes its mood, setting, and 
  emotion using vision-language models. It then generates a short, expressive line 
  that feels like it belongs in a film - rendered elegantly. Whether it's a quiet 
  street, a sunset by the sea, or laughter among friends, Sceneify turns every 
  picture into a story - a frame from a movie that never existed, but should have.`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="relative max-w-7xl min-h-screen mx-auto w-full bg-background flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Background />
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
