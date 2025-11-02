"use client";
import { FlipWords } from "./ui/flip-words";
import { ImagesSlider } from "./ui/images-slider";
import { motion } from "motion/react";
import { IconBadgeCc } from "@tabler/icons-react";
import { Button } from "./ui/button";
import { Clapperboard, MoveRight, Sparkles } from "lucide-react";

export default function HeroSection() {
  const phrases = [
    "For every unsaid moment, there is a line waiting to be written...",
    "Because every quiet moment is a monologue...",
    "Even stillness has a script running underneath...",
    "Sometimes the world says more in silence than we do in words...",
    "Every pause is just dialogue waiting for courage...",
    "Every frame holds a sentence we never spoke..."
  ];
  
  const images = Array.from({ length: 6 }, (_, i) => i + 1)
  .flatMap(n => [`/sample/sample${n}.jpg`, `/sample/st_sample${n}.jpg`]);

  return (
    <div className="my-3 mx-5 flex flex-row items-start p-5 gap-3 z-50">
      <div className="flex flex-col max-w-3xl">
        <div className="relative text-5xl font-bold tracking-tight text-primary mb-5 min-h-35">
          <FlipWords words={phrases} />
        </div>
        <p className="text-xl font-normal text-foreground ml-2 tracking-widest text-start leading-12">
          <IconBadgeCc className="inline" /> Subtitle your images with AI so
          they feel like{" "}
          <span className="font-bold underline decoration-wavy underline-offset-5">
            scenes from a movie
          </span>
          . <Clapperboard className="inline" /> Transform still photos into
          spoken moments in one click.
        </p>
        <Button
          variant="outline"
          className="mt-4 cursor-pointer hover:scale-120 border-accent-foreground transition-all w-fit mx-auto"
          onClick={() => { window.location.href = "/generate"}}
        >
          <Sparkles /> Try it out for free <MoveRight />
        </Button>
      </div>
      <div className="mx-10">
        <ImagesSlider overlay={false} className="h-90 w-135" images={images}>
          <motion.div className="z-50 flex flex-col justify-center items-center"></motion.div>
        </ImagesSlider>
      </div>
    </div>
  );
}
