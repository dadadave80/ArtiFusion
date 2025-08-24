import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Web3Provider } from "@/context/web3-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'ArtiFusion - AI-Powered No-Loss NFT Auctions',
  description: 'Revolutionary NFT platform combining AI-powered creation with no-loss auction mechanics. Generate unique NFTs using AI prompts, participate in risk-free auctions, and launch tokenbound collections on Shape Network.',
  keywords: [
    'NFT auction',
    'AI NFT generation',
    'no-loss auction',
    'tokenbound NFT',
    'Shape Network',
    'NFT launchpad',
    'AI art generation',
    'blockchain auction',
    'Web3 platform',
    'NFT marketplace'
  ],
  authors: [{ name: 'ArtiFusion Team' }],
  creator: 'ArtiFusion',
  publisher: 'ArtiFusion',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://artifusion.app',
    siteName: 'ArtiFusion',
    title: 'ArtiFusion - AI-Powered No-Loss NFT Auctions',
    description: 'The world\'s first no-loss NFT auction platform powered by AI. Create, auction, and win unique NFTs without risk on Shape Network.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ArtiFusion - AI-Powered No-Loss NFT Auctions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArtiFusion - AI-Powered No-Loss NFT Auctions',
    description: 'Revolutionary no-loss NFT auctions powered by AI. Everyone wins, creativity flows.',
    images: ['/twitter-image.png'],
    creator: '@ArtiFusion',
    site: '@ArtiFusion',
  },
  verification: {
    google: 'verification-code-here',
  },
  alternates: {
    canonical: 'https://artifusion.app',
  },
  category: 'technology',
  classification: 'NFT Marketplace, AI Platform, Blockchain Application',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
