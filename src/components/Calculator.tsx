"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface CalculatorProps {
    onCalculate: () => void,
    isPremium: boolean
}

export function Calculator({ onCalculate, isPremium }: CalculatorProps) {
    const [display, setDisplay] = useState("0")
    const [equation, setEquation] = useState("")
    const [waitingForOperand, setWaitingForOperand] = useState(false)
    const [justCalculated, setJustCalculated] = useState(false)

    const buttons = [
        ["C", "±", "%", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "-"],
        ["1", "2", "3", "+"],
        ["0", ".", "="],
    ]

    const calculateResult = (expr: string): number => {
        try {
            // Replace calculator symbols with JavaScript operators
            const jsExpression = expr.replace(/×/g, "*").replace(/÷/g, "/")

            // Use Function constructor for safe evaluation
            const result = Function(`'use strict'; return (${jsExpression})`)()
            return result
        } catch (error) {
            console.log(error);
            return 0
        }
    }

    const handleButtonClick = (value: string) => {
        if (value === "=") {
            if (justCalculated || !equation) return
            
            onCalculate()
            if(!isPremium) return

            const fullExpression = equation + display
            const calculatedResult = calculateResult(fullExpression)

            if (calculatedResult !== null) {
                setEquation(fullExpression + " =")
                setDisplay(calculatedResult.toString())
            } else {
                setEquation(fullExpression)
            }
            
            setWaitingForOperand(true)
            setJustCalculated(true)
            return
        }

        if (value === "C") {
            setDisplay("0")
            setEquation("")
            setWaitingForOperand(false)
            setJustCalculated(false)
            return
        }

        if (value === "±") {
            setDisplay((prev) => (Number.parseFloat(prev) * -1).toString())
            return
        }

        if (value === "%") {
            setDisplay((prev) => (Number.parseFloat(prev) / 100).toString())
            return
        }

        if (["+", "-", "×", "÷"].includes(value)) {
            if (justCalculated) {
                setEquation(display + " " + value + " ")
                setWaitingForOperand(true)
                setJustCalculated(false)
                return
            }

            if (waitingForOperand) {
                setEquation((prev) => prev.slice(0, -2) + value + " ")
                return
            }

            setEquation((prev) => prev + display + " " + value + " ")
            setWaitingForOperand(true)
            return
        }

        if (justCalculated) {
            setDisplay(value === "." ? "0." : value)
            setEquation("")
            setWaitingForOperand(false)
            setJustCalculated(false)
            return
        }

        if (waitingForOperand || display === "0") {
            if (value === "." && display === "0") {
                setDisplay("0.")
            } else {
                setDisplay(value)
            }
            setWaitingForOperand(false)
        } else {
            if (value === "." && display.includes(".")) return
            setDisplay((prev) => prev + value)
        }
    }

    const getButtonStyle = (value: string) => {
        if (value === "=") return "bg-primary text-primary-foreground hover:bg-primary/90"
        if (["+", "-", "×", "÷"].includes(value)) return "bg-accent text-accent-foreground hover:bg-accent/90"
        if (["C", "±", "%"].includes(value)) return "bg-muted text-muted-foreground hover:bg-muted/80"
        return "bg-card text-card-foreground hover:bg-card/80 border border-border"
    }

    return (
        <Card className="p-6 bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-6"
            >
                <div className="text-xs text-muted-foreground font-mono mb-1 h-4">{equation}</div>
                <div className="text-5xl font-mono text-foreground text-right font-light tracking-tight">{display}</div>
            </motion.div>

            <div className="space-y-3">
                {buttons.map((row, rowIndex) => (
                    <motion.div
                        key={rowIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + rowIndex * 0.1 }}
                        className="flex gap-3"
                    >
                        {row.map((button) => (
                            <motion.div
                                key={button}
                                className={button === "0" ? "flex-[2]" : "flex-1"}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    onClick={() => handleButtonClick(button)}
                                    className={`w-full h-16 text-xl font-medium rounded-xl transition-all ${getButtonStyle(button)}`}
                                    variant="ghost"
                                >
                                    {button}
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="mt-6 pt-6 border-t border-border/50 flex items-center justify-between text-xs text-muted-foreground"
            >
                <span className="font-mono">v2.4.1</span>
                <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                    Cloud Sync Active
                </span>
            </motion.div>
        </Card>
    )
}
