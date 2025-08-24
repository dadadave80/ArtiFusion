"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, Wallet, ChevronDown, LogOut, User, Settings } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { useWeb3 } from "@/contexts/web3-context"
import { WalletConnectModal } from "./wallet-connect-modal"

export function Header() {
  const { account, isConnected, balance, chainId, disconnectWallet } = useWeb3()
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)

  const navItems = [
    { name: "Create", href: "/create" },
    { name: "Auctions", href: "/auctions" },
    { name: "Collections", href: "/collections" },
    { name: "Profile", href: "/profile" },
  ]

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle scroll for anchor links
    if (href.startsWith("#")) {
      e.preventDefault()
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const isShapeNetwork = chainId === 5555

  return (
    <>
      <header className="w-full py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <Link href="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AF</span>
                </div>
                <span className=" text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ArtiFusion
                </span>
              </Link>
            </div>
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleScroll(e, item.href)}
                  className="text-muted-foreground hover:text-foreground px-4 py-2 rounded-full font-medium transition-colors hover:bg-primary/10"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isConnected && account ? (
              <div className="hidden md:flex items-center gap-3">
                {/* Network Status */}
                <Badge className={isShapeNetwork ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-500"}>
                  {isShapeNetwork ? "Shape Network" : "Wrong Network"}
                </Badge>

                {/* Wallet Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 glass-morphism border-primary/30 text-foreground hover:bg-primary/10 bg-transparent"
                    >
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-primary/20 text-primary">
                          {account.slice(2, 4).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start">
                        <span className="text-sm font-medium">{formatAddress(account)}</span>
                        {balance && <span className="text-xs text-muted-foreground">{balance} ETH</span>}
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass-morphism border-primary/20 w-56">
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile?tab=settings" className="flex items-center gap-2">
                        <Settings className="w-4 h-4" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-primary/20" />
                    <DropdownMenuItem onClick={disconnectWallet} className="flex items-center gap-2 text-red-500">
                      <LogOut className="w-4 h-4" />
                      Disconnect
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <Button
                onClick={() => setIsWalletModalOpen(true)}
                className="hidden md:flex items-center gap-2 glass-morphism border-primary/30 text-primary hover:bg-primary/10 bg-transparent"
                variant="outline"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}

            <Link href="/create" className="hidden md:block">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium neon-glow">
                Create NFT
              </Button>
            </Link>
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-foreground">
                  <Menu className="h-7 w-7" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="bottom"
                className="bg-background border-t border-border text-foreground glass-morphism"
              >
                <SheetHeader>
                  <SheetTitle className="text-left text-xl font-semibold text-foreground">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => handleScroll(e, item.href)}
                      className="text-muted-foreground hover:text-foreground justify-start text-lg py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-2 mt-4">
                    {isConnected && account ? (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 glass-morphism rounded-lg">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-primary/20 text-primary">
                              {account.slice(2, 4).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-foreground font-medium">{formatAddress(account)}</p>
                            {balance && <p className="text-muted-foreground text-sm">{balance} ETH</p>}
                          </div>
                        </div>
                        <Button
                          onClick={disconnectWallet}
                          variant="outline"
                          className="w-full glass-morphism border-red-500/30 text-red-500 bg-transparent"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Disconnect
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => setIsWalletModalOpen(true)}
                        className="flex items-center gap-2 glass-morphism border-primary/30 text-primary hover:text-primary-foreground bg-transparent"
                        variant="outline"
                      >
                        <Wallet className="w-4 h-4" />
                        Connect Wallet
                      </Button>
                    )}
                    <Link href="/create" className="w-full">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-full font-medium neon-glow">
                        Create NFT
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <WalletConnectModal isOpen={isWalletModalOpen} onClose={() => setIsWalletModalOpen(false)} />
    </>
  )
}
