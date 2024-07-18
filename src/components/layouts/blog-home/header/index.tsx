// header components
import Logo from "./logo";
import NavLink from "./nav-link";
// imports
import { Menu } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";

// fonts
import { jost } from "@/common/fonts";

// helpers
import { classnames } from "@/common/helpers";

// data
import { navigation } from "@/common/data";

const Header = () => {
  return (
    <header className="bg-[#F4F4F4]">
      <div className="screen-container py-4 flex flex-row items-center justify-between">
        {/* brand logo */}
        <Logo />
        {/* navigation and cta (hidden on mobile) */}
        <div className="hidden md:flex md:flex-row md:items-center md:justify-center md:gap-11">
          {/* navigation */}
          <nav className="flex items-center gap-11">
            {navigation.map((navItem, index) => (
              <NavLink key={`${navItem.label}-${index}`} href={navItem.href}>
                {navItem.label}
              </NavLink>
            ))}
          </nav>
          {/* cta */}
          <Button
            className={classnames(
              "bg-[#6D787C] !py-[9px] !px-[29px] !h-auto  !text-base font-medium!",
              jost.className
            )}
          >
            Contact us
          </Button>
        </div>
        {/* hamburger menu (hidden on tabs -> pc) */}
        <div className="md:hidden">
          <Button variant="outline" size="icon">
            <Menu size={24} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
