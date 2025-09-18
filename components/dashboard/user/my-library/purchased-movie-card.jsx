"use client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { minutesToHours } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlayIcon, Time04Icon } from "@hugeicons/core-free-icons/index";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import WebShare from "@/components/web-share";

export default function PurchasedMovieCard({ movie }) {
  const {
    film_id,
    title,
    film_type,
    full_film_duration,
    access_type,
    status,
    expiry_time,
    thumbnail,
    film_hls_url,
    watch_progress,
    current_watch_time,
  } = movie;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="relative">
          <Image
            src={thumbnail || "https://i.pinimg.com/1200x/b4/e2/59/b4e259133c021a727a797d07bc89086b.jpg"}
            alt={title || "Movie title"}
            width={200}
            height={80}
            className="w-full rounded-md h-44 object-cover"
          />
          {/* Continue watch button */}
          <Link href={`/film/${film_id}?time=${current_watch_time || 0}`}>
            <Button
              variant="destructive"
              size="sm"
              className="rounded-full absolute bottom-2 left-2"
              asChild
            >
              <span>
                <HugeiconsIcon icon={PlayIcon} size={25} />
                {current_watch_time > 0 ? "Continue" : "Watch"}
              </span>
            </Button>
          </Link>
          {/* Purchase badge */}
          <Badge variant="secondary" className="absolute top-2 left-2">
            {access_type}
          </Badge>
        </div>
        {/* Movie name and share icon */}
        <CardTitle className="text-xl flex justify-between items-center">
          {title}
          {/* Share icon */}
          <WebShare 
            className="text-primary" 
            title={title}
            url={`${window.location.origin}/film/${film_id}`}
          />
        </CardTitle>

        {/* Badge and Duration */}
        <div className="flex gap-5">
          <Badge variant="secondary">{film_type}</Badge>
          <span className="text-secondary-foreground text-sm flex gap-2 items-center">
            <HugeiconsIcon icon={Time04Icon} className="size-4" />
            {minutesToHours(full_film_duration || 120)}
          </span>
        </div>
      </CardHeader>

      {/* purchase || view history */}
      <CardContent className="text-muted-foreground">
        <p>{access_type} - {status}</p>
        {expiry_time && (
          <p className="text-sm">Expires: {new Date(expiry_time).toLocaleDateString()}</p>
        )}
      </CardContent>

      {/* Footer | progress */}
      <CardFooter className="block">
        <Label className="flex justify-between text-secondary-foreground mb-0.5">
          <span>Progress</span>
          <span>{Math.round(watch_progress || 0)}%</span>
        </Label>
        <Progress value={watch_progress || 0} />
      </CardFooter>
    </Card>
  );
}
