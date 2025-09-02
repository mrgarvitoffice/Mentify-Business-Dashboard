
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
        <div className="space-y-3">
            {incomeBreakdown.map((item, index) => (
                <Card key={index} className="shadow-sm">
                    <CardContent className="p-3 sm:p-4">
                        <div className="flex justify-between items-start gap-3">
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-sm sm:text-base truncate">{item.category}</p>
                                <p className="text-xs sm:text-sm text-muted-foreground mt-1">{item.date}</p>
                            </div>
                            <div className="flex-shrink-0">
                                <p className="text-sm sm:text-lg font-bold font-mono">
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
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Income Tracking</h1>
        <Button className="w-full sm:w-auto shrink-0">
          <Download className="mr-2 h-4 w-4" />
          Download Statements
        </Button>
      </div>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Monthly Income Trend</CardTitle>
          <CardDescription className="text-sm">Your income over the last 12 months.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          <div className="w-full overflow-hidden">
            <ChartContainer config={incomeChartConfig} className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
              <BarChart 
                data={incomeChartData} 
                accessibilityLayer
                margin={{
                  top: 10,
                  right: 10,
                  left: -20,
                  bottom: 40,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  interval={0}
                  angle={-45}
                  textAnchor="end"
                  height={50}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${(Number(value)/1000).toFixed(0)}k`}
                  width={40}
                />
                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted))' }}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="income"
                  fill="hsl(var(--primary))"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl">Income Breakdown</CardTitle>
          <CardDescription className="text-sm">Detailed view of your recent earnings by category.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
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
  );
}
