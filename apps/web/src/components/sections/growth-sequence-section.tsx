"use client";

import { Compass, Layers, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { staggerContainer, fadeInUp, getTransition } from "@/lib/motion";
import type { GrowthStage } from "@/lib/mock-data";
import { growthStages } from "@/lib/mock-data";

const iconMap = {
  compass: Compass,
  layers: Layers,
  rocket: Rocket,
} as const;

function GrowthCard({ stage, index }: { stage: GrowthStage; index: number }) {
  const Icon = iconMap[stage.icon];

  return (
    <motion.div
      variants={fadeInUp}
      className="relative flex flex-col items-center text-center"
    >
      {/* Connector line between cards */}
      {index < growthStages.length - 1 && (
        <div className="absolute left-[calc(50%+3rem)] top-8 hidden h-px w-[calc(100%-6rem)] bg-gradient-to-r from-border to-transparent lg:block" />
      )}

      <div className="relative mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-7 w-7" />
        {/* Step number */}
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
          {index + 1}
        </span>
      </div>

      <h3 className="text-xl font-bold">{stage.title}</h3>
      <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary/70">
        {stage.subtitle}
      </p>
      <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
        {stage.description}
      </p>
    </motion.div>
  );
}

export function GrowthSequenceSection() {
  return (
    <Section background="default" spacing="xl">
      <SectionHeader>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp}>
            <SectionTitle>成长序列</SectionTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SectionDescription>
              启蒙 · 序章 · 未来。每个学习者都有一条独特的成长路径，
              我们帮助每个人找到属于自己的成长序列。
            </SectionDescription>
          </motion.div>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto grid max-w-4xl gap-12 md:grid-cols-3 lg:gap-16"
      >
        {growthStages.map((stage, index) => (
          <GrowthCard key={stage.id} stage={stage} index={index} />
        ))}
      </motion.div>
    </Section>
  );
}
