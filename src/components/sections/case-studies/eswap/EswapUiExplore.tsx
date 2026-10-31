"use client";

import { FadeUp } from "@/components/motion/FadeUp";

type Phone = {
  src: string;
  alt: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

type PhoneRow = {
  stageW: number;
  stageH: number;
  phones: Phone[];
};

/**
 * Absolute AABBs from Figma groups `2356:512`–`2356:515`.
 * PNGs are Figma fill crops (v4) — same crop as Figma overflow, no flood-fill.
 */
const rawRows: PhoneRow[] = [
  {
    // Group 2356:512 @ 273,4408 — 1332×869
    stageW: 1332,
    stageH: 869,
    phones: [
      {
        src: "/images/case-studies/eswap/ui-flow-1-v4.png",
        alt: "Eswap onboarding — sign in options",
        left: 0,
        top: 0,
        width: 353,
        height: 720,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-2-v4.png",
        alt: "Eswap login with mobile number",
        left: 488,
        top: 143,
        width: 358,
        height: 726,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-3-v4.png",
        alt: "Eswap phone number entry",
        left: 981,
        top: 0,
        width: 351,
        height: 732,
      },
    ],
  },
  {
    // Group 2356:513 @ 259,5190 — 1352×905
    stageW: 1352,
    stageH: 905,
    phones: [
      {
        src: "/images/case-studies/eswap/ui-flow-4-v4.png",
        alt: "Eswap OTP verification",
        left: 0,
        top: 0,
        width: 355,
        height: 734,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-5-v4.png",
        alt: "Eswap welcome screen",
        left: 504,
        top: 153,
        width: 353,
        height: 752,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-6-v4.png",
        alt: "Eswap ticket exchange welcome",
        left: 1009,
        top: 22,
        width: 343,
        height: 742,
      },
    ],
  },
  {
    // Group 2356:514 @ 270,5986 — 1339×909
    stageW: 1339,
    stageH: 909,
    phones: [
      {
        src: "/images/case-studies/eswap/ui-flow-7-v4.png",
        alt: "Eswap event detail — AR Rahman",
        left: 0,
        top: 0,
        width: 334,
        height: 734,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-8-v4.png",
        alt: "Eswap ticket category selection",
        left: 498,
        top: 175,
        width: 343,
        height: 734,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-9-v4.png",
        alt: "Eswap ticket with QR code",
        left: 1001,
        top: 40,
        width: 338,
        height: 714,
      },
    ],
  },
  {
    // Group 2356:515 @ 259,6782 — 1363×898
    stageW: 1363,
    stageH: 898,
    phones: [
      {
        src: "/images/case-studies/eswap/ui-flow-10-v4.png",
        alt: "Eswap checkout summary",
        left: 0,
        top: 0,
        width: 329,
        height: 715,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-11-v4.png",
        alt: "Eswap ticket confirmation",
        left: 516,
        top: 179,
        width: 329,
        height: 719,
      },
      {
        src: "/images/case-studies/eswap/ui-flow-12-v4.png",
        alt: "Eswap purchase success",
        left: 1012,
        top: 30,
        width: 351,
        height: 724,
      },
    ],
  },
];

/** Stage = union of phone AABBs; highest phone top → 0. */
function normalizeRow(row: PhoneRow): PhoneRow {
  const minLeft = Math.min(...row.phones.map((p) => p.left));
  const minTop = Math.min(...row.phones.map((p) => p.top));
  const maxRight = Math.max(...row.phones.map((p) => p.left + p.width));
  const maxBottom = Math.max(...row.phones.map((p) => p.top + p.height));
  return {
    stageW: maxRight - minLeft,
    stageH: maxBottom - minTop,
    phones: row.phones.map((p) => ({
      ...p,
      left: p.left - minLeft,
      top: p.top - minTop,
    })),
  };
}

const rows = rawRows.map(normalizeRow);

function PhoneRowStage({ row }: { row: PhoneRow }) {
  return (
    <>
      {/* w-[64%]: match Amol mosaic scale; absolute Figma AABBs unchanged */}
      <div
        className="relative mx-auto hidden w-[64%] lg:block"
        style={{ aspectRatio: `${row.stageW} / ${row.stageH}` }}
      >
        {row.phones.map((phone) => (
          <div
            key={phone.src}
            className="absolute overflow-hidden"
            style={{
              left: `${(phone.left / row.stageW) * 100}%`,
              top: `${(phone.top / row.stageH) * 100}%`,
              width: `${(phone.width / row.stageW) * 100}%`,
              aspectRatio: `${phone.width} / ${phone.height}`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={phone.src}
              alt={phone.alt}
              className="absolute inset-0 size-full object-contain object-top"
              draggable={false}
            />
          </div>
        ))}
      </div>

      <div
        className="-mr-4 flex snap-x snap-mandatory gap-4 overflow-x-auto pr-4 lg:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {row.phones.map((phone) => (
          <div key={phone.src} className="w-[70%] shrink-0 snap-start sm:w-[42%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={phone.src}
              alt={phone.alt}
              className="h-auto w-full"
              draggable={false}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export function EswapUiExplore() {
  return (
    <section aria-label="Eswap app screens" className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 max-w-[clamp(18rem,44.27vw,53.125rem)] leading-[normal] text-white max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Let’s Start Exploring what we have Built.
          </h2>
        </FadeUp>

        <div className="mt-[clamp(2rem,3.65vw,4.375rem)] flex flex-col gap-[clamp(2rem,4.17vw,5rem)]">
          {rows.map((row, index) => (
            <FadeUp key={index} delay={index * 40}>
              <PhoneRowStage row={row} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
