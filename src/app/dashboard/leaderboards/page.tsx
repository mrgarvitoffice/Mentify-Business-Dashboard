
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { topEarners, topRecruiters, poolColors } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";


type LeaderboardUser = {
  rank: number;
  name: string;
  id: string;
  pool: string;
  avatar?: string; 
  income?: number;
  recruits?: number;
};

function DesktopLeaderboardTable({ data, type }: { data: LeaderboardUser[], type: 'earners' | 'recruiters' }) {
    return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Partner</TableHead>
              <TableHead>Pool</TableHead>
              <TableHead className="text-right">{type === 'earners' ? 'Income' : 'New Recruits'}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id} className={cn(user.name.startsWith("You") && "bg-primary/10")}>
                <TableCell className="font-bold text-lg">{user.rank}</TableCell>
                <TableCell className="font-medium flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback><User /></AvatarFallback>
                    </Avatar>
                    {user.name}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={cn("text-xs border-opacity-50", poolColors[user.pool] || 'bg-gray-200 text-gray-800')}>
                    {user.pool}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-mono">
                    {type === 'earners' ? `$${user.income?.toLocaleString()}` : user.recruits}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    );
}

function MobileLeaderboardList({ data, type }: { data: LeaderboardUser[], type: 'earners' | 'recruiters' }) {
    return (
        <div className="space-y-3">
            {data.map((user) => (
                <Card key={user.id} className={cn("transition-all duration-300 hover:shadow-lg hover:scale-[1.02]", user.name.startsWith("You") && "bg-primary/10 border-primary/50")}>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="text-2xl font-bold text-muted-foreground w-8 text-center">{user.rank}</div>
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                         <div className="flex-1">
                            <p className="font-bold">{user.name}</p>
                            <Badge variant="outline" className={cn("text-xs border-opacity-50 mt-1", poolColors[user.pool] || 'bg-gray-200 text-gray-800')}>
                                {user.pool}
                            </Badge>
                        </div>
                        <div className="text-right">
                           <p className="text-lg font-bold font-mono">
                             {type === 'earners' ? `$${user.income?.toLocaleString()}` : user.recruits}
                           </p>
                           <p className="text-xs text-muted-foreground">
                             {type === 'earners' ? 'Income' : 'Recruits'}
                           </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}


export default function LeaderboardsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Leaderboards</h1>
      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-2">
        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Top Earners (Monthly)</CardTitle>
            <CardDescription>Recognizing the highest income earners.</CardDescription>
          </CardHeader>
          <CardContent>
              {/* Desktop View */}
              <div className="hidden md:block">
                  <DesktopLeaderboardTable data={topEarners} type="earners" />
              </div>
              {/* Mobile View */}
              <div className="md:hidden">
                  <MobileLeaderboardList data={topEarners} type="earners" />
              </div>
          </CardContent>
        </Card>
        
        <Card className="transition-all duration-300 hover:shadow-xl">
          <CardHeader>
            <CardTitle>Top Recruiters (Monthly)</CardTitle>
            <CardDescription>Celebrating the top network builders.</CardDescription>
          </CardHeader>
          <CardContent>
              {/* Desktop View */}
              <div className="hidden md:block">
                  <DesktopLeaderboardTable data={topRecruiters} type="recruiters" />
              </div>
              {/* Mobile View */}
              <div className="md:hidden">
                  <MobileLeaderboardList data={topRecruiters} type="recruiters" />
              </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
