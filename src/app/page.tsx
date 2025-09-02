import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons";
import { Separator } from "@/components/ui/separator";

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-76.2 76.2C324.7 118.3 289.6 96 248 96c-88.8 0-160.1 71.1-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path>
    </svg>
);


export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center bg-background">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(var(--primary-rgb),0.15),rgba(255,255,255,0))]"></div>
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

               <div className="my-2 flex items-center">
                    <Separator className="flex-1" />
                    <span className="mx-4 text-xs text-muted-foreground">OR CONTINUE WITH</span>
                    <Separator className="flex-1" />
                </div>

                <Button variant="outline" className="w-full">
                    <GoogleIcon />
                    Continue with Google
                </Button>

            </div>
             <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link href="#" className="underline">
                    Create an account
                </Link>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
