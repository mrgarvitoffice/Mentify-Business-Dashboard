
"use client";

import { useState, useRef, WheelEvent } from "react";
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
import { Button } from "@/components/ui/button";
import { downlineTree, poolColors } from "@/lib/data";
import { User, Briefcase, Calendar, DollarSign, ChevronDown, ZoomIn, ZoomOut, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Member = {
  id: string;
  name: string;
  pool: string;
  businessVolume: number;
  joinDate: string;
  avatar: string;
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
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
  const hasChildren = member.children && member.children.length > 0;

  return (
    <div className="relative flex flex-col items-center">
      {/* Member Card */}
      <div className="relative group">
        <div
          onDoubleClick={() => onMemberSelect(member)}
          className="z-10 flex w-56 cursor-pointer flex-col items-center gap-2 rounded-xl border bg-card/80 backdrop-blur-sm p-4 text-center shadow-lg transition-all duration-300 hover:border-primary/50 hover:shadow-primary/20 hover:-translate-y-1"
        >
          <Avatar className="h-16 w-16 border-2 border-background">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-muted text-muted-foreground">
              <User className="h-8 w-8"/>
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="font-bold text-foreground text-lg">{member.name}</p>
            <p className="text-sm text-muted-foreground">ID: {member.id}</p>
          </div>
          <div
            className={cn(
              "text-xs font-bold px-3 py-1 rounded-full border",
              poolColors[member.pool] || "bg-gray-200 text-gray-800"
            )}
          >
            {member.pool}
          </div>
        </div>
      </div>

      {/* Expand/Collapse Button */}
      {hasChildren && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="absolute -bottom-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-background ring-2 ring-border transition-transform hover:bg-muted"
        >
          <ChevronDown className={cn("h-6 w-6 transition-transform", isExpanded && "rotate-180")} />
        </button>
      )}

      {/* Children Connectors & Recursion */}
      {isExpanded && hasChildren && (
        <>
          {/* Vertical line from parent */}
          <div className="mt-5 h-8 w-px bg-primary/30" />
          
          <div className="flex justify-center">
            {/* Horizontal line */}
            <div className="absolute h-px w-full bg-primary/30" />
            
            <div className="flex w-full justify-around space-x-4 pt-8">
              {member.children.map((child) => (
                <div key={child.id} className="relative flex flex-col items-center">
                  {/* Vertical line to child */}
                  <div className="absolute -top-8 h-8 w-px bg-primary/30" />
                  <DownlineMember
                    member={child}
                    level={level + 1}
                    onMemberSelect={onMemberSelect}
                  />
                </div>
              ))}
            </div>
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
  const [zoom, setZoom] = useState(1);
  const flowchartRef = useRef<HTMLDivElement>(null);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (event.ctrlKey) { // Enables pinch-to-zoom on trackpads
      event.preventDefault();
      setZoom((prevZoom) =>
        Math.min(Math.max(prevZoom - event.deltaY * 0.001, 0.5), 2)
      );
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.1, 2));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.1, 0.5));

  return (
    <>
      <h1 className="text-3xl font-bold">Downline Flowchart</h1>

      <Card>
        <CardHeader>
          <CardTitle>Team Structure</CardTitle>
          <CardDescription>
            Double-click a member to view details. Use the chevrons to expand/collapse branches. Use zoom controls or pinch-to-zoom to navigate.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-wrap gap-4 items-center">
            <Input
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
            <Select value={poolFilter} onValueChange={setPoolFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
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
            <div className="flex items-center gap-2 ml-auto">
                <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="font-mono text-sm w-12 text-center">{Math.round(zoom * 100)}%</span>
                 <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                </Button>
            </div>
          </div>
          
          <ScrollArea
            ref={flowchartRef}
            className="w-full rounded-lg bg-muted/20 p-8 border"
            onWheel={handleWheel}
          >
            <div 
              className="min-w-max transition-transform duration-300 ease-in-out"
              style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
            >
               <DownlineMember
                member={downlineTree}
                onMemberSelect={setSelectedMember}
              />
            </div>
            <ScrollBar orientation="horizontal" />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </CardContent>
      </Card>

      {selectedMember && (
        <Dialog
          open={!!selectedMember}
          onOpenChange={(isOpen) => !isOpen && setSelectedMember(null)}
        >
          <DialogContent className="sm:max-w-md p-0 overflow-hidden">
             <DialogTitle className="sr-only">{selectedMember.name}'s Details</DialogTitle>
            <div className="relative h-24 bg-primary/10">
                <Image src="https://picsum.photos/400/100" alt="Banner" fill objectFit="cover" data-ai-hint="abstract background"/>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <Avatar className="h-24 w-24 border-4 border-background ring-2 ring-primary">
                        <AvatarImage src={selectedMember.avatar} alt={selectedMember.name} />
                        <AvatarFallback><User className="h-10 w-10"/></AvatarFallback>
                    </Avatar>
                </div>
            </div>
            
            <DialogHeader className="pt-16 text-center items-center">
              <DialogTitle className="text-2xl">
                {selectedMember.name}
              </DialogTitle>
              <DialogDescription>
                Partner ID: {selectedMember.id}
              </DialogDescription>
            </DialogHeader>

            <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <span className="text-muted-foreground">Pool Level</span>
                        <span
                        className={cn(
                            "font-bold block",
                            poolColors[selectedMember.pool]?.replace('bg-', 'text-').replace('/20', '').replace(/border.*$/, '')
                        )}
                        >
                        {selectedMember.pool}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                     <div>
                        <span className="text-muted-foreground">Business Volume</span>
                        <span className="font-mono font-bold text-foreground block">
                            ${selectedMember.businessVolume.toLocaleString()}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <span className="text-muted-foreground">Date of Joining</span>
                        <span className="text-foreground font-bold block">{selectedMember.joinDate}</span>
                    </div>
                </div>
                 <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                        <span className="text-muted-foreground">Direct Downline</span>
                        <span className="text-foreground font-bold block">{selectedMember.children.length}</span>
                    </div>
                </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
