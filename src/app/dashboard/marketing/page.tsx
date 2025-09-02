
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { marketingAssets } from "@/lib/data";
import { Copy, Megaphone } from "lucide-react";

export default function MarketingPage() {
  return (
    <>
      <div className="flex items-center gap-3">
        <Megaphone className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold">Affiliate Marketing Hub</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Marketing Assets</CardTitle>
          <CardDescription>
            All the tools you need to promote your business and grow your network.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {marketingAssets.map((asset, index) => (
            <Card key={index} className="flex flex-col transition-all duration-300 hover:shadow-lg hover:scale-[1.03]">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary">{asset.type}</p>
                  <CardTitle className="text-lg">{asset.title}</CardTitle>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <asset.icon className="h-6 w-6" />
                </div>
              </CardHeader>
              <CardContent className="mt-auto">
                 <Button className="w-full">
                  {asset.action === 'Copy' && <Copy className="mr-2 h-4 w-4" />}
                  {asset.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </>
  );
}
