import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Calculator } from "@/components/Calculator"
import { LoadingModal } from "@/components/LoadingModal"
import { SubscriptionModal } from "@/components/SubscriptionModal"

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showSubscription, setShowSubscription] = useState(false)

    const handleCalculation = () => {
        setIsLoading(true)

        // Simulate "processing" the calculation
        setTimeout(() => {
            setIsLoading(false)
            setShowSubscription(true)
        }, 2500)
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full max-w-md"
            >
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-flex items-center gap-2 mb-4"
                    >
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">Enterprise Edition</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-4xl font-bold text-foreground mb-2 text-balance"
                    >
                        CalcPro AI
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-muted-foreground text-sm"
                    >
                        Next-generation computational intelligence
                    </motion.p>
                </div>

                <Calculator onCalculate={handleCalculation} isPremium={false} />
            </motion.div>

            <AnimatePresence>{isLoading && <LoadingModal />}</AnimatePresence>

            <AnimatePresence>
                {showSubscription && <SubscriptionModal onClose={() => setShowSubscription(false)} />}
            </AnimatePresence>
        </div>
    )
}
