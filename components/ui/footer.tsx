"use client";
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import { ModeToggle } from '../togglebutton'
import { IconBrandGithub } from '@tabler/icons-react'

export default function Footer() {
    return (
        <footer className='max-w-7xl bottom-0 mt-auto mx-auto h-auto pt-10 pb-10 w-full z-50'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-3 px-10 py-4 max-md:flex-col sm:px-6 sm:py-4 md:gap-6 md:py-4'>
                <a href='#'>
                    <div className='flex items-center gap-1'>
                        <Image src="/sceneify-logo.svg" alt="Sceneify Logo" width={65} height={65} />
                        <Image src="/sceneify-title.svg" alt="Sceneify Title" width={100} height={65} />
                    </div>
                </a>

                <div className='flex items-center gap-5 whitespace-nowrap'>
                    <a href='/generate' className='hover:scale-120'>Try Now!</a>
                    <a href='/#home' className='hover:scale-120'>Home</a>
                    <a href='/#about' className='hover:scale-120'>About</a>
                    <a href='/#demo' className='hover:scale-120'>Demo</a>
                    <a href='/legal#privacy' className='hover:scale-120'>Privacy policy</a>
                    <a href='/legal#tos' className='hover:scale-120'>Terms of Service</a>
                </div>
            </div>
            <Separator />
            <div className='mx-auto flex max-w-7xl justify-between px-4 py-5 sm:px-6'>
                <p className='text-center font-medium text-balance'>
                    ©{new Date().getFullYear()} <a href='#'>Sceneify</a>, Made with ❤️ by{" "}
                    <Link
                        href="https://www.linkedin.com/in/aditya-shanbhag-5065b0240/"
                        className="inline-block transition-transform hover:scale-105 underline"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Aditya Shanbhag
                    </Link>
                </p>
                <div className="flex items-center gap-4 mr-5">
                    <ModeToggle />
                    <IconBrandGithub className="w-6 h-6 cursor-pointer" onClick={() => window.open("https://github.com/aditya-shanbhag-dev/sceneify")} />
                </div>
            </div>
        </footer>
    )
};
