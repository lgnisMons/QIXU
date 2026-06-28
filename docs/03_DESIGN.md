# QIXU 启序 — 设计规范

**Version:** v1.0
**Status:** FROZEN
**Owner:** Design Layer

---

## 1. 设计哲学

### 1.1 核心体验原则

- **Low Anxiety**：消除焦虑感，不使用倒计时、紧迫感营销、红色警告轰炸
- **High Guidance**：每一步有清晰引导，用户永远知道自己在哪、能做什么
- **High Trust**：透明、真实，导师信息真实，评价真实，AI 能力边界清晰
- **Privacy First**：隐私设置可见、可控、默认安全

### 1.2 AI 设计原则

- **AI Second**：AI 是辅助者，不是主角。用户始终掌控决策
- **可解释**：AI 的建议需要给出理由，而非黑箱输出
- **可拒绝**：任何 AI 推荐都可以被忽略或拒绝
- **有温度**：苹小浣的交互要有人情味，但不过度拟人

---

## 2. 设计令牌系统（Design Tokens）

使用 HSL CSS 变量实现可扩展主题系统。不使用业务色，仅定义语义令牌。

### 2.1 语义色彩令牌

| 令牌 | 用途 |
|------|------|
| `--primary` | 品牌主色，主要操作、重点元素 |
| `--primary-foreground` | 主色上的文字色 |
| `--secondary` | 辅助色，次要操作、次要元素 |
| `--secondary-foreground` | 辅助色上的文字色 |
| `--background` | 页面背景 |
| `--foreground` | 正文文字色 |
| `--surface` | 卡片、面板、容器表面 |
| `--surface-foreground` | 表面上的文字色 |
| `--success` | 成功状态、正向反馈、完成 |
| `--success-foreground` | 成功色上的文字色 |
| `--warning` | 警告状态、需注意 |
| `--warning-foreground` | 警告色上的文字色 |
| `--danger` | 错误、危险、破坏性操作 |
| `--danger-foreground` | 危险色上的文字色 |

### 2.2 支撑令牌

| 令牌 | 用途 |
|------|------|
| `--muted` | 弱化背景、非重点区域 |
| `--muted-foreground` | 次要文字、说明文字 |
| `--accent` | 强调色、高亮元素 |
| `--accent-foreground` | 强调色上的文字色 |
| `--card` | 卡片背景 |
| `--card-foreground` | 卡片文字 |
| `--popover` | 弹出层背景 |
| `--popover-foreground` | 弹出层文字 |
| `--border` | 边框色 |
| `--input` | 输入框边框色 |
| `--ring` | 焦点环颜色 |
| `--radius` | 全局圆角基准值 |

### 2.3 暗色模式

所有令牌必须提供 `:root`（亮色）和 `.dark`（暗色）两套值，通过 `darkMode: ["class"]` 切换。

### 2.4 业务色彩

业务色（课程分类、标签等）在 UI Sprint 阶段定义，通过 Tailwind 配置扩展，不硬编码在组件中。

---

## 3. 排版

### 3.1 字体

- 中文：系统默认中文字体栈（苹方 / 微软雅黑 / Noto Sans SC）
- 英文/数字：Inter 或系统无衬线字体
- 等宽：用于代码展示，使用系统等宽字体栈

### 3.2 字号层级

遵循 Tailwind 默认字号体系（text-xs 到 text-5xl），不自定义随意字号。

### 3.3 行高与字间距

- 正文：leading-relaxed
- 标题：leading-tight
- 不使用紧缩字间距

---

## 4. 间距与圆角

### 4.1 间距

使用 Tailwind 默认 4px 基准间距体系（space-0 到 space-24）。

### 4.2 圆角

- 大圆角：`--radius`（卡片、按钮、输入框）
- 中圆角：`calc(var(--radius) - 2px)`
- 小圆角：`calc(var(--radius) - 4px)`

---

## 5. 动效

### 5.1 动效原则

- 柔和自然，不突兀
- 时长控制在 150ms–300ms
- 使用 ease-out 缓动
- 尊重 `prefers-reduced-motion` 设置

### 5.2 动效工具

使用 framer-motion 实现组件级动画，使用 Tailwind CSS transition 实现简单交互反馈。

---

## 6. 组件系统

### 6.1 基础组件库

基于 shadcn/ui 构建，使用 class-variance-authority（cva）实现变体管理。

### 6.2 组件原则

- 每个组件有明确的单一职责
- 通过 cva 定义 variants，不使用 props 拼接 className
- 使用 `cn()` 工具函数合并类名（clsx + tailwind-merge）
- 组件不包含业务逻辑，纯 UI 组件放在 `packages/ui`

### 6.3 图标

使用 lucide-react 图标库，统一尺寸和 stroke-width。

---

## 7. 响应式设计

移动优先（Mobile First），断点遵循 Tailwind 默认体系：

- sm: 640px
- md: 768px
- lg: 1024px
- xl: 1280px
- 2xl: 1400px（容器最大宽度）

---

## 8. 无障碍

- 所有交互元素可键盘导航
- 颜色对比度符合 WCAG AA 标准
- 图片必须有 alt 文本
- 表单控件必须有 label
- 焦点状态可见（--ring 令牌）
- 支持 `prefers-reduced-motion`

---

END OF DESIGN
