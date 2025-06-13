"use client";

import Image from "next/image";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen flex">
            <div
                className="
    relative hidden w-1/2 flex-col justify-between p-10
    text-neutral-900 dark:text-neutral-50 md:flex
    bg-gradient-to-br
      from-emerald-400
      via-amber-300      
      to-orange-500  
    bg-[length:400%_400%]
    animate-gradient
  "
            >          <div className="absolute top-2 left-1">
                    <Image
                        src="/assets/20250613_1327_Coruja Lâmpada Criativa_remix_01jxn1sysdeqfa5xskp7ae1jtw.png"
                        alt="Logo Dark"
                        width={100}
                        height={100}
                    />
                </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center p-8 md:w-1/2 bg-white dark:bg-black relative">
                {children}
            </div>
        </div>
    );
}
