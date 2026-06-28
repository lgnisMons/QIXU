"use client";

import Link from "next/link";
import {
  Camera, TrendingUp, AlertTriangle, Lightbulb, ArrowRight, Clock,
  CheckCircle2, Target, BarChart3,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@qixu/ui/card";
import { Badge } from "@qixu/ui/badge";
import { Button } from "@qixu/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import type { ReportSection, SnapshotContent, AnalysisContent, SuggestionsContent, NextStepContent, TimelineContent } from "@qixu/domain";

// ---- Icon Mapping ----

const sectionIcons = {
  snapshot: Camera,
  strength: TrendingUp,
  weakness: AlertTriangle,
  growth: Lightbulb,
  next: ArrowRight,
  timeline: Clock,
} as const;

const sectionColors = {
  snapshot: "border-l-primary",
  strength: "border-l-success",
  weakness: "border-l-warning",
  growth: "border-l-primary",
  next: "border-l-primary",
  timeline: "border-l-muted-foreground",
} as const;

// ---- Section Renderers ----

function SnapshotSection({ content }: { content: SnapshotContent }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {content.items.map((item: { label: string; value: string; emphasis?: boolean }) => (
        <div key={item.label} className="rounded-lg border border-border/40 bg-surface p-3 text-center">
          <div className="text-[10px] text-muted-foreground">{item.label}</div>
          <div className={`mt-0.5 font-semibold ${item.emphasis ? "text-primary" : "text-foreground"}`}>
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function AnalysisSection({ content }: { content: AnalysisContent }) {
  return (
    <ul className="space-y-2">
      {content.items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5 rounded-lg border border-border/30 px-4 py-3">
          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${
            content.color === "success" ? "text-success" : content.color === "warning" ? "text-warning" : "text-primary"
          }`} />
          <span className="text-sm text-foreground/80">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function SuggestionsSection({ content }: { content: SuggestionsContent }) {
  return (
    <div className="space-y-4">
      {content.phases.map((phase, i) => (
        <div key={i} className="rounded-xl border border-border/40 bg-surface p-4">
          <div className="flex items-center justify-between">
            <h4 className="font-semibold text-foreground">{i + 1}. {phase.title}</h4>
            <Badge variant="secondary" className="text-xs">{phase.duration}</Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground">{phase.description}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="text-[10px] text-muted-foreground">重点学科：</span>
            {phase.focus.map((f) => (
              <Badge key={f} variant="outline" className="text-[10px]">{f}</Badge>
            ))}
            <Badge variant="secondary" className="text-[10px]">≈{phase.weeklyHours}h/周</Badge>
          </div>
        </div>
      ))}
      <div className="rounded-lg border border-dashed border-border/60 bg-muted/20 p-3 text-center">
        <p className="text-xs text-muted-foreground">
          总周期：{content.totalDuration} · {content.estimatedImprovement}
        </p>
      </div>
    </div>
  );
}

function NextStepSection({ content }: { content: NextStepContent }) {
  return (
    <div className="rounded-xl border-2 border-primary/20 bg-primary/5 p-6 text-center">
      <Target className="mx-auto h-8 w-8 text-primary" />
      <h3 className="mt-3 text-lg font-bold text-foreground">{content.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{content.description}</p>
      {content.tutorNote && (
        <p className="mt-2 text-xs text-primary/70">{content.tutorNote}</p>
      )}
      <Button asChild className="mt-4" size="lg">
        <Link href={content.actionHref}>
          {content.actionLabel}<ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}

function TimelineSection({ content }: { content: TimelineContent }) {
  return (
    <div className="relative space-y-0">
      {content.milestones.map((m, i) => (
        <div key={m.label} className="relative flex gap-4 pb-6">
          {/* Timeline line */}
          {i < content.milestones.length - 1 && (
            <div className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-border" />
          )}
          {/* Dot */}
          <div className={`relative z-10 mt-1 h-3 w-3 shrink-0 rounded-full border-2 ${
            i === 0 ? "border-primary bg-primary" : i === content.milestones.length - 1 ? "border-muted-foreground bg-muted-foreground" : "border-primary/40 bg-card"
          }`} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold">{m.label}</span>
              <Badge variant="secondary" className="text-[10px]">{m.timeframe}</Badge>
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">{m.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ---- Main Report Component ----

interface AssessmentReportProps {
  sections: ReportSection[];
  aiNotes?: string[];
}

export function AssessmentReport({ sections, aiNotes }: AssessmentReportProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="space-y-6"
    >
      {sections.map((section) => {
        const Icon = sectionIcons[section.icon];
        const colorClass = sectionColors[section.icon];

        return (
          <motion.div key={section.id} variants={fadeInUp}>
            <Card className={`overflow-hidden border-border/50 shadow-sm border-l-4 ${colorClass}`}>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-base">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                {section.content.type === "snapshot" && <SnapshotSection content={section.content} />}
                {section.content.type === "analysis" && <AnalysisSection content={section.content} />}
                {section.content.type === "suggestions" && <SuggestionsSection content={section.content} />}
                {section.content.type === "next_step" && <NextStepSection content={section.content} />}
                {section.content.type === "timeline" && <TimelineSection content={section.content} />}
              </CardContent>
            </Card>
          </motion.div>
        );
      })}

      {/* AI Notes */}
      {aiNotes && aiNotes.length > 0 && (
        <motion.div variants={fadeInUp}>
          <Card className="border-dashed border-border/60 bg-muted/20">
            <CardContent className="p-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">📋 系统备注</p>
              <ul className="space-y-1">
                {aiNotes.map((note, i) => (
                  <li key={i} className="text-[11px] text-muted-foreground/60">{note}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
}
