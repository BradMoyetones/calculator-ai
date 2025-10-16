"use client"

import { motion } from "motion/react"
import { Loader2 } from "lucide-react"

export function LoadingModal() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-2xl max-w-sm w-full mx-4"
            >
                <div className="flex flex-col items-center text-center space-y-4">
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                        <Loader2 className="h-12 w-12 text-primary" />
                    </motion.div>

                    <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">Processing Calculation</h3>
                        <p className="text-sm text-muted-foreground">Connecting to quantum computing cluster...</p>
                    </div>

                    <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 2.5, ease: "easeInOut" }}
                            className="h-full bg-primary"
                        />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                        >
                        Analyzing input data
                        </motion.span>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}
