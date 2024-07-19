// next
import Link from "next/link";
// imports
import { ChevronLeft } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="bg-[#F4F4F4]">
      <div className="p-8 flex flex-col md:flex-row md:items-center md:justify-between">
        {/* back link */}
        <Link href="/" className="text-lg font-medium flex items-center gap-2">
          <ChevronLeft size={24} />
          <span>Blog Editor</span>
        </Link>
        {/* cta buttons */}
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <Button className="bg-white hover:bg-white hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-[#333333] !text-base font-medium! shadow">
            Save as Draft
          </Button>
          <Button className="bg-[#86005E] hover:bg-[#86005E] hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-white !text-base font-medium! shadow">
            Save as Draft
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
