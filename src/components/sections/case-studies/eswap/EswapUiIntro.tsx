"use client";

import { FadeUp } from "@/components/motion/FadeUp";

/**
 * App Store + icon phone, duo phones, angled pairs — Figma `2349:806` top.
 * Images are Figma fills/crops as-is (v4 / figma screenshot).
 */
export function EswapUiIntro() {
  return (
    <section aria-label="Eswap app interface intro" className="bg-black">
      {/* White split — App Store card + icon phone — Figma 2356:509
          Panels 942px + 36px black gutter + 942px on 1920 artboard */}
      <div className="mx-auto grid w-full max-w-[1920px] gap-y-0 gap-x-[clamp(0.5rem,1.875vw,2.25rem)] lg:grid-cols-2">
        <FadeUp className="relative aspect-[942/1019] bg-white">
          <div className="absolute left-[17.52%] top-[8.24%] w-[64.88%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/eswap/ui-laptop-v3.png"
              alt="Eswap App Store listing card"
              className="h-auto w-full"
              draggable={false}
            />
          </div>
          {/* White stamp + Swap mark — Figma 2328:541 / 2328:542 */}
          <div className="absolute left-[20.74%] top-[10.67%] aspect-[209/218] w-[22.16%] bg-[#fdfdfd]" />
          <div className="absolute left-[23.89%] top-[13.91%] w-[14.71%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/eswap/logo-overlay.svg"
              alt=""
              className="h-auto w-full"
              draggable={false}
              aria-hidden
            />
          </div>
        </FadeUp>

        <FadeUp delay={80} className="relative aspect-[942/1019] overflow-hidden bg-white">
          {/* Phone inset matches Figma 2328:536 vs panel 2328:550: left 356/942 */}
          <div className="absolute left-[37.79%] top-[8.34%] h-[91.66%] w-[62.85%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/case-studies/eswap/ui-phone-icon-v4.png"
              alt="Eswap app icon on iPhone home screen"
              className="size-full object-contain object-left-top"
              draggable={false}
            />
          </div>
        </FadeUp>
      </div>

      {/* Duo phones — Figma 2333:552 screenshot as-is */}
      <FadeUp>
        <div className="relative mx-auto aspect-[1917/1038] w-full max-w-[1920px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/eswap/ui-duo-phones-figma.png"
            alt="Eswap tickets and home screens on two iPhones"
            className="absolute inset-0 size-full object-contain object-center"
            draggable={false}
          />
        </div>
      </FadeUp>

      {/* Angled phone pairs on white — Figma 2356:510 / 2356:511 (same 36px gutter) */}
      <div className="mx-auto grid w-full max-w-[1920px] gap-y-0 gap-x-[clamp(0.5rem,1.875vw,2.25rem)] lg:grid-cols-2">
        <FadeUp className="relative flex aspect-[942/1019] items-center justify-center overflow-hidden bg-white px-[clamp(1.5rem,8.33vw,8.375rem)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/eswap/ui-panel-left-v4.png"
            alt="Eswap event feed and profile screens"
            className="h-auto w-full max-w-[622px] object-contain"
            draggable={false}
          />
        </FadeUp>
        <FadeUp
          delay={80}
          className="relative flex aspect-[942/1019] items-center justify-center overflow-hidden bg-white px-[clamp(1.5rem,7.29vw,7.3125rem)]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/case-studies/eswap/ui-panel-right-v4.png"
            alt="Eswap ticket and listing screens"
            className="h-auto w-full max-w-[665px] object-contain"
            draggable={false}
          />
        </FadeUp>
      </div>
    </section>
  );
}
