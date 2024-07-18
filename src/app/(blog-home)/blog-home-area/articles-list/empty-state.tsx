// imports
import { Plus } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";

const EmptyState = () => {
  return (
    <div className="py-5">
      <div className="w-full py-8 md:py-[44px] px-5 md:px-[200px] my-5 border border-black/20 rounded-3xl">
        <div className="flex flex-col items-center justify-center gap-5">
          <h2 className="text-2xl font-medium text-center">Start with your first blog!</h2>
          <Button
            size="lg"
            className="bg-[#f4f4f4] hover:bg-[#f4f4f4] hover:brightness-90 !py-3 md:!py-[15px] !px-6 !h-auto !text-[#222222] font-medium! rounded-full shadow"
          >
            <span>Create new blog</span>
            <Plus size={20} className="ml-1.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
