
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { incomeChartData, incomeChartConfig, incomeBreakdown } from "@/lib/data";

function DesktopIncomeTable() {
    return (
        <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[120px]">Category</TableHead>
                  <TableHead className="min-w-[100px]">Date</TableHead>
                  <TableHead className="text-right min-w-[100px]">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incomeBreakdown.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell className="whitespace-nowrap">{item.date}</TableCell>
                    <TableCell className="text-right font-mono whitespace-nowrap">
                        ${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
        </div>
    );
}

function MobileIncomeList() {
    return (
        <div className="space-y-2 sm:space-y-3">
            {incomeBreakdown.map((item, index) => (
                <Card key={index} className="shadow-sm border-l-2 border-l-primary/20">
                    <CardContent className="p-3 sm:p-4">
                        <div className="flex justify-between items-start gap-2 sm:gap-3">
                            <div className="flex-1 min-w-0 pr-2">
                                <p className="font-semibold text-xs sm:text-sm lg:text-base truncate mb-1">
                                    {item.category}
                                </p>
                                <p className="text-[10px] sm:text-xs text-muted-foreground">
                                    {item.date}
                                </p>
                            </div>
                            <div className="flex-shrink-0 text-right">
                                <p className="text-sm sm:text-base lg:text-lg font-bold font-mono text-primary">
                                    ${item.amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                                </p>
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
    <div className="min-h-screen w-full overflow-x-hidden">
      <div className="space-y-3 sm:space-y-4 lg:space-y-6 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 lg:py-6 max-w-7xl mx-auto">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight">Income Tracking</h1>
          <Button className="w-full sm:w-auto text-sm sm:text-base shrink-0">
            <Download className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />
            <span className="truncate">Download Statements</span>
          </Button>
        </div>

        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Monthly Income Trend</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Your income over the last 12 months.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
            <div className="w-full -mx-1 sm:mx-0">
              <ChartContainer config={incomeChartConfig} className="h-[180px] sm:h-[220px] lg:h-[280px] w-full">
                <BarChart 
                  data={incomeChartData} 
                  accessibilityLayer
                  margin={{
                    top: 5,
                    right: 5,
                    left: 0,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis
                    dataKey="month"
                    stroke="#888888"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    interval={0}
                    angle={-45}
                    textAnchor="end"
                    height={50}
                    tick={{ fontSize: 9 }}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={9}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${Math.round(value/1000)}k`}
                    width={35}
                    tick={{ fontSize: 9 }}
                  />
                  <ChartTooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="income"
                    fill="hsl(var(--primary))"
                    radius={[1, 1, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="p-3 sm:p-4 lg:p-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">Income Breakdown</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Detailed view of your recent earnings by category.</CardDescription>
          </CardHeader>
          <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              {/* Desktop/Tablet View */}
              <div className="hidden lg:block">
                  <DesktopIncomeTable />
              </div>
              {/* Mobile/Small Tablet View */}
              <div className="lg:hidden">
                  <MobileIncomeList />
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
