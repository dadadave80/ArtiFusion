"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Wallet, ExternalLink, AlertCircle, CheckCircle, Loader2 } from "lucide-react"
import { useWeb3 } from "@/contexts/web3-context"

interface WalletConnectModalProps {
    isOpen: boolean
    onClose: () => void
}

export function WalletConnectModal({ isOpen, onClose }: WalletConnectModalProps) {
    const { connectWallet, isConnecting, chainId, switchToShapeNetwork } = useWeb3()
    const [isNetworkSwitching, setIsNetworkSwitching] = useState(false)

    const handleConnect = async () => {
        try {
            await connectWallet()
            onClose()
        } catch (error) {
            console.error("Failed to connect wallet:", error)
        }
    }

    const handleNetworkSwitch = async () => {
        setIsNetworkSwitching(true)
        try {
            await switchToShapeNetwork()
        } catch (error) {
            console.error("Failed to switch network:", error)
        } finally {
            setIsNetworkSwitching(false)
        }
    }

    const isShapeNetwork = chainId === 5555

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="glass-morphism border-primary/20 max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-foreground">
                        <Wallet className="w-5 h-5 text-primary" />
                        Connect Wallet
                    </DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                        Connect your wallet to start creating and bidding on NFTs
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Network Status */}
                    {chainId && (
                        <div className="p-4 glass-morphism rounded-lg border border-primary/10">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-foreground font-medium">Network Status</span>
                                <Badge className={isShapeNetwork ? "bg-primary/20 text-primary" : "bg-yellow-500/20 text-yellow-500"}>
                                    {isShapeNetwork ? (
                                        <>
                                            <CheckCircle className="w-3 h-3 mr-1" />
                                            Shape Network
                                        </>
                                    ) : (
                                        <>
                                            <AlertCircle className="w-3 h-3 mr-1" />
                                            Wrong Network
                                        </>
                                    )}
                                </Badge>
                            </div>
                            {!isShapeNetwork && (
                                <div className="space-y-2">
                                    <p className="text-muted-foreground text-sm">Please switch to Shape Network to use ArtiFusion</p>
                                    <Button
                                        onClick={handleNetworkSwitch}
                                        disabled={isNetworkSwitching}
                                        className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                        size="sm"
                                    >
                                        {isNetworkSwitching ? (
                                            <>
                                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                                Switching...
                                            </>
                                        ) : (
                                            "Switch to Shape Network"
                                        )}
                                    </Button>
                                </div>
                            )}
                        </div>
                    )}

                    <Separator className="bg-primary/20" />

                    {/* Wallet Options */}
                    <div className="space-y-3">
                        <h3 className="text-foreground font-medium">Choose Wallet</h3>

                        <Button
                            onClick={handleConnect}
                            disabled={isConnecting}
                            className="w-full justify-between glass-morphism border border-primary/20 hover:border-primary/40 bg-transparent text-foreground hover:bg-primary/10"
                            variant="outline"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">M</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">MetaMask</p>
                                    <p className="text-muted-foreground text-xs">Connect using browser wallet</p>
                                </div>
                            </div>
                            {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <ExternalLink className="w-4 h-4" />}
                        </Button>

                        <Button
                            disabled
                            className="w-full justify-between glass-morphism border border-muted/20 bg-transparent text-muted-foreground cursor-not-allowed"
                            variant="outline"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">W</span>
                                </div>
                                <div className="text-left">
                                    <p className="font-medium">WalletConnect</p>
                                    <p className="text-muted-foreground text-xs">Coming soon</p>
                                </div>
                            </div>
                        </Button>
                    </div>

                    <div className="p-3 glass-morphism rounded-lg border border-primary/10">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                            <div className="text-sm">
                                <p className="text-foreground font-medium mb-1">New to Web3?</p>
                                <p className="text-muted-foreground text-xs">
                                    You'll need a crypto wallet to participate in auctions and create NFTs.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
