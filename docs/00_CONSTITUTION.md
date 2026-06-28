# QIXU 启序 — 项目宪章

**Version:** v1.0
**Status:** FROZEN
**Owner:** Architecture Layer

---

## 1. 项目定义

QIXU（启序）是一个 AI 原生教育操作系统（AI-Native Education OS），由以下模块构成：

- 传统辅导系统（人类导师）
- AI 学习助手
- AI 工具训练系统（面向 Claude Code / LangGraph）
- 考试与成长追踪系统
- 未来扩展：训练营、推荐系统、管理后台

QIXU 不是：
- 简单的家教网站
- 课程交易市场
- 静态内容站点

QIXU 是：

> 模块化的 AI 驱动教育操作系统。

---

## 2. 核心哲学

### 2.1 成长序列模型（Growth Sequence）

所有用户体验基于以下循环：

> 输入 → 学习 → 反馈 → 成长 → 推荐

一切产品设计必须映射到此循环。

### 2.2 品牌哲学

> 启蒙 · 序章 · 未来。

Slogan：**启于今日，序向未来。**

### 2.3 设计原则

整个用户体验遵循：

- **Low Anxiety** — 低焦虑设计
- **High Guidance** — 高引导性
- **High Trust** — 高信任度
- **High Transparency** — 高透明度
- **Privacy First** — 隐私优先
- **Growth First** — 成长优先
- **AI Second** — AI 是辅助，不是主角
- **Learning First** — 学习至上

---

## 3. 系统稳定性规则（绝对规则）

架构永远不得漂移。层级规则如下：

| 层级 | 目录 | 性质 | 规则 |
|------|------|------|------|
| 系统层 | `docs/` | 不可变 | 永不新增文件，仅通过 RFC 更新 |
| 规格层 | `specs/` | 可迭代 | 功能定义存放于此 |
| 执行层 | `tasks/` | 执行层 | AI/Codex 按任务执行 |
| 实现层 | `apps/` | 实现 | Next.js 代码 |
| 决策层 | `decisions/` | 历史 | ADR（架构决策记录）日志 |
| 运行层 | `.claude/` | 工具 | Agents、Skills、Commands |

### 3.1 RFC 优先规则

任何结构性或系统级变更必须经过：

> RFC（Request for Change）

禁止直接修改：
- `docs/` 目录内容
- 系统架构
- 核心工作流

### 3.2 规格优先开发

AI 执行必须遵循：

1. 阅读规格
2. 转换为任务
3. 执行任务
4. 对照验收标准验证

禁止从模糊提示直接实现功能。

---

## 4. 用户类型

QIXU 共有七类用户：

| 用户类型 | 类型 | 说明 |
|----------|------|------|
| Visitor（游客） | 人类 | 匿名访问者 |
| Learner（学习者） | 人类 | 注册学生 |
| Parent（家长） | 人类 | 家长/监护人 |
| Teacher（导师） | 人类 | 认证教师 |
| Founder（创始人） | 人类 | 平台创始人 |
| Administrator（管理员） | 人类 | 系统管理员 |
| AI Guardian（苹小浣） | AI | 系统AI角色 |

---

## 5. 用户状态机

状态优先于角色。所有权限判断遵循：

> State → Role → Permission

用户生命周期：

```
Anonymous → Visitor → Registered → Verified → Growth Profile → Active → Inactive → Archived
```

- **Anonymous**：匿名访问，可浏览公开内容
- **Visitor**：临时会话，可使用AI分析，关闭页面数据自动销毁
- **Registered**：有账号，可评论收藏，需完善成长档案
- **Verified**：邮箱/手机验证，可预约导师、报名训练营
- **Growth Profile**：成长档案建立，AI开始长期学习陪伴
- **Active**：持续学习，AI主动推荐
- **Inactive**：长期未登录，仅发送成长提醒，不推送营销
- **Archived**：用户主动删除或长期停用

---

## 6. 隐私原则

- Visitor 默认不保留数据
- 成长档案数据由用户决定是否保存
- 所有数据支持导出、删除、重新授权
- 网站不强制注册，任何时候可继续匿名

---

## 7. 成功标准

QIXU 不以"注册人数"或"课程购买"作为唯一目标。

真正目标：

> 让更多 Visitor 成长为拥有 Growth Profile 的长期学习者，建立长期成长关系。

---

## 8. AI Guardian 行为准则

苹小浣（AI Guardian）：

- 不会主动推销课程
- 不会打断用户
- 不会频繁弹窗
- 在关键节点给予鼓励、陪伴、祝贺、引导、安慰

---

## 9. 技术约束

- 禁止未经 RFC 添加新框架
- 禁止跳过规格层直接开发
- 禁止无任务分解直接实现
- 禁止在代码中混合 UI 决策与架构决策
- Supabase 在工程基础完成后引入，不在此阶段安装

---

END OF CONSTITUTION
