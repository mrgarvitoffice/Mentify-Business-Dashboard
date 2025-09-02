import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(3,155,229,0.3),rgba(255,255,255,0))]"></div>
      <div className="relative z-10 w-full max-w-md px-4">
        <Card className="mx-auto">
          <CardHeader className="items-center text-center">
            <Link href="/" className="mb-4 flex items-center gap-2 text-foreground">
              <Logo className="h-8 w-8" />
              <span className="text-2xl font-bold">MentifyAI</span>
            </Link>
            <CardTitle className="text-3xl">Partner Login</CardTitle>
            <CardDescription>Enter your credentials to access your dashboard.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="partner@mentify.ai" required />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Sign In</Link>
              </Button>
               <Button variant="secondary" className="w-full" asChild>
                <Link href="/dashboard">Continue as Guest</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
