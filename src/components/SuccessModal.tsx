"use client"

import { motion, type Variants } from "motion/react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SuccessModalProps {
    onClose: () => void
}

const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                delay: i * 0.2,
                type: "spring",
                duration: 1.5,
                bounce: 0.2,
                ease: "easeInOut",
            },
            opacity: { delay: i * 0.2, duration: 0.2 },
        },
    }),
}

function Checkmark({ size = 100, strokeWidth = 2, color = "currentColor", className = "" }) {
    return (
        <motion.svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            initial="hidden"
            animate="visible"
            className={className}
        >
            <title>Animated Checkmark</title>
            <motion.circle
                cx="50"
                cy="50"
                r="40"
                stroke={color}
                variants={draw}
                custom={0}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    fill: "transparent",
                }}
            />
            <motion.path
                d="M30 50L45 65L70 35"
                stroke={color}
                variants={draw}
                custom={1}
                style={{
                    strokeWidth,
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    fill: "transparent",
                }}
            />
        </motion.svg>
    )
}

export function SuccessModal({ onClose }: SuccessModalProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="relative p-0.5"
            >
                {/* Border animated */}
                <div className="absolute inset-0 rounded-xl overflow-hidden 
                before:absolute before:top-[-50%] before:right-[-50%] before:bottom-[-50%] before:left-[-50%] 
                before:bg-[conic-gradient(transparent,transparent,var(--primary))] before:animate-spin-slow"></div>

                <Card className="w-full max-w-sm mx-auto p-6 min-h-[400px] flex flex-col justify-center bg-card border-border backdrop-blur-sm">
                    <CardContent className="space-y-4 flex flex-col items-center justify-center">
                        <motion.div
                            className="flex justify-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1],
                                scale: {
                                    type: "spring",
                                    damping: 15,
                                    stiffness: 200,
                                },
                            }}
                        >
                            <div className="relative">
                                <motion.div
                                    className="absolute inset-0 blur-xl bg-primary/20 rounded-full"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 0.2,
                                        duration: 0.8,
                                        ease: "easeOut",
                                    }}
                                />
                                <Checkmark size={80} strokeWidth={4} color="var(--primary)" className="relative z-10" />
                            </div>
                        </motion.div>
                        <motion.div
                            className="space-y-2 text-center w-full relative"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: 0.2,
                                duration: 0.6,
                                ease: [0.4, 0, 0.2, 1],
                            }}
                        >
                            <motion.div
                                className="absolute inset-0 blur-xl bg-primary/20 rounded-full"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: 0.2,
                                    duration: 0.8,
                                    ease: "easeOut",
                                }}
                            />
                            <motion.h2
                                className="text-lg text-foreground tracking-tighter font-semibold uppercase"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1, duration: 0.4 }}
                            >
                                Subscription Successful
                            </motion.h2>
                            <div className="flex items-center gap-4">
                                <motion.div
                                    className="flex-1 bg-muted/50 rounded-xl p-4 border border-border backdrop-blur-md"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        delay: 1.2,
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                >
                                    <div className="flex flex-col items-start gap-3">
                                        <div className="space-y-1.5 w-full">
                                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                                <svg
                                                    className="w-3 h-3"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <title>Plan</title>
                                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                                    <path d="M2 17l10 5 10-5" />
                                                    <path d="M2 12l10 5 10-5" />
                                                </svg>
                                                Plan
                                            </span>
                                            <div className="flex items-center gap-2.5 group transition-all">
                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary shadow-lg border border-primary/20 text-sm font-medium text-primary-foreground group-hover:scale-105 transition-transform">
                                                    ✨
                                                </span>
                                                <span className="font-medium text-foreground tracking-tight">CalcPro AI Premium</span>
                                            </div>
                                        </div>
                                        <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
                                        <div className="space-y-1.5 w-full">
                                            <span className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                                                <svg
                                                    className="w-3 h-3"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                >
                                                    <title>Amount</title>
                                                    <line x1="12" y1="1" x2="12" y2="23" />
                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                                </svg>
                                                Amount
                                            </span>
                                            <div className="flex items-center gap-2.5 group transition-all">
                                                <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-card shadow-lg border border-border text-sm font-medium text-foreground group-hover:scale-105 transition-transform">
                                                    $
                                                </span>
                                                <span className="font-medium text-foreground tracking-tight">$99.00 USD/month</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                            <motion.div
                                className="w-full text-xs text-muted-foreground mt-2 text-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.4, duration: 0.4 }}
                            >
                                Next billing date: {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.6, duration: 0.4 }}
                            className="w-full pt-2"
                        >
                            <Button onClick={onClose} className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                                Start Calculating
                            </Button>
                        </motion.div>
                    </CardContent>
                </Card>
            </motion.div>
        </motion.div>
    )
}
