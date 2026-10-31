import { Orbitron, Rubik } from "next/font/google";
import { FadeUp } from "@/components/motion/FadeUp";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: "500",
  display: "swap",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

/** Exact Figma alphabet string (includes the designed “K” where Q would sit). */
const ALPHABET = "A B C D E F G H I J K L M N O P K R S T U V W X Y Z";

const colours = [
  { hex: "#A4FF36", bg: "bg-[#A4FF36]", width: "w-[20%]" },
  { hex: "#383838", bg: "bg-[#383838]", width: "w-[20%]" },
  { hex: "#000000", bg: "bg-black", width: "w-[20%]" },
] as const;

/**
 * Typography Used + Colours — Figma `1720:5020`–`1720:5041` (white band)
 * Orbitron / Rubik are the client brand fonts shown in the case study.
 */
export function HbbIdentity() {
  return (
    <section aria-label="Typography and colours" className="bg-white text-black">
      <div className="mx-auto w-full max-w-[1920px] px-4 lg:px-[clamp(1.25rem,6.25vw,7.5rem)] py-[clamp(2.5rem,4.17vw,5rem)]">
        <FadeUp>
          <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
            Typography Used
          </h2>
        </FadeUp>

        <div className="mt-[clamp(1.5rem,3.125vw,3.75rem)] grid gap-[clamp(2rem,3.125vw,3.75rem)] md:grid-cols-2 md:gap-[clamp(2rem,6.25vw,7.5rem)]">
          <FadeUp delay={60}>
            <div className="relative md:pr-[clamp(1.5rem,2.5vw,3rem)]">
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.29vw,2.75rem)] leading-[normal] text-black">
                Primary Font
              </p>
              <p
                className={`${orbitron.className} mt-[clamp(0.75rem,1.56vw,1.875rem)] text-[clamp(1.5rem,2.08vw,2.5rem)] font-medium leading-[normal] text-black`}
              >
                Orbitron
              </p>
              <p
                className={`${orbitron.className} mt-[clamp(1.5rem,3.125vw,3.75rem)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium leading-[normal] text-black`}
              >
                {ALPHABET}
              </p>
              <p
                className={`${orbitron.className} mt-[clamp(0.5rem,0.78vw,0.9375rem)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-medium lowercase leading-[normal] text-black`}
              >
                {ALPHABET}
              </p>
              <div
                aria-hidden
                className="pointer-events-none absolute top-0 right-0 hidden h-full w-px bg-black/20 md:block"
              />
            </div>
          </FadeUp>

          <FadeUp delay={120}>
            <div>
              <p className="font-[family-name:var(--font-display)] text-[clamp(1.5rem,2.29vw,2.75rem)] leading-[normal] text-black">
                Secondary Font
              </p>
              <p
                className={`${rubik.className} mt-[clamp(0.75rem,1.56vw,1.875rem)] text-[clamp(1.5rem,2.08vw,2.5rem)] font-normal leading-[normal] text-black`}
              >
                Rubik
              </p>
              <p
                className={`${rubik.className} mt-[clamp(1.5rem,3.125vw,3.75rem)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-normal leading-[normal] text-black`}
              >
                {ALPHABET}
              </p>
              <p
                className={`${rubik.className} mt-[clamp(0.5rem,0.78vw,0.9375rem)] text-[clamp(0.875rem,1.15vw,1.375rem)] font-normal lowercase leading-[normal] text-black`}
              >
                {ALPHABET}
              </p>
            </div>
          </FadeUp>
        </div>

        <div className="mt-[clamp(2.5rem,5.2vw,6.25rem)] grid items-start gap-[clamp(1.5rem,3.125vw,3.75rem)] lg:grid-cols-[auto_minmax(0,1fr)]">
          <FadeUp delay={40}>
            <h2 className="text-h2 leading-[normal] text-black max-md:!text-[38px] md:max-lg:!text-[2.625rem]">
              Colours
            </h2>
          </FadeUp>

          <FadeUp delay={100}>
            <ul className="group flex w-full gap-0">
              {colours.map((swatch) => (
                <li
                  key={swatch.hex}
                  className={`flex shrink-0 flex-col gap-[clamp(0.5rem,0.78vw,0.9375rem)] ${swatch.width} transition-[width] duration-500 ease-out group-hover:w-1/3`}
                >
                  <div
                    className={`${swatch.bg} h-[clamp(12rem,29.95vw,35.9375rem)] w-full`}
                  />
                  <p className="font-[family-name:var(--font-body)] text-[clamp(0.75rem,0.833vw,1rem)] leading-[normal] text-black">
                    {swatch.hex}
                  </p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
