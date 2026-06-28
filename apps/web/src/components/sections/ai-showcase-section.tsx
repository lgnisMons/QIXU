"use client";

import { useState, useCallback } from "react";
import { Upload, Search, Lightbulb, ArrowRight, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeader, SectionTitle, SectionDescription } from "@qixu/ui/section";
import { Button } from "@qixu/ui/button";
import { staggerContainer, fadeInUp } from "@/lib/motion";
import { mockWorkflowSteps } from "@/lib/mock-data";

const stepIconMap = {
  upload: Upload,
  analyze: Search,
  suggestion: Lightbulb,
} as const;

const stepColors = [
  "bg-primary/10 text-primary border-primary/20",
  "bg-warning/10 text-warning border-warning/20",
  "bg-success/10 text-success border-success/20",
] as const;

export function AIShowcaseSection() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  const handleStepClick = useCallback((stepIndex: number) => {
    setActiveStep((prev) => (prev === stepIndex ? null : stepIndex));
  }, []);

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
            <SectionTitle>AI 如何工作</SectionTitle>
          </motion.div>
          <motion.div variants={fadeInUp}>
            <SectionDescription>
              AI 不是替代者，而是辅助者。上传 → 分析 → 建议，三步获得个性化成长指导。
            </SectionDescription>
          </motion.div>
        </motion.div>
      </SectionHeader>

      {/* Interactive Mock Workflow */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={staggerContainer}
        className="mx-auto max-w-3xl"
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-0">
          {mockWorkflowSteps.map((step, index) => {
            const Icon = stepIconMap[step.icon];
            const isActive = activeStep === index;
            const isCompleted = activeStep !== null && activeStep > index;

            return (
              <motion.div key={step.id} variants={fadeInUp} className="flex-1">
                {/* Connector arrow between steps */}
                {index < mockWorkflowSteps.length - 1 && (
                  <div className="hidden sm:block">
                    <div className="absolute right-0 top-6 -z-0 h-px w-full bg-border" />
                  </div>
                )}

                <div className="relative flex flex-col items-center px-2">
                  <button
                    onClick={() => handleStepClick(index)}
                    className={`relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                      isActive
                        ? stepColors[index] + " scale-110 shadow-md"
                        : isCompleted
                          ? "border-success/30 bg-success/5 text-success"
                          : "border-border/50 bg-card text-muted-foreground hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </button>

                  <div className="mt-3 text-center">
                    <div
                      className={`text-sm font-semibold transition-colors ${
                        isActive || isCompleted
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Expanded step detail */}
        <AnimatePresence>
          {activeStep !== null && (
            <motion.div
              key={`detail-${activeStep}`}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 overflow-hidden"
            >
              {(() => {
                const step = mockWorkflowSteps[activeStep];
                if (!step) return null;
                const Icon = stepIconMap[step.icon];
                return (
              <div className="rounded-xl border border-border/50 bg-card p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      stepColors[activeStep]
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {step.title}阶段
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                    {step.mockContent && (
                      <div className="mt-3 rounded-md border border-dashed border-border/60 bg-muted/30 p-3">
                        <p className="text-xs text-muted-foreground">
                          💡 模拟数据：{step.mockContent}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
                );
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Extension point */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-12 max-w-2xl rounded-lg border border-dashed border-border/60 bg-muted/30 p-4 text-center"
      >
        <p className="text-xs text-muted-foreground/60">
          Future: LangGraph agent orchestration · Real-time AI state display ·
          Interactive demos with actual file upload
        </p>
      </motion.div>
    </Section>
  );
}
