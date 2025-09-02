
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
import { User, ChevronRight, Briefcase, Calendar, DollarSign } from "lucide-react";
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
  isLast,
}: {
  member: Member;
  level?: number;
  onMemberSelect: (member: Member) => void;
  isLast: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="relative pl-8">
      {/* Connector lines */}
      <div
        className={cn(
          "absolute left-4 top-0 w-px bg-border",
          isLast ? "h-7" : "h-full"
        )}
      ></div>
      <div className="absolute left-4 top-7 h-px w-4 bg-border"></div>

      {/* Member Card */}
      <div className="relative flex items-center gap-3 py-2">
        {hasChildren && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -left-2.5 top-5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-background ring-2 ring-border hover:bg-muted"
          >
            <ChevronRight
              className={cn(
                "h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )}
            />
          </button>
        )}

        <div
          onDoubleClick={() => onMemberSelect(member)}
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg border bg-card p-3 shadow-sm transition-all hover:border-primary/50 hover:shadow-md"
        >
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-muted">
              <User />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-medium text-foreground">{member.name}</p>
            <p className="text-xs text-muted-foreground">ID: {member.id}</p>
          </div>
          <div
            className={cn(
              "text-xs font-semibold px-2 py-1 rounded-full border",
              poolColors[member.pool] || "bg-gray-200 text-gray-800"
            )}
          >
            {member.pool}
          </div>
        </div>
      </div>

      {/* Children */}
      {isExpanded && hasChildren && (
        <div className="relative">
          {member.children.map((child, index) => (
            <DownlineMember
              key={child.id}
              member={child}
              level={level + 1}
              onMemberSelect={onMemberSelect}
              isLast={index === member.children.length - 1}
            />
          ))}
        </div>
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
      <h1 className="font-headline text-3xl font-bold">Downline Genealogy</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Team Structure</CardTitle>
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

          <div className="rounded-lg bg-muted/30 p-4">
            <DownlineMember
              member={downlineTree}
              onMemberSelect={setSelectedMember}
              isLast={true}
            />
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
              <DialogTitle className="font-headline text-2xl">
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

