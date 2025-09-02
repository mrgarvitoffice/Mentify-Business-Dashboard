
import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { LanguageProvider } from '@/hooks/use-language';
import { FontSizeProvider } from '@/hooks/use-font-size';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'MentifyAI Dashboard',
  description: 'Business dashboard for Mentify-AI partners',
};

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body", fontInter.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
            <LanguageProvider>
                <FontSizeProvider>
                    {children}
                    <Toaster />
                </FontSizeProvider>
            </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
