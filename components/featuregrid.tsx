import { HoverEffect } from "@/components/ui/card-hover-effect";
import { IconBrandGithub, IconMovie, IconScanEye } from "@tabler/icons-react";

export default function Featuregrid() {

    const cards = [
        {
            title: "Image analysis",
            description:
                "The uploaded photo is processed through Pollinations.ai vision model, which extracts scene context, mood, subjects, colours, composition + emotional tone.",
            link: "https://github.com/pollinations/pollinations",
            icon: <IconScanEye className="size-6" />
        },
        {
            title: "Subtitle generator",
            description:
                "Gemini 2.5 Flash produces a short cinematic line that matches the emotional context detected in your image description.",
            link: "https://ai.google.dev/gemini-api/docs",
            icon: <IconMovie className="size-6" />
        },
        {
            title: "Contribute!",
            description:
                `Sceneify is open-source and still evolving. Help improve prompts, visual styles, UX, or output models.You can help with UI, 
                prompt engineering, model tuning, and new output styles. Star it, fork it, or send a PR, literally every contribution matters.`,
            link: "https://github.com/aditya-shanbhag-dev/sceneify",
            icon: <IconBrandGithub className="size-6" />
        }
    ];


    return (
        <div id="about" className="my-3 mx-auto p-5 z-50">
            <HoverEffect items={cards} />
        </div>
    )
}
