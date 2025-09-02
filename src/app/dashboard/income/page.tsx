
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
    <div className="w-full overflow-x-auto">
      <Table className="min-w-[600px] w-full">
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
              <TableCell className="font-medium">{item.category}</TableCell>
              <TableCell>{item.date}</TableCell>
              <TableCell className="text-right font-mono">
                ${item.amount.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
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
                <Card key={index}>
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <p className="font-bold text-base">{item.category}</p>
                                <p className="text-sm text-muted-foreground">{item.date}</p>
                            </div>
                             <p className="font-mono font-bold text-lg text-primary">
                                ${item.amount.toLocaleString(undefined, {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                                })}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

export default function IncomePage() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <h1 className="text-3xl font-bold text-center md:text-left">Income Tracking</h1>
        <Button className="w-full md:w-auto">
          <Download className="mr-2 h-4 w-4" />
          Download Statements
        </Button>
      </div>

      {/* Income Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Income Trend</CardTitle>
          <CardDescription>Your income over the last 12 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={incomeChartConfig} className="h-[250px] md:h-[300px] w-full">
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
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <ChartTooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
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

      {/* Income Breakdown Table */}
      <Card>
        <CardHeader>
          <CardTitle>Income Breakdown</CardTitle>
          <CardDescription>Detailed view of your recent earnings by category.</CardDescription>
        </CardHeader>
        <CardContent>
            {/* Desktop View */}
            <div className="hidden md:block">
                <DesktopIncomeTable />
            </div>
            {/* Mobile View */}
            <div className="md:hidden">
                <MobileIncomeList />
            </div>
        </CardContent>
      </Card>
    </>
  );
}
