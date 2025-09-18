"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { copyToClipboard } from "@/lib/utils";
import { useState } from "react";

export default function QuickShareCard({ film }) {
  const isMobile = useIsMobile();
  const [isCopied, setIsCopied] = useState(false);
  const url = film?.quick_copy || "";
  
  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1500);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-medium text-lg md:text-xl">
          {film?.film_title || "Movie Title"}
        </CardTitle>
        <CardDescription>{film?.film_type || "Movie"}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          variant="secondary"
          onClick={handleCopy}
          size={isMobile ? "sm" : "default"}
          disabled={!url}
        >
          {isCopied ? "Copied" : "Quick Copy"}
        </Button>
      </CardFooter>
    </Card>
  );
}
