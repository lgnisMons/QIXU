"use client";

import { motion } from "framer-motion";
import { Check, Clock } from "lucide-react";
import { Section, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { Badge } from "@qixu/ui/badge";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { capabilityBadges } from "@/lib/mock-data";

export function TrustSection() {
  return (
    <Section background="surface" spacing="md">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="text-center"
      >
        <motion.div variants={fadeInUp}>
          <p className="text-sm font-medium text-muted-foreground">
            我们的核心能力
          </p>
        </motion.div>

        {/* Capability Badges */}
        <motion.div
          variants={fadeInUp}
          className="mx-auto mt-6 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {capabilityBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-2 rounded-xl border border-border/40 bg-card px-4 py-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <span className="text-sm font-semibold text-foreground">
                {badge.label}
              </span>
              <Badge
                variant={badge.status === "active" ? "success" : "secondary"}
                className="text-xs"
              >
                {badge.status === "active" ? (
                  <Check className="mr-1 h-3 w-3" />
                ) : (
                  <Clock className="mr-1 h-3 w-3" />
                )}
                {badge.statusLabel}
              </Badge>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}
