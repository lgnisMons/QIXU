# QIXU 启序 — 工程规范

**Version:** v1.0
**Status:** FROZEN
**Owner:** Engineering Layer

---

## 1. 技术栈

### 1.1 核心框架

| 类别 | 技术选择 | 版本约束 |
|------|----------|----------|
| 框架 | Next.js | ^15.x（App Router） |
| 语言 | TypeScript | ^5.x（strict mode） |
| 样式 | Tailwind CSS | ^3.4 |
| UI 组件 | shadcn/ui | latest |
| 动画 | framer-motion | ^11.x |
| 图标 | lucide-react | ^0.468+ |
| 表单 | react-hook-form | ^7.x |
| 校验 | zod | ^3.x |
| 类名工具 | clsx + tailwind-merge | latest |
| 变体管理 | class-variance-authority | ^0.7 |

### 1.2 后端与数据（后续 Sprint 引入）

| 类别 | 技术选择 | 引入时机 |
|------|----------|----------|
| BaaS | Supabase | 数据层 Sprint |
| ORM | — | 待定（需 RFC） |
| AI 编排 | LangGraph | AI Sprint |

**禁止在工程基础阶段安装 Supabase。**

---

## 2. Monorepo 结构

使用 pnpm workspaces 管理 monorepo：

```
qixu/
├── apps/
│   └── web/              # Next.js 主应用
├── packages/
│   ├── ui/               # 共享 UI 组件库（shadcn/ui）
│   ├── config/           # 共享配置（Tailwind preset、ESLint 等）
│   ├── types/            # 共享 TypeScript 类型
│   └── utils/            # 共享工具函数（cn、formatDate 等）
├── docs/                 # 系统文档（不可变）
├── specs/                # 功能规格
├── tasks/                # 执行任务
├── decisions/            # ADR 架构决策记录
└── .claude/              # AI 运行时（agents/skills/commands）
```

### 2.1 包间依赖规则

- `apps/web` 可依赖所有 packages
- `packages/ui` 可依赖 `packages/utils`、`packages/types`
- `packages/config` 不依赖其他内部包
- `packages/types` 不依赖其他内部包
- `packages/utils` 可依赖 `packages/types`
- **禁止**包间循环依赖

### 2.2 路径别名

| 别名 | 指向 |
|------|------|
| `@/*` | `apps/web/src/*` |
| `@qixu/ui/*` | `packages/ui/src/*` |
| `@qixu/config/*` | `packages/config/src/*` |
| `@qixu/types/*` | `packages/types/src/*` |
| `@qixu/utils/*` | `packages/utils/src/*` |

---

## 3. 开发工作流

### 3.1 规格优先开发

```
1. 阅读 docs/（系统规则）
2. 阅读 specs/（功能规格）
3. 生成 tasks/（任务分解）
4. 执行任务
5. 对照验收标准验证
6. 提交
7. 需要时更新 decisions/（ADR）
```

### 3.2 任务规则

- 每个任务是原子执行单元
- 每个任务可在一次 AI 运行中完成
- 每个任务包含验收检查
- 禁止不经过任务分解直接实现功能

### 3.3 RFC 流程

任何架构级变更需要：

1. 编写 RFC 文档到 `decisions/`
2. 说明动机、方案、替代方案、影响
3. 批准后执行
4. 记录为 ADR

---

## 4. 代码规范

### 4.1 TypeScript

- 启用 strict mode
- 禁止 `any` 类型（必要时使用 `unknown` 并类型收窄）
- 使用类型导入：`import type { ... }`
- 导出类型优先使用 `interface`，工具类型使用 `type`

### 4.2 React

- 使用函数组件 + Hooks
- Server Components 优先，Client Components 仅在需要交互时使用
- 使用 `"use client"` 指令标记客户端组件
- Props 使用 TypeScript interface 定义

### 4.3 样式

- 使用 Tailwind CSS 类名，不写裸 CSS
- 使用 `cn()` 合并条件类名
- 使用 cva 管理组件变体
- 设计令牌通过 CSS 变量引用，不直接使用 HSL 值

### 4.4 导入排序

使用 `@ianvs/prettier-plugin-sort-imports` 自动排序：

1. Node.js 内置模块
2. React
3. Next.js
4. 第三方库
5. `@qixu/*` 内部包
6. `@/*` 别名
7. 相对路径

### 4.5 命名约定

| 类型 | 约定 | 示例 |
|------|------|------|
| 组件文件 | PascalCase | `Button.tsx` |
| 工具文件 | camelCase | `utils.ts` |
| 页面/路由 | Next.js 约定 | `page.tsx`, `layout.tsx` |
| 常量 | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| 组件导出 | named export + default export | `export function Button()` |

---

## 5. 质量工具

| 工具 | 用途 | 配置位置 |
|------|------|----------|
| ESLint | 代码检查 | `apps/web/.eslintrc.json`（extends next） |
| Prettier | 代码格式化 | 根目录 `.prettierrc` |
| EditorConfig | 编辑器一致性 | 根目录 `.editorconfig` |
| TypeScript | 类型检查 | 根目录 `tsconfig.base.json` |

### 5.1 格式化命令

```bash
pnpm format        # 格式化所有文件
pnpm format:check  # 检查格式
pnpm lint          # 运行 ESLint
pnpm typecheck     # 运行类型检查
```

---

## 6. pnpm 配置

- Package manager: pnpm
- Node linker: hoisted（Windows 兼容性）
- Node 版本: >= 18.18.0

---

## 7. 环境变量

- `.env` 文件不提交到版本控制
- `.env.example` 记录所有需要的环境变量
- 公开变量使用 `NEXT_PUBLIC_` 前缀
- 服务端变量不加前缀，不在客户端代码中引用

---

## 8. Git 约定

（待补充：分支策略、commit message 规范、PR 流程）

---

END OF ENGINEERING
