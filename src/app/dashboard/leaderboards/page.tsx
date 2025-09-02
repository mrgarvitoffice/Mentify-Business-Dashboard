
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
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
import { ScrollArea } from "@/components/ui/scroll-area";


export default function LeaderboardsPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Leaderboards</h1>
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Earners (Monthly)</CardTitle>
            <CardDescription>Recognizing the highest income earners.</CardDescription>
          </CardHeader>
          <CardContent>
             <ScrollArea className="w-full whitespace-nowrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Pool</TableHead>
                    <TableHead className="text-right">Income</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topEarners.map((user) => (
                    <TableRow key={user.id} className={cn(user.name.startsWith("You") && "bg-primary/10")}>
                      <TableCell className="font-bold">{user.rank}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs", poolColors[user.pool] || 'bg-gray-200 text-gray-800')}>
                          {user.pool}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">${user.income.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Top Recruiters (Monthly)</CardTitle>
            <CardDescription>Celebrating the top network builders.</CardDescription>
          </CardHeader>
          <CardContent>
             <ScrollArea className="w-full whitespace-nowrap">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">Rank</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Pool</TableHead>
                    <TableHead className="text-right">New Recruits</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRecruiters.map((user) => (
                    <TableRow key={user.id} className={cn(user.name.startsWith("You") && "bg-primary/10")}>
                      <TableCell className="font-bold">{user.rank}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className={cn("text-xs", poolColors[user.pool] || 'bg-gray-200 text-gray-800')}>
                          {user.pool}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">{user.recruits}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
