import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Web3Provider } from '@/contexts/web3-context'
import { Header } from '@/components/header'
import { ArtiFusionFooter } from '@/components/artifusion-footer'

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className='bg-background'>
      <head>
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body >
        <Web3Provider>
          <Header />
          {children}
          <ArtiFusionFooter />
        </Web3Provider>
      </body>
    </html>
  )
}
