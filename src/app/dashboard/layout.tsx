"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  PanelLeft,
  Home,
  DollarSign,
  Users,
  Megaphone,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Logo } from "@/components/icons";
import { user } from "@/lib/data";
import { ThemeSwitcher } from "@/components/theme-switcher";

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/income", icon: DollarSign, label: "Income" },
  { href: "/dashboard/downline", icon: Users, label: "Downline" },
  { href: "/dashboard/marketing", icon: Megaphone, label: "Marketing" },
  { href: "/dashboard/leaderboards", icon: Trophy, label: "Leaderboards" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navContent = (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
            pathname === item.href
              ? "bg-muted text-primary"
              : "text-muted-foreground"
          }`}
        >
          <item.icon className="h-4 w-4" />
          {item.label}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Logo className="h-6 w-6 text-primary" />
              <span className="font-headline text-xl">MentifyAI</span>
            </Link>
          </div>
          <div className="flex-1">
            {navContent}
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 lg:h-[60px] lg:px-6 sticky top-0 z-50">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Logo className="h-6 w-6 text-primary" />
                  <span className="sr-only">MentifyAI</span>
                </Link>
                {navItems.map((item) => (
                    <Link
                    key={item.label}
                    href={item.href}
                    className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 hover:text-foreground ${
                        pathname === item.href
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground"
                    }`}
                    >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                    </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1">
            {/* Can add search bar here if needed */}
          </div>
          <ThemeSwitcher />
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/">Logout</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
