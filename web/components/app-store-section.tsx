"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Apple, PlayCircle } from "lucide-react"

export function AppStoreSection() {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Coming soon to your mobile devices</h2>
          <p className="text-muted-foreground mb-8">
            Get ready to experience Adhikar on the go. Sign up now to be notified when we launch our mobile apps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" size="lg" className="h-16">
              <Apple className="mr-2 h-6 w-6" />
              <div className="text-left">
                <div className="text-xs">Coming soon on</div>
                <div className="text-base font-semibold">App Store</div>
              </div>
            </Button>
            <Button variant="outline" size="lg" className="h-16">
              <PlayCircle className="mr-2 h-6 w-6" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-base font-semibold">Google Play</div>
              </div>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

