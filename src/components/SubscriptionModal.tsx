"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "motion/react"
import { X, Sparkles, Zap, Shield, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"

interface SubscriptionModalProps {
    onClose: () => void
}

export function SubscriptionModal({ onClose }: SubscriptionModalProps) {
    const [isProcessing, setIsProcessing] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsProcessing(true)
        // Simulate processing
        setTimeout(() => {
            alert("¡Gracias por intentar suscribirte! 😂 (Esto es solo meme)")
            onClose()
        }, 2000)
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="w-full max-w-4xl"
            >
                <Card className="relative bg-card border border-border shadow-2xl overflow-hidden p-0 flex flex-col md:flex-row">
                    <Button
                        onClick={onClose}
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-foreground hover:bg-muted"
                    >
                        <X className="h-5 w-5" />
                    </Button>
                    {/* Header with gradient */}
                    <div className="relative bg-gradient-to-br from-primary/20 via-accent/10 to-transparent p-8 border-b border-border">

                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring" }}
                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-4"
                        >
                            <Crown className="h-8 w-8 text-primary" />
                        </motion.div>

                        <h2 className="text-3xl font-bold text-foreground mb-2 text-balance">Upgrade to CalcPro AI Premium</h2>
                        <p className="text-muted-foreground text-balance">Unlock real-time calculations and advanced features</p>


                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                            {[
                                { icon: Zap, title: "Instant Results", desc: "Real-time calculations" },
                                { icon: Sparkles, title: "AI-Powered", desc: "Quantum computing" },
                                { icon: Shield, title: "Enterprise Security", desc: "Bank-level encryption" },
                            ].map((feature, index) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + index * 0.1 }}
                                    className="flex flex-col items-center text-center p-4 rounded-xl bg-muted/50 border border-border"
                                >
                                    <feature.icon className="h-6 w-6 text-primary mb-2" />
                                    <h3 className="font-semibold text-sm text-foreground mb-1">{feature.title}</h3>
                                    <p className="text-xs text-muted-foreground">{feature.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pricing */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl p-6 border border-primary/20 mb-8"
                        >
                            <div className="flex items-baseline gap-2 mb-2">
                                <span className="text-5xl font-bold text-foreground">$99</span>
                                <span className="text-muted-foreground">/month</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Billed annually at $1,188/year</p>
                        </motion.div>
                    </div>

                    <div className="flex flex-col justify-between p-8 mt-4">
                        {/* Payment Form */}
                        <motion.form
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7 }}
                            onSubmit={handleSubmit}
                            className="space-y-4 flex-1"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName" className="text-foreground">
                                        First Name
                                    </Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Brad"
                                        required
                                        className="bg-background border-border text-foreground"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName" className="text-foreground">
                                        Last Name
                                    </Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Moyetones"
                                        required
                                        className="bg-background border-border text-foreground"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-foreground">
                                    Email
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="brad@example.com"
                                    required
                                    className="bg-background border-border text-foreground"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="cardNumber" className="text-foreground">
                                    Card Number
                                </Label>
                                <Input
                                    id="cardNumber"
                                    placeholder="1234 5678 9012 3456"
                                    required
                                    className="bg-background border-border text-foreground font-mono"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="expiry" className="text-foreground">
                                        Expiry Date
                                    </Label>
                                    <Input
                                        id="expiry"
                                        placeholder="MM/YY"
                                        required
                                        className="bg-background border-border text-foreground font-mono"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="cvv" className="text-foreground">
                                        CVV
                                    </Label>
                                    <Input
                                        id="cvv"
                                        placeholder="123"
                                        required
                                        className="bg-background border-border text-foreground font-mono"
                                    />
                                </div>
                            </div>
                        </motion.form>

                        <div className="mt-auto w-fit space-y-4">
                            <Button
                                type="submit"
                                onClick={handleSubmit}
                                disabled={isProcessing}
                                className="w-full h-12 text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                {isProcessing ? (
                                    <motion.span
                                        animate={{ opacity: [1, 0.5, 1] }}
                                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                                    >
                                        Processing...
                                    </motion.span>
                                ) : (
                                    "Subscribe Now"
                                )}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                By subscribing, you agree to our Terms of Service and Privacy Policy
                            </p>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    )
}
