"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="mb-6 inline-flex items-center rounded-full border px-4 py-1 text-sm">
            <div className="mr-2 rounded-full bg-primary/10 p-1">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M8 0L10.2 5.8L16 6.2L11.8 10.2L12.8 16L8 13.2L3.2 16L4.2 10.2L0 6.2L5.8 5.8L8 0Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            AI Powered by IBM Cloud
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Adhikar: your legal companion
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Say goodbye to expensive legal consultation, long waits for appointments, and confusing legal texts. Adhikar
            makes legal assistance accessible to everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="text-lg">
              Try for free
            </Button>
            <Button size="lg" variant="outline" className="text-lg">
              For lawyers
            </Button>
          </div>
          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              
              Technology program
            </div>
            <div className="flex items-center gap-2">
      
              For Startups
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

