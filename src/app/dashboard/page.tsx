
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUp, LayoutDashboard, Lightbulb } from "lucide-react";
import { kpiData, poolData, achievements, promotions, user } from "@/lib/data";
import { getAlertsAction } from "@/app/actions";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

type Alert = {
  downlineMemberId: string;
  currentPool: string;
  nextPool: string;
  businessVolumeNeeded: number;
  recommendation: string;
};

function OpportunityAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const result = await getAlertsAction();
        setAlerts(result.alerts);
      } catch (error) {
        console.error("Failed to fetch alerts", error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-accent" />
          Opportunity Alerts
        </CardTitle>
        <CardDescription>AI-powered insights to grow your business.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
           <p className="text-sm text-muted-foreground">Loading alerts...</p>
        ) : alerts.length > 0 ? (
          <ul className="space-y-3">
            {alerts.map((alert) => (
              <li key={alert.downlineMemberId} className="text-sm text-muted-foreground">
                <strong className="font-medium text-foreground">{alert.downlineMemberId}</strong> is close to {alert.nextPool}!
                <p className="text-xs">{alert.recommendation}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">No immediate opportunities found. Keep up the great work!</p>
        )}
      </CardContent>
    </Card>
  );
}

function TermsAndConditionsDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Terms & Conditions</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Terms and Conditions</DialogTitle>
                    <DialogDescription>
                        Last updated: {new Date().toLocaleDateString()}
                    </DialogDescription>
                </DialogHeader>
                <div className="prose prose-sm dark:prose-invert max-h-[60vh] overflow-y-auto pr-4">
                    <p>Welcome to MentifyAI!</p>
                    <p>These terms and conditions outline the rules and regulations for the use of MentifyAI's Website, located at your-website.com.</p>
                    <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use MentifyAI if you do not agree to take all of the terms and conditions stated on this page.</p>

                    <h4>Cookies:</h4>
                    <p>The website uses cookies to help personalize your online experience. By accessing MentifyAI, you agreed to use the required cookies.</p>
                    
                    <h4>License:</h4>
                    <p>Unless otherwise stated, MentifyAI and/or its licensors own the intellectual property rights for all material on MentifyAI. All intellectual property rights are reserved. You may access this from MentifyAI for your own personal use subjected to restrictions set in these terms and conditions.</p>
                    <p>You must not:</p>
                    <ul>
                        <li>Republish material from MentifyAI</li>
                        <li>Sell, rent or sub-license material from MentifyAI</li>
                        <li>Reproduce, duplicate or copy material from MentifyAI</li>
                        <li>Redistribute content from MentifyAI</li>
                    </ul>

                    <h4>Disclaimer:</h4>
                    <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
                    <ul>
                        <li>limit or exclude our or your liability for death or personal injury;</li>
                        <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
                        <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
                        <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
                    </ul>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button">
                            Close
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default function DashboardPage() {
  return (
    <>
      <div className="flex items-center gap-3">
        <LayoutDashboard className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
      </div>
      
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {promotions.map((promo) => (
            <CarouselItem key={promo.id}>
              <Card className="overflow-hidden border-0 transition-all duration-300 hover:shadow-xl">
                <div className="relative h-48 w-full">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                    data-ai-hint={promo.dataAiHint}
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <h2 className="text-2xl font-bold text-white">{promo.title}</h2>
                    <p className="text-sm text-white/80">{promo.description}</p>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-4" />
        <CarouselNext className="absolute right-4" />
      </Carousel>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title} className="transition-all duration-300 hover:shadow-lg hover:scale-105">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="font-mono text-2xl font-bold">{kpi.value}</div>
              {kpi.change && (
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1"/>
                  {kpi.change} from last month
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Next Pool Qualification</CardTitle>
            <CardDescription>
              Your progress towards the <span className="font-bold text-primary">{poolData.nextPool}</span> pool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span>Current Pool: <Badge variant="outline" className={cn("border-0", user.poolColor)}>{poolData.currentPool}</Badge></span>
              <span>Next Pool: <Badge variant="outline" className="border-0">{poolData.nextPool}</Badge></span>
            </div>
            <Progress value={poolData.progress} aria-label={`${poolData.progress}% to next pool`} />
            <p className="text-center text-sm text-muted-foreground">
              You need <span className="font-mono font-bold text-primary">${poolData.bvForNextPool.toLocaleString()}</span> more Business Volume to qualify.
            </p>
          </CardContent>
        </Card>
        
        <OpportunityAlerts />

        <Card className="lg:col-span-3 transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
          <CardHeader>
            <CardTitle>Recent Achievements</CardTitle>
            <CardDescription>Your latest milestones and awards.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {achievements.map((ach) => (
                <li key={ach.title} className="flex items-center gap-3">
                  <div className={cn(`flex h-10 w-10 items-center justify-center rounded-lg bg-muted`, ach.color)}>
                    <ach.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-medium">{ach.title}</p>
                    <p className="text-xs text-muted-foreground">{ach.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <footer className="mt-8 text-center text-sm text-muted-foreground">
        MentifyAI © 2024 | <TermsAndConditionsDialog />
      </footer>
    </>
  );
}
