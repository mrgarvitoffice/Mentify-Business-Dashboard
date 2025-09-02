
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
  Settings,
  Mail,
  LogOut,
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
import { user, notifications } from "@/lib/data";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { SmartBuddy } from "@/components/chat/smart-buddy";
import { cn } from "@/lib/utils";
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { SettingsDialog } from "@/components/settings-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { SmartBuddyProvider } from "@/hooks/use-smart-buddy";

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
        <div className="hidden border-r bg-muted/40 md:flex md:flex-col group/sidebar w-[5.5rem] hover:w-56 transition-all duration-300 ease-in-out">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Logo className="h-6 w-6 text-primary flex-shrink-0" />
                        <span className="text-xl transition-opacity duration-300 opacity-0 group-hover/sidebar:opacity-100">MentifyAI</span>
                    </Link>
                </div>
                <ScrollArea className="flex-1">
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
                </ScrollArea>
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
                            "inline-flex flex-col items-center justify-center px-2 hover:bg-muted group",
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

function DashboardLayoutContent({
    children,
  }: {
    children: React.ReactNode;
  }) {
  
    return (
      <div className="grid min-h-screen w-full md:grid-cols-[auto_1fr]">
        <DesktopSidebar />
        <div className="flex flex-col flex-1">
          <header className="flex h-14 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur-sm supports-[backdrop-filter]:bg-background/60 lg:h-[60px] lg:px-6 sticky top-0 z-40">
             <div className="w-full flex-1">
               <div className="md:hidden font-semibold flex items-center gap-2">
                  <Logo className="h-6 w-6 text-primary" />
                  <span>MentifyAI</span>
               </div>
             </div>
            <ThemeSwitcher />
            
            <Popover>
                <PopoverTrigger asChild>
                    <Button variant="outline" size="icon" className="h-8 w-8 relative">
                    <Bell className="h-4 w-4" />
                    <span className="sr-only">Toggle notifications</span>
                    {notifications.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="end">
                    <div className="grid gap-4">
                        <div className="space-y-1">
                            <h4 className="font-medium leading-none">Notifications</h4>
                            <p className="text-sm text-muted-foreground">You have {notifications.length} new messages.</p>
                        </div>
                        <div className="grid gap-2">
                           {notifications.map((notif) => (
                               <div key={notif.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">{notif.title}</p>
                                    <p className="text-sm text-muted-foreground">{notif.description}</p>
                                </div>
                               </div>
                           ))}
                        </div>
                    </div>
                </PopoverContent>
            </Popover>


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
                <SettingsDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <Settings className="mr-2 h-4 w-4"/>
                        <span>Settings</span>
                    </DropdownMenuItem>
                </SettingsDialog>
                <DropdownMenuItem asChild>
                  <a href="mailto:support@mentify.ai">
                    <Mail className="mr-2 h-4 w-4"/>
                    <span>Support</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/">
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>Logout</span>
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="bg-background flex-1 overflow-y-auto">
              <div className="flex flex-col flex-1 gap-4 lg:gap-6 p-4 lg:p-6 pb-20 md:pb-6 h-full">
                  {children}
              </div>
          </main>
          <SmartBuddy />
        </div>
         <MobileBottomNav />
      </div>
    );
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SmartBuddyProvider>
            <DashboardLayoutContent>{children}</DashboardLayoutContent>
        </SmartBuddyProvider>
    )
}
