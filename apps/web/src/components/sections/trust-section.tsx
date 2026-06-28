"use client";

import { motion } from "framer-motion";
import { Section, SectionHeader, SectionTitle } from "@qixu/ui/section";
import { staggerContainer, fadeInUp, getTransition } from "@/lib/motion";
import { trustStats, partnerLogos } from "@/lib/mock-data";

export function TrustSection() {
  return (
    <Section background="surface" spacing="lg">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
      >
        {/* Trust Stats */}
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4">
          {trustStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary sm:text-4xl md:text-5xl">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto mt-16 max-w-md"
        >
          <p className="text-center text-sm text-muted-foreground">
            获得教育界广泛认可
          </p>
        </motion.div>

        {/* Partner Logos */}
        <motion.div
          variants={fadeInUp}
          className="mt-6 flex flex-wrap items-center justify-center gap-8 opacity-60"
        >
          {partnerLogos.map((partner) => (
            <span
              key={partner.name}
              className="text-sm font-medium text-muted-foreground"
            >
              {partner.name}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
