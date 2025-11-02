"use client";
import Image from "next/image";
import { IconBrandGithub } from '@tabler/icons-react';
import { ModeToggle } from "./togglebutton";

export default function Header() {
  return (
    <div className="w-full mt-0 h-auto p-2 z-50">
      <div className="flex items-center justify-between mx-5">
        <div className="flex items-center cursor-pointer" onClick={() => window.location.href = "/"}>
          <Image src="/sceneify-logo.svg" alt="Sceneify Logo" width={80} height={80} />
          <Image src="/sceneify-title.svg" alt="Sceneify Title" width={125} height={80} />
        </div>
        <div className="flex items-center gap-4 mr-5">
          <ModeToggle />
          <IconBrandGithub className="w-6 h-6 cursor-pointer" onClick={() => window.open("https://github.com/aditya-shanbhag-dev/sceneify")} />
        </div>
      </div>
    </div>
  );
}
