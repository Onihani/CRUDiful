"use client";

// react
import { FC, useState } from "react";
// next
import Link from "next/link";
// imports
import { toast } from "sonner";
import { ChevronDown, Loader } from "lucide-react";

// ui components
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// hooks
import { useDeleteArticle } from "@/common/hooks";

// helpers
import { calcTimeAgo } from "@/common/helpers";

// types
import { DraftArticle } from "@/common/types";
type ArticleListItemProps = {
  draft: DraftArticle;
};

const DraftListItem: FC<ArticleListItemProps> = ({ draft }) => {
  // state
  const [deleting, setDeleting] = useState(false);
  const [deleteDraftModalOpen, setDeleteDraftModalOpen] = useState(false);

  // hooks
  const { mutateAsync: deleteDraft } = useDeleteArticle();

  // handlers
  const handleDeleteDraft = async () => {
    setDeleting(true);

    try {
      await deleteDraft({
        id: draft.id,
        type: "draft",
      });
      setDeleteDraftModalOpen(false);

      // show toast
      toast.success("Draft deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete draft");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      {/* draft article */}
      <div className="bg-white p-6 grid md:grid-cols-12 gap-7 border border-black/10 rounded-xl shadow-sm">
        {/* image */}
        <div className="w-full md:col-span-3">
          <img
            src={
              draft.image?.url ??
              "https://placehold.co/600x400?text=Image+Placeholder"
            }
            alt={draft?.image?.alt ?? "article image"}
            className="w-full rounded"
          />
        </div>
        {/* content */}
        <div className="md:col-span-9 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h3 className="text-2xl font-semibold">{draft.title}</h3>
            <span className="text-[#333333] text-sm">
              Updated {calcTimeAgo(new Date(draft.updatedAt))} {"\u2022"} 5{" "}
              minute read
            </span>
            <p className="text-[#666666] text-[17px]">{draft?.content}</p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-3.5">
            <Button
              variant="outline"
              className=" hover:brightness-90 !text-[#222222]"
            >
              Open Blog
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className=" hover:brightness-90 !text-[#222222]"
                >
                  <span>Manage</span>
                  <ChevronDown size={14} className="ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Manage Draft</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/editor/draft/${draft.id}`}>Edit</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDeleteDraftModalOpen(true)}>
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {/* delete draft modal */}
      <Dialog
        open={deleteDraftModalOpen}
        onOpenChange={setDeleteDraftModalOpen}
      >
        <DialogContent className="bg-white p-6 flex flex-col gap-6">
          <DialogHeader className="flex flex-col gap-1">
            <DialogTitle className="text-xl font-semibold">
              Delete Draft
            </DialogTitle>
            <DialogDescription className="text-[#737373] text-base">
              Are you sure you want to delete this draft? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button
              disabled={deleting}
              onClick={handleDeleteDraft}
              className="bg-[#86005E] hover:bg-[#86005E] hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-white !text-base font-medium! shadow"
            >
              {deleting && <Loader size={20} className="spin mr-2" />}
              <span>{deleting ? "Deleting Draft" : "Yes Delete Draft"}</span>
            </Button>
            <Button
              disabled={deleting}
              onClick={() => setDeleteDraftModalOpen(false)}
              className="bg-white hover:bg-white hover:brightness-75 !py-[9px] !px-[29px] !h-auto text-[#333333] !text-base font-medium! border shadow"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DraftListItem;
