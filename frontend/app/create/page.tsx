"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Upload, Wand2, ImageIcon, Sparkles, Settings, Eye } from "lucide-react"

export default function CreateNFTPage() {
    const [activeMode, setActiveMode] = useState<"ai" | "upload">("ai")
    const [aiPrompt, setAiPrompt] = useState("")
    const [selectedStyle, setSelectedStyle] = useState("")
    const [nftName, setNftName] = useState("")
    const [nftDescription, setNftDescription] = useState("")
    const [mintingProgress, setMintingProgress] = useState(0)
    const [isGenerating, setIsGenerating] = useState(false)

    const styleOptions = [
        { value: "realistic", label: "Realistic", description: "Photorealistic artwork" },
        { value: "abstract", label: "Abstract", description: "Non-representational art" },
        { value: "digital", label: "Digital Art", description: "Modern digital aesthetics" },
        { value: "cyberpunk", label: "Cyberpunk", description: "Futuristic neon aesthetics" },
        { value: "fantasy", label: "Fantasy", description: "Magical and mythical themes" },
        { value: "minimalist", label: "Minimalist", description: "Clean and simple design" },
    ]

    const promptSuggestions = [
        "A futuristic cityscape with neon lights and flying cars",
        "Abstract geometric patterns in vibrant colors",
        "A mystical forest with glowing mushrooms and ethereal creatures",
        "Cyberpunk warrior in a digital landscape",
        "Minimalist portrait with bold color blocking",
    ]

    const handleGenerate = async () => {
        setIsGenerating(true)
        // Simulate AI generation process
        for (let i = 0; i <= 100; i += 10) {
            setMintingProgress(i)
            await new Promise((resolve) => setTimeout(resolve, 200))
        }
        setIsGenerating(false)
    }

    return (
        <div className="min-h-screen bg-background">

            <div className="container mx-auto px-4 py-8 mt-16">
                <div className="max-w-6xl mx-auto">
                    {/* Page Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-foreground via-primary to-secondary bg-clip-text text-transparent mb-4">
                            NFT Creation Studio
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Generate stunning NFTs with AI or upload your own artwork. Create single pieces or entire collections with
                            tokenbound capabilities.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Creation Panel */}
                        <div className="space-y-6">
                            {/* Mode Selection */}
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary" />
                                        Creation Mode
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs value={activeMode} onValueChange={(value) => setActiveMode(value as "ai" | "upload")}>
                                        <TabsList className="grid w-full grid-cols-2 glass-morphism">
                                            <TabsTrigger value="ai" className="flex items-center gap-2">
                                                <Wand2 className="w-4 h-4" />
                                                AI Generation
                                            </TabsTrigger>
                                            <TabsTrigger value="upload" className="flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                Upload Image
                                            </TabsTrigger>
                                        </TabsList>

                                        <TabsContent value="ai" className="space-y-4 mt-6">
                                            <div className="space-y-4">
                                                <div>
                                                    <Label htmlFor="prompt" className="text-foreground font-medium">
                                                        AI Prompt
                                                    </Label>
                                                    <Textarea
                                                        id="prompt"
                                                        placeholder="Describe your NFT artwork in detail..."
                                                        value={aiPrompt}
                                                        onChange={(e) => setAiPrompt(e.target.value)}
                                                        className="glass-morphism border-primary/20 focus:border-primary min-h-[100px] mt-2"
                                                    />
                                                </div>

                                                <div>
                                                    <Label className="text-foreground font-medium mb-2 block">Quick Suggestions</Label>
                                                    <div className="flex flex-wrap gap-2">
                                                        {promptSuggestions.map((suggestion, index) => (
                                                            <Badge
                                                                key={index}
                                                                variant="outline"
                                                                className="cursor-pointer hover:bg-primary/10 border-primary/30 text-xs"
                                                                onClick={() => setAiPrompt(suggestion)}
                                                            >
                                                                {suggestion.slice(0, 30)}...
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div>
                                                    <Label className="text-foreground font-medium">Art Style</Label>
                                                    <Select value={selectedStyle} onValueChange={setSelectedStyle}>
                                                        <SelectTrigger className="glass-morphism border-primary/20 focus:border-primary mt-2">
                                                            <SelectValue placeholder="Choose an art style" />
                                                        </SelectTrigger>
                                                        <SelectContent className="glass-morphism border-primary/20">
                                                            {styleOptions.map((style) => (
                                                                <SelectItem key={style.value} value={style.value}>
                                                                    <div>
                                                                        <div className="font-medium">{style.label}</div>
                                                                        <div className="text-sm text-muted-foreground">{style.description}</div>
                                                                    </div>
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </div>

                                                <Button
                                                    onClick={handleGenerate}
                                                    disabled={!aiPrompt || !selectedStyle || isGenerating}
                                                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 neon-glow"
                                                >
                                                    {isGenerating ? (
                                                        <>
                                                            <Sparkles className="w-4 h-4 mr-2 animate-spin" />
                                                            Generating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Wand2 className="w-4 h-4 mr-2" />
                                                            Generate NFT
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </TabsContent>

                                        <TabsContent value="upload" className="space-y-4 mt-6">
                                            <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center glass-morphism hover:border-primary/50 transition-colors">
                                                <Upload className="w-12 h-12 text-primary mx-auto mb-4" />
                                                <h3 className="text-lg font-medium text-foreground mb-2">Upload Your Artwork</h3>
                                                <p className="text-muted-foreground mb-4">Drag and drop your image here, or click to browse</p>
                                                <Button variant="outline" className="glass-morphism border-primary/30 bg-transparent">
                                                    <ImageIcon className="w-4 h-4 mr-2" />
                                                    Choose File
                                                </Button>
                                                <p className="text-sm text-muted-foreground mt-2">Supports JPG, PNG, GIF up to 10MB</p>
                                            </div>
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            {/* NFT Metadata */}
                            <Card className="glass-morphism border-primary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="w-5 h-5 text-secondary" />
                                        NFT Metadata
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name" className="text-foreground font-medium">
                                            NFT Name
                                        </Label>
                                        <Input
                                            id="name"
                                            placeholder="Enter NFT name"
                                            value={nftName}
                                            onChange={(e) => setNftName(e.target.value)}
                                            className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="description" className="text-foreground font-medium">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            placeholder="Describe your NFT..."
                                            value={nftDescription}
                                            onChange={(e) => setNftDescription(e.target.value)}
                                            className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label className="text-foreground font-medium">Collection</Label>
                                        <Select>
                                            <SelectTrigger className="glass-morphism border-primary/20 focus:border-primary mt-2">
                                                <SelectValue placeholder="Select or create collection" />
                                            </SelectTrigger>
                                            <SelectContent className="glass-morphism border-primary/20">
                                                <SelectItem value="new">Create New Collection</SelectItem>
                                                <SelectItem value="existing1">My Art Collection</SelectItem>
                                                <SelectItem value="existing2">Digital Dreams</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-foreground font-medium">Trait Type</Label>
                                            <Input
                                                placeholder="e.g., Background"
                                                className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                            />
                                        </div>
                                        <div>
                                            <Label className="text-foreground font-medium">Trait Value</Label>
                                            <Input
                                                placeholder="e.g., Cosmic"
                                                className="glass-morphism border-primary/20 focus:border-primary mt-2"
                                            />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Preview Panel */}
                        <div className="space-y-6">
                            {/* Live Preview */}
                            <Card className="glass-morphism border-secondary/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Eye className="w-5 h-5 text-secondary" />
                                        Live Preview
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center border border-primary/20">
                                        {isGenerating ? (
                                            <div className="text-center">
                                                <Sparkles className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
                                                <p className="text-muted-foreground">Generating your NFT...</p>
                                                <Progress value={mintingProgress} className="w-48 mx-auto mt-4" />
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                                <p className="text-muted-foreground">Your NFT preview will appear here</p>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Minting Options */}
                            <Card className="glass-morphism border-accent/20">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-accent" />
                                        Minting Options
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-primary/20">
                                        <div>
                                            <h4 className="font-medium text-foreground">Single Mint</h4>
                                            <p className="text-sm text-muted-foreground">Create one unique NFT</p>
                                        </div>
                                        <Button variant="outline" className="glass-morphism border-primary/30 bg-transparent">
                                            Select
                                        </Button>
                                    </div>

                                    <div className="flex items-center justify-between p-4 glass-morphism rounded-lg border border-secondary/20">
                                        <div>
                                            <h4 className="font-medium text-foreground">Series Generation</h4>
                                            <p className="text-sm text-muted-foreground">Generate multiple variations</p>
                                        </div>
                                        <Button variant="outline" className="glass-morphism border-secondary/30 bg-transparent">
                                            Select
                                        </Button>
                                    </div>

                                    <Button
                                        className="w-full bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 neon-glow"
                                        disabled={!nftName || !nftDescription}
                                    >
                                        Mint NFT
                                    </Button>

                                    <div className="text-center">
                                        <p className="text-sm text-muted-foreground">
                                            Estimated gas fee: <span className="text-primary font-medium">0.003 ETH</span>
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
