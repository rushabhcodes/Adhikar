"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TestimonialsSection({ id }: { id?: string }) {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Freelancer",
      content:
        "Navigating through legal jargon was a maze until AI Lawyer came to the rescue. Now, I get to understand complex terms in simple language, making my life a lot easier.",
    },
    {
      name: "Brian Lopez",
      role: "Small Business Owner",
      content:
        "As a small business owner, attorney consultations were a nightmare due to high costs. AI Lawyer has been a game changer with its cost-effective solutions.",
    },
    {
      name: "Rebecca Adams",
      role: "Law Student",
      content:
        "Being a law student, I constantly find myself buried under piles of case laws and briefs. AI Lawyer has been a beacon, assisting me with research and making my academic journey less daunting.",
    },
  ]

  return (
    <section id={id} className="py-20">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-sm mb-4">Testimonials</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What our users think</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find out how our platform has changed the legal services experience for diverse users.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={`/placeholder.svg`} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4">
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

