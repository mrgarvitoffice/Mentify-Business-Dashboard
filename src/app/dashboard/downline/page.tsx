"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { downlineTree, poolColors } from "@/lib/data";
import { ChevronRight, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Member = {
  id: string;
  name: string;
  pool: string;
  children: Member[];
};

function DownlineMember({ member, level = 0 }: { member: Member, level?: number }) {
  const [isExpanded, setIsExpanded] = useState(level < 2);

  const hasChildren = member.children && member.children.length > 0;

  return (
    <div style={{ marginLeft: `${level * 1.5}rem` }}>
      <div className="flex items-center gap-2 py-2">
        {hasChildren && (
          <button onClick={() => setIsExpanded(!isExpanded)} className="p-1 rounded-md hover:bg-muted">
            <ChevronRight className={cn("h-4 w-4 transition-transform", isExpanded && "rotate-90")} />
          </button>
        )}
        {!hasChildren && <div className="w-6" />}
        <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted"><User/></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-medium">{member.name}</p>
          <p className="text-xs text-muted-foreground">ID: {member.id}</p>
        </div>
        <div className={cn("text-xs font-semibold px-2 py-1 rounded-full border", poolColors[member.pool] || 'bg-gray-200 text-gray-800')}>
          {member.pool}
        </div>
      </div>
      {isExpanded && hasChildren && (
        <div>
          {member.children.map((child) => (
            <DownlineMember key={child.id} member={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}


export default function DownlinePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [poolFilter, setPoolFilter] = useState("all");
  
  // Filtering logic would be implemented here. For this example, we'll just show the full tree.

  return (
    <>
      <h1 className="font-headline text-3xl font-bold">Downline Genealogy</h1>
      
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Team Structure</CardTitle>
          <CardDescription>
            View and manage your downline. Click on a member to expand their team.
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
                {Object.keys(poolColors).map(pool => (
                  <SelectItem key={pool} value={pool.toLowerCase()}>{pool}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="rounded-lg border p-2">
             <DownlineMember member={downlineTree} />
          </div>
        </CardContent>
      </Card>
    </>
  );
}
