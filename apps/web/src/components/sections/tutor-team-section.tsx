"use client";

import { motion } from "framer-motion";
import { User } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@qixu/ui/card";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { Badge } from "@qixu/ui/badge";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/motion";
import type { Tutor } from "@/lib/mock-data";
import { tutors } from "@/lib/mock-data";

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <motion.div variants={fadeInUp} whileHover={cardHover} transition={{ duration: 0.2, ease: "easeOut" }}>
      <Card className="h-full border-border/50 bg-card transition-shadow hover:shadow-lg">
        <CardHeader className="items-center pb-4 text-center">
          {/* Avatar placeholder */}
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <User className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <CardTitle className="text-lg">{tutor.name}</CardTitle>
          <CardDescription className="text-sm">{tutor.title}</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
            {tutor.bio}
          </p>
          <div className="flex flex-wrap justify-center gap-1.5">
            {tutor.specialties.map((s) => (
              <Badge key={s} variant="outline" className="text-xs">
                {s}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function TutorTeamSection() {
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
            <SectionTitle>导师团队</SectionTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SectionDescription>
              来自顶尖高校与行业的导师，用真实、有温度的指导陪伴你的成长
            </SectionDescription>
          </motion.div>
        </motion.div>
      </SectionHeader>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {tutors.map((tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} />
        ))}
      </motion.div>

      {/* Extension point note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-10 text-center text-xs text-muted-foreground/50"
      >
        更多导师即将加入 · Future: Supabase tutors table
      </motion.p>
    </Section>
  );
}
