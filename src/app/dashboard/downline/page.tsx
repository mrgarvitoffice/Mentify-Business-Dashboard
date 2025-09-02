
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { downlineTree, poolColors } from "@/lib/data";
import { User, ChevronRight, Briefcase, Calendar, DollarSign, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Member = {
  id: string;
  name: string;
  pool: string;
  businessVolume: number;
  joinDate: string;
  children: Member[];
};

function DownlineMember({
  member,
  level = 0,
  onMemberSelect,
}: {
  member: Member;
  level?: number;
  onMemberSelect: (member: Member) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="flex flex-col items-center">
      {/* Member Card */}
      <div className="relative flex flex-col items-center">
         <div
          onDoubleClick={() => onMemberSelect(member)}
          className="z-10 flex min-w-48 cursor-pointer flex-col items-center gap-2 rounded-lg border bg-card p-3 text-center shadow-md transition-all hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
        >
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-muted">
              <User className="h-6 w-6"/>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-semibold text-foreground">{member.name}</p>
            <p className="text-xs text-muted-foreground">ID: {member.id}</p>
          </div>
          <div
            className={cn(
              "text-xs font-bold px-2.5 py-1 rounded-full border",
              poolColors[member.pool] || "bg-gray-200 text-gray-800"
            )}
          >
            {member.pool}
          </div>
        </div>

        {/* Expand/Collapse Button */}
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -bottom-4 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-background ring-2 ring-border transition-transform hover:bg-muted"
          >
            {isExpanded ? <ChevronRight className="h-5 w-5 -rotate-90"/> : <ChevronDown className="h-5 w-5"/>}
          </button>
        )}
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <>
          {/* Vertical connector line from parent */}
          <div className="h-8 w-px bg-border"></div>
          {/* Horizontal connector line */}
          <div className="h-px w-full bg-border"></div>
          <div className="flex w-full justify-around pt-8">
            {member.children.map((child, index) => (
              <div key={child.id} className="relative flex flex-col items-center">
                {/* Vertical connector line to child */}
                <div className="absolute -top-8 h-8 w-px bg-border"></div>
                <DownlineMember
                  member={child}
                  level={level + 1}
                  onMemberSelect={onMemberSelect}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function DownlinePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [poolFilter, setPoolFilter] = useState("all");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  // Note: Filtering logic for a tree is complex.
  // For this example, we'll render the full tree and add a note for future implementation.
  // A real implementation would require a recursive search and filter function.

  return (
    <>
      <h1 className="text-3xl font-bold">Downline Flowchart</h1>

      <Card>
        <CardHeader>
          <CardTitle>Team Structure</CardTitle>
          <CardDescription>
            Double-click a member to view their details. Use the chevrons to
            expand or collapse branches.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex gap-4">
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={poolFilter} onValueChange={setPoolFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by pool" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Pools</SelectItem>
                {Object.keys(poolColors).map((pool) => (
                  <SelectItem key={pool} value={pool.toLowerCase()}>
                    {pool}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full overflow-x-auto rounded-lg bg-muted/30 p-8">
            <div className="min-w-[800px]">
               <DownlineMember
                member={downlineTree}
                onMemberSelect={setSelectedMember}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {selectedMember && (
        <Dialog
          open={!!selectedMember}
          onOpenChange={(isOpen) => !isOpen && setSelectedMember(null)}
        >
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                {selectedMember.name}
              </DialogTitle>
              <DialogDescription>
                Details for partner ID: {selectedMember.id}
              </DialogDescription>
            </DialogHeader>
            <div className="mt-4 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Pool Level:</span>
                <span
                  className={cn(
                    "font-semibold px-2 py-0.5 rounded-full border text-xs",
                    poolColors[selectedMember.pool]
                  )}
                >
                  {selectedMember.pool}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Business Volume:</span>
                <span className="font-mono font-semibold text-primary">
                  ${selectedMember.businessVolume.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">Date of Joining:</span>
                <span className="text-foreground">{selectedMember.joinDate}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
