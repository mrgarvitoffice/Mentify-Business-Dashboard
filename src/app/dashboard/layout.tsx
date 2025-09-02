
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
  ChevronUp,
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
import { SmartBuddy } from "@/components/chat/smart-buddy";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import React from 'react';

const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/income", icon: DollarSign, label: "Income" },
  { href: "/dashboard/downline", icon: Users, label: "Downline" },
  { href: "/dashboard/marketing", icon: Megaphone, label: "Marketing" },
  { href: "/dashboard/leaderboards", icon: Trophy, label: "Leaderboards" },
];

function DesktopSidebar() {
    const pathname = usePathname();
    return (
        <div className="hidden border-r bg-muted/40 md:block group/sidebar w-[5.5rem] hover:w-56 transition-all duration-300 ease-in-out">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Logo className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="text-xl transition-opacity duration-300 opacity-100 group-hover/sidebar:opacity-100">MentifyAI</span>
                    </Link>
                </div>
                <div className="flex-1 overflow-y-auto">
                    <nav className="grid items-start gap-2 px-2 text-sm font-medium lg:px-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className={cn(
                                    "group flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary w-full",
                                    pathname === item.href
                                        ? "bg-muted text-primary"
                                        : "text-muted-foreground"
                                )}
                            >
                                <item.icon className="h-5 w-5 flex-shrink-0" />
                                <span className="truncate transition-opacity duration-300 opacity-0 group-hover/sidebar:opacity-100">{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}

function MobileBottomNav() {
    const pathname = usePathname();
    return (
        <div className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        href={item.href}
                        className={cn(
                            "inline-flex flex-col items-center justify-center px-5 hover:bg-muted group",
                            pathname === item.href ? "text-primary" : "text-muted-foreground"
                        )}
                    >
                        <item.icon className="w-5 h-5 mb-1" />
                        <span className="text-[10px] text-center">{item.label}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { language } = useLanguage();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
      <DesktopSidebar />
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 lg:h-[60px] lg:px-6 sticky top-0 z-40">
           <div className="w-full flex-1">
             {/* Can add search bar here if needed */}
             <div className="md:hidden font-semibold flex items-center gap-2">
                <Logo className="h-6 w-6 text-primary" />
                <span>MentifyAI</span>
             </div>
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
        <main key={language} className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background pb-20 md:pb-6">
          {children}
        </main>
        <SmartBuddy />
      </div>
       <MobileBottomNav />
    </div>
  );
}
