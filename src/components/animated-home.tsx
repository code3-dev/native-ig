"use client";

import { motion } from "framer-motion";
import { Zap, User, Video, Github, Mail, Instagram, Send, Globe2 } from "lucide-react";
import { InstagramVideoForm } from "@/features/instagram/components/form";
import { cn } from "@/lib/utils";
import dynamic from 'next/dynamic';

// Dynamically import components that use browser APIs
const DynamicMotionDiv = dynamic(() => Promise.resolve(motion.div), {
  ssr: false
});

const DynamicMotionLink = dynamic(() => Promise.resolve(motion.a), {
  ssr: false
});

const features = [
  {
    title: "Fast & Free",
    description: "Download Instagram reels instantly without any cost or limitations",
    icon: Zap,
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "No Registration",
    description: "No account needed, just paste the link and start downloading",
    icon: User,
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    title: "High Quality",
    description: "Get reels in their original quality without compression",
    icon: Video,
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "RESTful API",
    description: "Integrate with our powerful API for automated downloads",
    icon: Globe2,
    gradient: "from-pink-500/20 to-rose-500/20",
  },
  {
    title: "Bulk Download",
    description: "Download multiple reels simultaneously with batch processing",
    icon: Send,
    gradient: "from-indigo-500/20 to-sky-500/20",
  },
  {
    title: "24/7 Support",
    description: "Get help anytime through our dedicated support channels",
    icon: Mail,
    gradient: "from-violet-500/20 to-purple-500/20",
  },
];

export function AnimatedHome() {
  return (
    <div className="relative min-h-[calc(100vh-8rem)] overflow-hidden bg-gradient-to-b from-background to-background/80 px-4 py-12 sm:px-6 lg:px-8">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#3b82f6,transparent)]" />
      </div>

      <div className="mx-auto max-w-[1900px]">
        <DynamicMotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative text-center"
        >
          {/* Animated circles in background */}
          <div className="absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2">
            <div className="relative h-[400px] w-[400px]">
              <DynamicMotionDiv
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border border-primary/20"
              />
              <DynamicMotionDiv
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                className="absolute inset-2 rounded-full border border-primary/20"
              />
              <DynamicMotionDiv
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4 rounded-full border border-primary/20"
              />
            </div>
          </div>

          <DynamicMotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-6xl font-extrabold tracking-tight text-transparent sm:text-7xl md:text-8xl"
          >
            Native IG
          </DynamicMotionDiv>
          <DynamicMotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mx-auto mt-6 max-w-2xl text-xl text-muted-foreground/80 sm:text-2xl md:text-3xl"
          >
            Download Instagram Reels Easily
          </DynamicMotionDiv>
        </DynamicMotionDiv>

        <DynamicMotionDiv 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 sm:mt-16"
        >
          <div className="relative mx-auto max-w-3xl rounded-2xl border bg-card/30 p-4 shadow-lg backdrop-blur-sm sm:p-6">
            <InstagramVideoForm />
          </div>
          
          <div className="mt-24 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <DynamicMotionDiv
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group relative rounded-3xl border bg-card/30 p-8 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1 backdrop-blur-sm overflow-hidden"
              >
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-3">
                    <feature.icon className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
                  </div>
                  <h3 className="mb-3 text-2xl font-bold tracking-tight bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground/90 text-lg">
                    {feature.description}
                  </p>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100 blur-xl" />
                <div className={cn(
                  "absolute inset-0 -z-20 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100",
                  feature.gradient
                )} />
              </DynamicMotionDiv>
            ))}
          </div>

          {/* Team Section */}
          <DynamicMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-32"
          >
            <h2 className="text-center text-5xl font-bold tracking-tight mb-16 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">Meet the Team</h2>
            <div className="flex justify-center">
              <div className="relative rounded-3xl border bg-card/30 p-12 shadow-lg transition-all hover:shadow-xl max-w-md w-full backdrop-blur-sm overflow-hidden group">
                <div className="relative z-10">
                  <DynamicMotionDiv 
                    className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-primary/20 bg-primary/5 mb-6"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <User className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 text-primary/40" />
                  </DynamicMotionDiv>
                  <h3 className="text-2xl font-bold text-center mb-2 bg-gradient-to-br from-foreground to-foreground/80 bg-clip-text text-transparent">Hossein Pira</h3>
                  <p className="mt-1 text-lg text-center text-muted-foreground/90 mb-6">Lead Developer</p>
                  <div className="flex justify-center gap-6">
                    <DynamicMotionLink
                      href="mailto:h3dev.pira@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary/10 p-3 text-primary hover:bg-primary/20 transition-colors"
                      title="Email"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mail className="h-6 w-6" />
                    </DynamicMotionLink>
                    <DynamicMotionLink
                      href="https://t.me/h3dev"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary/10 p-3 text-primary hover:bg-primary/20 transition-colors"
                      title="Telegram"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Send className="h-6 w-6" />
                    </DynamicMotionLink>
                    <DynamicMotionLink
                      href="https://instagram.com/h3dev.pira"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-primary/10 p-3 text-primary hover:bg-primary/20 transition-colors"
                      title="Instagram"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Instagram className="h-6 w-6" />
                    </DynamicMotionLink>
                  </div>
                </div>
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 transition-opacity group-hover:opacity-100 blur-2xl" />
              </div>
            </div>
          </DynamicMotionDiv>

          {/* GitHub Section */}
          <DynamicMotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="mt-24 text-center relative"
          >
            <div className="inline-flex flex-col items-center">
              <div className="relative mb-8">
                <DynamicMotionDiv
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-primary/20"
                />
                <DynamicMotionDiv
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="relative"
                >
                  <Globe2 className="h-12 w-12 text-primary" />
                </DynamicMotionDiv>
              </div>
              <p className="text-xl text-muted-foreground/80 mb-4">This project is open source</p>
              <a
                href="https://github.com/code3-dev/native-ig"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-8 py-4",
                  "text-base font-semibold text-primary-foreground",
                  "bg-gradient-to-r from-primary to-primary/80",
                  "shadow-lg shadow-primary/20",
                  "hover:shadow-xl hover:shadow-primary/30",
                  "transition-all duration-300",
                  "hover:from-primary/90 hover:to-primary/70"
                )}
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </DynamicMotionDiv>
        </DynamicMotionDiv>
      </div>
    </div>
  );
} 