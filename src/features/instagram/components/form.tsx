"use client";

import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2, ExternalLink, Instagram, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { downloadFile } from "@/lib/utils";
import { getHttpErrorMessage } from "@/lib/http";
import { useVideoInfo } from "@/services/api/queries";
import { VideoInfo } from "@/types";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const formSchema = z.object({
  postUrl: z.string().url({
    message: "Please provide a valid Instagram post link",
  }),
});

export function InstagramVideoForm() {
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      postUrl: "",
    },
  });

  const { error, isPending, mutateAsync: getVideoInfo } = useVideoInfo();
  const httpError = getHttpErrorMessage(error);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { postUrl } = values;
    try {
      console.log("getting video info", postUrl);
      const info = await getVideoInfo({ postUrl });
      setVideoInfo(info);
    } catch (error: any) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-6"
      >
        <div className="relative">
          {/* Form Input Section */}
          <div className="relative rounded-2xl border bg-card/50 p-8 shadow-2xl backdrop-blur-xl">
            <div className="absolute -top-3 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-primary/80 px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-lg">
              <Instagram className="h-4 w-4" />
              Instagram Reel URL
            </div>
            
            <AnimatePresence>
              {httpError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4"
                >
                  <Alert variant="destructive" className="bg-destructive/10 text-destructive border-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-sm font-medium">
                      {httpError}
                    </AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex flex-col gap-6 sm:flex-row">
              <FormField
                control={form.control}
                name="postUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        disabled={isPending}
                        type="url"
                        placeholder="https://www.instagram.com/reel/..."
                        className={cn(
                          "h-14 w-full bg-background/80 text-base placeholder:text-muted-foreground/60",
                          "border-2 shadow-sm transition-all duration-300",
                          "focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-primary/20",
                          "disabled:opacity-50",
                          "rounded-xl"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="absolute -bottom-6 left-0 text-[13px] font-medium text-destructive/90" />
                  </FormItem>
                )}
              />
              
              <Button
                disabled={isPending}
                type="submit"
                size="lg"
                className={cn(
                  "relative h-14 w-full sm:w-32",
                  "bg-gradient-to-r from-primary via-primary/90 to-primary/80",
                  "hover:from-primary/90 hover:via-primary/80 hover:to-primary/70",
                  "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
                  "transition-all duration-500",
                  "rounded-xl",
                  "font-medium"
                )}
              >
                {isPending ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Loading...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Download className="h-5 w-5" />
                    <span>Get Video</span>
                  </motion.div>
                )}
              </Button>
            </div>
          </div>

          {/* Video Preview Section */}
          <AnimatePresence mode="wait">
            {videoInfo && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mt-8"
              >
                <Card className="overflow-hidden border-2 bg-card/50 p-6 backdrop-blur-xl">
                  <div className="aspect-[9/16] w-full overflow-hidden rounded-xl bg-background/80 shadow-lg">
                    <video
                      src={videoInfo.videoUrl}
                      controls
                      className="h-full w-full"
                      poster={videoInfo.videoUrl + "&thumb=1"}
                    />
                  </div>
                  <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-between">
                    <Button
                      onClick={() => downloadFile(videoInfo.videoUrl, { filename: videoInfo.filename })}
                      size="lg"
                      className={cn(
                        "h-14 w-full sm:w-fit px-8",
                        "bg-gradient-to-r from-primary via-primary/90 to-primary/80",
                        "hover:from-primary/90 hover:via-primary/80 hover:to-primary/70",
                        "shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30",
                        "transition-all duration-500",
                        "rounded-xl",
                        "font-medium",
                        "text-base"
                      )}
                    >
                      <Download className="mr-2 h-5 w-5" />
                      Download Video
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => window.open(videoInfo.videoUrl, "_blank")}
                      className={cn(
                        "h-14 w-full sm:w-fit px-8",
                        "border-2 bg-background/50",
                        "hover:bg-background/80",
                        "shadow-lg hover:shadow-xl",
                        "transition-all duration-500",
                        "rounded-xl",
                        "font-medium",
                        "text-base"
                      )}
                    >
                      <ExternalLink className="mr-2 h-5 w-5" />
                      Open in New Tab
                    </Button>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </Form>
  );
}
