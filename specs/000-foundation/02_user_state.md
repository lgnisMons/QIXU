# 01.5_User_State.md

# QIXU（启序）

## User State Specification v1.0

---

# Document Information

Document Name

01.5_User_State.md

Version

v1.0

Status

Frozen

Priority

★★★★★

Depends On

01_User_Flow.md

CONSTITUTION.md

---

# Purpose

本规范定义：

所有用户在启序中的状态（State）。

任何页面权限、AI能力、评论权限、后台权限、数据存储规则，都必须基于用户状态进行判断。

状态优先于角色。

---

# State Machine

所有用户都遵循以下状态生命周期：

Anonymous

↓

Visitor

↓

Registered

↓

Verified

↓

Growth Profile

↓

Active

↓

Inactive

↓

Archived

---

# State 1：Anonymous（匿名访问）

特点：

* 未建立任何会话
* 未记录成长档案
* 可浏览公开内容

允许：

* 首页
* 导师
* 课程
* AI 介绍
* SEO 页面

禁止：

* 保存成长记录
* 评论
* 收藏
* 后台

---

# State 2：Visitor（游客）

特点：

* 已建立临时会话
* 不要求注册
* 数据默认临时保存

允许：

* AI 学习分析
* 成绩上传
* 志愿分析
* 下载报告

限制：

关闭页面后：

自动删除临时数据。

---

# State 3：Registered（注册用户）

特点：

拥有账号。

尚未完成成长档案。

允许：

* 登录
* 收藏
* 评论
* 保存 AI 报告

系统提示：

完善成长档案。

---

# State 4：Verified（已验证）

完成：

邮箱或手机号验证。

可：

预约导师。

报名训练营。

绑定家庭关系。

---

# State 5：Growth Profile（成长档案）

特点：

成长档案建立完成。

AI：

开始：

长期学习。

记录：

学习目标

成长轨迹

课程

作品

训练营

AI分析

老师评价

全部关联。

---

# State 6：Active（活跃）

最近持续学习。

AI：

根据成长记录：

主动：

推荐：

课程

训练营

资源。

---

# State 7：Inactive（非活跃）

超过设定周期未登录。

系统：

不会推送营销。

仅：

发送：

成长提醒。

苹小浣：

欢迎回来。

---

# State 8：Archived（归档）

用户主动：

删除账号。

或：

长期停用。

成长数据：

按用户设置：

删除

或导出。

---

# Identity Layer（身份层）

状态之外，还存在身份。

身份决定：

展示方式。

状态决定：

权限。

身份包括：

* 学生
* 家长
* 导师
* 创始人
* 管理员

同一个用户可以拥有多个身份。

例如：

家长 + 学生监护人。

导师 + 管理员。

---

# Badge Layer（身份徽章）

评论区自动显示：

⭐ 创始人

🎓 导师

👩 妈妈

👨 爸爸

🧑‍🎓 学员

🛡️ 管理员

🤖 AI 助手

身份由系统维护。

用户不可自行修改。

---

# Permission Principle

所有权限遵循：

State → Role → Permission

而不是：

Role → Permission。

任何新增功能，都必须先定义：

允许哪些状态访问。

---

# Privacy Principle

Visitor：

默认不保留数据。

Growth Profile：

由用户决定保存。

所有数据：

均支持：

导出

删除

重新授权。

---

# Success Principle

启序不以"注册人数"作为唯一目标。

真正目标：

让更多 Visitor 成长为拥有 Growth Profile 的长期学习者。
