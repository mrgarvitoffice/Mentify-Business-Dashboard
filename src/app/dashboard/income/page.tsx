
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Calendar, DollarSign } from "lucide-react";
import {
  incomeChartData,
  incomeChartConfig,
  incomeBreakdown,
} from "@/lib/data";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function DesktopIncomeTable() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {incomeBreakdown.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell className="font-medium flex items-center gap-3">
                           <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <TrendingUp className="h-5 w-5" />
                           </div>
                           {item.category}
                        </TableCell>
                        <TableCell>{item.date}</TableCell>
                        <TableCell className="text-right font-mono font-bold text-primary">
                            ${item.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

function MobileIncomeList() {
    return (
         <div className="space-y-3">
            {incomeBreakdown.map((item, index) => (
                <Card key={index} className="transition-all duration-200 hover:shadow-md hover:border-primary/50">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                             <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                <TrendingUp className="h-6 w-6" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-base text-foreground">{item.category}</p>
                                <div className="flex items-center text-xs text-muted-foreground gap-1.5 mt-1">
                                    <Calendar className="h-3 w-3" />
                                    <span>{item.date}</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                          <p className="font-mono font-bold text-lg text-primary">
                              ${item.amount.toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </p>
                          <div className="flex items-center justify-end text-xs text-muted-foreground gap-1.5 mt-1">
                            <DollarSign className="h-3 w-3" />
                            <span>Income</span>
                          </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}


export default function IncomePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-center md:text-left">
          Income Tracking
        </h1>
        <Button className="w-full md:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Download Statements
        </Button>
      </div>

      {/* Income Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Income Trend</CardTitle>
          <CardDescription>
            Your income over the last 12 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={incomeChartConfig}
            className="h-[250px] w-full md:h-[300px]"
          >
            <BarChart data={incomeChartData} accessibilityLayer>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#88.888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${Number(value) / 1000}k`}
              />
              <ChartTooltip
                cursor={{ fill: "hsl(var(--muted))" }}
                content={<ChartTooltipContent />}
              />
              <Bar
                dataKey="income"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Income Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Income Breakdown</CardTitle>
          <CardDescription>
            Detailed view of your recent earnings by category.
          </CardDescription>
        </CardHeader>
        {/* Desktop View */}
        <CardContent className="hidden md:block">
            <DesktopIncomeTable />
        </CardContent>
        {/* Mobile View */}
         <CardContent className="md:hidden">
            <MobileIncomeList />
        </CardContent>
      </Card>
    </>
  );
}
