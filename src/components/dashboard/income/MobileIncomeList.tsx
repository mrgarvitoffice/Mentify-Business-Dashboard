
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { incomeBreakdown } from "@/lib/data";
import { DollarSign, TrendingUp, Calendar } from "lucide-react";

export default function MobileIncomeList() {
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
