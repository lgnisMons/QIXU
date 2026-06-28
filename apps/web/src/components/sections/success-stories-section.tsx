"use client";

import { Quote, User } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@qixu/ui/card";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { Badge } from "@qixu/ui/badge";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/motion";
import type { SuccessStory } from "@/lib/mock-data";
import { successStories } from "@/lib/mock-data";

function StoryCard({ story }: { story: SuccessStory }) {
  return (
    <motion.div variants={fadeInUp} whileHover={cardHover} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Card className="relative h-full border-border/50 bg-card transition-shadow hover:shadow-lg">
        <CardContent className="p-6">
          {/* Quote icon */}
          <Quote className="mb-4 h-8 w-8 text-primary/20" />

          <blockquote className="mb-6 text-sm leading-relaxed text-muted-foreground">
            &ldquo;{story.quote}&rdquo;
          </blockquote>

          <div className="flex items-center gap-3 border-t border-border/50 pt-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground/40" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-semibold">
                {story.studentName}
              </div>
              <div className="truncate text-xs text-muted-foreground">
                {story.studentTitle}
              </div>
            </div>
            <Badge variant="success" className="shrink-0 text-xs">
              {story.achievement}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

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
              每一个学习者的成长都值得被看见。这里是他们的真实故事。
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
        {successStories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </motion.div>

      {/* Placeholder indicator & extension point */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-2xl rounded-lg border border-dashed border-border/60 bg-muted/30 p-4 text-center"
      >
        <p className="text-xs text-muted-foreground/50">
          🏗️ 更多真实故事即将上线 · Future: Supabase success_stories table ·
          User-submitted stories
        </p>
      </motion.div>
    </Section>
  );
}
