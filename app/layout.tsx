import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import Header from "@/components/header";
import Background from "@/components/background";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/ui/footer";

export const metadata = {
  title: "Sceneify - add cinematic subtitles to images",
  description: `Sceneify is an AI-powered app that transforms ordinary photos into 
                cinematic stills - complete with beautifully styled subtitles. Upload any image, 
                and Sceneify analyzes its mood, setting, and emotion to generates a short, expressive
                line that feels like it belongs in a film - rendered elegantly. Whether it's a quiet 
                street, a sunset by the sea, or laughter among friends, Sceneify turns every 
                picture into a story - a frame from a movie that never existed, but should have.`,
  openGraph: {
    url: "https://sceneify.vercel.app",
    type: "website",
    title: "Sceneify - add cinematic subtitles to images",
    description: `Sceneify is an AI-powered app that transforms ordinary photos into 
                  cinematic stills - complete with beautifully styled subtitles. Upload any image, 
                  and Sceneify analyzes its mood, setting, and emotion to generates a short, expressive
                  line that feels like it belongs in a film - rendered elegantly. Whether it's a quiet 
                  street, a sunset by the sea, or laughter among friends, Sceneify turns every 
                  picture into a story - a frame from a movie that never existed, but should have.`,
    images: [
      {
        url: "https://sceneify.vercel.app/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sceneify - add cinematic subtitles to images",
    description: `Sceneify is an AI-powered app that transforms ordinary photos into 
                  cinematic stills - complete with beautifully styled subtitles. Upload any image, 
                  and Sceneify analyzes its mood, setting, and emotion to generates a short, expressive
                  line that feels like it belongs in a film - rendered elegantly. Whether it's a quiet 
                  street, a sunset by the sea, or laughter among friends, Sceneify turns every 
                  picture into a story - a frame from a movie that never existed, but should have.`,
    images: ["https://sceneify.vercel.app/og.png"],
  },
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
