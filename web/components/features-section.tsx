"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Globe, FileText, Smartphone, Lock, Clock, HeadphonesIcon } from "lucide-react"

export function FeaturesSection({ id }: { id?: string }) {
  const features = [
    {
      icon: Globe,
      title: "Internet-powered",
      description: "Rapid web research, completing hours of analysis in seconds.",
    },
    {
      icon: FileText,
      title: "AI document handling",
      description: "The fastest way to summarize agreements, convert images to text, and more.",
    },
    {
      icon: Lock,
      title: "Private",
      description: "We stand firm on privacy, ensuring that users' conversations remain secure and anonymous.",
    },
    {
      icon: Clock,
      title: "5 Seconds",
      description: "To summarize any document. Lightning-fast processing for all your legal documents.",
    },
    {
      icon: HeadphonesIcon,
      title: "24/7 Support",
      description: "Our customer support team is always available to assist you with any questions.",
    },
    {
      icon: Smartphone,
      title: "Multi-platform",
      description: "Access our platform with a simple tap – on the web, iOS, or Android.",
    },
  ]

  return (
    <section id={id} className="py-20 bg-muted/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm mb-4">Features</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Features of legal AI</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore features that boost your productivity. From document automation to advanced research, we&apos;ve got the
            hard work covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <feature.icon className="h-10 w-10 mb-4 text-primary" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

