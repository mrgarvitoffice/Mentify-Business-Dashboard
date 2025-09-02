"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts";
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

export default function IncomePage() {
  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-headline text-3xl font-bold">Income Tracking</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download Statements
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Monthly Income Trend</CardTitle>
          <CardDescription>Your income over the last 12 months.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={incomeChartConfig} className="h-full w-full">
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
                  tickFormatter={(value) => `$${value}`}
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
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Income Breakdown</CardTitle>
          <CardDescription>Detailed view of your recent earnings by category.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeBreakdown.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.category}</TableCell>
                  <TableCell className="text-right">${item.amount.toFixed(2)}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
