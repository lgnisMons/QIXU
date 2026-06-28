"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@qixu/ui/card";
import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
} from "@qixu/ui/section";
import { Badge } from "@qixu/ui/badge";
import { Button } from "@qixu/ui/button";
import { staggerContainer, fadeInUp, cardHover } from "@/lib/motion";
import type { Tutor } from "@/lib/mock-data";
import { tutors, recruitmentCard } from "@/lib/mock-data";

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={cardHover}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className="h-full border-border/50 bg-card transition-shadow hover:shadow-lg">
        <CardHeader className="items-center pb-4 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <User className="h-8 w-8 text-muted-foreground/40" />
          </div>
          <CardTitle className="text-lg">{tutor.name}</CardTitle>
          <CardDescription className="text-sm">{tutor.title}</CardDescription>
          <div className="mt-1 flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <GraduationCap className="h-3 w-3" />
            {tutor.school}
          </div>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm leading-relaxed text-muted-foreground">
            {tutor.bio}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
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

function RecruitmentCard() {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={cardHover}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Card className="h-full border-dashed border-border/60 bg-muted/30 transition-shadow hover:shadow-lg">
        <CardHeader className="items-center pb-4 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <Users className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-lg text-primary">
            {recruitmentCard.title}
          </CardTitle>
          <CardDescription className="text-sm">
            {recruitmentCard.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="flex flex-wrap justify-center gap-1.5">
            {recruitmentCard.targetSchools.map((school) => (
              <Badge key={school} variant="secondary" className="text-xs">
                {school}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="justify-center pb-6">
          <Button variant="outline" size="sm" asChild>
            <Link href={recruitmentCard.ctaHref}>
              {recruitmentCard.ctaLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardFooter>
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
              来自深圳及周边高校的导师，用真实、有温度的指导陪伴你的成长
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
        <RecruitmentCard />
      </motion.div>

      {/* Extension point */}
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
