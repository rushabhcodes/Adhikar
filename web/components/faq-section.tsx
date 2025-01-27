"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection({ id }: { id?: string }) {
  const faqs = [
    {
      question: "What is Adhikar?",
      answer:
        "Adhikar is your personal legal AI assistant that helps with legal research, document analysis, and provides quick answers to legal questions.",
    },
    {
      question: "Who is your platform for?",
      answer:
        "Our platform is designed for legal professionals, business owners, and individuals who need quick and reliable legal assistance.",
    },
    {
      question: "What countries/languages does it work for?",
      answer:
        "Currently, we support multiple jurisdictions and languages, with a primary focus on English-speaking countries.",
    },
    {
      question: "How to start using AI Lawyer?",
      answer: "Simply sign up for a free trial, and you can immediately start using our platform for your legal needs.",
    },
    {
      question: "Will AI replace lawyers?",
      answer:
        "No, AI Lawyer is designed to assist and augment legal professionals, not replace them. It helps with routine tasks and research.",
    },
  ]

  return (
    <section id={id} className="py-20 bg-muted/50">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm mb-4">FAQ</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Have a question?</h2>
          <p className="text-muted-foreground">Browse through our frequently asked topics.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}

