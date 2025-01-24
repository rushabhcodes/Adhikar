"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Users, Scale, Building2, GraduationCap } from "lucide-react"

export function UsersSection({ id }: { id?: string }) {
  const users = [
    {
      title: "AI for Legal Consumers",
      description: "From deciphering complex terms to understanding rights, we've got you covered.",
      icon: Users,
    },
    {
      title: "AI for Lawyers",
      description: "From deciphering complex terms to understanding rights, we've got you covered.",
      icon: Scale,
    },
    {
      title: "AI for Law Firms",
      description: "From deciphering complex terms to understanding rights, we've got you covered.",
      icon: Building2,
    },
    {
      title: "AI for Law Students",
      description: "From deciphering complex terms to understanding rights, we've got you covered.",
      icon: GraduationCap,
    },
  ]

  return (
    <section id={id} className="py-20 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center rounded-full bg-blue-500/10 px-4 py-1 text-sm mb-4">
            <Users className="w-4 h-4 mr-2 text-blue-500" />
            Users
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">Who is AI Lawyer for?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore features that boost your productivity. From document automation to advanced research, we&apos;ve got the
            hard work covered.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {users.map((user, index) => (
            <motion.div
              key={user.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 bg-gray-900/50 border-gray-800 hover:bg-gray-900/80 transition-colors">
                <div className="rounded-lg p-2 w-12 h-12 flex items-center justify-center border border-gray-800 mb-4">
                  <user.icon className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{user.title}</h3>
                <p className="text-gray-400">{user.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

