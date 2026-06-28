/**
 * Mock community data — typed interfaces only, no JSON.
 * Replace with Supabase queries in Sprint-007.
 */

export interface CommunityMember {
  id: string;
  name: string;
  avatar: string;
  joinDate: string;
  achievements: string[];
}

export interface CommunityTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  memberCount: number;
  postCount: number;
}

export const mockCommunityMembers: CommunityMember[] = [];

export const mockCommunityTopics: CommunityTopic[] = [
  {
    id: "topic-ai",
    title: "AI 学习交流",
    description: "讨论 AI 工具使用、AI 素养提升、AI 与教育的话题。",
    category: "AI 能力",
    memberCount: 0,
    postCount: 0,
  },
  {
    id: "topic-study",
    title: "学习方法分享",
    description: "分享高效学习技巧、时间管理方法、记忆技巧等。",
    category: "学习方法",
    memberCount: 0,
    postCount: 0,
  },
  {
    id: "topic-growth",
    title: "成长记录",
    description: "记录自己的学习成长历程，分享进步与心得。",
    category: "成长",
    memberCount: 0,
    postCount: 0,
  },
];

export const communityRecruitment = {
  title: "成长社区即将开放",
  description:
    "一个温暖、鼓励的学习社区正在建设中。这里将汇聚学习者、导师和 AI 助手，共同构建成长生态。",
  ctaLabel: "预约加入",
  ctaHref: "/contact",
} as const;
