import Image from "next/image";

import { Tilt } from "@/components/tilt";
import { asset } from "@/lib/utils";

const chips = [
  { label: "Cisco IOS", status: "up", className: "left-0 top-[18%] [--z:70px] [animation-delay:-1s]" },
  { label: "SHAP · XGBoost", status: "up", className: "right-0 top-[38%] [--z:90px] [animation-delay:-3s]" },
  { label: "Ansible", status: "learning", className: "left-[4%] top-[62%] [--z:60px] [animation-delay:-5s]" },
];

/** Background-free portrait standing on a glowing node, with layers at different depths. */
export function HeroPortrait() {
  return (
    <Tilt max={12} className="hero-portrait mx-auto w-full max-w-[340px] md:max-w-[380px]">
      <div className="relative aspect-[3/4.2] w-full [transform-style:preserve-3d]">
        {/* Back layer: halo and orbit */}
        <div className="portrait-layer [--z:-60px]" aria-hidden>
          <div className="portrait-halo absolute top-[6%] left-1/2 size-[78%] -translate-x-1/2 rounded-full" />
          <svg viewBox="0 0 200 200" className="portrait-orbit absolute top-[4%] left-1/2 w-[86%] -translate-x-1/2">
            <circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 6" />
            <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
            <circle cx="100" cy="4" r="2.4" className="fill-up" />
            <circle cx="22" cy="100" r="1.8" className="fill-learning" />
          </svg>
        </div>

        {/* Floor: glowing platform and contact shadow */}
        <div className="portrait-layer [--z:-10px]" aria-hidden>
          <div className="portrait-floor absolute bottom-[2%] left-1/2 h-[13%] w-[80%] -translate-x-1/2">
            <span className="portrait-floor-ring" />
            <span className="portrait-floor-ring portrait-floor-ring--inner" />
            <span className="portrait-floor-glow" />
          </div>
        </div>

        {/* The person */}
        <div className="portrait-layer [--z:40px]">
          <Image
            src={asset("/images/portrait-cutout.webp")}
            alt="Shahriar Adnan Ishty standing in a dark shirt and light trousers, hands in pockets"
            width={300}
            height={1100}
            priority
            sizes="(min-width: 768px) 150px, 130px"
            className="portrait-cutout absolute bottom-[6%] left-1/2 h-[92%] w-auto -translate-x-1/2"
          />
        </div>

        {/* Front layer: floating chips */}
        {chips.map((chip) => (
          <div key={chip.label} className={`portrait-chip absolute ${chip.className}`} aria-hidden>
            <span className={chip.status === "up" ? "text-up" : "text-learning"}>●</span> {chip.label}
          </div>
        ))}
      </div>
    </Tilt>
  );
}
