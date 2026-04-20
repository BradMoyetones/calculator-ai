import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Calculator } from "@/components/Calculator"
import { LoadingModal } from "@/components/LoadingModal"
import { SubscriptionModal } from "@/components/SubscriptionModal"
import { SuccessModal } from "@/components/SuccessModal"
import { Github, Instagram, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const backgroundStyle = `
    .bg-pattern {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: 
        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
        background-size: 20px 20px;
        pointer-events: none;
        z-index: 1;
    }

    .content {
        position: relative;
        z-index: 2;
    }
`

export default function HomePage() {
    const [isLoading, setIsLoading] = useState(false)
    const [showSubscription, setShowSubscription] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [isPremium, setIsPremium] = useState(false)
    const { resolvedTheme, setTheme } = useTheme()

    const handleCalculation = () => {
        if (!isPremium) {
            setIsLoading(true)

            setTimeout(() => {
                setIsLoading(false)
                setShowSubscription(true)
            }, 2500)
        }
    }

    const handleSubscriptionSuccess = () => {
        setShowSubscription(false)
        setShowSuccess(true)
    }

    const handleSuccessClose = () => {
        setShowSuccess(false)
        setIsPremium(true)
    }

    return (
        <>
            <div className="fixed top-0 left-0 right-0 p-4 z-20 flex items-center justify-end gap-4">
                <Button
                    variant="outline"
                    size="icon-lg"
                    className="relative"
                    onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                >
                    <Sun className="opacity-0 absolute dark:opacity-100 rotate-90 dark:rotate-0 transition-all duration-300" />
                    <Moon className="opacity-100 dark:opacity-0 rotate-0 dark:rotate-90 transition-all duration-300" />
                </Button>
                <a href="https://www.instagram.com/its.bradn" title="Instagram" className="hover:text-primary text-muted-foreground transition-colors">
                    <Instagram />
                    <span className="sr-only">Instagram</span>
                </a>
                <a href="https://github.com/BradMoyetones/calculator-ai" title="Github" className="hover:text-primary text-muted-foreground transition-colors">
                    <Github />
                    <span className="sr-only">Github</span>
                </a>
            </div>

            <div className="bg-pattern" />
            {/* Inyectamos el CSS */}
            <style>{backgroundStyle}</style>
            <div 
                className="min-h-screen bg-background flex items-center justify-center p-4 relative z-10"
                style={{
                    background: "radial-gradient(circle at center, color-mix(in oklch, var(--primary) 30%, transparent), var(--background))"
                }}
            >

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
                            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                                {isPremium ? "Premium Edition" : "Enterprise Edition"}
                            </span>
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

                    <Calculator onCalculate={handleCalculation} isPremium={isPremium} />
                </motion.div>

                <LoadingModal open={isLoading} setOpen={setIsLoading} />

                {/* Subscription detail modal */}
                <SubscriptionModal open={showSubscription} setOpen={setShowSubscription} onSuccess={handleSubscriptionSuccess} />

                {/* Success Payment */}
                <AnimatePresence>
                    {showSuccess && <SuccessModal onClose={handleSuccessClose} />}
                </AnimatePresence>
            </div>
        </>
    )
}
