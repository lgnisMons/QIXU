"use client";

import Link from "next/link";
import { ArrowRight, Star, Users, Sparkles, Target, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@qixu/ui/card";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@qixu/ui/section";
import { Button } from "@qixu/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { storiesRecruitment } from "@/lib/mock-data";

const benefitIcons = [Sparkles, Users, BarChart3, Target];

export function SuccessStoriesSection() {
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
            <SectionTitle>成长故事</SectionTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SectionDescription>
              {storiesRecruitment.subDescription}
            </SectionDescription>
          </motion.div>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto max-w-2xl"
      >
        <motion.div variants={fadeInUp}>
          <Card className="border-border/50 bg-card shadow-sm">
            <CardContent className="p-8 text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Star className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground">
                {storiesRecruitment.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {storiesRecruitment.description}
              </p>

              {/* Benefits */}
              <div className="mt-6 grid grid-cols-2 gap-3 text-left sm:grid-cols-4">
                {storiesRecruitment.benefits.map((benefit, index) => {
                  const Icon = benefitIcons[index] || Star;
                  return (
                    <div
                      key={benefit}
                      className="flex flex-col items-center gap-2 rounded-lg border border-border/40 bg-surface p-3 text-center"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="text-xs text-foreground">{benefit}</span>
                    </div>
                  );
                })}
              </div>
            </CardContent>

            <CardFooter className="justify-center pb-8">
              <Button asChild size="lg" className="min-w-[200px] shadow-md">
                <Link href={storiesRecruitment.ctaHref}>
                  {storiesRecruitment.ctaLabel}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </Section>
  );
}
