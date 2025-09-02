
"use client";

import { useState, useRef, useEffect } from "react";
import { Bot, Send, Loader2, Sparkles, User, Volume2, Settings, X, Mail, CaseSensitive } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getBuddyRecommendationsAction, textToSpeechAction } from "@/app/actions";
import { user } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/use-language";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";


interface Message {
  sender: "user" | "bot";
  text: string;
}

function SettingsPanel({ onClose }: { onClose: () => void }) {
    const { language, setLanguage, t } = useLanguage();
    const [fontSize, setFontSize] = useState("medium");

    return (
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm z-10 p-4 flex flex-col">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{t.settings.title()}</h3>
                <Button variant="ghost" size="icon" onClick={onClose}><X className="h-4 w-4"/></Button>
            </div>
            <div className="space-y-4">
                <div className="space-y-2 rounded-lg border p-3">
                    <Label className="flex items-center gap-2"><CaseSensitive className="h-4 w-4"/>{t.settings.fontSize()}</Label>
                     <RadioGroup defaultValue={fontSize} onValueChange={setFontSize} className="flex items-center justify-around pt-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="small" id="fs-sm" />
                            <Label htmlFor="fs-sm">{t.settings.small()}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="fs-md" />
                            <Label htmlFor="fs-md">{t.settings.medium()}</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="large" id="fs-lg" />
                            <Label htmlFor="fs-lg">{t.settings.large()}</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <Label htmlFor="language-switch">{t.settings.language()}</Label>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="language-switch" className={cn(language === 'en' && 'text-primary')}>{t.settings.english()}</Label>
                        <Switch
                            id="language-switch"
                            checked={language === 'hi'}
                            onCheckedChange={(checked) => setLanguage(checked ? 'hi' : 'en')}
                        />
                        <Label htmlFor="language-switch" className={cn(language === 'hi' && 'text-primary')}>{t.settings.hindi()}</Label>
                    </div>
                </div>
                 <div className="space-y-2 rounded-lg border p-3">
                     <Label className="flex items-center gap-2"><Mail className="h-4 w-4"/> {t.settings.support()}</Label>
                     <p className="text-sm text-muted-foreground">support@mentify.ai</p>
                </div>
            </div>
        </div>
    );
}


export function SmartBuddy() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTtsLoading, setIsTtsLoading] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { t } = useLanguage();


  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setMessages([
          {
            sender: "bot",
            text: t.smartBuddy.welcomeMessage({name: user.name.split(' ')[0]}),
          },
        ]);
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, messages.length, t, user.name]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await getBuddyRecommendationsAction(input);
      const botMessage: Message = {
        sender: "bot",
        text: res.recommendations,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        sender: "bot",
        text: t.smartBuddy.errorMessage(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlaySound = async (text: string, index: number) => {
    if (isTtsLoading === `tts-${index}`) return;
    setIsTtsLoading(`tts-${index}`);
    try {
      const response = await textToSpeechAction(text);
      if (response.media) {
        if (audioRef.current) {
          audioRef.current.src = response.media;
          audioRef.current.play();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsTtsLoading(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
       <audio ref={audioRef} />
      <SheetTrigger asChild>
        <Button
          variant="default"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary shadow-lg hover:bg-primary/90 z-50"
        >
          <Bot className="h-8 w-8 text-primary-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col p-0 sm:max-w-lg">
        {showSettings && <SettingsPanel onClose={() => setShowSettings(false)} />}
        <SheetHeader className="p-4 flex flex-row items-center justify-between">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-6 w-6 text-accent" />
            {t.smartBuddy.title()}
          </SheetTitle>
           <Button variant="ghost" size="icon" onClick={() => setShowSettings(true)}>
                <Settings className="h-5 w-5" />
            </Button>
        </SheetHeader>
        <ScrollArea className="flex-1 px-4" ref={scrollAreaRef}>
          <div className="space-y-4 py-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "group flex items-start gap-3",
                  message.sender === "user" ? "justify-end" : ""
                )}
              >
                {message.sender === "bot" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                   className={cn(
                    "chat-bubble max-w-[75%] rounded-lg p-3 text-sm",
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  <p>{message.text}</p>
                   {message.sender === 'bot' && (
                     <Button
                      size="icon"
                      variant="ghost"
                      className="play-button h-7 w-7 rounded-full bg-background text-muted-foreground hover:bg-muted"
                      onClick={() => handlePlaySound(message.text, index)}
                      disabled={isTtsLoading === `tts-${index}`}
                    >
                      {isTtsLoading === `tts-${index}` ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Volume2 className="h-4 w-4" />
                      )}
                    </Button>
                   )}
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback><User /></AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2 rounded-lg bg-muted p-3">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{t.smartBuddy.thinking()}...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t bg-background p-4">
          <div className="relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder={t.smartBuddy.placeholder()}
              className="pr-12"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2"
              onClick={handleSend}
              disabled={isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
