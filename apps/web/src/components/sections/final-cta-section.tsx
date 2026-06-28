"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@qixu/ui/button";
import { Section } from "@qixu/ui/section";
import { fadeInUp } from "@/lib/motion";

export function FinalCTASection() {
  return (
    <Section background="primary" spacing="xl">
      {/* Background pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-white blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-white blur-3xl" />
      </div>

      <motion.div
        className="relative mx-auto max-w-2xl text-center"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 },
          },
        }}
      >
        <motion.div variants={fadeInUp}>
          <Sparkles className="mx-auto mb-6 h-10 w-10 text-primary-foreground/60" />
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="text-balance text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl"
        >
          开启你的成长序列
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-4 text-lg leading-relaxed text-primary-foreground/80"
        >
          无论你是想巩固基础、拓展视野，还是探索未知领域，
          QIXU 启序都将为你提供个性化的成长路径。
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            variant="secondary"
            asChild
            className="min-w-[180px] shadow-lg"
          >
            <Link href="/ai">
              免费开始
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="mt-6 text-sm text-primary-foreground/50"
        >
          无需付费，即刻体验 AI 学习助手
        </motion.p>
      </motion.div>
    </Section>
  );
}
