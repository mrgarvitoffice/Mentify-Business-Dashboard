
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { useLanguage } from "@/hooks/use-language";
import { useFontSize } from "@/hooks/use-font-size";
import { cn } from "@/lib/utils";
import { CaseSensitive, Type } from "lucide-react";
import React from "react";

export function SettingsDialog({ children }: { children: React.ReactNode }) {
  const { language, setLanguage, t } = useLanguage();
  const { fontSize, setFontSize } = useFontSize();

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t.settings.title()}</DialogTitle>
          <DialogDescription>
            Manage your application preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
            <div className="space-y-4 rounded-lg border p-4">
                <Label className="flex items-center gap-2 font-semibold"><CaseSensitive className="h-5 w-5"/> {t.settings.language()}</Label>
                <div className="flex items-center justify-between">
                    <Label htmlFor="language-switch" className={cn(language === 'en' && 'text-primary')}>{t.settings.english()}</Label>
                    <Switch
                        id="language-switch"
                        checked={language === 'hi'}
                        onCheckedChange={(checked) => setLanguage(checked ? 'hi' : 'en')}
                        aria-label="Toggle language between English and Hindi"
                    />
                    <Label htmlFor="language-switch" className={cn(language === 'hi' && 'text-primary')}>{t.settings.hindi()}</Label>
                </div>
            </div>

            <div className="space-y-4 rounded-lg border p-4">
                 <Label className="flex items-center gap-2 font-semibold"><Type className="h-5 w-5"/> {t.settings.fontSize()}</Label>
                <RadioGroup 
                    defaultValue={fontSize} 
                    onValueChange={(value) => setFontSize(value as any)}
                    className="grid grid-cols-3 gap-4"
                >
                    <div>
                        <RadioGroupItem value="sm" id="font-sm" className="sr-only" />
                        <Label htmlFor="font-sm" className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer", fontSize === 'sm' && "border-primary")}>
                            {t.settings.small()}
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="base" id="font-base" className="sr-only" />
                        <Label htmlFor="font-base" className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer", fontSize === 'base' && "border-primary")}>
                           {t.settings.medium()}
                        </Label>
                    </div>
                     <div>
                        <RadioGroupItem value="lg" id="font-lg" className="sr-only" />
                        <Label htmlFor="font-lg" className={cn("flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer", fontSize === 'lg' && "border-primary")}>
                            {t.settings.large()}
                        </Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
