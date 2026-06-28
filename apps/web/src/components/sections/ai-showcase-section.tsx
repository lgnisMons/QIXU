"use client";

import { Sparkles, Target, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@qixu/ui/card";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/motion";
import type { AICapability } from "@/lib/mock-data";
import { aiCapabilities } from "@/lib/mock-data";

const iconMap = {
  sparkles: Sparkles,
  target: Target,
  trendingUp: TrendingUp,
} as const;

function AIShowcaseCard({ capability, index }: { capability: AICapability; index: number }) {
  const Icon = iconMap[capability.icon];

  return (
    <motion.div variants={fadeInUp} whileHover={cardHover} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Card className="group relative h-full overflow-hidden border-border/50 bg-card transition-shadow hover:shadow-lg">
        {/* Subtle gradient top border */}
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary/60 via-primary/30 to-transparent" />

        <CardHeader className="pb-4">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
            <Icon className="h-6 w-6" />
          </div>
          <CardTitle>{capability.title}</CardTitle>
          <CardDescription className="mt-2 text-sm leading-relaxed">
            {capability.description}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ul className="space-y-2">
            {capability.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <span className="h-1 w-1 rounded-full bg-primary/60" />
                {feature}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function AIShowcaseSection() {
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
            <SectionTitle>AI 能力展示</SectionTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SectionDescription>
              AI 不是替代者，而是辅助者。让技术服务于学习本身，
              让每个人都能获得个性化关注。
            </SectionDescription>
          </motion.div>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 lg:gap-8"
      >
        {aiCapabilities.map((cap, index) => (
          <AIShowcaseCard key={cap.id} capability={cap} index={index} />
        ))}
      </motion.div>

      {/* Extension point — future LangGraph integration */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 max-w-2xl rounded-lg border border-dashed border-border/60 bg-muted/30 p-6 text-center"
      >
        <p className="text-xs text-muted-foreground/60">
          Future: LangGraph agent orchestration · Real-time AI state display ·
          Interactive demos
        </p>
      </motion.div>
    </Section>
  );
}
