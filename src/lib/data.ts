
import type { BarChartProps } from "@/components/ui/chart";
import { DollarSign, Zap, Users, TrendingUp, Award, Crown, Diamond, Medal, FileText, Link, Presentation, Image as LucideImage, Video, Trophy } from "lucide-react";

export const user = {
  name: "Alex Partner",
  avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
  pool: "Gold",
  poolColor: "text-yellow-500",
};

export const kpiData = [
  { title: "Monthly Business Volume", value: "$12,450", icon: DollarSign, change: "+15.2%", changeType: "increase" as const },
  { title: "Lifetime Business Volume", value: "$128,920", icon: Zap, change: "", changeType: "increase" as const },
  { title: "Active Downline", value: "312", icon: Users, change: "+5 new", changeType: "increase" as const },
  { title: "Monthly Income", value: "$3,250", icon: TrendingUp, change: "+8.5%", changeType: "increase" as const },
];

export const poolData = {
  currentPool: "Gold",
  nextPool: "Platinum",
  progress: 72,
  bvForNextPool: 2800,
};

export const achievements = [
  { icon: Award, title: "Top Recruiter", date: "May 2024", color: "text-yellow-500" },
  { icon: Trophy, title: "Fast Start Bonus", date: "Feb 2024", color: "text-blue-500" },
  { icon: Medal, title: "Gold Pool Achiever", date: "Jan 2024", color: "text-gray-500" },
  { icon: Crown, title: "$10k Club", date: "Dec 2023", color: "text-purple-500" },
];


export const promotions = [
    { id: 1, title: 'Summer Bonanza: Earn Double Points!', description: 'All business volume generated in July and August earns double points towards the annual trip.', image: 'https://picsum.photos/1200/400?random=1', dataAiHint: 'summer beach' },
    { id: 2, title: 'Unlock Your Crown Diamond Potential', description: 'Special training session with top earners next Saturday. Register now!', image: 'https://picsum.photos/1200/400?random=2', dataAiHint: 'business meeting' },
    { id: 3, title: 'Limited Time Offer: Fast Start Pack', description: 'Get the new Fast Start Pack with exclusive marketing materials for 20% off.', image: 'https://picsum.photos/1200/400?random=3', dataAiHint: 'product launch' },
];

export const incomeChartData = [
  { month: "Jan", income: 2200 }, { month: "Feb", income: 2500 },
  { month: "Mar", income: 2300 }, { month: "Apr", income: 2800 },
  { month: "May", income: 3050 }, { month: "Jun", income: 3250 },
  { month: "Jul", income: 3400 }, { month: "Aug", income: 3100 },
  { month: "Sep", income: 3600 }, { month: "Oct", income: 3500 },
  { month: "Nov", income: 3800 }, { month: "Dec", income: 4100 },
];
export const incomeChartConfig = {
  income: { label: "Income", color: "hsl(var(--chart-1))" },
} satisfies BarChartProps["config"];

export const incomeBreakdown = [
  { category: "Direct Bonus", amount: 1250.00, date: "2024-05-30" },
  { category: "Pool Bonus", amount: 1500.00, date: "2024-05-30" },
  { category: "Upline Matching Bonus", amount: 500.00, date: "2024-05-30" },
  { category: "Direct Bonus", amount: 1100.00, date: "2024-04-30" },
  { category: "Pool Bonus", amount: 1450.00, date: "2024-04-30" },
  { category: "Upline Matching Bonus", amount: 450.00, date: "2024-04-30" },
];

export const downlineTree = {
  id: "CD-001", name: "Jessica Gold", pool: "Crown Diamond", businessVolume: 500000, joinDate: "2020-01-10", avatar: "https://i.pravatar.cc/150?u=cd001", children: [
    { id: "DI-001", name: "Mike Diamond", pool: "Diamond", businessVolume: 250000, joinDate: "2021-03-15", avatar: "https://i.pravatar.cc/150?u=di001", children: [
        { id: "PL-001", name: "Sarah Platinum", pool: "Platinum", businessVolume: 100000, joinDate: "2022-02-20", avatar: "https://i.pravatar.cc/150?u=pl001", children: [
            { id: "ME-001", name: "You (Alex Partner)", pool: "Gold", businessVolume: 50000, joinDate: "2023-01-15", avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d", children: [
                { id: "DP-101", name: "John Smith", pool: "Silver", businessVolume: 20000, joinDate: "2023-03-22", avatar: "https://i.pravatar.cc/150?u=dp101", children: [
                    { id: "DP-201", name: "Jane Doe", pool: "Bronze", businessVolume: 5000, joinDate: "2023-05-10", avatar: "https://i.pravatar.cc/150?u=dp201", children: [] },
                ]},
                { id: "DP-102", name: "Sarah Miller", pool: "Silver", businessVolume: 18000, joinDate: "2023-04-11", avatar: "https://i.pravatar.cc/150?u=dp102", children: [
                     { id: "DP-203", name: "Chris Green", pool: "Bronze", businessVolume: 6250, joinDate: "2023-07-20", avatar: "https://i.pravatar.cc/150?u=dp203", children: []},
                ]},
            ]},
            { id: "GL-002", name: "David King", pool: "Gold", businessVolume: 60000, joinDate: "2022-08-05", avatar: "https://i.pravatar.cc/150?u=gl002", children: [
                 { id: "DP-103", name: "Tom Wilson", pool: "Silver", businessVolume: 22000, joinDate: "2022-09-01", avatar: "https://i.pravatar.cc/150?u=dp103", children: [
                    { id: "DP-204", name: "Lisa Brown", pool: "Bronze", businessVolume: 7000, joinDate: "2022-10-10", avatar: "https://i.pravatar.cc/150?u=dp204", children: [] },
                 ]},
            ]},
        ]},
        { id: "PL-002", name: "Laura Chen", pool: "Platinum", businessVolume: 120000, joinDate: "2021-09-12", avatar: "https://i.pravatar.cc/150?u=pl002", children: [
            { id: "GL-003", name: "Kevin Hall", pool: "Gold", businessVolume: 75000, joinDate: "2021-11-05", avatar: "https://i.pravatar.cc/150?u=gl003", children: [] },
            { id: "GL-004", name: "Grace Adams", pool: "Gold", businessVolume: 80000, joinDate: "2022-01-25", avatar: "https://i.pravatar.cc/150?u=gl004", children: [] },
        ]},
    ]},
    { id: "DI-002", name: "Brian Lee", pool: "Diamond", businessVolume: 280000, joinDate: "2020-11-30", avatar: "https://i.pravatar.cc/150?u=di002", children: [
        { id: "PL-003", name: "Emma White", pool: "Platinum", businessVolume: 150000, joinDate: "2021-02-18", avatar: "https://i.pravatar.cc/150?u=pl003", children: [
          { id: "GL-005", name: "Frank Wright", pool: "Gold", businessVolume: 65000, joinDate: "2021-11-05", avatar: "https://i.pravatar.cc/150?u=gl005", children: [] },
          { id: "GL-006", name: "Helen Clark", pool: "Gold", businessVolume: 82000, joinDate: "2022-01-25", avatar: "https://i.pravatar.cc/150?u=gl006", children: [] },
        ] },
        { id: "PL-004", name: "George King", pool: "Platinum", businessVolume: 130000, joinDate: "2021-02-18", avatar: "https://i.pravatar.cc/150?u=pl004", children: [
          { id: "GL-007", name: "Ivy Green", pool: "Gold", businessVolume: 72000, joinDate: "2021-11-05", avatar: "https://i.pravatar.cc/150?u=gl007", children: [] },
        ] },
    ]},
  ],
};


export const marketingAssets = [
  { type: "Affiliate Link", title: "Your Personal Link", icon: Link, action: "Copy" },
  { type: "Presentation", title: "Business Opportunity Deck", icon: Presentation, action: "Download" },
  { type: "Flyer", title: "Product Showcase Flyer", icon: FileText, action: "Download" },
  { type: "Social Media", title: "Instagram Post Templates", icon: LucideImage, action: "Download" },
  { type: "Video", title: "Explainer Video", icon: Video, action: "Watch" },
  { type: "Social Media", title: "Facebook Banner", icon: LucideImage, action: "Download" },
];


export const topEarners = [
  { rank: 1, name: "Jessica Gold", id: "JG-001", income: 15200, pool: "Crown Diamond" },
  { rank: 2, name: "Mike Diamond", id: "MD-002", income: 12800, pool: "Diamond" },
  { rank: 3, name: "Sarah Platinum", id: "SP-003", income: 9500, pool: "Platinum" },
  { rank: 4, name: "You (Alex Partner)", id: "ME-001", income: 3250, pool: "Gold" },
  { rank: 5, name: "Chris Silver", id: "CS-004", income: 2100, pool: "Silver" },
];

export const topRecruiters = [
  { rank: 1, name: "Recruiter Ron", id: "RR-001", recruits: 25, pool: "Platinum" },
  { rank: 2, name: "Builder Betty", id: "BB-002", recruits: 21, pool: "Gold" },
  { rank: 3, name: "You (Alex Partner)", id: "ME-001", recruits: 18, pool: "Gold" },
  { rank: 4, name: "Networker Nancy", id: "NN-003", recruits: 15, pool: "Silver" },
  { rank: 5, name: "Connector Carl", id: "CC-004", recruits: 12, pool: "Silver" },
];

export const poolColors: { [key: string]: string } = {
  'Bronze': 'bg-[#CD7F32]/20 text-[#CD7F32] border-[#CD7F32]/50',
  'Silver': 'bg-[#C0C0C0]/20 text-[#A9A9A9] border-[#C0C0C0]/50',
  'Gold': 'bg-[#FFD700]/20 text-[#FFD700] border-[#FFD700]/50',
  'Platinum': 'bg-[#E5E4E2]/20 text-[#8A8D90] border-[#E5E4E2]/50',
  'Diamond': 'bg-[#B9F2FF]/20 text-[#67E3FF] border-[#B9F2FF]/50',
  'Crown Diamond': 'bg-[#800080]/20 text-[#C077C0] border-[#800080]/50',
};

// Data for AI flows
export const mockDownlineDataForAI = JSON.stringify([
  { id: "DP-101", name: "John Smith", currentPool: "Silver", businessVolume: 4500 },
  { id: "DP-102", name: "Sarah Miller", currentPool: "Silver", businessVolume: 9800 },
  { id: "DP-203", name: "Chris Green", currentPool: "Silver", businessVolume: 8500 },
]);

export const mockPartnerPerformanceForAI = JSON.stringify({
  currentPool: "Gold",
  monthlyBV: 12450,
  newRecruitsThisMonth: 3,
  income: 3250,
});

export const mockDownlineActivityForAI = JSON.stringify({
  totalActive: 312,
  topPerformer: { id: "DP-102", name: "Sarah Miller", monthlyBV: 2500 },
  nearPromotion: { id: "DP-101", name: "John Smith", bvToNextPool: 500 },
});




