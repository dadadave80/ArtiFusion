"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface Web3ContextType {
    account: string | null
    isConnected: boolean
    isConnecting: boolean
    chainId: number | null
    balance: string | null
    connectWallet: () => Promise<void>
    disconnectWallet: () => void
    switchToShapeNetwork: () => Promise<void>
    sendTransaction: (to: string, value: string, data?: string) => Promise<string>
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined)

// Shape Network configuration
const SHAPE_NETWORK = {
    chainId: "0x15B3", // 5555 in hex
    chainName: "Shape Network",
    nativeCurrency: {
        name: "ETH",
        symbol: "ETH",
        decimals: 18,
    },
    rpcUrls: ["https://mainnet.shape.network"],
    blockExplorerUrls: ["https://shapescan.xyz"],
}

export function Web3Provider({ children }: { children: ReactNode }) {
    const [account, setAccount] = useState<string | null>(null)
    const [isConnected, setIsConnected] = useState(false)
    const [isConnecting, setIsConnecting] = useState(false)
    const [chainId, setChainId] = useState<number | null>(null)
    const [balance, setBalance] = useState<string | null>(null)

    // Check if wallet is already connected on mount
    useEffect(() => {
        checkConnection()
    }, [])

    // Listen for account changes
    useEffect(() => {
        if (typeof window !== "undefined" && window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged)
            window.ethereum.on("chainChanged", handleChainChanged)

            return () => {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
                window.ethereum.removeListener("chainChanged", handleChainChanged)
            }
        }
    }, [])

    const checkConnection = async () => {
        if (typeof window !== "undefined" && window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: "eth_accounts" })
                if (accounts.length > 0) {
                    setAccount(accounts[0])
                    setIsConnected(true)
                    await updateChainId()
                    await updateBalance(accounts[0])
                }
            } catch (error) {
                console.error("Error checking connection:", error)
            }
        }
    }

    const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
            setAccount(accounts[0])
            setIsConnected(true)
            updateBalance(accounts[0])
        } else {
            setAccount(null)
            setIsConnected(false)
            setBalance(null)
        }
    }

    const handleChainChanged = (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
    }

    const updateChainId = async () => {
        if (window.ethereum) {
            const chainId = await window.ethereum.request({ method: "eth_chainId" })
            setChainId(Number.parseInt(chainId, 16))
        }
    }

    const updateBalance = async (address: string) => {
        if (window.ethereum) {
            try {
                const balance = await window.ethereum.request({
                    method: "eth_getBalance",
                    params: [address, "latest"],
                })
                const balanceInEth = (Number.parseInt(balance, 16) / 1e18).toFixed(4)
                setBalance(balanceInEth)
            } catch (error) {
                console.error("Error getting balance:", error)
            }
        }
    }

    const connectWallet = async () => {
        if (typeof window === "undefined" || !window.ethereum) {
            alert("Please install MetaMask to connect your wallet")
            return
        }

        setIsConnecting(true)
        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            if (accounts.length > 0) {
                setAccount(accounts[0])
                setIsConnected(true)
                await updateChainId()
                await updateBalance(accounts[0])

                // Auto-switch to Shape Network if not already connected
                if (chainId !== 5555) {
                    await switchToShapeNetwork()
                }
            }
        } catch (error) {
            console.error("Error connecting wallet:", error)
        } finally {
            setIsConnecting(false)
        }
    }

    const disconnectWallet = () => {
        setAccount(null)
        setIsConnected(false)
        setBalance(null)
        setChainId(null)
    }

    const switchToShapeNetwork = async () => {
        if (!window.ethereum) return

        try {
            await window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: SHAPE_NETWORK.chainId }],
            })
        } catch (switchError: any) {
            // This error code indicates that the chain has not been added to MetaMask
            if (switchError.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: "wallet_addEthereumChain",
                        params: [SHAPE_NETWORK],
                    })
                } catch (addError) {
                    console.error("Error adding Shape Network:", addError)
                }
            } else {
                console.error("Error switching to Shape Network:", switchError)
            }
        }
    }

    const sendTransaction = async (to: string, value: string, data?: string): Promise<string> => {
        if (!window.ethereum || !account) {
            throw new Error("Wallet not connected")
        }

        const transactionParameters = {
            to,
            from: account,
            value: `0x${(Number.parseFloat(value) * 1e18).toString(16)}`,
            ...(data && { data }),
        }

        try {
            const txHash = await window.ethereum.request({
                method: "eth_sendTransaction",
                params: [transactionParameters],
            })
            return txHash
        } catch (error) {
            console.error("Transaction failed:", error)
            throw error
        }
    }

    const value = {
        account,
        isConnected,
        isConnecting,
        chainId,
        balance,
        connectWallet,
        disconnectWallet,
        switchToShapeNetwork,
        sendTransaction,
    }

    return <Web3Context.Provider value={value}>{children}</Web3Context.Provider>
}

export function useWeb3() {
    const context = useContext(Web3Context)
    if (context === undefined) {
        throw new Error("useWeb3 must be used within a Web3Provider")
    }
    return context
}

// Extend Window interface for TypeScript
declare global {
    interface Window {
        ethereum?: any
    }
}
