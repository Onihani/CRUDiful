// react
import { FC } from "react";
// imports
import { Plus, Dot } from "lucide-react";
// next
import Link from "next/link";

// ui components
import { Button } from "@/components/ui/button";

// fonts
import { jost, playfairDisplay } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// types
type HeroAreaProps = {
  cover?: string;
};

const HeroArea: FC<HeroAreaProps> = ({ cover }) => {
  return (
    <section
      className="home-hero-area"
      style={cover ? { backgroundImage: `url(${cover})` } : {}}
    >
      <div
        className={classnames("w-full h-full grid grid-rows-[auto_1fr]", {
          "bg-black/30 backdrop-filter backdrop-blur-[2px]": Boolean(cover),
        })}
      >
        {/* add background area */}
        <div className="w-full p-6">
          <div className="w-full flex items-center justify-end">
            <Button
              className={classnames(
                "bg-white hover:bg-white hover:brightness-90 py-2 md:!py-[9px] px-5 md:!px-[29px] !h-auto !text-[#222222] md:!text-base font-medium!",
                jost.className
              )}
            >
              Add a blog background
            </Button>
          </div>
        </div>
        {/* hero content area */}
        <div className="w-full pt-20">
          <div className="container">
            <div className="flex flex-col gap-6 md:gap-10">
              <h1
                className={classnames(
                  "text-white text-5xl md:text-[54px] font-semibold",
                  playfairDisplay.className
                )}
              >
                Investor Daily Dubai
              </h1>
              <p className="text-[#f4f4f4] text-lg md:text-xl">
                A blog sharing daily updates in Dubai Real Estate and Investment
                markets.
              </p>
              {/* cta */}
              <div className="flex flex-col md:flex-row gap-3">
                <Button
                  size="lg"
                  asChild
                  className="bg-white hover:bg-white hover:brightness-90 !py-3 md:!py-[15px] !px-6 !h-auto !text-[#222222] font-medium! rounded-full"
                >
                  <Link
                    href="/editor?new"
                    className="flex items-center justify-center gap-1.5"
                  >
                    <span>Create new blog</span>
                    <Plus size={20} />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  className="bg-white hover:bg-white hover:brightness-90 !py-3 md:!py-[15px] !px-6 !h-auto !text-[#222222] font-medium! rounded-full"
                >
                  <span>Manage Subscribers</span>
                  <Dot size={20} className="mx-1.5" />
                  <span className="text-[#999999]">12.3K</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroArea;
