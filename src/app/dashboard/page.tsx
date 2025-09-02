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
import { ArrowUp, Lightbulb } from "lucide-react";
import { kpiData, poolData, achievements, promotions, user } from "@/lib/data";
import { getAlertsAction } from "@/app/actions";
import { SmartBuddy } from "@/components/chat/smart-buddy";

async function OpportunityAlerts() {
  const { alerts } = await getAlertsAction();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-accent" />
          Opportunity Alerts
        </CardTitle>
        <CardDescription>AI-powered insights to grow your business.</CardDescription>
      </CardHeader>
      <CardContent>
        {alerts.length > 0 ? (
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


export default function DashboardPage() {
  return (
    <>
      <h1 className="font-headline text-3xl font-bold">Welcome back, {user.name.split(' ')[0]}!</h1>
      
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
              <Card className="overflow-hidden">
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
                    <h2 className="font-headline text-2xl font-bold text-white">{promo.title}</h2>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
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

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Next Pool Qualification</CardTitle>
            <CardDescription>
              Your progress towards the <span className="font-bold text-primary">{poolData.nextPool}</span> pool.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm font-medium">
              <span>Current Pool: <Badge variant="outline" className={user.poolColor}>{poolData.currentPool}</Badge></span>
              <span>Next Pool: <Badge variant="outline">{poolData.nextPool}</Badge></span>
            </div>
            <Progress value={poolData.progress} aria-label={`${poolData.progress}% to next pool`} />
            <p className="text-center text-sm text-muted-foreground">
              You need <span className="font-bold text-primary">${poolData.bvForNextPool.toLocaleString()}</span> more Business Volume to qualify.
            </p>
          </CardContent>
        </Card>
        
        <OpportunityAlerts />

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Recent Achievements</CardTitle>
            <CardDescription>Your latest milestones and awards.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {achievements.map((ach) => (
                <li key={ach.title} className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-lg bg-muted ${ach.color}`}>
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
      <SmartBuddy />
    </>
  );
}
