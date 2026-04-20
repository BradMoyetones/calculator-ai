"use client"

import { motion } from "motion/react"
import { Loader2 } from "lucide-react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type Props = {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function LoadingModal({ open, setOpen }: Props) {
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm! w-full p-8">
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
            </DialogContent>
        </Dialog>
    )
}
