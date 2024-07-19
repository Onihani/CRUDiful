// next
import Image from "next/image";
// imports
import { ChevronDown } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";

// static assets
import testImage from "public/images/test.png";

const ArticleListItem = () => {
  return (
    <div className="bg-white p-6 grid md:grid-cols-12 gap-7 border border-black/10 rounded-xl">
      {/* image */}
      <div className="w-full md:col-span-3">
        <Image src={testImage} alt="test image" className="w-full rounded" />
      </div>
      {/* content */}
      <div className="md:col-span-9 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="text-2xl font-semibold">
            Money Milestones: Buy or Rent Your Next Property
          </h3>
          <span className="text-[#333333] text-sm">
            Published 4 days ago {"\u2022"} 5 minute read
          </span>
          <p className="text-[#666666] text-[17px]">
            In today’s edition, we tell you why the ongoing telecom spectrum
            auction doesn’t have many takers.
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3.5">
          <Button
            variant="outline"
            className=" hover:brightness-90 !text-[#222222]"
          >
            Open Blog
          </Button>
          <Button
            variant="outline"
            className=" hover:brightness-90 !text-[#222222]"
          >
            <span>Manage</span>
            <ChevronDown size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ArticleListItem;
