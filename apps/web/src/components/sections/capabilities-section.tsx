"use client";

import { Brain, Users, BarChart3, Route } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@qixu/ui/card";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { Badge } from "@qixu/ui/badge";
import { staggerContainer, fadeInUp, cardHover, cardMotionProps } from "@/lib/motion";
import type { Capability } from "@/lib/mock-data";
import { capabilities } from "@/lib/mock-data";

const iconMap = {
  brain: Brain,
  users: Users,
  chart: BarChart3,
  route: Route,
} as const;

const iconContainerClassMap: Record<Capability["id"], string> = {
  "ai-assistant":
    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary",
  "mentor-guidance":
    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success",
  "growth-portfolio":
    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-warning/10 text-warning",
  "personalized-path":
    "mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary",
} as const;

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = iconMap[capability.icon];

  return (
    <motion.div variants={fadeInUp} whileHover={cardHover} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Card className="h-full border-border/50 bg-card transition-shadow hover:shadow-lg">
        <CardHeader className="pb-4">
          <div className={iconContainerClassMap[capability.id]}>
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle>{capability.title}</CardTitle>
          <CardDescription className="mt-2 text-sm leading-relaxed">
            {capability.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1.5">
            {capability.highlights.map((item) => (
              <Badge key={item} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function CapabilitiesSection() {
  return (
    <Section background="surface" spacing="xl">
      <SectionHeader>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <SectionTitle>四大核心能力</SectionTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SectionDescription>
              AI 与导师协同，为每个学习者提供全方位的成长支持
            </SectionDescription>
          </motion.div>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:gap-8"
      >
        {capabilities.map((capability) => (
          <CapabilityCard key={capability.id} capability={capability} />
        ))}
      </motion.div>
    </Section>
  );
}
