export interface ConversationItem {
  id: string;
  title: string;
  preview: string;
  tag: string;
  date: string;
  isStarred?: boolean;
}

export const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: "1",
    title: "TechWokx Oracle Cloud Setup",
    preview: "Here's the complete setup guide for Oracle Cloud...",
    tag: "TechWokx",
    date: "Sep 17, 2026",
    isStarred: true
  },
  {
    id: "2",
    title: "Zara Kitchen Website Architecture",
    preview: "The website will be built using Next.js with a modern...",
    tag: "Zara Kitchen",
    date: "Sep 15, 2026"
  },
  {
    id: "3",
    title: "TechWokx Dashboard Design",
    preview: "Here's the updated dashboard structure with the...",
    tag: "TechWokx",
    date: "Sep 12, 2026"
  },
  {
    id: "4",
    title: "Ghana Escrow / MoMo Lab Concept",
    preview: "Here's a detailed architecture for the escrow platform...",
    tag: "Fintech",
    date: "Sep 10, 2026"
  },
  {
    id: "5",
    title: "Gladys Aforo Foundation Website",
    preview: "The website will include a donation system with Paystack...",
    tag: "Charity",
    date: "Sep 08, 2026"
  },
  {
    id: "6",
    title: "AI Infrastructure Strategy",
    preview: "We should use a combination of free-tier models for...",
    tag: "TechWokx",
    date: "Sep 05, 2026"
  },
  {
    id: "7",
    title: "Social Media Campaign Plan",
    preview: "Here's the 15-day social content plan for your approval...",
    tag: "Marketing",
    date: "Sep 02, 2026"
  }
];
