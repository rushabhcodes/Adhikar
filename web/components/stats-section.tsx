"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"

export function StatsSection() {
  return (
    <section className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm mb-4">Advantages</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why our AI in law is better?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            In contrast to others, our LegalTech software is quick, easy, and wallet-friendly.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M12 15V3m0 12l-4-4m4 4l4-4M2 17l.621 2.485A2 2 0 004.561 21h14.878a2 2 0 001.94-1.515L22 17" />
                  </svg>
                </div>
                <span className="text-lg font-semibold">Messages</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="h-6 w-6 text-primary"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                  </svg>
                </div>
                <span className="text-lg font-semibold">Prompts</span>
              </div>
            </div>
          </Card>

          <Card className="p-8">
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">75%</div>
                <div className="text-muted-foreground">Time saved on routine tasks</div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">5 Seconds</h3>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-muted-foreground">To summarize any document</p>
          </Card>

          <Card className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">90% Cost reduction</h3>
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-muted-foreground">In legal services</p>
          </Card>
        </div>
      </div>
    </section>
  )
}

