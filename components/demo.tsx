"use client";

import { useRef, useEffect } from "react";

export default function DemoVideo() {
    const ref = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const io = new IntersectionObserver(
            (entries) => {
                const isVisible = entries[0].isIntersecting;
                if (isVisible) el.play().catch(() => { });
                else el.pause();
            },
            {
                threshold: 0.5,
            }
        );

        io.observe(el);
        return () => {
            io.disconnect();
        };
    }, []);

    return (
        <div id="demo" className="my-3 mx-auto p-15 z-50">
            <video ref={ref} src="/sample/sceneify-demo-vid.mp4"
                playsInline muted loop preload="metadata" className="w-full rounded-xl shadow"
            />
        </div>
    );
}
